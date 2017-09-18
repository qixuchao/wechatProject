<template>
  <div class="imformation" v-if="showInfo">
    <div class="header">产品相关资料</div>
    <div class="detail1" v-if="imformation.length===0">暂无数据</div>
    <group >
      <cell :title="item.fileName" v-for="(item,index) in imformation" class="detail" @click.native="download(index)"></cell>
    </group>

    <div class="header">保险公司相关资料</div>
    <div class="detail1" v-if="company.length===0">暂无数据</div>
    <group >
      <cell :title="item.fileName" v-for="(item,index) in company" class="detail" @click.native="download1(index)"></cell>
    </group>

    <div class="header">计划书资料库</div>
    <div class="detail1" v-if="plan.length===0">暂无数据</div>
    <group >
      <cell :title="item.fileName" v-for="(item,index) in plan" class="detail" @click.native="download2(index)"></cell>
    </group>

    <!--点击图片放大-->
    <div v-transfer-dom>
      <previewer :list="list" ref="previewer" :options="options"></previewer>
    </div>

  </div>
  <c-pdf  @closepdf="closepdf" v-else-if="isshowpdf" @pdferr="pdferr" :pdfurl="testpdfurl"></c-pdf>
</template>

<script type="text/ecmascript-6">
  import {Group,Cell,Previewer,TransferDomDirective as TransferDom} from 'vux';
  export default {
    directives: {
      TransferDom
    },
    components: {
      Group,
      Cell,
      Previewer
    },
    created(){
    document.setTitle = function(t) {
      document.title = t;
      var i = document.createElement('iframe');
      i.src = '//m.baidu.com/favicon.ico';
      i.style.display = 'none';
      i.onload = function() {
        setTimeout(function(){
          i.remove();
        }, 9)
      }
      document.body.appendChild(i);
    }

    setTimeout(function(){
      document.setTitle('产品相关资料');
    }, 1);
  },
    data(){
    return {
      detail: {},
      imformation: [],
      company:[],
      plan:[],
      isshowpdf:false,
      showInfo:true,
      testpdfurl:'',
      list:[{
        src:'',
        w: 600,
        h: 400
      }],   //preview插件绑定的图片list
      options: {    //preview插件获取的屏幕大小来控制图片的宽高
        getThumbBoundsFn (index)
      {
      // find thumbnail element
      let thumbnail = document.querySelectorAll('.detail')[index]
      // get window scroll Y
      let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
      // optionally get horizontal scroll
      // get position of element relative to viewport
      let rect = thumbnail.getBoundingClientRect()
      // w = width
      return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
      // Good guide on how to get element coordinates:
      // http://javascript.info/tutorial/coordinates
    }
     }
    }
  },
  mounted(){
    var vm = this;
    vm.detail = vm.$store.getters.getProduct;
    vm.$post('/api/query/prdFile', {
      "itemId": vm.detail.itemId,
      "type": "ITEM"
    }).then(function (response) {
      vm.imformation = response.rows;

    }, function (response) {
      console.log("接口出错了");
    });
    vm.$post('/api/query/prdFile', {
      "itemId": vm.detail.itemId,
      "type": "COMPANY"
    }).then(function (response) {
      vm.company = response.rows;

    }, function (response) {
      console.log("接口出错了");
    });
    vm.$post('/api/plan/library',{
      'itemCode':vm.detail.itemCode
    }).then(function (response) {
      vm.plan=response.rows;
    },function(response){
      console.log("接口出错了");
    })

  },
  methods:{
    download:function (index) {
      let vm = this;
      let fileId = vm.imformation[index].fileId;
      let fileName=vm.imformation[index].fileName;
      let i=fileName.indexOf('.pdf');
      if(i!==-1){
          vm.showInfo=false;
          vm.testpdfurl=vm.config.baseUrl+'/api/fms/sys/attach/file/detail?fileId='+fileId+'&access_token='+window.localStorage.wxToken;
          vm.isshowpdf=true;
        }
      let j=fileName.indexOf('.jpg');
      let k=fileName.indexOf('.png');
      if(k!==-1||j!==-1){
          vm.list[0].src=vm.$store.getters.getPictureUrl+vm.imformation[index].filePath;
          vm.$refs.previewer.show(0);
      }

      if(i<0&&k<0&&j<0){
          vm.$vux.toast.show({text:'微信不支持该类型文件的预览'});
        }
    },
    download1:function (index) {
      var vm = this;
      var fileId = vm.company[index].fileId;
      let fileName=vm.company[index].fileName;
      let i=fileName.indexOf('pdf');
      if(i!==-1){
        vm.showInfo=false;
        vm.testpdfurl=vm.config.baseUrl+'/api/fms/sys/attach/file/detail?fileId='+fileId+'&access_token='+window.localStorage.wxToken;
        vm.isshowpdf=true;
      }
      let j=fileName.indexOf('jpg');
      let k=fileName.indexOf('png');
      if(k!==-1||j!==-1){
        vm.list[0].src=vm.$store.getters.getPictureUrl+vm.company[index].filePath;
        vm.$refs.previewer.show(0);
      }

      if(i<0&&k<0&&j<0){
        vm.$vux.toast.show({text:'微信不支持该类型文件的预览'});
      }
    },
    download2:function (index) {
      var vm = this;
      var fileId = vm.plan[index].fileId;
      let fileName=vm.plan[index].fileName;
      let i=fileName.indexOf('pdf');
      if(i!==-1){
        vm.showInfo=false;
        vm.testpdfurl=vm.config.baseUrl+'/api/fms/sys/attach/file/detail?fileId='+fileId+'&access_token='+window.localStorage.wxToken;
        vm.isshowpdf=true;
      }
      let j=fileName.indexOf('jpg');
      let k=fileName.indexOf('png');
      if(k!==-1||j!==-1){
        vm.list[0].src=vm.$store.getters.getPictureUrl+vm.plan[index].filePath;
        vm.$refs.previewer.show(0);
      }

      if(i<0&&k<0&&j<0){
        vm.$vux.toast.show({text:'微信不支持该类型文件的预览'});
      }
    },
    closepdf(){
      this.isshowpdf=false;
      this.showInfo=true;
    },
    pdferr(errurl){
      console.log(errurl);
    }


  }
  }

</script>


<style lang="less">
  * {
    padding: 0px;
    margin:0px;
  }

  .imformation{
    min-height: 100%;
    background-color:  #F4F4F7;
    position: absolute;
    width: 100%;

    .header{
      height: 2rem;
      font-size: 1.6rem;
      font-weight: 500;
      letter-spacing: 1px;
      margin-left: 10px;
      line-height:2.5;
    }
    .detail1{
      font-size: 1.3rem;
      margin-left: 10px;
      margin-top: 10px;
    }
    .detail{
      background-color: white;
      font-size: 1.3rem;
    }

  }


</style>

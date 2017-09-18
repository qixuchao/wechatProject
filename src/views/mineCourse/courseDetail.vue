<template>
  <div class="courseDetail" v-if="showInfo">

    <div class="header">
      <div class="title">{{list.topic}}</div>
    </div>

    <div class="date">
      <div class="left">课程时间：</div>
      <div class="right">{{list.courseDate}}-{{list.endTime}}</div>
    </div>
    <div class="date">
      <div class="left">培训方式：</div>
      <div class="right">{{list.trainingMethod}}</div>
    </div>
    <div class="date">
      <div class="left">培训讲师：</div>
      <div class="right">{{list.lecturer}}</div>
    </div>
    <div class="date">
      <div class="left">培训地址：</div>
      <div class="right">{{list.address}}</div>
    </div>
    <div class="date" v-if="list.status!=='COMPLETE'">
      <div class="left">直播链接：</div>
      <!--<a class="right_new" :href="list.url" v-if="list.url!==null">点我看直播</a>-->
      <a v-if="list.url!==null&&list.url!=''" class="right_new" :href="list.url">点我看直播</a>
      <a class="right_new_1" v-if="list.url===null||list.url===''" :href="list.url">点我看直播</a>
    </div>
    <div class="date" v-if="btn!=='报名'">
      <div class="left">直播密码：</div>
      <div class="right">{{list.password}}</div>
    </div>
    <div class="date" v-if="list.status==='COMPLETE'">
      <div class="left">视频链接：</div>
      <button v-if="list.boutiqueUrl!==null&&list.boutiqueUrl!==''" class="right_new" @click="shiPin">点我看视频</button>
      <!--<a class="right_new" :href="list.boutiqueUrl" v-if="list.boutiqueUrl!==null">点我看视频</a>-->
      <div class="right_new_1" v-if="list.boutiqueUrl===null||list.boutiqueUrl===''">点我看视频</div>
    </div>


    <div class="courseIntro">课程简介</div>
    <div class="IntroDetail">
      <div v-html="list.courseIntroduction"></div>
    </div>

    <div class="courseIntro">讲师简介</div>
    <div class="IntroDetail">
      <div v-html="list.lecturerIntroduction"></div>
    </div>

    <div class="courseIntro">培训资料</div>
    <div class="trainData" v-if="dataList.length===0">暂无数据</div>
    <div class="trainData" v-for="(item,index) in dataList">
      <div class="data_left">{{item.fileName}}</div>
      <div class="data_right" @click="preview(index)">查看></div>
    </div>

    <div style="display: flex;display: -webkit-flex" v-if="btn!==null">
      <div :class="{footBtn2:list.btn,footBtn1:!list.btn}" @click="go">{{list.title}}</div>
      <div :class="{footBtn4:list.btn1,footBtn3:!list.btn1}" @click="see">查看报名信息</div>
    </div>

   <div v-if="showRadio" class="video_detail">
      <div class="hideVideo" ><img :src="icon" @click="closeVideo" /> </div>
      <video  class="video_act" controls preload="auto" webkit-playsinline playsinline x5-video-player-type="h5" x5-video-player-fullscreen="true">
        <source  :src="url" >
      </video>
   </div>

    <!--点击图片放大-->
    <div v-transfer-dom>
      <previewer :list="list1" ref="previewer" :options="options"></previewer>
    </div>

  </div>

  <c-pdf @closepdf="closepdf" v-else-if="isshowpdf" :pdfurl="testpdfurl"></c-pdf>

</template>

<script type="text/ecmascript-6">
  import {Previewer,TransferDomDirective as TransferDom} from 'vux';

  export default {
    directives: {
      TransferDom
    },
    components: {
      Previewer
    },
    data(){
    return {
      list: {},
      dataList: [],
      courseId: '',
      btn: null,
      showInfo: true,
      isshowpdf: false,
      testpdfurl: '',
      icon:require('../../assets/img/delete.png'),
      url:'',
      showRadio:false,
      show:false,
      list1:[{
        src:'',
        w: 600,
        h: 400
      }],   //preview插件绑定的图片list
      options: {    //preview插件获取的屏幕大小来控制图片的宽高
        getThumbBoundsFn (index)
    {
      // find thumbnail element
      let thumbnail = document.querySelectorAll('.data_right')[index]
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
      document.setTitle('课程详情');
    }, 1);
  },
  mounted(){
    var vm = this;
    Date.prototype.format = function (format) {   //格式化时间
      var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
      }
      if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      }

      for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
          format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
      }
      return format;
    };
    var courseId = vm.$route.query.courseId;
    vm.courseId = courseId;
    vm.$post('/api/course/list', {
      'courseId': courseId
    }).then(function (response) {
      vm.list = response.rows[0];
      let start = new Date(vm.list.courseDate.replace(/-/g,'/')).getTime();
      let time = new Date(vm.list.duration * 60000 + start);
      vm.list.courseDate = new Date(vm.list.courseDate.replace(/-/g,'/')).format('yyyy-MM-dd hh:mm');
      time = time.format('hh:mm');
      vm.list.courseDate=vm.list.courseDate.toLocaleString();
      vm.$set(vm.list, 'endTime', time.toLocaleString());
      if (vm.list.status === "NOTSTARTED") {
        if (vm.list.enrollFlag === 'P') {
          if (vm.list.price > 0) {
            vm.$set(vm.list, 'title', '待支付');
            vm.$set(vm.list, 'btn', true);
            vm.$set(vm.list, 'btn1', true);
            vm.btn = '待支付';
          } else {
            vm.$set(vm.list, 'title', '已报名');
            vm.$set(vm.list, 'btn', false);
            vm.$set(vm.list, 'btn1', true);
            vm.btn = "已报名";
          }
        } else if (vm.list.enrollFlag === 'Y') {
          vm.$set(vm.list, 'title', '已报名');
          vm.$set(vm.list, 'btn', false);
          vm.$set(vm.list, 'btn1', true);
          vm.btn = '已报名';
        }
        else {
          vm.$set(vm.list, 'title', '报名');
          vm.$set(vm.list, 'btn', true);
          vm.$set(vm.list, 'btn1', false);
          vm.btn = '报名';
        }
      } else if (vm.list.status === 'COMPLETE' && vm.list.enrollFlag === 'Y') {
        if (vm.list.evaluateFlag === 'Y') {
          vm.$set(vm.list, 'title', '已评价');
          vm.$set(vm.list, 'btn', false);
          vm.$set(vm.list, 'btn1', true);
          vm.btn = "已评价";
        } else {
          vm.$set(vm.list, 'title', '评价');
          vm.$set(vm.list, 'btn', true);
          vm.$set(vm.list, 'btn1', true);
          vm.btn = '评价';
        }
      }
      else {
        if(vm.list.enrollFlag ==='Y'){
          vm.$set(vm.list, 'title', '已报名');
          vm.$set(vm.list, 'btn', false);
          vm.$set(vm.list, 'btn1', true);
          vm.btn = '已报名';
        }else{
//          vm.$set(vm.list, 'title', '报名');
//          vm.$set(vm.list, 'btn', true);
//          vm.$set(vm.list, 'btn1', flase);
          vm.btn = null;
        }

      }
      if (vm.list.trainingMethod === 'ONLINE') {
        vm.list.trainingMethod = "线上";
      }
      if (vm.list.trainingMethod === 'LINE') {
        vm.list.trainingMethod = "线下";
      }
      if (vm.list.trainingMethod === 'ALLLINE') {
        vm.list.trainingMethod = "线上及线下";
      }
    }, function (response) {

      console.log('接口出错了');
    });
    vm.$post('/api/course/fileList', {
      "courseId": courseId,
      "page": 1,
      "pagesize": 20
    }).then(function (response) {
      vm.dataList = response.rows;
    }, function (response) {
      console.log("接口出错了");
    })
  },
  methods:{
    go:function () {
      var vm = this;
      if (vm.list.title === '评价') {
        vm.$router.push({path: '/evaluateCourse', query: {courseId: vm.courseId}});
      }
      if (vm.list.title === '报名') {
        vm.$router.push({path: '/courseRegistration', query: {courseId: vm.courseId}});
      }
      if (vm.list.title === '待支付') {
        var list=vm.list;
        let amount =list.students.length*list.price,
          sourceId = '';
        list.students.forEach((value,index)=>{
          sourceId += value.lineId+',';
        });
        var param = {
          amount: amount,
          orderContent: "课程支付",
          orderSubject: list.topic,
          sourceId: sourceId.substr(0,sourceId.length-1),
          sourceType: "COURSE"
        };
        vm.$router.push({path:'/onlinePayment',query:{courseId:list.courseId,payInfo:param}});
      }
    }
  ,
    see()
    {
      var vm = this;
      vm.$router.push({path: '/courseRegistration', query: {courseId: vm.courseId, type: 'detail'}});
    }
  ,
    preview(index)
    {
      var vm = this;
      let fileId = vm.dataList[index].fileId;
      let fileName=vm.dataList[index].fileName;
      let i=fileName.indexOf('.pdf');
      if(i!==-1){
          vm.showInfo=false;
          vm.testpdfurl=vm.config.baseUrl+'/api/fms/sys/attach/file/detail?fileId='+fileId+'&access_token='+window.localStorage.wxToken;
          vm.isshowpdf=true;
        }
      let j=fileName.indexOf('.jpg');
      let k=fileName.indexOf('.png');

      if(j!==-1||k!==-1){
          vm.list1[0].src=vm.$store.getters.getPictureUrl+vm.dataList[index].filePath;
          vm.$refs.previewer.show(0);
        }
      if(i<0&&k<0&&j<0){
        vm.$vux.toast.show({text:'微信不支持该类型文件的预览'});
      }
    }
  ,
    closepdf()
    {
      this.isshowpdf = false;
      this.showInfo = true;
    }
  ,
    zhiBo()
    {
      var vm=this;
      vm.url=vm.list.url;
      vm.showRadio=true;
//      vm.show=true;


    }
  ,
    shiPin()
    {
      var vm=this;
      vm.url=vm.list.boutiqueUrl;
      vm.showRadio=true;
//      vm.show=true;

    },
    closeVideo(){
      var vm=this;
      vm.showRadio=false;
//      vm.show=false;
    }

  }
  }
</script>

<style lang="less">
  * {
    /*touch-action: none;*/
    padding: 0px;
    margin: 0px;
  }

  .courseDetail {
    min-height: 100%;
    width: 100%;
    background-color: #F4F3F8;
    position: absolute;

  .header {
    display: inline-block;
    width: 100%;
    min-height: 40px;
    background-color: white;
    box-shadow: 0 1px 4px #E1E0E3;
  }

  .title {
    display: inline-block;
    padding: 1rem;
    font-size: 1.7rem;
  }

  .date {
    margin: 1rem 0 1rem 1rem;
    display: flex;
    display: -webkit-flex;
    font-size: 1.3rem;
    align-items: center;
  }

  .left {
    display: inline-block;
  }

  .right {
    display: inline;
    width: 70%;
  }

  .right_new {
    display: inline;
    height: 2rem;
    text-align: center;
    min-width: 30%;
    background-color: burlywood;
    color: white;
    text-decoration: none;
    line-height: 1.8;
    border: none;
  }

  .right_new_1 {
    display: inline;
    height: 2rem;
    text-align: center;
    min-width: 30%;
    background-color: #999999;
    color: white;
    text-decoration: none;
    line-height: 1.8;
  }

  .getPass {
    text-align: center;
    color: #E6A914;
    border: solid 1px #E6A914;
    padding: 1rem;
    width: 50%;
    margin-left: 20%;
    border-radius: 5px;
    letter-spacing: 2px;
  }

  .courseIntro {
    margin-left: 1rem;
    border-left: 3px solid burlywood;
    padding-left: 10px;
    line-height: 21px;
    margin-top: 1rem;
  }

  .IntroDetail {
    margin: 1rem;

  img {
    width: 90%;
  }
  *{
    background-color:#F4F4F7!important;
  }

  }

  .trainData {
    margin: 1rem;
  }

  .data_left {
    display: inline-block;
    letter-spacing: 1px;
    width: 75%;
    vertical-align: middle;
  }

  .data_right {
    display: inline-block;
    line-height: 2;
    color: #E6A914;
    width: 20%;
    text-align: right;
    vertical-align: middle;
  }

  .footBtn1 {
    display: inline-block;
    width: 40%;
    background-color: #E5E5E5;
    text-align: center;
    padding: 1rem;
    height: 2rem;
    margin: 1rem;
    font-size: 1.4rem;
    line-height: 1.5;
    pointer-events: none;
    /*position: fixed;*/
    bottom: 0;
  }

  .footBtn2 {
    display: inline-block;
    width: 40%;
    margin: 1rem;
    background-color: #E6A914;
    text-align: center;
    padding: 1rem;
    color: white;
    font-size: 1.4rem;
    line-height: 1.5;
    /*position: fixed;*/
    bottom: 0;
  }

  .footBtn3 {
    display: inline-block;
    width: 40%;
    /*margin-left: 50%;*/
    margin: 1rem;
    background-color: #E5E5E5;
    text-align: center;
    padding: 1rem;
    height: 2rem;
    font-size: 1.4rem;
    line-height: 1.5;
    pointer-events: none;
    /*position: fixed;*/
    bottom: 0;
  }

  .footBtn4 {
    display: inline-block;
    width: 40%;
    /*margin-left: 50%;*/
    margin: 1rem;
    background-color: #E6A914;
    text-align: center;
    padding: 1rem;
    color: white;
    font-size: 1.4rem;
    line-height: 1.5;
    /*position: fixed;*/
    bottom: 0;
  }
  .video_detail{
      width:100%;
      height:100%;
      z-index:100;
      background:white;
      z-index:100;

  .hideVideo{
    position:fixed;
    height:10%;
    width:100%;
    top:0;
    z-index:1000;

  img{
    position: absolute;
    height: 3rem;
    width:3rem;
    right:0;
    z-index:1000;
  }
  }
  .video_act{
    object-fit:fill;
    position:fixed;
    z-index:100;
    width: 100%;
    height:100%;
    top: 0;
  }
  }


  }

</style>

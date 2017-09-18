<template>
  <div class="invest">

    <div class="first">
      <div class="bondTitle">{{detail.itemName}}</div>
      <div  class="middle_forth">
        <img class="bondImg" :src="detail.pictureFilePath" />
        <div class="middle_sixth"> <div class="middle_fifth">投保方式：</div><div class="middle_teneth">{{detail.attribute70}}</div></div>
        <div class="middle_sixth"> <div class="middle_fifth">办理周期： </div><div class="middle_teneth">{{detail.attribute71}}</div></div>
        <div class="middle_sixth"> <div class="middle_fifth">投资货币： </div><div class="middle_teneth">{{detail.currencyCode}}</div></div>
        <div class="middle_sixth"> <div class="middle_fifth">投资金额：</div><div class="middle_tenth"> {{detail.attribute73}}</div></div>
        <!--<div class="middle_sixth"> <div class="middle_fifth">投资回报率： </div><div class="middle_teneth">{{detail.attribute72}}</div></div>-->
        <div class="middle_sixth"> <div class="middle_fifth">投资目的： </div><div class="middle_tenth"> {{detail.attribute74}}</div></div>
        <div class="middle_sixth"> <div class="middle_fifth">投资地区： </div><div class="middle_tenth"> {{detail.attribute75}}</div></div>
      </div>
    </div>

    <div class="second">
      <div class="second_left"></div><div class="second_right">产品亮点</div>
    </div>
    <div class="detail" v-for="item in attGroupList">
      <span style="letter-spacing: 2px">{{item.attName}}：{{detail1[item.fieldCode.toLowerCase()]}}</span>
    </div>
    <!--<div class="detail" v-for="item in attGroupList">-->
      <!--<span class="detail_left">{{item.attName}}：</span><span class="detail_right">{{detail2[item.fieldCode.toLowerCase()]}}</span>-->
    <!--</div>-->

    <div class="second" v-if="detail1.length>0">
      <div class="second_left"></div><div class="second_right">过往案例</div>
    </div>
    <div class="pastCase" v-for="item in detail1">
      <div v-html="item.imageText">{{item.imageText}}</div>
    </div>

    <!--<div class="second">-->
      <!--<div class="second_left"></div><div class="second_right">地区概况 - 地理位置</div>-->
    <!--</div>-->

    <div style="position: fixed;height: 5rem;background-color: white;bottom: 0;width: 100%">
      <div class="footer" @click="goPage">产品资料</div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  export default {

    data(){
    return{
      detail:{},
      detail1:[],
      detail2:{},
      attGroupList:[],
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
      document.setTitle('移民投资详情');
    }, 1);
  },
  mounted(){
    var vm=this;
    vm.detail=vm.$store.getters.getProduct;
    vm.$vux.loading.show({text:'loading'});
    vm.$post('/api/production/detail',{
      "itemId":vm.detail.itemId
    }).then(function(response) {
      vm.$vux.loading.hide();
      vm.detail2 = response.rows[0];
      for (let i in vm.detail2.prdAttributeSetLine) {
        if (vm.detail2.prdAttributeSetLine[i].displayFlag === "Y" && vm.detail2[vm.detail.prdAttributeSetLine[i].fieldCode.toLowerCase()] != null && vm.detail2[vm.detail2.prdAttributeSetLine[i].fieldCode.toLowerCase()] != '') {
          vm.attGroupList.push(vm.detail2.prdAttributeSetLine[i]);
        }
      }
    },function(response){

    });
    vm.$post('/api/production/getImageText',{
      "itemId":vm.detail.itemId
    }).then(function (response) {
      vm.detail1=response.rows;
      for(let i in vm.detail1){
        vm.detail1[i].imageText=escape2Html(vm.detail1[i].imageText);
      }
    },function(response){
      console.log("接口出错");
    });
    function escape2Html(str) {
      var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
      return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
    }


  },
  methods:{
    goPage:function(){
      var vm=this;
      vm.$router.push({path:'/productImformation'});
    }
  }

  }
</script>

<style lang="less">
  * {
    padding: 0px;
    margin:0px;
  }

  .invest{
    width:100%;
    margin-bottom:5rem;

  .first{
    min-height: 30%;
  }

  .bondTitle{
    display: inline-block;
    position: relative;
    font-size: 1.7rem;
    margin-top:1rem;
    margin-left: 10px;

  }

  .middle_forth{
    text-align:justify;
    /*text-align-last:justify;*/
    display: inline-block;
    width:100%;
    min-height:10rem;
    margin-top: 12px;
    font-size: 1.3rem;
    box-shadow: 2px 3px rgba(0, 0, 0, 0.16);

  }



  .bondImg {
    position: absolute;
    margin-left: 10px;
    /*margin-top: 12px;*/
    height: 90px;
    width: 90px;
  }
  .middle_sixth {
    display: flex;
    display: -webkit-flex;
    padding-top: 5px;
  }

  .middle_fifth {
    position: relative;
    display: inline-block;
    margin-left: 110px;
    text-align-last: justify;
    font-size: 1.3rem;
    color: #666666;
    min-width: 7rem;
  }

  .middle_tenth {
    position: relative;
    display: inline-block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 1.3rem;
    color: #666666;
    width: calc(~"100% - 6rem - 110px");
    word-wrap: break-word;
  }
  .detail {
    background-color: white;
    display: flex;
    display: -webkit-flex;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 5px;
    padding-bottom: 5px;
  }


  .detail_left {
    background-color: white;
    display: inline-block;
    position: relative;
    font-size: 1.3rem;
    min-width: 6rem;
    text-align-last: justify;
    margin-left: 1rem;
    line-height: 2;

  }

  .detail_right {
    background-color: white;
    display: inline-block;
    position: relative;
    font-size: 1.3rem;
    line-height: 2;
  }
  .shadow{
    width: 100%;
    height:0.5rem;
    background-color: #F4F4F7;
  }
  .second{
    display: flex;
    display: -webkit-flex;
    width: 100%;
    margin-top: 5px;
  }
  .second_left{
    display: inline-block;
    position: relative;
    width: 0.5rem;
    height:3rem;
    background:#E5B33E ;
    margin-left: 1rem;
  }
  .second_right{
    display: inline-block;
    position: relative;
    font-size: 1.7rem;
    margin-top: 0.5rem;
    margin-left: 1rem;
    height:2rem;

  }
  .product_introduce{
    margin:1rem;
    font-size: 1.3rem;
    letter-spacing: 1px;
  }
  .pastCase{
    display: flex;
    display: -webkit-flex;
  img{
    height:15rem;
    width:90%;
    margin:1rem;
  }
  }

  .addressImg{
    height:15rem;
    margin:1rem;
    width: 90%;

  }
  .footer{
    margin: 1rem;
    border-radius: 5px;
    height: 2rem;
    text-align: center;
    padding-top: 1rem;
    color: #E5B33E;
    border:solid 1px #E5B33E;
    font-size: 1.7rem;
    position: fixed;
    bottom:0;
    width:93%;
    line-height: 1;
    background-color: white;
  }

  }


</style>

<template>
  <div class="service">
      <div class="header">{{detail.itemName}}</div>
      <div class="header_detail">
        <img class="img" :src="detail.pictureFilePath">
        <div class="img_title"><div class="img_left">费用价格：<div class="img_right">{{detail.price}}</div></div> </div>
        <!--<div class="img_title"><div class="img_down"></div></div>-->
      </div>

    <div class="second">
      <div class="second_left"></div><div class="second_right">产品简介</div>
    </div>
    <div class="product_introduce">{{detail.attribute90}}</div>

    <div class="shadow"></div>
    <div class="second">
      <div class="second_left"></div><div class="second_right">产品说明</div>
    </div>
    <div class="product_introduce" v-for="item in detail1">
      <div v-html="item.imageText" style="padding-bottom: 5rem"></div>
    </div>


    <div style="position: fixed;height: 5rem;background-color: white;bottom: 0;width: 100%">
      <div class="footer" @click="goReserve">立即预约</div>
    </div>
  </div>
</template>


<script type="text/ecmascript-6">
  export default {
    data(){
    return{
      detail:{},
      detail1:[]


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
      document.setTitle('增值服务详情');
    }, 1);
  },
  mounted(){
    var vm=this;
    function escape2Html(str) {
      var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
      return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
    }
    vm.detail=vm.$store.getters.getProduct;
    vm.$vux.loading.show({text:'loading'});
    vm.$post('/api/production/getImageText',{
      "itemId":vm.detail.itemId
    }).then(function (response) {
      vm.$vux.loading.hide();
      vm.detail1=response.rows;
      for(let i in vm.detail1){
        vm.detail1[i].imageText=escape2Html(vm.detail1[i].imageText);
      }
    },function(response){
      console.log("接口出错");
    })



  },
  methods:{

    goReserve:function(){
      var vm=this;
      if(vm.detail.midClass==="JDYD")
      {
        vm.$router.push({path:'/hotelReserve'});
      }
      if(vm.detail.midClass==="HSYD")
      {
        vm.$router.push({path:'/clubReserve'});
      }
      if(vm.detail.midClass==="TTQZ")
      {
        vm.$router.push({path:'/signReserve'});
      }
      if(vm.detail.midClass==="ZCFW")
      {
        vm.$router.push({path:'/carReserve'});
      }
      if(vm.detail.midClass==="HPV")
      {
        vm.$router.push({path:'/HPVReserve'});
      }

    },
  }
  }
</script>

<style lang="less">
  * {
    padding: 0px;
    margin:0px;
  }

  .service{
    width: 100%;
    position:absolute;
    min-height: 100%;
    background-color: white;
    margin-bottom:5rem;

  .header{
    position: relative;
    margin:1rem;
    font-size: 1.7rem;
    background-color: white;
    /*color:#E5B33E;*/
  }
  .header_detail{
    display: inline-block;
    width:calc(~"100% - 1rem");
    min-height:10rem;
    font-size: 1.3rem;
    margin-left: 1rem;

  }
  .img{
    height: 8.57rem;;
    width:7.14rem;
    position: absolute;
  }
  .img_title{
    display: flex;
    display: -webkit-flex;
  }
  .img_left{
    display: inline-block;
    position: relative;
    margin-left:9rem;
    width:calc(~"100% - 9rem");
    margin-top: 1.5rem;
  }
  .img_right{
    display: inline-block;
    position: relative;
    color: #E5B33E;
  }
  .img_down{
    display: inline-block;
    position: relative;
    margin-left: 9rem;
    width:60%;
    /*letter-spacing: 2px;*/
    margin-top: 0.5rem;
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
    margin-top:1.5rem;
    background-color: white;
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
    letter-spacing: 2px;


  img{
    height:15rem;
    width:90%;
    margin:1rem;
  }


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
    /*position: fixed;*/
    /*bottom:0;*/
    width:93%;
    line-height: 1;
    background-color: white;
  }

  }


</style>

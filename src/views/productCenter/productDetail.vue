<template>
  <div class="product">
    <div class="header">
      <div class="title">{{detail.itemName}}</div>
      <div class="btn" @click="compare">对比其他产品</div>
    </div>
    <div class="middle_one">
      <div class="middle_forth">
        <img class="img"  :src="detail.pictureFilePath" />
        <div class="middle_sixth"> <div class="middle_fifth">投保对象：</div><div class="middle_tenth">{{detail.attribute2}}-{{detail.attribute3}}岁</div></div>
        <div class="middle_sixth"> <div class="middle_fifth">可选币种：</div><div class="middle_tenth">{{detail.currencyCode}}</div></div>
        <div class="middle_sixth"> <div class="middle_fifth">保障期限：</div><div class="middle_tenth">{{detail.attribute4}}</div></div>
        <div class="middle_sixth">  <div class="middle_fifth">缴费期限：</div><div class="middle_tenth"> {{detail.attribute120}}</div></div>
      </div>
    </div>
    <!--<div class="shadow"></div>-->
    <div class="second" style="margin-top: 5px">
      <div class="second_left"></div><div class="second_right">产品亮点</div>
    </div>
    <div class="detail" v-for="item in attGroupList">
      <span style="letter-spacing: 2px">{{item.attName}}：{{detail1[item.fieldCode.toLowerCase()]}}</span>
    </div>


    <div class="second" v-if="show">
      <div class="second_left"></div>
      <div class="second_right">最新优惠</div>
    </div>
    <div style="background-color: white">
    <div class="favorable" v-for="(item,index) in detail1.prdDiscountList" @click="goSale(index)">
      <div class="favorable_detail">
        <div class="favorable_left">{{item.noticeTitle}}</div>
        <div class="favorable_right">{{item.date1}}</div>
      </div>
    </div>
    </div>


    <!--<div class="new_shadow"></div>-->
    <div class="footer">
    <div class="footer_detail">
      <div class="footer_detail_left" v-for="(item,index) in footerList" @click="goPage(index)" >{{item.value}}</div>
    </div>
  </div>






  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data(){
    return{
      footerList:[{
        value:"普通计划书"
      },
        {
          value:"电子计划书"
        },
        {
          value:"保费测算"
        },
        {
          value:"产品资料"
        }],
      attGroupList:[],
      detail:{},
      detail1:{},
      show:false,
      imgPath:require('../../assets/img/productFace.jpg'),


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
      document.setTitle('保险详情');
    }, 1);
  },
  mounted(){
    var vm=this;
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
    vm.$vux.loading.show({text:'loading'});
    vm.detail=vm.$store.getters.getProduct;
    vm.$post('/api/production/detail',{
      "itemId":vm.detail.itemId
    }).then(function(response){
      vm.$vux.loading.hide();
      vm.detail1=response.rows[0];
      for(let i in vm.detail1.prdAttributeSetLine){
        if(vm.detail1.prdAttributeSetLine[i].displayFlag==="Y"&&vm.detail1[vm.detail1.prdAttributeSetLine[i].fieldCode.toLowerCase()]!=null&&vm.detail1[vm.detail1.prdAttributeSetLine[i].fieldCode.toLowerCase()]!=''){
          vm.attGroupList.push(vm.detail1.prdAttributeSetLine[i]);
        }
      }
      if(vm.detail1.prdDiscountList.length===0||vm.detail1.prdDiscountList===null){
        vm.show=false;
      }else{
        for(let i in vm.detail1.prdDiscountList){
          let date1 = new Date(vm.detail1.prdDiscountList[i].dateFrom.replace(/-/g,'/'));
          vm.detail1.prdDiscountList[i].date1=date1.format('yyyy/MM/dd');

        }
        vm.show=true;
      }
    },function(response){

    });
  },
  methods:{
    getArray(array,attr1,attr2){
      let Array = [];
      array.forEach((value,item)=>{
        value.key = value[attr1];
        value.value = value[attr2]+"";
        Array.push(value);
      });
      return Array;
    },
    goPage:function(index){
      var vm=this;
      if(index===3){
        vm.$router.push({path:'/productImformation'});
      }else{
        var item=vm.detail1;
        let currencyList = item.prdItemPaymode.length>0?item.prdItemPaymode.map(x=>{
          return x.currencyCode;
        }):[];
        let yearPeriod = item.prdItemSublineList.length>0?vm.getArray(item.prdItemSublineList,'sublineId','sublineItemName'):[];
        let yearPeriod1 = [];
        if(item.prdItemSublineList.length>0){
          item.prdItemSublineList.forEach((value,index)=>{
            yearPeriod1[index] = value.sublineItemName;
          })
        }
        item.img = item.pictureFilePath?`${this.$store.getters.getPictureUrl}${item.pictureFilePath}`:vm.imgPath;
        item.currencyList = currencyList;
        item.yearPeriod = yearPeriod;
        item.yearPeriod1 = yearPeriod1;
        item.company = [{key:item.supplierId,value:item.supplierName}];
        item.product = [{key:item.itemId,value:item.itemName}];
        item.payMethods = [{value:'半年缴',key:'SAP',name:item.halfyear},{value:'整缴',key:'WP',name:item.fullyear},{value:'月缴',key:'MP',name:item.onemonth},{value:'年缴',key:'AP',name:item.oneyear},{value:'季缴',key:'QP',name:item.quarter}]
          .filter(x=>{
            return x.name ==='Y'
          });
        item.securityArea = item.prdItemSecurityPlan.length>0?vm.getArray(item.prdItemSecurityPlan,'securityRegion','securityRegion'):[];
        item.securityLevel = item.prdItemSecurityPlan.length>0?vm.getArray(JSON.parse(JSON.stringify(item.prdItemSecurityPlan)),'securityLevel','securityLevel'):[];
        item.selfpay = item.prdItemSelfpayList.length>0?vm.getArray(item.prdItemSelfpayList,'selfpay','selfpay'):[];
        vm.$store.commit('passParam',item);
        if(index===0){
          vm.$router.push({path:'/normalPlan'});
        }
        if(index===1){
          vm.$router.push({path:'/insurance'});
        }
        if(index===2){
          vm.$router.push({path:'/budget'});
        }

      }


    },
    goSale(index){
      var vm=this;
      vm.$store.commit('assignmentDiscount',{param:vm.detail1.prdDiscountList[index]});
      vm.$router.push({path: '/events'})
    },
    compare(){
      var vm=this;
      var item=vm.detail1;
      let params = {
        product1:this.$store.state.passParam?this.$store.state.passParam.product1:{},
        product2:this.$store.state.passParam?this.$store.state.passParam.product2:{}
      };
      let currencyList = item.prdItemPaymode.length>0?item.prdItemPaymode.map(x=>{
        return x.currencyCode;
      }):[];
      let yearPeriod = item.prdItemSublineList.length>0?vm.getArray(item.prdItemSublineList,'sublineId','sublineItemName'):[];
      let yearPeriod1 = [];
      if(item.prdItemSublineList.length>0){
        item.prdItemSublineList.forEach((value,index)=>{
          yearPeriod1[index] = value.sublineItemName;
        })
      }
      item.img = item.pictureFilePath?`${this.$store.getters.getPictureUrl}${item.pictureFilePath}`:vm.imgPath;
      item.currencyList = currencyList;
      item.yearPeriod = yearPeriod;
      item.yearPeriod1 = yearPeriod1;
      item.company = [{key:item.supplierId,value:item.supplierName}];
      item.product = [{key:item.itemId,value:item.itemName}];
      item.payMethods = [{value:'半年缴',key:'SAP',name:item.halfyear},{value:'整缴',key:'WP',name:item.fullyear},{value:'月缴',key:'MP',name:item.onemonth},{value:'年缴',key:'AP',name:item.oneyear},{value:'季缴',key:'QP',name:item.quarter}]
        .filter(x=>{
          return x.name ==='Y'
        });
      item.securityArea = item.prdItemSecurityPlan.length>0?vm.getArray(item.prdItemSecurityPlan,'securityRegion','securityRegion'):[];
      item.securityLevel = item.prdItemSecurityPlan.length>0?vm.getArray(JSON.parse(JSON.stringify(item.prdItemSecurityPlan)),'securityLevel','securityLevel'):[];
      item.selfpay = item.prdItemSelfpayList.length>0?vm.getArray(item.prdItemSelfpayList,'selfpay','selfpay'):[];
      params.product1 = item;
      vm.$store.commit('passParam',params);
      vm.$router.push({path:'/addProduct'});
    }
  }
  }
</script>

<style lang="less">
  /*@import "../../assets/css/app.scss"*/
  * {
    padding: 0px;
    margin:0px;
  }

  .product {
    width: 100%;
    margin-bottom:6rem;

  .header {
    display: flex;
    display: -webkit-flex;
    background-color: white;

  }

  .title {
    display: inline-block;
    font-size: 1.7rem;
    margin: 1rem;
  }

  .btn {
    display: inline-block;
    position: absolute;
    font-size: 1.3rem;
    margin-right: 1rem;
    right: 10px;
    border: .5px solid #e5b33e;
    color: #e5b33e;
    border-radius: 4px;
    margin-top: 1rem;
    line-height: 2;
    text-align: center;
    width: 10rem;
  }

  .middle_one {
    position: relative;
    background-color: #fff;
    min-height: 10rem;
    box-shadow: 2px 3px rgba(0,0,0,.16);
    padding-bottom: 5px;
  }

  .middle_forth {
    display: inline-block;
    width: 100%;
  }

  .img {
    position: absolute;
    margin-left: 0.71rem;
    height: 90px;;
    width: 90px;
  }

  .middle_sixth {
    display: flex;
    display: -webkit-flex;
    padding-top: 3px;
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
    width: calc(~ "100% - 6rem - 110px");
    word-wrap: break-word;
  }

  .shadow {
    width: 100%;
    height: 0.5rem;
    background-color: #F4F4F7;
  }

  .second {
    background-color: white;
    display: flex;
    display: -webkit-flex;
    width: 100%;
    /*margin-top: 5px;*/
  }

  .second_left {
    display: inline-block;
    position: relative;
    width: 0.5rem;
    height: 3rem;
    background: #E5B33E;
    margin-left: 1rem;
  }

  .second_right {
    display: inline-block;
    position: relative;
    font-size: 1.7rem;
    margin-top: 0.5rem;
    margin-left: 1rem;
    height: 2rem;
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
    min-width: 20%;

  }

  .detail_right {
    background-color: white;
    display: inline-block;
    position: relative;
    font-size: 1.3rem;
    width: 80%;
  }

  .favorable {
     padding: 1rem;
  }

  .favorable_detail {
    display: flex;
    display: -webkit-flex;
    font-size: 1.3rem;
    align-items: center;
  }

  .favorable_left {
    display: inline-block;
    position: relative;
    width: 60%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .favorable_right {
    display: inline-block;
    position: relative;
    width: calc(~ "100% - 60% - 1rem");
    text-align: right;

  }

  .new_shadow {
    background-color: #F4F4F7;
    width: 100%;
    height: 6rem;
    position: relative;
  }

  .footer{
  width:100%;
  position: fixed;
  bottom:0;
    background-color: white;
    height: 6rem;
  }
  .footer_detail{
  display: flex;
  display: -webkit-flex;
  }
  .footer_detail_left{
    display: inline-block;
    position: relative;
    border: 1px solid #e5b33e;
    width: 22%;
    margin-top: 1rem;
    line-height: 3.2;
    height: 4rem;
    text-align: center;
    font-size: 1.3rem;
    color: #e5b33e;
    vertical-align: middle;
    margin-left: 2%;
  }



  }
</style>

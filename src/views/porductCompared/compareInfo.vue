<template>
  <div class="compareInfo">
    <div class="titleImg">
      <img :src="headerImg" alt="">
      <span class="imgDesc">产品对比详情</span>
    </div>
    <div class="mainDesc">
      <span>{{gender}} &nbsp;&nbsp;{{baseInfo[0].age}}岁&nbsp;&nbsp;{{isSmoking}}&nbsp; &nbsp;{{baseInfo[0].coverage}}{{currency}}</span>
      <div class="compareChart" v-if="isShowChart" @click="goPage('compareChart')">图表</div>
    </div>
    <div class="compareTable">
      <div class="compare" style="font-size: 1.6rem;background: #f5e2b5;">
        <div class="tableTitle"></div>
        <div class="productOne">{{compare1Info.itemName}}</div>
        <div class="productTwo" style="border-left: 1px solid white;">{{compare2Info.itemName}}</div>
      </div>
      <div class="compare">
        <div class="tableTitle">产品公司</div>
        <div class="productOne">{{compare1Info.supplierName}}</div>
        <div class="productTwo">{{compare2Info.supplierName}}</div>
      </div>
      <div v-if="compare1Info.minClassName ==='高端医疗'">
        <div class="compare">
          <div class="tableTitle">保障级别</div>
          <div class="productOne">{{baseInfo[0].securityLevel}}</div>
          <div class="productTwo">{{baseInfo[1].securityLevel}}</div>
        </div>
        <div class="compare">
          <div class="tableTitle">保障地区</div>
          <div class="productOne">{{baseInfo[0].securityArea}}</div>
          <div class="productTwo">{{baseInfo[1].securityArea}}</div>
        </div>
        <div class="compare">
          <div class="tableTitle">自付选项</div>
          <div class="productOne">{{baseInfo[0].selyPay}}</div>
          <div class="productTwo">{{baseInfo[1].selyPay}}</div>
        </div>
      </div>
      <div v-if="compare1Info.minClassName!=='高端医疗'">
        <div class="compare">
          <div class="tableTitle">缴费年期</div>
          <div class="productOne">{{baseInfo[0].productionAgeLimit}}</div>
          <div class="productTwo">{{baseInfo[1].productionAgeLimit}}</div>
        </div>
        <div class="compare">
          <div class="tableTitle">缴费方式</div>
          <div class="productOne">{{payMethod1?payMethod1:'-'}}</div>
          <div class="productTwo">{{payMethod2?payMethod2:'-'}}</div>
        </div>
      </div>
      <div class="compare">
        <div class="tableTitle">年缴保费</div>
        <div class="productOne">{{compare1Info.yearPermium}}</div>
        <div class="productTwo">{{compare2Info.yearPermium}}</div>
      </div>
      <div class="compare">
        <div class="tableTitle">保费总额</div>
        <div class="productOne">{{baseInfo[1].productionAgeLimit * compare1Info.yearPermium?baseInfo[1].productionAgeLimit * compare1Info.yearPermium:'-'}}</div>
        <div class="productTwo">{{baseInfo[1].productionAgeLimit * compare2Info.yearPermium?baseInfo[1].productionAgeLimit * compare2Info.yearPermium:'-'}}</div>
      </div>
    </div>
    <div class="compareTable">
      <div class="compare" v-for="(item,index) in product1Info" v-if="item.compareFlag==='Y'">
        <div class="tableTitle">{{item.attName}}</div>
        <div class="productOne">{{product1Info[index].attributeValue?product1Info[index].attributeValue:'-'}}</div>
        <div class="productTwo">{{product2Info[index].attributeValue?product2Info[index].attributeValue:'-'}}</div>
      </div>
    </div>
    <div class="cardList" >
      <group>
        <range v-model="data9" :min="minAge" :range-bar-height="4"></range>
      </group>
      <div class="remark">
        受保人<span class="rangeData">{{data9}}</span>岁时
        <span class="descText">(可拖动滑块改变年龄)</span>
      </div>
    </div>
    <div class="compareTable">
      <div class="compare">
        <div class="tableTitle">重疾/身故理赔</div>
        <div class="productOne">{{dieMoney1.dieDeposit}}</div>
        <div class="productTwo">{{dieMoney2.dieDeposit}}</div>
      </div>
      <div class="compare">
        <div class="tableTitle">身故预期赔偿</div>
        <div class="productOne">{{dieMoney1.dieCash}}</div>
        <div class="productTwo">{{dieMoney2.dieCash}}</div>
      </div>
      <div class="compare">
        <div class="tableTitle">退保价值</div>
        <div class="productOne">{{dieMoney1.surrenderDeposit}}</div>
        <div class="productTwo">{{dieMoney2.surrenderDeposit}}</div>
      </div>
      <div class="compare">
        <div class="tableTitle">退保预期返回</div>
        <div class="productOne">{{dieMoney1.surrenderCash}}</div>
        <div class="productTwo">{{dieMoney2.surrenderCash}}</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Group,Range} from 'vux'
  export default {
    components:{
      Group,
      Range
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
      document.setTitle('对比表');
    }, 1);
    function isEmptyObject(e) {
      var t;
      for (t in e)
        return true;
      return false;
    };
    var vm=this;
    var url=window.location.href.split('#')[0];
    vm.$configWx(url,['onMenuShareAppMessage','onMenuShareTimeline']);
    var trueUrl=null;
    if(isEmptyObject(vm.$store.state.productInfo)){
      trueUrl=JSON.stringify(vm.$store.state.productInfo)+"&local="+window.localStorage.wxToken;
      trueUrl=encodeURIComponent(trueUrl);
    }else{
      var url=decodeURIComponent(location.href);
      var i=url.indexOf('?');
      var j=url.indexOf('?',i+1);
      var url1=url.substr(j);
      trueUrl=encodeURIComponent(url1);
    }

    vm.$wechat.ready(function() {
      vm.$wechat.onMenuShareTimeline({
        title:'财联邦', // 分享标题
        link:'http://weixin.fortunefed.com/#/compareInfo?baseInfo='+trueUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl:'', // 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      });
      vm.$wechat.onMenuShareAppMessage({
        title:'财联邦', // 分享标题
        desc:'', // 分享描述
        link:'http://weixin.fortunefed.com/#/compareInfo?baseInfo='+trueUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: '', // 分享图标
        type:'link', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      });
    });
  },
    mounted(){

    function isEmptyObject(e) {
      var t;
      for (t in e)
        return true;
      return false;
    };
    let _this=this;
    if(!isEmptyObject(_this.baseInfo)&&!isEmptyObject(_this.baseInfo1)){
      var url=decodeURIComponent(location.href);
      var i=url.indexOf('?');
      var j=url.indexOf('?',i+1);
      var url1=url.substr(0,i-1)+url.substr(j);
      var list=url1.split('=');
      var str=list[1];
      var k=str.indexOf('&');
      str=str.substr(0,k);
      _this.baseInfo=JSON.parse(str).params;
      _this.baseInfo2=_this.baseInfo;
      _this.baseInfo1=JSON.parse(str).passPar;
      str=list[2];
      window.localStorage.wxToken=str.toString();
    }
      _this.getProductInfo();
      _this.getProductChart();
    },
    watch:{
      data9:function(value){
        this.changeAge(value,this.compare1Info.itemId,'1');
        this.changeAge(value,this.compare2Info.itemId,'2');
      }
    },
    methods: {
      goPage:function(page){
        this.$router.push(page);
      },
      getProductInfo(){
        let _this = this,
          url = '/api/public/production/prdCompare',
          param = _this.baseInfo;
        _this.$post(url,param).then(response=>{
          if(response.success){
            response.rows[0].prdAttributeSetLine.forEach((value,index)=>{
              value.attributeValue =  response.rows[0][value.fieldCode.toLowerCase()];
              _this.product1Info.push(value);
            });
            response.rows[1].prdAttributeSetLine.forEach((value,index)=>{
              value.attributeValue =  response.rows[1][value.fieldCode.toLowerCase()];
              _this.product2Info.push(value);
            });
            _this.compare1Info = response.rows[0];
            _this.compare2Info = response.rows[1];
          }
        });
        _this.data9=_this.baseInfo[0].age>50?_this.baseInfo[0].age:50;
        _this.minAge=Number(_this.baseInfo[0].age);
        _this.gender = param[0].gender==='F'?'女':'男';
        _this.isSmoking = param[0].smokeFlag ==='Y'?'吸烟':'不吸烟';
        _this.currency = _this.getArrayValue(_this.baseInfo1.currencies,param[0].currency);
        _this.payMethod1 = _this.getArrayValue(_this.baseInfo1.payMethods,param[0].paymentMethod);
        _this.payMethod2 = _this.getArrayValue(_this.baseInfo1.payMethods1,param[1].paymentMethod);
      },
      getProductChart(){
          let _this = this,
            url = '/api/public/production/prdRadarChart',
            param = _this.baseInfo2;
          _this.$post(url, param).then(response=> {
            if(response){
              _this.isShowChart = response.success;
            }
        });
      },
      changeAge(age,itemId,type){
        var vm = this;
        let data = [{
          "age": age,
          "coverage": vm.baseInfo.coverage,
          "currency": vm.baseInfo.currency,
          "gender": vm.baseInfo.gender,
          "itemId": itemId,
          "nextAge": vm.data9,
          "paymentMethod": vm.baseInfo.payMethod,
          "productionAgeLimit": vm.subline,
          "smokeFlag": vm.baseInfo.smokeFlag
        }];
        setTimeout(function () {
          if (data[0].nextAge === vm.data9) {
            vm.$post('/api/public/production/queryCash', data).then(function (response) {
              if(type==='1'){
                vm.dieMoney1 = response.rows[0];
              }else{
                vm.dieMoney2 = response.rows[0];
              }
            }, function (response) {

            });
          }
        }, 500);
      },
      getArrayValue(array,key){
        return array.filter(x=>{
                    return x.key ===key;
                  })[0].value;
      }
    },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        data9:50,
        gender:'',
        minAge:0,
        isSmoking:'',
        currency:'',
        payMethod1:'',
        payMethod2:'',
        dieMoney1:{},
        dieMoney2:{},
        product1Info:[],
        product2Info:[],
        compare1Info:{},
        headerImg:require('../../assets/img/bg@2x.png'),
        compare2Info:{},
        baseInfo:this.$store.state.productInfo.params,
        baseInfo2:this.$store.state.productInfo.params,
        baseInfo1:this.$store.state.productInfo.passPar,
        isShowChart:false
      }
    }
  }
</script>

<style lang="scss">
  .compareInfo{
    .titleImg {
      position: relative;
      img {
        width: 100%;
        height: 18vh;
      }
      .imgDesc{
        position: absolute;
        z-index: 22;
        font-size: 1.8rem;
        color: #555;
        display: flex;
        justify-content: center;
        top: 50%;
        right: 34%;
      }
    }
    .mainDesc{
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
      font-size: 1.6rem;
      color: #53595f;
      background: #f4f4f4;
      span{
        display: inline-block;
        vertical-align: -webkit-baseline-middle;
      }
      .compareChart{
        float: right;
        background: #00ABFB;
        color: white;
        font-size: 1.4rem;
        padding: 5px;
        min-width: 50px;
        text-align: center
      }
    }
    .compareTable{
      width:100%;
      border-bottom:1px solid #f8f8f8;
      .compare{
        width: 100%;
        text-align: center;
        font-size: 1.3rem;
        padding-right: 10px;
        min-height: 40px;
        display: -ms-flexbox;
        display: flex;
        align-content: center;
        -ms-flex-align: center;
        /*align-items: center;*/
        box-sizing: border-box;
        .tableTitle{
          width: calc(20% + 20px);
          background: white;
          min-height: 41px;
          border-bottom: 1px solid #f8f8f8;
          padding: 5px 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .productOne ,.productTwo{
          width: 40%;
          min-height: 40px;
          padding: 5px;
          /* vertical-align: middle; */
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
        }
      }
    }
    .cardList {
      width: calc(100% - 30px);
      padding: 5px 15px 20px;
      background: #262A35;

      div {
        display: block;
      }

      .remark {
        text-align: center;
        color: white;
        font-size: 1.4rem;
        .rangeData {
          background: white;
          padding: 5px;
          color: burlywood;
          font-size: 1.6rem;
          margin: 0 5px;
          border-radius: 2px;
        }
        .descText{
          color: #999;
        }
      }
      .weui-cells {
        height: 30px;
        padding: 20px 10px 0;
        margin-top: 0;
        background: none;
      }

      .weui-cells:before {
        border-top: none;
      }

      .weui-cells:after {
        border-bottom: none;
      }

      .range-min {
        left: -30px;
        display: none;
      }

      .range-max {
        right: -30px;
        display: none;
      }

      .range-bar {
        background-color: #fff;
      }

      .range-quantity {
        background-color: white;
      }
      .range-handle{
        background: #e6a914;
      }
    }
  }
</style>

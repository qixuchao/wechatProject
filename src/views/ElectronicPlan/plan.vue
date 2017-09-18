<template>
  <div class="plan">
    <div class="titleImg">
      <img :src="icon" />
      <span class="up_title">{{supplierName}}</span>
      <span class="down_title">{{itemName}}</span>
    </div>
    <div class="cardList">
      <div class="cardTitle">{{planParams}}:{{gender}} &nbsp;&nbsp;{{baseInfo.age}}岁&nbsp;&nbsp;{{isSmoking}}&nbsp;
        &nbsp;{{currency}}
      </div>
      <div class="information">
        <div class="label">
          <span>缴费年期：</span>
        </div>
        <span>{{optionsYear}}</span>
      </div>
      <div class="information">
        <div class="label">
          <span>缴费方式：</span>
        </div>
        <span>{{payMethod}}</span>
      </div>
      <div class="information">
        <div class="label">
          <span>首期保费：</span>
        </div>
        <span>{{yearPermium}}</span>
      </div>
      <div class="information">
        <div class="label">
          <span>保险金额：</span>
        </div>
        <span>{{coverage}}</span>
      </div>
    </div>


    <div v-if="show">
      <div class="cardList" v-for="item in list">
        <div class="cardTitle">{{item.bigTitle}}</div>
        <div v-for="item1 in item.plnEPlanTemplateSmallList">
          <span class="littleTitle">{{item1.title}}&nbsp;&nbsp;&nbsp;{{item1.amountFormula}}&nbsp;&nbsp;&nbsp;{{item1.fixedValue}}</span>

          <div class="textDesc" v-for="item2 in item1.plnEPlanTemplateDetailList">
            <span><span>{{item2.detailItem}}&nbsp;&nbsp;&nbsp;{{item2.amountFormula}}&nbsp;&nbsp;&nbsp;{{item2.fixedValue}}</span></span>
          </div>
        </div>
      </div>
    </div>


    <div class="cardList">
      <div class="cardTitle">受保人{{data9}}岁时</div>
      <div class="money">
        <span>身故保证倍偿金额</span>
        <span style="float:right">{{dieMoney.dieDeposit}}{{currency}}</span>
      </div>
      <div class="money">
        <span>身故预期赔偿总金额</span>
        <span style="float:right">{{dieMoney.dieCash}}{{currency}}</span>
      </div>
      <div class="money">
        <span>退保保证返回金额</span>
        <span style="float:right">{{dieMoney.surrenderDeposit}}{{currency}}</span>
      </div>
      <div class="money">
        <span>退保预期返回金额</span>
        <span style="float:right">{{dieMoney.surrenderCash}}{{currency}}</span>
      </div>
      <group>
        <range v-model="data9" :min="minAge" :range-bar-height="4" @on-change="changeAge"></range>
      </group>
      <div class="remark">(可拖动滑块改变年龄)</div>
    </div>
    <div class="footer">
      <div style="position: absolute;">
        <img :src="defaultIcon" class="left_img" />
        <div class="left_title">理财师：{{user}}</div>
      </div>
      <div style="position: absolute;">
        <img :src="phoneIcon" class="right_img" />
        <a :href="phone" class="right_title">{{phoneNumber}}</a>
     </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Group,Range} from 'vux'
  export default {
    components: {
      Group,
      Range
    },
    created(){
    document.setTitle = function (t) {
      document.title = t;
      var i = document.createElement('iframe');
      i.src = '//m.baidu.com/favicon.ico';
      i.style.display = 'none';
      i.onload = function () {
        setTimeout(function () {
          i.remove();
        }, 9)
      }
      document.body.appendChild(i);
    }

    setTimeout(function () {
      document.setTitle('计划书详情');
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
      trueUrl=JSON.stringify(vm.$store.state.productInfo)+"&planParams="+vm.$store.state.passParam.itemName+"&local="+localStorage.wxToken+"&user="+JSON.parse(window.localStorage.userInfo).user.userName+'&phoneCode='+JSON.parse(window.localStorage.userInfo).user.phoneCode+"&phone="+JSON.parse(window.localStorage.userInfo).user.phone;
      trueUrl=encodeURIComponent(trueUrl);
    }else{
      var url=decodeURIComponent(location.href);
      var i=url.indexOf('?');
      var j=url.indexOf('?',i+1);
      var url1=url.substr(j);
      trueUrl=encodeURIComponent(url1);
    }
    var linkUrl='http://weixin.fortunefed.com/#/plan?baseInfo='+trueUrl;
    vm.$wechat.ready(function() {
      vm.$wechat.onMenuShareTimeline({
        title: '财联邦', // 分享标题
        link: linkUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: '', // 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      });
      vm.$wechat.onMenuShareAppMessage({
        title: '财联邦', // 分享标题
        desc: '', // 分享描述
        link: linkUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: '', // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
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
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      data9: 0,
      gender: '',
      isSmoking: '',
      currency: '',
      payMethod: '',
      optionsYear: '',
      plnEPlanTemplateBigList: [],
      planParams: this.$store.state.passParam.itemName,
      baseInfo: this.$store.state.productInfo,
      baseInfo1: this.$store.state.productInfo.passPar,
      icon: require('../../assets/img/bg@2x.png'),
      list: [],  //标题汇总
      list1: [],
      list2: [],
      list3: [],
      minAge: 50,
      dieMoney: {},
      show:false,
      amountType:null,
      subline:null,
      user:null,
      phoneIcon:require('../../assets/img/icon_phone@2x.png'),
      defaultIcon:require('../../assets/img/headerIcon.png'),
      phone:null,
      phoneNumber:null,
      itemName:null,
      supplierName:null,
      yearPermium:null,
      coverage:null
    }
  },
  mounted(){
    function isEmptyObject(e) {
      var t;
      for (t in e)
        return true;
      return false;
    };
    let vm=this;
    if(!isEmptyObject(vm.planParams)&&!isEmptyObject(vm.baseInfo)){
      var url=decodeURIComponent(location.href);
      var i=url.indexOf('?');
      var j=url.indexOf('?',i+1);
      var url1=url.substr(0,i-1)+url.substr(j);
      var list=url1.split('=');
      var str=list[1];
      var k=str.indexOf('&');
      str=str.substr(0,k);
      vm.baseInfo=JSON.parse(str);
      vm.baseInfo1=vm.baseInfo.passPar;
      str=list[2];
      k=str.indexOf('&');
      str=str.substr(0,k);
      vm.planParams=str;
      str=list[3];
      k=str.indexOf('&');
      str=str.substr(0,k);
      localStorage.wxToken=str.toString();
      str=list[4];
      k=str.indexOf('&');
      str=str.substr(0,k);
      vm.user=str;
      str=list[5];
      k=str.indexOf('&');
      str=str.substr(0,k);
      var strl=list[6];
      vm.phone='tel:'+str+strl;
      vm.phoneNumber=strl;
    }else{
      vm.user=JSON.parse(window.localStorage.userInfo).user.userName;
      vm.phone='tel:'+JSON.parse(window.localStorage.userInfo).user.phoneCode.toString()+JSON.parse(window.localStorage.userInfo).user.phone.toString();
      vm.phoneNumber=JSON.parse(window.localStorage.userInfo).user.phone;
    }
    vm.getElePlan();
    vm.getPersonalPhoto();
  },
  methods:{
    getArrayValue(array, key)
    {
      return array.filter(x=> {
        return x.key === key;
      })[0].value;
    },
    getPersonalPhoto(){
      let _this = this;
      _this.$post('/api/channel/personal/query',{channelId:JSON.parse(window.localStorage.userInfo).user.relatedPartyId})
        .then(response=>{
          if(response.success){
            _this.defaultIcon = response.rows[0].photoFilePath?_this.$store.getters.getPictureUrl+ response.rows[0].photoFilePath:_this.defaultIcon;
          }
        })
    },
    getElePlan()
    {
      let _this = this;
      if(_this.baseInfo.amountType==='IP'){
        _this.yearPermium=_this.baseInfo.coverage;
        _this.coverage='-';
      }
      if(_this.baseInfo.amountType==='IC'){
        _this.coverage=_this.baseInfo.coverage;
        _this.yearPermium=_this.baseInfo.yearPermium;
      }
      _this.itemName=_this.baseInfo.itemName;
      _this.supplierName=_this.baseInfo.supplierName;
      _this.gender = _this.baseInfo.gender === 'F' ? '女' : '男';
      _this.isSmoking = _this.baseInfo.smokeFlag === 'Y' ? '吸烟' : '不吸烟';
      _this.currency = _this.getArrayValue(_this.baseInfo1.currencies, _this.baseInfo.currency);
      _this.payMethod = _this.getArrayValue(_this.baseInfo1.payMethods, _this.baseInfo.payMethod);
      _this.optionsYear = _this.baseInfo.productionAgeLimit;
      _this.amountType=_this.getArrayValue(_this.baseInfo1.amountTypes,_this.baseInfo.amountType);
      _this.minAge = Number(_this.baseInfo.age);
      if (_this.minAge > 50) {
        _this.data9 = _this.baseInfo.age;
      } else {
        _this.data9 = 50;
      }
      for(let i in _this.baseInfo1.optionsYear){
        if(_this.baseInfo.productionAgeLimit===_this.baseInfo1.optionsYear[i].value){
          _this.subline=_this.baseInfo1.optionsYear[i].sublineItemName;
          _this.baseInfo.productionAgeLimit=_this.baseInfo1.optionsYear[i].sublineId;
        }
      }
      let  param = {
        "age": _this.baseInfo.age,
        "gender":_this.baseInfo.gender,
        "itemId":_this.baseInfo.itemCode,
        "payMethod":_this.baseInfo.payMethod,
        "smokeFlag":_this.baseInfo.smokeFlag,
        "currency":_this.baseInfo.currency,
        "amount": _this.baseInfo.coverage,
        "amountType":_this.baseInfo.amountType,
        "sublineId":_this.baseInfo.productionAgeLimit,
        "nationalityClass":_this.baseInfo.nationalityClass
        };
      let  url = '/api/plnEPlanTemplate/queryWsPlnEPlanTemplate';
      _this.$vux.loading.show({text: 'loading'});
      _this.$post(url, param).then(response=> {
        _this.$vux.loading.hide();
        if (response) {
          if (response.success) {
            if (response.total > 0) {
              if(_this.baseInfo.amountType==='IP'){
                _this.yearPermium=_this.baseInfo.coverage;
                _this.coverage=response.rows[0].amount;
              }
              _this.show=true;
              _this.planInfo = response.rows[0];
              _this.list = response.rows[0].plnEPlanTemplateBigList;
            }else{
              _this.$vux.toast.show({text:'该产品暂无电子计划书'});
              _this.show=false;
            }
            let data = [{
              "age": _this.minAge,
              "coverage": _this.baseInfo.coverage,
              "currency": _this.baseInfo.currency,
              "gender": _this.baseInfo.gender,
              "itemId": _this.baseInfo.itemCode,
              "nextAge": _this.data9,
              "paymentMethod": _this.baseInfo.payMethod,
              "productionAgeLimit": _this.subline,
              "smokeFlag": _this.baseInfo.smokeFlag,
//              "amountType":_this.baseInfo.amountType,
            }];
            _this.$post('/api/public/production/queryCash', data).then(function (response) {
              _this.dieMoney = response.rows[0];
            }, function (response) {

            });
          }
        }
      });
    }
  ,
    changeAge()
    {
      var vm = this;
      let data = [{
        "age": vm.minAge,
        "coverage": vm.baseInfo.coverage,
        "currency": vm.baseInfo.currency,
        "gender": vm.baseInfo.gender,
        "itemId": vm.baseInfo.itemCode,
        "nextAge": vm.data9,
        "paymentMethod": vm.baseInfo.payMethod,
        "productionAgeLimit": vm.subline,
        "smokeFlag": vm.baseInfo.smokeFlag,
//        "amountType":vm.baseInfo.amountType,
      }];
      setTimeout(function () {
        if (data[0].nextAge === vm.data9) {
          vm.$post('/api/public/production/queryCash', data).then(function (response) {
            vm.dieMoney = response.rows[0];
          }, function (response) {

          });
        }
      }, 500);

    }
  }
  }
</script>

<style lang="scss">
  /*@import "../../assets/css/common.scss";*/
  .plan {
    width: 100%;
    position: absolute;
    min-height: 100%;
    background: white;
    padding-bottom:5rem;

  .titleImg {
     position:relative;
  img {
    width: 100%;
  }
  .up_title{
    position: absolute;
    z-index: 22;
    font-size: 1.8rem;
    color: #555;
    display: block;
    justify-content: center;
    top: 20%;
    right: 40%;
    min-width: 20%;
    text-align: center;
  }
  .down_title{
    z-index: 22;
    font-size: 1.4rem;
    color: #00b0fb;
    min-width: 40%;
    top: 50%;
    right: 30%;
    display: block;
    border: 1px solid #00b0fb;
    position: absolute;
    text-align: center;
  }

  }
  .cardList {
    box-shadow: 0 2px 5px 1px #888888;
    padding: 0 10px 20px;
    width: calc(100% - 30px);
    box-sizing: border-box;
    margin: 20px 15px 0;

  .cardTitle {
    display: block;
    border-bottom: 1px solid gainsboro;
    line-height: 40px;
    font-size: 1.6rem;
    font-weight: 600;
  }

  .information {
    width: 49%;
    line-height: 40px;
    position: relative;
    display: inline-block;

  div {
    display: inline-block;
  }

  }
  .littleTitle {
    line-height: 30px;
    font-weight: 600;
  }

  .textDesc {

  span {
    display: inline-block;
    height: 20px;
    padding: 5px 0 5px 10px;

  & ::before {
    position: absolute;
    content: '';
    width: 5px;
    height: 5px;
    background: green;
    border-radius: 5px;
    margin-top: 7px;
    left: 27px;
  }

  }
  }
  .money {
    width: 100%;
    line-height: 40px;
  }

  div {
    display: block;
  }

  .remark {
    text-align: center;
    color: #999;
  }

  .weui-cells {
    height: 30px;
    padding: 20px 10px 0;
    margin-top: 0;
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

  }

  .footer{
    background-color:#7A7A7B;
    height:5rem;
    width:100%;
    position: fixed;
    bottom:0;
  }
  .left_img{
    height: 3rem;
    width: 3rem;
    margin-top: 1rem;
    margin-left: 10px;
    float:left;
  }
  .left_title{
    display: inline-block;
    margin-left: 10px;
    margin-top: 1.8rem;
    color:white;
  }
  .right_title{
    display: inline-block;
    margin-left: 5px;
    margin-top:1.8rem;
    color:white;
  }
  .right_img{
    height: 1.4rem;
    width: 1.4rem;
    margin-top: 1.8rem;
    margin-left:20rem;
    float:left;
  }
  a{
    text-decoration: none;
  }
  }

</style>

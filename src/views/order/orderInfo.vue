<template>
  <div class="orderInfo">
    <div class="orderList">
      <div class="header">
        <span>{{orderList.itemName}}{{orderList.sublineItemName}}</span>
        <span>{{orderList.statusDesc}}</span>
      </div>
      <div class="content">
        <div class="imgIcon">
          <img :src="orderList.prdSupplierFilePath">
        </div>
        <div class="desc">
          <div class="orderDesc">
            <div class="descLabel">订单编号:</div>
            <span>{{orderList.orderNumber}}</span>
          </div>
          <div class="orderDesc">
            <div class="descLabel">保单编号:</div>
            <span>{{orderList.policyNumber}}</span>
          </div>
          <div class="orderDesc">
            <div class="descLabel">预约签单时间:</div>
            <span>{{orderList.reserveDate}}</span>
          </div>
          <div class="orderDesc">
            <div class="descLabel">投保人:</div>
            <span>{{orderList.applicant}}</span>
          </div>
          <div class="orderDesc">
            <div class="descLabel">被保人:</div>
            <span>{{orderList.insurant}}</span>
          </div>
          <div class="orderDesc">
            <div class="descLabel">保险期间:</div>
            <span>{{orderList.sublineItem1}}</span>
          </div>
          <div class="orderDesc">
            <div class="descLabel">保费金额:</div>
            <span>{{orderList.yearPayAmount}}{{orderList.currency}}</span>
          </div>
          <div class="orderDesc" v-if="orderList.statusDesc==='保障中'">
            <div class="descLabel">下期保费日:</div>
            <span>{{orderList.nextPolicyDueDate}}</span>
          </div>
        </div>
      </div>
      <div class="footer">
        <a  :href="phone"><div :class="orderType?'borderSpan':'borderSpan1'">联系理财师</div></a>
        <div v-if="orderType" class="borderSpan" @click="goPage()">
          查看保单暂挂
        </div>
      </div>
    </div>


    <div class="two" @click="showApplicant =!showApplicant;">
      <img :src="icon1" class="two_left"/>
      <span class="two_middle">投保人信息</span>
      <span><x-icon type="ios-arrow-up" size="30" v-if="showApplicant" class="two_right"></x-icon></span>
      <span><x-icon type="ios-arrow-down" size="30" v-if="!showApplicant" class="two_right"></x-icon></span>
    </div>

      <div class="product" v-if="showApplicant">
          <div v-for="(item,index) in applicantList">
            <div class="other"><span>中文姓名：</span><span>{{item.chineseName}}</span></div>
            <div class="other"><span>英文拼音姓名：</span><span>{{item.englishName}}</span></div>
            <div class="other"><span>出生日期：</span><span>{{item.birthDate}}</span></div>
            <div class="other"><span>性别：</span><span>{{item.sex}}</span></div>
            <div class="other"><span>国籍：</span><span>{{item.nationality}}</span></div>
            <div class="other"><span>身高(cm)：</span><span>{{item.height}}</span></div>
            <div class="other"><span>体重(kg)：</span><span>{{item.weight}}</span></div>
            <div class="other"><span>教育程度：</span><span>{{item.education}}</span></div>
            <div class="other"><span>婚姻状况：</span><span>{{item.marriageStatus}}</span></div>
            <div class="other"><span>是否美国公民或税务居民：</span><span>{{item.americanCitizenFlag}}</span></div>
            <div class="other"><span>身份证号：</span><span>{{item.identityNumber}}</span></div>
            <div class="other"><span>身份证有效期：</span><span>{{item.identityEffectiveDate}}</span></div>
            <div class="other"><span>其他证件：</span><span>{{item.certificateType}}</span></div>
            <div class="other"><span>证件号码：</span><span>{{item.certificateNumber}}</span></div>
            <div class="other"><span>证件有效期：</span><span>{{item.certificateEffectiveDate}}</span></div>
            <div class="other"><span>身份证地址：</span><span>{{item.identityNation}} {{item.identityProvince}} {{item.identityCity}}</span>
            </div>
            <div class="other"><span>是否以身份证作为地址证明：</span><span>{{item.identityFlag}}</span></div>
            <div class="other"><span>邮寄通讯地址：</span><span>{{item.postNation}} {{item.postProvince}} {{item.postCity}}</span>
            </div>
            <div class="other"><span>详细地址：</span><span>{{item.postAddress}}</span></div>
            <div class="other"><span>联系电话：</span><span>{{item.phoneCode}}</span><span style="margin-left: 5px">{{item.phone}}</span></div>
            <div class="other"><span>电子邮箱：</span><span>{{item.email}}</span></div>
            <div class="other"><span>公司名称：</span><span>{{item.companyName}}</span></div>
            <div class="other"><span>公司业务性质(行业)：</span><span>{{item.industry}}</span></div>
            <div class="other"><span>公司地址：</span><span>{{item.companyNation}} {{item.companyProvince}} {{item.companyCity}}</span></div>
            <div class="other"><span>详细地址：</span><span>{{item.companyAddress}}</span></div>
            <div class="other"><span>职位：</span><span>{{item.job}}</span></div>
            <div class="other"><span>职务：</span><span>{{item.position}}</span></div>
            <div class="other"><span>月收入水平(港币)：</span><span>{{item.income}}</span></div>
            <div class="other"><span>保费资金来源：</span><span>{{item.premiumSource}}</span></div>
            <div class="other"><span>每月支出约多少：</span><span>{{item.amountPerMonth}}</span></div>
            <div class="other"><span>您持有多少流动资产：</span><span>{{item.currentAssets}}</span></div>
            <div class="other"><span>年持有不动资产的总值：</span><span>{{item.fixedAssets}}</span></div>
            <div class="other"><span class="left1">您每年承担的保费占您个人收入比例约为多少：</span><span v-show="item.premiumRate!=null" class="right1">{{item.premiumRate}}</span></div>
            <div class="other"><span>您现时负债大约多少：</span><span>{{item.liabilities}}</span></div>
            <!--<div class="other"><span class="left1">您每年承担的保费占您个人收入比例约为多少：</span><span class="right1">{{item.premiumSource}}</span></div>-->
            <div class="other"><span class="left1">您是否曾被保险公司拒保、推迟承保、增加保费或更改首保条件?</span><span class="right1">{{item.badFlag}}</span></div>
            <div class="other" v-if="item.badFlag==='是'"><span>承保保险公司：</span><span>{{item.badInsuranceName}}</span></div>
            <div class="other" v-if="item.badFlag==='是'"><span>保险种类：</span><span>{{item.badInsuranceType}}</span></div>
            <div class="other" v-if="item.badFlag==='是'"><span>保险生效年月：</span><span>{{item.badEffactiveDate}}</span></div>
            <div class="other"><span class="left1">您是否因意外、伤病或健康理由而申请社会福利或社会赔偿?</span><span class="right1">{{item.compensateFlag}}</span></div>
            <div class="other" v-if="item.compensateFlag==='是'"><span>承保保险公司：</span><span>{{item.compensateInsuranceName}}</span></div>
            <div class="other" v-if="item.compensateFlag==='是'"><span>保险种类：</span><span>{{item.compensateInsuranceType}}</span></div>
            <div class="other" v-if="item.compensateFlag==='是'"><span>保险生效年月：</span><span>{{item.compensateEffactiveDate}}</span></div>
          </div>
        </div>


    <div class="two" @click="showInsurant =!showInsurant;">
      <img :src="icon2" class="two_left"/>
      <span class="two_middle">被保人信息</span>
      <span><x-icon type="ios-arrow-up" size="30" v-if="showInsurant" class="two_right"></x-icon></span>
      <span><x-icon type="ios-arrow-down" size="30" v-if="!showInsurant" class="two_right"></x-icon></span>
    </div>

    <div class="product" v-if="showInsurant">
          <div v-for="(item,index) in insurantList">
            <div class="other"><span>中文姓名：</span><span>{{item.chineseName}}</span></div>
            <div class="other"><span>英文拼音姓名：</span><span>{{item.englishName}}</span></div>
            <div class="other"><span>出生日期：</span><span>{{item.birthDate}}</span></div>
            <div class="other"><span>性别：</span><span>{{item.sex}}</span></div>
            <div class="other"><span>国籍：</span><span>{{item.nationality}}</span></div>
            <div class="other"><span>身高(cm)：</span><span>{{item.height}}</span></div>
            <div class="other"><span>体重(kg)：</span><span>{{item.weight}}</span></div>
            <div class="other"><span>教育程度：</span><span>{{item.education}}</span></div>
            <div class="other"><span>婚姻状况：</span><span>{{item.marriageStatus}}</span></div>
            <div class="other"><span>是否美国公民或税务居民：</span><span>{{item.americanCitizenFlag}}</span></div>
            <div class="other"><span>身份证号：</span><span>{{item.identityNumber}}</span></div>
            <div class="other"><span>身份证有效期：</span><span>{{item.identityEffectiveDate}}</span></div>
            <div class="other"><span>其他证件：</span><span>{{item.certificateType}}</span></div>
            <div class="other"><span>证件号码：</span><span>{{item.certificateNumber}}</span></div>
            <div class="other"><span>证件有效期：</span><span>{{item.certificateEffectiveDate}}</span></div>
            <div class="other"><span>身份证地址：</span><span>{{item.identityNation}} {{item.identityProvince}} {{item.identityCity}}</span>
            </div>
            <div class="other"><span>是否以身份证作为地址证明：</span><span>{{item.identityFlag}}</span></div>
            <div class="other"><span>邮寄通讯地址：</span><span>{{item.postNation}} {{item.postProvince}} {{item.postCity}}</span>
            </div>
            <div class="other"><span>详细地址：</span><span>{{item.postAddress}}</span></div>
            <div class="other"><span>联系电话：</span><span>{{item.phoneCode}}</span><span style="margin-left: 5px">{{item.phone}}</span></div>
            <div class="other"><span>电子邮箱：</span><span>{{item.email}}</span></div>
            <div class="other"><span>公司名称：</span><span>{{item.companyName}}</span></div>
            <div class="other"><span>公司业务性质(行业)：</span><span>{{item.industry}}</span></div>
            <div class="other"><span>公司地址：</span><span>{{item.companyNation}} {{item.companyProvince}} {{item.companyCity}}</span></div>
            <div class="other"><span>详细地址：</span><span>{{item.companyAddress}}</span></div>
            <div class="other"><span>职位：</span><span>{{item.job}}</span></div>
            <div class="other"><span>职务：</span><span>{{item.position}}</span></div>
            <div class="other"><span>月收入水平(港币)：</span><span>{{item.income}}</span></div>
            <div class="other"><span>保费资金来源：</span><span>{{item.premiumSource}}</span></div>
            <div class="other"><span>每月支出约多少：</span><span>{{item.amountPerMonth}}</span></div>
            <div class="other"><span>您持有多少流动资产：</span><span>{{item.currentAssets}}</span></div>
            <div class="other"><span>年持有不动资产的总值：</span><span>{{item.fixedAssets}}</span></div>
            <div class="other"><span class="left1">您每年承担的保费占您个人收入比例约为多少：</span><span v-show="item.premiumRate!=null" class="right1">{{item.premiumRate}}</span></div>
            <div class="other"><span>您现时负债大约多少：</span><span>{{item.liabilities}}</span></div>
            <!--<div class="other"><span class="left1">您每年承担的保费占您个人收入比例约为多少：</span><span class="right1">{{item.premiumSource}}</span></div>-->
            <div class="other"><span class="left1">您是否曾被保险公司拒保、推迟承保、增加保费或更改首保条件?</span><span class="right1">{{item.badFlag}}</span></div>
            <div class="other" v-if="item.badFlag==='是'"><span>承保保险公司：</span><span>{{item.badInsuranceName}}</span></div>
            <div class="other" v-if="item.badFlag==='是'"><span>保险种类：</span><span>{{item.badInsuranceType}}</span></div>
            <div class="other" v-if="item.badFlag==='是'"><span>保险生效年月：</span><span>{{item.badEffactiveDate}}</span></div>
            <div class="other"><span class="left1">您是否因意外、伤病或健康理由而申请社会福利或社会赔偿?</span><span class="right1">{{item.compensateFlag}}</span></div>
            <div class="other" v-if="item.compensateFlag==='是'"><span>承保保险公司：</span><span>{{item.compensateInsuranceName}}</span></div>
            <div class="other" v-if="item.compensateFlag==='是'"><span>保险种类：</span><span>{{item.compensateInsuranceType}}</span></div>
            <div class="other" v-if="item.compensateFlag==='是'"><span>保险生效年月：</span><span>{{item.compensateEffactiveDate}}</span></div>
            </div>
        </div>

    <div class="two" @click="showBenefit =!showBenefit;">
    <img :src="icon3" class="two_left"/>
    <span class="two_middle">受益人信息</span>
    <span><x-icon type="ios-arrow-up" size="30" v-if="showBenefit" class="two_right"></x-icon></span>
    <span><x-icon type="ios-arrow-down" size="30" v-if="!showBenefit" class="two_right"></x-icon></span>
  </div>

    <div class="product" v-if="showBenefit">
      <div  v-for="item in beneficiaryList">
        <div class="other"><span>中文姓名：</span><span>{{item.chineseName}}</span></div>
        <div class="other"><span>英文拼音姓名：</span><span>{{item.englishName}}</span></div>
        <div class="other"><span>年龄：</span><span>{{item.age}}</span></div>
        <div class="other"><span>身份证/护照号码：</span><span>{{item.identityNumber}}</span></div>
        <div class="other"><span>与被保人关系：</span><span>{{item.relationship}}</span></div>
        <div class="other"><span>分配比率(100%)：</span><span v-show="item.rate!=null">{{item.rate}}%</span></div>
        <img class="line" :src="line1"/>
      </div>
    </div>

    <div class="two" @click="showXuBao =!showXuBao;" v-if="baoList.length>0">
      <img :src="icon4" class="two_left"/>
      <span class="two_middle">续保记录</span>
      <span><x-icon type="ios-arrow-up" size="30" v-if="showXuBao" class="two_right"></x-icon></span>
      <span><x-icon type="ios-arrow-down" size="30" v-if="!showXuBao" class="two_right"></x-icon></span>
    </div>

    <div class="product" v-if="showXuBao">
      <div  v-for="item in baoList">
        <div class="other"><span>缴费期数：</span><span>{{item.payPeriods}}</span></div>
        <div class="other"><span>续保到期日：</span><span>{{item.date}}</span></div>
        <div class="other"><span>预计保费金额：</span><span>{{item.totalAmount}}{{item.currency}}</span></div>
        <div class="other"><span>状态：</span><span>{{item.status}}</span></div>
        <img class="line" :src="line1"/>
      </div>
    </div>

    <div class="two" @click="showAfterSale =!showAfterSale;" v-if="afterSaleList.length>0">
      <img :src="icon5" class="two_left"/>
      <span class="two_middle">其他售后记录</span>
      <span><x-icon type="ios-arrow-up" size="30" v-if="showAfterSale" class="two_right"></x-icon></span>
      <span><x-icon type="ios-arrow-down" size="30" v-if="!showAfterSale" class="two_right"></x-icon></span>
    </div>

    <div class="product" v-if="showAfterSale">
      <div  v-for="item in afterSaleList">
        <div class="other"><span>售后项目：</span><span>{{item.afterProjectDesc}}</span><span style="float: right;margin-right: 10px">{{item.submitDate}}</span></div>
        <div class="other"><span>项目分类：</span><span>{{item.afterTypeDesc}}</span></div>
        <img class="line" :src="line1" />
      </div>
    </div>



  </div>
</template>

<script type="text/ecmascript-6">

  export default {
      data () {
          return {
            orderType:false,
            orderId:'',
            orderList: {},
            payMethodList: [],
            prdItemPaymode: [],
            phoneCodeList: [],
            renewalStatus: [],
            certificateList: [],
            cityList: [],
            diplomaList: [],
            firstPayMethodList: [],
            genderList: [],
            marryList: [],
            nationalList: [],
            provinceList: [],
            relationshipList: [],
            renewalPayMethodList: [],
            beneficiaryList: [],
            insurantList: [],
            applicantList: [],
            afterSaleList: [],
            xuBaoList: [],
            baoList:[],
            pendingList:[],
            showApplicant:false,
            showInsurant:false,
            showBenefit:false,
            showXuBao:false,
            showAfterSale:false,
            icon1:require('../../assets/img/icon_policyHolder@3x.png'),
            icon2:require('../../assets/img/icon_recognizee@3x.png'),
            icon3:require('../../assets/img/icon_favoree@3x.png'),
            icon4:require('../../assets/img/icon_RenewalRecords@3x.png'),
            icon5:require('../../assets/img/icon_other@3x.png'),
            line1:require('../../assets/img/line.png'),
            phone:'',  //理财师电话
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
      document.setTitle('订单详情');
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
    var orderId=vm.$route.query.orderId
    vm.orderId=orderId;
    vm.$post('/api/clb/common/clbCode', {
      "payMethodList": "CMN.PAY_METHOD",   //缴费方式（如月缴）
      "prdItemPaymode": "PUB.CURRENCY",
      "phoneCodeList": "PUB.PHONE_CODE",
      "renewalStatus": "ORD.RENEWAL_STATUS",
      "certificateList": "CTM.CERTIFICATE_TYPE",  //证件类型
      "cityList": "PUB.CITY",
      "diplomaList": "CTM.DIPLOMA_TYPE",   //客户文凭
      "firstPayMethodList": "ORD.FIRST_PAYMENT_METHOD",  //第一次支付方式
      "genderList": "HR.EMPLOYEE_GENDER",  //性别
      "marryList": "CTM.MARITAL_STATUS",  //是否已婚
      "nationalList": "PUB.NATION",
      "provinceList": "PUB.PROVICE",
      "relationshipList": "ORD.RELATIONSHIP", //用户关系
      "renewalPayMethodList": "ORD.RENEWAL_PAYMENT_METHOD",  //续期支付方式
      "renewalStatus":"ORD.RENEWAL_STATUS"
    }).then(function (response) {
      vm.payMethodList = JSON.parse(response).payMethodList;
      vm.prdItemPaymode = JSON.parse(response).prdItemPaymode;
      vm.phoneCodeList = JSON.parse(response).phoneCodeList;
      vm.renewalStatus = JSON.parse(response).renewalStatus;
      vm.certificateList = JSON.parse(response).certificateList;
      vm.cityList = JSON.parse(response).cityList;
      vm.diplomaList = JSON.parse(response).diplomaList;
      vm.firstPayMethodList = JSON.parse(response).firstPayMethodList;
      vm.genderList = JSON.parse(response).genderList;
      vm.marryList = JSON.parse(response).marryList;
      vm.nationalList = JSON.parse(response).nationalList;
      vm.provinceList = JSON.parse(response).provinceList;
      vm.relationshipList = JSON.parse(response).relationshipList;
      vm.renewalPayMethodList = JSON.parse(response).renewalPayMethodList;
      second();
      three();
      forth();
      fifth();
      sixth();
      eight();
      nine();
    }, function (response) {
      console.log("接口出错了");
    })

    function second(){
      vm.$post('/api/ordOrder/query', {
        "orderId": orderId
      }).then(function (response) {
        vm.orderList = response.rows[0];
        vm.phone='tel:'+vm.orderList.channelPhoneCode+vm.orderList.channelPhone;
        vm.orderList.prdSupplierFilePath = vm.$store.getters.getPictureUrl + vm.orderList.prdSupplierFilePath;
        if (vm.orderList.sublineItemName !== null) {
          let num = Number(vm.orderList.sublineItemName);
          if (!isNaN(num)) {
            vm.orderList.sublineItemName = '(' + num + '年' + ')';
            vm.$set(vm.orderList, 'sublineItem1', num + '年');
          }
        }
        else {
          vm.orderList.sublineItemName = '';
        }
//        for (let i in vm.payMethodList) {  //缴费方式
//          if (vm.payMethodList[i].value === vm.orderList.payMethod) {
//            vm.orderList.payMethod = vm.payMethodList[i].meaning;
//          }
//        }
        for (let i in vm.prdItemPaymode) {    //币种
          if (vm.prdItemPaymode[i].value === vm.orderList.currency) {
            vm.orderList.currency = vm.prdItemPaymode[i].meaning;
          }
        }
//        for (let i in vm.firstPayMethodList) {  //第一次支付方式
//          if (vm.firstPayMethodList[i].value = vm.orderList.firstPaymentMethod) {
//            vm.orderList.firstPaymentMethod = vm.firstPayMethodList[i].meaning;
//          }
//        }
//        for (let i in vm.renewalPayMethodList) {  //续期支付
//          if (vm.renewalPayMethodList[i].value = vm.orderList.renewalPaymentMethod) {
//            vm.orderList.renewalPaymentMethod = vm.renewalPayMethodList[i].meaning;
//          }
//        }
//        for (let i in vm.phoneCodeList) {   //电话类型
//          if (vm.phoneCodeList[i].value === vm.orderList.hkContactPhoneCode) {
//            vm.orderList.hkContactPhoneCode = vm.phoneCodeList[i].meaning;
//          }
//        }
        if(vm.orderList.reserveDate!==null||vm.orderList.reserveDate!==''){
          let date=new Date(vm.orderList.reserveDate.replace(/-/g,'/'));
          vm.orderList.reserveDate=date.format('yyyy-MM-dd');
        }


      }, function (response) {
        console.log("接口出错了");
      })
    }
    function three(){
      vm.$post('/api/ordOrderRenewal/query', {
        "orderId": orderId
      }).then(function (response) {
        vm.xuBaoList = response.rows[0];
        if(response.rows.length>0){
          for(var i=2;i<=120;i++){
            var list={};
            if(vm.xuBaoList['renewalFlag'+i]==='Y'){
              let date=new Date(vm.xuBaoList['renewalDate'+i].replace(/-/g,'/'));
              list.date=date.format('yyyy/MM/dd');
              list.currency=vm.xuBaoList['currency'+i];
              if(vm.xuBaoList['totalAmount'+i]!==null){
                list.totalAmount=vm.xuBaoList['totalAmount'+i];
              }else{
                list.totalAmount='';
              }
//              list.payPeriods=vm.xuBaoList.payPeriods;
              list.payPeriods=i;
              if(vm.xuBaoList['renewalStatus'+i]!==null){
                for(let j in vm.renewalStatus){
                  if(vm.renewalStatus[j].value===vm.xuBaoList['renewalStatus'+i]){
                    list.status=vm.renewalStatus[j].meaning;
                  }
                }
              }else{
                list.status='';
              }
              vm.baoList.push(list);
            }
          }

          for(let k in vm.baoList){
            for(let j in vm.prdItemPaymode){
              if(vm.baoList[k].currency===vm.prdItemPaymode[j].value){
                vm.baoList[k].currency=vm.prdItemPaymode[j].meaning;
              }
            }
          }
        }

      }, function () {
        console.log('接口出错了');
      })
    }
    function forth(){
      vm.$post('/api/ordBeneficiary/query', {
        "orderId": orderId
      }).then(function (response) {
        vm.beneficiaryList = response.rows;
        for(let i in vm.beneficiaryList){
          //关系
          for (let j in vm.relationshipList) {
            if (vm.relationshipList[j].value === vm.beneficiaryList[i].relationship) {
              vm.beneficiaryList[i].relationship = vm.relationshipList[j].meaning;
            }
          }
        }
      }, function (response) {
        console.log("接口出错了");
      })
    }
    function fifth(){
      vm.$post('/api/ordCustomer/query', {
        "orderId": orderId,
        "customerType": "APPLICANT"
      }).then(function (response) {
        vm.applicantList = response.rows;
        for (let i in vm.applicantList) {
          for (let j in vm.genderList) {   //性别
            if (vm.applicantList[i].sex === vm.genderList[j].value) {
              vm.applicantList[i].sex = vm.genderList[j].meaning;
            }
          }
          for (let j in vm.nationalList) {  //国籍
            if (vm.applicantList[i].nationality === vm.nationalList[j].value) {
              vm.applicantList[i].nationality = vm.nationalList[j].meaning;
            }
            if (vm.applicantList[i].identityNation === vm.nationalList[j].value) {
              vm.applicantList[i].identityNation = vm.nationalList[j].meaning;
            }
            if (vm.applicantList[i].postNation === vm.nationalList[j].value) {
              vm.applicantList[i].postNation = vm.nationalList[j].meaning;
            }
            if (vm.applicantList[i].companyNation === vm.nationalList[j].value) {
              vm.applicantList[i].companyNation = vm.nationalList[j].meaning;
            }
          }
          for (let j in vm.diplomaList) {  //文凭
            if (vm.applicantList[i].identityNation === vm.diplomaList[j].value) {
              vm.applicantList[i].identityNation = vm.diplomaList[j].meaning;
            }
          }
          for (let j in vm.cityList) {   //身份证市的详细地址
            if (vm.cityList[j].value === vm.applicantList[i].identityCity) {
              vm.applicantList[i].identityCity = vm.cityList[j].meaning;
            }
            if (vm.cityList[j].value === vm.applicantList[i].postCity) {
              vm.applicantList[i].postCity = vm.cityList[j].meaning;
            }
            if (vm.cityList[j].value === vm.applicantList[i].companyCity) {
              vm.applicantList[i].companyCity = vm.cityList[j].meaning;
            }

          }
          for (let j in vm.provinceList) {   //身份证省的详细地址
            if (vm.provinceList[j].value === vm.applicantList[i].identityProvince) {
              vm.applicantList[i].identityProvince = vm.provinceList[j].meaning;
            }
            if (vm.provinceList[j].value === vm.applicantList[i].postProvince) {
              vm.applicantList[i].postProvince = vm.provinceList[j].meaning;
            }
            if (vm.provinceList[j].value === vm.applicantList[i].companyProvince) {
              vm.applicantList[i].companyProvince = vm.provinceList[j].meaning;
            }
          }
          for (let j in vm.phoneCodeList) {   //电话类型
            if (vm.phoneCodeList[j].value === vm.applicantList[i].phoneCode) {
              vm.applicantList[i].phoneCode = vm.phoneCodeList[j].meaning;
            }
          }
          for (let j in vm.certificateList) {   //证件类型
            if (vm.certificateList[j].value === vm.applicantList[i].certificateType) {
              vm.applicantList[i].certificateType = vm.certificateList[j].meaning;
            }
          }
          for (let j in vm.marryList) {   //婚姻状态
            if (vm.marryList[j].value === vm.applicantList[i].marriageStatus) {
              vm.applicantList[i].marriageStatus = vm.marryList[j].meaning;
            }
          }
          for (let j in vm.diplomaList) {   //教育状态
            if (vm.diplomaList[j].value === vm.applicantList[i].education) {
              vm.applicantList[i].education = vm.diplomaList[j].meaning;
            }
          }
          if (vm.applicantList[i].americanCitizenFlag === 'N') {
            vm.applicantList[i].americanCitizenFlag = "否";
          }
          if (vm.applicantList[i].americanCitizenFlag === 'Y') {
            vm.applicantList[i].americanCitizenFlag = "是";
          }
          if (vm.applicantList[i].identityFlag === 'N') {
            vm.applicantList[i].identityFlag = "否";
          }
          if (vm.applicantList[i].identityFlag === 'Y') {
            vm.applicantList[i].identityFlag = "是";
          }
          let date = new Date(vm.applicantList[i].certificateEffectiveDate.replace(/-/g,'/'));
          vm.applicantList[i].certificateEffectiveDate = date.format('yyyy/MM/dd');
          date = new Date(vm.applicantList[i].birthDate.replace(/-/g,'/'));
          vm.applicantList[i].birthDate = date.format('yyyy/MM/dd');
          date = new Date(vm.applicantList[i].identityEffectiveDate.replace(/-/g,'/'));
          vm.applicantList[i].identityEffectiveDate = date.format('yyyy/MM/dd');
          if(vm.applicantList[i].badFlag==='Y'){
            let date=new Date(vm.applicantList[i].badEffactiveDate.replace(/-/g,'/'));
            vm.applicantList[i].badEffactiveDate=date.format('yyyy/MM/dd');
            vm.applicantList[i].badFlag='是';
          }
          if(vm.applicantList[i].badFlag==='N'){
            vm.applicantList[i].badFlag='否';
          }
          if(vm.applicantList[i].compensateFlag==='Y'){
            let date=new Date(vm.applicantList[i].compensateEffactiveDate.replace(/-/g,'/'));
            vm.applicantList[i].compensateEffactiveDate=date.format('yyyy/MM/dd');
            vm.applicantList[i].compensateFlag='是';
          }
          if(vm.applicantList[i].compensateFlag==='N'){
            vm.applicantList[i].compensateFlag='否';
          }
          vm.applicantList[i].premiumRate=Number(vm.applicantList[i].premiumRate*100).toFixed(2)+'%';


        }

      }, function (response) {
        console.log('接口出错了');
      })
    }
    function sixth(){
      vm.$post('/api/ordCustomer/query', {
        "orderId": orderId,
        "customerType": "INSURANT"
      }).then(function (response) {
        vm.insurantList = response.rows;
        for (let i in vm.insurantList) {
          for (let j in vm.genderList) {   //性别
            if (vm.insurantList[i].sex === vm.genderList[j].value) {
              vm.insurantList[i].sex = vm.genderList[j].meaning;
            }
          }
          for (let j in vm.nationalList) {  //国籍
            if (vm.insurantList[i].nationality === vm.nationalList[j].value) {
              vm.insurantList[i].nationality = vm.nationalList[j].meaning;
            }
            if (vm.insurantList[i].identityNation === vm.nationalList[j].value) {
              vm.insurantList[i].identityNation = vm.nationalList[j].meaning;
            }
            if (vm.insurantList[i].postNation === vm.nationalList[j].value) {
              vm.insurantList[i].postNation = vm.nationalList[j].meaning;
            }
            if (vm.insurantList[i].companyNation === vm.nationalList[j].value) {
              vm.insurantList[i].companyNation = vm.nationalList[j].meaning;
            }
          }
          for (let j in vm.cityList) {   //身份证市的详细地址
            if (vm.cityList[j].value === vm.insurantList[i].identityCity) {
              vm.insurantList[i].identityCity = vm.cityList[j].meaning;
            }
            if (vm.cityList[j].value === vm.insurantList[i].postCity) {
              vm.insurantList[i].postCity = vm.cityList[j].meaning;
            }
            if (vm.cityList[j].value === vm.insurantList[i].companyCity) {
              vm.insurantList[i].companyCity = vm.cityList[j].meaning;
            }

          }
          for (let j in vm.provinceList) {   //身份证省的详细地址
            if (vm.provinceList[j].value === vm.insurantList[i].identityProvince) {
              vm.insurantList[i].identityProvince = vm.provinceList[j].meaning;
            }
            if (vm.provinceList[j].value === vm.insurantList[i].postProvince) {
              vm.insurantList[i].postProvince = vm.provinceList[j].meaning;
            }
            if (vm.provinceList[j].value === vm.insurantList[i].companyProvince) {
              vm.insurantList[i].companyProvince = vm.provinceList[j].meaning;
            }
          }
          for (let j in vm.phoneCodeList) {   //电话类型
            if (vm.phoneCodeList[j].value === vm.insurantList[i].phoneCode) {
              vm.insurantList[i].phoneCode = vm.phoneCodeList[j].meaning;
            }
          }
          for (let j in vm.certificateList) {   //证件类型
            if (vm.certificateList[j].value === vm.insurantList[i].certificateType) {
              vm.insurantList[i].certificateType = vm.certificateList[j].meaning;
            }
          }
          for (let j in vm.marryList) {   //婚姻状态
            if (vm.marryList[j].value === vm.insurantList[i].marriageStatus) {
              vm.insurantList[i].marriageStatus = vm.marryList[j].meaning;
            }
          }
          for (let j in vm.diplomaList) {   //教育状态
            if (vm.diplomaList[j].value === vm.insurantList[i].education) {
              vm.insurantList[i].education = vm.diplomaList[j].meaning;
            }
          }
          if (vm.insurantList[i].americanCitizenFlag === 'N') {
            vm.insurantList[i].americanCitizenFlag = "否";
          }
          if (vm.insurantList[i].americanCitizenFlag === 'Y') {
            vm.insurantList[i].americanCitizenFlag = "是";
          }
          if (vm.insurantList[i].identityFlag === 'N') {
            vm.insurantList[i].identityFlag = "否";
          }
          if (vm.insurantList[i].identityFlag === 'Y') {
            vm.insurantList[i].identityFlag = "是";
          }
          let date = new Date(vm.insurantList[i].certificateEffectiveDate.replace(/-/g,'/'));
          vm.insurantList[i].certificateEffectiveDate = date.format('yyyy/MM/dd');
          date = new Date(vm.insurantList[i].birthDate.replace(/-/g,'/'));
          vm.insurantList[i].birthDate = date.format('yyyy/MM/dd');
          date = new Date(vm.insurantList[i].identityEffectiveDate.replace(/-/g,'/'));
          vm.insurantList[i].identityEffectiveDate = date.format('yyyy/MM/dd');
          if(vm.insurantList[i].badFlag==='Y'){
            let date=new Date(vm.insurantList[i].badEffactiveDate.replace(/-/g,'/'));
            vm.insurantList[i].badEffactiveDate=date.format('yyyy/MM/dd');
            vm.insurantList[i].badFlag='是';
          }
          if(vm.insurantList[i].badFlag==='N'){
            vm.insurantList[i].badFlag='否';
          }
          if(vm.insurantList[i].compensateFlag==='Y'){
            let date=new Date(vm.insurantList[i].compensateEffactiveDate.replace(/-/g,'/'));
            vm.insurantList[i].compensateEffactiveDate=date.format('yyyy/MM/dd');
            vm.insurantList[i].compensateFlag='是';
          }
          if(vm.insurantList[i].compensateFlag==='N'){
            vm.insurantList[i].compensateFlag='否';
          }
          vm.insurantList[i].premiumRate=Number(vm.insurantList[i].premiumRate*100).toFixed(2)+'%';

        }
      }, function (response) {
        console.log("接口出错了");
      })
    }
    function eight(){
      vm.$post('/api/ordAfter/query', {
        "orderId": orderId
      }).then(function (response) {
        vm.afterSaleList=response.rows;
        for(let i in vm.afterSaleList){
          if(vm.afterSaleList[i].submitDate!=null){
            let date=new Date(vm.afterSaleList[i].submitDate.replace(/-/g,'/'));
            vm.afterSaleList[i].submitDate=date.format('yyyy-MM-dd');
          }else{
            vm.afterSaleList[i].submitDate='';
          }
        }
      }, function (response) {
        console.log("接口出错了");
      })
    }
    function nine(){
      vm.$post('/api/ordPending/query',{
        "orderId":orderId
      }).then(function(response){
        vm.pendingList=response.rows;
        console.log(vm.pendingList.length);
        if(vm.pendingList.length>0) {
          vm.orderType = true;
        }
      },function(response){
        vm.$vux.toast.show({text:'接口出错了'});
      })
    }

  },
  methods: {
    goPage:function(){
      var vm=this;
      vm.$router.push({path:'/policyPending',query:{orderId:vm.orderId,phone:vm.phone}});
    }
  },
  }
</script>

<style lang="scss">

  .orderInfo{
    min-height: 100%;
    width: 100%;
    background-color: #F4F4F7;
    position: absolute;

  div{
    display: block;
  }

    .orderList {
      padding: 10px;
      background: white;
      box-shadow: 0 2px 2px 1px gainsboro;
      margin-bottom: 20px;

  div {
    display: inline-block;
  }

  .header {
    line-height: 30px;
    width: 100%;
    font-size: 1.7rem;

  span:nth-child(2) {
    float: right;
    color: green;
    font-size: 1.5rem;
  }

  }

  .content {
    height: auto;
    width: 100%;
    /*border-bottom: 1px solid gainsboro;*/
    font-size: 1.4rem;
    color: #333;

  .imgIcon {
    width: 20%;
    text-align: left;
    vertical-align: top;

  img {
    width: 80%;
  }

  }
  .desc {
    width: 78%;
    padding: 0 0 20px;

  .orderDesc {
    display: block;
    line-height: 20px;

  .descLabel {
    min-width: 23%;
    text-align: justify;
    text-align-last: justify;
  }

  }
  }
  }
  .footer {
    width: 100%;
    line-height: 40px;
    text-align: center;
    font-size: 1.5rem;
    letter-spacing: 1px;

  .borderSpan {
    padding: 5px;
    line-height: 30px;
    border-radius: 5px;
    width: 45%;
    background: #E6A914;
    color: white;
  }

  .borderSpan1 {
    padding: 5px;
    line-height: 30px;
    border-radius: 5px;
    width: 90%;
    background: white;
    color: #E6A914;
    border: 1px solid #E6A914;
  }

  .insuranceMoney {
    float: right;
    border: 1px solid gainsboro;
    border-radius: 5px;
    width: 45%;
    padding: 5px;
    line-height: 30px;
    color: #999;
  }

  }
  }
  .two {
    height: 50px;
    background-color: white;
    margin-top: 10px;
    width:100%;


  .two_left {
    position: absolute;
    height: 30px;
    width: 30px;
    margin-left: 15.5px;
    padding-top: 1rem;
  }

  .two_middle {
    margin-top: 1.6rem;
    margin-left: 55.5px;
    position: absolute;
  }

  .two_right {
    margin-left: 85%;
    display: inline-block;
    margin-top: 1rem;
  }
  }


  .product {
    background-color: white;
    margin-top: 2px;
    line-height: 2;
    padding-bottom: 0.5rem;

  .other {
    margin-left: 15px;
    /*margin-top: 5px;*/

  span {
    font-size: 1rem;
    color: #333333;
  }
  .left1{
    display: inline-block;
    vertical-align: middle;
    width: 80%;
    line-height: 1.5;
  }
  .right1{
    display: inline-block;
    width: 20%;
    text-align: center;
  }
  }
  .line {
    width: 100%;
    height: 1px;
    margin-top: 10px;
  }



  }




    }

</style>

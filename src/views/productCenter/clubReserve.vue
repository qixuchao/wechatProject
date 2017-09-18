<template>
<div class="clubReserve">
  <!-- 会所预定-->
   <div class="header">
      <div class="header_title">{{title}}</div>
    </div>

  <div class="whole"><div class="left"><span style="color:#f63636 ">*</span>客户</div>
    <input class="right" placeholder="请选择" v-model="customName" @click="goCustom"  />
    <x-icon type="ios-arrow-right" size="35" @click="goCustom"></x-icon>
  </div>
  <div class="whole"><div class="left">保单订单编号</div>
    <group class="right_one">
      <x-textarea  placeholder="如果客户当天也预定了赴港签单，请输入订单编号，方便工作人员合理安排行程。" :show-counter="false" :rows="1" autosize v-model="policyNumber"></x-textarea>
    </group>
    <x-icon type="ios-search" size="35"  @click="goPolicy" ></x-icon>
  </div>


  <div class="whole_new">
    <div class="left"><span style="color:#f63636 ">*</span>会所位置</div>
    <group style="min-height: 3rem">
      <popup-radio  :options="clubList" v-model="clubAddress" placeholder="请选择"></popup-radio>
    </group>
  </div>

  <div class="whole_new">
    <div class="left"><span style="color:#f63636 ">*</span>使用时长</div>
    <group style="min-height: 3rem">
      <popup-radio  :options="timeList" v-model="clubTime"></popup-radio>
    </group>
  </div>

  <div class="whole"><div class="left">价格</div>
    <div class="right_new" >¥{{price}}</div>
  </div>

  <div class="whole_new">
    <div class="left"><span style="color:#f63636 ">*</span>预约时间</div>
    <group style="min-height: 3rem">
      <datetime v-model="time" format="YYYY/MM/DD HH:mm"  :title="start"></datetime>
    </group>
  </div>

  <!--<group>-->
    <!--<datetime v-model="time" format="YYYY/MM/DD HH:mm"  :title="start"></datetime>-->
  <!--</group>-->

  <div class="whole"><div class="left"><span style="color:#f63636 ">*</span>人数</div>
    <input class="right" placeholder="请输入" v-model="person" />
  </div>
  <div class="whole"><div class="left"><span style="color:#f63636 ">*</span>预约对接人</div>
    <input class="right" placeholder="请输入" v-model="reservePerson" />
  </div>


  <div class="whole"><div class="left"><span style="color:#f63636 ">*</span>预约对接人电话</div>
    <group  class="middle">
      <popup-radio :options="phoneCodeList" v-model="phoneCode"></popup-radio>
    </group>
    <input class="right" placeholder="请输入"  v-model="reservePersonPhone" />
  </div>



  <div class="comment_up">备注</div>
  <div class="comment_up_new">申请免费服务需填写投保信息，否则可不填</div>
  <input class="bottom" v-model="comment" />

    <div class="warmPrompt">
      <div class="warmPrompt_up">温馨提示：</div>
      <div class="warmPrompt_down">1.会所的预定使用时长2h起订，使用时间低于2h，均按2h的收费标准计算。</div>
      <div class="warmPrompt_dowm">2.预定会所的收费标准：会议室 300/h VIP室 150/h。</div>
    </div>

    <div class="button">
      <div class="button_left" @click="goBack">取消</div>
      <div class="button_right" @click="goApply">确认预约</div>
    </div>

  <div v-transfer-dom>
    <confirm v-model="show1" :title="title1" @on-cancel="onCancel1" @on-confirm="onConfirm1">
    </confirm>
  </div>

  <div v-transfer-dom>
    <confirm v-model="show2" :title="title2" @on-cancel="onCancel2" @on-confirm="onConfirm2">
    </confirm>
  </div>


</div>
</template>

<script type="text/ecmascript-6">
  import { Datetime, Group,PopupRadio,XTextarea,TransferDomDirective as TransferDom,Confirm } from 'vux';
  export default {
    directives: {
      TransferDom
    },
    components:{
      Datetime,
      Group,
      PopupRadio,
      XTextarea,
      Confirm


    },
    data(){
    return {
        title:"财联邦会所预定-预约资料填写",
        show1:false,
        show2:false,
        title1:"是否确认取消？",
        title2:"是否确认提交申请？",
        start:"",
        price:0.00,
        customName:null,
        policyNumber:null,
        icon:require("../../assets/img/query.png"),
        clubAddress:null,
        clubList:[],
        clubTime:"2h",
        timeList:['2h','3h','4h','5h','6h'],
        time:null,
        person:null,
        reservePerson:null,
        reservePersonPhone:null,
        comment:"",
        detail:{},
        phoneCodeList:[],
        phoneCodes:[],
        phoneCode:"",
        sublineId:null,
        channelId:null,
        orderId:null,
        customId:null,

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
      document.setTitle('会所预约');
    }, 1);
  },
  mounted:function(){
    var vm=this;
    vm.channelId=JSON.parse(window.localStorage.userInfo).user.relatedPartyId;
    vm.reservePerson=JSON.parse(window.localStorage.userInfo).user.userName;
    vm.phoneCode=JSON.parse(window.localStorage.userInfo).user.phoneCode;
    vm.reservePersonPhone=JSON.parse(window.localStorage.userInfo).user.phone;
    vm.$post('/api/clb/common/clbCode',{
      "phoneCodes": "PUB.PHONE_CODE"
    }).then(function(response){
      vm.phoneCodes=JSON.parse(response).phoneCodes;
      for (let i in vm.phoneCodes) {
        vm.phoneCodeList.push(vm.phoneCodes[i].meaning);
      }
      vm.phoneCode=vm.phoneCodeList[0];
    },function(response){
      vm.$vux.toast.show({text:'接口出错了'});
    })
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
    function isEmptyObject(e) {
      var t;
      for (t in e)
        return true;
      return false;
    };
    var customList=vm.$store.getters.getCustomerList;
    var policyList=vm.$store.getters.getPolicyList;
    if(isEmptyObject(customList)){
      vm.customName=customList.chineseName;
      vm.customId=customList.customerId;
    }
    if(isEmptyObject(policyList)){
      vm.policyNumber=policyList.orderNumber;
      vm.orderId=policyList.orderId;
    }
    vm.detail=vm.$store.getters.getProduct;
    for (let i in vm.detail.prdItemSublineList) {
      vm.clubList.push(vm.detail.prdItemSublineList[i].sublineItemName);
    }



  },
  watch:{
    clubAddress:function(newVal, oldVal) {
      var vm=this;
      for (let i in vm.detail.prdItemSublineList) {
        if (newVal === vm.detail.prdItemSublineList[i].sublineItemName) {
          if (vm.clubTime === "2h") {
            vm.price = 2 * vm.detail.prdItemSublineList[i].price;
          }
          if (vm.clubTime === "3h") {
            vm.price = 3 * vm.detail.prdItemSublineList[i].price;
          }
          if (vm.clubTime === "4h") {
            vm.price = 4 * vm.detail.prdItemSublineList[i].price;
          }
          if (vm.clubTime === "5h") {
            vm.price = 5 * vm.detail.prdItemSublineList[i].price;
          }
          if (vm.clubTime === "6h") {
            vm.price = 6 * vm.detail.prdItemSublineList[i].price;
          }
        }
      }
    },
    clubTime:function(newVal, oldVal){
      var vm=this;
      for (let i in vm.detail.prdItemSublineList) {
        if (vm.clubAddress === vm.detail.prdItemSublineList[i].sublineItemName) {
          if (newVal === "2h") {
            vm.price = 2 * vm.detail.prdItemSublineList[i].price;
          }
          if (newVal === "3h") {
            vm.price = 3 * vm.detail.prdItemSublineList[i].price;
          }
          if (newVal === "4h") {
            vm.price = 4 * vm.detail.prdItemSublineList[i].price;
          }
          if (newVal === "5h") {
            vm.price = 5 * vm.detail.prdItemSublineList[i].price;
          }
          if (newVal === "6h") {
            vm.price = 6 * vm.detail.prdItemSublineList[i].price;
          }
        }
      }
    }
  },
  methods:{
    goBack:function(){
      var vm=this;
      vm.show1=true;

    },
    goApply:function(){
      var vm=this;
      vm.show2=true;
    },
    onCancel1:function(){
      var vm=this;
      vm.show1=false;
    },
    onCancel2:function(){
      var vm=this;
      vm.show2=false;
    },
    goCustom:function(){
      var vm=this;
      vm.$router.push({path:'/customer'});
    },
    goPolicy:function(){
      var vm=this;
      vm.$router.push({path:'/policy'});
    },
    onConfirm1:function(){
      var vm=this;
      vm.$store.commit('assignmentCustomerList',{param:{}});
      vm.$store.commit('assignmentPolicyList',{param:{}});
      vm.$router.go(-1);
    },
    onConfirm2:function(){
      var vm = this;
      var phoneCode=null;

      for(let i in vm.phoneCodes){
        if(vm.phoneCode===vm.phoneCodes[i].meaning){
          phoneCode=vm.phoneCodes[i].value;
        }

      }
      if(vm.customName===null||vm.customName===''){
        vm.$vux.toast.show({text:'客户名不能为空'});
      }else if(vm.clubAddress===null||vm.clubAddress===''){
        vm.$vux.toast.show({text:'会所位置不能为空'});
      }else if(vm.clubTime===null||vm.clubTime===''){
        vm.$vux.toast.show({text:'使用时长不能为空'});
      }else if(vm.time===null||vm.time===''){
        vm.$vux.toast.show({text:'预约时间不能为空'});
      }else if(new Date(vm.time).getTime()<new Date().getTime()){
        vm.$vux.toast.show({text:'预约时间不能早于当前时间'});
      }else if(vm.person===null||vm.person===''){
        vm.$vux.toast.show({text:'入数不能为空'});
      }else if(vm.reservePerson===null||vm.reservePerson===''){
        vm.$vux.toast.show({text:'预约对接人不能为空'});
      }else if(vm.reservePersonPhone===null||vm.reservePersonPhone===''){
        vm.$vux.toast.show({text:'预约对接人电话不能为空'});
      }else {
        if(phoneCode==='86'&&(!(/^1(3|4|5|7|8)\d{9}$/.test(vm.reservePersonPhone)))) {
          vm.$vux.toast.show({text:'手机号码有误'});
        }else if(phoneCode==='00852'&&(vm.reservePersonPhone.length!=8)) {
          vm.$vux.toast.show({text:'手机号码有误'});
        }else if(phoneCode==='00853'&&(vm.reservePersonPhone.length!=8)) {
          vm.$vux.toast.show({text:'手机号码有误'});
        }else if(phoneCode==='00886'&&(vm.reservePersonPhone.length!=9)) {
          vm.$vux.toast.show({text:'手机号码有误'});
        }else{
          vm.$store.commit('assignmentCustomerList',{param:{}});
          vm.$store.commit('assignmentPolicyList',{param:{}});

          var userHour=null;
          if(vm.clubTime==='2h'){
            userHour="2";
          }
          if(vm.clubTime==='3h'){
            userHour="3";
          }
          if(vm.clubTime==='4h'){
            userHour="4";
          }
          if(vm.clubTime==='5h'){
            userHour="5";
          }
          if(vm.clubTime==='6h'){
            userHour="6";
          }
          var date=new Date();
          date=date.format('yyyy-MM-dd hh:mm:ss');
          var time=new Date(vm.time);
          var time=time.format('yyyy-MM-dd hh:mm:ss');
          for(let i in vm.detail.prdItemSublineList){
            if(vm.clubAddress===vm.detail.prdItemSublineList[i].sublineItemName){
              vm.sublineId=vm.detail.prdItemSublineList[i].sublineId;
            }
          }
          vm.$post('/api/ordOrder/submit', [{
            'applicantCustomerId': vm.customId,
            'channelId': vm.channelId,
            'reserveDate':time,
            'signDate':time,
            'customerType': "APPLICANT",
            'hisDesc': "预约资料审核中",
            'hisStatus': "DATA_APPROVING",
            'itemId': vm.detail.itemId,
            'orderType': "VALUEADD",
            'peopleCount': vm.person,
            'price': vm.price,
            'relatedOrderId': vm.orderId,
            'reserveComment':vm.comment,
            'reserveContactPerson': vm.reservePerson,
            'reserveContactPhone': vm.reservePersonPhone,
            'reserveContactPhoneCode': phoneCode,
            'status': "DATA_APPROVING",
            'userHour':userHour,
            'sublineId': vm.sublineId,
            'submitDate': date,
            'valueaddType':vm.detail.midClass,
            '__status': "add"
          }]).then(function(response){
            if(response.success){
              vm.$vux.toast.show("预约资料已提交，请耐心等待审核",3000);
              setTimeout(function () {
                vm.$router.go(-1);
              }, 3000);
            }else{
              vm.$vux.toast.show({text:'提交失败'});
            }
          }, function (response) {
            console.log("接口出错了");
          })
        }
      }
    }

  }
  }
</script>


<style lang="less">
  * {
    padding: 0px;
    margin:0px;
  }

  .clubReserve {
    width: 100%;
    background-color: white;
    min-height: 100%;
    position: absolute;
    font-size: 1.3rem;

  .header {
    background-color: #F4F4F7;
    height: 3rem;
    width: 100%;
    font-size: 1.7rem;
  }

  .header_title {
    padding-left: 1rem;
    padding-top: 0.5rem;
  }

  .weui-cells:before {
    border-top: none;
  }

  .weui-cells:after {
    left: 10px;
  }

  .vux-x-icon {
    fill: #999999;
    padding-right: 10px;
  }

  .weui-cell_access .weui-cell__ft {
    padding-right: 23px;
  }

  .weui-cells {
    font-size: 1.3rem;
  }

  .weui-cell_access .weui-cell__ft:after {
    height: 10px;
    width: 10px;
  }

  a {
    text-decoration: none;
  }

  .whole {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    min-height: 4rem;
    margin: 10px 0px 1rem 1rem;
    border-bottom: 1px solid #D9D9D9;
    font-size: 1.3rem;
  }

  .left {
    display: inline-block;
    width: 50%;
    align-items: center;
    color: #333333;
    font-size: 1.3rem;
  }

  .middle {
    display: inline-block;
    width: 40%;
    margin-top: -10px;
    color: #333333;

  .weui-cells:before {
    border-top: none;
  }

  .weui-cells:after {
    border-bottom: none;
  }

  .weui-cell {
    padding: 0px;
  }

  .weui-cell_access .weui-cell__ft {
    padding: 0px;
    margin-bottom: 10px;
    font-size: 1.3rem;
  }

  .weui-cell_access .weui-cell__ft:after {
    content: normal;
  }

  }
  .right {
    border: 0px;
    display: inline-block;
    width: 70%;
    text-align: right;
    padding-right: 1rem;
    height: 3rem;
    outline: none;
    font-size: 1.3rem;
  }

  .right_one {
    border: 0px;
    display: inline-block;
    width: 70%;
    padding-right: 15px;
    font-size: 1.3rem;
    color: #999999;
    line-height: 19px;
    outline: none;
    padding-bottom: 5px;

  .vux-x-textarea.weui-cell {
    -ms-flex-align: start;
    align-items: flex-start;
    display: inline-block;
    align-items: center;
    padding: 0px;
  }

  .weui-cells:after {
    border-bottom: none;
  }

  }
  .right_new {
    border: 0px;
    display: inline-block;
    width: 70%;
    text-align: right;
    padding-right: 1rem;
    outline: none;
    font-size: 1.3rem;

  }



  .whole_new {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    min-height: 3rem;
    margin: 10px 0px 1rem 1rem;
    border-bottom: 1px solid #D9D9D9;


  .left{
    display: inline-block;
    align-items: center;
    padding-top: 10px;
    font-size: 1.3rem;
    color:#333333;
  }
  .weui-cells{
    width: 18rem;
    display: inline-block;
    float: right;
    margin-top: 0px;
  }
  .weui-cells:after{
    border-bottom: none;
  }



  }
  .policy_down{
    position: relative;
    width: 70%;
    margin-left: 30%;
    color:#ADADAD;

  }


  .comment_up {
    margin-left: 1rem;
    position: relative;
    color:#333333;
  }
  .comment_up_new{
    margin-left: 1rem;
    color:#999999;
  }
  .bottom{
    border-bottom: solid 1px #e5e5e5 ;
    border-left: none;
    border-top: none;
    border-right: none;
    width:calc(~"100% - 10px") ;
    height: 3.17rem;
    margin-left: 10px;
    outline: none;
    font-size:1.3rem;
  }
  .warmPrompt{
    font-size: 1.3rem;
    color: #999999;
    margin: 1rem;
    line-height: 19px;
  }
  .warmPrompt_up{
  }
  .warmPrompt_dowm{

  }
  .button {
    display: flex;
    display: -webkit-flex;
    font-size: 1.7rem;
    margin: 1rem;
  }

  .button_left {
    display: inline-block;
    width: 50%;
    text-align: center;
    height: 4rem;
    background-color: white;
    border: solid 1px #D1D1D1;
    padding-top: 1.5rem;
    border-radius: 5px;
    margin: 1rem;
  }

  .button_right {
    display: inline-block;
    width: 50%;
    text-align: center;
    height: 4rem;
    background-color: #E6A913;
    color: white;
    padding-top: 1.5rem;
    border: solid 1px #E6A913;
    border-radius: 5px;
    margin: 1rem;
  }
  }





</style>

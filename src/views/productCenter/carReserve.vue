<template>
  <div class="carReserve">
    <!-- 专车预定-->
    <div class="header">
      <div class="header_title">{{title}}</div>
    </div>
    <div class="whole">
      <div class="left"><span style="color:#f63636 ">*</span>客户</div>
      <input class="right" placeholder="请选择" v-model="customName" @click="goCustom"/>
      <x-icon type="ios-arrow-right" size="35" @click="goCustom"></x-icon>
    </div>
    <div class="whole">
      <div class="left">保单订单编号</div>
      <group class="right_one">
        <x-textarea  placeholder="如果客户当天也预定了赴港签单，请输入订单编号，方便工作人员合理安排行程。" :show-counter="false" :rows="1" autosize v-model="policyNumber"></x-textarea>
      </group>
      <x-icon type="ios-search" size="35" @click="goPolicy"></x-icon>
    </div>


    <div class="whole_new">
      <div class="left"><span style="color:#f63636 ">*</span>预约路线</div>
      <group style="min-height: 3rem">
      <popup-radio  :options="pathList" v-model="reservePath" placeholder="请选择"></popup-radio>
    </group>
    </div>
    <div class="whole">
      <div class="left">预计价格</div>
      <div class="right_new">{{basePrice}}</div>
    </div>

    <div class="whole_new">
      <div class="left"><span style="color:#f63636 ">*</span>预约时间</div>
      <group style="min-height: 3rem">
        <datetime v-model="reserveTime" format="YYYY/MM/DD HH:mm" :title="start" placeholder="请选择"></datetime>
      </group>
    </div>

    <div class="whole">
      <div class="left"><span style="color:#f63636 ">*</span>出发地</div>
      <input class="right" placeholder="请输入详细地址" v-model="departure" />
    </div>
    <div class="whole">
      <div class="left"><span style="color:#f63636 ">*</span>目的地</div>
      <input class="right" placeholder="请输入详细地址" v-model="destination"/>
    </div>
    <div class="whole">
      <div class="left"><span style="color:#f63636 ">*</span>乘车总人数</div>
      <input class="right" placeholder="请输入" v-model="totalNumber"/>
    </div>
    <div class="whole">
      <div class="left"><span style="color:#f63636 ">*</span>乘车联系人</div>
      <input class="right" placeholder="请输入" v-model="contact"/>
    </div>
    <div class="whole">
      <div class="left"><span style="color:#f63636 ">*</span>乘车联系人电话</div>
      <group  class="middle">
        <popup-radio :options="phoneCodeList" v-model="phoneCode"></popup-radio>
      </group>
      <input class="right" placeholder="请输入" v-model="contactPhone"/>
    </div>

    <div class="comment_up">备注</div>
    <div class="comment_up_new">申请免费服务需填写投保信息，否则可不填</div>
    <input class="bottom" v-model="comment" />

    <div class="warmPrompt">
      <div class="warmPrompt_up">温馨提示：</div>
      <div class="warmPrompt_down">1.本服务为免费服务，若客户购买任何保险产品，单张保单年缴保费≥10万美金或趸交保费≥50万美金
        ，我司免费提供以上两次专车服务，超出两次专车接送另行收费。同一投保人两张及两张以上保单累计达以上金额不享受该免费服务。申请免费服务请务必在备注栏填写投保信息。
      </div>
      <div class="warmPrompt_dowm">2.如已享受以上专车服务的客户因各种原因未能投保成功及退保，我司将会补收该费用。</div>
      <div class="warmPrompt_dowm">3.所有增值服务以预约时信息为准，由于无预约、信息错误等产生的费用由客户承担，且过后不可以补办和报销。</div>
      <div class="warmPrompt_dowm">4.接送机自机场公布的航班到达时间接机，免费等60分钟，关口/酒店/码头等地点免费等30分钟，超出时间收费200-300/小时。</div>
      <div class="warmPrompt_dowm">5.节假日价格会有涨幅。</div>
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
  import { Datetime, Group,PopupRadio,XTextarea,Confirm,TransferDomDirective as TransferDom } from 'vux';

  export default {
    directives: {
      TransferDom
    },
    components: {
      Datetime,
      Group,
      PopupRadio,
      XTextarea,
      Confirm

    },
    data(){
    return {
      title: "专车服务预定-预约资料填写",
      customName: "",
      policyNumber: "",
      icon: require("../../assets/img/query.png"),
      reservePath: null,
      pathList: [],
      departure: null,
      destination: null,
      totalNumber: null,
      contact: null,
      contactPhone: null,
      reserveTime: null,
      start: "",
      comment: "",
      basePrice: "￥0.00",
      price1:null,
      detail:{},
      phoneCodes:[],
      phoneCodeList:[],
      phoneCode:"",
      sublineId:null,
      channelId:null,
      orderId:null,
      customId:null,
      show1:false,
      show2:false,
      title1:"是否确认取消？",
      title2:"是否确认提交申请？",

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
      document.setTitle('专车服务预约');
    }, 1);
  },
  mounted() {
    var vm = this;
    vm.channelId=JSON.parse(window.localStorage.userInfo).user.relatedPartyId;
    vm.$post('/api/clb/common/clbCode',{
      "phoneCodes": "PUB.PHONE_CODE"
    }).then(function (response) {
      var detail = JSON.parse(response);
      vm.phoneCodes = detail.phoneCodes;
      for (let i in vm.phoneCodes) {
        vm.phoneCodeList.push(vm.phoneCodes[i].meaning);
      }
      vm.phoneCode=vm.phoneCodeList[0];
    }, function (response) {
      console.log('接口出错了');
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
      vm.pathList.push(vm.detail.prdItemSublineList[i].sublineItemName);
    }
  },
  watch:{
    reservePath:function(newVal,oldVal){
      var vm=this;
      for(let i in vm.detail.prdItemSublineList){
        if(newVal===vm.detail.prdItemSublineList[i].sublineItemName){
          vm.price1=vm.detail.prdItemSublineList[i].price;
          if(vm.price1!="实时报价"){
            vm.basePrice="￥"+vm.price1;
          }else{
            vm.basePrice=vm.price1;
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

    goCustom:function () {
      var vm = this;
      vm.$router.push({path: '/customer'});
    }
  ,
    goPolicy:function () {
      var vm = this;
      vm.$router.push({path: '/policy'});
    }
  ,

    onConfirm1:function () {
      var vm = this;
      vm.$store.commit('assignmentCustomerList',{param:{}});
      vm.$store.commit('assignmentPolicyList',{param:{}});
      vm.$router.go(-1);
    }
  ,
    onConfirm2:function(){
      var vm=this;
      var phoneCode=null;
      for(let i in vm.phoneCodes){
        if(vm.phoneCode===vm.phoneCodes[i].meaning){
          phoneCode=vm.phoneCodes[i].value;
        }
      }
      if(vm.customName===null||vm.customName===''){
        vm.$vux.toast.show({text:'客户名不能为空'});
      }else if(vm.reservePath===null||vm.reservePath===''){
        vm.$vux.toast.show({text:'预约路线不能为空'});
      }else if(vm.reserveTime===null||vm.reserveTime===''){
        vm.$vux.toast.show({text:'预约时间不能为空'});
      }else if(new Date(vm.reserveTime).getTime()<new Date().getTime()){
        vm.$vux.toast.show({text:'预约时间不能早于当前时间'});
      } else if(vm.departure===null||vm.departure===''){
        vm.$vux.toast.show({text:'出发地不能为空'});
      }else if(vm.destination===null||vm.destination===''){
        vm.$vux.toast.show({text:'目的地不能为空'});
      }else if(vm.totalNumber===null||vm.totalNumber===''){
        vm.$vux.toast.show({tetx:'乘车总人数不能为空'});
      }else if(vm.contact===null||vm.contact==='') {
        vm.$vux.toast.show({text:'乘车联系人不能为空'});
      }else if(vm.contactPhone===null||vm.contactPhone===''){
        vm.$vux.toast.show({text:'乘车联系人电话不能为空'});
      }else{
        if(phoneCode==='86'&&(!(/^1(3|4|5|7|8)\d{9}$/.test(vm.contactPhone)))) {
          vm.$vux.toast.show({text:'手机号码有误'});
        }else if(phoneCode==='00852'&&(vm.contactPhone.length!=8)) {
          vm.$vux.toast.show({text:'手机号码有误'});
        }else if(phoneCode==='00853'&&(vm.contactPhone.length!=8)) {
          vm.$vux.toast.show({text:'手机号码有误'});
        }else if(phoneCode==='00886'&&(vm.contactPhone.length!=9)) {
          vm.$vux.toast.show({text:'手机号码有误'});
        }else {
          vm.$store.commit('assignmentCustomerList',{param:{}});
          vm.$store.commit('assignmentPolicyList',{param:{}});
          var date=new Date();
          date=date.format('yyyy-MM-dd hh:mm:ss');
          var time=new Date(vm.reserveTime);
          var reserveTime=time.format('yyyy-MM-dd hh:mm:ss');
          if(vm.price1==='实时报价'){
            vm.price1=null;
          }
          for(let i in vm.detail.prdItemSublineList){
            if(vm.reservePath===vm.detail.prdItemSublineList[i].sublineItemName){
              vm.sublineId=vm.detail.prdItemSublineList[i].sublineId;
            }
          }
          vm.$post('/api/ordOrder/submit', [{
            'applicantCustomerId':vm.customId,
            'channelId':vm.channelId,
            'customerType': "APPLICANT",
            'hisDesc': "预约资料审核中",
            'hisStatus': "DATA_APPROVING",
            'itemId': vm.detail.itemId,
            'orderType': "VALUEADD",
            'peopleCount':vm.totalNumber,
            "price":vm.price1,
            'relatedOrderId': vm.orderId,
            'reserveComment':vm.comment,
            'reserveContactPerson': vm.contact,
            'reserveContactPhone': vm.contactPhone,
            'reserveContactPhoneCode': phoneCode,
            'reserveDate': reserveTime,
            "departure":vm.departure,
            "destination":vm.destination,
            'signDate': reserveTime,
            'status': "DATA_APPROVING",
            'sublineId': vm.sublineId,
            'submitDate': date,
            'valueaddType':vm.detail.midClass,
            '__status': "add"
          }]).then(function(response){
            if(response.success){
              vm.$vux.toast.show({text:"预约资料已提交，请耐心等待审核"});
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

  .carReserve {
    width: 100%;
    background-color: white;
    min-height: 100%;
    position: absolute;

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
    border-bottom: 2px solid #D9D9D9;
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

  }



  .whole_new {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    min-height: 3rem;
    margin: 10px 0px 1rem 1rem;
    border-bottom: 1px solid #D9D9D9;

  .left {
    display: inline-block;
    align-items: center;
    padding-top: 10px;
    color: #333333;
    font-size: 1.3rem;
  }

  .weui-cells {
    width: 18rem;
    display: inline-block;
    float: right;
    margin-top:0px;
  }

  .weui-cells:after {
    border-bottom: none;
  }

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
    height: 4rem;
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

<template>
  <div class="HPVReserve">
    <!-- HPV预定-->
    <div class="header">
      <div class="header_title">{{title}}</div>
    </div>
    <div class="whole">
      <div class="left"><span style="color:#f63636 ">*</span>客户</div>
      <input class="right" placeholder="请选择" v-model="customName" @click="goCustom"  />
      <x-icon type="ios-arrow-right" size="35" @click="goCustom"></x-icon>
    </div>
    <div class="whole">
      <div class="left">保单订单编号</div>
      <group class="right_one">
        <x-textarea  placeholder="如果客户当天也预定了赴港签单，请输入订单编号，方便工作人员合理安排行程。" :show-counter="false" :rows="1" autosize v-model="policyNumber"></x-textarea>
      </group>
      <x-icon type="ios-search" size="35" @click="goPolicy"></x-icon>
    </div>

    <div class="whole">
      <div class="left"><span style="color:#f63636 ">*</span>年龄</div>
      <input class="right" placeholder="请输入" v-model="age"/>
    </div>

    <div class="radio">
      <div class="radio_title"><span style="color:#f63636 ">*</span>性别</div>
      <div class="labelValue">
        <div class="Radio1">
          <img :src="disagree" v-if="!male" alt="" @click="click3">
          <img :src="agree" v-if="male" alt="">
          <span>男</span>
        </div>
        <div class="Radio2">
          <img :src="disagree" v-if="male" alt="" @click="click4">
          <img :src="agree"  v-if="!male" alt="">
          <span>女</span>
        </div>
      </div>
    </div>


    <div class="whole">
      <div class="left"><span style="color:#f63636 ">*</span>联系电话</div>
      <group  class="middle">
        <popup-radio :options="phoneCodeList" v-model="phoneCode1"></popup-radio>
      </group>
      <input class="right" placeholder="请输入" v-model="contactPhone"/>
    </div>

    <div class="whole">
      <div class="left"><span style="color:#f63636 ">*</span>通行证号码</div>
      <input class="right" placeholder="请输入" v-model="passNumber"/>
    </div>


    <div class="whole_new">
      <div class="left"><span style="color:#f63636 ">*</span>第几次注射疫苗</div>
      <group style="min-height: 3rem">
        <popup-radio :options="degreeList" v-model="degree" placeholder="请选择"></popup-radio>
      </group>
    </div>


    <div class="whole_new">
      <div class="left"><span style="color:#f63636 ">*</span>疫苗种类</div>
      <group style="min-height: 3rem">
        <popup-radio :options="typeList" v-model="type" placeholder="请选择"></popup-radio>
      </group>
    </div>


    <div class="whole" v-if="first">
      <div class="left">价格</div>
      <div class="right_new">{{price}}</div>
    </div>


    <div class="whole">
      <div class="left"><span style="color:#f63636 ">*</span>给客户的报价</div>
      <input class="right" placeholder="请输入" v-model="offer"/>
    </div>

    <div class="whole_new">
      <div class="left"><span style="color:#f63636 ">*</span>预约疫苗注射时间</div>
      <group>
        <datetime v-model="reserveTime" format="YYYY/MM/DD HH:mm" :title="start" placeholder="请选择"></datetime>
      </group>
    </div>


    <div class="whole">
      <div class="left"><span style="color:#f63636 ">*</span>预约对接人</div>
      <input class="right" placeholder="请输入" v-model="reservePerson"/>
    </div>


    <div class="whole">
      <div class="left"><span style="color:#f63636 ">*</span>预约对接人电话</div>
      <group  class="middle">
        <popup-radio :options="phoneCodeList" v-model="phoneCode2"></popup-radio>
      </group>
      <input class="right" placeholder="请输入" v-model="reservePersonPhone"/>
    </div>

    <div class="comment_up">备注</div>
    <div class="comment_up_new">申请免费服务需填写投保信息，否则可不填</div>
    <input class="bottom" v-model="comment" />



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
        title:"HPV疫苗预定-预约资料填写",
        show1:false,
        show2:false,
        title1:"是否确认取消？",
        title2:"是否确认提交申请？",
        disagree: require('../../assets/register/icon_unselect@3x.png'),
        agree: require('../../assets/register/icon_select@3x.png'),
        customName:null,
        policyNumber:null,
        icon:require("../../assets/img/query.png"),
        male:true,
        age:null,
        contactPhone:null,
        passNumber:null,
        degreeList:['1','2','3'],
        degree:null,
        type:null,
        typeList:[],
        first:true,
        price:"￥0.00",
        price1:null,
        offer:null,
        reserveTime:null,
        start:"",
        reservePerson:null,
        reservePersonPhone:null,
        comment:"",
        phoneCodeList:[],
        phoneCodes:[],
        phoneCode1:"",
        phoneCode2:"",
        sublineId:null,
        channelId:null,
        orderId:null,
        customId:null,
        type1:false,
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
      document.setTitle('HPV预约');
    }, 1);
  },
    mounted:function(){
      var vm=this;
      vm.channelId=JSON.parse(window.localStorage.userInfo).user.relatedPartyId;
      vm.reservePerson=JSON.parse(window.localStorage.userInfo).user.userName;
      vm.phoneCode2=JSON.parse(window.localStorage.userInfo).user.phoneCode;
      vm.reservePersonPhone=JSON.parse(window.localStorage.userInfo).user.phone;
      vm.$post('/api/clb/common/clbCode',{
        "phoneCodes": "PUB.PHONE_CODE"
      }).then(function(response){
        vm.phoneCodes=JSON.parse(response).phoneCodes;
        for (let i in vm.phoneCodes) {
          vm.phoneCodeList.push(vm.phoneCodes[i].meaning);
        }
        vm.phoneCode1=vm.phoneCodeList[0];
        vm.phoneCode2=vm.phoneCodeList[0];
      },function(response){
        vm.$vux.toast.show({text:'接口出错了'})
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
      console.log(customList);
      var policyList=vm.$store.getters.getPolicyList;
      if(isEmptyObject(customList)){
        vm.customName=customList.chineseName;
        vm.customId=customList.customerId;
        if(customList.sex==='M'){
          vm.male=true;
        }
        if(customList.sex==='F'){
          vm.male=false;
        }
        for(let i in vm.phoneCodes){
          if(customList.phoneCode===vm.phoneCodes[i].value){
            vm.phoneCode1=vm.phoneCodes[i].meaning;
          }
        }
        vm.contactPhone=customList.phone;
      }
      if(isEmptyObject(policyList)){
        vm.policyNumber=policyList.orderNumber;
        vm.orderId=policyList.orderId;
      }
      vm.detail=vm.$store.getters.getProduct;
      for (let i in vm.detail.prdItemSublineList) {
        vm.typeList.push(vm.detail.prdItemSublineList[i].sublineItemName);
      }
      for(let i in vm.detail.prdItemSublineList){
        if(vm.detail.prdItemSublineList[i].onlinePaymentFlag === "N"){
          vm.type1=true;
        }
      }
    },
  watch:{
    degree:function(newVal,oldVal){
      var vm=this;
      if(newVal==='2'||newVal==='3'){
        vm.first=false;
        vm.price=null;
      }
      if(newVal==='1'){
        vm.first=true;
        for(let i in vm.detail.prdItemSublineList ){
          if(vm.type===vm.detail.prdItemSublineList[i].sublineItemName){
            vm.price1=vm.detail.prdItemSublineList[i].price;
            if(vm.type1){
              vm.price='￥'+vm.detail.prdItemSublineList[i].price+"(需现场支付)";
            }else{
              vm.price='￥'+vm.detail.prdItemSublineList[i].price;
            }
          }
        }
      }

    },
    type:function(newVal,oldVal){
      var vm=this;
      for(let i in vm.detail.prdItemSublineList){
        if(newVal===vm.detail.prdItemSublineList[i].sublineItemName){
          vm.price1=vm.detail.prdItemSublineList[i].price;
          if(vm.type1){
            vm.price='￥'+vm.detail.prdItemSublineList[i].price+"(需现场支付)";
          }else{
            vm.price='￥'+vm.detail.prdItemSublineList[i].price;
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
      click3:function(){
        var vm=this;
        vm.male=!vm.male;
      },
      click4:function(){
        var vm=this;
        vm.male=!vm.male;
      },
      onConfirm2:function(){
        var vm = this;
        var phoneCode1=null;
        var phoneCode2=null;
        for(let i in vm.phoneCodes){
          if(vm.phoneCode1===vm.phoneCodes[i].meaning){
            phoneCode1=vm.phoneCodes[i].value;
          }
          if(vm.phoneCode2===vm.phoneCodes[i].meaning){
            phoneCode2=vm.phoneCodes[i].value;
          }
        }
        if(vm.customName===null||vm.customName===''){
          vm.$vux.toast.show({text:'客户名不能为空'});
        }else if(vm.age===null||vm.age===''){
          vm.$vux.toast.show({text:'年龄不能为空'});
        }else if(vm.contactPhone===null||vm.contactPhone===''){
          vm.$vux.toast.show({text:'联系电话不能为空'});
        }else if(vm.passNumber===null||vm.passNumber===''){
          vm.$vux.toast.show({text:'通行证号码不能为空'});
        }else if(vm.degree===null||vm.degree===''){
          vm.$vux.toast.show({text:'注射疫苗次数不能为空'});
        }else if(vm.type===null||vm.type===''){
          vm.$vux.toast.show({text:'疫苗种类不能为空'});
        }else if(vm.offer===null||vm.offer===''){
          vm.$vux.toast.show({text:'报价不能为空'});
        }else if(vm.reserveTime===null||vm.reserveTime===''){
          vm.$vux.toast.show({text:'预约时间不能为空'});
        } else if(new Date(vm.reserveTime).getTime()<new Date().getTime()){
          vm.$vux.toast.show({text:'预约时间不能早于当前时间'});
        } else if(vm.reservePerson===null||vm.reservePerson===''){
          vm.$vux.toast.show({text:'预约对接人不能为空'});
        }else if(vm.reservePersonPhone===null||vm.reservePersonPhone===''){
          vm.$vux.toast.show({text:'预约对接人电话不能为空'})
        } else {
          if(phoneCode1==='86'&&(!(/^1(3|4|5|7|8)\d{9}$/.test(vm.contactPhone)))) {
            vm.$vux.toast.show({text:'联系电话有误'});
          }else if(phoneCode1==='00852'&&(vm.contactPhone.length!=8)) {
            vm.$vux.toast.show({text:'联系电话有误'});
          }else if(phoneCode1==='00853'&&(vm.contactPhone.length!=8)) {
            vm.$vux.toast.show({text:'联系电话有误'});
          }else if(phoneCode1==='00886'&&(vm.contactPhone.length!=9)) {
            vm.$vux.toast.show({text:'联系电话有误'});
          }else  if(phoneCode2==='86'&&(!(/^1(3|4|5|7|8)\d{9}$/.test(vm.reservePersonPhone)))) {
            vm.$vux.toast.show({text:'预约对接人电话有误'});
          }else if(phoneCode2==='00852'&&(vm.reservePersonPhone.length!=8)) {
            vm.$vux.toast.show({text:'预约对接人电话有误'});
          }else if(phoneCode2==='00853'&&(vm.reservePersonPhone.length!=8)) {
            vm.$vux.toast.show({text:'预约对接人电话有误'});
          }else if(phoneCode2==='00886'&&(vm.reservePersonPhone.length!=9)) {
            vm.$vux.toast.show({text:'预约对接人电话有误'});
          }else{
            vm.$store.commit('assignmentCustomerList',{param:{}});
            vm.$store.commit('assignmentPolicyList',{param:{}});
            var sex=null;
            var date=new Date();
            date=date.format('yyyy-MM-dd hh:mm:ss');
            if(vm.male){
              sex="M";
            }else{
              sex="F";
            }

            for(let i in vm.detail.prdItemSublineList){
              if(vm.type===vm.detail.prdItemSublineList[i].sublineItemName){
                vm.sublineId=vm.detail.prdItemSublineList[i].sublineId;
              }
            }
            var time=new Date(vm.reserveTime);
            var reserveTime=time.format('yyyy-MM-dd hh:mm:ss');
            if(vm.degree!="1"){
              vm.price1=null;
            }
            vm.$post('/api/ordOrder/submit', [{
              'applicantCustomerId': vm.customId,
              'channelId':vm.channelId,
              'customerPhone': vm.contactPhone,
              'customerPhoneCode': phoneCode1,
              'customerPrice':vm.offer,
              'customerType': "APPLICANT",
              'hisDesc': "预约资料审核中",
              'hisStatus': "DATA_APPROVING",
              'itemId': vm.detail.itemId,
              'orderType': "VALUEADD",
              "price":vm.price1,
              'relatedOrderId': vm.orderId,
              'reserveComment':vm.comment,
              'reserveContactPerson': vm.reservePerson,
              'reserveContactPhone': vm.reservePersonPhone,
              'reserveContactPhoneCode': phoneCode2,
              'reserveDate': reserveTime,
              'signDate': reserveTime,
              'status': "DATA_APPROVING",
              'sublineId': vm.sublineId,
              'submitDate': date,
              'vaccineCustomerAge':vm.age,
              'vaccineCustomerPass':vm.passNumber,
              'vaccineCustomerSex':sex,
              'vaccineCustomerTimes':vm.degree,
              'valueaddType':vm.detail.midClass,
              '__status': "add"
            }]).then(function(response){
              if(response.success){
                vm.$vux.toast.show({text:"预约资料已提交，请耐心等待审核"},3000);
                setTimeout(function () {
                  vm.$router.go(-1);
                }, 3000);
              }else{
                vm.$vux.toast.show({text:'提交失败'})
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

  .HPVReserve {
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
    font-size: 1.3rem;

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
  .policy_down {
    position: relative;
    width: 70%;
    margin-left: 30%;
    color: #ADADAD;

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
    height: 3rem;
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

  .labelValue {
    width: 60%;
    display: inline-block;

  .Radio1 {
    width: 40%;
    display: inline-block;
  }

  .Radio2 {
    width: 55%;
    display: inline-block;
  }

  img {
    height: 20px;
    display: inline-block;
    vertical-align: middle;
  }

  span {
    position: relative;
    top: 1px;
  }

  }

  .radio {
    display: flex;
    display: -webkit-flex;
    margin-left: 1rem;
    margin-top: 1rem;
  }

  .radio_title {
    display: inline-block;
    width: 40%;
    font-size: 1.3rem;
  }

  .radio_right_down {
    display: inline-block;
    position: relative;
    /* margin-bottom: 1rem; */
    margin-top: 0.5rem;
    margin-left: 43%;
    width: 55%;
    /* padding: 0.5rem; */
    background-color: #F4F4F7;
    border: 0px;
    height: 3rem;
  }

  }
</style>

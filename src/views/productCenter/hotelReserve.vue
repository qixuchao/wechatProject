<template>
  <div class="hotelReserve">
    <!-- 酒店预定-->
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
        <x-textarea placeholder="如果客户当天也预定了赴港签单，请输入订单编号，方便工作人员合理安排行程。" :show-counter="false" :rows="1" autosize
                    v-model="policyNumber"></x-textarea>
      </group>
      <x-icon type="ios-search" size="35" @click="goPolicy"></x-icon>
    </div>


    <div class="whole">
      <div class="left"><span style="color:#f63636 ">*</span>入住客户姓名</div>
      <input class="right" placeholder="请输入" v-model="checkInCNName"
             onkeyup="value=value.replace(/[^\a-\z\A-\Z\u4E00-\u9FA5\s]/g,'')"/>
    </div>

    <div class="whole">
      <div class="left"><span style="color:#f63636 ">*</span>入住客户姓名拼音</div>
      <input class="right" placeholder="请输入" v-model="checkInUSName"
             onkeyup="value=value.replace(/[^\a-\z\A-\Z\s]/g,'')"/>
    </div>


    <div class="whole">
      <div class="left"><span style="color:#f63636 ">*</span>联系电话</div>
      <group  class="middle">
        <popup-radio :options="phoneCodeList" v-model="phoneCode1"></popup-radio>
      </group>
      <input class="right" placeholder="请输入" v-model="contactPhone"/>
    </div>


    <div class="whole_new">
      <div class="left"><span style="color:#f63636 ">*</span>酒店所在地区</div>
      <group style="min-height: 3rem">
        <popup-radio :options="hotelList" v-model="hotelAddress" placeholder="请选择"></popup-radio>
      </group>
    </div>

    <div class="whole_new">
      <div class="left"><span style="color:#f63636 ">*</span>价格区间(每晚)</div>
      <group style="min-height: 3rem">
        <popup-radio :options="costList" v-model="cost" placeholder="请选择"></popup-radio>
      </group>
    </div>

    <div class="whole">
      <div class="left"><span style="color:#f63636 ">*</span>入住人数</div>
      <input class="right" placeholder="请输入" v-model="personCount"/>
    </div>

    <div class="whole_new">
      <div class="left"><span style="color:#f63636 ">*</span>入住时间</div>
      <group>
        <datetime v-model="checkInTime" format="YYYY/MM/DD HH:mm" :title="startTime" placeholder="请选择"></datetime>
      </group>
    </div>

    <div class="whole_new">
      <div class="left"><span style="color:#f63636 ">*</span>退房时间</div>
      <group>
        <datetime v-model="checkOutTime" format="YYYY/MM/DD HH:mm" :title="endTime" placeholder="请选择"></datetime>
      </group>
    </div>

    <!--<group>-->
      <!--<datetime v-model="checkInTime" format="YYYY/MM/DD HH:mm" :title="startTime" placeholder="请选择"></datetime>-->
    <!--</group>-->

    <!--<group>-->
      <!--<datetime v-model="checkOutTime" format="YYYY/MM/DD HH:mm" :title="endTime" placeholder="请选择"></datetime>-->
    <!--</group>-->


    <div class="whole">
      <div class="left"><span style="color:#f63636 ">*</span>房间数</div>
      <input class="right" placeholder="请输入" v-model="houseNumber"/>
    </div>

    <div class="whole">
      <div class="left"><span style="color:#f63636 ">*</span>房型</div>
      <input class="right" placeholder="如：标准房、大床房等" v-model="houseType"/>
    </div>

    <div class="whole">
      <div class="left">指定酒店名称或地段</div>
      <input class="right" placeholder="如无则不填" v-model="houseName"/>
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
    <input class="bottom" placeholder="可为空" v-model="comment"/>

    <div class="warmPrompt">
      <div class="warmPrompt_up">温馨提示：</div>
      <div class="warmPrompt_down">1.请填写详细客房需求（例：双床房2间/大床房1间）。</div>
      <div class="warmPrompt_dowm">2.香港酒店价格在不同日期价格波动极大，客户服务部会提供即时报价。</div>
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
    components: {
      Datetime,
      Group,
      PopupRadio,
      XTextarea,
      Confirm

    },
    data(){
      return {
        title: "酒店预定-预约资料填写",
        show1:false,
        show2:false,
        title1:"是否确认取消？",
        title2:"是否确认提交申请？",
        customName: null,
        policyNumber: null,
        icon: require("../../assets/img/query.png"),
        hotelAddress: null,
        hotelList: [],
        cost: null,
        costList: ['300元以下', '300-600元', '600-1000元', '1000元以上'],
        checkInTime: null,
        checkOutTime: null,
        startTime: "",
        endTime: "",
        houseNumber: null,
        houseType: null,
        houseName: null,
        reservePerson: null,
        reservePersonPhone: null,
        comment: "",
        personCount:null,
        checkInCNName: null,
        checkInUSName: null,
        contactPhone: null,
        detail: {},
        phoneCodeList:[],
        phoneCodes:[],
        phoneCode1:"",
        phoneCode2:"",
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
      document.setTitle('酒店预约');
    }, 1);
  },
    mounted: function () {
      var vm = this;
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
       vm.$vux.toast.show({text:"接口出错了"});
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
      var customList = vm.$store.getters.getCustomerList;
      var policyList = vm.$store.getters.getPolicyList;
      if (isEmptyObject(customList)) {
        vm.customName = customList.chineseName;
        vm.customId=customList.customerId;
      }
      if (isEmptyObject(policyList)) {
        vm.policyNumber = policyList.orderNumber;
        vm.orderId=policyList.orderId;

      }
      vm.detail = vm.$store.getters.getProduct;
      for (let i in vm.detail.prdItemSublineList) {
        vm.hotelList.push(vm.detail.prdItemSublineList[i].sublineItemName);
      }

    },
    methods: {
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
      goCustom: function () {
        var vm = this;
        vm.$router.push({path: '/customer'});
      },
      goPolicy: function () {
        var vm = this;
        vm.$router.push({path: '/policy'});
      },
      onConfirm1: function () {
        var vm = this;
        vm.$store.commit('assignmentCustomerList',{param:{}});
        vm.$store.commit('assignmentPolicyList',{param:{}});
        vm.$router.go(-1);
      },
      onConfirm2: function () {
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
        }else if(vm.checkInCNName===null||vm.checkInCNName===''){
          vm.$vux.toast.show({text:'客户姓名不能为空'});
        }else if(vm.checkInUSName===null||vm.checkInUSName===''){
          vm.$vux.toast.show({text:'拼音名不能为空'});
        }else if(vm.contactPhone===null||vm.contactPhone===''){
          vm.$vux.toast.show({text:'联系电话不能为空'});
        }else if(vm.hotelAddress===null||vm.hotelAddress===''){
          vm.$vux.toast.show({text:'酒店所在地址不能为空'});
        }else if(vm.cost===null||vm.cost===''){
          vm.$vux.toast.show({text:'价格区间不能为空'});
        }else if(vm.personCount===null||vm.personCount===''){
          vm.$vux.toast.show({text:"入住人数不能为空"});
        }else if(vm.checkInTime===null||vm.checkInTime===''){
          vm.$vux.toast.show({text:'入住日期不能为空'});
        }else if(vm.checkOutTime===null||vm.checkOutTime===''){
          vm.$vux.toast.show({text:'退房日期不能为空'});
        }else if(new Date(vm.checkInTime).getTime()<new Date().getTime()){
          vm.$vux.toast.show({text:'入住日期不能早于当前时间'});
        }else if(new Date(vm.checkOutTime).getTime()<new Date(vm.checkInTime).getTime()){
          vm.$vux.toast.show({text:'退房日期不能早于入住日期'});
        }else if(vm.houseNumber===null||vm.houseNumber===''){
          vm.$vux.toast.show({text:'房间数不能为空'});
        }else if(vm.houseType===null||vm.houseType===''){
          vm.$vux.toast.show({text:'房型不能为空'});
        }else if(vm.reservePerson===null||vm.reservePerson===''){
          vm.$vux.toast.show({text:'预约对接人不能为空'});
        }else if(vm.reservePersonPhone===null||vm.reservePersonPhone===''){
          vm.$vux.toast.show({text:'预约对接人电话不能为空'});
        }else {
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
            var date=new Date();
            var time=new Date(vm.checkInTime);
            var checkInTime=time.format('yyyy-MM-dd hh:mm:ss');
            time=new Date(vm.checkOutTime);
            var checkOutTime=time.format('yyyy-MM-dd hh:mm:ss');
            date=date.format('yyyy-MM-dd hh:mm:ss');
            for(let i in vm.detail.prdItemSublineList){
              if(vm.hotelAddress===vm.detail.prdItemSublineList[i].sublineItemName){
                vm.sublineId=vm.detail.prdItemSublineList[i].sublineId;
              }
            }
            vm.$post('/api/ordOrder/submit', [{
              'applicantCustomerId': vm.customId,
              'channelId':vm.channelId,
              'checkinDate':checkInTime,
              'checkoutDate':checkOutTime,
              'customerPhone': vm.contactPhone,
              'customerPhoneCode': phoneCode1,
              'customerType': "APPLICANT",
              'hisDesc': "预约资料审核中",
              'hisStatus': "DATA_APPROVING",
              'hotelName':vm.houseName,
              'itemId': vm.detail.itemId,
              'lodgerName': vm.checkInCNName,
              'lodgerPinyin': vm.checkInUSName,
              'orderType': "VALUEADD",
              'peopleCount': vm.personCount,
              'priceInterval': vm.cost,
              'relatedOrderId': vm.orderId,
              'reserveComment':vm.comment,
              'reserveContactPerson': vm.reservePerson,
              'reserveContactPhone': vm.reservePersonPhone,
              'reserveContactPhoneCode': phoneCode2,
              'reserveDate': "NaN-NaN-NaN NaN:NaN:00",
              'roomCount': vm.houseNumber,
              'roomType':vm.houseType,
              'signDate':checkInTime,
              'status': "DATA_APPROVING",
              'sublineId': vm.sublineId,
              'submitDate': date,
              'valueaddType':vm.detail.midClass,
              '__status': "add"
            }]).then(function(response){
              if(response.success){
                vm.$vux.toast.show({text:"预约资料已提交，请耐心等待审核"},3000);
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

  .hotelReserve {
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

  .weui-cells {
    margin-top: 0px;
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
    color: #333333;
  }

  .comment_up_new {
    margin-left: 1rem;
    color: #999999;
  }

  .bottom {
    border-bottom: solid 1px #e5e5e5;
    border-left: none;
    border-top: none;
    border-right: none;
    width:calc(~"100% - 10px") ;
    height: 3rem;
    margin-left: 10px;
    outline: none;
    font-size:1.3rem;
  }

  .warmPrompt {
    font-size: 1.3rem;
    color: #999999;
    margin: 1rem;
    line-height: 19px;
  }

  .warmPrompt_up {
  }

  .warmPrompt_dowm {

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

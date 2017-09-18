<template>
  <div class="receiveApply">

    <div class="whole"><div class="left"><span style="color:#f63636 ">*</span>申请人</div>
      <input class="right" placeholder="请输入" v-model="applier" />
    </div>

    <div class="whole"><div class="left"><span style="color:#f63636 ">*</span>联系人手机</div>
      <group  class="middle">
        <popup-radio :options="phoneCodeList" v-model="phoneCode"></popup-radio>
      </group>
      <input class="right" placeholder="请输入" v-model="contactPhone" />
    </div>

    <div class="whole"><div class="left"><span style="color:#f63636 ">*</span>联系人邮箱</div>
      <input class="right" placeholder="请输入" v-model="contactEmail" />
    </div>

    <div class="whole"><div class="left"><span style="color:#f63636 ">*</span>会客人数</div>
      <input class="right" placeholder="请输入" v-model="personNumber" />
    </div>

    <div class="whole_new">
      <div class="left"><span style="color:#f63636 ">*</span>会客时间</div>
      <group>
        <datetime v-model="startTime" format="YYYY/MM/DD HH:mm" :title="startTitle" placeholder="请选择"></datetime>
      </group>
    </div>



    <div class="whole_new">
      <div class="left"><span style="color:#f63636 ">*</span>会客地点</div>
      <group>
        <x-address :title="startTitle"  v-model="detailedAddress" row-value :list="addressData" hide-district placeholder="请选择"></x-address>
      </group>
    </div>
    <div class="whole"><div class="left"></div>
      <input class="right" placeholder="请输入详细地址" v-model="inputAddress" />
    </div>

    <div class="whole"><div class="left">指定培训讲师</div>
      <input class="right" placeholder="请输入" v-model="applyTeacher" />
    </div>


    <div class="whole"><div class="left"><span style="color:#f63636 ">*</span>会客洽谈内容</div>
      <input class="right" placeholder="请输入" v-model="content" />
    </div>


    <div class="whole"><div class="left"><span style="color:#f63636 ">*</span>愿意提取佣金比例</div>
      <input class="right"  placeholder="如：30%" v-model="extractionRatio" />
    </div>

    <div class="comment_up"><span style="color:#f63636 ">*</span>客户背景简单描述</div>
    <input class="bottom" v-model="description" />

    <div class="comment_up">其他要求</div>
    <input class="bottom" v-model="claim" />

    <div class="button">
      <div class="button_left" @click="goBack">取消</div>
      <div class="button_right" @click="goApply">提交</div>
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
  import { Group,Datetime,Confirm,XAddress,PopupRadio,TransferDomDirective as TransferDom } from 'vux';
  export default {
    directives: {
      TransferDom
    },
    components:{
      Group,
      Datetime,
      Confirm,
      XAddress,
      PopupRadio
    },
    data(){
      return{
        applier:null,
        phoneCodes:[],
        phoneCodeList:[],
        phoneCode:"",
        contactPhone:null,
        contactEmail:null,
        personNumber:null,
        content:null,
        startTime:null,
        startTitle:"",
        addressData:[],
        detailedAddress:[],
        inputAddress:null,
        applyTeacher:null,
        extractionRatio:null,
        bili:null,
        description:null,
        claim:null,
        show1:false,
        show2:false,
        title1:"是否确认取消？",
        title2:"是否确认提交申请？",
        channelId:null
      }
    },
  beforeCreate(){
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
        document.setTitle('会客申请');
      }, 1);
    var vm=this;
    vm.channelId=JSON.parse(window.localStorage.userInfo).user.relatedPartyId;
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
    vm.$post('/api/clb/common/clbCode',{
      "cities": "PUB.CITY",
      "provinces": "PUB.PROVICE",
      "phoneCodes": "PUB.PHONE_CODE"
    }).then(function (response) {
      var detail=JSON.parse(response);
      for(let i in detail.provinces){
        let example={};
        example.name=detail.provinces[i].meaning;
        example.value=detail.provinces[i].value;
        example.codeValueId=detail.provinces[i].codeValueId;
        vm.addressData.push(example);
      }
      for(let i in detail.cities){
        let example={};
        example.name=detail.cities[i].meaning;
        example.value=detail.cities[i].value;
        example.parent=detail.cities[i].parentValue;
        example.codeValueId=detail.cities[i].codeValueId;
        vm.addressData.push(example);
      }
      vm.phoneCodes=detail.phoneCodes;
      for(let i in vm.phoneCodes){
        vm.phoneCodeList.push(vm.phoneCodes[i].meaning);
      }
      vm.phoneCode=vm.phoneCodeList[0];
    }),function(response){
      console.log("接口出错了");
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
      onConfirm1:function(){
        var vm=this;
        vm.show1=false;
        vm.$router.go(-1);
      },
      onCancel2:function(){
        var vm=this;
        vm.show2=false;
      },
      onConfirm2:function() {
        var vm = this;
        var phoneCode = null;
        for (let i in vm.phoneCodes) {
          if (vm.phoneCode === vm.phoneCodes[i].meaning) {
            phoneCode = vm.phoneCodes[i].value;
          }
        }
        let index = vm.extractionRatio.indexOf("%");
        if (index != -1) {
          vm.bili = vm.extractionRatio.substr(0, index);
        } else {
          vm.bili=vm.extractionRatio;
        }
        if (vm.applier === null||vm.applier === '') {
          vm.$vux.toast.show({text:"申请人不能为空"});
        } else if (vm.contactPhone === null||vm.contactPhone === '') {
          vm.$vux.toast.show({text:"联系人手机不能为空"});
        } else if (vm.contactEmail === null||vm.contactEmail === '') {
          vm.$vux.toast.show({text:"联系人邮箱不能为空"});
        } else if (vm.personNumber === null||vm.personNumber === '') {
          vm.$vux.toast.show({text:"会客人数不能为空"});
        } else if (vm.startTime === null||vm.startTime === '') {
          vm.$vux.toast.show({text:"会客时间不能为空"});
        }else if(new Date(vm.startTime).getTime()<new Date().getTime()){
          vm.$vux.toast.show({text:"会客时间不能早于当前时间"});
        }else if (vm.detailedAddress === null||vm.detailedAddress === '') {
          vm.$vux.toast.show({text:"会客地点不能为空"});
        } else if (vm.inputAddress === null||vm.inputAddress === '') {
          vm.$vux.toast.show({text:"详细地址不能为空"});
        } else if (vm.content === null||vm.content === '') {
          vm.$vux.toast.show({text:"会客洽谈内容不能为空"});
        } else if (vm.extractionRatio === null||vm.extractionRatio === '') {
          vm.$vux.toast.show({text:"愿意提取佣金比例不能为空"});
        }else if(Number(vm.bili)>100){
          vm.$vux.toast.show({text:'佣金比例最高为100%'});
        } else if (vm.description === null||vm.description === '') {
          vm.$vux.toast.show({text:"客户背景简单描述不能为空"});
        } else {
          if (phoneCode === '86' && (!(/^1(3|4|5|7|8)\d{9}$/.test(vm.contactPhone)))) {
            vm.$vux.toast.show({text:'手机号码有误'});
          } else if (phoneCode === '00852' && (vm.contactPhone.length != 8)) {
            vm.$vux.toast.show({text:'手机号码有误'});
          } else if (phoneCode === '00853' && (vm.contactPhone.length != 8)) {
            vm.$vux.toast.show({text:'手机号码有误'});
          } else if (phoneCode === '00886' && (vm.contactPhone.length != 9)) {
            vm.$vux.toast.show({text:'手机号码有误'});
          } else if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(vm.contactEmail)) {
            vm.$vux.toast.show({text:'手机号码有误'});
          } else {
            var date = new Date(vm.startTime);
            var startTime = date.format('yyyy-MM-dd hh:mm:ss');
            vm.bili=(Number(vm.bili)/100).toFixed(2);
            vm.$post('/api/support/submit', {
              "channelId": vm.channelId,
              "createrName": vm.applier,
              "phoneCode": phoneCode,
              "prefix": phoneCode,
              "province": vm.detailedAddress[0],
              "city": vm.detailedAddress[1],
              "contactPhone": vm.contactPhone,
              "contactEmail": vm.contactEmail,
              "guestBackground": vm.description,
              "guestDate": startTime,
              "guestDiscussContent": vm.content,
              "guestParTotal": vm.personNumber,
              "guestTeacher": vm.applyTeacher,
              "guestPercent": vm.bili,
              "guestAddress": vm.inputAddress,
              "supportType": "GUEST",
              "other": vm.claim
            }).then(function (response) {
              if (response.success === true) {
                vm.$vux.toast.show({text:'提交申请已成功'});
                setTimeout(function () {
                  vm.$router.go(-1);
                }, 2000);

              } else {
                vm.$vux.toast.show({text:'提交申请失败'});
              }


            }), function (response) {
              console.log("接口出错了");
            };
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
  .receiveApply{
    width: 100%;
    background-color: white;
    min-height: 100%;
    position: absolute;


  .weui-cells:before {
    border-top: none;
  }

  .weui-cells:after {
    left: 10px;
    border-bottom: 2px solid #D9D9D9;
  }
  .vux-cell-box:before{
    border-top: none;
  }

  .vux-x-icon {
    fill: #999999;
    padding-right: 10px;
  }

  .weui-cell_access .weui-cell__ft {
    padding-right: 23px;
  }

  .weui-cells {
    font-size: 1.4rem;
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
  }
  .middle{
    display: inline-block;
    width: 40%;
    margin-top:-10px;

  .weui-cells:before{
    border-top:none;
  }
  .weui-cells:after{
    border-bottom: none;
  }
  .weui-cell{
    padding: 0px;
  }
  .weui-cell_access .weui-cell__ft{
    padding: 0px;
    margin-bottom: 10px;
    font-size:1.4rem;
  }
  .weui-cell_access .weui-cell__ft:after{
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
    font-size: 1.4rem;

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
    /*padding-top: 10px;*/
    color: #333333;
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
  .vux-cell-box:before{
    border-top: none;
  }
  .vux-popup-picker-value {
    display: block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 13rem;
  }
  }



  .comment_up {
    margin-left: 1rem;
    position: relative;
    color:#333333;
  }
  .bottom{
    border-bottom: solid 1px #e5e5e5 ;
    border-left: none;
    border-top: none;
    border-right: none;
    width: calc(~"100% - 10px");
    height: 3.15rem;
    margin-left: 10px;
    outline: none;
    box-sizing: border-box;
    font-size: 1.3rem;
  }

  .button{
    display: flex;
    display: -webkit-flex;
    font-size: 1.7rem;
    margin:1rem;
  }
  .button_left{
    display: inline-block;
    width: 50%;
    text-align: center;
    height: 4rem;
    background-color:white ;
    border:solid 1px #D1D1D1;
    padding-top: 1.5rem;
    border-radius: 5px;
    margin:1rem;
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

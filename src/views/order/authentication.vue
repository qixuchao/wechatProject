<template>
  <div class="authentication">
    <div class="whole"><div class="left"><span style="color:#f63636 ">*</span>姓名：</div>
      <input class="right" placeholder="请输入" v-model="userName" />
    </div>
    <div class="whole"><div class="left"><span style="color:#f63636 ">*</span>身份证号：</div>
      <input class="right" placeholder="请输入" v-model="identId" />
    </div>
    <div class="whole"><div class="left"><span style="color:#f63636 ">*</span>电子邮箱：</div>
      <input class="right" placeholder="请输入" v-model="email" />
    </div>
    <div class="whole"><div class="left"><span style="color:#f63636 ">*</span>手机号码：</div>
      <group  class="middle">
        <popup-radio :options="phoneCodeList" v-model="phoneCode"></popup-radio>
      </group>
      <input class="right" placeholder="请输入" v-model="phoneNumber"/>
    </div>
    <div class="whole"><div class="left"><span style="color:#f63636 ">*</span>验证码：</div>
      <input class="right_new" placeholder="请输入" v-model="verifiCode"/>
      <div v-if="!isGetVerificationAgain" class="right_else" @click="getVerification()">获取验证码</div>
      <div v-if="isGetVerificationAgain" class="right_else" >{{timeCount}}s后获取验证码</div>
    </div>
    <div class="modelButton" :style="isSuccess?'background:#E6A913':'background:#f7e5b8;pointer-events: none'" @click="addCustomer()">
      <span>提交验证</span>
    </div>
    <toast v-model="showToast" type="text" width="20em" :time="1500">{{displayText}}</toast>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Toast,Group,PopupRadio} from 'vux';
    export default {
      components:{
        Toast,Group,PopupRadio
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
          };
          document.body.appendChild(i);
        };
        setTimeout(function(){
          document.setTitle('身份验证');
        }, 1);
      },
      data () {
        return {
          userName:'',
          email:'',
          userInfo:this.$route.query.accountInfo,
          identId:'',
          phoneCodeList:[{key:'86',value:'+86'},{key:'00852',value:'+852'},{key:'00853',value:'+853'},{key:'00886',value:'+886'}],
          phoneCode:[{key:'86',value:'+86'}][0].key,
          phoneNumber:'',
          showToast:false,
          attribute:'',
          verifiCode:'',
          timeCount:60,
          isGetVerificationAgain:false,
          displayText:''
        }
      },
      computed:{
        isSuccess:function(){
          return this.userName&&this.email&&this.verifiCode&&this.identId&&this.phoneNumber;
        }
      },
      judgeIsHidden(data){
        document.addEventListener("visibilitychange", function() {
          if (document.hidden) {
              data -=1;
          } else {

          }
        });
      },
      methods: {
        checkEmail(value){
          let press = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
          if(!press.test(value)){
            this.displayText = '邮箱格式错误';
            this.showToast = true;
            return false;
          }
          return true;
        },
        getVerification(){
          let _this = this;
          let url ='/api/public/sendVerifiCode';
          if(!_this.phoneNumber){
            _this.showToast = true;
            _this.displayText = '手机号为空!';
          }else{
            _this.$post(url,{'phone':_this.phoneNumber,'phoneCode':_this.phoneCode}).then(response =>{
              if(response.success){
//                JSON.parse(window.localStorage.userInfo).sessionId = response.sessionId;
                window.localStorage.sessionIdc = response.sessionId;
                _this.showToast =true;
                _this.displayText = '发送成功';
                _this.isGetVerificationAgain = true;
                _this.timeCount = 60;
                _this.getVerificationAgain();
              }else{
                _this.showToast = true;
                _this.displayText = response.msg;
              }
            });
          }
        },
        getVerificationAgain(){
          let _this = this;
          if (_this.timeCount > 0) {
            _this.timeCount-=1;
            document.addEventListener("visibilitychange", function() {
              if (document.hidden) {
                _this.timeCount -=1;
              } else {
              }
            });
            setTimeout(_this.getVerificationAgain, 1000);
          }else{
            _this.isGetVerificationAgain = false;
          }
        },
        addCustomer(){
          let _this = this,
            param = {
              chineseName:_this.userName,
              email:_this.email,
              identityNumber:_this.identId,
              phone:_this.phoneNumber,
              phoneCode:_this.phoneCode,
              verifiCode:_this.verifiCode,
              user:{
                password:'12345678',
                backgroundAppid:_this.config.appId,
                wechatOpenid:window.localStorage.openid,
                attribute1:_this.attribute,
                phone:_this.phoneNumber,
                phoneCode:_this.phoneCode,
                userType:'CUSTOMER'
              }
            },
            url = '/api/public/addCustomer';
          if(!_this.checkEmail(_this.email)){
              return;
          }
          _this.$post(url,param).then(response=>{
            _this.showToast = true;
            if(response.success){
              window.localStorage.userInfoc = JSON.stringify(response);
              window.localStorage.sessionIdc=response.sessionId;
              window.localStorage.wechatOpenid = param.wechatOpenid;
              _this.displayText = '校验成功';
              setTimeout(
                _this.$router.push(window.localStorage.page),1000
              );
            }else if(!response.success){
              if(response.message==='该身份证已关联其他手机号，是否更换？'){
                _this.$vux.confirm.show({
                  title: '小财提示',
                  content: '该身份证已关联其他手机号，是否更换？',
                  onCancel () {
                  },
                  onConfirm () {
                    _this.attribute = 'checkPhone';
                    _this.addCustomer();
                  }
                })
              }
              _this.displayText = response.message;
            }
          })
        }
      }
    }
</script>

<style lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
  .authentication{
    width: calc(100% - 50px);
    padding: 27px 25px 0 25px;
    position: absolute;
    background: white;
    min-height: calc(100% - 27px);

  .whole {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    min-height: 4rem;
    border-bottom: 1px solid #D9D9D9;
    padding-top:1rem;
  }

  .left {
    display: inline-block;
    width: 50%;
    align-items: center;
    color: #333333;
  }
  .right_new{
    border: 0px;
    display: inline-block;
    width: 50%;
    text-align: right;
    padding-right: 1rem;
    height: 3rem;
    outline: none;
    font-size: 1.3rem;
  }
  .right_else{
    width: 55%;
    height: 2.5rem;
    line-height: 2;
    text-align: center;
    background-color: #e6a914;
    border-radius: 5px;
    color: white;
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
    font-size:1.3rem;
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
    font-size: 1.3rem;

  }
  .telPhoneNum{
    width: 100%;
    padding: 25px 0 14px;
    /*border-bottom: 1px solid gainsboro;*/
    font-size: 1.5rem;
    color:#333;
    position:relative;
  .line{
    width: 100%;
    height: 1px;
    position: absolute;
    right: 0;
    bottom: 0;
    background-image: linear-gradient(to right, #fff, #e5e5e5 15%, #e5e5e5 85%, #fff);
  }
  .descLabel{
    vertical-align: middle;
    width: 22%;
    line-height: 34px;
    border-right: 1px solid #e5e5e5;
  img{
    width: 25px;
    display: inline-block;
    vertical-align: inherit;
  }
  }
  .phone{
    width: 72%;
    border: none;
    background: none;
    padding: 0;
    height: 30px;
    outline: none;
    margin-left: 10px;
  }
  .message{
    width: 25px;
    position: relative;
    bottom: -8px;
  }
  input{
    width: 40%;
    border: none;
    background: none;
    padding: 0;
    line-height: 30px;
    outline: none;
    margin-left: 10px;
    font-size: 1.5rem;
  }
  .getNum{
    float: right;
    margin-top: 11px;
  }
  }
  .protocol{
    width: 100%;
    padding: 13px 0;
  .icon {
  img {
    height: 20px;
    display: inline-block;
    vertical-align: middle;
  }
  }
  .desc{
    width: calc(100% - 30px);
  span{
    display: inline-block;
    vertical-align: middle;
    font-size: 1.3rem;
    color: #666;
  }
  }
  }
  .modelButton{
    width: 80%;
    text-align: center;
    margin-left: 10%;
    line-height: 45px;
    /*background: #f7e5b8;*/
    border-radius: 25px;
    font-size: 1.8rem;
    color: white;
    margin-top: 53px;
    letter-spacing: 1px;
  }
  .alert{
    position: absolute;
    width: 70%;
    left: 15%;
    height: 18%;
    background: white;
    z-index: 111;
    text-align: center;
    border-radius: 5px;
  .content{
    display: flex;
    line-height: 75px;
    font-size: 1.9rem;
    color: #333;
    -ms-flex-pack: center;
    justify-content: center;
  }
  .message{
    font-size: 1.2rem;
    color: #999;
  }
  }
  .bgDrag{
    position: fixed;
    background: #000;
    z-index: 11;
    opacity: 0.5;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  .showRadio{
    position: fixed;
    width:100%;
    height:160px;
    z-index: 20;
    left:0;
    bottom:0;
    background: white;
    display: block;
  .radioList{
    width:100%;
    margin-left: 15px;
    line-height: 40px;
    font-size: 1.6rem;
    border-bottom: 1px solid #e5e5e5;
  }
  }
  .footer{
    line-height: 40px;
    background: #E6A914;
    text-align: center;
    color: white;
    font-size: 1.7rem;
    letter-spacing: 5px;
    margin-top: 50px;
    border-radius: 5px;
    width: 90%;
    margin-left: 1rem;
  }
  }
</style>

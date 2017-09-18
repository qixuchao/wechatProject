<template>
  <div class="register">
    <div class="telPhoneNum">
      <div class="descLabel">
        <img :src="phone" alt="">
        <span @click="selectPhoneCode()">+{{phoneCode.value}}</span>
      </div>
      <input class="phone" type="number" v-model="phoneNum" placeholder="手机号">
      <div class="line"></div>
    </div>
    <div class="telPhoneNum">
      <img :src="message" alt="" class="message">
      <input type="number" v-model="verification" placeholder="手机验证码">
      <div class="getNum">
        <span v-if="!isGetVerificationAgain" @click="getVerification()">获取验证码</span>
        <span v-if="isGetVerificationAgain">{{timeCount}}s后获取验证码</span>
      </div>
      <div class="line"></div>
    </div>
    <div class="protocol">
      <div class="icon" @click="isAgreeProtocol()">
        <img :src="disagree" v-if="!AgreeProtocol" alt="">
        <img :src="agree" v-if="AgreeProtocol" alt="">
      </div>
      <div class="desc" @click="showPopup=true">
        <span>我已阅读并同意《财联邦理财服务平台使用协议》</span>
      </div>
      </div>
    <div class="modelButton" :style="isSuccess?'background:#E6A913':'background:#f7e5b8;pointer-events: none'" @click="showPlugin()">
      <span>立即绑定</span>
    </div>
    <div class="popupClass">
        <div class="protocol" v-if="showPopup">
          <div class="header">财联邦线上系统用户注册协议</div>
          <div class="content">
            一、总则<br>
            1.1 财联邦线上系统的所有权和运营权归财联邦管理有限公司所有。<br>
            1.2 用户在注册之前，应当仔细阅读本协议，并同意遵守本协议后方可成为注册用户。一旦注册成功，则用户与财联邦之间自动形成协议关系，用户应当受本协议的约束。用户在使用特殊的服务或产品时，应当同意接受相关协议后方能使用。<br>
            1.3 本协议细则可由财联邦随时更新，用户应当及时关注并同意，本站不承担通知义务。本站的通知、公告、声明或其它类似内容是本协议的一部分。<br>
            二、服务内容<br>
            2.1 财联邦的具体内容由第三方根据实际业务情况向本站提供，相关业务及产品资料及内容的准确性及时性本站不予承担责任。<br>
            2.2 本站仅提供相关的网络服务及相关业务支持服务，除此之外与相关网络服务有关的设备(如个人电脑、手机、及其他与接入互联网或移动网有关的装置)及所需的费用(如为接入互联网而支付的电话费及上网费、为使用移动网而支付的手机费、购买网站内相关业务支持增值服务的费用等)均应由用户自行负担。<br>
            2.3 本站内所示服务费率标准由第三方根据实际业务情况提供和发布，供注册用户参考，不构成正式销售邀约，正式服务费率以实际产生的服务费为准。<br>
            2.4 在存在明显错误或与实际线下产生的业务不符的情况下，本站有权对网站上显示的产品及订单进行单方面的修改或取消，注册用户有义务对已发现的错误通过邮件或客服通知本站。<br>
            三、用户帐号<br>
            3.1 经本站注册系统完成注册程序并通过身份认证的用户即成为正式用户，可以获得本站规定用户所应享有的一切权限；未经认证仅享有本站规定的部分会员权限。财联邦有权对会员的权限设计进行变更。<br>
            3.2 用户只能按照注册要求使用真实姓名。用户有义务保证密码和帐号的安全，未经本站同意，不得将注册账户交给他人或其他第三方使用。<br>
            3.3 用户利用该密码和帐号所进行的一切活动引起的任何损失或损害，由用户自行承担全部责任，本站不承担任何责任。如用户发现帐号遭到未授权的使用或发生其他任何安全问题，应立即修改帐号密码并妥善保管，如有必要，请通知本站。因黑客行为或用户的保管疏忽导致帐号非法使用或信息泄露，本站不承担任何责任。<br>
            3.4 用户通过本站产生的各项业务往来，如有业务纠纷或损失，本站不承担相关责任或赔偿，因本站系统服务过失导致的损失除外。<br>
            3.5 本站有权对所有注册账户进行不定期审核并对存在以下使用情形的账户给予警告或关停处理：<br>
            (1) 恶意盗取、下载、挪用本站业务资料的行为；<br>
            (2) 长期大量占用系统服务资源而并无实际业务操作的行为；<br>
            (3) 恶意传播、公开系统账号及登录信息，对本站造成损害的行为；<br>
            (4) 其他本站认为不合理使用或危害本站利益的行为。<br>
            四、使用规则<br>
            4.1 遵守中华人民共和国相关法律法规，包括但不限于《中华人民共和国计算机信息系统安全保护条例》、《计算机软件保护条例》、《最高人民法院关于审理涉及计算机网络著作权纠纷案件适用法律若干问题的解释(法释[2004]1号)》、《全国人大常委会关于维护互联网安全的决定》、《互联网电子公告服务管理规定》、《互联网新闻信息服务管理规定》、《互联网著作权行政保护办法》和《信息网络传播权保护条例》等有关计算机互联网规定和知识产权的法律和法规、实施办法。<br>
            4.2 用户承诺对其上传于本站的所有信息均已经得到相关权利人的合法授权；如用户违反本条规定造成本站被第三人索赔的，用户应全额补偿本站一切费用(包括但不限于各种赔偿费、诉讼代理费及为此支出的其它合理费用)；<br>
            4.3 当第三方认为用户上传于本站的信息侵犯其权利，并根据《信息网络传播权保护条例》或者相关法律规定向本站发送权利通知书时，用户同意本站可以自行判断决定删除涉嫌侵权信息，除非用户提交书面证据材料排除侵权的可能性，本站将不会自动恢复上述删除的信息；<br>
            4.4 (1)不得为任何非法目的而使用网络服务系统；<br>
            (2)遵守所有与网络服务有关的网络协议、规定和程序；<br>
            (3)不得利用本站进行任何可能对互联网的正常运转造成不利影响的行为；<br>
            (4)不得利用本站进行任何不利于本站的行为。<br>
            4.5 如用户在使用网络服务时违反上述任何规定，本站有权要求用户改正或直接采取一切必要的措施(包括但不限于封停用户、暂停或终止用户使用服务的权利)以减轻用户不当行为而造成的影响。<br>
            五、隐私保护<br>
            5.1 本站不对外公开或向第三方提供单个用户的注册资料及用户在使用网络服务时存储在本站的非公开内容，但下列情况除外：<br>
            (1)事先获得用户的明确授权；<br>
            (2)根据有关的法律法规要求；<br>
            (3)按照相关政府主管部门的要求；<br>
            (4)为维护社会公众的利益。<br>
            5.2 本站可能会与第三方合作向用户提供相关的网络服务，在此情况下，如该第三方同意承担与本站同等的保护用户隐私的责任，则本站有权将用户的注册资料等提供给该第三方。<br>
            5.3 在不透露单个用户隐私资料的前提下，本站有权对整个用户数据库进行分析统计及利用。<br>
            六、版权声明<br>
            6.1 本站的文字、图片、音频、视频等版权均归财联邦管理有限公司享有或与作者共同享有，未经本站许可，不得任意复制传播或转载。<br>
            6.2 本站特有的标识、版面设计、编排方式等版权均属财联邦科技有限公司享有，未经本站许可，不得任意复制或转载。<br>
            6.3 未经本站同意，不得对本站内部任何内容包括且不限于图片、文档、链接、通知等信息做任何形式的公开传播，一经发现，相关用户须承担一切相关法律责任。<br>
            6.4 恶意转载本站内容的，本站保留将其诉诸法律的权利。<br>
            七、责任声明<br>
            7.1 用户明确同意其使用本站网络服务所存在的风险及一切后果将完全由用户本人承担，本站对此不承担任何责任。<br>
            7.2 本站无法保证网络服务一定能满足用户的要求，也不保证网络服务的及时性、安全性、准确性。<br>
            7.3 本站不保证为方便用户而设置的外部链接的准确性和完整性，同时，对于该等外部链接指向的不由本站实际控制的任何网页上的内容，本站不承担任何责任。<br>
            7.4 对于因不可抗力或本站不能控制的原因造成的网络服务中断或其它缺陷，本站不承担任何责任，但将尽力减少因此而给用户造成的损失和影响。<br>
            7.5 对于站向用户提供的下列产品或者服务的质量缺陷本身及其引发的任何损失，本站无需承担任何责任：<br>
            (1)本站向用户免费提供的各项网络及业务支持服务；<br>
            (2)本站向用户赠送的任何产品或者线下服务。<br>
            7.6 本站有权于任何时间暂时或永久修改或终止本服务(或其任何部分)，而无论其通知与否，本站对用户和任何第三人均无需承担任何责任。<br>
            八、附则<br>
            8.1 本协议的订立、执行和解释及争议的解决均应适用香港特别行政区法律。<br>
            8.2 如本协议中的任何条款无论因何种原因完全或部分无效或不具有执行力，本协议的其余条款仍应有效并且有约束力。<br>
            8.3 本协议解释权及修订权归财联邦管理有限公司所有。<br>
          </div>
          <div class="footer">
            <span @click="agreeProtocol()">同意并授权</span>
          </div>
        </div>
    </div>
    <!--<transition name="fade">-->
      <div class="alert" v-if="show">
        <div>
          <span class="content">{{content}}</span>
          <span class="message">3秒后自动关闭</span>
        </div>
      </div>
      <div class="bgDrag" v-if="showDrag"></div>
    <!--</transition>-->
    <toast v-model="showToast" type="text" width="20em" :time="1500">{{displayText}}</toast>
    <div class="showRadio" v-if="isShowRadio">
      <div class="radioList" v-for="list in phoneCodeList" @click="getCode(list)">
        {{list.value}}
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Toast,Popup} from 'vux';
  export default{
    components:{
      Toast,
      Popup
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
        document.setTitle('渠道注册');
      }, 1);
    },
    mounted(){
      history.pushState(null, null, document.URL);
      window.addEventListener('popstate', function() {
        history.pushState(null, null, document.URL);
      });
    },
    methods:{
      selectPhoneCode(){
        this.isShowRadio = !this.isShowRadio;
        this.showDrag = !this.showDrag;
      },
      getCode(code){
        this.phoneCode = code;
        this.selectPhoneCode();
      },
      mounted(){
      },
      checkWXAccount(value){
        return new Promise(resolve=>{
          let url = '/api/public/checkWxAccount',
            param = {
              phone: this.phoneNum,
              phoneCode: this.phoneCode.key,
              userType: 'CHANNEL',
              wechatOpenid: window.localStorage.openid,
              backgroundAppid:this.config.appId,
              verifiCode:this.verification,
              attribute1:value
            };
          this.$post(url, param).then(response=> {
            this.userInfo = param;
            this.userInfo.verification = this.verification;
            if (response.success) {
              window.localStorage.userInfo = JSON.stringify(response);
              localStorage.sessionIdb = response.sessionId;
              window.localStorage.wechatOpenid = param.wechatOpenid;
            }
            this.displayText = response.message;
            this.isSuccess1 = response.success;
            resolve(response.success);
          })
        })
      },
      showPlugin () {
        let _this = this;
        _this.checkWXAccount().then(response=>{
          if (response) {
            _this.show = true;
            _this.showDrag = true;
            _this.content = '绑定成功';
          }else {
            if(_this.displayText ==='您的手机号已绑定其他微信号，是否更换绑定？'){
              _this.$vux.confirm.show({
                title: '小财提示',
                content: '您的手机号已绑定其他微信号，是否更换绑定？',
                onCancel () {
                },
                onConfirm () {
                  _this.checkWXAccount('change').then(response=>{
                    if(response){
                      _this.$router.push(window.localStorage.page)
                    }else{
                      _this.$vux.toast.show({text:response.message});
                    }
                  });
                }
              })
            }else{
              _this.showToast = true;
              setTimeout(_this.$router.push({name:'setAccount',query:{accountInfo:_this.userInfo}}),1000)
            }
          }
        });
      },
      agreeProtocol(){
        this.showPopup = false;
        this.AgreeProtocol = true;
      },
      isAgreeProtocol (){
        this.AgreeProtocol = !this.AgreeProtocol;
      },
      goPage(page){
        this.$router.push(page);
      },
      getVerification(){
        let _this = this;
        let url ='/api/public/sendVerifiCode';
        if(!_this.phoneNum){
          _this.showToast = true;
          _this.displayText = '手机号为空!';
        }else{
          _this.$post(url,{'phone':_this.phoneNum,'phoneCode':_this.phoneCode.key}).then(response =>{
            if(response.success){
              localStorage.sessionIdb = response.sessionId;
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
      }
    },
    watch:{
      show:function(value){
        if(value){
          var self = this;
          setTimeout(function(){
            self.show = false;
            self.showDrag = false;
              self.$router.push(window.localStorage.page);
          },3000);
        }
      }
    },
    computed:{
      isSuccess:function(){
        return this.phoneNum&&this.verification&&this.AgreeProtocol;
      }
    },
    data(){
      return {
        phone: require('../../assets/register/icon_phone@3x.png'),
        message: require('../../assets/register/icon_message@3x.png'),
        disagree: require('../../assets/register/icon_unselect@3x.png'),
        agree: require('../../assets/register/icon_select@3x.png'),
        content: '',
        displayText:'',
        phoneNum:'',
        title: '',
        button:'',
        verification:'',
        show:false,
        showPopup:false,
        AgreeProtocol:false,
        showToast:false,
        isGetVerificationAgain:false,
        timeCount:60,
        sessionId:'',
        userInfo:{},
        isShowRadio:false,
        phoneCode:{key:'86',value:'86'},
        showDrag:false,
        isSuccess1:false,
        phoneCodeList:[{key:'86',value:'86'},{key:'00852',value:'852'},{key:'00853',value:'853'},{key:'00886',value:'886'}]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
 .register{
    width: calc(100% - 50px);
    padding: 27px 25px 0 25px;
     position: absolute;
     background: white;
     min-height: calc(100% - 27px);
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
        display:inline-block;
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
        display:inline-block;
        img {
          height: 20px;
          display: inline-block;
          vertical-align: middle;
        }
      }
      .desc{
        width: calc(100% - 30px);
        display:inline-block;
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
    .popupClass{
      position: absolute;
      top: 0;
      width: 100%;
      z-index: 222;
      left: 0;
      .protocol{
        background: #fff;
        padding: 0 10px 0 15px;
        box-sizing: border-box;
        padding-bottom: 55px;
        .header{
          text-align: center;
          line-height: 45px;
          font-size: 1.6rem;
          width: 100%;
        }
        .content{
          line-height: 30px;
          color: #333;
        }
        .footer{
          text-align: center;
          line-height: 45px;
          position: fixed;
          bottom: 0;
          background: white;
          width: 100%;
          left:0;
          span{
            border: 1px solid;
            padding: 10px 35px;
            color: #E6A913;
          }
        }
      }
    }
  }
</style>

<template>
    <div class="myTeam" v-if="openId">
      <div class="tab">
        <tab :line-width=2 active-color='#E6A914' custom-bar-width="60px" v-model="index">
          <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in tabList" @click.native="checkStatus(item)" :key="index">{{item}}</tab-item>
        </tab>
          <div v-if="demo2 === '团队成员'" class="teamRemember">
            <div class="information1">
              <group>
                <popup-radio title="" :options="options1" placeholder="帐号状态" v-model="option1"></popup-radio>
              </group>
              <input type="text" v-model="name" placeholder="请输入用户名，或者渠道名称">
              <!--<span class="searchAll" @click="searchAll()">全部</span>-->
            </div>
            <div class="cardList" v-for="remember in teamRemember" @click="goPage('mineTeam',remember)">
              <span>{{remember.userName}}</span>
              <span style="display: inline-block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width: 100%;">佣金分成: &nbsp;{{remember.rate1}},{{remember.rate2}},{{remember.rate3}},{{remember.rate4}},{{remember.rate5}},{{remember.rate6}},{{remember.rate7}},{{remember.rate8}},{{remember.rate9}},{{remember.rate10}}</span>
              <span>计划书额度: &nbsp;{{remember.planQuota}}</span>
              <span>签单金额(HKD): &nbsp;{{remember.allSignAmount?remember.allSignAmount:0}}</span>
            </div>
          </div>
          <div v-if="demo2==='新建成员'" class="newRemember">
            <div class="information">
              <div class="label">
                <span class="requireClass">*</span>
                <span>渠道姓名</span>
              </div>
              <input type="text" placeholder="请输入" v-model="postParam.channelName" class="input">
            </div>
            <div class="information">
              <group>
                <span class="requireClass" style="position:absolute;color:red">*</span>
                <popup-radio title="手机区号" :options="optionsCode" v-model="optionPhone" placeholder="请选择"></popup-radio>
              </group>
            </div>
            <div class="information">
              <div class="label">
                <span class="requireClass">*</span>
                <span>联系电话</span>
              </div>
              <input type="number" :placeholder="place" v-model="postParam.phoneCode" class="input">
            </div>
            <div class="information">
              <div class="label">
                <span class="requireClass">*</span>
                <span>电子邮箱</span>
              </div>
              <input type="email" placeholder="请输入" v-model="postParam.email" class="input">
            </div>
            <div class="inputRow">
              <div class="label">
                <span class="requireClass">*</span>
                所属地区:</div>
              <group>
                <x-address :title="title1" v-model="postParam.address" raw-value :list="addressData" placeholder="请选择" value-text-align="left"></x-address>
              </group>
            </div>
            <div class="information">
              <div class="label">
                <span class="requireClass">*</span>
                <span>用户名</span>
              </div>
              <input type="text" placeholder="请输入" v-model="postParam.userName" class="input">
            </div>
            <div class="information">
              <div class="label">
                <span style="color: #fff;">*</span>
                <span>初始密码</span>
              </div>
              <span class="input">{{postParam.originPassword}}</span>
            </div>
            <div class="information">
              <div class="label">
                <span style="color: #fff;">*</span>
                <span>计划书额度</span>
              </div>
              <span class="input">{{postParam.planLimit}}</span>
            </div>
            <div class="information">
              <div class="label">
                <span class="requireClass">*</span>
                <span>佣金分成(第一年)</span>
              </div>
              <input type="number" placeholder="0" v-model="postParam.amountPercent1" style="width:calc(75% - 18px);" class="input">
              <span style="color: #666">%</span>
            </div>
            <div class="information">
              <div class="label">
                <span class="requireClass">*</span>
                <span>佣金分成(第二年)</span>
              </div>
              <input type="number" placeholder="0" v-model="postParam.amountPercent2" style="width:calc(75% - 18px);" class="input">
              <span style="color: #666">%</span>
            </div>
            <div class="information">
              <div class="label">
                <span class="requireClass">*</span>
                <span>佣金分成(第三年)</span>
              </div>
              <input type="number" placeholder="0" v-model="postParam.amountPercent3" style="width:calc(75% - 18px);" class="input">
              <span style="color: #666">%</span>
            </div>
            <div class="information">
              <div class="label">
                <span class="requireClass">*</span>
                <span>佣金分成(第四年)</span>
              </div>
              <input type="number" placeholder="0" v-model="postParam.amountPercent4" style="width:calc(75% - 18px);" class="input">
              <span style="color: #666">%</span>
            </div>
            <div class="information">
              <div class="label">
                <span class="requireClass">*</span>
                <span>佣金分成(第五年)</span>
              </div>
              <input type="number" placeholder="0" v-model="postParam.amountPercent5" style="width:calc(75% - 18px);" class="input">
              <span style="color: #666">%</span>
            </div>
            <div class="information">
              <div class="label">
                <span class="requireClass">*</span>
                <span>佣金分成(第六年)</span>
              </div>
              <input type="number" placeholder="0" v-model="postParam.amountPercent6" style="width:calc(75% - 18px);" class="input">
              <span style="color: #666">%</span>
            </div>
            <div class="information">
              <div class="label">
                <span class="requireClass">*</span>
                <span>佣金分成(第七年)</span>
              </div>
              <input type="number" placeholder="0" v-model="postParam.amountPercent7" style="width:calc(75% - 18px);" class="input">
              <span style="color: #666">%</span>
            </div>
            <div class="information">
              <div class="label">
                <span class="requireClass">*</span>
                <span>佣金分成(第八年)</span>
              </div>
              <input type="number" placeholder="0" v-model="postParam.amountPercent8" style="width:calc(75% - 18px);" class="input">
              <span style="color: #666">%</span>
            </div>
            <div class="information">
              <div class="label">
                <span class="requireClass">*</span>
                <span>佣金分成(第九年)</span>
              </div>
              <input type="number" placeholder="0" v-model="postParam.amountPercent9" style="width:calc(75% - 18px);" class="input">
              <span style="color: #666">%</span>
            </div>
            <div class="information">
              <div class="label">
                <span class="requireClass">*</span>
                <span>佣金分成(第十年)</span>
              </div>
              <input type="number" placeholder="0" v-model="postParam.amountPercent10" style="width:calc(75% - 18px);" class="input">
              <span style="color: #666">%</span>
            </div>
            <!--<div class="inputRow">-->
              <!--<div class="label">-->
                <!--<span class="requireClass">*</span>-->
                <!--分成有效期起</div>-->
              <!--<group>-->
                <!--<datetime v-model="postParam.dateStart" format="YYYY-MM-DD" placeholder="请选择" :title="title"></datetime>-->
              <!--</group>-->
            <!--</div>-->
            <!--<div class="inputRow">-->
              <!--<div class="label">-->
                <!--<span class="requireClass">*</span>-->
                <!--分成有效期至</div>-->
              <!--<group>-->
                <!--<datetime v-model="postParam.dateEnd" format="YYYY-MM-DD" placeholder="请选择" :title="title"></datetime>-->
              <!--</group>-->
            <!--</div>-->
          </div>
          <div v-if="demo2==='新建成员'" :style="isFull?'background:#E6A913':'background:#f7e5b8;pointer-events: none'" @click="createMember()" class="footer">
            确认
          </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import {Tab,TabItem,Swiper,SwiperItem,Group,Datetime,PopupRadio,XAddress,ChinaAddressV3Data} from 'vux';
    export default {
      components:{
        Tab,TabItem,Swiper,SwiperItem,Group,Datetime,PopupRadio,XAddress
      },
      beforeCreate(){
        this.openId = '';
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
            document.setTitle('我的团队');
          }, 1);
        if(window.localStorage.wechatOpenid !==window.localStorage.openid){
        }else {
          this.openId = window.localStorage.wechatOpenid;
          this.getRemember({parentChannelId:JSON.parse(window.localStorage.userInfo).user.relatedPartyId,orderBy:[]}).then(response=>{
            this.getCLBCode();
          });
        }
      },
      watch:{
        option1:function(value){
          this.teamRemember = [];
          if(value==='all'){
            value = '';
          }
          this.getRemember({channelName: "",contactPerson: this.name, orderEffectiveDateFrom: "", orderEffectiveDateTo: "",
            parentChannelId: JSON.parse(window.localStorage.userInfo).user.relatedPartyId, userStatus: value});
        },
        name:function(value){
          this.teamRemember = [];
          if(this.option1==='all'){
            this.option1 = '';
          }
          this.getRemember({channelName: "",contactPerson: this.name, orderEffectiveDateFrom: "", orderEffectiveDateTo: "",
            parentChannelId: JSON.parse(window.localStorage.userInfo).user.relatedPartyId, userStatus:this.option1});
        },
        optionPhone:function(value){
          if(value ==='86'){
            this.place = '请输入11位手机号';
          }else if(value ==='00852'){
            this.place = '请输入8位手机号';
          }else if(value ==='00853'){
            this.place = '请输入8位手机号';
          }else if(value ==='00886'){
            this.place = '请输入9位手机号';

          }
        }
      },
      computed:{
        isFull:function(){
          return this.postParam.channelName&&this.postParam.phoneCode&&this.postParam.email&&this.postParam.userName;
        }
      },
      methods: {
        checkData(value,type){
          if(type ==='phone'){
            if(this.postParam.optionPhone ==='86'&&value.length==11){
                return true;
            }else if(this.postParam.optionPhone ==='00852'&&value.length==8){
              return true;

            }else if(this.postParam.optionPhone ==='00853'&&value.length==8){
              return true;

            }else if(this.postParam.optionPhone ==='00886'&&value.length==9){
              return true;
            }else{
            this.$vux.toast.show({text:'手机号格式错误'});
              return false;
            }
          }
          if(type ==='email'){
            let press = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
            if(!press.test(value)){
              this.$vux.toast.show({text:'邮箱格式错误'});
              return false;
            }else{
              return true;
            }
          }
        },
        getSomeParam(channelId){
          return new Promise(resolve=>{
            this.$post('/api/channel/teamMemberCommission',{channelId: channelId,partyId:JSON.parse(window.localStorage.userInfo).user.relatedPartyId})
              .then(response=>{
                if(response.success){
                  resolve(response.rows[0]);
                }
              })
          });
        },
        searchAll(){
          this.option1 = '';
          this.name = '';
          this.teamRemember = [];
          this.getRemember({channelName: "",contactPerson: this.name, orderEffectiveDateFrom: "", orderEffectiveDateTo: "",
            parentChannelId: JSON.parse(window.localStorage.userInfo).user.relatedPartyId, userStatus:this.option1});
        },
        checkStatus(item){
          this.demo2 = item;
        },
        goPage(page,item){
          this.$store.commit('passParam',item);
          this.$router.push({name:page});
        },
        getCLBCode(){
            this.$post('/api/clb/common/clbCode',{userStatus: "SYS.USER_STATUS", "cities": "PUB.CITY", "provinces": "PUB.PROVICE"})
              .then(response=>{
              this.$vux.loading.hide();
              if(response){
                this.options1 = [];
                JSON.parse(response).userStatus.forEach(value=>{
                  value.key = value.value;
                  value.value = value.meaning+"";
                  this.options1.push(value);
                });
                this.options1.unshift({key:'all',value:'帐号状态'});
                for(let i of JSON.parse(response).provinces){
                  let example={};
                  example.name=i.meaning;
                  example.value=i.value;
                  example.codeValueId=i.codeValueId;
                  this.addressData.push(example);
                }
                for(let a of JSON.parse(response).cities){
                  let example={};
                  example.name=a.meaning;
                  example.value=a.value;
                  example.parent=a.parentValue;
                  example.codeValueId=a.codeValueId;
                  this.addressData.push(example);
                }
              }
            })
        },
        getRemember(param){
          return new Promise(resolve=>{
            let _this = this;
            _this.$vux.loading.show({text:'loading'});
            _this.$post('/api/channel/team',param).then(response=>{
              _this.$vux.loading.hide();
              if(response.success){
                response.rows.forEach((value,index)=>{
                  _this.getSomeParam(value.channelId).then(data=>{
                    value.rate1 =  data.rate1?data.rate1*100+'%':'0%';
                    value.rate2 =  data.rate2?data.rate2*100+'%':'0%';
                    value.rate3 =  data.rate3?data.rate3*100+'%':'0%';
                    value.rate4 =  data.rate4?data.rate4*100+'%':'0%';
                    value.rate5 =  data.rate5?data.rate5*100+'%':'0%';
                    value.rate6 =  data.rate6?data.rate6*100+'%':'0%';
                    value.rate7 =  data.rate7?data.rate7*100+'%':'0%';
                    value.rate8 =  data.rate8?data.rate8*100+'%':'0%';
                    value.rate9 =  data.rate9?data.rate9*100+'%':'0%';
                    value.rate10 = data.rate10?data.rate10*100+'%':'0%';
                    _this.teamRemember.push(value);
                  },function(){
                    _this.teamRemember.push(value);
                  });
                });
              }
              resolve(response.success);
            });
          });
        },
        getCurrentDate(){
          let date = new Date(),
            year = date.getFullYear(),
            month = date.getMonth()<10?'0'+date.getMonth():date.getMonth(),
            day = date.getDate()<10?'0'+date.getDate():date.getDate();
          return year+'-'+month+'-'+day;
        },
        createMember(){
          let _this = this,
            param = {
              channelName: _this.postParam.channelName,
              channelSource: "FRONT",
              channelTypeCode: "PERSONAL",
              chineseName:_this.postParam.channelName,
              city:_this.postParam.address[1],
              commission: null,
              contactPerson:_this.postParam.channelName,
              contactPhone: _this.postParam.phoneCode,
              contractEndDate: "2099-12-30 00:00:00",
              contractStartDate: _this.getCurrentDate() + " 00:00:00",
              email: _this.postParam.email,
              exhibitionMode:'USD',
              parentChannelId: JSON.parse(window.localStorage.userInfo).user.relatedPartyId,
              phoneCode: "+"+_this.optionPhone,
              province: _this.postParam.address[0],
              rate1:_this.postParam.amountPercent1?parseInt(_this.postParam.amountPercent1):0,
              rate2:_this.postParam.amountPercent2?parseInt(_this.postParam.amountPercent2):0,
              rate3:_this.postParam.amountPercent3?parseInt(_this.postParam.amountPercent3):0,
              rate4:_this.postParam.amountPercent4?parseInt(_this.postParam.amountPercent4):0,
              rate5:_this.postParam.amountPercent5?parseInt(_this.postParam.amountPercent5):0,
              rate6:_this.postParam.amountPercent6?parseInt(_this.postParam.amountPercent6):0,
              rate7:_this.postParam.amountPercent7?parseInt(_this.postParam.amountPercent7):0,
              rate8:_this.postParam.amountPercent8?parseInt(_this.postParam.amountPercent8):0,
              rate9:_this.postParam.amountPercent9?parseInt(_this.postParam.amountPercent9):0,
              rate10:_this.postParam.amountPercent10?parseInt(_this.postParam.amountPercent10):0,
              rateDate:0,
              statusCode: "REGISTED",
              user: {
                email: _this.postParam.email,
                userName: _this.postParam.userName,
                password: _this.postParam.originPassword,
                phone: _this.postParam.phoneCode,
                phoneCode: _this.optionPhone,
                planQuota: _this.postParam.planLimit,
                status: "INACTIVE",
                userType: "CHANNEL"
              }
            },
            url = '/api/user/addChannelUser';
          if(!_this.checkData(_this.postParam.phoneCode,'phone')||!_this.checkData(_this.postParam.email,'email')){
              return;
          }
          _this.$post(url, param).then(response=> {
            if (response.success) {
              _this.$vux.toast.show('新建成功','center');
              this.$router.push('myTeam');
              _this.demo2 = '团队成员';
              this.getRemember({parentChannelId:JSON.parse(window.localStorage.userInfo).user.relatedPartyId,orderBy:[]}).then(response=>{
                this.getCLBCode();
              });
            } else {
              _this.$vux.toast.show(response.message, 'center');
              setTimeout(function(){
                _this.$vux.toast.hide();
              },1000);
            }
          })
        }
      },
      data () {
        return {
          index:0,
          demo2:'团队成员',
          tabList:['团队成员','新建成员'],
          option1:'',
          options1:[],
          openId:'',
          place:'请输入11位手机号',
          postParam:{
            originPassword:'123456',
            channelName:'',
            amountPercent1:0,
            amountPercent2:0,
            amountPercent3:0,
            amountPercent4:0,
            amountPercent5:0,
            amountPercent6:0,
            amountPercent7:0,
            amountPercent8:0,
            amountPercent9:0,
            amountPercent10:0,
            phoneCode:'',
            email:'',
            userName:'',
            planLimit:'20',
            inputAge:'',
            dateStart:'',
            dateEnd:'',
            address:[]
          },
          optionPhone:[{key:'86',value:'86(大陆)'}][0].key,
          title1:'',
          title:'',
          optionsCode:[{key:'86',value:'86(大陆)'},{key:'00852',value:'852(香港)'},{key:'00853',value:'853(澳门)'},{key:'00886',value:'886(台湾)'}],
          addressData: [],
          teamRemember:[],
          name:'',
          optionsPhone:[]
        }
      }
    }
</script>

<style lang="scss">
  .weui-cells_radio{
    width:100%;
    p{
      margin:0.5em;
    }
  }
  .dp-container{
    display: block;
  }
  .myTeam{
    width:100%;
    div{
      display: inline-block;
    }
    .tab{
      width:100%;
      .vux-tab{
        box-shadow: 0 1px 3px gainsboro;
        position: fixed;
        width: 100%;
        z-index: 11;
        top:0;
      .vux-tab-item{
        width:50%;
        display: inline-block;
      }
      }
      .vux-slider{
        width: 100%;
        min-height: calc(100vh - 10px);
        margin-top: 40px;
        padding-bottom: 40px;
      }
      .vux-slider > .vux-swiper{
        overflow: visible;
      }
      .tab-swiper{
        width: 100%;
        padding: 15px;
        box-sizing: border-box;
      }
      .teamRemember {
        padding:0 10px 9px;
        width:100%;
        box-sizing:border-box;
        .information1 {
          /*width: calc(100vw - 30px);*/
          display: flex;
          align-items: center;
          line-height: 50px;
          margin-top: 50px;
          margin-bottom: 10px;
          .weui-cells {
            vertical-align: middle;
            margin-top: 0;
            width: 25vw;
            &:before{
              border-top:none;
             }
             &:after{
              border-bottom:none;
              }
          }
          .weui-cell {
            padding: 12px 0 13px;
            width: 100%;
            box-sizing: border-box;
            text-align: center;
            font-size: 1.4rem;
            .weui-cell__hd, .vux-cell-bd {
              display: none !important;
            }
          }
          input {
            padding: 14px 10px 13px;
            width: 75%;
            margin-left: 10px;
            box-sizing: border-box;
            outline: none;
            border: none;
            font-size: 1.4rem;
            border-radius: 0;
          }
          .searchAll{
            width: 20%;
            text-align: center;
            font-size: 1.5rem;
            color: #E6A914;
          }
          .vux-cell-bd {

          }
        }
      }
    .newRemember {
      width: 100vw;
      /* margin-left: -15px; */
      background: white;
      margin-top: 50px;
      .information {
        position: relative;
        margin-left: 15px;
        border-bottom: 1px solid rgba(233, 233, 233, 0.8);
        display: flex;
        align-items: center;
        padding: 10px 12px 10px 0;
        box-sizing: border-box;
        font-size: 1.4rem;

        .label {
          width: 45%;
          .requireClass{
            color:red;
          }
        }

      .input {
        border: none;
        outline: none;
        line-height: 30px;
        width: 73%;
        text-align: right;
        font-size: 1.3rem;
        padding: 0;
        padding-top: -1px;
        color: #999;
        /*padding-right: 15px;*/
        &::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
           color: #999;
         }
      }
      .weui-cells{
        width: calc(100vw - 21px);
        box-sizing: border-box;
        margin-top: 0;
        font-size: 1.4rem;
        line-height: 24px;
        &:before{
           border-top: none;
         }
        &:after{
           border-bottom: none;
         }
      }
      .weui-cell{
        width: 100%;
        padding: 0;
        margin-left: 7px;
        &:before{
           border:none;
         }
        &:after{
          border:none;
        }
        .weui-cell__hd{
          display: none;
        }
      }
      .weui-cell_access .weui-cell__ft {
        padding-right: 25px;
        position: relative;
        text-align: right;
        display: block;
      }
      .vux-label{
        font-size: 1.4rem;
        color: #333;
      }
      .weui-cell{
        padding-left: 0;
        text-align: left;
      }
      p{
        margin:0;
      }
      .vux-label{
        color: #333;
      }
      .weui-cell_access .weui-cell__ft{
      &:after{
         height: 10px;
         width:10px;
         margin-top: -7px;
         right:15px;
       }
      }
      }
      .weui-cell {
        text-decoration: none;
        width: 100%;
        display: inline-block;
        text-align: right;
        padding: 0;
        font-size: 1.4rem;
        &:nth-child(1){
           line-height: 10px;
         }
        &:nth-child(n+1){
           line-height: 0;
         }
      }
      .inputRow {
        height: 40px;
        width: calc(100% - 15px);
        margin-left: 15px;
        position: relative;
        line-height: 40px;
        display: -ms-flexbox;
        display: inline-block;
        vertical-align: middle;
        -ms-flex-align: center;
        padding: 5px 0;
        border-bottom: 1px solid rgba(233, 233, 233, 0.8);

      .label {
        width: 45%;
        display: inline-block;
        font-size: 1.4rem;
        .requireClass{
          color:red
        }
      }

      .weui-cells {
        width: calc(75% - 15px);
        display: inline-block;
        position: absolute;
        top: 10px;
        height: 30px;
        left: 26%;
        vertical-align: middle;
        /*line-height: 40px;*/
        margin: 0;
        &:after{
          border-bottom: none;
         }
         &:before{
            border-top:none;
          }
        div {
          width: 100%;
        }
      }
      .vux-cell-box:before {
        border-top: none;
      }

      .vux-popup-picker-select {
        width: 100%;
        position: relative;
        color: #999;
        /*padding-right: 10px;*/
        box-sizing: border-box;
        font-size: 1.3rem;
        text-align: right !important;
      }

      .weui-cell_access .weui-cell__ft {
        /* padding-right: 13px; */
        position: relative;
        /*text-align: left;*/
      }

      .weui-cell_access .weui-cell__ft:after {
        display: none;
      }
      }
      }
      .footer{
        width: 90vw;
        margin-left: 5vw;
        text-align: center;
        line-height: 45px;
        color: #fff;
        border-radius: 5px;
        margin-top: 30px;
        margin-bottom: 30px;

      }
      .cardList{
        width: 100%;
        background: white;
        padding: 15px 10px;
        box-shadow: 0 3px 3px 1px gainsboro;
        box-sizing: border-box;
        margin-bottom:10px;
        span{
          display: block;
          font-size: 1.5rem;
          line-height: 25px;
          &:nth-child(1){
             font-size: 1.8rem;
          }
        }
      }
    }
  }
</style>

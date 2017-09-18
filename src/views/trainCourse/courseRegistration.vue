<template>
  <div class="courseRegistration">
    <div class="header">
      <span>{{courseInfo.topic}}</span>
      <span>费用:{{courseInfo.price}}</span>
    </div>
    <div v-if="!isCourseInfo" style="margin-top: 90px;">
      <div class="content" v-for="student in courseInfo.students">
        <div class="information">
          <div class="label">
            <span>姓名</span>
          </div>
          <span class="input">{{student.name}}</span>
        </div>
        <div class="information">
          <div class="label">
            <span>电话</span>
          </div>
          <span class="input">{{student.phoneNumber}}</span>
        </div>
        <div class="information">
          <div class="label">
            <span>邮箱</span>
          </div>
          <span class="input">{{student.mailAddress}}</span>
        </div>
        <div class="information">
          <div class="label">
            <span>公司</span>
          </div>
          <span class="input">{{student.company}}</span>
        </div>
        <div class="information">
          <div class="label">
            <span>职位</span>
          </div>
          <span class="input">{{student.position}}</span>
        </div>
        <div class="information">
          <div class="label">
            <span>参与方式</span>
          </div>
          <span class="input">{{student.joinMethod==='1'?'线上':'线下'}}</span>
        </div>
      </div>
    </div>
    <div v-if="isCourseInfo" style="margin-top: 90px;">
      <div class="content" v-if="isDefault">
        <div class="close">
          <img :src="closeIcon" alt="" @click="deleteRemember(-1)">
        </div>
        <div class="information">
          <div class="label">
            <span>姓名</span>
          </div>
          <span class="input">{{remember.name}}</span>
        </div>
        <div class="information">
          <div class="label">
            <span>电话</span>
          </div>
          <span class="input">{{remember.phoneNumber}}</span>
        </div>
        <div class="information">
          <div class="label">
            <span>邮箱</span>
          </div>
          <input type="email" placeholder="请输入" v-model="remember.mailAddress" class="input">
        </div>
        <div class="information">
          <div class="label">
            <span>公司</span>
          </div>
          <input type="text" placeholder="请输入" v-model="remember.company" class="input">
        </div>
        <div class="information">
          <div class="label">
            <span>职位</span>
          </div>
          <input type="text" placeholder="请输入" v-model="remember.position" class="input">
        </div>
        <div class="information">
          <group>
            <popup-radio title="参与方式" :options="joinMethods" placeholder="请选择" v-model="remember.joinMethod"></popup-radio>
          </group>
        </div>
      </div>
      <div class="content" v-if="remember1.length>0" v-for="(re,index) in remember1">
        <div class="close">
          <img :src="closeIcon" alt="" @click="deleteRemember(index)">
        </div>
        <div class="information">
          <div class="label">
            <span>姓名</span>
          </div>
          <input type="text" placeholder="请输入" v-model="re.name" class="input">
        </div>
        <div class="information">
          <group>
            <popup-radio title="电话区号" :options="phoneCodeList" v-model="re.phoneCode"></popup-radio>
          </group>
        </div>
        <div class="information">
          <div class="label">
            <span>电话</span>
          </div>
          <input type="number" placeholder="请输入" v-model="re.phoneNumber" class="input">
        </div>
        <div class="information">
          <div class="label">
            <span>邮箱</span>
          </div>
          <input type="email" placeholder="请输入" v-model="re.mailAddress" class="input">
        </div>
        <div class="information">
          <div class="label">
            <span>公司</span>
          </div>
          <input type="text" placeholder="请输入" v-model="re.company" class="input">
        </div>
        <div class="information">
          <div class="label">
            <span>职位</span>
          </div>
          <input type="text" placeholder="请输入" v-model="re.position" class="input">
        </div>
        <div class="information">
          <group>
            <popup-radio title="参与方式" :options="joinMethods" placeholder="请选择" v-model="re.joinMethod"></popup-radio>
          </group>
        </div>
      </div>
    </div>
    <div class="confirm">
      <confirm v-model="show"
               :title="title"
               @on-cancel="onCancel"
               @on-confirm="onConfirm">
        <p style="text-align:center;">{{content}}</p>
      </confirm>
    </div>
    <div class="footer" v-if="isCourseInfo">
      <div class="button" @click="addRemember()">添加报名学员</div>
      <div class="button" @click="ensureRegistration()">确认报名</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    import {Group,Cell,PopupRadio,Confirm} from 'vux';
    export default {
      components:{
        Group,Cell,PopupRadio,Confirm
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
      };

      setTimeout(function(){
        document.setTitle('课程报名');
      }, 1);
    },
      mounted(){
        if(this.$route.query.type==='detail'){
          this.isCourseInfo =false;
        }
        this.getCourseInfo(this.$route.query.courseId);
      },
      methods: {
        onCancel(){
          this.show = false;
        },
        checkFormat(array){
          let press = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
            status = false;
          array.forEach((value,index)=>{
            if(!press.test(value.mailAddress)) {
              this.$vux.toast.show({text:'请检查邮箱格式'});
              status =  false;
            }else if(value.phoneCode ==='86'&&value.phoneNumber.length==11){
                status = true;
              }else if(value.phoneCode ==='00852'&&value.phoneNumber.length==8){
                status =  true;
              }else if(value.phoneCode==='00853'&&value.phoneNumber.length==8){
                status =  true;
              }else if(value.phoneCode ==='00886'&&value.phoneNumber.length==9){
                status =  true;
              }else{
                this.$vux.toast.show({text:'请检查手机号码的格式'});
                status = false;
              }
            for(let key1 in value){
              if(!value[key1]){
                this.$vux.toast.show({text:'请完善信息'});
                status = false;
              }
            }
            console.log('status'+status);
            if(!status){
              return status;
            }else if(index ===(array.length-1)){
              return status;
            }
          });
          return status;
        },
        ensureRegistration(){
          let url = '/api/student/enroll',
            _this = this,
            param = [];
          if(_this.isDefault){
            param.unshift(_this.remember);
            if(_this.remember1.length>0){
              param = param.concat(_this.remember1);
            }
          }else{
            param = param.concat(_this.remember1);
          }
          if(_this.checkFormat(param)){
            console.log('true'+_this.checkFormat(param));
          }else{
            console.log('false'+_this.checkFormat(param));
            return ;
          }
          _this.$post(url,param).then(response=>{
            if(response){
              _this.code = response.code;
              if(response.code ==='0'){
                _this.$vux.toast.show({text:'报名成功'});
                _this.$router.go(-1);
              }
              if(response.code ==='-1'){
                _this.responseInfo = response.rows;
                _this.show = true;
              }
            }
          });
        },
        getCourseInfo(value){
          let _this = this,
            param = {
              courseId:value
            },
            url = '/api/course/list';
          _this.$post(url,param).then(response=>{
            _this.courseInfo = response.rows[0];
            _this.checkJoinMethod(response.rows[0].trainingMethod);
          });
        },
        onConfirm(){
          let amount = this.courseInfo.price*this.responseInfo.length,
            sourceId = '';
          this.responseInfo.forEach((value,index)=>{
            sourceId += value.lineId+',';
          });
          let param = {
            amount: amount,
            orderContent: "课程报名",
            orderSubject: this.courseInfo.topic,
            sourceId: sourceId.substr(0,sourceId.length-1),
            sourceType: "COURSE"
          };
          this.$router.push({name:'onlinePayment',query:{payInfo:param,style:'courseRegistration'}});
        },
        addRemember:function(){
          let _this = this,
            rememberInfo = {
              belongTo:'FOREIGN',
              company:'',
              channelId:JSON.parse(window.localStorage.userInfo).user.relatedPartyId,
              courseId:_this.$route.query.courseId,
              mailAddress:'',
              name:'',
              phoneCode:[{key:'86',value:'86'}][0].value,
              phoneNumber: "",
              position: "",
              joinMethod:_this.joinMethod1
            };
          _this.remember1.push(rememberInfo);
        },
        checkJoinMethod(method){
          if(method==='ALLLINE'){
            this.joinMethods = [{key:1,value:'线上'},{key:2,value:'线下'}];
            this.joinMethod1 = '';
          }else if(method ==='ONLINE'){
            this.joinMethods = [{key:1,value:'线上'}];
            this.joinMethod1 = [{key:1,value:'线上'}][0].key;
            this.remember.joinMethod = [{key:1,value:'线上'}][0].key;
          }else{
            this.joinMethods = [{key:2,value:'线下'}];
            this.joinMethod1 = [{key:2,value:'线下'}][0].key;
            this.remember.joinMethod = [{key:2,value:'线下'}][0].key;

          }
        },
        deleteRemember:function(index){
          let _this = this;
          if(index ===-1){
            _this.isDefault = false;
          }
          _this.$delete( _this.remember1,index);
        }
      },
      data () {
        return {
          title:'小财提醒',
          code:'',
          show:false,
          content:'确认支付吗?',
          inputAge:'',
          isCourseInfo:true,
          courseInfo:{},
          joinMethods:[],
          joinMethod1:'',
          isDefault:true,
          closeIcon:require('../../assets/img/icon_close@3x.png'),
          remember1:[],
          responseInfo:{},
          remember: {
              belongTo:'COMPANY',
              channelId:JSON.parse(window.localStorage.userInfo).user.relatedPartyId,
              company:'',
              courseId:this.$route.query.courseId,
              mailAddress:JSON.parse(window.localStorage.userInfo).user.email?JSON.parse(window.localStorage.userInfo).user.email:'',
              name:JSON.parse(window.localStorage.userInfo).user.userName,
              phoneNumber:JSON.parse(window.localStorage.userInfo).user.phone,
              phoneCode:JSON.parse(window.localStorage.userInfo).user.phoneCode,
              position:'',
              joinMethod:''
            },
          phoneCodeList:[{key:'86',value:'86'},{key:'00852',value:'852'},{key:'00853',value:'853'},{key:'00886',value:'886'}]
        }
      }
    }
</script>

<style lang="scss">
  /*@import "../../assets/css/common.scss";*/
  .weui-cells_radio{
    width:100%;
  p{
    margin:0.5em;
  }
  }
  .courseRegistration{
    width:100%;
    margin-bottom:60px;
    background:#f4f4f4;
    .header{
      width: 100%;
      padding: 5px 0 5px 15px;
      background: white;
      box-shadow: 0 3px 1px gainsboro;
      box-sizing: border-box;
      position:fixed;
      z-index:20;
      top:0;
      span{
        display: block;
        font-size: 1.8rem;
        line-height: 30px;
        color: #333;
      }
    }
    .content{
      width: 100%;
      background: white;
      margin-top: 20px;
      .close{
        width: 100%;
        line-height: 45px;
        padding-right: 10px;
        text-align: right;
        box-sizing: border-box;
        img{
          width: 15px;
          display: inline;
          vertical-align: middle;
        }
      }
      .information {
        position: relative;
        margin-left: 15px;
        border-top: 1px solid rgba(233, 233, 233, 0.8);
        display: flex;
        align-items: center;
        padding: 10px 5px 10px 0;
        box-sizing: border-box;
        font-size: 1.4rem;
        .label {
          width: 25%;
        }
        .input {
          border: none;
          outline: none;
          line-height: 30px;
          width: 73%;
          text-align: right;
          font-size: 1.4rem;
          padding: 0;
          padding-top: -1px;
          color: #999;
          /*padding-right: 15px;*/
        }
  .weui-cells{
    width: calc(100vw - 15px);
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
  .vux-label{
    font-size: 1.4rem;
    color: #333;
  }
  .weui-cell{
    padding: 3px 15px 3px 0;
  }
  p{
    margin:0;
  }
  .weui-cell_access .weui-cell__ft{
  &:after{
     height: 10px;
     width:10px;
     margin-top: -7px;
   }
  }
      }
    }
    .footer{
      width: 100%;
      position: fixed;
      background: white;
      bottom: 0;
      box-sizing: border-box;
      padding: 5px 0;
      text-align:center;
      .button{
        width: 40%;
        text-align: center;
        border: 1px solid #E6A914;
        line-height: 40px;
        border-radius: 5px;
        color: #E6A914;
        margin: 0 2%;
        display: inline-block;
      }
    }
  }
</style>

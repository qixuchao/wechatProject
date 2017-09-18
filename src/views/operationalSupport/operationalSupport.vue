<template>
<div class="support" v-if="openId">

  <divider>业务支援</divider>
  <div class="header_down">APPLICATION  PROCEDURE</div>
 <!-- 顶部表示支援首页-->
  <div class="process" >
    <div class="process_detail" v-for="(item,index) in processList">
      <img :src="item.icon"  class="img"  />
      <div class="processTitle"><span class="title_left">{{item.id}}</span><span>{{item.title}}</span></div>
      <div class="next">{{item.next}}</div>
      </div>
  </div>
  <!-- 底下跳转内容-->
  <div class="rules" @click="goRule">查看支援服务收费规则>></div>

  <div class="apply" v-for="(item,index) in applyList">
    <div class="applyDetail" @click="go(item.path)">
      <img :src="item.icon" :class="{applyImg1:index===0,applyImg:index!==0}" />
      <div :class="{applyTitle1:index===0,applyTitle:index!==0}">{{item.title}}</div>
      <div class="applyRight">
        <div class="applyMiddle">{{item.detail1}}</div>
        <div class="applyMiddle">{{item.detail2}}</div>
      </div>

    </div>
  </div>

<!--左边业务悬浮框-->
  <div class="label">
    <div class="circle" style="background: #44cffe" @click="goPage('/treasureCourse')">
      <span>培训课程</span>
    </div>
    <div class="circle" style="background: #ffce1b" @click="goPage('/operationalSupport')">
      <span>业务支援</span>
    </div>
    <div class="circle" style="background: #ff6868" @click="goPage('/mineCourse')">
      <span>我的课程</span>
    </div>
  </div>


</div>
</template>

<script type="text/ecmascript-6">
  import {Divider} from 'vux';
  export default {
    components:{
      Divider
    },
    data(){
    return{
      openId:window.localStorage.wechatOpenid ===window.localStorage.openid,
      processList:[{
        id:"①",
        icon:require("../../assets/support/icon_upload.png"),
        title:'提前五个工作日提交',

      },{
      id:"②",
        icon:require("../../assets/support/icon_chat.png"),
        title:'细节沟通安排讲师',
        next:'>>'
    },{
      id:"③",
        icon:require("../../assets/support/icon_applySuccess.png"),
        title:'申请通过',
        next:'>>'
    },{
      id:"④",
        icon:require("../../assets/support/icon_sendTeacher.png"),
        title:'派遣讲师',
        next:'>>'

    }],
      applyList:[{
        icon:require("../../assets/support/icon_train.png"),
        title:'培训支援申请',
        detail1:'新人系列培训、产品系列培训、销售系列培训、理财师养成培训、国际认证培训',
        detail2:'给您团队系统培训知识，Step By Step 协助您打造全球资产配置卓越团队，零起点到专业人士的成长之路。',
        path:'/trainApply'
      },{
        icon:require("../../assets/support/icon_cost.png"),
        title:'会销支援申请',
        detail1:'会销指南下载、讲师现场分享、专业知识传递',
        detail2:'提供会销指南，并有具足专业性和感染力的专业讲师，协助您完成一场收获影响力和业绩的会销活动。',
        path:'/willpinApply'
      },{
        icon:require("../../assets/support/icon_guest.png"),
        title:'会客支援申请',
        detail1:'抓住客户需求、解决客户疑惑、成交尽在掌握',
        detail2:'全球资产配置的私人银行家、顶级理财师、专业产品经理，协助您为您的客户完成最全面的配置。',
        path:'/receiveApply'
      }],


    }
  },
    beforeCreate(){
      this.openId = '';
    },
  created(){
    if(window.localStorage.wechatOpenid !==window.localStorage.openid){
    }else {
      document.setTitle = function (t) {
        document.title = t;
        var i = document.createElement('iframe');
        i.src = '//m.baidu.com/favicon.ico';
        i.style.display = 'none';
        i.onload = function () {
          setTimeout(function () {
            i.remove();
          }, 9)
        }
        document.body.appendChild(i);
      }
      setTimeout(function () {
        document.setTitle('业务支援');
      }, 1);
      var vm = this;
      vm.openId = window.localStorage.wechatOpenid;
    }
  },
  methods:{
    goPage(page){
      var vm=this;
      vm.$router.push({path:page});
    },
    go(path){
      var vm=this;
      vm.$router.push({path:path});
    },
    goRule(){
      var vm=this;
      vm.$router.push({path:'/rule'});
    }
  }
  }
</script>

<style lang="less">
  * {
    /*touch-action: none;*/
    padding: 0px;
    margin:0px;
  }
.support{
    width:100%;
    min-height:100%;
    background-color:white;
    position:absolute;

  .vux-divider{
    font-size: 1.6rem;
    color: #333;
    padding: 10px 0 0 0;
  }
  .vux-divider:before{
    background-size: 55% 5px;
    background-image: linear-gradient(to left, #E6A914, #fff);
  }
  .vux-divider:after{
    background-size: 55% 5px;
    background-image: linear-gradient(to right, #E6A914, #fff);
  }
  .weui-cells{
    width: 60vw;
    margin-left: 20vw;
    margin-top:0;
  }
  .weui-cells:before{
    border-top:none;
  }
  .weui-cells:after{
    border-bottom:none;
  }
  .weui-cell:before{
    border-top:none;
  }
  .weui-cell:before{
    border-bottom:none;
  }
  .weui-cell{
    padding:0;
  }
  .vux-cell-primary{
    width: 30%;
    flex: inherit;
  }
  p{
    -webkit-margin-before: 0.5em;
    -webkit-margin-after: 0.5em;
  }
  .vux-label {
    display: block;
    word-wrap: break-word;
    word-break: break-all;
    text-align: justify;
    text-align-last: justify;
    color: #999;
  }
  .weui-cell__ft {
    text-align: right;
    color: #999999;
    width: 75%;
  }
  .header{
    margin-top: 2rem;
    text-align: center;
    font-size: 1.7rem;
    line-height: 2;
    letter-spacing: 2px;
  }
  .header_down{
    text-align: center;
    font-size: 1.3rem;
    color: #999999;
  }
  .process{
    width:100%;
    display: flex;
    display: -webkit-flex;
  }
  .process_detail{
    /*display: flex;*/
    /*display: -webkit-flex;*/
    width: 25%;
    margin-top: 2rem;
  }
  .img{
    width: 3rem;
    height: 3rem;
    margin-left: 2.5rem
  }
  .img1{
    width: 1rem;
    height: 1rem;
  }
  .title_left{
    color:#FADCB3;
    display: inline-block;
    font-size: 1.4rem;
  }
  .processTitle{
    font-size: 1rem;
    white-space: normal;
    margin-top:0.5rem;
    margin-left: 1rem;
    position: absolute;
    width: 17%;
    line-height:1;

  }
  .next{
    position: absolute;
    margin-left: -1.5rem;
    margin-top: -0.5rem;
    color: gray;
    font-size: 1.3rem;

  }
  .rules{
    color:#4AA4C6;
    font-size: 1.3rem;
    position:relative ;
    margin-top: 5rem;
    width: 50%;
    margin-left: 50%;
    text-align: center;
  }
  .apply{
    width: 100%;
  }
  .applyDetail{
    display: flex;
    display: -webkit-flex;
    margin: 1rem;
    border: dashed 1px #A8A8A8;
    min-height: 10rem;
  }
  .applyImg1{
    display: inline-block;
    position: absolute;
    width: 4rem;
    height: 4rem;
    margin-left: 10%;
    margin-top: 14%;
  }
  .applyImg{
    display: inline-block;
    position: absolute;
    width: 4rem;
    height: 4rem;
    margin-left: 10%;
    margin-top: 10%;
  }
  .applyTitle1{
    display: inline-block;
    font-size: 1.3rem;
    margin-top: 26%;
    margin-left: 1.7rem;
    width: 30%;
    vertical-align: middle;
  }
  .applyTitle{
    display: inline-block;
    font-size: 1.3rem;
    margin-top: 22%;
    margin-left: 1.7rem;
    width: 30%;
    vertical-align: middle;
  }
  .applyMiddle{
    display: block;
    margin-top: 10px;
    margin-left: 10px;
    line-height: 1.5;
    margin-right: 10px;
  }
  .applyRight{
    display: inline-block;
    width: 70%;
  }
  .label {
    position: fixed;
    height: auto;
    bottom: 50px;
    text-align: center;
    margin-left:20px;
    .circle {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      margin-top: 20px;
      padding: 5px;
      opacity: 0.9;
      line-height:18px;
      display:flex;
      align-items:center;
      span {
        font-size: 14px;
        letter-spacing: 2px;
        color: white;
        padding-left: 2px;
      }
    }
  }
}
</style>

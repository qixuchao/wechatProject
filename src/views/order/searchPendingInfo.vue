<template>
  <div class="searchPendingInfo">
    <div class="header" @click="showPending()" v-if="pendingList.length>0">
      <img :src="dot" class="ah-time-dot" >
      <span class="title">{{pendingList[length1-1].userName}}</span>
      <span class="content">{{pendingList[length1-1].followDate}}</span>
      <span class="content">{{pendingList[length1-1].content}}</span>
      <img :src="rightIcon" >
    </div>
    <div class="pendingInfo">
      <div class="title">{{list.reserveSupplierName}}</div>
      <span>pending 编号:&nbsp;{{list.pendingNumber}}</span>
      <span>渠道:&nbsp;{{list.channelName}}</span>
      <span>pending 类型:&nbsp;{{list.applyClassDesc}}</span>
      <span>pending 项目:&nbsp;{{list.applyItem}}</span>
      <span>处理截止日期:&nbsp;{{list.dealEndDate}}</span>
      <span>最后更新时间:&nbsp;{{list.lud}}</span>
      <span>状态:&nbsp;{{list.statusDesc}}</span>
      <span style="border-bottom: solid 1px #D9D9D9">处理人:&nbsp;{{list.cbName}}</span>
      <!--<span>附件上传</span>-->

      <!--<div class="file" v-for="(item,index) in fileList">-->
      <!--<div class="left">{{item.name}}</div>-->
      <!--<img :src="close" class="close" @click="deleteFile(index)"/>-->
      <!--</div>-->

      <!--<div class="btn">修改并保存</div>-->

    </div>


    <div class="pending" v-if="show">
      <div class="pendingTitle">pending进度</div>
      <timeline>
        <timeline-item v-for="(item, index) in pendingList1" :key="index">
          <div class="node" :class="[index === 0 ? 'recent' : '']">
            <span>{{item.userName}}</span>
            <span>{{item.followDate}}</span>
          </div>
          <p style="margin: 0;color:#888" :class="[index === 0 ? 'recent' : '']">{{item.content}}</p>
        </timeline-item>
      </timeline>
      <div class="footer" @click="showPending()">
        关闭
      </div>
    </div>
    <div class="bgDrag" v-if="show"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Timeline,TimelineItem} from 'vux';
  export default {
    components: {
      Timeline, TimelineItem
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
      document.setTitle('pending详情');
    }, 1);
  },
    data()
  {
    return {
      rightIcon: require('../../assets/course/icon_right@3x.png'),
      dot:require('../../assets/img/pass.png'),
      pendingList: [],
      pendingList1: [],
      show: false,
      close: require("../../assets/img/icon_delete@3x.png"),
      list:{},
      length1:'',
      pendingId:''

    }
  },
  mounted(){
    var  vm=this;
    vm.pendingId=vm.$route.query.pendingId;
    vm.$post('/api/ordPendingFollow/query',{
      "pendingId":vm.pendingId
    }).then(function (response) {
      vm.pendingList=response.rows;
      vm.length1=vm.pendingList.length;
      vm.pendingList1=[];
      for(let i=vm.length1-1;i>=0;i--){
        vm.pendingList1.push(vm.pendingList[i]);
      }
    },function(response){

      console.log('接口出错了');
    })
    vm.$post('/api/ordPending/query',{
      "pendingId":vm.pendingId
    }).then(function(response){
      vm.list=response.rows[0];
    },function(response){
      console.log('接口出错了');

    })

  },
  methods: {
    showPending: function () {
      this.show = !this.show;
    },


  },

  }
</script>

<style lang="scss">
  * {
    padding: 0px;
    margin:0px;
  }
  .searchPendingInfo {
    width: 100%;

  .header {
    position: relative;
    width: 100%;
    background: white;
    padding: 0 15px 15px 20px;
    box-sizing: border-box;
    box-shadow: 0 2px 2px 1px grey;

  .ah-time-dot {
    position: absolute;
    top: 12px;
    left: 10px;
    width: 16px;
  }

  .title {
    display: block;
    line-height: 40px;
    font-size: 1.7rem;
    padding-left: 15px;

  &
  :before {
    content: '';
    position: absolute;
    height: 7px;
    width: 7px;
    background: green;
    border-radius: 50%;
    margin-top: 17px;
    margin-left: -15px;
  }

  }
  .content {
    display: block;
    font-size: 1.5rem;
    line-height: 25px;
    color: #666;
  }

  img {
    height: 15px;
    position: absolute;
    right: 15px;
    top: calc(50% - 8px);
  }

  }
  .pendingInfo {
    padding: 15px;
    background: white;
    width: 100%;
    box-sizing: border-box;

  .title {
    line-height: 30px;
    border-left: 4px solid bisque;
    padding-left: 10px;
    font-size: 1.6rem;
    margin-bottom: 5px;
  }

  span {
    display: block;
    line-height: 25px;
    font-size: 1.5rem;
    color: #333;
  }

  }
  .img-inputer {
    position: relative;
    display: inline-block;
    width: 20%;
    height: 2rem;
    border-radius: 0px;
    background: white;
    box-shadow: none;
    transition: none;
  }

  .img-inputer__label {
    position: absolute;
    top: 0;
    /*left: 1rem;*/
    bottom: 0;
    right: 0;
    z-index: 10;
    cursor: pointer;
    margin-bottom: 0;
    width: 100%;
  }

  .img-inputer-- {
    position: relative;
    display: inline-block;
    width: 20%;
    height: 2rem;
    border-radius: 0px;
    background: white;
    box-shadow: none;
    transition: none;
    margin-top: 0.5rem;
  }

  .img-inputer:hover {
    -webkit-transform: scale(1.015);
    transform: scale(1.015);
    box-shadow: none;
  }

  .product_btn {
    display: inline-block;
    width: 100%;
    color: #333333;
    height: 3rem;
    border: dotted 1px #999999;
    margin-right: 10px;
    text-align: center;
    line-height: 2;

  i {
    display: none;
  }

  div {
    display: none;
  }

  /*label{*/
  /*display: none;*/
  /*}*/
  img {
    display: none;
  }

  .img-inputer__label:hover ~ .img-inputer__mask {
    display: none;
  }

  .img-inputer__placeholder {
    position: absolute;
    /*margin-left: 1rem;*/
    font-size: 14px;
    width: 100%;
    color: #333333;
    margin-top: -1.6rem;
    text-align: center;
    font-weight: 500;

  }

  }
  .pending {
    width: 100%;
    background: white;
    position: fixed;
    top: 0;
    z-index: 20;

  .pendingTitle {
    line-height: 40px;
    text-align: center;
    width: 100%;
    font-size: 1.7rem;
  }

  .node {
    width: 100%;
    line-height: 30px;
    font-size: 1.7rem;

  span:nth-child(2) {
    float: right;
    color: #666;
  }

  }

  .vux-timeline {
    padding: 0;
    width: 100%;
  }
  .vux-timeline-item{
    margin-left: 5px;
  }


  .vux-timeline-item-content {
    padding: 0 1rem 2.5rem 2.2rem;
    width: calc(100% - 4.2rem);
  }

  .timeline-demo {

  p {
    color: #888;
    font-size: 0.8rem;
  }

  }
  .footer {
    line-height: 45px;
    width: 100%;
    text-align: center;
    font-size: 1.7rem;
    letter-spacing: 1px;
    color: white;
    background: #E6A914;
  }

  }
  .file {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    line-height: 25px;
  }

  .left {
    width: 88%;
    align-items: center;

  }

  .close {
    width: 1.4rem;
    height: 1.4rem;
    position: absolute;
    margin-left: 88%;
    align-items: center;


  }

  .bgDrag {
    position: fixed;
    background: #000;
    z-index: 11;
    opacity: 0.3;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  .textarea{
    background-color: #F4F4F7;
    border:0px;
    width: 100%;
    margin-top: 10px;
    height:5rem;
    padding:5px;

  }
  .btn{
    background-color: #E6A913;
    color: white;
    font-size: 1.4rem;
    letter-spacing: 2px;
    border:0px;
    width: 100%;
    height: 3rem;
    text-align: center;
    line-height: 2.5;
    border-radius: 4px;
    margin-top: 20px;
  }

  }
</style>

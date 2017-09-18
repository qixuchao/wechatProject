<template>
  <div class="courseInfo">
    <div class="header">保诚隽升储蓄保障计划</div>
    <div class="courseDesc">
      <div class="desc">
        <span>课程时间:2017-05-17 10:00 - 12:00</span>
      </div>
      <div class="desc">
        <span>培训方式:线上、线下</span>
      </div>
      <div class="desc">
        <span>培训讲师:Lily</span>
      </div>
      <div class="desc">
        <span>培训地址:深证市罗湖区金龙大厦1802</span>
      </div>
      <div class="desc">
        <span>直播连接:</span>
        <div class="longText">https://www.baidu.com/s?wd=github&rsv_spt=1&rsv_iqid=0x83c86e5c0000bc9e&issp=1&f=8&rsv_bp=0&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_enter=1&rsv_sug3=2&rsv_sug1=2&rsv_sug7=100</div>
      </div>
    </div>
    <div class="getKey">获取视频密码</div>
    <div class="content">
      <div class="title">
        课程简介
      </div>
      <div class="text">1、供货价认购i后诶家of感觉哦是地方根据奥厄普i个佛光街哦啊是否攻破得个破房管局啊个破啊饿地方为坡地日天热啊个脾气啊平日哦</div>
      <div class="text">2、供货价认购i后诶家of感觉哦是地方根据奥厄普i个佛光街哦啊是否攻破得个破房管局啊个破啊饿地方为坡地日天热啊个脾气啊平日哦</div>
      <div class="title">
        讲师简介
      </div>
      <div class="text">供货价认购i后诶家of感觉哦是地方根据奥厄普i个佛光街哦啊是否攻破得个破房管局啊个破啊饿地方为坡地日天热啊个脾气啊平日哦</div>
      <div class="title">
        培训资料
      </div>
      <div class="train">
        <span>保诚隽升储蓄保障计划手册</span>
        <span>查看</span>
      </div>
      <div class="train">
        <span>保诚隽升储蓄保障计划手册</span>
        <span>查看</span>
      </div>
    </div>
    <div class="footer">
        报名
    </div>
  </div>
</template>

<script>
  export default{
    methods:{
      getCourseInfo
    },
    data(){
      return{

      }
    }
  }
</script>
<style lang="scss">
  .courseInfo{
    margin-bottom:55px;
    .header{
      width: 100%;
      background: white;
      line-height: 45px;
      padding-left: 15px;
      font-size: 1.6rem;
      box-sizing: border-box;
      box-shadow: 0 2px 1px #E0DFE3
    }
    .courseDesc{
      width: 100%;
      padding: 10px 0;
      color: #333;
      .desc{
        width:100%;
        line-height: 20px;
        padding-left: 15px;
        box-sizing: border-box;
        display: flex;
        .longText{
          width: 80%;
          word-break: break-all;
          color: #1AB3FA;
        }
      }
    }
    .getKey{
      line-height: 40px;
      width: 50%;
      text-align: center;
      border: 1px solid #E6A914;
      margin: 10px 24% 20px;
      border-radius: 5px;
      font-size: 1.5rem;
      color: #E6A914;
    }
    .content{
      .title{
        width: calc(100% - 15px);
        line-height: 20px;
        margin-left: 15px;
        box-sizing: border-box;
        border-left: 3px solid #E6A914;
        padding-left: 10px;
        font-size: 1.6rem;
        color: #000;
        margin-bottom: 5px;
      }
      .text{
        padding: 0 10px 10px 15px;
        line-height: 20px;
        color: #666;
      }
      .train{
        width: 100%;
        padding-left: 15px;
        padding-right: 25px;
        line-height: 30px;
        box-sizing: border-box;
        position: relative;
        color:#E6A914;
        span:nth-child(2){
          float: right;
          &:after{
             content: '';
             position: absolute;
             height: 10px;
             width: 10px;
             border-top: 1px solid #E6A914;
             border-right: 1px solid #E6A914;
             transform: rotateZ(45deg);
             top: 9px;
             right: 10px;
           }
        }
      }
    }
    .footer{
      width:100%;
      line-height:40px;
      text-align: center;
      font-size: 1.6rem;
      color:white;
      background: #E6A914;
      position: fixed;
      bottom: 0;
    }
  .footer1{
    width:100%;
    line-height:40px;
    text-align: center;
    font-size: 1.6rem;
    color:white;
    background: gainsboro;
    position: fixed;
    bottom: 0;
    pointer-events:none ;
  }
  }
</style>

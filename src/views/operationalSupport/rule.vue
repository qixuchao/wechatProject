<template>
  <div class="rule">
    <div class="header">财课堂支援收费标准</div>
    <div class="title" v-for="item in titleList">
      <div class="title_1">{{item.title}}</div>
      <div class="title_1">{{item.value}}</div>
    </div>
    <div class="title_2">四、住宿费标准</div>
    <table class="title_3">
      <tr>
        <th>一类城市</th>
        <th>二类城市</th>
        <th>三类城市</th>
      </tr>
      <tr>
        <td>500元/天</td>
        <td>400元/天</td>
        <td>300元/天</td>
      </tr>
    </table>
    <div class="title_2">附：出差城市分类</div>
    <table class="title_3">
      <tr>
        <th>一类城市</th>
        <th>二类城市</th>
        <th>三类城市</th>
      </tr>
      <tr>
        <td>北京、上海、青岛、广州、深圳、杭州</td>
        <td>天津、成都、西安、济南、南京、武汉、昆明、长沙、大连、厦门、福州、无锡、苏州、常州、东莞、温州、台州</td>
        <td>沈阳、石家庄、郑州、烟台、南宁、唐山、重庆、太原、长春、哈尔滨、珠海、泉州、汕头、合肥、徐州、海口、南昌、兰州、贵阳、及其他城市</td>
      </tr>
    </table>

    <div class="title_2">五、交通费标准</div>
    <div class="title_2">交通费包括：机票、出租票、及地铁、公交车票。机票包括往返程，出租票及地铁、公交车票报销工作之所需，市内交通每天上限每天200元。</div>

    <div class="btn"  @click="go()">已阅读</div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data(){
    return {
      titleList:[{title:'一、培训费用',value:"培训费用包括差旅费和课时费，由申请单位承担。差旅费包括交通及住宿费，为实报实销，其中市内交通每天上限200元。课时费根据课时数计算，具体如下：培训类（初级: 200元/小时、专业：500元/小时、首席：800元/小时）；2、申请单位提前打款至财课堂指定账户（在此需要跟财务沟通是哪个公司账号来收钱）。公司收到课时费后将派出人员实施培训。" },
        {title:'二、会销费用',value:"会销费用包括出场费和差旅费，由申请单位承担。申请单位按以下下表标准提前将出场费打款至财课堂指定账号。会销类（初级: 500元/小时、专业：800元/小时、首席：1000元/小时）。公司收到出场费后将派出人员实施培训。差旅费包括交通及住宿费，为实报实销，其中市内交通上限每天200元。"},
        {title:'三、会客支援',value:"会客支援包括差旅费和业务佣金提成，由申请单位承担。专业理财师抽成：20%，高级理财师抽成：30%；首席理财师抽成：50%。差旅费包括交通及住宿费，为实报实销，其中市内交通上限每天200元。"}
       ]
    }
  },
  methods:{
      go(){
      var vm=this;
      vm.$router.go(-1);
    },
  }
  }
</script>

<style lang="less">
  * {
    padding: 0px;
    margin:0px;
  }
.rule{
  position:absolute;
  min-height:100%;
  background-color:white;
  width:100%;

.header{
  text-align: center;
  font-size: 1.7rem;
  letter-spacing: 2px;
  margin-top: 1rem;
  font-weight: 600;
}

  .title{
    margin:1rem;
    line-height: 1.5;
    letter-spacing: 2px;
    font-size: 1.3rem;
  }
  .title_1{
    line-height: 1.5;
    letter-spacing: 2px;
    font-size: 1.3rem;
  }
  .title_2{
    line-height: 1.5;
    letter-spacing: 2px;
    font-size: 1.3rem;
    margin-left: 1rem;
  }
  .title_3{
    margin:5px;
    width: calc(~"100% - 10px");
    text-align: center;
    border:1px solid #b3b3b3;
    border-collapse: collapse;

  th{
    border:1px solid #b3b3b3;
    font-size: 1.3rem;
    font-weight: 500;
    height:2rem;
    width:33%;
  }
    td{
      border:1px solid #b3b3b3;
      height: 2rem;
    }



  }
  .btn{
    margin: 5px;
    border-radius: 5px;
    background-color: #E6A913;
    height: 2rem;
    text-align: center;
    color: white;
    font-size: 1.7rem;
    padding-bottom: 1rem;
    width: calc(~"100% - 10px");
    margin-top: 2rem;
    margin-bottom: 2rem;
    line-height: 2;
  }

}
</style>

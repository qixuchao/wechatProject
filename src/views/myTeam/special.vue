<template>
  <div class="special">

    <div class="block">
      <div class="head">产品信息</div>
      <div class="content">
        <div class="label">产品大分类</div>
        <div class="text">{{role[index].bigClassDesc}}</div>
      </div>
      <div class="content">
        <div class="label">产品中分类</div>
        <div class="text">{{role[index].midClassDesc}}</div>
      </div>
      <div class="content">
        <div class="label">产品小分类</div>
        <div class="text">{{role[index].minClassDesc}}</div>
      </div>
      <div class="content">
        <div class="label">产品名称</div>
        <div class="text">{{role[index].itemName}}</div>
      </div>
      <div class="content">
        <div class="label">供款期</div>
        <div class="text">{{role[index].sublineItemName}}</div>
      </div>
    </div>

    <div class="new_block">
      <div class="head">佣金分成</div>
      <div class="content">
        <div class="label">第一年</div>
        <div class="text">{{role[index].rate1}}</div>
      </div>
      <div class="content">
        <div class="label">第二年</div>
        <div class="text">{{role[index].rate2}}</div>
      </div>
      <div class="content">
        <div class="label">第三年</div>
        <div class="text">{{role[index].rate3}}</div>
      </div>
      <div class="content">
        <div class="label">第四年</div>
        <div class="text">{{role[index].rate4}}</div>
      </div>
      <div class="content">
        <div class="label">第五年</div>
        <div class="text">{{role[index].rate5}}</div>
      </div>
      <div class="content">
        <div class="label">第六年</div>
        <div class="text">{{role[index].rate6}}</div>
      </div>
      <div class="content">
        <div class="label">第七年</div>
        <div class="text">{{role[index].rate7}}</div>
      </div>
      <div class="content">
        <div class="label">第八年</div>
        <div class="text">{{role[index].rate8}}</div>
      </div>
      <div class="content">
        <div class="label">第九年</div>
        <div class="text">{{role[index].rate9}}</div>
      </div>
      <div class="content">
        <div class="label">第十年</div>
        <div class="text">{{role[index].rate10}}</div>
      </div>
      <div class="content">
        <div class="label">备注</div>
        <div class="text">{{role[index].performanceRequire}}</div>
      </div>
    </div>

    <div class="footer">
      <img class="left" :src="left_1" v-if="index+1===1||total===1" />
      <img class="left" :src="left_2" v-if="index+1>1&&total>1" @click="reduce" />
      <div class="middle">{{index+1}}/{{total}}</div>
      <img class="right" :src="right_1" v-if="total===1||index+1===total" />
      <img class="right" :src="right_2" v-if="total>1&&index+1<total" @click="add" />
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data(){
    return{
      channelContractId:this.$route.query.channelContractId,
      channelId:this.$route.query.channelId,
      role:[],
      index:0,
      total:null,
      left_1:require("../../assets/img/left_gray.png"),
      left_2:require("../../assets/img/left_yellow.png"),
      right_1:require("../../assets/img/right_gray.png"),
      right_2:require("../../assets/img/right_yellow.png"),
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
      document.setTitle('特殊政策');
    }, 1);
  },
  mounted(){
    var vm=this;
    vm.$post('/api/channel/personal/contract/rate',{
      "channelContractId":vm.channelContractId,
      "channelId":vm.channelId
    }).then(function(response){
      if(response){
        if(response.total>0){
          var detail=response.rows;
          for(let i=1;i<response.total;i++){
            vm.role.push(detail[i]);
          }
          vm.total=vm.role.length;
          for(let j in vm.role){
            for(let i=1;i<=10;i++){
              vm.role[j]['rate'+ i]=(vm.role[j]['rate'+ i]*100).toFixed(2)+"%";
            }
          }

        }else{
          vm.$vux.toast.show({text:'暂无数据'});
        }
      }else{
        vm.$vux.toast.show({text:'暂无数据'});
      }

    },function(response){

    });
  },
  methods:{
    reduce(){
      --this.index;
    },
    add(){
      ++this.index;
    }
  }
  }
</script>

<style lang="less">
  .special{
    width:100%;
    padding-bottom:5rem;
  .block{
    width:100%;
    background: white;
  .head{
    width: 100%;
    line-height: 45px;
    font-size: 1.6rem;
    color: #000;
    background: #f4f4f4;
    padding: 0 10px;
    box-sizing: border-box;
  }
  .content{
    width: 100%;
    line-height: 30px;
    padding: 0 10px;
    box-sizing: border-box;
    font-size: 1.4rem;
    letter-spacing: 1px;
    color:#333;
  .label{
    width: 30%;
    display:inline-block;
  }
  .text{
    display: inline-block;
    float: right;
  }
  }
  }
  .new_block{
    width:100%;
    background: white;
  .head{
    width: 100%;
    line-height: 45px;
    font-size: 1.6rem;
    color: #000;
    background: #f4f4f4;
    padding: 0 10px;
    box-sizing: border-box;
  }
  .content:nth-child(2n){
    width: 100%;
    line-height: 30px;
    padding: 0 10px;
    box-sizing: border-box;
    font-size: 1.4rem;
    letter-spacing: 1px;
    color:#333;
    background-color:#fbfbfb;

  .label{
    width: 30%;
    display:inline-block;
  }
  .text1{
    width:40%;
    display:inline-block;
    text-align: center;

  }
  .text{
    display: inline-block;
    float: right;
  }
  }
  .content:nth-child(2n+1){
    width: 100%;
    line-height: 30px;
    padding: 0 10px;
    box-sizing: border-box;
    font-size: 1.4rem;
    letter-spacing: 1px;
    color:#333;
    background-color:white;

  .label{
    width: 30%;
    display:inline-block;
  }
  .text1{
    width:40%;
    display:inline-block;
    text-align: center;
  }
  .text{
    display: inline-block;
    float:right;
  }
  }
  }
  .footer{
    position: fixed;
    bottom: 0;
    height: 5rem;
    width: 100%;
    background-color: white;
  }
  .left{
    position: absolute;
    width: 2rem;
    height:2rem;
    margin-left: 10%;
    margin-top: 1.5rem;
  }
  .middle{
    display: inline-block;
    margin-left: 45%;
    margin-top: 2rem;
  }
  .right{
    position: absolute;
    width: 2rem;
    height: 2rem;
    margin-left: 30%;
    margin-top: 1.5rem;
  }
  }


</style>

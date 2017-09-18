<template>
  <div class="policyPending">
    <div class="pendingInfo" v-for="(item,index) in pendingList" >
      <div class="header">
        <span>{{item.applyClassDesc}}</span>
        <span @click="go(index)">跟进</span>
      </div>
      <div class="pendingDesc">pending编号:{{item.pendingNumber}}</div>
      <div class="pendingDesc">pending名称:{{item.applyItem}}</div>
      <div class="pendingDesc">处理截止日期:{{item.dealEndDate}}</div>
      <div class="pendingDesc">状态:{{item.statusDesc}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
    return {
      pendingList:[],
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
      document.setTitle('pending列表');
    }, 1);
  },
  mounted(){
    var vm=this;
    var orderId=vm.$route.query.orderId;
    vm.$post('/api/ordPending/query',{
      "orderId":orderId
    }).then(function(response){
      vm.pendingList=response.rows;
    },function(response){
      console.log('接口出错了');
    })

  },
  methods: {
    go(index){
      var vm=this;
//      vm.$store.commit('assignmentPendingId',{param:vm.pendingList[index].pendingId});
//      vm.$router.push({path:'/pendingDetail'});
      vm.$router.push({path: '/pendingDetail',query:{pendingId:vm.pendingList[index].pendingId}});

    }

  },
  }
</script>

<style lang="scss">
  * {
    padding: 0px;
    margin:0px;
  }

  .policyPending{
    width: 100%;
    background-color: #F4F4F7;
    position: absolute;
    min-height: 100%;

  .pendingInfo{
    margin: 15px;
    padding: 10px;
    background: white;
    box-shadow: 0 2px 2px 1px gainsboro;
  .header{
    line-height: 30px;
    width: 100%;
    font-size: 1.7rem;
  span:nth-child(2){
    float: right;
    text-align: center;
    color: #E6A914;
    border:solid 1px #E6A914;
    padding:1px 20px;
    font-size: 1.3rem;
    border-radius: 4px;
  }
  }
  .pendingDesc{
    line-height: 25px;
    font-size: 1.5rem;
    color: #333;
  }
  }
  .footer{
    position: fixed;
    bottom: 0;
    line-height: 50px;
    width: 100%;
    text-align: center;
    font-size: 1.8rem;
    color: white;
    background: #E6A914;
    letter-spacing: 2px;
  }
  }
</style>

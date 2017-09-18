<template>
  <div class="policyPending">
    <div v-for="(item,index) in pendingList">
      <div class="pendingInfo" @click="goPage(index)">
        <div class="header">
          <span>{{item.applyClassDesc}}</span>
          <span>{{item.statusDesc}}</span>
        </div>
        <div class="pendingDesc">最后更新时间:{{item.lud}}</div>
        <div class="pendingDesc">处理截止时间:{{item.dealEndDate}}</div>
        <div class="pendingDesc">暂挂事项说明:{{item.applyItem}}</div>
      </div>
    </div>

    <div style="position: fixed;height: 5rem;background-color: white;bottom: 0;width: 100%">
      <a :href="phone"><div class="footer">联系理财师</div></a>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
    return {
      pendingList: [],
      phone:null
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
    var vm = this;
    var orderId = vm.$route.query.orderId;
    vm.phone=vm.$route.query.phone;
    vm.$post('/api/ordPending/query', {
      "orderId": orderId
    }).then(function (response) {
      vm.pendingList = response.rows;
    }, function (response) {
      console.log('接口出错了');
    })
  },
  methods:{
    goPage(index) {
      console.log(index);
      var vm = this;
      vm.$router.push({path: '/searchPendingInfo',query:{pendingId:vm.pendingList[index].pendingId}});
    },
  },
  }
</script>

<style lang="scss">
  .policyPending {
     margin-bottom:5rem;

  .pendingInfo {
    margin: 15px;
    padding: 10px;
    background: white;
    box-shadow: 0 2px 2px 1px gainsboro;

  .header {
    line-height: 30px;
    width: 100%;
    font-size: 1.7rem;

  span:nth-child(2) {
    float: right;
    color: red;
  }

  }
  .pendingDesc {
    line-height: 25px;
    font-size: 1.5rem;
    color: #333;
  }

  }
  .footer{
    margin: 1rem;
    border-radius: 5px;
    height: 2rem;
    text-align: center;
    padding-top: 1rem;
    color: #E5B33E;
    border:solid 1px #E5B33E;
    font-size: 1.7rem;
    position: fixed;
    bottom:0;
    width:93%;
    line-height: 1;
    background-color: white;
  }

  }
</style>

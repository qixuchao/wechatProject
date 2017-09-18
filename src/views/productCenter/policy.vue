<template>
  <div class="policy">

    <div class="up" >
      <div class="whole_new">
        <div class="left">保单编号：</div>
        <input class="right" placeholder="请输入保单编号" v-model="policyNumber"/>
      </div>
      <div class="whole">
        <div class="left">投保人：</div>
        <input class="right" placeholder="请输入投保人" v-model="policyHolder"/>
      </div>
      <div class="whole">
        <div class="left">受保人：</div>
        <input class="right" placeholder="请输入受保人" v-model="insured"/>
      </div>

      <div class="policy_bar_1" @click="screen">查询</div>
    </div>

    <!--<div class="down">-->
      <div class="policy_search_detail">
        <div class="search_detail" v-for="(item,index) in policyList" @click="choosePolicy(index)">
          <div class="search_detail_left">
            <div class="left_one">订单编号：{{item.orderNumber}}</div>
            <div class="left_two">订单信息：{{item.item}}</div>
            <div class="left_detail"> <div class="left_left">投保人：{{item.applicant}}</div><div class="left_right">受保人：{{item.insurant}}</div> </div>
            <div class="left_detail"> <div class="left_left">渠道：{{item.channelName}}</div></div>
            <div class="left_detail"><div class="left_left">预约供应商：{{item.reserveSupplierName}}</div></div>
          <div class="search_detail_right">
            <x-icon type="ios-circle-outline" size="20" class="choose" v-if="!item.value"></x-icon>
            <x-icon type="ios-circle-filled" size="20" class="choose" v-if="item.value"></x-icon>
          </div>
        </div>
      </div>

      </div>
      <!--</div>-->
    <div style="position: fixed;height: 5rem;background-color: white;bottom: 0;width: 100%">
      <div class="footer_bar" @click="choose">确认选择</div>
    </div>




  </div>


</template>

<script type="text/ecmascript-6">
  export default {
    data(){
    return{
//      showPolicy:true,
//      showPolicyDetail:false,
      chooseIndex:null,
      policyList:[],
      policyNumber:null,
      policyHolder:null,
      insured:null,
      channelId:null,
      customerId:'',
      orderId:''



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
      document.setTitle('选择保单');
    }, 1);
  },
  mounted(){
    var vm=this;
    function isEmptyObject(e) {
      var t;
      for (t in e)
        return true;
      return false;
    };
    var customList=vm.$store.getters.getCustomerList;
    if(isEmptyObject(customList)){
      vm.customerId=customList.customerId;
    }
    vm.channelId=JSON.parse(window.localStorage.userInfo).user.relatedPartyId;
    vm.$vux.loading.show({text:'loading'});
    vm.$post('/api/commons/lov/ORD_ORDERDETAIL',{
      "channelId":vm.channelId,
      "customerId":vm.customerId,
      "orderType":"INSURANCE"
    }).then(function(response){
      vm.$vux.loading.hide();
      vm.policyList=response.rows;
      if(vm.policyList.length===0){
        vm.$vux.toast.show({text:"无数据"});
      }else{
        for(let i in vm.policyList){
          vm.$set(vm.policyList[i],'value',false)
        }
      }
    }, function (response) {
      console.log("接口出错了");
    });

  },
  methods:{
    choosePolicy:function (index) {
      console.log(index);
      var vm = this;
      vm.chooseIndex = index;
      for (var i = 0; i < vm.policyList.length; i++) {
        vm.policyList[i].value = false;
      }
      vm.policyList[index].value = true;
    },
    choose:function(){
      var vm=this;
      vm.$store.commit('assignmentPolicyList',{param:vm.policyList[vm.chooseIndex]});
      vm.$router.go(-1);
    },
    screen:function(){
      var vm=this;
//      vm.customerId=JSON.parse(window.localStorage.userInfo).customerId;
      vm.$vux.loading.show({text:'loading'});
      vm.$post('/api/commons/lov/ORD_ORDERDETAIL',{
        'applicant':vm.policyHolder,
        'insurant':vm.insured,
        'orderNumber':vm.policyNumber,
        'channelId':vm.channelId,
        'customerId':vm.customerId,
        'orderType':"INSURANCE"
      }).then(function (response) {
        vm.$vux.loading.hide();
        vm.policyList=response.rows;
        if(vm.policyList.length===0){
          vm.$vux.toast.show({text:"无匹配结果"});
        }else{
//          vm.showPolicyDetail=true;
//          vm.showPolicy=false;
          for(let i in vm.policyList){
            vm.$set(vm.policyList[i],'value',false)
          }
        }


      },function(response){
        console.log("接口出错了");
      })
    }
  },

  }
</script>
<style lang="less">
  * {
    padding: 0px;
    margin:0px;
  }
  .policy{
  background-color:#F4F4F7;
  width:100%;
  min-height:100%;
  position:absolute;
  margin-bottom:5rem;

  .up{
    background-color: white;
  }


  .whole {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    min-height: 3rem;
    margin: 10px 0px 1rem 1rem;
    border-bottom: 1px solid #D9D9D9;
  }
  .whole_new{
    display: flex;
    display: -webkit-flex;
    align-items: center;
    min-height: 3rem;
    margin: 0px 0px 1rem 1rem;
    border-bottom: 1px solid #D9D9D9;
    padding-top: 10px;
  }

  .left {
    display: inline-block;
    width: 50%;
    align-items: center;
  }

  .right {
    border: 0px;
    display: inline-block;
    width: 70%;
    text-align: right;
    padding-right: 1rem;
    height: 3rem;
    outline: none;

  }



  .policy_bar_1{
    border-radius: 5px;
    height: 2rem;
    text-align: center;
    padding-top: 1rem;
    color: #E5B33E;
    border:solid 1px #E5B33E;
    font-size: 1.7rem;
    width:93%;
    line-height: 1;
    margin:1rem;
  }

.down{
  width: 100%;
  background-color: #F4F4F7;
  position: absolute;
  min-height: 100%;
}
  .policy_search_detail {
    margin-left: 1rem;
    margin-right: 1rem;
    font-size: 1.3rem;
    margin-top: 1rem;
    width:calc(~"100% - 2rem");
  }

  .search_detail {
    display: flex;
    display: -webkit-flex;
    min-height: 8rem;
    background-color: white;
    margin-bottom: 1.07rem;
    line-height: 1.5;
    background-color: white;
    box-shadow: 0 2px 5px 1px rgba(200, 199, 204, 0.6);
    box-sizing: border-box;

  }

  .search_detail_left {
    display: inline-block;
    width: 80%;
    line-height: 2;

  }

  .left_one {
    padding:2px 2px 2px 4px;
    font-size: 1.7rem;
  }
  .left_two{
    padding: 2px 2px 2px 4px;
    font-size: 1.3rem;
  }
  .left_detail{
    display: flex;
    display: -webkit-flex;
  }
  .left_left{
    display: inline-block;
    font-size: 1.3rem;
    padding:2px 2px 2px 4px;
    /*padding:2px;*/
    /*margin-left: 10%;*/
  }
  .left_right{
    display: inline-block;
    font-size: 1.3rem;
    /*width:calc(60% - 4rem);*/
    /*padding: 2px;*/
    margin-left: 10%;
  }

  .search_detail_right {
     position: absolute;
     width:20%;
     margin-left: calc(~"80% - 1rem");
     margin-top: -6rem;

  }

  .choose {
    position: absolute;
  }

  .vux-x-icon {
    fill: #E6A913;
  }

  .footer_bar {
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

<template>
  <div class="customer">

    <div style="height: 45px">
      <sticky :check-sticky-support="false">
        <tab active-color="#e6a914" :line-width="2" :line-height="2" class="hb" :custom-bar-width="getBarWidth">
          <tab-item selected @on-item-click="onItemClick" class="hb_tab">查询</tab-item>
          <tab-item @on-item-click="onItemClick" class="hb_tab">添加</tab-item>
        </tab>
      </sticky>
    </div>

    <div class="customer_search" v-if="showCustomer">
      <!--<div class="searchBar">-->
        <!--<div class="searchDev">-->
          <!--<input type="search" placeholder="请输入客户姓名" v-model="customName"/>-->
          <!--<span @click="screen">查询</span>-->
        <!--</div>-->
      <!--</div>-->

      <input class="customer_search_left" v-model="customName" placeholder="请输入客户姓名"/>
      <div class="customer_search_right" @click="screen">查询</div>

      <scroller v-model="scrollerStatus" height="1" lock-x scrollbar-y ref="scroller" :bounce="isbounce"
                :use-pullup="showUp" :pullup-config="upobj" @on-pullup-loading="loadMore">
      <div class="customer_search_detail">
        <div class="serarch_detail" v-for="(item,index) in searchList" @click="chooseCustom(index)">
          <div class="search_detail_left">
            <div class="left_one">客户编号：{{item.certificateNumber}}</div>
            <div class="left_one">客户姓名：{{item.chineseName}}</div>
            <div class="left_one">手机号：{{item.phone}}</div>
            <div class="left_one">身份证号：{{item.identityNumber}}</div>
          </div>
          <div class="search_detail_right">
            <x-icon type="ios-circle-outline" size="20" class="choose" v-if="!item.value"></x-icon>
            <x-icon type="ios-circle-filled" size="20" class="choose" v-if="item.value"></x-icon>
          </div>
        </div>
      </div>
      </scroller>

      <div style="position: fixed;height: 5rem;background-color: white;bottom: 0;width: 100%">
        <div class="footer_bar" @click="choose">确认选择</div>
      </div>
        <!--<div class="footer_bar" @click="choose">确认选择</div>-->
    </div>



    <div class="customer_add" v-if="showAdd">
      <div class="whole">
        <div class="left">客户姓名：</div>
        <input class="right" placeholder="请输入客户姓名" v-model="customerAddList.chineseName" />
      </div>

      <div class="whole">
        <div class="left">客户电话：</div>
        <group  class="middle">
          <popup-radio :options="phoneCodeList" v-model="customerAddList.phoneCode"></popup-radio>
        </group>
        <input class="right" placeholder="请输入客户电话" v-model="customerAddList.phone"/>
      </div>

      <div class="whole">
        <div class="left">身份证号：</div>
        <input class="right" placeholder="请输入身份证号" v-model="customerAddList.identityNumber"/>
      </div>

      <div style="position: fixed;height: 5rem;background-color: white;bottom: 0;width: 100%">
        <div class="add_bar" @click="add">确认选择</div>
      </div>

      <!--<div class="add_bar" @click="add">确认添加</div>-->
    </div>
    <loading  text="加载中" :value="refresh"></loading>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Tab,Sticky,TabItem,Group,PopupRadio,Loading,Scroller} from 'vux';
  export default {
    components: {
      Tab, Sticky, TabItem,Group,PopupRadio,Loading,Scroller
    },
    data(){
    return {
      showCustomer: true,
      showAdd: false,
      chooseIndex: null,
      customerAddList:{phone:null,chineseName:null,identityNumber:null,phoneCode:"",__status:"add"},
      getBarWidth: function (index) {
        if (index === 0 || index === 1) {
          return 35 + 'px'
        }
      },
      searchList: [],
      customName:null,
      phoneCodes:[],
      phoneCodeList:[],
      channelId:null,
      customerId:"",
      orderId:"",
      screen1: {},
      refresh: false,
      upobj: {
        content: '',
        pullUpHeight: 0,
        height: 0,
        autoRerefresh: false,
        downContent: '',
        upContent: '',
        loadingContent: '',
        clsPrefix: 'xs-plugin-pullup-'
      },
      showUp: true,
      isbounce: false,
      total: null,
      scrollerStatus: {
        pullupStatus: 'default'
      }
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
      document.setTitle('选择客户');
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
    var policyList=vm.$store.getters.getPolicyList;
    if(isEmptyObject(policyList)){
      vm.orderId=policyList.orderId;
    }
    vm.channelId=JSON.parse(window.localStorage.userInfo).user.relatedPartyId;
    vm.$nextTick(() => {
      vm.$refs.scroller.reset()
    })
    vm.$vux.loading.show({text: 'loading'});
    vm.$post('/api/clb/common/clbCode',{
      "phoneCodes": "PUB.PHONE_CODE"
    }).then(function (response) {
      var detail=JSON.parse(response);
      vm.phoneCodes=detail.phoneCodes;
      for(let i in vm.phoneCodes){
        vm.phoneCodeList.push(vm.phoneCodes[i].meaning);
      }
      vm.customerAddList.phoneCode=vm.phoneCodeList[0];
      vm.screen1={
        "page":1,
        "pageSize":20,
        "channelId":vm.channelId,
        "orderId":vm.orderId
      }
      vm.$post('/api/commons/lov/ORD_CUSTOMER?page=1&pagesize=20',
        vm.screen1      //还需要传一个参数channelId，实际是登录时后端返回的relatedPartyId
      ).then(function(response){
          vm.total=response.total;
          vm.$vux.loading.hide();
          vm.searchList=response.rows;
        for(let i in vm.searchList){
          vm.$set(vm.searchList[i],'value',false);
        }
          vm.scrollerStatus.pullupStatus = 'default'
          vm.$nextTick(() => {
            vm.$refs.scroller.reset()
          })
      },function(response){
          vm.$vux.loading.hide();
      })

    },function(response){
      vm.$vux.loading.hide();

    })


  },
  methods:{
    onItemClick:function (index) {
      var vm = this;
      if (index === 0) {
        vm.showCustomer = true;
        vm.showAdd = false;
      } else {
        vm.showCustomer = false;
        vm.showAdd = true;
      }

    },
    chooseCustom:function (index) {
      console.log(index);
      var vm = this;
      vm.chooseIndex = index;
      for (var i = 0; i < vm.searchList.length; i++) {
        vm.searchList[i].value = false;
      }
      vm.searchList[index].value = true;
    },
    add:function(){
      var vm=this;
      var phoneCode=null;
      for(let i in vm.phoneCodes){
        if(vm.customerAddList.phoneCode===vm.phoneCodes[i].meaning){
          phoneCode=vm.phoneCodes[i].value;
        }
      }
      if(vm.customerAddList.chineseName===null||vm.customerAddList.chineseName===''){
        vm.$vux.toast.show({text:'请输入中文姓名'});
      }else if(vm.customerAddList.phone===null){
        vm.$vux.toast.show({text:"手机号不能为空"});
      }else if(vm.customerAddList.identityNumber===null) {
        vm.$vux.toast.show({text:'身份证号不能为空'});
      } else {
        if (phoneCode === '86' && (!(/^1(3|4|5|7|8)\d{9}$/.test(vm.customerAddList.phone)))) {
          vm.$vux.toast.show({text:'手机号码有误'});
        } else if (phoneCode === '00852' && (vm.customerAddList.phone.length != 8)) {
          vm.$vux.toast.show({text:'手机号码有误'});
        } else if (phoneCode === '00853' && (vm.customerAddList.phone.length != 8)) {
          vm.$vux.toast.show({text:'手机号码有误'});
        } else if (phoneCode === '00886' && (vm.customerAddList.phone.length != 9)) {
          vm.$vux.toast.show({text:'手机号码有误'});
        } else {
          vm.customerAddList.phoneCode = phoneCode;
          vm.$post('/api/ctmCustomer/submit', vm.customerAddList).then(function (response) {
            vm.$store.commit('assignmentCustomerList', {param: response.rows[0]});
            vm.$store.commit('assignmentPolicyList',{param:{}});
            vm.$router.go(-1);
          }, function (response) {
            console.log("接口出错了");
          })

        }
      }
    },
    choose:function(){
      var vm=this;
      vm.$store.commit('assignmentCustomerList',{param:vm.searchList[vm.chooseIndex]});
      vm.$router.go(-1);
    },
    screen:function(){
      var vm=this;
      vm.screen1={
        "channelId":vm.channelId,
        "chineseName":vm.customName,
        "orderId":vm.orderId,
        "page":1,
        "pageSize":20
      }
      vm.$post('/api/commons/lov/ORD_CUSTOMER',
        vm.screen1
      ).then(function(response){
          vm.total=response.total;
          vm.searchList=response.rows;
        for(let i in vm.searchList){
          vm.$set(vm.searchList[i],'value',false);
        }
          vm.scrollerStatus.pullupStatus = 'default'
          vm.$nextTick(() => {
            vm.$refs.scroller.reset()
          })
      },function(response){
        console.log("接口出错了");
      })

    },
    loadMore(){
      var vm = this;
      vm.$vux.loading.show({text:loading});
      if (vm.searchList.length === vm.total) {
        vm.refresh=false;
        vm.$vux.toast.show({text:'已经到底了'});
        vm.scrollerStatus.pullupStatus = 'disabled' // 禁用下拉
      } else {
        var page = ++vm.screen1.page;
        vm.$post('/api/commons/lov/ORD_CUSTOMER?page='+page+"&pagesize=20",
          vm.screen1
        ).then(function(response){
            vm.$vux.loading.hide();
            for(let i in response.rows){
              vm.$set(response.rows[i],'value',false);
            }
            vm.searchList=vm.searchList.concat(response.rows);
            vm.scrollerStatus.pullupStatus = 'default'
            vm.$nextTick(() => {
              vm.$refs.scroller.reset()
            })

          },function(response){
            vm.$vux.loading.hide();
            vm.$vux.toast.show({text:'接口出错了'});

          })


      }
    }

  },
  activated() {
    this.$refs.scroller.reset()
  },
    destroyed(){
      this.$vux.loading.hide();
    }

  }


</script>

<style lang="less">
  * {
    padding: 0px;
    margin:0px;
  }

  .customer {
    width: 100%;
    background-color: #F4F4F7;
    position: absolute;
    min-height: 100%;
    margin-bottom:5rem;


  .hb {
    width: 100% !important;
    box-shadow: 1px 3px rgba(200, 199, 204, 0.6);
    color: #333333 !important;
    background-color: white;
  }

  .hb_tab {
    font-size: 1.4rem !important;
    /*background-size: 2px !important;*/
    line-height: 50px !important;

  }

  .customer_search {
    width: 100%;

  }

  .searchBar {
    line-height: 50px;
    box-sizing: border-box;
    box-shadow: 0 1px 4px #E1E0E3;
    position: absolute;
    width: 100%;
    background-color: white;
  }
  .searchDev {
    display: inline-block;
    width: 100%;

  input[type="search"] {
    outline: none;
    border-radius: 20px;
    -webkit-appearance: none;
    background: #F3F3F3;
    height: 35px;
    padding-left: 10px;
    border: 1px solid gainsboro;
    width: 75%;
    margin-left: 2rem;
    font-size: 1.3rem;
    color: #999999;
  }

  span {
    color: #E6A914;
    display: inline-block;
    position: absolute;
    margin-left: 2rem;
    font-size: 1.4rem;
  }

  }

  .customer_search_left {
    display: inline-block;
    position: relative;
    margin: 1rem;
    width: 75%;
    padding: .5rem;
    font-size: 1.3rem;
    border-radius: 20px;
    outline: none;
    margin-left: 8%;
    height:2rem;
    border: 0px;
  }

  .customer_search_right {
    display: inline-block;
    /*margin-left:1rem;*/
    color: #e6a914;
  }

  .customer_search_detail {
    margin-left: 1rem;
    margin-right: 1rem;
    font-size: 1.3rem;
  }

  .serarch_detail {
    display: flex;
    display: -webkit-flex;
    min-height: 8rem;
    background-color: white;
    margin-bottom: 1.07rem;
    line-height: 1.5;
    box-shadow: 0 2px 5px 1px rgba(200, 199, 204, 0.6);
    box-sizing: border-box;
  }

  .search_detail_left {
    display: inline-block;
    width: 80%;

  }

  .left_one {
    padding: 2px 2px 2px 4px;
  }

  .search_detail_right {
    display: inline-block;
    width: 20%;
    padding-top: 3rem;
    padding-right: 1rem;
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
    /*position: fixed;*/
    bottom:0;
    width:93%;
    line-height: 1;
  }
  .customer_add{
    width:100%;
    background-color: white;
    min-height:100%;
    position: absolute;
  }
  .whole {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    min-height: 3rem;
    margin: 10px 0px 1rem 1rem;
    border-bottom: 1px solid #D9D9D9;
  }

  .left {
    display: inline-block;
    width: 30%;
    align-items: center;
  }
  .middle{
    display: inline-block;
    width: 40%;
    margin-top:-10px;

  .weui-cells:before{
    border-top:none;
  }
  .weui-cells:after{
    border-bottom: none;
  }
  .weui-cell{
    padding: 0px;
  }
  .weui-cell_access .weui-cell__ft{
    padding: 0px;
    margin-bottom: 10px;
    font-size:1.3rem;
  }
  .weui-cell_access .weui-cell__ft:after{
    content: normal;
  }

  }

  .right {
    border: 0px;
    display: inline-block;
    width: 50%;
    text-align: right;
    padding-right: 1rem;
    height: 3rem;
    outline: none;
    margin-left: 20%;

  }

  .add_bar {
    margin: 1rem;
    border-radius: 5px;
    height: 2rem;
    text-align: center;
    padding-top: 1rem;
    color: #E5B33E;
    border:solid 1px #E5B33E;
    font-size: 1.7rem;
    /*position: fixed;*/
    bottom:0;
    width:93%;
    line-height: 1;
  }
  }
</style>

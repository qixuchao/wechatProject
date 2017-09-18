<template>
  <div class="mineOrder" v-if="openId">
    <!--<sticky   :check-sticky-support="false">-->
      <tab  active-color="#e6a914" v-if="showTab"  :line-width="2" :line-height="2"  class="hb" custom-bar-width="35px" style="position:fixed;z-index:20">
        <tab-item selected @on-item-click="onItemClick" class="hb_tab" >个人</tab-item>
        <tab-item @on-item-click="onItemClick" class="hb_tab" >团队</tab-item>
      </tab>
    <!--</sticky>-->

    <!--<select class="first" v-model="date"><option :value="item.value" v-for="item in dateList">{{item.value}}</option> </select>-->
    <!--<select class="first" v-model="state"><option :value="item.value" v-for="item in stateList">{{item.description}}</option> </select>-->
    <!--<div style="display: flex;display: -webkit-flex">-->
      <!--<group  class="middle">-->
        <!--<popup-radio :options="newState" v-model="state" placeholder="筛选"></popup-radio>-->
      <!--</group>-->
      <!--<input v-model="data" class="two" placeholder="请输入客户姓名"   />-->
      <!--<span @click="screen" style="margin-left: 10px; font-size: 1.3rem; color:#E6A914;margin-top: 6.5rem">查询</span>-->
    <!--</div>-->

    <div class="back_btn" @click="back1" v-if="showChoose">收起筛选</div>
    <div :class="{header:showTab,header_new:!showTab}" v-if="showTab">
      <div class="header_left" @click="choose"><span style="font-size: 1.3rem">筛选</span>
        <img :src="icon" class="icon"/></div>
      <input class="header_right" v-model="inputData" placeholder="请输入客户姓名" @keyup="screen"  />
    </div>

    <div class="choose" v-if="showChoose">
      <div class="title">状态</div>
      <div class="type">
        <div :class="{notActive:item.notActive,active:!item.notActive}" v-for="(item,index) in stateList"
             @click="stateChange(index)">{{item.meaning}}
        </div>
      </div>
      <!-- 按钮-->
      <div class="button_type">
        <div class="button_left" @click="clearAll">重置</div>
        <div class="button_right" @click="screen">查询</div>
      </div>
    </div>



    <scroller v-model="scrollerStatus" height="-95" lock-x scrollbar-y ref="scroller" :bounce="isbounce"
              :use-pullup="showUp" :pullup-config="upobj" @on-pullup-loading="loadMore" v-if="showList">
      <div>
      <div class="detail" v-for="(item,index) in detailList" @click="go(index)">
      <div class="title"><span>{{item.item}}</span></div>
      <div class="person"><span>投保人：</span><span>{{item.applicant}}</span></div>
      <div class="person"><span>预约时间：</span><span>{{item.reserveDate}}</span></div>
      <div class="person"><span>状态：</span><span style="color:#84D3F1">{{item.statusDesc}}</span></div>
    </div>
      </div>
   </scroller>


  </div>

</template>

<script type="text/ecmascript-6">
import {Group,PopupRadio,Tab,TabItem,Sticky,Scroller} from 'vux';
  export default {
    components:{
      Tab,TabItem,Sticky,Scroller,Group,PopupRadio
    },
    beforeCreate(){
      this.openId = '';
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
        document.setTitle('我的订单');
      }, 1);

},
    data(){
      return{
        stateList:[],
        newState:[],
        openId:'',
        state:null,
        inputData:null,
        detailList:[],
        channelId:null,
        screenIndex:0,
        refresh:false,
        icon: require('../../assets/support/icon_pull.png'),
        screen1:{},
        upobj: {
          content: '',
          pullUpHeight: 60,
          height: 40,
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
        },
        showChoose:false,
        showList:true,
        showTab:true,

      }
    },

mounted(){
  if(window.localStorage.wechatOpenid !==window.localStorage.openid){

  }else {
    var vm = this;
    vm.openId = window.localStorage.wechatOpenid;
    vm.channelId = JSON.parse(window.localStorage.userInfo).user.relatedPartyId;
    vm.$vux.loading.show({text: 'loading'});
    console.log(vm.scrollerStatus.pullupStatus);
    vm.$nextTick(() => {
      vm.$refs.scroller.reset()
    })
    vm.$post('/api/clb/common/clbCode', {
      "orderStatusList": "ORD.ORDER_STATUS"
    }).then(function (response) {
      vm.stateList = JSON.parse(response).orderStatusList;
      for (let i in vm.stateList) {
        vm.$set(vm.stateList[i], 'notActive', true);
      }
    }, function (response) {
      console.log("接口出错了");
    })
    vm.screen1 = {
      "channelId": vm.channelId,
      "dateType": "RESERVE",
      "orderType": "INSURANCE",
      "page": 1,
      "pageSize": 20
    };
    vm.$post('/api/ordOrder/queryPersonal?page=1&pageSize=20',
      vm.screen1
    ).then(function (response) {
      vm.$vux.loading.hide();
      vm.total = response.total;
      if (vm.total === 0) {
        vm.$vux.toast.show({text: '暂无数据'});
      }
      vm.detailList = response.rows;
      for (let i in vm.detailList) {
        if (vm.detailList[i].statusDesc === '预审中') {
          vm.detailList[i].statusDesc = '资料审核中';
        }
      }
      vm.scrollerStatus.pullupStatus = 'default';
      // this.$refs.scroller.reset()
      console.log(vm.scrollerStatus.pullupStatus)
      vm.$nextTick(() => {
        vm.$refs.scroller.reset()
      })
    }, function (response) {
      console.log("接口出错了");
    })
  }
},
methods:{

  onItemClick(index){
    var vm=this;
    vm.$vux.loading.show({text:'loading'});
    vm.$refs.scroller.reset({top: 0});
    vm.screenIndex=index;
       if(index===0){
         vm.screen1={
           "channelId": vm.channelId,
           "dateType": "RESERVE",
           "orderType": "INSURANCE",
           "page": 1,
           "pageSize": 20
         };
         vm.$post('/api/ordOrder/queryPersonal?page=1&pageSize=20',
           vm.screen1
         ).then(function (response) {
             vm.$vux.loading.hide();
             if(response.total===0){
               vm.$vux.toast.show({text:'暂无数据'});
             }
            vm.total=response.total;
           vm.detailList = response.rows;
             for(let i in vm.detailList){
               if(vm.detailList[i].statusDesc==='预审中'){
                 vm.detailList[i].statusDesc='资料审核中';
               }
             }
             vm.scrollerStatus.pullupStatus = 'default'
             vm.$nextTick(() => {
               vm.$refs.scroller.reset()
             })
         }, function (response) {
           console.log("接口出错了");
         })
       }
    if(index===1){
      vm.screen1={
        "parentChannelId": vm.channelId,
        "dateType": "RESERVE",
        "orderType": "INSURANCE",
        "page": 1,
        "pageSize": 20
      };
      vm.$post('/api/ordOrder/queryTeam?page=1&pageSize=20',
      vm.screen1
      ).then(function(response){
          vm.$vux.loading.hide();
          if(response.total===0){
            vm.$vux.toast.show({text:'暂无数据'});
          }
        vm.total=response.total;
        vm.detailList = response.rows;
          for(let i in vm.detailList){
            if(vm.detailList[i].statusDesc==='预审中'){
              vm.detailList[i].statusDesc='资料审核中';
            }
          }
          vm.scrollerStatus.pullupStatus = 'default'
          vm.$nextTick(() => {
            vm.$refs.scroller.reset()
          })
      },function(response){
        console.log('接口出错了')
      })
    }
  },
  screen:function(){
    var vm=this;
    vm.$vux.loading.show({text:'loading'});
    console.log(vm.screenIndex);
    if(vm.screenIndex===0){
      var state=null;
      for(let i in vm.stateList){
        if(!vm.stateList[i].notActive){
          state=vm.stateList[i].value;
        }
      }
      vm.screen1={
//        "channelId":vm.channelId,
        "person":vm.inputData,
        "status":state,
        "dateType": "RESERVE",
        "orderType": "INSURANCE",
        "page": 1,
        "pageSize": 20
      };
      vm.$post('/api/ordOrder/queryPersonal?page=1&pageSize=20',
      vm.screen1
      ).then(function (response) {
          vm.$vux.loading.hide();
          if(response.total===0){
            vm.$vux.toast.show({text:'暂无数据'});
          }
          vm.showTab = true;
          vm.showChoose = false;
          vm.$refs.scroller.reset({top: 0});
          vm.total=response.total;
          vm.detailList=response.rows;
          for(let i in vm.detailList){
            if(vm.detailList[i].statusDesc==='预审中'){
              vm.detailList[i].statusDesc='资料审核中';
            }
          }
          vm.scrollerStatus.pullupStatus = 'default'
          vm.$nextTick(() => {
            vm.$refs.scroller.reset()
          })
      },function(response){
        console.log('接口出错了')
      })
    }
    if(vm.screenIndex===1){
      var state=null;
      for(let i in vm.stateList){
        if(!vm.stateList[i].notActive){
          state=vm.stateList[i].value;
        }
      }
      vm.screen1={
//        "parentChannelId": vm.channelId,
        "applicant":vm.inputData,
        "insurant":vm.inputData,
        "status":state,
        "dateType": "RESERVE",
        "orderType": "INSURANCE",
        "page": 1,
        "pageSize": 20
      };
      vm.$post('/api/ordOrder/queryTeam?page=1&pageSize=20',
      vm.screen1
      ).then(function(response){
          vm.$vux.loading.hide();
          if(response.total===0){
            vm.$vux.toast.show({text:'暂无数据'});
          }
         vm.total=response.total;
          vm.showTab = true;
          vm.showChoose = false;
          vm.showList = true;
          vm.$refs.scroller.reset({top: 0});
          vm.detailList = response.rows;
          for(let i in vm.detailList){
            if(vm.detailList[i].statusDesc==='预审中'){
              vm.detailList[i].statusDesc='资料审核中';
            }
          }
          vm.scrollerStatus.pullupStatus = 'default'
          vm.$nextTick(() => {
            vm.$refs.scroller.reset()
          })
      },function(response){
        console.log('接口出错了')
      })
    }
  },
  loadMore(){
    var vm=this;
    if (vm.detailList.length === vm.total) {
      vm.refresh=false;
      vm.$vux.toast.show({text:'已经到底了'});
      vm.scrollerStatus.pullupStatus = 'disabled' // 禁用下拉
    } else {
      vm.$vux.loading.show({text:'loading'});
      var page=++vm.screen1.page;
      if(vm.screenIndex===0){
        vm.$post('/api/ordOrder/queryPersonal?page='+page+'&pageSize=20',
          vm.screen1
        ).then(function (response) {
            vm.$vux.loading.hide();
            if(response.total===0){
              vm.$vux.toast.show({text:'暂无数据'});
            }
            vm.detailList=vm.detailList.concat(response.rows);
            for(let i in vm.detailList){
              if(vm.detailList[i].statusDesc==='预审中'){
                vm.detailList[i].statusDesc='资料审核中';
              }
            }
            vm.scrollerStatus.pullupStatus = 'default'
            vm.$nextTick(() => {
              vm.$refs.scroller.reset()
            })
          },function(response){
            console.log('接口出错了')
          })
      }
      if(vm.screenIndex===1){
        vm.$post('/api/ordOrder/queryTeam?page='+page+'&pageSize=20',
          vm.screen1
        ).then(function(response){
            vm.$vux.loading.hide();
            if(response.total===0){
              vm.$vux.toast.show({text:'暂无数据'});
            }
            vm.detailList = vm.detailList.concat(response.rows);
            for(let i in vm.detailList){
              if(vm.detailList[i].statusDesc==='预审中'){
                vm.detailList[i].statusDesc='资料审核中';
              }
            }
            vm.scrollerStatus.pullupStatus = 'default'
            vm.$nextTick(() => {
              vm.$refs.scroller.reset()
            })
          },function(response){
            console.log('接口出错了')
          })
      }
    }


  },
      go(index){
        var vm=this;
        if(vm.screenIndex===0){
          vm.$router.push({path: '/orderDetail',query:{orderId:vm.detailList[index].orderId,type:'personal'}});
        }
        if(vm.screenIndex===1){
          vm.$router.push({path: '/orderDetail',query:{orderId:vm.detailList[index].orderId,type:'team'}});
        }
      },
  choose(){
    var vm = this;
    vm.showTab = false;
    vm.showList = false;
    vm.showChoose = true;
  },
  back1(){
    var vm=this;
    vm.showChoose=false;
    vm.showTab=true;
    vm.showList=true;
  },
  stateChange(index){
    var vm = this;
    if(!vm.stateList[index].notActive){
      vm.stateList[index].notActive=true;
    }else{
      for (let i in vm.stateList) {
        vm.stateList[i].notActive = true;
      }
      vm.stateList[index].notActive = false;
    }
  },
  clearAll(){
    var vm = this;
    vm.inputData = null;
      for (let i in vm.stateList) {
        vm.stateList[i].notActive = true;
      }
  },

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
    /*touch-action: none;*/
    padding: 0px;
    margin:0px;
  }
.mineOrder{
  background-color:#F4F4F7;
  min-height:100%;
  position:absolute;
  width:100%;

  .hb{
    /*position: absolute;*/
    height:45px !important;
    width:100%!important;
    box-shadow:1px 3px rgba(200,199,204,0.6);
    color: #333333 !important;
  }
  .hb_tab{
    font-size: 1.4rem !important;
    background-size: 2px !important;
    line-height: 50px !important;

  }
  .first{
    display: inline-block;
    width:20%;
    margin-left: 1rem;
    margin-top: 55px;
    height:3rem;
    border: 0px;
    border-radius: 5px;
    outline: none;

  }
  .two{
    display: inline-block;
    margin-left: 0.5rem;
    margin-top: 60px;
    height: 3rem;
    border: 0px;
    border-radius: 5px;
    padding-left: 5px;
    outline: none;
    width: calc(~"75% - 6rem");
    font-size:1.3rem;
  }
  .header {
    height: 40px;
    margin-top: 55px;
    width: calc(~ "100% - 2rem");
    margin-left: 1rem;
  }

  .icon {
    width: 1rem;
    height: 1rem;
    padding-top: 12px;
  }

  .header_new {
    height: 40px;
    margin-top: 55px;
    width: calc(~ "100% - 2rem");
    margin-left: 1rem;
  }
  .back_btn{
    width: 8rem;
    position: relative;
    margin-top: 12px;
    border: solid 1px #E5B33E;
    color: #E5B33E;
    height: 1.8rem;
    float: left;
    text-align: center;
    margin-left: 10px;
    border-radius: 5px;
    line-height: 1.7;

  }
  .header_left {
    display: inline-block;
    width: 20%;
    text-align: center;
    background-color: white;
    border: 0px;
    vertical-align: middle;
    line-height: 2;
    height: 3.35rem;
    text-align: center;
    border-radius: 5px;
    font-size: 1.3rem;
  }

  .header_right {
    display: inline-block;
    width: calc(~ "80% - 2rem");
    background-color: white;
    border: 0px;
    height: 3.25rem;
    padding-left: 10px;
    line-height: 2;
    outline: none;
    border-radius: 5px;
    /*font-size: 1.3rem;*/
  }

  .choose {
   margin-top:4rem;

  .title {
    margin: 1rem;
    font-size: 1.3rem;
  }

  .type {
    background-color: white;
    width: 100%;
    text-align: justify;
  }

  .notActive {
    background-color: #F4F4F7;
    display: inline-block;
    width: 30vw;
    height: 3rem;
    margin: 1.6%;
    line-height: 2.5;
    text-align: center;
  }

  .active {
    background-color: #E6A914;
    color: white;
    display: inline-block;
    width: 30vw;
    height: 3rem;
    margin:1.6%;
    line-height: 2.5;
    text-align: center;
  }

  .button_type {
    margin-top: 5rem;
  }

  .button_left {
    position: relative;
    display: inline-block;
    width: 40%;
    height: 3rem;
    border: solid 1px #D1D1D1;
    margin:4.5%;
    text-align: center;
    line-height: 2;
    font-size: 1.7rem;
  }

  .button_right {
    position: relative;
    display: inline-block;
    width: 40%;
    height: 3rem;
    background-color: #E6A913;
    margin: 4.5%;
    text-align: center;
    line-height: 2;
    font-size: 1.7rem;
  }

  }


  .detail{
    margin:1rem;
    min-height: 6rem;
    background-color: white;
    line-height:2;

    .title{
      font-size: 1.7rem;
      margin-left: 0.5rem;
      margin-top: 1rem;
    }
    .right{
      margin-left: 1rem;
      font-size: 1.7rem;
      margin-top: 1rem;

    }
    .person{
      margin-left: 0.5rem;
    }
  }
  .middle {
    display: inline-block;
    width: 25%;
    margin-top: 45px;
    color: #333333;

  .weui-cells{
    border-top: none;
    margin-top: 14px;
    background-color: #FFFFFF;
    line-height: 1.41176471;
    font-size: 17px;
    overflow: hidden;
    /* position: relative; */
    height: 3rem;
    border-radius: 5px;
    margin-left: 1rem;
    position: relative;
  }

  .weui-cells:before {
    border-top: none;
    margin-top: 14px;
    background-color: #FFFFFF;
    line-height: 1.41176471;
    font-size: 17px;
    overflow: hidden;
    /* position: relative; */
    height: 3rem;
    border-radius: 5px;
    margin-left: 1rem;
    position: relative;
  }

  .weui-cells:after {
    border-bottom: none;
  }

  .weui-cell {
    padding: 0px;
  }
  .weui-cell_access .weui-cell__ft{
    padding: 0px;
    padding-top: 14px;
    font-size: 1.3rem;
    margin-top: -3rem;
    width: 100%;
    text-align: center;
  }
  .weui-cell_access .weui-cell__ft:after{
    content: normal;
  }

  }
.refresh{
  width: 100%;
  text-align: center;
  font-size: 1.3rem;
  letter-spacing: 2px;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

}
</style>

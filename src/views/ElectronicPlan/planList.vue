<template>
  <div class="planList" v-if="openId">

    <div  class="teamRemember">
      <div class="information1">
        <group>
          <popup-radio title=""  :options="stateList" placeholder="全部状态" v-model="state"></popup-radio>
        </group>
        <input type="text" v-model="inputData" placeholder="请输入投保人/受保人进行搜索" @keyup="screen">
      </div>
      </div>

    <scroller v-model="scrollerStatus" height="-95" lock-x scrollbar-y ref="scroller" :bounce="isbounce"
              :use-pullup="showUp" :pullup-config="upobj" @on-pullup-loading="loadMore">
      <div>
        <div class="detail" v-for="(item,index) in detailList">
          <div class="title"><span>{{item.itemName}}</span></div>
          <div class="person"><span>计划书编号：</span><span>{{item.requestNumber}}</span></div>
          <div class="person"><span>申请时间：</span><span>{{item.requestDate}}</span></div>
          <div class="person"><span>投保人：</span><span>{{item.policyHolderName}}</span></div>
          <div class="person"><span>受保人：</span><span>{{item.insurantName}}</span></div>
          <div class="person"><span>状态：</span><span :class="item.class">{{item.status}}</span></div>
          <div class="person"><span>处理说明：</span><span>{{item.processComments}}</span></div>
        </div>
      </div>
    </scroller>

    <div class="footer"  @click="goPlan">普通计划书申请</div>


  </div>

</template>

<script type="text/ecmascript-6">
  import {Group,PopupRadio,Scroller} from 'vux';
  export default {
    components:{
      Scroller,Group,PopupRadio
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
        document.setTitle('计划书列表');
      }, 1);

    },
    data(){
      return{
        stateList:[],
        newList:null,
        state:'',
        inputData:'',
        detailList:[],
        openId:'',
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
      }
    },

    mounted(){
      if(window.localStorage.wechatOpenid !==window.localStorage.openid){
      }else {
        var vm = this;
        vm.openId = window.localStorage.wechatOpenid;
        vm.$vux.loading.show({text: 'loading'});
        console.log(vm.scrollerStatus.pullupStatus);
        vm.$nextTick(() => {
          vm.$refs.scroller.reset()
        })
        vm.$post('/api/clb/common/clbCode', {
          "orderStatusList": "PLN.PLAN_STATUS"
        }).then(function (response) {
          vm.newList = JSON.parse(response).orderStatusList;
          vm.newList.forEach(value=> {
            value.key = value.value;
            value.value = value.meaning + "";
            vm.stateList.push(value);
          });
          vm.stateList.unshift({key: 'all', value: '全部状态'});
          vm.screen1 = {
            "type": "personal",
            "insurantName": vm.inputData,
            "status": vm.state,
            "page": 1,
            "pagesize": 10
          };
          vm.$post('/api/plan/myPlan?page=1&pagesize=10',
            vm.screen1
          ).then(function (response) {
            vm.$vux.loading.hide();
            vm.total = response.total;
            if (vm.total === 0) {
              vm.$vux.toast.show({text: '暂无数据'});
            }
            vm.detailList = response.rows;
            for (let i in vm.detailList) {
              if (vm.detailList[i].status === 'COMPLETED') {
                vm.$set(vm.detailList[i], 'class', "complete");
              }
              if (vm.detailList[i].status === 'REVIEW') {
                vm.$set(vm.detailList[i], 'class', "review");
              }
              if (vm.detailList[i].status === 'PROCESSING') {
                vm.$set(vm.detailList[i], 'class', "process");
              }
              if (vm.detailList[i].status === 'CANCELED') {
                vm.$set(vm.detailList[i], 'class', "cancel");
              }
              for (let j in vm.newList)
                if (vm.detailList[i].status === vm.newList[j].key) {
                  vm.detailList[i].status = vm.newList[j].meaning;
                }
            }

            vm.scrollerStatus.pullupStatus = 'default';
            vm.$nextTick(() => {
              vm.$refs.scroller.reset()
            })
          }, function (response) {
            console.log("接口出错了");
          });
        }, function (response) {
          console.log("接口出错了");
        })
      }
    },
    watch:{
      state:function(newVal,oldVal){
        this.screen();
    }
    },
    methods:{
      screen:function () {
        var vm = this;
        vm.$vux.loading.show({text: 'loading'});
        var state=vm.state;
        if(vm.state==='all'){
           state='';
        }
        vm.screen1 = {
          "type": "personal",
          "insurantName": vm.inputData,
          "status": state,
          "page": 1,
          "pagesize": 10
        };
        vm.$post('/api/plan/myPlan?page=1&pagesize=10',
          vm.screen1
        ).then(function (response) {
            vm.$vux.loading.hide();
            if (response.total === 0) {
              vm.$vux.toast.show({text: '暂无数据'});
            }
            vm.$refs.scroller.reset({top: 0});
            vm.total = response.total;
            vm.detailList = response.rows;
            for (let i in vm.detailList) {
              if (vm.detailList[i].status === 'COMPLETED') {
                vm.$set(vm.detailList[i], 'class', "complete");
              }
              if (vm.detailList[i].status === 'REVIEW') {
                vm.$set(vm.detailList[i], 'class', "review");
              }
              if (vm.detailList[i].status === 'PROCESSING') {
                vm.$set(vm.detailList[i], 'class', "process");
              }
              if (vm.detailList[i].status === 'CANCELED') {
                vm.$set(vm.detailList[i], 'class', "cancel");
              }
              for (let j in vm.newList)
                if (vm.detailList[i].status === vm.newList[j].key) {
                  vm.detailList[i].status = vm.newList[j].meaning;
                }
            }
            vm.scrollerStatus.pullupStatus = 'default'
            vm.$nextTick(() => {
              vm.$refs.scroller.reset()
            })
          }, function (response) {
            console.log('接口出错了')
          })

      }
    ,
      loadMore()
      {
        var vm = this;
        if (vm.detailList.length === vm.total) {
          vm.refresh = false;
          vm.$vux.toast.show({text: '已经到底了'});
          vm.scrollerStatus.pullupStatus = 'disabled' // 禁用下拉
        } else {
          vm.$vux.loading.show({text: 'loading'});
          var page = ++vm.screen1.page;
          vm.$post('/api/plan/myPlan?page=' + page + '&pagesize=10',
            vm.screen1
          ).then(function (response) {
              vm.$vux.loading.hide();
              if (response.total === 0) {
                vm.$vux.toast.show({text: '暂无数据'});
              }
              var data = response.rows;
              for (let i in data) {
                if (data[i].status === 'COMPLETED') {
                  vm.$set(data[i], 'class', "complete");
                }
                if (data[i].status === 'REVIEW') {
                  vm.$set(data[i], 'class', "review");
                }
                if (data[i].status === 'PROCESSING') {
                  vm.$set(data[i], 'class', "process");
                }
                if (data[i].status === 'CANCELED') {
                  vm.$set(data[i], 'class', "cancel");
                }
                for (let j in vm.newList)
                  if (data[i].status === vm.newList[j].key) {
                    data[i].status = vm.newList[j].meaning;
                  }
              }

              vm.detailList = vm.detailList.concat(data);
              vm.scrollerStatus.pullupStatus = 'default'
              vm.$nextTick(() => {
                vm.$refs.scroller.reset()
              })
            }, function (response) {
              console.log('接口出错了')
            })
        }
      }
    ,
      goPlan()
      {
        this.$router.push({name: 'addCompare', query: {page: 'normal'}});
      }
    ,
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
  .planList{
    background-color:#F4F4F7;
    min-height:100%;
    position:absolute;
    width:100%;
    margin-bottom:4rem;

  .teamRemember {
    padding:0 10px 9px;
    width:100%;
    box-sizing:border-box;
  .information1 {
    /*width: calc(100vw - 30px);*/
    display: flex;
    align-items: center;
    line-height: 50px;
    margin-top: 10px;
    /*margin-bottom: 10px;*/
  .weui-cells {
    vertical-align: middle;
    margin-top: 0;
    width: 25vw;
  &:before{
     border-top:none;
   }
  &:after{
     border-bottom:none;
   }
  }
  .weui-cell {
    padding: 12px 0 13px;
    width: 100%;
    box-sizing: border-box;
    text-align: center;
    font-size: 1.4rem;
  .weui-cell__hd, .vux-cell-bd {
    display: none !important;
  }
  }
  input {
    padding: 14px 10px 13px;
    width: 75%;
    margin-left: 10px;
    box-sizing: border-box;
    outline: none;
    border: none;
    font-size: 1.4rem;
    border-radius: 0;
  }
  .searchAll{
    width: 20%;
    text-align: center;
    font-size: 1.5rem;
    color: #E6A914;
  }
  .vux-cell-bd {

  }
  }
  }

  .complete {
    color: #50C55D;
  }

  .review {
    color: #FF5050;
  }

  .cancle {
    color: #B0B0B0;
  }

  .process{
    color: #72CDFC;
  }

  .icon {
    width: 1rem;
    height: 1rem;
    padding-top: 12px;
  }

  .header_new {
    height: 40px;
    margin-top: 10px;
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
    font-weight: 600;
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

  .footer{
    position: fixed;
    height: 4rem;
    width: 100%;
    text-align: center;
    background-color:#E5B33E;
    bottom:0;
    line-height: 3.2;
    color:white;
    font-size: 1.3rem;
  }

  }
</style>

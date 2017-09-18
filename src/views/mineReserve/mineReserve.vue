<template>
  <div class="mineReserve" v-if="openId">

    <tab active-color="#e6a914" :line-width="2" :line-height="2" class="hb" custom-bar-width="50px" v-if="showTab">
      <tab-item :selected="chooseIndex===0" @on-item-click="onItemClick" class="hb_tab">业务支援</tab-item>
      <tab-item :selected="chooseIndex===1" @on-item-click="onItemClick" class="hb_tab">增值服务</tab-item>
    </tab>

    <div class="back_btn" @click="back1" v-if="showChoose">收起筛选</div>
    <div :class="{header:showTab,header_new:!showTab}" v-if="showTab">
      <div class="header_left" @click="choose"><span style="font-size: 1.3rem">筛选</span>
        <img :src="icon" class="icon"/></div>
      <input class="header_right" v-model="inputData" placeholder="请输入申请编号或客户姓名" @keyup="screen" />
    </div>

    <div class="choose" v-if="showChoose">
      <div v-if="chooseIndex===0">
        <div class="title">类型</div>
        <div class="type">
          <div :class="{notActive:item.notActive,active:!item.notActive}" v-for="(item,index) in supportType"
               @click="typeChange(index)">{{item.meaning}}
          </div>
        </div>
      </div>

      <div class="title">状态</div>
      <div class="type" v-if="chooseIndex===0">
        <div :class="{notActive:item.notActive,active:!item.notActive}" v-for="(item,index) in status"
             @click="stateChange(index)">{{item.meaning}}
        </div>
      </div>
      <div class="type" v-if="chooseIndex===1">
        <div :class="{notActive:item.notActive,active:!item.notActive}" v-for="(item,index) in statusList"
             @click="stateChange1(index)">{{item.meaning}}
        </div>
      </div>

      <!-- 按钮-->
      <div class="button_type">
        <div class="button_left" @click="clearAll">重置</div>
        <div class="button_right" @click="screen">查询</div>
      </div>
    </div>

    <scroller v-model="scrollerStatus" height="-95" lock-x scrollbar-y ref="scroller" :bounce="isbounce" :use-pullup="showUp"
              :pullup-config="upobj" @on-pullup-loading="loadMore" v-if="showScroller">
      <div>
      <div v-if="showList">
        <div class="detail" v-for="(item,index) in list" @click="goDetail1(index)">
          <div class="first">{{item.supportType}}</div>
          <div class="first_other">申请人：{{item.createrName}}</div>
          <div class="first_other">开始时间：{{item.startFrom}}</div>
          <div><span class="first_other">状态：</span><span :class="item.class">{{item.status}}</span><span
            style="float: right;margin-right: 10px" v-if="item.amount>0">￥{{item.amount}}</span></div>
        </div>
      </div>

      <div v-if="showAddList">
        <div class="detail" v-for="(item,index) in list" @click="goDetail2(index)">
          <div class="first">{{item.itemName}}</div>
          <div class="first_other">客户姓名：{{item.applicant}}</div>
          <div class="first_other">预约时间：{{item.reserveDate}}</div>
          <div class="first_other"><span>状态：</span><span :class="item.class">{{item.statusDesc}}</span></div>
        </div>
      </div>

      </div>
    </scroller>


  </div>
</template>

<script type="text/ecmascript-6">
  import {Tab,TabItem,Loading,Scroller} from 'vux';
  export default {
    components: {
      Tab, TabItem, Loading, Scroller
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
        document.setTitle('我的预约');
      }, 1);
    },
    data(){
      return {
        list: [],
//        serviceList:[],
        openId:'',
        status: [],  //业务支援状态
        statusList: [],  //增值服务状态
        supportType: [],  //业务支援类型
        showList: true,
        icon: require('../../assets/support/icon_pull.png'),
        showAddList: false,
        showChoose: false,
        showTab: true,
        channelId: null,
        chooseIndex: 0,
        inputData: null,
        screen1: {},
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
        showScroller:true,
        total: null,
        scrollerStatus: {
          pullupStatus: 'default'
        }
      }
    },
    mounted(){
      if (window.localStorage.wechatOpenid !==window.localStorage.openid) {

      }else {
        var vm = this;
        vm.openId = window.localStorage.wechatOpenid;
        vm.channelId = JSON.parse(window.localStorage.userInfo).user.relatedPartyId;
        vm.$vux.loading.show({text: 'loading'});
        vm.$nextTick(() => {
          vm.$refs.scroller.reset();
        })
        vm.$post('/api/clb/common/clbCode', {
          "status": "COURSE.SUPPORT_STATUS",
          "supportType": "COURSE.SUPPORT_TYPE",
          "statusList": "ORD.VALUEADD_STATUS"
        }).then(function (response) {
          vm.status = JSON.parse(response).status;
          vm.supportType = JSON.parse(response).supportType;
          vm.statusList = JSON.parse(response).statusList;
          for (let i in vm.supportType) {
            vm.$set(vm.supportType[i], 'notActive', true);
          }
          for (let i in vm.status) {
            vm.$set(vm.status[i], 'notActive', true);
          }
          for (let i in vm.statusList) {
            vm.$set(vm.statusList[i], 'notActive', true);
          }
          vm.screen1 = {
            "page": 1,
            "pageSize": 20,
//        "relatedPartyId": vm.channelId
          };

          vm.$post('/api/support/query?page=1&pageSize=20',
            vm.screen1
          ).then(function (response) {
            vm.$vux.loading.hide();
            if (response.total === 0) {
              vm.$vux.toast.show({text: '暂无数据'});
            }
            vm.total = response.total;
            vm.list = response.rows;
            vm.scrollerStatus.pullupStatus = 'default'
            vm.$nextTick(() => {
              vm.$refs.scroller.reset()
            })
            for (let i in vm.list) {
              for (let j in vm.supportType) {
                if (vm.list[i].supportType === vm.supportType[j].value) {
                  vm.list[i].supportType = vm.supportType[j].meaning;
                }
              }
              for (let j in vm.status) {
                if (vm.list[i].status === vm.status[j].value) {
                  vm.list[i].status = vm.status[j].meaning;
                }
              }
            }
            for (let i in vm.list) {
              if (vm.list[i].status === '审核中') {
                vm.$set(vm.list[i], 'class', 'waitPay');
              }
              if (vm.list[i].status === '取消申请') {
                vm.$set(vm.list[i], 'class', 'cancel');
              }
              if (vm.list[i].status === '申请成功') {
                vm.$set(vm.list[i], 'class', 'success');
              }
              if (vm.list[i].status === '待支付') {
                vm.$set(vm.list[i], 'class', 'waitPay');
              }
              if (vm.list[i].status === '已支付') {
                vm.$set(vm.list[i], 'class', 'waited');
              }
              if (vm.list[i].status === '申请失败') {
                vm.$set(vm.list[i], 'class', 'failed');
              }

            }
          }, function (response) {
            console.log('接口出错了');
          });

        }, function (response) {
          console.log('接口出错了');
        })
      }
    },
    methods: {
      onItemClick(index){
        var vm = this;
        vm.$vux.loading.show({text:'loading'});
        vm.$refs.scroller.reset({top: 0});
        vm.chooseIndex = index;
        if (vm.chooseIndex === 0) {
          vm.screen1 = {
            "page": 1,
            "pageSize": 20,
//              "relatedPartyId": vm.channelId
          };
          vm.$post('/api/support/query?page=1&pageSize=20',
            vm.screen1
          ).then(function (response) {
              vm.$vux.loading.hide();
              if(response.total===0){
                vm.$vux.toast.show({text:'暂无数据'});
              }
              vm.total = response.total;
              vm.showList = true;
              vm.showAddList = false;
              vm.list = response.rows;

              for (let i in vm.list) {
                for (let j in vm.supportType) {
                  if (vm.list[i].supportType === vm.supportType[j].value) {
                    vm.list[i].supportType = vm.supportType[j].meaning;
                  }
                }
                for (let j in vm.status) {
                  if (vm.list[i].status === vm.status[j].value) {
                    vm.list[i].status = vm.status[j].meaning;
                  }
                }
                for (let i in vm.list) {
                  if (vm.list[i].status === '审核中') {
                    vm.$set(vm.list[i], 'class', 'waitPay');
                  }
                  if (vm.list[i].status === '取消申请') {
                    vm.$set(vm.list[i], 'class', 'cancel');
                  }
                  if (vm.list[i].status === '申请成功') {
                    vm.$set(vm.list[i], 'class', 'success');
                  }
                  if (vm.list[i].status === '待支付') {
                    vm.$set(vm.list[i], 'class', 'waitPay');
                  }
                  if (vm.list[i].status === '已支付') {
                    vm.$set(vm.list[i], 'class', 'waited');
                  }
                  if (vm.list[i].status === '申请失败') {
                    vm.$set(vm.list[i], 'class', 'failed');
                  }

                }
              }
              vm.scrollerStatus.pullupStatus = 'default'
              vm.$nextTick(() => {
                vm.$refs.scroller.reset();
              })

            }, function (response) {
              vm.$vux.loading.hide();
              console.log('接口出错了');
            })
        }
        if (vm.chooseIndex === 1) {
          vm.$vux.loading.show({text:'loading'});
          vm.screen1 = {
            "page": 1,
            "pageSize": 20,
//              "channelId": vm.channelId,
            "orderType": "VALUEADD",
          };
          vm.showList = false;
          vm.$post('/api/ordOrder/queryPersonal?page=1&pageSize=20',
            vm.screen1
          ).then(function (response) {
              vm.$vux.loading.hide();
              if(response.total===0){
                vm.$vux.toast.show({text:'暂无数据'});
              }
              vm.total = response.total;
              vm.showAddList = true;
              vm.showList = false;
              vm.list = response.rows;

              for (let i in vm.list) {
                if (vm.list[i].statusDesc === '预约资料审核中') {
                  vm.$set(vm.list[i], 'class', 'waitPay');
                }
                if (vm.list[i].statusDesc === '取消预约') {
                  vm.$set(vm.list[i], 'class', 'cancel');
                }
                if (vm.list[i].statusDesc === '预约成功') {
                  vm.$set(vm.list[i], 'class', 'success');
                }
                if (vm.list[i].statusDesc === '待支付') {
                  vm.$set(vm.list[i], 'class', 'waitPay');
                }
                if (vm.list[i].statusDesc === '需复查') {
                  vm.$set(vm.list[i], 'class', 'waited');
                }
              }

              vm.scrollerStatus.pullupStatus = 'default'
              vm.$nextTick(() => {
                vm.$refs.scroller.reset()
              });

            }, function (response) {
              vm.$vux.loading.hide();
              console.log('接口出错了')
            })
        }


      },
      choose(){
        var vm = this;
        vm.showTab = false;
        vm.showList = false;
        vm.showAddList = false;
        vm.showScroller=false;
        vm.showChoose = true;
      },

      typeChange(index){
        var vm = this;
//        for (let i in vm.supportType) {
//          vm.supportType[i].notActive = true;
//        }
//        vm.supportType[index].notActive = false;
        if(!vm.supportType[index].notActive){
          vm.supportType[index].notActive=true;
        }else{
          for(let i in vm.supportType){
            vm.supportType[i].notActive=true;
          }
          vm.supportType[index].notActive=false;
        }
      },
      stateChange(index){
        var vm = this;
        if(!vm.status[index].notActive){
          vm.status[index].notActive=true;
        }else{
          for (let i in vm.status) {
            vm.status[i].notActive = true;
          }
          vm.status[index].notActive = false;
        }

      },
      stateChange1(index){
        var vm = this;
        if(!vm.statusList[index].notActive){
          vm.statusList[index].notActive=true;
        }else{
          for (let i in vm.statusList) {
            vm.statusList[i].notActive = true;
          }
          vm.statusList[index].notActive = false;
        }

      },
      clearAll(){
        var vm = this;
        vm.inputData = null;
        if (vm.chooseIndex === 0) {
          for (let i in vm.supportType) {
            vm.supportType[i].notActive = true;
          }
          for (let i in vm.status) {
            vm.status[i].notActive = true;
          }
        }
        if (vm.chooseIndex === 1) {
          for (let i in vm.statusList) {
            vm.statusList[i].notActive = true;
          }
        }


      },
      screen(){
        var vm = this;
        vm.$vux.loading.show({text:'loading'});
        vm.showScroller=true;
        if (vm.chooseIndex === 0) {
          var status = null;
          var supportType = null;
          for (let i in vm.status) {
            if (vm.status[i].notActive === false) {
              status = vm.status[i].value;
            }
          }
          for (let i in vm.supportType) {
            if (vm.supportType[i].notActive === false) {
              supportType = vm.supportType[i].value;
            }
          }
          vm.screen1 = {
            "page": 1,
            "pageSize": 20,
            "status": status,
            "supportNum": vm.inputData,
            "supportType": supportType
          };
          vm.$post('/api/support/query?page=1&pageSize=20'
            , vm.screen1
          ).then(function (response) {
              vm.$vux.loading.hide();
              if(response.total===0){
                vm.$vux.toast.show({text:'暂无数据'});
              }
              vm.total = response.total;
              vm.showTab = true;
              vm.showChoose = false;
              vm.showList = true;
              vm.showAddList = false;
              vm.$refs.scroller.reset({top: 0});
              vm.list = response.rows;

              for (let i in vm.list) {
                for (let j in vm.supportType) {
                  if (vm.list[i].supportType === vm.supportType[j].value) {
                    vm.list[i].supportType = vm.supportType[j].meaning;
                  }
                }
                for (let j in vm.status) {
                  if (vm.list[i].status === vm.status[j].value) {
                    vm.list[i].status = vm.status[j].meaning;
                  }
                }
                for (let i in vm.list) {
                  if (vm.list[i].status === '审核中') {
                    vm.$set(vm.list[i], 'class', 'waitPay');
                  }
                  if (vm.list[i].status === '取消申请') {
                    vm.$set(vm.list[i], 'class', 'cancel');
                  }
                  if (vm.list[i].status === '申请成功') {
                    vm.$set(vm.list[i], 'class', 'success');
                  }
                  if (vm.list[i].status === '待支付') {
                    vm.$set(vm.list[i], 'class', 'waitPay');
                  }
                  if (vm.list[i].status === '已支付') {
                    vm.$set(vm.list[i], 'class', 'waited');
                  }
                  if (vm.list[i].status === '申请失败') {
                    vm.$set(vm.list[i], 'class', 'failed');
                  }

                }

              }

              vm.scrollerStatus.pullupStatus = 'default'
              vm.$nextTick(() => {
                vm.$refs.scroller.reset()
              })

            }, function (response) {
              vm.$vux.loading.hide();
              console.log('接口出错了');
            })
        }

        if (vm.chooseIndex === 1) {
          vm.$vux.loading.show({text:'loading'});
          var statusList = null;
          for (let i in vm.statusList) {
            if (vm.statusList[i].notActive === false) {
              statusList = vm.statusList[i].value;
            }
          }
          vm.screen1 = {
            "applicant": vm.inputData,
            "orderType": "VALUEADD",
            "status": statusList,
            "page": 1,
            "pageSize": 20
          };
          vm.$post('/api/ordOrder/queryPersonal?page=1&pageSize=20',
            vm.screen1
          ).then(function (response) {
              vm.total = response.total;
              vm.$vux.loading.hide();
              if(response.total===0){
                vm.$vux.toast.show({text:'暂无数据'});
              }
              vm.showTab = true;
              vm.showChoose = false;
              vm.showList = false;
              vm.showAddList = true;
              vm.$refs.scroller.reset({top: 0});
              vm.list = response.rows;
              for (let i in vm.list) {
                if (vm.list[i].statusDesc === '预约资料审核中') {
                  vm.$set(vm.list[i], 'class', 'waitPay');
                }
                if (vm.list[i].statusDesc === '取消预约') {
                  vm.$set(vm.list[i], 'class', 'cancel');
                }
                if (vm.list[i].statusDesc === '预约成功') {
                  vm.$set(vm.list[i], 'class', 'success');
                }
                if (vm.list[i].statusDesc === '待支付') {
                  vm.$set(vm.list[i], 'class', 'waitPay');
                }
                if (vm.list[i].statusDesc === '需复查') {
                  vm.$set(vm.list[i], 'class', 'waited');
                }
              }
              vm.scrollerStatus.pullupStatus = 'default'
              vm.$nextTick(() => {
                vm.$refs.scroller.reset()
              })


            }, function (response) {
              vm.$vux.loading.hide();
              console.log("接口出错了");
            })
        }
      },
      loadMore(){
        var vm = this;
        if (vm.list.length === vm.total) {
          vm.$vux.loading.hide();
          vm.$vux.toast.show({text:'已经到底了'});
          vm.scrollerStatus.pullupStatus = 'disabled' // 禁用下拉
        } else {
          vm.$vux.loading.show({text:'loading'});
          var page = ++vm.screen1.page;
          if (vm.chooseIndex === 0) {
            vm.$post('/api/support/query?page=' + page + '&pageSize=20'
              , vm.screen1
            ).then(function (response) {
                vm.$vux.loading.hide();
                if(response.total===0){
                  vm.$vux.toast.show({text:'暂无数据'});
                }
                vm.showTab = true;
                vm.showChoose = false;
                vm.showList = true;
                vm.showAddList = false;
                for (let i in response.rows) {
                  for (let j in vm.supportType) {
                    if (response.rows[i].supportType === vm.supportType[j].value) {
                      response.rows[i].supportType = vm.supportType[j].meaning;
                    }
                  }
                  for (let j in vm.status) {
                    if (response.rows[i].status === vm.status[j].value) {
                      response.rows[i].status = vm.status[j].meaning;
                    }
                  }
                }
                vm.list = vm.list.concat(response.rows);

                for (let i in vm.list) {
                  if (vm.list[i].status === '审核中') {
                    vm.$set(vm.list[i], 'class', 'waitPay');
                  }
                  if (vm.list[i].status === '取消申请') {
                    vm.$set(vm.list[i], 'class', 'cancel');
                  }
                  if (vm.list[i].status === '申请成功') {
                    vm.$set(vm.list[i], 'class', 'success');
                  }
                  if (vm.list[i].status === '待支付') {
                    vm.$set(vm.list[i], 'class', 'waitPay');
                  }
                  if (vm.list[i].status === '已支付') {
                    vm.$set(vm.list[i], 'class', 'waited');
                  }
                  if (vm.list[i].status === '申请失败') {
                    vm.$set(vm.list[i], 'class', 'failed');
                  }

                }
                vm.scrollerStatus.pullupStatus = 'default'
                vm.$nextTick(() => {
                  vm.$refs.scroller.reset()
                })

              }, function (response) {
                console.log('接口出错了');
              })
          }
          if (vm.chooseIndex === 1) {
            vm.$post('/api/ordOrder/queryPersonal?page=' + page + "&pageSize=20",
              vm.screen1
            ).then(function (response) {
                vm.$vux.loading.hide();
                vm.showTab = true;
                vm.showChoose = false;
                vm.showList = false;
                vm.showAddList = true;
                vm.list = vm.list.concat(response.rows);

                for (let i in vm.list) {
                  if (vm.list[i].statusDesc === '预约资料审核中') {
                    vm.$set(vm.list[i], 'class', 'waitPay');
                  }
                  if (vm.list[i].statusDesc === '取消预约') {
                    vm.$set(vm.list[i], 'class', 'cancel');
                  }
                  if (vm.list[i].statusDesc === '预约成功') {
                    vm.$set(vm.list[i], 'class', 'success');
                  }
                  if (vm.list[i].statusDesc === '待支付') {
                    vm.$set(vm.list[i], 'class', 'waitPay');
                  }
                  if (vm.list[i].statusDesc === '需复查') {
                    vm.$set(vm.list[i], 'class', 'waited');
                  }
                }
                vm.scrollerStatus.pullupStatus = 'default'
                vm.$nextTick(() => {
                  vm.$refs.scroller.reset()
                })


              }, function (response) {
                vm.$vux.loading.hide();
                console.log("接口出错了");
              })
          }
        }
      },
      goDetail1(index){
        var vm = this;
//        vm.$store.commit('assignmentSupportId', {param: vm.list[index].supportId});
        vm.$router.push({path: '/supportDetail',query:{'supportId':vm.list[index].supportId}});
      },
      goDetail2(index){
        var vm = this;
//        vm.$store.commit('assignmentOrderId', {param: vm.list[index].orderId});
        vm.$router.push({path: '/reserveDetail',query:{'orderId': vm.list[index].orderId}});
      },
      back1(){
        var vm=this;
        vm.showChoose=false;
        vm.showTab = true;
        vm.showScroller=true;
        if(vm.chooseIndex===0){
          vm.showList = true;
        }else{
          vm.showAddList=true;
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
    /*touch-action: none;*/
    padding: 0px;
    margin: 0px;
  }

  .mineReserve {
    min-height: 100%;
    position: absolute;
    background-color: #F4F4F7;
    width: 100%;

  .refresh {
    width: 100%;
    text-align: center;
    font-size: 1.3rem;
    letter-spacing: 2px;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .hb {
    position: fixed;
    height: 45px !important;
    width: 100% !important;
    box-shadow: 1px 3px rgba(200, 199, 204, 0.6);
    color: #333333 !important;
    z-index: 20;
  }

  .hb_tab {
    font-size: 1.4rem !important;
    background-size: 2px !important;
    line-height: 50px !important;

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
    line-height: 1.5;
    height: 3.35rem;
    text-align: center;
    border-radius: 5px;
  }

  .header_right {
    display: inline-block;
    width: calc(~ "80% - 2rem");
    background-color: white;
    border: 0px;
    line-height: 2.5;
    height: 3.25rem;
    padding-left: 10px;
    outline: none;
    border-radius: 5px;
    /*font-size: 1.3rem;*/
  }

  .detail {
    margin: 1rem;
    min-height: 5rem;
    background-color: white;
    line-height: 2;
  }

  .first {
    font-size: 1.7rem;
    margin-left: 0.5rem;
  }
  .first_other{
    margin-left: 0.5rem;
  }

  .success {
    color: #50C55D;
  }

  .failed {
    color: #FF5050;
  }

  .cancle {
    color: #B0B0B0;
  }

  .waitPay {
    color: #72CDFC;
  }

  .waited {
    color: #E6A914;
  }

  .right {
    float: right;
    margin-right: 1rem;
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
    width:30vw;
    height: 3rem;
    margin:1.6%;
    line-height: 2.5;
    text-align: center;
  }

  .active {
    background-color: #E6A914;
    color: white;
    display: inline-block;
    width: 30vw;
    height: 3rem;
    margin: 1.6%;
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
    margin: 4.5%;
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
  }
</style>

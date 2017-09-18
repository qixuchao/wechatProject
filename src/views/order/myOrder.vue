<template>
  <div class="myOrder" v-if="openId">
    <scroller v-model="scrollerStatus"  lock-x scrollbar-y ref="scroller" :bounce="isbounce"
              :use-pullup="showUp" :pullup-config="upobj" @on-pullup-loading="loadMore">
      <div>
        <div v-for="(item,index) in detailList" @click="goDetail(index)">
          <div class="orderList">
            <div class="header">
              <span>{{item.submitDate}}</span>
              <span>{{item.statusDesc}}</span>
            </div>
            <div class="content">
              <div class="imgIcon">
                <img :src="item.prdSupplierFilePath">
              </div>
              <div class="desc">
                <div class="orderDesc">
                  <span>{{item.itemName}}<span style="margin-left: 5px">{{item.sublineItemName}}</span></span>
                </div>
                <div class="orderDesc">
                  <span>投保人:{{item.applicant}}</span>
                </div>
                <div class="orderDesc">
                  <span>被保人:{{item.insurant}}</span>
                </div>
                <div class="orderDesc">
                  <span>保险期间:{{item.sublineItem1}}</span>
                </div>
              </div>
            </div>
            <div class="footer">
              <span class="borderSpan" v-if="item.renewalFlag==='Y'">待续保</span>

              <div class="insuranceMoney">
                <span>保险总额:{{item.yearPayAmount}}{{item.currency}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Scroller} from 'vux';
  export default {
    components:{
      Scroller
    },
    beforeCreate(){
      this.openId = '';
    },
    created(){
        document.setTitle = function (t) {
          document.title = t;
          var i = document.createElement('iframe');
          i.src = '//m.baidu.com/favicon.ico';
          i.style.display = 'none';
          i.onload = function () {
            setTimeout(function () {
              i.remove();
            }, 9)
          }
          document.body.appendChild(i);
        }

        setTimeout(function () {
          document.setTitle('我的订单');
        }, 1);
  },
    data () {
    return {
      stateList: [],  //保单状态
      currencyList: [], //币种
      customerId: null,
      screen1: {},
      openId:'',
      refresh: false,
      detailList: [],
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
      }
    }
  },
  mounted(){
    if(window.localStorage.wechatOpenid !==window.localStorage.openid){
    }else {
      var vm = this;
      vm.openId = window.localStorage.wechatOpenid;
      vm.customerId = JSON.parse(window.localStorage.userInfoc).user.relatedPartyId;
      Date.prototype.format = function (format) {   //格式化时间
        var o = {
          "M+": this.getMonth() + 1, //month
          "d+": this.getDate(), //day
          "h+": this.getHours(), //hour
          "m+": this.getMinutes(), //minute
          "s+": this.getSeconds(), //second
          "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
          "S": this.getMilliseconds() //millisecond
        }
        if (/(y+)/.test(format)) {
          format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        for (var k in o) {
          if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
          }
        }
        return format;
      };
      vm.$vux.loading.show({text: 'loading'});
      vm.$nextTick(() => {
        vm.$refs.scroller.reset()
      })
      vm.$post('/api/clb/common/clbCode', {
        "orderStatusList": "ORD.ORDER_STATUS",
        "currencyList": "PUB.CURRENCY"
      }).then(function (response) {
        vm.stateList = JSON.parse(response).orderStatusList;
        vm.currencyList = JSON.parse(response).currencyList;
        vm.screen1 = {
          "customerId": vm.customerId,
          "dateType": "RESERVE",
          "orderType": "INSURANCE",
          "page": 1,
          "pageSize": 20
        };
        vm.$post('/api/ordOrder/query?page=1&pageSize=20',
          vm.screen1
        ).then(function (response) {
          vm.$vux.loading.hide();
          if (response.total === 0) {
            vm.$vux.toast.show({text: '暂无数据'});
          }
          vm.total = response.total;
          vm.detailList = response.rows;
          vm.scrollerStatus.pullupStatus = 'default'
          vm.$nextTick(() => {
            vm.$refs.scroller.reset()
          })
          var url = vm.$store.getters.getPictureUrl;
          for (let i of vm.detailList) {
            if (i.submitDate !== null || i.submitDate !== '') {
              let time = new Date(i.submitDate.replace(/-/g, '/'));
              i.submitDate = time.format('yyyy-MM-dd');
            }
            i.prdSupplierFilePath = url + i.prdSupplierFilePath;
            if (i.sublineItemName != null) {
              let num = Number(i.sublineItemName);
              if (!isNaN(num)) {
                i.sublineItemName = '(' + num + '年' + ')';
                vm.$set(i, 'sublineItem1', num + '年');
              }
            } else {
              i.sublineItemName = '';
            }
            for (let j in vm.currencyList) {
              if (i.currency === vm.currencyList[j].value) {
                i.currency = vm.currencyList[j].meaning;
              }
            }
          }
        }, function (response) {
          console.log("接口出错了");
        })
      })
    }
  },
  methods:{
    goDetail:function (index) {
      var vm=this;
      vm.$router.push({path:'/orderInfo',query:{orderId:vm.detailList[index].orderId}});
    }
  ,
    loadMore()
    {
      var vm = this;
      if (vm.total === vm.detailList.length) {
        vm.$vux.toast.show({text:'已经到底了'});
        vm.scrollerStatus.pullupStatus = 'disabled' // 禁用下拉
      } else {
        vm.$vux.loading.show({text:'loading'});
        var page = ++vm.screen1.page;
        vm.$post('/api/ordOrder/query?page=' + page + '&pageSize=20',
          vm.screen1
        ).then(function (response) {
            vm.$vux.loading.hide();
            if(response.total===0){
              vm.$vux.toast.show({text:'暂无数据'});
            }
            vm.total = response.total;
            let data = response.rows;
            vm.scrollerStatus.pullupStatus = 'default'
            vm.$nextTick(() => {
              vm.$refs.scroller.reset()
            })
            var url = vm.$store.getters.getPictureUrl;
            for (let i of data) {
              let time = new Date(i.submitDate.replace(/-/g,'/'));
              i.submitDate = time.format('yyyy-MM-dd');
              i.prdSupplierFilePath = url + i.prdSupplierFilePath;
              if (i.sublineItemName !== null) {
                let num = Number(i.sublineItemName);
                if (!isNaN(num)) {
                  i.sublineItemName = '(' + num + '年' + ')';
                  vm.$set(i, 'sublineItem1', num + '年');
                }
              } else {
                i.sublineItemName = '';
              }
              for (let j in vm.currencyList) {
                if (i.currency === vm.currencyList[j].value) {
                  i.currency = vm.currencyList[j].meaning;
                }
              }
            }
            vm.detailList = vm.detailList.concat(data);
          }, function (response) {
            console.log("接口出错了");
          })
      }
    }
  },
  activated() {
    this.$refs.scroller.reset()
  }
  }
</script>

<style lang="scss">

  .myOrder {

  .orderList {
    margin: 15px;
    padding: 0 10px;
    background: white;
    box-shadow: 0 2px 2px 1px gainsboro;

  .header {
    line-height: 30px;
    width: 100%;
    font-size: 1.5rem;

  span:nth-child(2) {
    float: right;
    color: green;
  }

  }
  .content {
    height: auto;
    width: 100%;
    border-bottom: 1px solid gainsboro;
    font-size: 1.3rem;

  .imgIcon {
    width: 20%;
    text-align: left;
    vertical-align: top;
    display:inline-block;
    img {
      width: 80%;
    }
  }
  .desc {
    width: 78%;
    padding: 0 0 10px;
    display:inline-block;

  .orderDesc {
    display: block;
    line-height: 20px;
  }

  }
  }
  .footer {
    width: 100%;
    line-height: 40px;
    display:inline-block;

  .borderSpan {
    border: 1px solid #E6A914;
    padding: 5px;
    border-radius: 5px;
    color: #E6A914
  }

  .insuranceMoney {
    float: right;
    font-size: 1.5rem;
  }

  }
  }
  }
</style>

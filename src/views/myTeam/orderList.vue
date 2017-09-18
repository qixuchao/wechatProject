<template>
  <div class="orderList">
    <div class="tab">
      <tab :line-width=2 active-color='#E6A914' custom-bar-width="60px" v-model="index">
        <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in tabList" @click.native="checkStatus(item)" :key="index">{{item}}</tab-item>
      </tab>
      <scroller lock-x scrollbar-y use-pullup @on-pullup-loading="loadMore" ref="scroller"  v-model="pullUpValue">
        <div>
          <div class="cardList" v-for="list in orderList">
            <span class="listHead">{{list.item}}</span>
            <div class="desc">
              <span>订单编号:</span>
              <span>{{list.orderNumber}}</span>
            </div>
            <div class="desc">
              <span>投保人:</span>
              <span>{{list.insurant}}</span>
            </div>
            <div class="desc">
              <span>受保人:</span>
              <span>{{list.applicant}}</span>
            </div>
            <div class="desc">
              <span>签单时间:</span>
              <span>{{list.submitDate}}</span>
            </div>
            <div class="desc">
              <span>状态:</span>
              <span>{{list.statusDesc}}</span>
            </div>
          </div>
        </div>
        <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up"
             style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
          <span v-show="pullUpValue.pullupStatus === 'default'" v-if="loadMoreFlag">上拉加载更多数据</span>
          <span v-show="pullUpValue.pullupStatus === 'loading'">
            <spinner type="ios-small"></spinner></span>
        </div>
      </scroller>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Scroller,Spinner,Tab,TabItem} from 'vux';
  export default {
    components:{
      Scroller,Spinner,Tab,TabItem
    },
    created(){
    },
    mounted(){
      this.getCLBCode().then(response=>{
        if(this.status==='signed'){
          this.url = '/api/channel/wcSignOrder';
        }
        this.getListData(false);
      })
    },
    methods: {
      checkStatus(item){
        let _this = this;
        if(item ==='保险'){
          _this.orderType = 'INSURANCE';
        }else if(item ==='债券'){
          _this.orderType = 'BOND';
        }else{
          _this.orderType = 'IMMIGRANT';
        }
        _this.orderList = [];
        _this.page = 0;
        _this.getListData();
      },
      loadMore(){
        this.getListData(true);
      },
      getValue(array,key){
        return array.map(a=>{
          return a.value ===key;
        });
      },
      getCLBCode(){
        return new Promise(resolve=>{
          this.$post('/api/clb/common/clbCode',{orderStatus:'ORD.ORDER_STATUS'}).then(response=>{
            if(response){
              this.userStatus = JSON.parse(response).orderStatus;
              resolve(JSON.parse(response).orderStatus);
            }
          });
        })
      },
      getValue(value){
        if(value ===0){
          return 'year';
        }else if(value ===1){
          return 'month';
        }else if(value ===2){
          return 'week';
        }
      },
      getListData(isLoadMore){
        let _this = this;
        _this.page += 1;
        let param = {
            "channelId": _this.$route.query.item,
            "dateType":_this.getValue(_this.$route.query.timeFlag),
            "orderType": _this.orderType,
            page:_this.page,
            pageSize:10
          };
        let url = `${_this.url}`;
        _this.$post(url,param).then(response=>{
          if(response){
            if(response.success) {
              _this.orderList = _this.orderList.concat(response.rows);
              if (!isLoadMore) {
                if (response.rows.length === 0) {
                  _this.$vux.toast.show('暂无数据！', 'center');
                }else if(response.rows.length<10){
                  _this.$nextTick(() => {
                    _this.$refs.scroller.disablePullup();
                  });
                }else{
                  _this.$nextTick(() => {
                    _this.$refs.scroller.reset();
                  });
                }
              } else {
                if (response.rows.length < 10) {
                  _this.$nextTick(() => {
                    _this.$refs.scroller.reset();
                  });
                  _this.$nextTick(() => {
                    _this.$refs.scroller.disablePullup();
                  });
                  _this.$vux.toast.show('无更多数据！', 'center');
                  _this.loadMoreFlag = false;
                } else {
                  _this.loadMoreFlag = true;
                  _this.pullUpValue.pullupStatus = 'default';
                  _this.$nextTick(() => {
                    _this.$refs.scroller.reset();
                  })
                }
              }
            }
          }
        });
      }
    },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        tabList:['保险','债券','投资移民'],
        demo2:'保险',
        page:0,
        unSignList:['洽谈中','新建','资料审核中','需复查','资料审核通过','预约中','预约成功','到达会所','离开会所'],
        signList:['已签单','批核中','Pending','保单生效','退保处理中','已退保','保险公司拒保','保单失效'],
        orderType:'INSURANCE',
        loadMoreFlag:false,
        orderList:[],
        url:'/api/channel/wcNewOrder',
        status:this.$route.query.status,
        pullUpValue: {
          pullupStatus: 'default'
        },
        userStatus:[]
      }
    }
  }
</script>

<style lang="scss">
  .orderList{
    .cardList{
      padding: 15px;
      border-bottom: 1px solid gainsboro;
      background:white;
      .listHead{
        line-height: 35px;
        font-size: 1.6rem;
      }
      .desc{
        line-height: 25px;
        color: #666;
      }
    }
  }
</style>

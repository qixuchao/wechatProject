<template>
  <div class="planList1">
    <scroller lock-x scrollbar-y use-pullup @on-pullup-loading="loadMore" ref="scroller" v-model="pullUpValue">
       <div>
         <div class="cardList" v-if="status ==='plan'" v-for="list in planList">
           <span class="cardTitle">{{list.itemName}}</span>
           <div class="desc">
             <span>编号:</span>
             <span>{{list.requestNumber}}</span>
           </div>
           <div class="desc">
             <span>投保人:</span>
             <span>{{list.policyHolderName}}</span>
           </div>
           <div class="desc">
             <span>申请时间:</span>
             <span>{{list.requestDate}}</span>
           </div>
           <div class="desc">
             <span>状态:</span>
             <span>{{list.status}}</span>
           </div>
         </div>
         <div class="cardList" v-if="status ==='pending'" v-for="list in planList">
           <span>{{list.orderInfo}}</span>
           <div class="desc">
             <span>保单编号:</span>
             <span>{{list.policyNumber}}</span>
           </div>
           <div class="desc">
             <span>pending事项:</span>
             <span>{{list.applyItem}}&nbsp;{{list.applyClassDesc}}</span>
           </div>
           <div class="desc">
             <span>状态:</span>
             <span>{{list.status}}</span>
           </div>
           <div class="desc">
             <span>最后更新时间:</span>
             <span>{{list.lud}}</span>
           </div>
         </div>
       </div>
      <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up"
           style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
        <span v-show="pullUpValue.pullupStatus === 'default'" v-if="loadMoreFlag">上拉加载更多数据</span>
          <span v-show="pullUpValue.pullupStatus === 'loading'"><spinner
            type="ios-small"></spinner></span>
      </div>
      </scroller>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Scroller,Spinner} from 'vux';
  export default {
    components:{
      Scroller,Spinner
    },
    mounted(){
      if(this.status==='pending'){
        this.url = '/api/ordPending/query';
        let timeFlag = '';
        if(this.$route.query.timeFlag===0){
          timeFlag = 'year';
        }else if(this.$route.query.timeFlag ===1){
          timeFlag = 'month';
        }else{
          timeFlag = 'week'
        }
        this.param = {
          channelId:this.$route.query.item,
          timeFlag: timeFlag
        };
      }
      this.getCLBCode().then(response=>{
        this.getListData(false);
      })
    },
    methods: {
      loadMore(){
        this.getListData(true);
      },
      getCLBCode(){
        return new Promise((resolve)=>{
          let _this = this;
          _this.$post('/api/clb/common/clbCode',{planStatus:'PLN.PLAN_STATUS'}).then(response=>{
            if(response){
              _this.planStatusList = JSON.parse(response).planStatus;
              resolve(true);
            }
          });
        });
      },
      getValue(array,key1){
        return array.filter(a=>{
          return a.value ===key1;
        })[0].meaning;
      },
      getListData(isLoadMore){
        let _this = this;
        _this.page +=1;
        _this.$vux.loading.show({text:'loading'});
        _this.$post(`${_this.url}?page=${_this.page}&pageSize=10`,_this.param).then(response=>{
          _this.$vux.loading.hide();
          if(response){
            if(response.success){
              response.rows.forEach(value=>{
                value.status = _this.getValue(_this.planStatusList,value.status);
                _this.planList.push(value);
              });
              if(!isLoadMore&& _this.planList.length===0){
                _this.$nextTick(() => {
                  _this.$refs.scroller.disablePullup();
                });
                _this.$vux.toast.show('暂无数据！','center');
              }else if(isLoadMore){
                if(response.rows.length<10){
                  _this.$nextTick(() => {
                    _this.$refs.scroller.reset();
                  });
                  _this.$nextTick(() => {
                    _this.$refs.scroller.disablePullup();
                  });
                  _this.$vux.toast.show('无更多数据！','center');
                  _this.loadMoreFlag = false;
                }else{
                  _this.loadMoreFlag = true;
                  _this.pullUpValue.pullupStatus = 'default';
                  _this.$nextTick(() => {
                    _this.$refs.scroller.reset();
                  })
                }
              }
            }
          }
        })
      }
    },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        planList:[],
        planStatusList:[],
        pullUpValue: {
          pullupStatus: 'default'
        },
        url:'/api/plan/queryMyPlanForWX',
        param:{
          timeFlag:this.$route.query.timeFlag,
          channelId:this.$route.query.item
        },
        page:0,
        status:this.$route.query.status,
        loadMoreFlag:false
      }
    }
  }
</script>

<style lang="scss">
  .planList1{
    .cardList{
      padding: 15px 10px;
      border-bottom: 1px solid gainsboro;
      .cardTitle{
        line-height: 30px;
        font-size: 1.7rem;
        color: #333;
      }
      .desc{
        line-height: 20px;
        /* color: #666; */
        width: 100%;
        span:nth-child(1){
          min-width: 14vw;
          display: inline-block;
          text-align-last: justify;
      }
    }
  }
}
</style>

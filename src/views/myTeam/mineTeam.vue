<template>
    <div class="mineTeam">
      <div class="header">
        <div class="cardList">
          <div class="head">
            <span class="name">{{remember.userName}}</span>
            <span v-if="false" class="set" @click="goPage('set',remember)">设置</span>
          </div>
          <span>佣金分成: &nbsp;{{remember.rate1}},{{remember.rate2}},{{remember.rate3}},{{remember.rate4}},{{remember.rate5}},{{remember.rate6}},{{remember.rate7}},{{remember.rate8}},{{remember.rate9}},{{remember.rate10}}</span>
          <span>计划书额度: &nbsp;{{remember.planQuota}}</span>
          <span>签单金额(HKD): &nbsp;{{remember.allSignAmount?remember.allSignAmount:0}}</span>
        </div>
      </div>
      <div class="content">
        <tab :line-width="1" custom-bar-width="60px">
          <tab-item :selected="index ===0" v-for="(item,index) in tabItem" @click.native="getData(item.key)">{{item.value}}</tab-item>
        </tab>
        <div class="tabContent">
          <group>
            <cell
              :title="planCount"
              is-link
               @click.native="goPage('planList1',remember.channelId,'plan')"></cell>
            <cell
              :title="orderCount"
              is-link
              @click.native="goPage('orderList',remember.channelId,'unSing')"></cell>
            <cell
              :title="signCount"
              is-link
              @click.native="goPage('orderList',remember.channelId,'signed')"></cell>
          </group>
          <div class="cell1">
            <group>
              <cell
                :title="pendingCount"
                is-link
                @click.native="goPage('planList1',remember.channelId,'pending')"></cell>
            </group>
          </div>
          <group>
            <cell
              :title="channelInfo"
              is-link
              @click.native="goPage('channelInfo',remember.channelId)"></cell>
          </group>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  const tabItem = [{key:'month',value:'本月'},{key:'week',value:'本周'},{key:'year',value:'今年'}];
  import {Tab,TabItem,Group,Cell} from 'vux';
    export default {
      components:{
        Tab,TabItem,Group,Cell
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
          };
          document.body.appendChild(i);
        };
        setTimeout(function(){
          document.setTitle('我的团队');
        }, 1);
    },
      mounted(){
        this.getData('month');
      },
      methods: {
        goPage(page,item,status){
          this.$router.push({name:page,query:{item:item,status:status,timeFlag:this.timeFlag}});
        },
        getPlanCount(flag){
          let _this = this;
          if(flag==='month'){
            _this.timeFlag = 1;
          }else if(flag ==='week'){
            _this.timeFlag = 2;
          }else{
            _this.timeFlag = 0;
          }
          _this.$post('/api/plan/request/queryMyPlanCount',{timeFlag:_this.timeFlag,channelId:_this.remember.channelId}).then(response=>{
            if(response){
              _this.planCount = `计划书数量(${response})`;
            }else{
              _this.planCount = `计划书数量(0)`;
            }
          })
        },
        getData(value){
          let _this = this,
              param = {
                channelId: _this.remember.channelId,
                dateType: value
              },
              url = '/api/channel/myTeamData';
          _this.$vux.loading.show({text:'loading'});
          _this.$post(url,param).then(response=>{
            _this.getPlanCount(value);
            _this.$vux.loading.hide();
            if(response.success){
              let teamData = response.rows[0];
              _this.orderCount = teamData.newOrderQty?`预约量(${teamData.newOrderQty})`:'预约量(0)';
              _this.signCount = teamData.signQty?`签单量(${teamData.signQty})`:'签单量(0)';
              _this.pendingCount = teamData.pengdingQty?`pending数量(${teamData.pengdingQty})`:'pending数量(0)';
            }
          })
        }
      },
      data () {
        return {
          msg: 'Welcome to Your Vue.js App',
          tabItem:tabItem,
          planCount:'计划书数量',
          orderCount:'预约量',
          signCount:'签单量',
          timeFlag:1,
          pendingCount:'pending数量',
          channelInfo:'渠道详情',
          remember:this.$store.state.passParam
        }
      }
    }
</script>

<style lang="scss">
  .mineTeam{
    .header{
      width:100%;
      .cardList{
        width: 100%;
        background: white;
        padding: 15px 10px;
        box-shadow: 0 3px 3px 1px gainsboro;
        box-sizing: border-box;
        .head{
          line-height: 40px;
          display: flex;
          .name{
            display: inline-block;
          }
          .set{
            display: inline-block;
            float: right;
            position: absolute;
            right: 15px;
            border: 1px solid;
            padding: 0 15px;
            border-radius: 5px;
          }
        }
        span{
          display: block;
          font-size: 1.5rem;
          line-height: 25px;
          &:nth-child(1){
             font-size: 1.8rem;
           }
        }
      }
    }
    .content{
      margin-top:10px;
      .tabContent {
        position: relative;
        .cell1{
          width:100vw;
          margin:10px 0;
        }
        .weui-cell {
          p {
            margin: 0.5em;
          }
        }
        .weui-cells{
          width:100vw;
          margin-top:0;
        }
        .weui-cell_access {
          .weui-cell__ft:after {
            height: 10px;
            width: 10px;
          }
        }
      }
    }
  }
</style>

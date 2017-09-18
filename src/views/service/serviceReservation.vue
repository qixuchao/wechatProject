<template>
  <div class="serviceReservation" v-if="openId">
    <scroller lock-x scrollbar-y use-pullup @on-pullup-loading="loadMore" ref="scroller"  v-model="pullUpValue">
    <div style="padding-bottom:50px">
      <div class="orderList" v-for="serviceList in serviceList">
        <div class="header">
          <span>{{serviceList.itemName}}</span>
          <span>{{serviceList.statusDesc}}</span>
        </div>
        <div class="content">
          <div class="desc" v-if="serviceList.itemId ===1000373">
            <div class="orderDesc">
              <div class="descLabel">预约时间:</div>
              <span>{{serviceList.reserveDate}}</span>
            </div>
            <div class="orderDesc">
              <div class="descLabel">出发地点:</div>
              <span>{{serviceList.departure}}</span>
            </div>
            <div class="orderDesc">
              <div class="descLabel">到达地点:</div>
              <span>{{serviceList.destination}}</span>
            </div>
            <div class="orderDesc">
              <div class="descLabel">乘车联系人电话:</div>
              <span>{{serviceList.reserveContactPhone}}</span>
            </div>
            <div class="orderDesc">
              <div class="descLabel">司机:</div>
              <span>司机信息将在预约时间前一晚以短信方式发送给乘车联系人</span>
            </div>
          </div>
          <div class="desc" v-if="serviceList.itemId === 1000376">
            <div class="orderDesc">
              <div class="descLabel">预约时间:</div>
              <span>{{serviceList.checkinDate}}至{{serviceList.checkoutDate}}</span>
            </div>
            <div v-if="serviceList.commonAddr">
              <div class="orderDesc">
                <div class="descLabel">酒店名称:</div>
                <span>{{serviceList.commonName}}</span>
              </div>
              <div class="orderDesc">
                <div class="descLabel">酒店电话:</div>
                <span>{{serviceList.commonPhoneCode}}-{{serviceList.commonPhone}}</span>
              </div>
              <div class="orderDesc">
                <div class="descLabel">酒店地址:</div>
                <span>{{serviceList.commonAddr}}</span>
              </div>
            </div>
          </div>
          <div class="desc" v-if="serviceList.itemId ===1000375">
            <div class="orderDesc">
              <div class="descLabel">预约时间:</div>
              <span>{{serviceList.reserveDate}}</span>
            </div>
            <div class="orderDesc">
              <div class="descLabel">疫苗种类:</div>
              <span>{{serviceList.sublineItemName}}</span>
            </div>
            <div class="orderDesc">
              <div class="descLabel">疫苗价格:</div>
              <span>{{serviceList.price}}</span>
            </div>
            <div v-if="serviceList.commonAddr">
              <div class="orderDesc">
                <div class="descLabel">诊所名字:</div>
                <span>{{serviceList.commonName}}</span>
              </div>
              <div class="orderDesc">
                <div class="descLabel">诊所电话:</div>
                <span>{{serviceList.commonPhoneCode}}-{{serviceList.commonPhone}}</span>
              </div>
              <div class="orderDesc">
                <div class="descLabel">诊所地址:</div>
                <span>{{serviceList.commonAddr}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="footer" v-if="serviceList.statusDesc!=='取消预约'">
          <div class="borderSpan1" :style="serviceList.statusDesc==='待支付'&&serviceList.statusDesc!=='取消预约'?'width:48%':'width:48%'"><a href="tel:075522918249" style="width:100%;display: inline-block;text-decoration: blink;color: currentColor;">联系客服</a></div>
          <div class="borderSpan1" :style="serviceList.statusDesc==='待支付'&&serviceList.statusDesc!=='取消预约'?'width:48%':'width:48%'" @click="cancelReserve(serviceList)">取消预约</div>
          <!--<div class="borderSpan1" :style="serviceList.statusDesc==='待支付'?'width:31%':'display:none'" @click="goPage('onlinePayment')">立即支付</div>-->
        </div>
        <div class="footer" v-if="serviceList.statusDesc==='取消预约'">
          <div class="borderSpan1" style="width:98%"><a href="tel:075522918249" style="width:100%;display: inline-block;text-decoration: blink;color: currentColor;">联系客服</a></div>
        </div>
      </div>
    </div>
    <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
      <span v-show="pullUpValue.pullupStatus === 'default'" v-if="loadMoreFlag">上拉加载更多数据</span>
    </div>
    </scroller>
    <div v-if="isEvaluation" class="evaluation">
      <group>
        <cell inline-desc="满意度:">
          <rater v-model="data" slot="value"></rater>
        </cell>
      </group>
      <textArea placeholder="备注">
      </textArea>
      <div class="footButton" @click="submitEvaluation()">
        提交评价
      </div>
    </div>
    <div class="bgDrag" v-if="isEvaluation"></div>
    <div>
      <confirm v-model="showConfirm"
               :title="title"
               @on-cancel="onCancel"
               @on-confirm="onConfirm">
        <p style="text-align:center;">{{content}}</p>
      </confirm>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    import {Group,Cell,Rater,Confirm,Scroller} from 'vux';

    export default {
      components:{
        Group,Cell,Rater,Confirm,Scroller
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
          document.setTitle('服务预约');
        }, 1);
        if(window.localStorage.wechatOpenid !==window.localStorage.openid){
        }else {
          this.openId = window.localStorage.wechatOpenid;
          this.getServiceList(false);
        }
      },
      data () {
        return {
          isPay:false,
          isEvaluation:false,
          data:0,
          page:0,
          openId:window.localStorage.wechatOpenid ===window.localStorage.openid,
          showConfirm:false,
          content:'确认取消预约该订单吗?',
          title:'',
          pullUpValue: {
            pullupStatus: 'default'
          },
          loadMoreFlag:false,
          serviceList:[],
          passParam:{}
        }
      },
      methods: {
        loadMore(){
          this.getServiceList(true);
        },
        cancelReserve(item){
          let _this = this;
          _this.passParam = item;
          _this.showConfirm = true;
        },
        getServiceInfo(orderId){
          return new Promise(resolve=>{
            let _this = this;
            _this.$post('/api/ordOrder/query?page=1&pageSize=20',{orderId: orderId}).then(response=>{
              if(response.success){
                resolve(response.rows[0]);
              }
            });
          });
        },
        getServiceList(isLoadMore){
          let _this = this;
          _this.page +=1;
          _this.$vux.loading.show({text:'loading'});
          let url = `/api/ordOrder/query?page=${_this.page}&pageSize=10`;
          _this.$post(url,{orderType: "VALUEADD",customerId:JSON.parse(window.localStorage.userInfoc).user.relatedPartyId})
            .then(response=>{
            _this.$vux.loading.hide();
              if(response){
                if(response.success){
                  _this.serviceList =  _this.serviceList.concat(response.rows);
                  if(isLoadMore) {
                    if (response.rows.length < 10) {
                      _this.$nextTick(() => {
                        _this.$refs.scroller.reset();
                      });
                      _this.loadMoreFlag = false;
                      _this.$vux.toast.text('无更多数据！', 'center');
                      setTimeout(_this.$vux.toast.hide(), 1500);
                      _this.$nextTick(() => {
                        _this.$refs.scroller.disablePullup();
                      });
                    } else {
                      _this.loadMoreFlag = true;
                      _this.pullUpValue.pullupStatus = 'default';
                      _this.$nextTick(() => {
                        _this.$refs.scroller.reset();
                      })
                    }
                  }else if(!isLoadMore){
                    if(response.rows.length===0){
                      _this.$vux.toast.show({text:'暂无数据'});
                      return;
                    }
                    _this.$nextTick(() => {
                      _this.$refs.scroller.reset();
                    });
                    _this.pullUpValue.pullupStatus = 'default';
//                    _this.$nextTick(() => {
//                      _this.$refs.scroller.disablePullup();
//                    });
                  }
                }
              }
          });
        },
        goPage:function(page){
          this.$router.push(page);
        },
        serviceEvaluation:function(){
          let self = this;
          self.isEvaluation = true;
        },
        submitEvaluation:function(){
          let self = this;
          self.isEvaluation = false;
        },
        cancelReservation:function(){
          this.showConfirm = true;
        },
        onCancel:function(){
          this.showConfirm = false;
        },
        onConfirm:function(){
          let _this = this;
          let item = _this.passParam;
          item.__status = "update";
          item.hisDesc = "订单状态变更为取消预约,非常感谢!";
          item.hisStatus = "RESERVE_CANCELLED";
          item.status = "RESERVE_CANCELLED";
          item.orderCreatedBy = null;
          item.noticeItem = null;
          item.channelPhone = null;
          item.channelPhoneCode = null;
          item.key = 0;
          let array = [];
          array.push(item);
          _this.$post('/api/ordOrder/submit',array).then(response=>{
            if(response.success){
              _this.$vux.toast.show({text:'取消预约成功'});
              _this.serviceList = [];
              _this.page = 0;
              _this.getServiceList();
            }else{
              _this.$vux.toast.show({text:'操作失败'});
            }
          });
        }
      }
    }
</script>

<style lang="scss">

  .serviceReservation {
    .orderList {
      padding: 10px;
      margin: 10px 10px 0;
      background: white;
      box-shadow: 0 2px 2px 1px gainsboro;
      .header {
        line-height: 30px;
        width: 100%;
        font-size: 1.7rem;
        border-bottom: 1px solid gainsboro;
        span:nth-child(2) {
          float: right;
          color: green;
        }
      }
      .content {
        height: auto;
        width: 100%;
        padding-top: 10px;
        /* border-bottom: 1px solid gainsboro; */
        font-size: 1.5rem;
        .desc {
          width: 100%;
          padding: 0 0 10px;

          .orderDesc {
            display: block;
            line-height: 20px;
            .descLabel {
              min-width: 23%;
              text-align: justify;
              text-align-last: justify;
              display: inline-block;
            }
          }
        }
      }
      .footer {
        width: 100%;
        line-height: 40px;
        text-align: center;
        font-size: 1.5rem;
        letter-spacing: 1px;
        .borderSpan1{
          line-height: 30px;
          width: 31%;
          background: white;
          color: #E6A914;
          border: 1px solid #E6A914;
          display: inline-block;
        }
      }
    }
    .evaluation{
      position: fixed;
      z-index: 110;
      top: 0;
      background: white;
      padding-bottom: 20px;
      .weui-cells {
        margin-top:0;
        width:100vw;
        &:before{
         border-top:none;
         }
        &:after{
          border-bottom: none;
        }
      }
      .weui-cell{
        margin-left: 5%;
        padding-left: 0;
      }
      .vux-cell-primary{
        display: flex;
        align-items: center;
        flex: 0.3;
      }
      textarea{
        width: 90%;
        margin-left: 5%;
        border: none;
        background: gainsboro;
        min-height: 100px;
        outline: none;
        font-size: 1.5rem;
        line-height: 20px;
        padding: 5px 10px;
        box-sizing: border-box;
      }
      .footButton{
        line-height: 40px;
        width: 100%;
        text-align: center;
        background: #E6A914;
        color: white;
        font-size: 1.6rem;
        letter-spacing: 1px;
        margin-top: 20px;
      }
    }
    .bgDrag{
      position: fixed;
      background: #000;
      z-index: 11;
      opacity: 0.3;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
    .weui-dialog__bd {
      padding: 1.6em 0.8em;
      min-height: 40px;
      font-size: 15px;
      line-height: 1.3;
      word-wrap: break-word;
      word-break: break-all;
      color: #333;
    }
    .weui-dialog__hd {
      padding:0;
    }
    .weui-dialog__btn_primary {
      color: #E6A914;
    }
  }
</style>

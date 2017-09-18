<template>
  <div class="claimsDetail">
    <div class="orderList">
      <div class="header">
        <span>{{afterInfo.item}}</span>
        <span v-if="orderInfo.listStatus==='售后'">{{orderInfo.list.afterStatus}}</span>
        <span v-if="orderInfo.listStatus!=='售后'">{{orderInfo.list.renewalStatus}}</span>
      </div>
      <div class="content">
        <div class="imgIcon">
          <img :src="orderInfo.list.picture" alt="">
        </div>
        <div class="desc">
          <div class="orderDesc" v-if="orderInfo.listStatus==='售后'">
            <div class="descLabel">售后编号:</div>
            <span>{{afterInfo.afterNum}}</span>
          </div>
          <div class="orderDesc">
            <div class="descLabel">保单编号:</div>
            <span>{{afterInfo.policyNumber}}</span>
          </div>
          <div class="orderDesc">
            <div class="descLabel">渠道:</div>
            <span>{{afterInfo.channelName}}</span>
          </div>
          <div class="orderDesc">
            <div class="descLabel">投保人:</div>
            <span>{{afterInfo.insurant}}</span>
          </div>
          <div class="orderDesc">
            <div class="descLabel">被保人:</div>
            <span>{{afterInfo.applicant}}</span>
          </div>
          <div class="orderDesc">
            <div class="descLabel">保额:</div>
            <span>{{afterInfo.policyAmount}}{{afterInfo.currency}}</span>
          </div>
          <div class="orderDesc">
            <div class="descLabel">保费:</div>
            <span>{{afterInfo.yearPayAmount}}{{afterInfo.currency}}</span>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="imgIcon">
        </div>
        <div class="desc" v-if="orderInfo.listStatus==='售后'" style="padding-top: 10px;">
          <div class="orderDesc">
            <div class="descLabel">售后项目:</div>
            <span>{{afterInfo.afterProject}}</span>
          </div>
          <div class="orderDesc">
            <div class="descLabel">项目类型:</div>
            <span>{{afterInfo.afterType}}</span>
          </div>
        </div>
        <div class="desc" v-if="orderInfo.listStatus!=='售后'" style="padding-top: 10px;">
          <div class="orderDesc">
            <div class="descLabel">售后项目:</div>
            <span>续保</span>
          </div>
          <div class="orderDesc" v-if="orderInfo.list.renewalStatus!=='已续保'">
            <div class="descLabel">保费到期日:</div>
            <span>{{afterInfo.renewalDueDate}}</span>
          </div>
          <div class="orderDesc">
            <div class="descLabel">缴费期数:</div>
            <span>{{afterInfo.payPeriods}}</span>
          </div>
          <div class="orderDesc">
            <div class="descLabel">续保金额:</div>
            <span>{{afterInfo.nextPolicyAmount}}</span>
          </div>
          <div class="orderDesc" v-if="orderInfo.list.renewalStatus==='已续保'">
            <div class="descLabel" style="color:red">下期保费到期日:</div>
            <span style="color:red">{{afterInfo.renewalDueDate}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="pending">
      <timeline>
        <timeline-item v-for="(list, index) in logList" :key="index">
          <div class="node" :class="[index === 0 ? 'recent' : '']">
            <span>{{list.statusMeaning}}</span>
            <span>{{list.statusDate}}</span>
          </div>
          <p style="margin: 0;color:#888" :class="[index === 0 ? 'recent' : '']">{{list.content}}</p>
        </timeline-item>
      </timeline>
      <div class="bar">
        <a class="footer" :href="phone">
          联系理财师
        </a>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Timeline,TimelineItem} from 'vux';
  const pendingList = [{
    currentNode:'已交保险公司',
    date:'2017-5-3 18:10:00',
    desc:'您的资料我们已提交给保险公司，请耐心等待'
  },{
    currentNode:'资料审核中',
    date:'2017-5-3 18:10:00',
    desc:'您的资料我们已提交给保险公司，请耐心等待'
  },{
    currentNode:'需补资料',
    date:'2017-5-3 18:10:00',
    desc:'请提供xx年xx月的体检报告副本，请耐心等待'
  }];
  export default {
    components:{
      Timeline,TimelineItem
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
    if(this.orderInfo.listStatus==='售后'){
      setTimeout(function(){
        document.setTitle('售后详情');
      }, 1);
    }else{
      setTimeout(function(){
        document.setTitle('续保详情');
      }, 1);
    }

  },
    mounted(){
      this.getCLBCode().then(response=>{
        if(this.orderInfo.listStatus==='售后'){
          this.getAfterInfo('/api/ordAfter/queryOrderInfoByAfterId',{afterId:this.orderInfo.list.afterId+''});
          this.getLog(this.orderInfo.list.afterId);
          this.getPending();
        }else{
          this.getAfterInfo('/api/ordAfter/queryOrdInfoByOrderId',{orderId:this.orderInfo.list.orderId+''});
        }
      })
    },
    methods: {
      showPending:function(){
        this.show = !this.show;
      },
      getValue(array,key1){
        return array.filter(a=>{
          return a.value ===key1;
        })[0].meaning;
      },
      getCLBCode(){
        return new Promise(resolve=>{
          let _this = this,
            param = {
              balancePaymentMethodCodes: "ORD.BALANCE_PAY_METHOD",
              payMethodCodes: "CMN.PAY_METHOD",
              currencyCodes: "PUB.CURRENCY",
              afterStatusCodes: "ORD.AFTER_STATUS",
              afterProjectCodes: "ORD.APPLY_CLASS"
            },
            url = '/api/clb/common/clbCode';
          _this.$post(url,param).then(response=>{
            if(response){
              _this.clbCode = JSON.parse(response);
              resolve();
            }
          });
        })
      },
      getAfterInfo(url,param){
        let _this = this;
        _this.$post(url,param).then(response=>{
          _this.afterInfo = response.rows[0];
          _this.phone='tel:'+_this.afterInfo.channelPhoneCode+_this.afterInfo.channelPhone;
          _this.afterInfo.afterStatus = _this.afterInfo.afterStatus?_this.getValue(_this.clbCode.afterStatusCodes, _this.afterInfo.afterStatus):'';
          _this.afterInfo.afterProject = _this.afterInfo.afterProject?_this.getValue(_this.clbCode.afterProjectCodes, _this.afterInfo.afterProject):'';
          _this.afterInfo.currency = _this.afterInfo.currency?_this.getValue(_this.clbCode.currencyCodes, _this.afterInfo.currency):'';
          _this.afterInfo.payPeriods = _this.afterInfo.payPeriods?_this.getValue(_this.clbCode.payMethodCodes, _this.afterInfo.payPeriods):'';
          _this.afterInfo.payMethod = _this.afterInfo.payMethod?_this.getValue(_this.clbCode.balancePaymentMethodCodes, _this.afterInfo.payMethod):'';
        })
      },
      getLog(value){
        let _this = this;
        _this.$post('/api/ordRenewal/queryAfterLog',{generalId:value,idType:'AFTER'}).then(response=>{
          if(response.success){
            _this.getPending().then(data=>{
              response.rows.forEach((value,index)=>{
                value.content = data[index].content;
                _this.logList.push(value);
              })
            });
          }
        })
      },
      getPending(){
        return new Promise(resolve=>{
          let _this = this;
          _this.$post('/api/ordAfter/queryAfterFollow',{afterId:this.orderInfo.list.afterId+''}).then(response=>{
            if(response.success){
              resolve(response.rows);
            }
          });
        });
      }
    },
    data () {
      return {
        rightIcon:require('../../assets/course/icon_right@3x.png'),
        pendingList:pendingList,
        afterInfo:{},
        logList:[],
        orderInfo:this.$route.query,
        show:false,
        phone:null,
        pendingInfo:[]
      }
    }
  }

</script>

<style lang="scss">
  .claimsDetail {
    position: absolute;
    min-height: 100%;
    background: white;
    width:100%;
    .orderList {
      padding: 10px;
      background: white;
      div {
        display: inline-block;
      }

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
          img {
            width: 80%;
          }
        }
        .desc {
          width: 78%;
          padding-bottom:10px;
          .orderDesc {
            display: block;
            line-height: 20px;
            .descLabel {
              min-width: 23%;
              text-align: justify;
              text-align-last: justify;
            }
          }
        }
      }
    }
    .pending{
      width: 100%;
      background: white;
      position: absolute;
      padding-bottom:50px;
      .pendingTitle{
        line-height: 40px;
        text-align: center;
        width: 100%;
        font-size: 1.5rem;
      }
      .node{
        width: 100%;
        line-height: 30px;
        font-size: 1.5rem;
        span:nth-child(2){
          float: right;
          color: #666;
        }
      }
      ul, menu, dir {
        -webkit-padding-start: 20px;
      }
      .vux-timeline {
        padding: 0;
        width: 100%;
      }
      .vux-timeline-item-content {
        padding: 0 1rem 2.5rem 2.2rem;
        width: calc(100% - 4.2rem);
      }
      .timeline-demo {
        p {
          color: #888;
          font-size: 0.8rem;
        }
      }

      a{
        text-decoration: none;
      }
      .bar {
        position: fixed;
        bottom: 0;
        width: 100%;
        background: #fff;
        padding-bottom: 20px;
        z-index: 111;
        text-align: center;
        padding-top: 10px;
        .footer {
          line-height: 45px;
          width: 90%;
          font-size: 1.7rem;
          letter-spacing: 1px;
          color: white;
          background: #E6A914;
          border-radius: 5px;
          display: inline-block;
        }
      }
    }
  }
</style>

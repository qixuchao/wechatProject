<template>
  <div class="performance" v-if="openId">
    <div class="header">
      <div class="icon">
        <img :src="imgIcon" alt="">
      </div>
      <div class="desc1">资深理财师:{{people}}</div>
      <div class="col3">
        <span>生效订单</span>
        <span>{{performanceData.newOrderQty}}</span>
      </div>
      <div class="col3">
        <span>缴费总额(HKD)</span>
        <span>{{parseInt(performanceData.predictPaymentAmount)/10000}}万</span>
      </div>
      <div class="col3">
        <span>直客收益(HKD)</span>
        <span>{{parseInt(performanceData.predictIncomeAmount)/10000}}万</span>
      </div>
    </div>
    <div class="chartDesc">
      <div class="inputRow">
        <div class="label">业绩情况:</div>
        <group>
          <datetime v-model="value1" format="YYYY-MM" :title="title" :min-year=1900 day-row="" placeholder="请选择"></datetime>
        </group>
      </div>
    </div>
    <divider>业绩走势图</divider>
    <div class="charts">
      <div id="lineChart"  :style="{width:'100vw',height:'300px'}"></div>
    </div>
    <div class="lineLabel">
      <div class="col3">
        <span>缴费总额(万)</span>
      </div>
      <div class="col3">
        <span>签单量(单)</span>
      </div>
      <div class="col3">
        <span>我的收益(万)</span>
      </div>
    </div>
    <div class="tabButton">
      <div :class="type===1?'backgroundClass wholeClass':'borderClass wholeClass'" @click="getData(1)">生效订单</div>
      <div :class="type===2?'backgroundClass wholeClass':'borderClass wholeClass'" @click="getData(2)">直客收益</div>
      <div :class="type===3?'backgroundClass wholeClass':'borderClass wholeClass'" @click="getData(3)">缴费总额</div>
    </div>

    <div class="charts">
      <div id="circleChart"  :style="{width:'100vw',height:'300px'}"></div>
   </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Divider,Group,Datetime} from 'vux';
  export default {
    components:{
      Divider,Group,Datetime
    },
    watch:{
      value1:function(value){
        this.getPerformanceData(value)
      }
    },
    data () {
      return {
        people:JSON.parse(window.localStorage.userInfo).user.userName,
        openId:'',
        msg: 'Welcome to Your Vue.js App',
        title:'',
        value1:'',
        imgIcon:require('../../assets/img/headerIcon.png'),
        type:1,
        performanceData:{},
        anticipatedIncomeData :[],
        orderQtyData:[],
        anticipatedPayAmountData:[],
        anticipatedIncomeData1:[],
        orderQtyData1:[],
        anticipatedPayAmountData1:[]
      }
    },
    beforeCreate(){
      this.openId = '';
    },
    created(){
      if (window.localStorage.wechatOpenid !==window.localStorage.openid) {
      } else {
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
        }
        setTimeout(function(){
          document.setTitle('我的业绩');
        }, 1);
        this.openId = window.localStorage.wechatOpenid;
        this.getPersonalPhoto();
        this.getCurrentData().then(response=> {
        });
      }
    },
    methods: {
      getData(type){
        this.type = type;
        if(type===1){
          this.initCircleChart(this.orderQtyData,this.orderQtyData1);
        }else if(type ===2){
          this.initCircleChart(this.anticipatedIncomeData,this.anticipatedIncomeData1);
        }else if(type ===3){
          this.initCircleChart(this.anticipatedPayAmountData,this.anticipatedPayAmountData1);
        }
      },
      getPersonalPhoto(){
        let _this = this;
        _this.$post('/api/channel/personal/query',{channelId:JSON.parse(window.localStorage.userInfo).user.relatedPartyId})
          .then(response=>{
           if(response.success){
              _this.imgIcon = response.rows[0].photoFilePath?_this.$store.getters.getPictureUrl+ response.rows[0].photoFilePath:_this.imgIcon;
           }
        })
      },
      changeData(value){
        this.getPerformanceData(value)
      },
      getCurrentData(){
        return new Promise(resolve=> {
          let date = new Date(),
            year = date.getFullYear(),
            month = date.getMonth() + 1;
          this.value1 = year + '-' + month;
          resolve(this.value1);
        })
      },
      getPerformanceData(value){
        let _this = this;
        let param = {
            beginMonth: parseInt(value.split('-')[1]),
            beginYear: parseInt(value.split('-')[0]),
            channelId: JSON.parse(window.localStorage.userInfo).user.relatedPartyId,
            classType: "product",
            orderBy: "",
            settingType: "week"
          },
          url = '/api/ordPerformance/query';
        _this.$post(url,param).then(response=>{
            let anticipatedIncomeData = [],
              orderQtyData = [],
              anticipatedPayAmountData  = [];
            _this.anticipatedIncomeData = [];
            _this.orderQtyData = [];
            _this.anticipatedPayAmountData = [];
            _this.anticipatedIncomeData1 = [];
            _this.orderQtyData1 = [];
            _this.anticipatedPayAmountData1 = [];
            if(response.success){
              _this.performanceData = response.rows[0];
              response.rows[0].performanceStatisticsList.forEach((value,item)=>{
                anticipatedIncomeData[item] = (value.anticipatedIncome/10000).toFixed(4);
                orderQtyData[item] = value.orderQty;
                anticipatedPayAmountData[item] = (value.anticipatedPayAmount/10000).toFixed(4);
              });
              response.rows[0].performanceStatisticsPrdList.forEach((value,item)=>{
                let anticipatedIncomeData = {
                  name:value.middleClass?value.middleClass:value.bigClass,
                  value:value.anticipatedIncome
                },
                  orderQtyData = {
                  name:value.middleClass?value.middleClass:value.bigClass,
                  value:value.orderQty
                },
                  anticipatedPayAmountData = {
                  name:value.middleClass?value.middleClass:value.bigClass,
                  value:value.anticipatedPayAmount
                };
                if(value.middleClass) {
                  _this.anticipatedIncomeData.push(anticipatedIncomeData);
                  _this.orderQtyData.push(orderQtyData);
                  _this.anticipatedPayAmountData.push(anticipatedPayAmountData);
                }else{
                  _this.anticipatedIncomeData1.push(anticipatedIncomeData);
                  _this.orderQtyData1.push(orderQtyData);
                  _this.anticipatedPayAmountData1.push(anticipatedPayAmountData);
                }
              });
              _this.initLineChart(anticipatedIncomeData,orderQtyData,anticipatedPayAmountData);
              _this.initCircleChart(_this.orderQtyData,_this.orderQtyData1);
            }
        });
      },
      initLineChart(anticipatedIncomeData,orderQtyData,anticipatedPayAmountData){
        let myChart = this.echart.init(document.getElementById('lineChart'));
        let option = {
          xAxis:  {
            type: 'category',
            boundaryGap: false,
            data: ['第一周','第二周','第三周','第四周','第五周']
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value}'
            },
            axisPointer: {
              snap: true
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          series: [
            {
              type:'line',
              name:'我的收益',
//              symbol:'none',
              lineStyle:{normal:{
                color:'#23B7FC',
                width:2,
                type:'solid'
              }},
              smooth: true,
              data: anticipatedIncomeData
            },
            {
              type:'line',
              name:'签单量',
//              symbol:'none',
              lineStyle:{normal:{
                color:'#33AD69',
                width:2
              }},
              smooth: true,
              data: orderQtyData
            },
            {
              lineStyle:{normal:{
                color:'#FF8080',
                width:2
              }},
              name:'缴费总额',
              type:'line',
//              symbol:'none',
              smooth: true,
              data: anticipatedPayAmountData

            }
          ]
        };
        myChart.setOption(option);
      },
      initCircleChart(value,value1){
        let myChart = this.echart.init(document.getElementById('circleChart'));
        let option = {
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          series: [
            {
              name:'访问来源',
              type:'pie',
              selectedMode: 'single',
              radius: [0, '35%'],
              color:['#FF4100','#FF8E00','#FF8080','#33AD69'],
              label: {
                normal: {
                  position: 'inner'
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:value1
            },
            {
              name:'访问来源',
              type:'pie',
              radius: ['50%', '70%'],
              color:['#FF9773','#FFC173','#BF9A30','#FF8E00'],
              data:value
            }
          ]
        };
        myChart.setOption(option);
      }
    }
  }
</script>

<style lang="scss">
  .performance{
    position: absolute;
    background: white;
    min-height: 100%;
    width: 100%;
    .header {
      width: 100%;
      text-align: center;
      margin-top: 30px;

      .icon {
        width: 100%;
        padding: 10px 0;

        img {
          width: 25vw;
          height: 25vw;
          border-radius: 50%;
        }
      }
      .desc1 {
        line-height: 30px;
        font-size: 1.8rem;
        color: #000;
      }

      .desc2 {
        line-height: 20px;
        font-size: 1.4rem;
        color: #999;
      }

      .col3 {
        width: 32%;
        display: inline-block;

        span:nth-child(1) {
          display: block;
          line-height: 35px;
          font-size: 1.7rem;
        }
        span:nth-child(2) {
          color: #666;
        }
      }
    }
    .chartDesc{
      line-height: 40px;
      background: gainsboro;
      padding-left: 15px;
      margin-top:15px;
      .inputRow{
        height: 40px;
        width: calc(100% - 15px);
        margin-left: 15px;
        position: relative;
        line-height: 40px;
        display: -ms-flexbox;
        display: inline-block;
        vertical-align: middle;
        -ms-flex-align: center;
        border-bottom: 1px solid rgba(233, 233, 233, 0.8);
        .label{
          width: 30%;
          display: inline-block;
          font-size: 1.4rem;
        }
        .weui-cells{
          width: 40%;
          position: absolute;
          top: 5px;
          height: 30px;
          right: 15px;
          line-height: 40px;
          margin: 0;
          background: gainsboro;
        }
        .weui-cell {
          line-height: 0px;
          text-decoration: none;
          width: 100%;
          display: inline-block;
          text-align: right;
          padding: 0;
          font-size: 1.4rem;
        }
        .weui-cells:after{
          border:none;
        }
        .weui-cells:before{
          border:none;
        }
        .vux-cell-box:before{
          border-top:none;
        }
        .vux-popup-picker-select {
          width: 100%;
          position: relative;
          padding-right: 10px;
          box-sizing: border-box;
          font-size: 1.3rem;
          text-align: right !important;
        }
        .weui-cell_access .weui-cell__ft {
          padding-right: 8px;
          position: relative;
          display: inline-block;
          vertical-align: super;
        }
        .weui-cell_access .weui-cell__ft:after{
          display: none;
        }
      }
    }
    .vux-divider{
      font-size: 1.4rem;
      color: #333;
      margin: 0;
      position: absolute;
    }
    .vux-divider:before{
      background-size: 55% 5px;
      background-image: linear-gradient(to left, #E6A914, #fff);
    }
    .vux-divider:after{
      background-size: 55% 5px;
      background-image: linear-gradient(to right, #E6A914, #fff);
    }
    .lineLabel{
      width: calc(100% - 20px);
      margin: -20px 0 0 10px;
      box-sizing: border-box;
      border-bottom: 1px solid gainsboro;
      padding-bottom: 10px;
      .col3{
        display: inline-block;
        width: 32%;
        text-align: center;
        position: relative;
        &:nth-child(1){
        span{
          &::before{
             content: '';
             position: absolute;
             width: 10px;
             height: 10px;
             background: #23B7FC;
             top: 5px;
             margin-left: -15px;
           }
         }
       }
        &:nth-child(2){
        span{
          &::before{
             content: '';
             position: absolute;
             width: 13px;
             height: 13px;
             background: #33AD69;
             top: 3px;
             margin-left: -15px;
           }
          }
        }
        &:nth-child(3){
          span{
            &::before{
               content: '';
               position: absolute;
               width: 10px;
               height: 10px;
               background: #FF8080;
               top: 5px;
               margin-left: -15px;
             }
          }
        }
      }
    }
  .circleLabel{
    position: absolute;
    width: calc(100% - 20px);
    margin: -20px 0 0 10px;
    box-sizing: border-box;
    border-bottom: 1px solid gainsboro;
    padding-bottom: 10px;
  .col3{
    display: inline-block;
    width: 24%;
    text-align: center;
    position: relative;
  &:nth-child(1){
  span{
  &::before{
     content: '';
     position: absolute;
     width: 10px;
     height: 10px;
     background: #23B7FC;
     top: 5px;
     margin-left: -15px;
   }
  }
  }
  &:nth-child(2){
  span{
  &::before{
     content: '';
     position: absolute;
     width: 13px;
     height: 13px;
     background: #33AD69;
     top: 3px;
     margin-left: -15px;
   }
  }
  }
  &:nth-child(3){
  span{
  &::before{
     content: '';
     position: absolute;
     width: 10px;
     height: 10px;
     background: #FF8080;
     top: 5px;
     margin-left: -15px;
   }
  }
  }
  &:nth-child(4){
  span{
  &::before{
     content: '';
     position: absolute;
     width: 10px;
     height: 10px;
     background: #FF8080;
     top: 5px;
     margin-left: -15px;
   }
  }
  }
  }
  }
    .tabButton{
      margin-top: 20px;
      text-align: center;
      line-height: 40px;
      .wholeClass{
        display: inline-block;
        width: 28%;
        text-align: center;
      }
      .borderClass{
        border: 1px solid #E6A914;
        color:#E6A914;
        background: white;
      }
      .backgroundClass{
        color:white;
        background: #E6A914;
      }
    }
    .circleChart{
      position:relative;
    }
    .childProduct{
      width: 40vw;
      display: inline-block;
      position: absolute;
      top: 20%;
      right: 0;
      height: 50vw;
      .div{
        display: flex;
        align-items: center;
        height: 50%;
        .div{
          width: 30px;
          content: '';
          background: red;
          height: 100%;
          display: inline-block;
        }
      }
    }
  }
</style>

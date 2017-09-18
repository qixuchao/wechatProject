<template>
  <div class="compareChart">
    <div class="titleImg">
      <img :src="headerImg" alt="">
      <span class="imgDesc">产品对比详情</span>
    </div>
    <div class="mainDesc">
      <span>{{gender}} &nbsp;&nbsp;{{baseInfo[0].age}}岁&nbsp;&nbsp;{{isSmoking}}&nbsp; &nbsp;{{baseInfo[0].coverage}}{{currency}}</span>
      <div class="compareChart" @click="goPage()">对比表</div>
    </div>
    <div class="imgRow">
      <div class="product">
        <img :src="product1.img" alt="">
        <div class="descText">
          <span class="point"></span>
          {{product1.itemName}}
        </div>
      </div>
      <div class="compare">
        <img :src="compareImg" alt="">
      </div>
      <div class="product">
        <img :src="product2.img" alt="">
        <div class="descText">
          <span class="point" style="background: #ff2525;"></span>
          {{product2.itemName}}
        </div>
      </div>
    </div>
    <div id="charts">
      <div id="main"  :style="{width:'100vw',height:'300px'}"></div>
    </div>
    <div class="compareTable">
      <div class="tableTitle">评分对比</div>
      <div class="compareRow" :style="index%2===0?'':'background: #303441'" v-for="(line,index) in productInfo.scoreList">
        <div class="label">{{line.attrName?line.attrName:'-'}}</div>
        <div class="productOne">{{line.detail1?line.detail1:'-'}}</div>
        <div class="productTwo">{{line.detail2?line.detail2:'-'}}</div>
      </div>
    </div>
    <div class="compareTable" v-for="product in productInfo.scoreList">
      <div class="tableTitle">{{product.attrName}}</div>
      <div class="compareRow" :style="index%2===0?'':'background: #303441'" v-for="(line,index) in product.lineList">
        <div class="label">{{line.attrName?line.attrName:'-'}}</div>
        <div class="productOne">{{line.detail1?line.detail1:'-'}}</div>
        <div class="productTwo">{{line.detail2?line.detail2:'-'}}</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
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
        document.setTitle('雷达图');
      }, 1);
      function isEmptyObject(e) {
        var t;
        for (t in e)
          return true;
        return false;
      };
      var vm=this;
      var url=window.location.href.split('#')[0];
      vm.$configWx(url,['onMenuShareAppMessage','onMenuShareTimeline']);
      var trueUrl=null;
     if(isEmptyObject(vm.$store.state.productInfo)){
       var trueUrl=JSON.stringify(vm.$store.state.productInfo)+"&product1="+JSON.stringify(vm.$store.state.passParam.product1)+"&product2="+JSON.stringify(vm.$store.state.passParam.product2)+"&local="+window.localStorage.wxToken;
       trueUrl=encodeURIComponent(trueUrl);
     }else{
       var url=decodeURIComponent(location.href);
       var i=url.indexOf('?');
       var j=url.indexOf('?',i+1);
       var url1=url.substr(j);
       trueUrl=encodeURIComponent(url1);
     }

      vm.$wechat.ready(function() {
        vm.$wechat.onMenuShareTimeline({
          title: '财联邦', // 分享标题
          link: 'http://weixin.fortunefed.com/#/compareChart?baseInfo='+trueUrl,// 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: '', // 分享图标
          success: function () {
            // 用户确认分享后执行的回调函数
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        });
        vm.$wechat.onMenuShareAppMessage({
          title: '财联邦', // 分享标题
          desc: '', // 分享描述
          link:'http://weixin.fortunefed.com/#/compareChart?baseInfo='+trueUrl,// 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: '', // 分享图标
          type: 'link', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
            // 用户确认分享后执行的回调函数
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        });
      });
    },
      methods: {
        getArrayValue(array,key){
          return array.filter(x=>{
            return x.key ===key;
          })[0].value;
        },
        goPage(){
          this.$router.go(-1);
        },
        getProductInfo(){
          return new Promise((resolve)=> {
            let _this = this,
              url = '/api/public/production/prdRadarChart',
              param = _this.baseInfo;
            _this.$post(url, param).then(response=> {
              if(response.success){
                _this.gender = param[0].gender==='F'?'女':'男';
                _this.isSmoking = param[0].smokeFlag ==='Y'?'吸烟':'不吸烟';
                _this.currency = _this.getArrayValue(_this.baseInfo1.currencies,param[0].currency);
                resolve(response.rows);
              }
            }).catch(error=>{
              console.log(error);
            });
          });
        },
        getArrayMaxValue(array1,array2){
          let a = Math.max.apply(Math,array1);
          let b = Math.max.apply(Math,array2);
          return a>b?a:b;
        },
        initChart(label,data1,data2){
          let myChart = this.echart.init(document.getElementById('main'));
          let maxValue = this.getArrayMaxValue(data1,data2);
          let indicator = [];
          for(let a of label){
            let obj = {
              name:a,
              max:maxValue
            };
            indicator.push(obj);
          }
          let option = {
            tooltip: {},
            background:'none',
            radar: {
              // shape: 'circle',
              indicator: indicator
            },
            series: [{
              type: 'radar',
              label:{
                normal:{
                  formatter: function(params){
                    var newParamsName = "";// 最终拼接成的字符串
                    var paramsNameNumber = params.length;// 实际标签的个数
                    var provideNumber = 5;// 每行能显示的字的个数
                    var rowNumber = Math.ceil(paramsNameNumber / provideNumber);// 换行的话，需要显示几行，向上取整
                    /**
                     * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                     */
                    // 条件等同于rowNumber>1
                    if (paramsNameNumber > provideNumber) {
                      /** 循环每一行,p表示行 */
                      for (var p = 0; p < rowNumber; p++) {
                        var tempStr = "";// 表示每一次截取的字符串
                        var start = p * provideNumber;// 开始截取的位置
                        var end = start + provideNumber;// 结束截取的位置
                        // 此处特殊处理最后一行的索引值
                        if (p == rowNumber - 1) {
                          // 最后一次不换行
                          tempStr = params.substring(start, paramsNameNumber);
                        } else {
                          // 每一次拼接字符串并换行
                          tempStr = params.substring(start, end) + "\n";
                        }
                        newParamsName += tempStr;// 最终拼成的字符串
                      }

                    } else {
                      // 将旧标签的值赋给新标签
                      newParamsName = params;
                    }
                    //将最终的字符串返回
                    return newParamsName
                  }
                }
              },
              data : [
                {
                  lineStyle:{normal:{
                    color:'red',
                    width:2,
                    type:'solid'
                  }},
                  value : data2
                },
                {
                  lineStyle:{normal:{
                    color:'#02A5F2',
                    width:2,
                    type:'solid'
                  }},
                  value : data1}
              ]
            }]
          };
          myChart.setOption(option);
        }
      },
      mounted(){
      function isEmptyObject(e) {
        var t;
        for (t in e)
          return true;
        return false;
      };
      let _this=this;
      if(!isEmptyObject(_this.product1)&&!isEmptyObject(_this.product2)&&!isEmptyObject(_this.baseInfo)&&!isEmptyObject(_this.baseInfo1)){
        var url=decodeURIComponent(location.href);
        var i=url.indexOf('?');
        var j=url.indexOf('?',i+1);
        var url1=url.substr(0,i-1)+url.substr(j);
        var list=url1.split('=');
        var str=list[1];
        var k=str.indexOf('&');
        str=str.substr(0,k);
        _this.baseInfo=JSON.parse(str).params;
        _this.baseInfo1=JSON.parse(str).passPar;
        str=list[2];
        k=str.indexOf('&');
        str=str.substr(0,k);
        _this.product1=JSON.parse(str);
        str=list[3];
        k=str.indexOf('&');
        str=str.substr(0,k);
        _this.product2=JSON.parse(str);
        str=list[4];
        window.localStorage.wxToken=str.toString();

      }
        _this.getProductInfo().then(response=>{
          _this.productInfo = response[0];
          let label = [],
              data1 = [],
              data2 = [];
          for(let value =0;value<_this.productInfo.scoreList.length;value++){
             label[value] = _this.productInfo.scoreList[value].attrName;
             data1[value] = _this.productInfo.scoreList[value].detail1;
             data2[value] = _this.productInfo.scoreList[value].detail2;
          }
          _this.initChart(label,data1,data2);
        });

      },
      data () {
          return {
            product1:this.$store.state.passParam.product1,
            product2:this.$store.state.passParam.product2,
            compareImg:require('./../../assets/img/VS@3x.png'),
            headerImg:require('../../assets/img/bg@2x.png'),
            gender:'',
            isSmoking:'',
            currency:'',
            productInfo:[],
            baseInfo:this.$store.state.productInfo.params,
            baseInfo1:this.$store.state.productInfo.passPar
          }
      }
    }
</script>

<style lang="scss">
  .compareChart {
    .titleImg {
      position: relative;
      img {
        width: 100%;
        height: 18vh;
      }
      .imgDesc{
        position: absolute;
        z-index: 22;
        font-size: 1.8rem;
        color: #555;
        display: flex;
        /* align-items: center; */
        justify-content: center;
        top: 50%;
        right: 34%;
      }
    }
    .mainDesc {
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
      font-size: 1.5rem;
      background: #262A35;
      color:white;
      span {
        display: inline-block;
        vertical-align: -webkit-baseline-middle;
      }
      .compareChart {
        float: right;
        background: #02A5F2;
        color: white;
        font-size: 1.4rem;
        padding: 5px;
      }
    }
    .imgRow{
      width: 100%;
      position: relative;
      padding-left: 10%;
      background: #262a35;
      padding: 10px 0;
      display: -ms-flexbox;
      display: flex;
      justify-content: center;
      .product{
        position: relative;
        width: 30vw;
        height: 30vw;
        text-align: center;
        img{
          width: 50%;
          height: 50%;
          border: 1px solid #e5e5e5
        }
        .descText{
          display: flex;
          align-items: baseline;
          justify-content: center;
          margin-top: 10px;
          color: #c7cfe4;
          word-break:break-all;
          .point{
            height: 7px;
            min-width: 7px;
            background: #00abfb;
            position: relative;
            border-radius: 50%;
          }
        }
      }
      .compare{
        position: relative;
        width: 20vw;
        text-align: center;
        img{
          width: 50%;
        }
      }
    }
    #charts{
      display: block;
      background: #262A35;
      #main{
        display: block;
      }
    }
    .compareTable{
      border-bottom: 10px solid #5B6072;
      width:100%;
      .tableTitle{
        display: block;
        line-height: 40px;
        background: #1F2129;
        color: white;
        padding-left: 15px;
        font-size: 1.6rem;
      }
      .compareRow{
        width: calc(100% - 15px);
        line-height: 40px;
        background: #262A35;
        color: white;
        padding-left: 15px;
        text-align: center;
        display: flex;
        align-items: center;
        .label{
          width: 36%;
          text-align: left;
        }
        .productOne{
          width: 31%;
          border-left: 1px solid #414657;
          border-right: 1px solid #414657;
          box-sizing: border-box;
          color: #02A5F2;
          line-height: 15px;
        }
        .productTwo{
          width: 30%;
          color: red;
          line-height:15px;
        }
      }
    }
  }
</style>

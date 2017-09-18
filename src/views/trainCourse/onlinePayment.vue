<template>
  <div class="onlinePayment">
    <div class="cardList">
      <div class="header">
        <div class="desc">
          <img :src="payIcon" alt="">
          <span>微信支付</span>
        </div>
        <div>费用项目:{{payInfomation.orderSubject}}{{payInfomation.orderContent}}
        </div>
      </div>
      <div class="content">
        <span>支付金额:</span>
        <span>￥{{payInfomation.amount?payInfomation.amount:0}}</span>
      </div>
      <div class="footer" :style="isPay?'background: #E6A913;':'background:gainsboro;pointer-events:none;'" @click="forPay()">确认支付</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
      created(){
        this.getPayInfo();
      },
      methods: {
        forPay(){
          let _this = this;
          WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
              appId:'wx8a7d8fead458d831',
              timeStamp: _this.paymentParam.timeStamp,
              nonceStr: _this.paymentParam.nonceStr,
              package: _this.paymentParam.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
              signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
              paySign: _this.paymentParam.paySign // 支付签名 timestamp: timeStamp,
            },
            function(res){
              if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                _this.paySuccess();
              }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
            }
          );
        },
        paySuccess(){
          let _this = this,
            param = {
              orderNumber:_this.paymentParam.orderNumber,
              paymentType:'WXPAY'
            },
            url = '/api/payment/payOff';
          _this.$post(url,param).then(response=>{
            _this.$vux.toast.show({text:response.message});
            if(response.success){
              if(_this.$route.query.style==='courseRegistration'){
                _this.$router.go(-2);
              }else{
                _this.$router.go(-1);
              }
            }
          })
        },
        getPayInfo(){
          let _this = this,
            url = '/api/payment/createOrder',
            param = {
              "tradeType":"JSAPI",
              "paymentType":"WXPAY",
              "sourceType":_this.payInfomation.sourceType,
              "sourceId":_this.payInfomation.sourceId,
              "amount":_this.payInfomation.amount,
              "orderSubject":_this.payInfomation.orderSubject,
              "orderContent":_this.payInfomation.orderContent,
              "openid":window.localStorage.wechatOpenid
            };
          _this.$vux.loading.show({text:'loading'});
          _this.$post(url,param).then(response=>{
            _this.$vux.loading.hide();
            _this.isPay = response.success;
            if(response.success){
              _this.paymentParam = response;
            }else if(!response.success){
              _this.$vux.toast.show({text:response.message});
            }
          })
        }
      },
      data () {
        return {
          msg: 'Welcome to Your Vue.js App',
          payIcon:require('../../assets/img/icon_pay.png'),
          payInfomation:this.$route.query.payInfo,
          isPay:false,
          param:{},
          paymentParam:{}
        }
      }
    }
</script>

<style lang="scss">
  .onlinePayment{
    margin: 20px 10px 0;
    background: white;
    .cardList{
      box-shadow: 0 0 3px 1px gainsboro;
      .header{
        text-align: center;
        border-bottom: 1px solid gainsboro;
        padding-bottom: 10px;
        font-size: 1.5rem;
        .desc{
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 15px 0 5px;
          img{
            height: 30px;
            margin-right: 10px;
          }
        }
      }
      .content{
        display: flex;
        justify-content: center;
        line-height: 80px;
        font-size: 1.45rem;
        span:nth-child(2){
          font-size: 3rem;
        }
      }
      .footer{
        width:100%;
        color: #fff;
        font-size: 1.6rem;
        text-align:center;
        line-height: 45px;
      }
    }
  }
</style>

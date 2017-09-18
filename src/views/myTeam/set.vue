<template>
    <div class="set">
      <div class="setContent">
        <div class="information inputLine">
          <div class="label">
            <span>用户名</span>
          </div>
          <span class="input" style="width: calc(73% - 12px);">{{setInfo.userName}}</span>
        </div>
        <div class="information inputLine">
          <div class="label">
            <span>渠道名称</span>
          </div>
          <span class="input" style="width: calc(73% - 12px);">{{setInfo.channelName}}</span>
        </div>
        <div class="information inputLine">
          <div class="label">
            <span>帐号状态</span>
          </div>
          <span class="input" style="width: calc(73% - 12px);">{{setInfo.userStatus}}</span>
        </div>
        <span class="moneyRate">佣金分成</span>
        <div v-for="param in params">
          <div class="information inputLine">
            <div class="label">
              <span>第一年</span>
            </div>
            <input type="number" v-model="param.rate1" class="input">
            <span class="symbol">%</span>
          </div>
          <div class="information inputLine">
            <div class="label">
              <span>第二年</span>
            </div>
            <input type="number" v-model="param.rate2" class="input">
            <span class="symbol">%</span>
          </div>
          <div class="information inputLine">
            <div class="label">
              <span>第三年</span>
            </div>
            <input type="number" v-model="param.rate3" class="input">
            <span class="symbol">%</span>
          </div>
          <div class="information inputLine">
            <div class="label">
              <span>第四年</span>
            </div>
            <input type="number" v-model="param.rate4" class="input">
            <span class="symbol">%</span>
          </div>
          <div class="information inputLine">
            <div class="label">
              <span>第五年</span>
            </div>
            <input type="number" v-model="param.rate5" class="input">
            <span class="symbol">%</span>
          </div>
          <div class="information inputLine">
            <div class="label">
              <span>第六年</span>
            </div>
            <input type="number" v-model="param.rate6" class="input">
            <span class="symbol">%</span>
          </div>
          <div class="information inputLine">
            <div class="label">
              <span>第七年</span>
            </div>
            <input type="number" v-model="param.rate7" class="input">
            <span class="symbol">%</span>
          </div>
          <div class="information inputLine">
            <div class="label">
              <span>第八年</span>
            </div>
            <input type="number" v-model="param.rate8" class="input">
            <span class="symbol">%</span>
          </div>
          <div class="information inputLine">
            <div class="label">
              <span>第九年</span>
            </div>
            <input type="number" v-model="param.rate9" class="input">
            <span class="symbol">%</span>
          </div>
          <div class="information inputLine">
            <div class="label">
              <span>第十年</span>
            </div>
            <input type="number" v-model="param.rate10" class="input">
            <span class="symbol">%</span>
          </div>
        </div>
      </div>
      <div class="footer" @click="saveEdit()">保存</div>
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
        };

        setTimeout(function(){
          document.setTitle('设置');
        }, 1);
       },
        mounted(){
          this.getCLBCode().then(response=>{
            this.getSomeParam();
          });
        },
        methods: {
          getValue(array,key){
            return array.filter(a=>{
              return a.key ===key;
            });
          },
          getSomeParam(){
            this.$post('/api/channel/teamMemberCommission',{channelId: this.setInfo.channelId,partyId:JSON.parse(window.localStorage.userInfo).user.relatedPartyId})
              .then(response=>{
                this.$vux.loading.hide();
                if(response.success){
                  this.params = response.rows;
                }
            })
          },
          getCLBCode(){
            return new Promise(resolve=>{
              this.$vux.loading.show({text:'loading'});
              this.$post('/api/clb/common/clbCode',{userStatus: "SYS.USER_STATUS"})
                .then(response=>{
                if(response){
                  JSON.parse(response).userStatus.forEach(value=>{
                    value.key = value.value;
                    value.value = value.meaning+"";
                    this.accountStatus.push(value);
                  });
                  this.status = this.getValue(this.accountStatus,this.setInfo.userStatus);
                  resolve(true);
                }
              })
            });
          },
          saveEdit(){
            let _this = this,
              paramRate = [];
            if(_this.params.length>0){
              _this.param.forEach(value=>{
                value.rate1 = parseInt(value.rate1);
                value.rate2 = parseInt(value.rate2);
                value.rate3 = parseInt(value.rate3);
                value.rate4 = parseInt(value.rate4);
                value.rate5 = parseInt(value.rate5);
                value.rate6 = parseInt(value.rate6);
                value.rate7 = parseInt(value.rate7);
                value.rate8 = parseInt(value.rate8);
                value.rate9 = parseInt(value.rate9);
                value.rate10 = parseInt(value.rate10);
                paramRate.push(value);
              })
            }
            let param = {
                channelId: _this.setInfo.channelId,
                channelName:_this.setInfo.channelName,
                partyId: _this.setInfo.partyId,
                planQuota: _this.setInfo.planQuota,
                rateList: paramRate,
                userId:_this.setInfo.userId,
                userName:_this.setInfo.userName
              },
              url = '/api/channel/teamMemberCommission';
            _this.$post(url,param).then(response=>{
              if(response.success){
                _this.$vux.toast.show('修改成功','center');
                  _this.$router.go(-1);
              }else{

              }
            })
          }
        },
        data () {
            return {
              msg: 'Welcome to Your Vue.js App',
              accountStatus:[],
              setInfo:this.$store.state.passParam,
              status:'',
              params:[],
              amountPercent:this.$store.state.passParam.commission*100
            }
        }
    }
</script>

<style lang="scss">
  .weui-cells_radio{
    width:100%;
    p{
      margin:0.5em;
    }
  }
  .set {
    .setContent {
      background:white;
      padding-top:20px;
      .inputLine {
        line-height: 44px;
      }

      .information {
        width: calc(100% - 15px);
        position: relative;
        margin-left: 15px;
        border-bottom: 1px solid rgba(233, 233, 233, .8);

        .label {
          width: 25%;
          display: inline-block;
        }

        .input {
          border: none;
          outline: none;
          line-height: 30px;
          width: calc(73% - 22px);
          text-align: right;
          font-size: 1.4rem;
          padding: 0;
          padding-top: -1px;
          padding-right: 12px;
          color: #999;
          display:inline-block;
          &::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
            color: #999;
          }
        }
        .symbol{
          display: inline-block;
          position: absolute;
          right: 10px;
          color: #999;
        }
        .weui-cells {
          width: calc(100vw - 15px);
          box-sizing: border-box;
          margin-top: 0;
          font-size: 1.4rem;
          line-height: 24px;

          &:before {
            border-top: none;
          }

          &:after {
            border-bottom: none;
          }

        }
        .vux-label {
          font-size: 1.4rem;
          color: #333;
        }

        .weui-cell {
          padding-left: 0;
        }
        p {
          margin: 0;
        }
        .weui-cell_access .weui-cell__ft {
          &:after {
            height: 10px;
            width: 10px;
            margin-top: -7px;
          }
        }
      }
      .moneyRate{
        line-height: 45px;
        margin-left: 12px;
        width: calc(100% - 12px);
        border-bottom: 1px solid hsla(0,0%,91%,.8);
        display: block;
      }
    }
    .footer{
      width: 90%;
      line-height: 45px;
      text-align: center;
      margin-left: 5%;
      margin-top: 40px;
      background: #E6A914;
      border-radius: 5px;
      font-size: 1.8rem;
      color: white;
      letter-spacing: 2px;

    }
  }
</style>

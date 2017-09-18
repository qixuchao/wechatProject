<template>
  <div class="reference">
    <div class="cardList">
      <div class="cardTitle">被保人信息</div>
      <div class="information">
        <group>
          <popup-radio title="性别" :options="options1" v-model="option1" placeholder="请选择"></popup-radio>
        </group>
      </div>
      <div class="information inputLine">
        <div class="label">
          <span>年龄</span>
        </div>
        <input type="number" placeholder="请输入" v-model="inputAge" class="input">
      </div>
      <div class="information">
        <group>
          <popup-radio title="是否吸烟" :options="options2" v-model="option2" placeholder="请选择"></popup-radio>
        </group>
      </div>
      <div class="information" v-if="product1.minClassName ==='高端医疗'">
        <group>
          <popup-radio title="居住地" :options="optionsNations" v-model="optionsAddress2" placeholder="请选择"></popup-radio>
        </group>
      </div>
      <div class="information"  v-if="product1.minClassName ==='高端医疗'">
        <group>
          <popup-radio title="缴费年期" :options="optionsYear3" placeholder="请选择" v-model="optionYear3"></popup-radio>
        </group>
      </div>
      <div class="information inputLine">
        <div class="label">
          <span>保险金额</span>
        </div>
        <input type="number" placeholder="请输入" v-model="inputMoney" class="input">
      </div>
      <div class="information">
        <group>
          <popup-radio title="币种" :options="optionsCurrencies" v-model="optionCurrency" placeholder="请选择"></popup-radio>
        </group>
      </div>
    </div>
    <div class="cardList">
      <div class="cardTitle">{{product1.itemName}}</div>
      <div  v-if="product1.minClassName !=='高端医疗'">
        <div class="information">
          <group>
            <popup-radio title="缴费年期" :options="optionsYear1" v-model="option11" placeholder="请选择"></popup-radio>
          </group>
        </div>
        <div class="information" v-if="product2.minClassName !=='高端医疗'">
          <group>
            <popup-radio title="缴费方式" :options="optionsMethod1" v-model="option12" placeholder="请选择"></popup-radio>
          </group>
        </div>
      </div>
      <div v-if="product1.minClassName ==='高端医疗'">
        <div class="information">
          <group>
            <popup-radio title="保障级别" :options="optionsLevel1" v-model="option13" placeholder="请选择"></popup-radio>
          </group>
        </div>
        <div class="information">
          <group>
            <popup-radio title="保障地区" :options="optionsArea1" v-model="option14" placeholder="请选择"></popup-radio>
          </group>
        </div>
        <div class="information">
          <group>
            <popup-radio title="自付选项" :options="optionsSelf1" v-model="option15" placeholder="请选择"></popup-radio>
          </group>
        </div>
      </div>
    </div>
    <div class="cardList">
      <div class="cardTitle">{{product2.itemName}}</div>
      <div v-if="product2.minClassName !=='高端医疗'">
        <div class="information" v-if="product2.minClassName !=='高端医疗'">
          <group>
            <popup-radio title="缴费年期" :options="optionsYear2" v-model="option21" placeholder="请选择"></popup-radio>
          </group>
        </div>
        <div class="information">
          <group>
            <popup-radio title="缴费方式" :options="optionsMethod2" v-model="option22" placeholder="请选择"></popup-radio>
          </group>
        </div>
      </div>
      <div v-if="product2.minClassName ==='高端医疗'">
        <div class="information">
        <group>
          <popup-radio title="保障级别" :options="optionsLevel2" v-model="option23" placeholder="请选择"></popup-radio>
        </group>
      </div>
        <div class="information">
          <group>
            <popup-radio title="保障地区" :options="optionsArea2" v-model="option24" placeholder="请选择"></popup-radio>
          </group>
        </div>
        <div class="information">
          <group>
            <popup-radio title="自付选项" :options="optionsSelf2" v-model="option25" placeholder="请选择"></popup-radio>
          </group>
        </div>
      </div>
    </div>
    <div class="footButton" :style="!isFullfill?'background:gainsboro;pointer-events:none;':'background: #E6A914;'" @click="inputCompare()">
      <span>输入对比条件</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Group,PopupRadio} from 'vux';
  export default{
    components:{
      Group,PopupRadio
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
      document.setTitle('对比条件');
    }, 1);
  },
    mounted(){
      this.getCLBCode();
    },
    data(){
      return{
        optionsYear3:this.$store.state.passParam.product1.yearPeriod1,
        optionYear3:'终身',
        option15:null,
        option25:null,
        optionsSelf1:this.$store.state.passParam.product1.selfpay,
        optionsSelf2:this.$store.state.passParam.product2.selfpay,
        optionsNations:[],
        optionsAddress2:null,
        optionsCurrencies:[],
        optionCurrency:'',
        inputMoney:'',
        bigClass1:'',
        bigClass2:'',
//        isHighEnd:this.$route.query.attSetId,
        product1:this.$store.state.passParam.product1,
        product2:this.$store.state.passParam.product2,
        inputAge:25,
        option1:[{key:'F',value:'女'},{key:'M',value:'男'}][1].key,
        options1:[{key:'F',value:'女'},{key:'M',value:'男'}],
        option2:[{key:'Y',value:'是'},{key:'N',value:'否'}][1].key,
        option3:'',
        options2:[{key:'Y',value:'是'},{key:'N',value:'否'}],
        option4:'',
        optionsYear1:this.$store.state.passParam.product1.yearPeriod1,
        optionsYear2:this.$store.state.passParam.product2.yearPeriod1,
        optionsMethod1:this.$store.state.passParam.product1.payMethods,
        optionsMethod2:this.$store.state.passParam.product2.payMethods,
        optionsLevel1:this.$store.state.passParam.product1.securityLevel,
        optionsLevel2:this.$store.state.passParam.product2.securityLevel,
        optionsArea2:this.$store.state.passParam.product2.securityArea,
        optionsArea1:this.$store.state.passParam.product1.securityArea,
        option5:'',
        options5:[{key:'F',value:'女'},{key:'M',value:'男'}],
        option6:'',
        option7:'',
        option11:'',
        option12:'',
        option13:'',
        option14:'',
        option21:'',
        option22:'',
        option23:'',
        option24:'',
        options6:[{key:'F',value:'女'},{key:'M',value:'男'}]
      }
    },
    computed:{
      isFullfill:function(){
        return this.inputAge&&this.inputMoney&&this.option1&&((this.option12&&this.option11&&this.option22&&this.option21)||this.optionYear3)&&this.option2
      }
    },
    methods:{
      concatArray(array1,array2){
          return Array.from(new Set(array1.concat(array2)));
      },
      getCLBCode(){
          let _this = this,
            url = '/api/clb/common/clbCode',
            param = {
              currencyList: "PUB.CURRENCY",
              genderList: "HR.EMPLOYEE_GENDER",
              nationList: "PUB.NATION",
              payMethodList: "CMN.PAY_METHOD"
            };
          _this.$post(url, param).then(response=> {
            if (response) {
              let options1 = [];
              let array = [];
              let array1 = [];
              JSON.parse(response).currencyList.forEach((value,item)=>{
                value.key = value.value;
                value.value = value.meaning+"";
                options1.push(value);
              });
              JSON.parse(response).nationList.forEach((value,item)=>{
                value.key = value.value;
                value.value = value.meaning+"";
                _this.optionsNations.push(value);
              });
              for(let a of _this.concatArray(_this.$store.state.passParam.product1.currencyList,_this.$store.state.passParam.product2.currencyList)){
                for(let b of options1){
                  if(a === b.key){
                    array.push(b);
                  }
                }
              }
              _this.optionsCurrencies = array;
            }
        })
      },
      inputCompare(){
        let _this = this,
          param = {
            params:[{
              key:1,
              age: _this.inputAge,
              coverage: _this.inputMoney,
              currency: _this.optionCurrency,
              gender: _this.option1,
              itemId:_this.$store.state.passParam.product1.itemId,
              livingCity: _this.optionsAddress2,
              securityArea:  _this.option14,
              securityLevel: _this.option13,
              selyPay: _this.option15,
              paymentMethod: _this.option12,
              productionAgeLimit:_this.product1.minClassName==='高端医疗'?_this.optionYear3: _this.option11,
              smokeFlag: _this.option2
          },{
            key:2,
            age: _this.inputAge,
            coverage: _this.inputMoney,
            currency: _this.optionCurrency,
            gender: _this.option1,
            itemId:_this.$store.state.passParam.product2.itemId,
            livingCity:  _this.optionsAddress2,
            securityArea: _this.option24,
            securityLevel: _this.option23,
            selyPay:  _this.option25,
            paymentMethod: _this.option22,
            productionAgeLimit:_this.product2.minClassName==='高端医疗'?_this.optionYear3:_this.option21,
            smokeFlag: _this.option2
          }],
          passPar:{
            currencies:_this.optionsCurrencies,
            payMethods:_this. optionsMethod1,
            payMethods1:_this. optionsMethod2,
            optionsYear2:_this.optionsYear2,
            optionsYear1:_this.optionsYear1
          }};
        _this.$store.commit('setProductInfo',param);
        _this.$router.push('compareInfo');
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
  .reference{
    position: absolute;
    background: white;
    min-height: 100%;
    margin-bottom: 55px;
    padding-bottom: 55px;
    .cardList{
      width: 100%;
      box-sizing: border-box;
      .cardTitle{
        display: block;
        line-height: 45px;
        font-size: 1.6rem;
        padding-left: 15px;
        background: #F4F4F7;
      }
      .inputLine{
        line-height: 44px;
      }
      .information{
        width: calc(100% - 15px);
        position: relative;
        margin-left: 15px;
        border-bottom: 1px solid rgba(233,233,233,.8);
        display:inline-block;
        .label{
          width: 25%;
          display:inline-block;
        }
        .input{
          border: none;
          outline: none;
          line-height: 30px;
          width: calc(73% - 12px);
          text-align: right;
          font-size: 1.4rem;
          padding: 0;
          padding-top: -1px;
          padding-right: 12px;
          color: #999;
          &::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
             color: #999;
           }
        }
        .weui-cells{
          width: calc(100vw - 15px);
          box-sizing: border-box;
          margin-top: 0;
          font-size: 1.4rem;
          line-height: 24px;
          &:before{
             border-top: none;
           }
          &:after{
             border-bottom: none;
           }
        }
        .vux-label{
          font-size: 1.4rem;
          color: #333;
        }
        .weui-cell{
          padding-left: 0;
        }
        p{
          margin:0;
        }
        .weui-cell_access .weui-cell__ft{
          &:after{
             height: 10px;
             width:10px;
             margin-top: -7px;
           }
        }
      }
    }
    .footButton{
      width: 90%;
      line-height: 45px;
      text-align: center;
      /*background: #E6A914;*/
      margin-left: 5%;
      border-radius: 10px;
      color: white;
      font-size: 1.6rem;
      /* margin-top: 30px; */
      position: fixed;
      z-index: 11;
      bottom: 0;
    }
  }
</style>

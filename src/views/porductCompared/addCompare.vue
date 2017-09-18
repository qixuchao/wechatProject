<template>
  <div class="addCompare" v-if="openId">
      <group v-for="(list,index) in companyList">
        <cell
          :title="list.name"
          is-link
          :border-intent="false"
          :arrow-direction="list.showChild ? 'up' : 'down'"
          @click.native="getProductList(list,index);list.showChild = !list.showChild">
          <img slot="icon" :src="list.img" alt="" width="40">
        </cell>
        <div class="slide" v-if="list.showChild" :class="list.showChild?'animate':''">
           <div v-for="(child,index) in list.productList" v-if="itemId !==child.itemId" class="childList" @click="getItem(child)">{{child.itemName}}</div>
        </div>
      </group>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Group,Cell,Scroller,Spinner} from 'vux';
  export default{
    components:{
      Group,Cell,Scroller,Spinner
    },
    created(){
      if(window.localStorage.wechatOpenid !==window.localStorage.openid){

      }else{
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
          document.setTitle('产品列表');
        }, 1);
        this.openId = window.localStorage.wechatOpenid;
        this.getCompanyList().then(response=>{
          this.getCLBCode();
        })
      }
  },
    beforeCreate(){
      this.openId = '';
    },
    mounted(){

    },
    data(){
      return{
        productList:[],
        showContent:false,
        companyList:[],
        options:[],
        loading:false,
        openId:'',
        itemId:this.$route.query.itemId,
        imgPath:require('../../assets/img/productFace.jpg'),
        scrollHandler: {
          isLoadingData: true,
          loadMoreFlag: false
        },
        pullUpValue: {
          pullupStatus: 'default'
        },
        page:0
      }
    },
    methods:{
      getValueList(array){
        let options1 = [];
        array.forEach((value,item)=>{
          let options = {
            value:value.description,
            key:value.value
          };
          options1.push(options);
        });
        return options1;
      },
      getPicture(fileId){
        return new Promise((resolve,reject)=>{
          let _this = this;
          _this.$post('/api/ordAfter/queryFilePathByFileId',{fileId:fileId}).then(response=>{
            if(response){
              resolve(response);
            }else{
              reject("");
            }
          })
        });
      },
      getCLBCode(){
        let _this = this,
          url = '/api/clb/common/clbCode',
          param = {
            "currencyList": "PUB.CURRENCY",
            "moneyTypeList": "PLN.AMOUNT_TYPE",
            "payMethodList": "CMN.PAY_METHOD"
          };
        _this.$post(url, param).then(response=> {
          if (response) {
            _this.options = _this.getValueList(JSON.parse(response).currencyList);
          }
        })
      },
      goPlan(item,page){
        item.fromCompare = true;
        this.$store.commit('passParam',item);
        let router = '';
        if(page ==='normal'){
          router = 'normalPlan'
        }else if(page === 'plan'){
          router = 'insurance';
        }else if(page ==='budget'){
          router = 'budget'
        }
        this.$router.push(router);
      },
      getArray(array,attr1,attr2){
        let Array = [];
        array.forEach((value,item)=>{
          value.key = value[attr1];
          value.value = value[attr2];
          Array.push(value);
        });
        return Array;
      },
      getItem:function(item){
        let type = this.$route.query?this.$route.query.type:'';
        let params = {
          product1:this.$store.state.passParam?this.$store.state.passParam.product1:{},
          product2:this.$store.state.passParam?this.$store.state.passParam.product2:{}
        };
        let currencyList = item.prdItemPaymode.length>0?item.prdItemPaymode.map(x=>{
          return x.currencyCode;
        }):[];
        let yearPeriod = item.prdItemSublineList.length>0?this.getArray(item.prdItemSublineList,'sublineId','sublineItemName'):[];
        let yearPeriod1 = [];
        if(item.prdItemSublineList.length>0){
          item.prdItemSublineList.forEach((value,index)=>{
            yearPeriod1[index] = value.sublineItemName;
          })
        }
        item.img = item.pictureFilePath?`${this.$store.getters.getPictureUrl}${item.pictureFilePath}`:this.imgPath;
        item.currencyList = currencyList;
        item.yearPeriod = yearPeriod;
        item.yearPeriod1 = yearPeriod1;
        item.company = [{key:item.supplierId,value:item.supplierName}];
        item.product = [{key:item.itemId,value:item.itemName}];
        item.payMethods = [{value:'半年缴',key:'SAP',name:item.halfyear},{value:'整缴',key:'WP',name:item.fullyear},{value:'月缴',key:'MP',name:item.onemonth},{value:'年缴',key:'AP',name:item.oneyear},{value:'季缴',key:'QP',name:item.quarter}]
                            .filter(x=>{
                              return x.name ==='Y'
                            });
        item.securityArea = item.prdItemSecurityPlan.length>0?this.getArray(item.prdItemSecurityPlan,'securityRegion','securityRegion'):[];
        item.securityLevel = item.prdItemSecurityPlan.length>0?this.getArray(JSON.parse(JSON.stringify(item.prdItemSecurityPlan)),'securityLevel','securityLevel'):[];
        item.selfpay = item.prdItemSelfpayList.length>0?this.getArray(item.prdItemSelfpayList,'selfpay','selfpay'):[];
        if(type){
          if(type ===1){
            params.product1 = item;
          }
          if(type === 2){
            params.product2 = item;
          }
          this.$store.commit('passParam',params);
          this.$router.push('addProduct');
        }
        if(location.hash.split('=')[1] ==='normal'||location.hash.split('=')[1] ==='plan'||location.hash.split('=')[1] ==='budget'){
          this.goPlan(item,location.hash.split('=')[1]);
        }
      },
      getProductList(list,index){
          let _this = this,
            url = `/api/production/headerlist?page=1&pageSize=100`,
            params = {
              bigClassName: "保险",
              attSetId:_this.$route.query.attSetId,
              enabledFlag: "Y",
              supplierId: list.supplierId,
              page: 1,
              pageSize:100
            };
          if(list.showChild){
            return;
          }
          _this.$vux.loading.show({text:'loading'});
          _this.productList = [];
          _this.$post(url,params).then(response=>{
            _this.$vux.loading.hide();
            if(response.success){
              let productListNromal = response.rows.filter(x=>{
                return x.midClassName!=='附加险'&&x.attribute1 !=='Y';
              });
              _this.$set(_this.companyList[index],'productList',productListNromal);
            }
          });
      } ,
      loadMore(){
        let _this = this;
        _this.loading = true;
        _this.getCompanyList();
      },
      getCompanyList(){
        return new Promise((resolve,reject)=>{
          let _this = this;
            _this.page+=1;
          _this.$vux.loading.show({text:'loading'});
          let  url = `/api/supplier/queryAll?page=${_this.page}&pagesize=10`,
            params = {
              page:_this.page,
              pagesize:10,
              businessScope: "保险",
              type: "PC"
            };
          _this.$post(url,params).then(response=>{
            _this.$vux.loading.hide();
            if(response.success){
              for (let value of response.rows) {
                value.showChild = false;
                value.productList = [];
                _this.getPicture(value.fileId).then(data=>{
                value.img = data?data:_this.imgPath;
                _this.companyList.push(value);
              });
              }
              resolve(response.success);
            }
          })
        })
      }
    },
    destroyed(){

    }
  }
</script>

<style lang="scss">
  .addCompare{
    padding: 0 0 0 20px;
    font-size:1.6rem;
    position: absolute;
    min-height: 100%;
    background: white;
    width: calc(100% - 20px);
    .weui-cell__hd{
      width:15vw;
      img{
        display: block;
        margin-right: 5px;
        width: 85%;
        height: 12vw;
      }
    }
    .weui-cells {
      margin-top: 0;
      line-height: 32px;
      font-size: 1.4rem;
    }
    .weui-cells:before {
       border-top: none;
    }
    .weui-cell {
      padding: 0;
     border-bottom: 1px solid #e5e5e5;
     padding: 5px 0;
    }
    .weui-cell_access .weui-cell__ft:after {
      height: 10px;
      width: 10px;
      right: 20px;
    }
    .slide {
      padding: 0 0 0 45px;
      overflow: hidden;
      max-height: 0;
      transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
      .childList{
        line-height: 45px;
        border-bottom: 1px solid #e5e5e5;
        font-size: 1.5rem;
        color: #333;
        &:last-child{
           border:none;
         }
      }
    }
    .animate {
      max-height: 9999px;
      transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
      transition-delay: 0s;
    }
  }
</style>

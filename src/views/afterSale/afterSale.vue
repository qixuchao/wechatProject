<template>
  <div class="afterSaleList" v-if="openId">
    <div class="tab">
      <tab :line-width=2 active-color='#E6A914' custom-bar-width="60px" v-model="index">
        <tab-item class="vux-center" :selected="demo02 === item" v-for="(item, index) in tabList" @click.native="checkStatus(item)" :key="index">{{item}}</tab-item>
      </tab>
      <scroller lock-x scrollbar-y use-pullup height="-45px" @on-pullup-loading="getList" ref="scroller"  v-model="pullUpValue">
        <div class="list">
        <div class="orderList" v-for="list in afterSaleList" @click="goPage('claimsDetail',list)">
          <div class="header">
            <span>{{list.nextPolicyDueDate}}</span>
            <span v-if="demo02 ==='售后'">{{list.afterStatus}}</span>
            <span v-if="demo02 ==='续保'">{{list.renewalStatus}}</span>
          </div>
          <div class="content">
            <div class="imgIcon">
              <img :src="list.picture" alt="">
            </div>
            <div class="desc">
              <div class="orderDesc">
                <span>{{list.item}}</span>
              </div>
              <div class="orderDesc">
                <span>保单编号:{{list.policyNumber}}</span>
              </div>
              <div class="orderDesc">
                <span>投保人:{{list.applicant}}</span>
              </div>
              <div class="orderDesc" v-if="demo02 ==='续保'">
                <span>纳费期数:{{list.payPeriods}}</span>
              </div>
              <div class="orderDesc" v-if="demo02 ==='售后'">
                <span>售后类型:{{list.afterType}}</span>
              </div>
              <div class="orderDesc" v-if="demo02 ==='续保'">
                <span>续保到期日:{{list.renewalDueDate}}</span>
              </div>
              <div class="orderDesc" v-if="demo02 ==='售后'">
                <span>提交时间:{{list.creationDate}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up"
           style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
        <span v-show="pullUpValue.pullupStatus === 'default'" v-if="loadMoreFlag">上拉加载更多数据</span>
      </div>
      </scroller>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Tab,TabItem,Scroller,Spinner} from 'vux';
  export default {
    components:{
      Tab,TabItem,Scroller,Spinner
    },
    beforeCreate(){
      this.openId = '';
    },
    created(){
      if(window.localStorage.wechatOpenid !==window.localStorage.openid){
        return;
      }else {
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
          document.setTitle('售后服务');
        }, 1);
        this.openId = window.localStorage.wechatOpenid;
        Promise.all([this.getCLBCode(), this.getCLBCode1()]).then(response=> {
          if (response[0] && response[1]) {
            this.getList(this.afterSaleUrl);
          }
        })
      }
    },
    data () {
      return {
        afterSaleList:[],
        index:0,
        loadMoreFlag:false,
        pullUpValue: {
          pullupStatus: 'default'
        },
        page:0,
        clbCode:{},
        openId:'',
        clbCode1:{},
        tabList:['售后','续保'],
        demo02:'售后',
        afterSaleUrl:'/api/ordAfter/queryOrdAfterList',
        renewUrl:'/api/ordRenewal/queryOrdRenewalList',
        url:'/api/ordAfter/queryOrdAfterList'
      }
    },
    methods:{
      checkStatus(item){
        if(item !== this.demo02) {
          this.demo02 = item;
          this.afterSaleList = [];
          this.page = 0;
          this.$vux.loading.show({text: 'loading'});
          if (this.demo02 === '售后') {
            this.url = this.afterSaleUrl;
          } else {
            this.url = this.renewUrl;
          }
          this.getList();
        }
      },
      goPage:function(page,list){
        this.$router.push({name:page,query:{list:list,listStatus:this.demo02}});
      },
      getValue(array,key1){
        if(key1==='ADMIN'||key1==='NACHFRIST'){
          return '待确认失效';
        }
        return array.filter(a=>{
          return a.value ===key1;
        })[0].meaning;
      },
      getCLBCode(){
        return new Promise(resolve=>{
          let _this = this,
            param = {
              afterLogCodes: "ORD.AFTER_LOG",
              afterStatusCodes: "ORD.AFTER_STATUS"
            },
            url = '/api/clb/common/clbCode';
          _this.$vux.loading.show({text:'loading'});
          _this.$post(url,param).then(response=>{
            if(response){
              _this.clbCode = JSON.parse(response);
              resolve(true);
            }
          });
        })
      },
      getCLBCode1(){
        return new Promise(resolve=>{
          let _this = this,
            param = {
              afterStatusCodes: "ORD.RENEWAL_STATUS_FRONT"
            },
            url = '/api/clb/common/clbCode';
          _this.$post(url,param).then(response=>{
            if(response){
              _this.clbCode1 = JSON.parse(response);
              resolve(true);
            }
          });
        })
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
      getList(){
        let _this =this,
          param = {
            applicantCustomerId:JSON.parse(window.localStorage.userInfoc).user.relatedPartyId
          };
        _this.page +=1;
        _this.$post(`${_this.url}?page=${_this.page}&pageSize=10`,param).then(response=>{
           _this.$vux.loading.hide();
           if(response.success){
             if(response.total===0){
               _this.$vux.toast.show({text:'暂无数据'});
             }
             if(response.rows.length<10){
               _this.$nextTick(() => {
                 _this.$refs.scroller.reset();
               });
               _this.loadMoreFlag = false;
             }else{
               _this.loadMoreFlag = true;
               _this.pullUpValue.pullupStatus = 'default';
               _this.$nextTick(() => {
                 _this.$refs.scroller.reset();
               })
             }
             response.rows.forEach(value=>{
               value.afterStatus = value.afterStatus?_this.getValue(_this.clbCode.afterStatusCodes,value.afterStatus):'';
               value.renewalStatus = value.renewalStatus?_this.getValue(_this.clbCode.afterLogCodes,value.renewalStatus):'';
               _this.getPicture(value.companyFileid).then(data=>{
                 value.picture = data;
                 _this.afterSaleList.push(value);
               },err=>{
                 value.picture = "";
                 _this.afterSaleList.push(value);
               });
               console.log(_this.afterSaleList);
             });
           }else{
             _this.$vux.toast.show({text:response.message});
           }
        });
      }
    }
  }
</script>

<style lang="scss">
  /*@import "../../assets/css/common.scss";*/
  .afterSaleList {
    .tab {
      width: 100%;
      .vux-tab {
        width: 100%;;
      }
      .orderList {
        margin: 15px 15px 0;
        padding: 0 10px;
        background: white;
        box-shadow: 0 2px 2px 1px gainsboro;
        .header {
          line-height: 40px;
          width: 100%;
          font-size: 1.5rem;
          height: 40px;
          span:nth-child(2) {
            float: right;
            color: green;
          }
        }
        .content {
          height: auto;
          width: 100%;
          /*border-bottom: 1px solid gainsboro;*/
          font-size: 1.3rem;

        .imgIcon {
          width: 20%;
          text-align: left;
          vertical-align: top;
          display:inline-block;
          img {
            width: 80%;
          }
        }
        .desc {
          width: 78%;
          padding: 0 0 10px;
          display:inline-block;
          .orderDesc {
            display: block;
            line-height: 20px;
          }
        }
      }
     }
    }
  }
</style>

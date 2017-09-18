<template>
  <div class="product_center" v-if="openId">
    <div class="fixed_header">
      <!--<sticky :check-sticky-support="false" style="z-index:10">-->
        <tab active-color="#e6a914" :line-width="2" :line-height="2" class="hb" :custom-bar-width="getBarWidth">
          <tab-item selected  @on-item-click="onItemClick" class="hb_tab">保险</tab-item>
          <tab-item  @on-item-click="onItemClick" class="hb_tab">债券</tab-item>
          <tab-item  @on-item-click="onItemClick" class="hb_tab">移民投资</tab-item>
          <tab-item  @on-item-click="onItemClick" class="hb_tab">增值服务</tab-item>
          <!--<tab-item @on-item-click="clickScreen" class="hb_tab" style="border-left:1px solid #e5e5e5 !important;">-->

          <!--</tab-item>-->
        </tab>
        <div class="img_choose" @click="clickScreen">
          <img :src="img" class="choose" />
        </div>
      <!--</sticky>-->
    </div>
    <!-- 保险页面-->
    <scroller v-model="scrollerStatus" height="-45"  style="margin-top:45px" lock-x scrollbar-y ref="scroller" :bounce="isbounce"
              :use-pullup="showUp" :pullup-config="upobj" @on-pullup-loading="loadMore">
      <div v-if="showInsurance">
        <div class="middle" v-for="(item,index) in dataList" @click="goPage1(index)">
          <div class="middle_one">
            <div class="middle_three">
              {{item.itemName}}
            </div>
            <div class="middle_forth">
              <img class="img" :src="item.pictureFilePath"/>

              <div class="middle_sixth">
                <div class="middle_fifth">投保对象：</div>
                <div class="middle_tenth">{{item.attribute2}}-{{item.attribute3}}岁</div>
              </div>
              <div class="middle_sixth">
                <div class="middle_fifth">可选币种：</div>
                <div class="middle_tenth">{{item.currencyCode}}</div>
              </div>
              <div class="middle_sixth">
                <div class="middle_fifth">保障期限：</div>
                <div class="middle_tenth">{{item.attribute4}}</div>
              </div>
              <div class="middle_sixth">
                <div class="middle_fifth">缴费期限：</div>
                <div class="middle_tenth"> {{item.attribute120}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <!-- 债券页面-->
      <div v-if="showBond">
        <div class="middle" v-for="(item,index) in dataList" @click="goPage2(index)">
          <div class="middle_one">
            <!--<div class="bandTitle">-->
            <div class="middle_three_bond">{{item.itemName}}</div>
            <div class="middle_bond">(股票代码：{{item.attribute50}})</div>
            <!--</div>-->
            <div class="middle_forth">
              <img class="img" :src="item.pictureFilePath"/>
              <div class="middle_sixth">
                <div class="middle_fifth">债券年期：</div>
                <div class="middle_tenth">{{item.attribute51}}</div>
              </div>
              <div class="middle_sixth">
                <div class="middle_fifth">派息周期：</div>
                <div class="middle_tenth">{{item.attribute53}}</div>
              </div>
              <div class="middle_sixth">
                <div class="middle_fifth">年利息：</div>
                <div class="middle_tenth">{{item.attribute52}}</div>
              </div>
              <div class="middle_sixth">
                <div class="middle_fifth">市值：</div>
                <div class="middle_tenth"> {{item.attribute54}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 移民投资页面-->

      <div v-if="showInvest">
        <div class="middle" v-for="(item,index) in dataList" @click="goPage3(index)">
          <div class="middle_one">
            <div class="middle_three">
              {{item.itemName}}
            </div>
            <div class="middle_forth">
              <img class="img" :src="item.pictureFilePath"/>

              <div class="middle_sixth">
                <div class="middle_fifth">投保方式：</div>
                <div class="middle_tenth">{{item.attribute70}}</div>
              </div>
              <div class="middle_sixth">
                <div class="middle_fifth">办理周期：</div>
                <div class="middle_tenth">{{item.attribute71}}</div>
              </div>
              <div class="middle_sixth">
                <div class="middle_fifth">投资货币：</div>
                <div class="middle_tenth">{{item.currencyCode}}</div>
              </div>
              <div class="middle_sixth">
                <div class="middle_fifth">投资门槛：</div>
                <div class="middle_tenth"> {{item.attribute73}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 增值服务页面-->
      <div v-if="showService">
        <div class="middle" v-for="(item,index) in dataList" @click="goPage4(index)">
          <div class="middle_one_new">
            <div class="middle_three_new">
              {{item.itemName}}
            </div>
            <div class="middle_three_service" @click.stop="goService(index)">立即预约</div>

            <div class="middle_forth">
              <img class="img" :src="item.pictureFilePath"/>
              <div class="middle_sixth">
                <div class="middle_fifth_new">费用价格：</div>
                <div class="middle_tenth_new">{{item.price}}</div>
              </div>
              <div class="middle_sixth">
                <div class="middle_tenth_one">{{item.attribute90}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </scroller>

    <loading  text="loading" :value="refresh"></loading>


    <div class="insurance" v-if="showInsScreen">
      <div class="back_btn" @click="back1">收起筛选</div>
      <group style="margin-top: 4rem">
        <popup-radio title="保险公司：" :options="insurance.companyList" v-model="insurance.insuranceCompany" placeholder="请选择"></popup-radio>
      </group>
      <group>
        <popup-radio title="产品种类：" :options="insurance.productList" v-model="insurance.insuranceProduct" placeholder="请选择"></popup-radio>
      </group>
      <group>
        <popup-radio title="投保对象：" :options="insurance.objectList" v-model="insurance.insuranceObject" placeholder="请选择"></popup-radio>
      </group>

      <div class="whole"><div class="left">产品名称：</div>
        <input class="right" placeholder="请输入产品名称关键字" v-model="insurance.productName" />
      </div>
      <div class="whole"><div class="left">最新优惠：</div>
        <img :src="insurance.right" class="right_new"  v-if="insurance.toggle"  @click="toggle1" />
        <img :src="insurance.notRight" class="right_not" v-if="!insurance.toggle" @click="toggle1" />
      </div>
      <!-- 产品标签-->
      <div class="product_lable">
        <div class="product_lable_introduce">产品标签</div>
           <div :class="{product_lable_two:item.active,product_lable_one:!item.active}" v-for="(item,index) in insurance.productLable" @click="change1(index)">{{item.labelName}}
        </div>
      </div>

      <!-- 按钮-->
      <div class="button_type">
        <div class="button_left" @click="clearAll1">清空查询条件</div>
        <div class="button_right" @click="screenInsurance">查询</div>
      </div>


      <div v-transfer-dom>
        <confirm v-model="insurance.showConfirm" :title=insurance.mention @on-cancel="onCancel1" @on-confirm="onConfirm1">
        </confirm>
      </div>

    </div>


    <div class="invest" v-if="showInvScreen">
      <div class="back_btn" @click="back2">收起筛选</div>
      <group style="margin-top: 4rem">
        <popup-radio title="投资币种：" :options="invest.paymentList" v-model="invest.investPayment" placeholder="请选择"></popup-radio>
      </group>
      <group>
        <popup-radio title="投资地区：" :options="invest.areaList" v-model="invest.investArea" placeholder="请选择"></popup-radio>
      </group>
      <group>
        <popup-radio title="投资目的：" :options="invest.aimList" v-model="invest.investAim" placeholder="请选择"></popup-radio>
      </group>
      <group>
        <popup-radio title="投资金额：" :options="invest.numberList" v-model="invest.investNumber" placeholder="请选择"></popup-radio>
      </group>
      <group>
        <popup-radio title="办理周期：" :options="invest.cycleList" v-model="invest.investCycle" placeholder="请选择"></popup-radio>
      </group>
      <div class="whole"><div class="left">产品名称：</div>
        <input class="right" placeholder="请输入产品名称关键字" v-model="invest.productName" />
      </div>


      <!-- 按钮-->
      <div class="button_type">
        <div class="button_left" @click="clearAll2">清空查询条件</div>
        <div class="button_right" @click="investScreen">查询</div>
      </div>

      <div v-transfer-dom>
        <confirm v-model="invest.showConfirm" :title=invest.mention @on-cancel="onCancel2" @on-confirm="onConfirm2">
        </confirm>
      </div>

    </div>


    <div class="bond" v-if="showBondScreen">
      <div class="back_btn" @click="back3">收起筛选</div>
      <group style="margin-top:4rem">
        <popup-radio title="债券年期" :options="bond.interestList" v-model="bond.bondInterest" placeholder="请选择"></popup-radio>
      </group>
      <group>
        <popup-radio title="年利息" :options="bond.annualList" v-model="bond.annualInterest" placeholder="请选择"></popup-radio>
      </group>
      <group>
        <popup-radio title="派息周期" :options="bond.cycleList" v-model="bond.dividendCycle" placeholder="请选择"></popup-radio>
      </group>
      <group>
        <popup-radio title="认购费" :options="bond.feeList" v-model="bond.subscriptionFee" placeholder="请选择"></popup-radio>
      </group>
      <group>
        <popup-radio title="托管费" :options="bond.trusteeList" v-model="bond.trusteeFee" placeholder="请选择"></popup-radio>
      </group>
      <group>
        <popup-radio title="市值(港元)" :options="bond.valueList" v-model="bond.marketValue" placeholder="请选择"></popup-radio>
      </group>
      <div class="whole"><div class="left">产品名称</div>
        <input class="right" placeholder="请输入产品名称关键字" v-model="bond.productName" />
      </div>


      <!-- 按钮-->
      <div class="button_type">
        <div class="button_left" @click="clearAll3">清空查询条件</div>
        <div class="button_right" @click="bondScreen">查询</div>
      </div>

      <div v-transfer-dom>
        <confirm v-model="bond.showConfirm" :title=bond.mention @on-cancel="onCancel3" @on-confirm="onConfirm3">
        </confirm>
      </div>


    </div>



  </div>



</template>

<script type="text/ecmascript-6">
  import {Tab,TabItem,Group,PopupRadio,Scroller,Confirm,Sticky,Loading,XDialog,TransferDomDirective as TransferDom} from 'vux';
  export default {
    directives: {
      TransferDom
    },
    components: {
      Tab,
      TabItem,
      Scroller,
      Loading,
      Sticky,
      XDialog,
      Group,
      PopupRadio,
      Confirm

    },
    created(){
    if(window.localStorage.wechatOpenid ===undefined||window.localStorage.wechatOpenid===''){
//      window.localStorage.page = location.hash.substring(1);
//      this.$router.push('/');
      return;
    }
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
      document.setTitle('产品中心');
    }, 1);
//    var vm=this;
//    var url=window.location.href.split('#')[0];
//    vm.$configWx(url,['onMenuShareAppMessage','onMenuShareTimeline']);
//    vm.$wechat.ready(function() {
//      vm.$wechat.onMenuShareTimeline({
//        title: '财联邦', // 分享标题
//        link: 'http://weixin.fortunefed.com/#/share', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
//        imgUrl: '', // 分享图标
//        success: function () {
//          // 用户确认分享后执行的回调函数
//        },
//        cancel: function () {
//          // 用户取消分享后执行的回调函数
//        }
//      });
//      vm.$wechat.onMenuShareAppMessage({
//        title: '财联邦', // 分享标题
//        desc: '', // 分享描述
//        link: 'http://weixin.fortunefed.com/#/share', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
//        imgUrl: '', // 分享图标
//        type: '', // 分享类型,music、video或link，不填默认为link
//        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
//        success: function () {
//          // 用户确认分享后执行的回调函数
//        },
//        cancel: function () {
//          // 用户取消分享后执行的回调函数
//        }
//      });
//    });
  },
    data(){
    return {
      openId:window.localStorage.wechatOpenid ===window.localStorage.openid,
      currencyList: [],
      dataList: [],
      index: 0,
      chooseIndex: 0,
      getBarWidth: function (index) {
        if (index === 0 || index === 1) {
          return 35 + 'px'
        }
        if (index === 2 || index === 3) {
          return 56 + 'px'
        }
        if (index === 4) {
          return 0 + 'px'
        }
      },
      img: require("../../assets/img/icon_choose@2x.png"),
      examplePic:require("../../assets/img/productFace.jpg"),
      onFetching: false,
      showInsurance: true,
      showBond: false,
      showInvest: false,
      showService: false,
      type: false,
      screen1: {},
      dividendCycle:[],
      refresh: false,
      upobj: {
        content: '',
        pullUpHeight: 60,
        height: 40,
        autoRefresh: false,
        downContent: '',
        upContent: '',
        loadingContent: '',
        clsPrefix: 'xs-plugin-pullup-'
      },
      showUp: true,
      isbounce: false,
      total: null,
      scrollerStatus: {
        pullupStatus: 'default'
      },
      showInsScreen:false,
      insurance:{
        companyList:[],
        productList:["附加险","重疾险","储蓄险","人寿险","医疗险","投连险","万用寿险","不限"],
        objectList:['1-15岁','16-30岁','31-45岁','45岁以上','不限'],
        insuranceObject:null,
        insuranceCompany:null,
        insuranceProduct:null,
        productName:null,
        right:require("../../assets/img/icon_right@2x.png"),
        notRight:require("../../assets/img/icon_notRight@2x.png"),
        toggle:false,
        productLable:null,
        lableSelected:[],
        showConfirm:false,
        mention:"",
        chooseIndex:null,
        screen1:{}
      },
      showInvScreen:false,
      invest:{
        investPayment:null,
        investArea:null,
        investAim:null,
        investNumber:null,
        investCycle:null,
        productName:null,
        paymentList:['美元','欧元','澳币','不限'],
        areaList:['北美','欧洲','澳洲','亚洲','不限'],
        aimList:['移民','投资','留学','居住','护照','税务规划','不限'],
        numberList:['100万以下','100-200万','200-300万','300-500万','500万以上','不限'],
        cycleList:['1个月内','1-3个月','3-6个月','6-12个月','12个月以上','不限'],
        showConfirm:false,
        mention:"",
        screen1:{}
      },
      showBondScreen:false,
      bond:{
        bondInterest: null,
        annualInterest: null,
        dividendCycle: null,
        subscriptionFee: null,
        trusteeFee: null,
        marketValue: null,
        productName: null,
        showConfirm:false,
        mention:"",
        interestList: [
          '2年', '3年', '4年', '5年', '6年', '7年', '7.5年', '8年', '不限'
        ],
        annualList: ['4-6%', '8-10%', '10%以上', '不限'],
        cycleList: [],
        feeList: ['0', '0.5%', '不限'],
        trusteeList: ['3000', '5000', '不限'],
        valueList: ['10亿以下', '10-30亿', '30-50亿', '50-100亿', '不限'],
      }


    }
  },
  mounted() {
    var vm = this;
    vm.refresh=true;
    vm.$nextTick(() => {
      vm.$refs.scroller.reset()
    })
    vm.$post('/api/clb/common/clbCode', {
      "currencyList": "PUB.CURRENCY",
      "dividendCycle":"PRD.INTEREST PERIOD"
    }).then(function (response) {
      vm.currencyList = JSON.parse(response).currencyList;
      vm.dividendCycle=JSON.parse(response).dividendCycle;
      for(let i in vm.dividendCycle){
        vm.bond.cycleList.push(vm.dividendCycle[i].meaning);
      }
      vm.screen1 = {
        "bigClassName": "保险",
        "page": 1,
        "pagesize": 10,
        "enabledFlag": "Y"
      };
      vm.$post('/api/production/headerlist',
        vm.screen1
      ).then(function (response) {
          vm.refresh = false;
          vm.total = response.total;
          vm.dataList = response.rows;
          for (let i in vm.dataList) {
            if (vm.dataList[i].pictureFilePath != null) {
              vm.dataList[i].pictureFilePath = vm.$store.getters.getPictureUrl + vm.dataList[i].pictureFilePath;
            } else {
              vm.dataList[i].pictureFilePath = vm.examplePic;
            }

            for (let j in vm.dataList[i].prdItemPaymode) {
              for (let k in vm.currencyList) {
                if (vm.dataList[i].prdItemPaymode[j].currencyCode === vm.currencyList[k].value) {
                  vm.dataList[i].prdItemPaymode[j].currency = vm.currencyList[k].meaning;
                }
              }

            }
          }
          console.log(vm.dataList[0].prdItemPaymode);
          for (let i in vm.dataList) {
            vm.dataList[i].currencyCode = "";
            vm.dataList[i].attribute120 = "";
            for (let j in vm.dataList[i].prdItemPaymode) {
              if (vm.dataList[i].prdItemPaymode[j].currency != null) {
                vm.dataList[i].currencyCode += vm.dataList[i].prdItemPaymode[j].currency + '、';
              }
            }
            for (let k in vm.dataList[i].prdItemSublineList) {
              let n = Number(vm.dataList[i].prdItemSublineList[k].sublineItemName);
              if (!isNaN(n)) {
                vm.dataList[i].prdItemSublineList[k].sublineItemName += '年';
              }
              vm.dataList[i].attribute120 += vm.dataList[i].prdItemSublineList[k].sublineItemName + '、';
            }
          }
          for (let i in vm.dataList) {
            vm.dataList[i].currencyCode = vm.dataList[i].currencyCode.substring(0, vm.dataList[i].currencyCode.length - 1);
            vm.dataList[i].attribute120 = vm.dataList[i].attribute120.substring(0, vm.dataList[i].attribute120.length - 1);

          }
          vm.scrollerStatus.pullupStatus = 'default'
          // this.$refs.scroller.reset()
          console.log(vm.scrollerStatus.pullupStatus)
          vm.$nextTick(() => {
            vm.$refs.scroller.reset()
          })
        }, function (response) {
          vm.refresh = false;
          console.log("接口出错了");
        })
    },function(response){
      console.log("接口出错了");
    })
  },
  methods:{

    onItemClick(index)
    {
      var vm = this;
      vm.$refs.scroller.reset({top: 0});
      vm.refresh=true;
      vm.chooseIndex = index;
      vm.index=index;
      if (index === 0) {
        vm.showInsurance = true;
        vm.showBond = false;
        vm.showInvest = false;
        vm.showService = false;
        vm.screen1 = {
          "bigClassName": "保险",
          "page": 1,
          "pagesize": 10,
          "enabledFlag": "Y"
        };

        vm.$post('/api/production/headerlist',
          vm.screen1
        ).then(function (response) {
            vm.refresh=false;
            vm.total = response.total;
            vm.dataList = response.rows;
            for (let i in vm.dataList) {
              if(vm.dataList[i].pictureFilePath!=null){
                vm.dataList[i].pictureFilePath = vm.$store.getters.getPictureUrl + vm.dataList[i].pictureFilePath;
              }else{
                vm.dataList[i].pictureFilePath=vm.examplePic;
              }
              for (let j in vm.dataList[i].prdItemPaymode) {
                for (let k in vm.currencyList) {
                  if (vm.dataList[i].prdItemPaymode[j].currencyCode === vm.currencyList[k].value) {
                    vm.dataList[i].prdItemPaymode[j].currency = vm.currencyList[k].meaning;
                  }
                }
              }
            }
            for (let i in vm.dataList) {
              vm.dataList[i].currencyCode = "";
              vm.dataList[i].attribute120 = "";
              for (let j in vm.dataList[i].prdItemPaymode) {
                if(vm.dataList[i].prdItemPaymode[j].currency!=null){
                  vm.dataList[i].currencyCode += vm.dataList[i].prdItemPaymode[j].currency + '、';
                }
              }
              for (let k in vm.dataList[i].prdItemSublineList) {
                let n = Number(vm.dataList[i].prdItemSublineList[k].sublineItemName);
                if (!isNaN(n)) {
                  vm.dataList[i].prdItemSublineList[k].sublineItemName += '年';
                }
                vm.dataList[i].attribute120 += vm.dataList[i].prdItemSublineList[k].sublineItemName + '、';
              }
            }
            for (let i in vm.dataList) {
              vm.dataList[i].currencyCode = vm.dataList[i].currencyCode.substring(0, vm.dataList[i].currencyCode.length - 1);
              vm.dataList[i].attribute120 = vm.dataList[i].attribute120.substring(0, vm.dataList[i].attribute120.length - 1);

            }

            vm.scrollerStatus.pullupStatus = 'default'
            // this.$refs.scroller.reset()
            console.log(vm.scrollerStatus.pullupStatus)
            vm.$nextTick(() => {
              vm.$refs.scroller.reset()
            })

          }, function (response) {
            vm.refresh=false;
            console.log("接口出错了");
          })

      }
      if (index === 1) {
        vm.showInsurance = false;
        vm.showBond = true;
        vm.showInvest = false;
        vm.showService = false;
        vm.screen1 = {
          "bigClassName": "债券",
          "page": 1,
          "pagesize": 10,
          "enabledFlag": "Y"
        };
        vm.$post('/api/production/headerlist',
          vm.screen1
        ).then(function (response) {
            vm.refresh=false;
            vm.total = response.total;
            vm.dataList = response.rows;
            for (let i in vm.dataList) {
              if(vm.dataList[i].pictureFilePath!==null){
                vm.dataList[i].pictureFilePath = vm.$store.getters.getPictureUrl + vm.dataList[i].pictureFilePath;
              }else{
                vm.dataList[i].pictureFilePath=vm.examplePic;
              }
              for(let j in vm.dividendCycle){
                if(vm.dataList[i].attribute53===vm.dividendCycle[j].value){
                  vm.dataList[i].attribute53=vm.dividendCycle[j].meaning;
                }
              }

              for (let j in vm.dataList[i].prdItemPaymode) {
                for (let k in vm.currencyList) {
                  if (vm.dataList[i].prdItemPaymode[j].currencyCode === vm.currencyList[k].value) {
                    vm.dataList[i].prdItemPaymode[j].currency = vm.currencyList[k].meaning;
                  }
                }
              }
            }
            for (let i in vm.dataList) {
              vm.dataList[i].currencyCode = "";
              vm.dataList[i].attribute51 = "";
              for (let j in vm.dataList[i].prdItemPaymode) {
                if( vm.dataList[i].prdItemPaymode[j].currency!=null){
                  vm.dataList[i].currencyCode += vm.dataList[i].prdItemPaymode[j].currency + '、';
                }
              }
              for (let k in vm.dataList[i].prdItemSublineList) {
                let n = Number(vm.dataList[i].prdItemSublineList[k].sublineItemName);
                if (!isNaN(n)) {
                  vm.dataList[i].prdItemSublineList[k].sublineItemName += '年';
                }
                vm.dataList[i].attribute51 += vm.dataList[i].prdItemSublineList[k].sublineItemName + '、';
              }
            }
            for (let i in vm.dataList) {
              vm.dataList[i].currencyCode = vm.dataList[i].currencyCode.substring(0, vm.dataList[i].currencyCode.length - 1);
              vm.dataList[i].attribute51 = vm.dataList[i].attribute51.substring(0, vm.dataList[i].attribute51.length - 1);

            }
            vm.scrollerStatus.pullupStatus = 'default'
            // this.$refs.scroller.reset()
            console.log(vm.scrollerStatus.pullupStatus)
            vm.$nextTick(() => {
              vm.$refs.scroller.reset()
            })


          }, function (response) {
            vm.refresh=false;
            console.log("接口出错了");
          })
      }
      if (index === 2) {
        vm.showInsurance = false;
        vm.showBond = false;
        vm.showInvest = true;
        vm.showService = false;
        vm.screen1 = {
          "bigClassName": "移民投资",
          "page": 1,
          "pagesize": 10,
          "enabledFlag": "Y"
        };

        vm.$post('/api/production/headerlist',
          vm.screen1
        ).then(function (response) {
            vm.refresh=false;
            vm.total = response.total;
            vm.dataList = response.rows;
            for (let i in vm.dataList) {
              if(vm.dataList[i].pictureFilePath!=null){
                vm.dataList[i].pictureFilePath = vm.$store.getters.getPictureUrl + vm.dataList[i].pictureFilePath;
              }else{
                vm.dataList[i].pictureFilePath=vm.examplePic;
              }
              for (let j in vm.dataList[i].prdItemPaymode) {
                for (let k in vm.currencyList) {
                  if (vm.dataList[i].prdItemPaymode[j].currencyCode === vm.currencyList[k].value) {
                    vm.dataList[i].prdItemPaymode[j].currency = vm.currencyList[k].meaning;
                  }
                }
              }
            }
            for (let i in vm.dataList) {
              vm.dataList[i].currencyCode = "";
              for (let j in vm.dataList[i].prdItemPaymode) {
                if(vm.dataList[i].prdItemPaymode[j].currency!=null){
                  vm.dataList[i].currencyCode += vm.dataList[i].prdItemPaymode[j].currency + '、';
                }
              }

            }
            for (let i in vm.dataList) {
              vm.dataList[i].currencyCode = vm.dataList[i].currencyCode.substring(0, vm.dataList[i].currencyCode.length - 1);
            }
            vm.scrollerStatus.pullupStatus = 'default'
            // this.$refs.scroller.reset()
            console.log(vm.scrollerStatus.pullupStatus)
            vm.$nextTick(() => {
              vm.$refs.scroller.reset()
            })


          }, function (response) {
            vm.refresh=false;
            console.log("接口出错了");
          })

      }
      if (index === 3) {
        vm.showInsurance = false;
        vm.showBond = false;
        vm.showInvest = false;
        vm.showService = true;
        vm.screen1 = {
          "bigClassName": "增值服务",
          "page": 1,
          "pagesize": 10,
          "enabledFlag": "Y"
        };


        vm.$post('/api/production/headerlist',
          vm.screen1
        ).then(function (response) {
            vm.refresh=false;
            vm.total = response.total;
            vm.dataList = response.rows;

            for (let i in vm.dataList) {
              var type = false;
              if(vm.dataList[i].pictureFilePath!=null){
                vm.dataList[i].pictureFilePath = vm.$store.getters.getPictureUrl + vm.dataList[i].pictureFilePath;
              }else{
                vm.dataList[i].pictureFilePath=vm.examplePic;
              }
              if(vm.dataList[i].midClass==='HPV'){
                for(let j in vm.dataList[i].prdItemSublineList){
                  if (vm.dataList[i].prdItemSublineList[j].onlinePaymentFlag==='N') {
                    type = true;
                  }
                }
              }


              var price=null;
              if (vm.dataList[i].prdItemSublineList.length === 0) {
                 price = "免费";
              }
              else {
                response.rows[i].price = [];
                for (let k in response.rows[i].prdItemSublineList) {
                  if(response.rows[i].prdItemSublineList[k].price!==null&&response.rows[i].prdItemSublineList[k].price!==''&&response.rows[i].prdItemSublineList[k].price!=='实时报价'){
                    let n = Number(response.rows[i].prdItemSublineList[k].price);
                    if (!isNaN(n)) {
                      response.rows[i].price.push(n);
                    }
                  }
                  if(response.rows[i].prdItemSublineList[k].price==='实时报价'){
                    price="实时报价";
                  }
                }
                if (response.rows[i].price.length === 0&&price===null) {
                     price = "免费";
                }else if (response.rows[i].price.length === 1) {
                  if (type) {
                     price = "￥" + response.rows[i].price[0] + "-" + response.rows[i].price[0] + "(需现场支付)";
                  }
                  else {
                     price = "￥" + response.rows[i].price[0] + "-" + response.rows[i].price[0];
                  }
                }else if (response.rows[i].price.length > 1) {
                  let temp;
                  for (let j in  response.rows[i].price) {
                    for (var l = 0; l < response.rows[i].price.length - 1 - j; l++) {
                      if (response.rows[i].price[l] > response.rows[i].price[l + 1]) {
                        temp = response.rows[i].price[l];
                        response.rows[i].price[l] = response.rows[i].price[l + 1];
                        response.rows[i].price[l + 1] = temp;
                      }
                    }
                  }
                  if (type) {
                    price = "￥" + response.rows[i].price[0] + "-" + response.rows[i].price[response.rows[i].price.length - 1] + "(需现场支付)";
                  }
                  else {
                    price = "￥" + response.rows[i].price[0] + "-" + response.rows[i].price[response.rows[i].price.length - 1];
                  }
                }
              }
              vm.dataList[i].price=price;

            }


            vm.scrollerStatus.pullupStatus = 'default'
            // this.$refs.scroller.reset()
            console.log(vm.scrollerStatus.pullupStatus)
            vm.$nextTick(() => {
              vm.$refs.scroller.reset()
            })


          }, function (response) {
            vm.refresh=false;
            console.log("接口出错了");
          })

      }
    }
  ,
    goPage1: function (index) {
      var vm = this;
      vm.$store.commit('assignmentProduct', {param: vm.dataList[index]});
      vm.$router.push({path: '/productDetail'});

    }
  ,
    goPage2: function (index) {
      var vm = this;
      vm.$store.commit('assignmentProduct', {param: vm.dataList[index]});
      vm.$router.push({path: '/bondDetail'});

    }
  ,
    goPage3: function (index) {
      var vm = this;
      vm.$store.commit('assignmentProduct', {param: vm.dataList[index]});
      vm.$router.push({path: '/investDetail'});
    }
  ,
    goPage4: function (index) {
      var vm = this;
      vm.$store.commit('assignmentProduct', {param: vm.dataList[index]});
      vm.$router.push({path: '/serviceDetail'});
    }
  ,

    clickScreen: function () {
      var vm = this;
      console.log(vm.chooseIndex);
      if (vm.chooseIndex === 0) {
        if(vm.insurance.productLable===null){
          vm.$post('/api/supplier/queryAll',{
            "businessScope":"保险",
          }).then(function(response){
            for(let i in response.rows){
              vm.insurance.companyList.push(response.rows[i].name);
            }

          },function(response){

          });
          vm.$post('/api/production/queryItemLabels',{
            bigClass:"BX"
          }).then(function(response){
            vm.insurance.productLable=response.rows;
            for(let i in vm.insurance.productLable){
              vm.$set(vm.insurance.productLable[i],'active',false);
            }

          }),function(response){
            console.log("接口出错了");
          }
        }
        vm.showBondScreen=false;
        vm.showInvScreen=false;
        vm.showInsScreen=true;
      }
      if (vm.chooseIndex === 1) {
        vm.showBondScreen=true;
        vm.showInvScreen=false;
        vm.showInsScreen=false;
      }
      if (vm.chooseIndex === 2) {
        vm.showBondScreen=false;
        vm.showInvScreen=true;
        vm.showInsScreen=false;
      }
    }
  ,
    goService: function (index) {
      var vm = this;
      vm.$store.commit('assignmentProduct', {param: vm.dataList[index]});
      if (vm.dataList[index].midClass === "JDYD") {
        vm.$router.push({path: '/hotelReserve'});
      }
      if (vm.dataList[index].midClass === "HSYD") {
        vm.$router.push({path: '/clubReserve'});
      }
      if (vm.dataList[index].midClass === "TTQZ") {
        vm.$router.push({path: '/signReserve'});
      }
      if (vm.dataList[index].midClass === "ZCFW") {
        vm.$router.push({path: '/carReserve'});
      }
      if (vm.dataList[index].midClass === "HPV") {
        vm.$router.push({path: '/HPVReserve'});
      }


    }
  ,
    loadMore()
    {
      var vm = this;
      if (vm.dataList.length === vm.total) {
        vm.$vux.toast.show({text:'已经到底了'});
        vm.scrollerStatus.pullupStatus = 'disabled' // 禁用下拉
      } else {
        vm.refresh=true;
        var page = ++vm.screen1.page;
        if (vm.chooseIndex === 0) {
          vm.$post('/api/production/headerlist?page=' + page,
            vm.screen1
          ).then(function (response) {
              vm.refresh=false;
              console.log(vm.dataList.length);
              for (let i in response.rows) {
                if(response.rows[i].pictureFilePath!=null){
                  response.rows[i].pictureFilePath = vm.$store.getters.getPictureUrl + response.rows[i].pictureFilePath;
                }else{
                  response.rows[i].pictureFilePath=vm.examplePic;
                }
                for (let j in response.rows[i].prdItemPaymode) {
                  for (let k in vm.currencyList) {
                    if (response.rows[i].prdItemPaymode[j].currencyCode === vm.currencyList[k].value) {
                      response.rows[i].prdItemPaymode[j].currency = vm.currencyList[k].meaning;
                    }
                  }
                }
              }
              for (let i in response.rows) {
                response.rows[i].currencyCode = "";
                response.rows[i].attribute120 = "";
                for (let j in response.rows[i].prdItemPaymode) {
                  if(response.rows[i].prdItemPaymode[j].currency!=null){
                    response.rows[i].currencyCode += response.rows[i].prdItemPaymode[j].currency + '、';
                  }
                }
                for (let k in response.rows[i].prdItemSublineList) {
                  let n = Number(response.rows[i].prdItemSublineList[k].sublineItemName);
                  if (!isNaN(n)) {
                    response.rows[i].prdItemSublineList[k].sublineItemName += '年';
                  }
                  response.rows[i].attribute120 += response.rows[i].prdItemSublineList[k].sublineItemName + '、';
                }
              }
              for (let i in response.rows) {
                response.rows[i].currencyCode = response.rows[i].currencyCode.substring(0, response.rows[i].currencyCode.length - 1);
                response.rows[i].attribute120 = response.rows[i].attribute120.substring(0, response.rows[i].attribute120.length - 1);
              }
              vm.dataList = vm.dataList.concat(response.rows);
              vm.scrollerStatus.pullupStatus = 'default'
              console.log(vm.scrollerStatus.pullupStatus)
              vm.$nextTick(() => {
                vm.$refs.scroller.reset()
              })
            }, function (response) {
              console.log("接口出错了");
            })

        }
        if (vm.chooseIndex === 1) {
//            vm.rerefresh = true;
          vm.$post('/api/production/headerlist?page=' + page,
            vm.screen1
          ).then(function (response) {
                vm.refresh = false;
              for (let i in response.rows) {
                if(response.rows[i].pictureFilePath!=null){
                  response.rows[i].pictureFilePath = vm.$store.getters.getPictureUrl + response.rows[i].pictureFilePath;
                }else{
                  response.rows[i].pictureFilePath=vm.examplePic;
                }
                for(let j in vm.dividendCycle){
                  if(response.rows[i].attribute53===vm.dividendCycle[j].value){
                    response.rows[i].attribute53=vm.dividendCycle[j].meaning;
                  }
                }
                for (let j in response.rows[i].prdItemPaymode) {
                  for (let k in vm.currencyList) {
                    if (response.rows[i].prdItemPaymode[j].currencyCode === vm.currencyList[k].value) {
                      response.rows[i].prdItemPaymode[j].currency = vm.currencyList[k].meaning;
                    }
                  }
                }
              }
              for (let i in response.rows) {
                response.rows[i].currencyCode = "";
                response.rows[i].attribute51 = "";
                for (let j in response.rows[i].prdItemPaymode) {
                  if(response.rows[i].prdItemPaymode[j].currency!=null){
                    response.rows[i].currencyCode += response.rows[i].prdItemPaymode[j].currency + '、';
                  }

                }
                for (let k in response.rows[i].prdItemSublineList) {
                  let n = Number(response.rows[i].prdItemSublineList[k].sublineItemName);
                  if (!isNaN(n)) {
                    response.rows[i].prdItemSublineList[k].sublineItemName += '年';
                  }
                  response.rows[i].attribute51 += response.rows[i].prdItemSublineList[k].sublineItemName + '、';
                }
              }
              for (let i in response.rows) {
                response.rows[i].currencyCode = response.rows[i].currencyCode.substring(0, response.rows[i].currencyCode.length - 1);
                response.rows[i].attribute51 = response.rows[i].attribute51.substring(0, response.rows[i].attribute51.length - 1);

              }
              vm.dataList = vm.dataList.concat(response.rows);
              vm.scrollerStatus.pullupStatus = 'default'
              // this.$refs.scroller.reset()
              console.log(vm.scrollerStatus.pullupStatus)
              vm.$nextTick(() => {
                vm.$refs.scroller.reset()
              })

            }, function (response) {
              vm.refresh=false;
              console.log("接口出错了");
            })

        }
        if (vm.chooseIndex === 2) {
          vm.$post('/api/production/headerlist?page=' + page,
            vm.screen1
          ).then(function (response) {
                vm.refresh = false;
              for (let i in response.rows) {
                if(response.rows[i].pictureFilePath!=null){
                  response.rows[i].pictureFilePath = vm.$store.getters.getPictureUrl + response.rows[i].pictureFilePath;
                }else{
                  response.rows[i].pictureFilePath=vm.examplePic;
                }
                console.log();
                for (let j in response.rows[i].prdItemPaymode) {
                  for (let k in vm.currencyList) {
                    if (response.rows[i].prdItemPaymode[j].currencyCode === vm.currencyList[k].value) {
                      response.rows[i].prdItemPaymode[j].currency = vm.currencyList[k].meaning;
                    }
                  }
                }
              }
              for (let i in response.rows) {
                response.rows[i].currencyCode = "";
                for (let j in response.rows[i].prdItemPaymode) {
                  if( response.rows[i].prdItemPaymode[j].currency!=null){
                    response.rows[i].currencyCode += response.rows[i].prdItemPaymode[j].currency + '、';
                  }

                }

              }
              for (let i in response.rows) {
                response.rows[i].currencyCode = response.rows[i].currencyCode.substring(0, response.rows[i].currencyCode.length - 1);
              }
              vm.dataList = vm.dataList.concat(response.rows);
              vm.scrollerStatus.pullupStatus = 'default'
              vm.$nextTick(() => {
                vm.$refs.scroller.reset()
              })


            }, function (response) {
              vm.refresh=false;
              console.log("接口出错了");
            })

        }
        if (vm.chooseIndex === 3) {
          vm.$post('/api/production/headerlist?page='+ page,
            vm.screen1
          ).then(function (response) {
              vm.refresh = false;
              for (let i in  response.rows) {
                var type = false;
                if(response.rows[i].pictureFilePath!=null){
                  response.rows[i].pictureFilePath = vm.$store.getters.getPictureUrl + response.rows[i].pictureFilePath;
                }else{
                  response.rows[i].pictureFilePath=vm.examplePic;
                }
                if(response.rows[i].midClass==='HPV'){
                  for(let j in response.rows[i].prdItemSublineList){
                    if ( response.rows[i].prdItemSublineList[j].onlinePaymentFlag === "N") {
                      type = true;
                    }
                  }
                }
                var price=null;
                if ( response.rows[i].prdItemSublineList.length === 0) {
                  price = "免费";
                } else {
                  response.rows[i].price = [];
                  for (let k in response.rows[i].prdItemSublineList) {
                    if(response.rows[i].prdItemSublineList[k].price!==null && response.rows[i].prdItemSublineList[k].price!==''&&response.rows[i].prdItemSublineList[k].price!=='实时报价') {
                      let n = Number(response.rows[i].prdItemSublineList[k].price);
                      if (!isNaN(n)) {
                        response.rows[i].price.push(n);
                      }
                    }
                    if(response.rows[i].prdItemSublineList[k].price==='实时报价'){
                      price="实时报价";
                    }
                  }
                  if (response.rows[i].price.length === 0&&price===null) {
                      price = "免费";
                  }else if (response.rows[i].price.length === 1 && response.rows[i].price instanceof Array) {
                    if (type) {
                      price = "￥" + response.rows[i].price[0] + "-" + response.rows[i].price[0] + "(需现场支付)";
                    }
                    else {
                      price = "￥" + response.rows[i].price[0] + "-" + response.rows[i].price[0];
                    }
                  } else if (response.rows[i].price.length > 1 && response.rows[i].price instanceof Array) {
                    let temp;
                    for (let j in response.rows[i].price) {
                      for (var l = 0; l < response.rows[i].price.length - 1 - j; l++) {
                        if (response.rows[i].price[l] > response.rows[i].price[l + 1]) {
                          temp = response.rows[i].price[l];
                          response.rows[i].price[l] = response.rows[i].price[l + 1];
                          response.rows[i].price[l + 1] = temp;
                        }
                      }
                    }
                    if (type) {
                      price = "￥" + response.rows[i].price[0] + "-" + response.rows[i].price[response.rows[i].price.length - 1] + "(需现场支付)";
                    }
                    else {
                      price = "￥" + response.rows[i].price[0] + "-" + response.rows[i].price[response.rows[i].price.length - 1];
                    }
                  }
                }
                   response.rows[i].price=price;

                }

              vm.dataList = vm.dataList.concat(response.rows);
              vm.scrollerStatus.pullupStatus = 'default'
              vm.$nextTick(() => {
                vm.$refs.scroller.reset()
              })
            }, function (response) {
              vm.refresh=false;
              console.log("接口出错了");
            })
        }

      }
    },
    change1:function(index){
      var vm=this;
      vm.insurance.chooseIndex=index;
      if(vm.insurance.productLable[index].active){
        vm.insurance.productLable[index].active=false;
      }else{
        for(let i in vm.insurance.productLable){
          vm.insurance.productLable[i].active=false;
        }
        vm.insurance.productLable[index].active=true;
      }


    },
    clearAll1:function(){
      var vm=this;
      vm.insurance.showConfirm=true;
      vm.insurance.mention="确认清空所有查询条件么？";
    },
    onCancel1:function(){
      var vm=this;
      vm.insurance.showConfirm=false;
    },
    onConfirm1:function(){
      var vm=this;
      vm.insurance.insuranceCompany=null;
      vm.insurance.insuranceProduct=null;
      vm.insurance.insuranceObject=null;
      vm.insurance.productName=null;
      vm.insurance.toggle=false;
      for(let i in vm.insurance.productLable){
        vm.insurance.productLable[i].active=false;
      }

    },
    toggle1:function(){
      var vm=this;
      vm.insurance.toggle=!vm.insurance.toggle;
    },
    screenInsurance:function(){
      var vm=this;
      vm.showInsScreen=false;
      vm.showInsurance=true;
      vm.showBond=false;
      vm.showInvest=false;
      vm.refresh=true;
      var ageFrom=null;
      var ageTo=null;
      var labelName=null;
      if(vm.insurance.insuranceObject==="1-15岁"){
        ageFrom="1";
        ageTo="15";
      }else if(vm.insurance.insuranceObject==="16-30岁"){
        ageFrom="16";
        ageTo="30";
      }else if(vm.insurance.insuranceObject==="31-45岁"){
        ageFrom="31";
        ageTo="45";
      }else if(vm.insurance.insuranceObject==="45岁以上"){
        ageFrom="45";
        ageTo=null;
      }
      for(let i in vm.insurance.productLable){
        if(vm.insurance.productLable[i].active){
          labelName=vm.insurance.productLable[i].labelName;
        }
      }
      var toggle=null;
      if(vm.insurance.toggle){
        toggle='Y';
      }else{
        toggle=null;
      }
      vm.insurance.screen1={
        "bigClassName":"保险",
        "itemLabel":labelName,
        "midClassName":vm.insurance.insuranceProduct,
        "ageFrom":ageFrom,
        "ageTo":ageTo,
        "supplierName":vm.insurance.insuranceCompany,
        "itemName":vm.insurance.productName,
        "discountFlag":toggle,
        "page":1,
        "pagsize":10,
        "enabledFlag":"Y"
      };
      vm.screen1=vm.insurance.screen1;

      vm.$refs.scroller.reset({top: 0});
      vm.$post('/api/production/headerlist',
        vm.insurance.screen1
      ).then(function (response) {
          vm.refresh=false;
          vm.total = response.total;
          vm.dataList = response.rows;
          for (let i in vm.dataList) {
            if(vm.dataList[i].pictureFilePath!=null){
              vm.dataList[i].pictureFilePath = vm.$store.getters.getPictureUrl + vm.dataList[i].pictureFilePath;
            }else{
              vm.dataList[i].pictureFilePath=vm.examplePic;
            }

            for (let j in vm.dataList[i].prdItemPaymode) {
              for (let k in vm.currencyList) {
                if (vm.dataList[i].prdItemPaymode[j].currencyCode === vm.currencyList[k].value) {
                  vm.dataList[i].prdItemPaymode[j].currency = vm.currencyList[k].meaning;
                }
              }

            }
          }
          for (let i in vm.dataList) {
            vm.dataList[i].currencyCode = "";
            vm.dataList[i].attribute120 = "";
            for (let j in vm.dataList[i].prdItemPaymode) {
              if(vm.dataList[i].prdItemPaymode[j].currency!=null){
                vm.dataList[i].currencyCode += vm.dataList[i].prdItemPaymode[j].currency + '、';
              }
            }
            for (let k in vm.dataList[i].prdItemSublineList) {
              let n = Number(vm.dataList[i].prdItemSublineList[k].sublineItemName);
              if (!isNaN(n)) {
                vm.dataList[i].prdItemSublineList[k].sublineItemName += '年';
              }
              vm.dataList[i].attribute120 += vm.dataList[i].prdItemSublineList[k].sublineItemName + '、';
            }
          }
          for (let i in vm.dataList) {
            vm.dataList[i].currencyCode = vm.dataList[i].currencyCode.substring(0, vm.dataList[i].currencyCode.length - 1);
            vm.dataList[i].attribute120 = vm.dataList[i].attribute120.substring(0, vm.dataList[i].attribute120.length - 1);

          }
          vm.scrollerStatus.pullupStatus = 'default'
          vm.$nextTick(() => {
            vm.$refs.scroller.reset()
          })
        }, function (response) {
          vm.refresh=false;
          console.log("接口出错了");
        })
    },
    clearAll2:function(){
      var vm=this;
      vm.invest.showConfirm=true;
      vm.invest.mention="确认清空所有查询条件么？";
    },
    onCancel2:function(){
      var vm=this;
      vm.invest.showConfirm=false;
    },
    onConfirm2:function(){
      var vm=this;
      vm.invest.investPayment=null;
      vm.invest.investArea=null;
      vm.invest.investAim=null;
      vm.invest.investNumber=null;
      vm.invest.investCycle=null;
      vm.invest.productName=null;

    },
    investScreen:function(){
      var vm=this;
      vm.chooseIndex=2;
      vm.showInvScreen=false;
      vm.showInvest=true;
      vm.showBond=false;
      vm.showInsurance=false;
      vm.refresh=true;
      var currencyCode=null;
      var investmentAmountFrom=null;
      var investmentAmountTo=null;
      var transactionDataFrom=null;
      var transactionDataTo=null;
      if(vm.invest.investPayment==="美元"){
        currencyCode="USD";
      }else if(vm.invest.investPayment==="欧元")
      {
        currencyCode="EURO";
      }else if(vm.invest.investPayment==="澳币")
      {
        currencyCode="MOP";
      }

      if(vm.invest.investNumber==="100万以下"){
        investmentAmountFrom=null;
        investmentAmountTo=1000000;
      }else if(vm.invest.investNumber==="100-200万"){
        investmentAmountFrom=1000000;
        investmentAmountTo=2000000;
      }
      else if(vm.invest.investNumber==="200-300万"){
        investmentAmountFrom=2000000;
        investmentAmountTo=3000000;
      }else if(vm.invest.investNumber==="300-500万"){
        investmentAmountFrom=3000000;
        investmentAmountTo=5000000;
      }else if(vm.invest.investNumber==="500万以上"){
        investmentAmountFrom=5000000;
        investmentAmountTo=null;
      }
      if(vm.invest.investCycle==="1个月内"){
        transactionDataFrom=null;
        transactionDataTo="1个月";
      }else if(vm.invest.investNumber==="1-3个月"){
        transactionDataFrom="1个月";
        transactionDataTo="3个月";
      }
      else if(vm.invest.investNumber==="3-6个月"){
        transactionDataFrom="3个月";
        transactionDataTo="6个月";
      }else if(vm.invest.investNumber==="6-12个月"){
        transactionDataFrom="6个月";
        transactionDataTo="12个月";
      }else if(vm.invest.investNumber==="12个月以上"){
        transactionDataFrom="12个月";
        transactionDataTo=null;
      }

      vm.invest.screen1={
        "bigClassName":"移民投资",
        "attribute74":vm.invest.investAim,
        "attribute75":vm.invest.investArea,
        "currencyCode":currencyCode,
        "investmentAmountFrom":investmentAmountFrom,
        "investmentAmountTo":investmentAmountTo,
        "transactionDataTo":transactionDataTo,
        "transactionDataFrom":transactionDataFrom,
        "itemName":vm.invest.productName,
        "page":1,
        "pagesize":10,
        "enabledFlag":"Y"
      };
      vm.screen1=vm.invest.screen1;

      vm.$refs.scroller.reset({top: 46});
      vm.$post('/api/production/headerlist',
        vm.invest.screen1
      ).then(function (response) {
          vm.refresh=false;
          vm.total = response.total;
          vm.dataList = response.rows;
          for (let i in vm.dataList) {
            if(vm.dataList[i].pictureFilePath!=null){
              vm.dataList[i].pictureFilePath = vm.$store.getters.getPictureUrl + vm.dataList[i].pictureFilePath;
            }else{
              vm.dataList[i].pictureFilePath=vm.examplePic;
            }
            for (let j in vm.dataList[i].prdItemPaymode) {
              for (let k in vm.currencyList) {
                if (vm.dataList[i].prdItemPaymode[j].currencyCode === vm.currencyList[k].value) {
                  vm.dataList[i].prdItemPaymode[j].currency = vm.currencyList[k].meaning;
                }
              }
            }
          }
          for (let i in vm.dataList) {
            vm.dataList[i].currencyCode = "";

            for (let j in vm.dataList[i].prdItemPaymode) {
              if(vm.dataList[i].prdItemPaymode[j].currency!=null){
                vm.dataList[i].currencyCode += vm.dataList[i].prdItemPaymode[j].currency + '、';
              }
            }

          }
          for (let i in vm.dataList) {
            vm.dataList[i].currencyCode = vm.dataList[i].currencyCode.substring(0, vm.dataList[i].currencyCode.length - 1);
          }
          vm.scrollerStatus.pullupStatus = 'default'
          // this.$refs.scroller.reset()
          console.log(vm.scrollerStatus.pullupStatus)
          vm.$nextTick(() => {
            vm.$refs.scroller.reset()
          })


        }, function (response) {
          vm.refresh=false;
          console.log("接口出错了");
        })


    },

    clearAll3:function(){
      var vm=this;
      vm.bond.showConfirm=true;
      vm.bond.mention="确认清空所有查询条件么？";
    },
    onCancel3:function(){
      var vm=this;
      vm.bond.showConfirm=false;
    },
    onConfirm3:function(){
      var vm=this;
      vm.bond.bondInterest=null;
      vm.bond.annualInterest=null;
      vm.bond.dividendCycle=null;
      vm.bond.subscriptionFee=null;
      vm.bond.trusteeFee=null;
      vm.bond.marketValue=null;
      vm.bond.productName=null;

    },
    bondScreen:function(){
      var vm=this;
      vm.chooseIndex=1;
      vm.showBondScreen=false;
      vm.showAll=true;
      vm.showBond=true;
      vm.showInvest=false;
      vm.showInsurance=false;
      var sublineItemName=null;
      var annualInterestFrom=null;
      var annualInterestTo=null;
      var marketValueFrom=null;
      var marketValueTo=null;
      if(vm.bond.bondInterest==="2年"){
        sublineItemName=2;
      }else if(vm.bond.bondInterest==="3年"){
        sublineItemName=3;
      }else if(vm.bond.bondInterest==="4年"){
        sublineItemName=4;
      }else if(vm.bond.bondInterest==="5年"){
        sublineItemName=5;
      }else if(vm.bond.bondInterest==="6年"){
        sublineItemName=6;
      }else if(vm.bond.bondInterest==="7年"){
        sublineItemName=7;
      }else if(vm.bond.bondInterest==="7.5年"){
        sublineItemName=7.5;
      }else if(vm.bond.bondInterest==="8年"){
        sublineItemName=8;
      }

      if(vm.bond.annualInterest==="4-6%"){
        annualInterestFrom="4%";
        annualInterestTo="6%";
      }else if(vm.bond.annualInterest==="8-10%"){
        annualInterestFrom="8%";
        annualInterestTo="10%";
      }else if(vm.bond.annualInterest==="10%以上"){
        annualInterestFrom="10%";
        annualInterestTo=null;
      }

      if(vm.bond.marketValue==="10亿以下"){
        marketValueFrom=null;
        marketValueTo=10000000000;
      }else if(vm.bond.maeketValue==="10-30亿"){
        marketValueFrom=10000000000;
        marketValueTo=30000000000;
      }else if(vm.bond.maeketValue==="30-50亿"){
        marketValueFrom=30000000000;
        marketValueTo=50000000000;
      }else if(vm.bond.maeketValue==="50-100亿"){
        marketValueFrom=50000000000;
        marketValueTo=100000000000;
      }else if(vm.bond.maeketValue==="100亿以上"){
        marketValueFrom=100000000000;
        marketValueTo=null;
      }
      var dividendCycle=null;
      for(let i in vm.dividendCycle){
        if(vm.bond.dividendCycle===vm.dividendCycle[i].meaning){
          dividendCycle=vm.dividendCycle[i].value;
        }
      }

      vm.bond.screen1={
        "bigClassName":"债券",
        "annualInterestFrom":annualInterestFrom,
        "annualInterestTo":annualInterestTo,
        "sublineItemName":sublineItemName,
        "marketValueFrom":marketValueFrom,
        "marketValueTo":marketValueTo,
        "attribute53":dividendCycle,
        "attribute56":vm.bond.trusteeFee,
        "itemName":vm.bond.productName,
        "page":1,
        "pagesize":10,
        "enabledFlag":"Y"
      };
      vm.screen1=vm.bond.screen1;
      vm.refresh=true;
      vm.$refs.scroller.reset({top: 46});
      vm.$post('/api/production/headerlist',
        vm.bond.screen1
      ).then(function (response) {
          vm.refresh=false;
          vm.total = response.total;
          vm.dataList = response.rows;
          for (let i in vm.dataList) {
            if(vm.dataList[i].pictureFilePath!=null){
              vm.dataList[i].pictureFilePath = vm.$store.getters.getPictureUrl + vm.dataList[i].pictureFilePath;
            }else{
              vm.dataList[i].pictureFilePath=vm.examplePic;
            }
            for(let j in vm.dividendCycle){
              if(vm.dataList[i].attribute53===vm.dividendCycle[j].value){
                vm.dataList[i].attribute53=vm.dividendCycle[j].meaning;
              }
            }
            for (let j in vm.dataList[i].prdItemPaymode) {
              for (let k in vm.currencyList) {
                if (vm.dataList[i].prdItemPaymode[j].currencyCode === vm.currencyList[k].value) {
                  vm.dataList[i].prdItemPaymode[j].currency = vm.currencyList[k].meaning;
                }
              }
            }
          }
          for (let i in vm.dataList) {
            vm.dataList[i].currencyCode = "";
            vm.dataList[i].attribute51 = "";
            for (let j in vm.dataList[i].prdItemPaymode) {
              if(vm.dataList[i].prdItemPaymode[j].currency!=null){
                vm.dataList[i].currencyCode += vm.dataList[i].prdItemPaymode[j].currency + '、';
              }
            }
            for (let k in vm.dataList[i].prdItemSublineList) {
              let n = Number(vm.dataList[i].prdItemSublineList[k].sublineItemName);
              if (!isNaN(n)) {
                vm.dataList[i].prdItemSublineList[k].sublineItemName += '年';
              }
              vm.dataList[i].attribute51 += vm.dataList[i].prdItemSublineList[k].sublineItemName + '、';
            }
          }
          for (let i in vm.dataList) {
            vm.dataList[i].currencyCode = vm.dataList[i].currencyCode.substring(0, vm.dataList[i].currencyCode.length - 1);
            vm.dataList[i].attribute51 = vm.dataList[i].attribute51.substring(0, vm.dataList[i].attribute51.length - 1);

          }
          vm.scrollerStatus.pullupStatus = 'default'
          // this.$refs.scroller.reset()
          console.log(vm.scrollerStatus.pullupStatus)
          vm.$nextTick(() => {
            vm.$refs.scroller.reset()
          })
        }, function (response) {
          vm.refresh=false;
          console.log("接口出错了");
        })

    },
    back1(){
      var vm=this;
      vm.showInsScreen=false;
    },
    back2(){
      var vm=this;
      vm.showInvScreen=false;
    },
    back3(){
      var vm=this;
      vm.showBondScreen=false;
    }

  }
  }
</script>
<style lang="less">
  * {
    padding: 0px;
    margin: 0px;
  }
 body{
   margin:0;
 }
  .product_center {
    width: 100%;
    background-color: #F4F4F7;
    position: absolute;
    min-height: 100%;

  .fixed_header{
    height: 45px;
    box-shadow:1px 3px rgba(200, 199, 204, 0.6);
    z-index:10;
    position: fixed;
    width: 100%;
  }

  .hb {
    display: inline-flex;
    height: 45px !important;
    width: 85% !important;
    color: #333333 !important;
  }

  .hb_tab {
    font-size: 1.4rem !important;
    background-size: 2px !important;
    line-height: 50px !important;

  }

  .middle {
    margin-top: 15px;
    min-height: 15rem;
  }

  .middle_one {
    background-color: white;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 15px;
    min-height: 15rem;
    box-shadow: 2px 3px rgba(0, 0, 0, 0.16);

  }
  .middle_one_new {
    background-color: white;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 15px;
    min-height: 15rem;
    box-shadow: 2px 3px rgba(0, 0, 0, 0.16);

  }

  .middle_three {
    position: relative;
    padding-top: 12px;
    padding-left: 10px;
    font-size: 1.6rem;
    font-weight: 500;
    color: #53595f;
  }

  .bandTitle {
    display: flex;
    display: -webkit-flex;
    align-items: center;
  }

  .middle_three_bond {
    /*display: inline-block;*/
    position: relative;
    margin-top: 12px;
    margin-left: 10px;
    font-size: 1.6rem;
    font-weight: 500;
    color: #53595f;
    /*width: 70%;*/
  }

  .middle_three_new {
    display: inline-block;
    position: relative;
    margin-top: 12px;
    margin-left: 10px;
    font-size: 1.6rem;
    font-weight: 500;
    color: #53595f;
    /*width: 70%;*/
  }

  .middle_three_service {
    display: inline-block;
    position: relative;
    margin-top: 12px;
    border: solid 1px #E5B33E;
    color: #E5B33E;
    height: 1.8rem;
    width: 7rem;
    float: right;
    text-align: center;
    margin-right: 10px;
    border-radius: 4px;
    line-height: 1.7;
  }

  .middle_bond {
    position: relative;
    margin-top: 2px;
    margin-left: 10px;
    font-size: 1.3rem;
    color: #666666;
    /*width: 30%;*/
  }

  .middle_forth {
    width: 100%;
    margin-top: 6px;
    min-height: 12rem;
    margin-bottom: 6px;
  }

  .img {
    position: absolute;
    margin-left: 10px;
    /*margin-top: 12px;*/
    height: 100px;
    width: 90px;
  }

  .middle_sixth {
    display: flex;
    display: -webkit-flex;
    padding-top: 5px;
  }

  .middle_fifth {
    position: relative;
    display: inline-block;
    margin-left: 110px;
    text-align-last: justify;
    font-size: 1.3rem;
    color: #666666;
    min-width: 7rem;
  }

  /*.middle_fifth1 {*/
    /*position: relative;*/
    /*display: inline-block;*/
    /*margin-left: 110px;*/
    /*letter-spacing: 4px;*/
    /*font-size: 1.3rem;*/
    /*color: #666666;*/
    /*width: 6rem;*/
  /*}*/

  /*.middle_fifth2 {*/
    /*position: relative;*/
    /*display: inline-block;*/
    /*margin-left: 110px;*/
    /*letter-spacing: 10.9px;*/
    /*font-size: 1.3rem;*/
    /*color: #666666;*/
    /*width: 6rem;*/
  /*}*/

  .middle_tenth {
    position: relative;
    display: inline-block;
    font-size: 1.3rem;
    color: #666666;
    width: calc(~ "100% - 6rem - 110px");
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .img_choose{
    background-color: white;
    display: inline-block;
    position: fixed;
    width: 15%;
    line-height: 45px;
    text-align: center;
    border-left:1px solid #e5e5e5 !important;
    z-index:10;


  .choose {
    width: 2rem;
    height: 2rem;
    /* position: absolute; */
    right: 2rem;
    top: 1.2rem;
    /*z-index: 10;*/
    display: inline-block;
    vertical-align: middle;
    /* padding: 5px 5px; */
    background-size: contain;

  }
  }


  .middle_fifth_new {
    position: relative;
    display: inline-block;
    margin-left: 110px;
    margin-top: 10px;
    font-size: 1.3rem;
    color: #666666;
    min-width: 7rem;
  }

  .middle_tenth_new {
    position: relative;
    display: inline-block;
    margin-top: 10px;
    font-size: 1.3rem;
    color: #E5B33E;
    width: calc(~ "100% - 7rem - 110px");
  }

  .middle_tenth_one {
    position: relative;
    display: inline-block;
    margin-left: 110px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

  }

  .refresh {
    width: 100%;
    text-align: center;
    font-size: 1.3rem;
    letter-spacing: 2px;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  }

  .insurance{
    width: 100%;
    background-color: white;
    min-height: 100%;
    position: absolute;
    z-index:100;
    top:0;

   .back_btn{
     width: 8rem;
     position: relative;
     margin-top: 12px;
     border: solid 1px #E5B33E;
     color: #E5B33E;
     height: 1.8rem;
     float: left;
     text-align: center;
     margin-left: 10px;
     border-radius: 5px;
     line-height: 1.7;

   }

  .weui-cells:before{
    border-top: none;
  }
  .weui-cells:after{
    left:10px;
    border-bottom: 2px solid #d9d9d9;
  }
  .weui-cell_access .weui-cell__ft{
    padding-right: 23px;
  }
  .weui-cells{
    font-size: 1.4rem;
  }
  .weui-cell_access .weui-cell__ft:after{
    height: 10px;
    width: 10px;
  }
  .whole{
    display: flex;
    display: -webkit-flex;
    align-items: center;
    min-height: 4rem;
    margin: 10px 0px 1rem 1rem;
    border-bottom: 1px solid #D9D9D9;
  }
  .left{
    display: inline-block;
    width:30%;
    align-items: center;
    letter-spacing: 1px;
    margin-left:4px;
  }
  .right{
    border: 0px;
    display: inline-block;
    width: 70%;
    text-align: right;
    padding-right: 1rem;
    height: 3rem;
    outline: none;
    font-size: 1.4rem;
  }

  .right_new{
    display:inline-block;
    position:relative;
    margin-left: 60%;
    height: 2rem;
    width: 2rem;
    align-items: center;

  }
  .right_not{
    display:inline-block;
    position:relative;
    margin-left: 60%;
    height: 2rem;
    width: 2rem;
    align-items: center;

  }
  .product_lable{
    margin-top: 5px;
    min-height: 10rem;
    margin-bottom: 4rem;
    display: inline-block;
    width: 100%;

  }
  .product_lable_introduce{
    position: relative;
    margin-left: 13px;
    font-size: 1.7rem;
  }
  .product_lable_one{
    position: relative;
    width: 25vw;
    text-align: center;
    padding-top: 0.5rem;
    height: 2.5rem;
    background-color: #F0F0F0;
    display: inline-block;
    margin: 4%;
    float: left;
    border-radius: 4px;
    line-height: 1.5;


  }
  .product_lable_two{
    position: relative;
    width:25vw;
    text-align: center;
    padding-top: 0.5rem;
    height:2.5rem;
    background-color:#F7E5B7 ;
    display: inline-block;
    margin:4%;
    float: left;
    border-radius: 4px;
    line-height: 1.5;
  }
  .button_type{
    /*margin-top: 30rem;*/
    font-weight: 600;
    letter-spacing: 2px;
    text-align: center;
    font-size: 1.8rem;
  }
  .button_left{
    position: relative;
    display: inline-block;
    width:40%;
    height:4rem;
    border:solid 1px #999999;
    border-radius: 4px;
    margin:1rem;
    padding-top:1.5rem;
    color:#999999;

  }
  .button_right{
    position: relative;
    display: inline-block;
    width:40%;
    height:4rem;
    background-color:#E6A914 ;
    border-radius: 4px;
    margin:1rem;
    padding-top:1.5rem;
    color: white;

  }


  }

  .invest {
    width: 100%;
    background-color: white;
    min-height: 100%;
    position: absolute;
    z-index:100;
    top:0;

  .back_btn{
    width: 8rem;
    position: relative;
    margin-top: 12px;
    border: solid 1px #E5B33E;
    color: #E5B33E;
    height: 1.8rem;
    float: left;
    text-align: center;
    margin-left: 10px;
    border-radius: 5px;
    line-height: 1.7;

  }

  .weui-cells:before{
    border-top: none;
  }
  .weui-cells:after{
    left:10px;
    border-bottom: 2px solid #D9D9D9;
  }
  .weui-cell_access .weui-cell__ft{
    padding-right: 23px;
  }
  .weui-cells{
    font-size: 1.4rem;
  }
  .weui-cell_access .weui-cell__ft:after{
    height: 10px;
    width: 10px;
  }
  .whole{
    display: flex;
    display: -webkit-flex;
    align-items: center;
    min-height: 4rem;
    margin: 10px 0px 1rem 1rem;
    border-bottom: 1px solid #D9D9D9;
  }
  .left{
    display: inline-block;
    width:30%;
    align-items: center;
    letter-spacing: 1px;
    margin-left: 4px;
  }
  .right{
    border: 0px;
    display: inline-block;
    width: 70%;
    text-align: right;
    padding-right: 1rem;
    height: 3rem;
    outline: none;
    font-size: 1.4rem;
  }

  .button_type{
    margin-top: 20rem;
    font-weight: 600;
    letter-spacing: 2px;
    text-align: center;
    font-size: 1.8rem;
  }
  .button_left{
    position: relative;
    display: inline-block;
    width:40%;
    height:4rem;
    border:solid 1px #999999;
    border-radius: 4px;
    margin:1rem;
    padding-top:1.5rem;
    color:#999999;

  }
  .button_right{
    position: relative;
    display: inline-block;
    width:40%;
    height:4rem;
    background-color:#E6A914 ;
    border-radius: 4px;
    margin:1rem;
    padding-top:1.5rem;
    color: white;

  }
  }

  .bond{
    width: 100%;
    background-color: white;
    min-height: 100%;
    position: absolute;
    z-index:100;
    top:0;

  .back_btn{
    width: 8rem;
    position: relative;
    margin-top: 12px;
    border: solid 1px #E5B33E;
    color: #E5B33E;
    height: 1.8rem;
    float: left;
    text-align: center;
    margin-left: 10px;
    border-radius: 5px;
    line-height: 1.7;

  }

  .weui-cells:before{
    border-top: none;
  }
  .weui-cells:after{
    left:10px;
    border-bottom: 2px solid #D9D9D9;
  }
  .weui-cell_access .weui-cell__ft{
    padding-right: 23px;
  }
  .weui-cells{
    font-size: 1.4rem;
  }
  .weui-cell_access .weui-cell__ft:after{
    height: 10px;
    width: 10px;
  }
  .whole{
    display: flex;
    display: -webkit-flex;
    align-items: center;
    min-height: 4rem;
    margin: 10px 0px 1rem 1rem;
    border-bottom: 1px solid #D9D9D9;
  }
  .left{
    display: inline-block;
    width:30%;
    align-items: center;
    letter-spacing: 1px;
    margin-left: 4px;
  }
  .right{
    border: 0px;
    display: inline-block;
    width: 70%;
    text-align: right;
    padding-right: 1rem;
    height: 3rem;
    outline: none;
    font-size: 1.4rem;
  }
  .button_type{
    margin-top: 20rem;
    font-weight: 600;
    letter-spacing: 2px;
    text-align: center;
    font-size: 1.8rem;
  }
  .button_left{
    position: relative;
    display: inline-block;
    width:40%;
    height:4rem;
    border:solid 1px #999999;
    border-radius: 4px;
    margin:1rem;
    padding-top:1.5rem;
    color:#999999;

  }
  .button_right{
    position: relative;
    display: inline-block;
    width:40%;
    height:4rem;
    background-color:#E6A914 ;
    border-radius: 4px;
    margin:1rem;
    padding-top:1.5rem;
    color: white;

  }
  }




</style>

/**
 * Created by long on 1/14/17.
 */
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
Vue.use(VueResource);

//  code split 示例
//产品中心
const productCenter = resolve => {
  require.ensure(['views/productCenter/productCenter.vue'], () => {
    resolve(require('views/productCenter/productCenter.vue'))
  }, 'productCenter')
}
//分享页面
const share = resolve => {
  require.ensure(['views/share.vue'], () => {
    resolve(require('views/share.vue'))
  }, 'share')
}
//分享页面2C
const share2C = resolve => {
  require.ensure(['views/share2C.vue'], () => {
    resolve(require('views/share2C.vue'))
  }, 'share2C')
}
////保险筛选
//const insuranceScreen = resolve => {
//  require.ensure(['views/productCenter/insuranceScreen.vue'], () => {
//    resolve(require('views/productCenter/insuranceScreen.vue'))
//  }, 'productCenter')
//}
////移民投资筛选
//const investScreen = resolve => {
//  require.ensure(['views/productCenter/investScreen.vue'], () => {
//    resolve(require('views/productCenter/investScreen.vue'))
//  }, 'productCenter')
//}
////债券筛选
//
//const bondScreen = resolve => {
//  require.ensure(['views/productCenter/bondScreen.vue'], () => {
//    resolve(require('views/productCenter/bondScreen.vue'))
//  }, 'productCenter')
//
//}
//债券详情

const bondDetail = resolve => {
  require.ensure(['views/productCenter/bondDetail.vue'], () => {
    resolve(require('views/productCenter/bondDetail.vue'))
  }, 'productCenter')
}
//增值服务详情
const serviceDetail = resolve => {
  require.ensure(['views/productCenter/serviceDetail.vue'], () => {
    resolve(require('views/productCenter/serviceDetail.vue'))
  }, 'productCenter')
}
//移民投资详情
const investDetail = resolve => {
  require.ensure(['views/productCenter/investDetail.vue'], () => {
    resolve(require('views/productCenter/investDetail.vue'))
  }, 'productCenter')
}
//保险详情
const productDetail = resolve => {
  require.ensure(['views/productCenter/productDetail.vue'], () => {
    resolve(require('views/productCenter/productDetail.vue'))
  }, 'productCenter')
}
//会所预定
const clubReserve = resolve => {
  require.ensure(['views/productCenter/clubReserve.vue'], () => {
    resolve(require('views/productCenter/clubReserve.vue'))
  }, 'productCenter')
}
//酒店预定
const hotelReserve = resolve => {
  require.ensure(['views/productCenter/hotelReserve.vue'], () => {
    resolve(require('views/productCenter/hotelReserve.vue'))
  }, 'productCenter')
}
//HPV预定
const HPVReserve = resolve => {
  require.ensure(['views/productCenter/HPVReserve.vue'], () => {
    resolve(require('views/productCenter/HPVReserve.vue'))
  }, 'productCenter')
}
//专车预定
const carReserve = resolve => {
  require.ensure(['views/productCenter/carReserve.vue'], () => {
    resolve(require('views/productCenter/carReserve.vue'))
  }, 'productCenter')
}
//团队签订预定
const signReserve = resolve => {
  require.ensure(['views/productCenter/signReserve.vue'], () => {
    resolve(require('views/productCenter/signReserve.vue'))
  }, 'productCenter')
}
//产品资料
const productImformation = resolve => {
  require.ensure(['views/productCenter/productImformation.vue'], () => {
    resolve(require('views/productCenter/productImformation.vue'))
  }, 'productCenter')
}
//搜索选择客户
const customer = resolve => {
  require.ensure(['views/productCenter/customer.vue'], () => {
    resolve(require('views/productCenter/customer.vue'))
  }, 'productCenter')
}
//搜索选择保单
const policy = resolve => {
  require.ensure(['views/productCenter/policy.vue'], () => {
    resolve(require('views/productCenter/policy.vue'))
  }, 'productCenter')
}
//最新优惠
const events = resolve => {
  require.ensure(['views/productCenter/events.vue'], () => {
    resolve(require('views/productCenter/events.vue'))
  }, 'productCenter')
}
//业务支援
const operationalSupport = resolve => {
  require.ensure(['views/operationalSupport/operationalSupport.vue'], () => {
    resolve(require('views/operationalSupport/operationalSupport.vue'))
  }, 'operationalSupport')
}
//培训申请
const trainApply = resolve => {
  require.ensure(['views/operationalSupport/trainApply.vue'], () => {
    resolve(require('views/operationalSupport/trainApply.vue'))
  }, 'operationalSupport')
}
//会销申请
const willpinApply = resolve => {
  require.ensure(['views/operationalSupport/willpinApply.vue'], () => {
    resolve(require('views/operationalSupport/willpinApply.vue'))
  }, 'operationalSupport')
}
//会客申请
const receiveApply = resolve => {
  require.ensure(['views/operationalSupport/receiveApply.vue'], () => {
    resolve(require('views/operationalSupport/receiveApply.vue'))
  }, 'operationalSupport')
}
//收费规则
const rule = resolve => {
  require.ensure(['views/operationalSupport/rule.vue'], () => {
    resolve(require('views/operationalSupport/rule.vue'))
  }, 'operationalSupport')
}
//我的课程
const mineCourse = resolve => {
  require.ensure(['views/mineCourse/mineCourse.vue'], () => {
    resolve(require('views/mineCourse/mineCourse.vue'))
  }, 'mineCourse')
}
//我的预约
const mineReserve = resolve => {
  require.ensure(['views/mineReserve/mineReserve.vue'], () => {
    resolve(require('views/mineReserve/mineReserve.vue'))
  }, 'mineReserve')
}
//增值服务预约详情
const reserveDetail = resolve => {
  require.ensure(['views/mineReserve/reserveDetail.vue'], () => {
    resolve(require('views/mineReserve/reserveDetail.vue'))
  }, 'mineReserve')
}
//业务支援预约详情
const supportDetail = resolve => {
  require.ensure(['views/mineReserve/supportDetail.vue'], () => {
    resolve(require('views/mineReserve/supportDetail.vue'))
  }, 'mineReserve')
}

//课程详情
const courseDetail = resolve => {
  require.ensure(['views/mineCourse/courseDetail.vue'], () => {
    resolve(require('views/mineCourse/courseDetail.vue'))
  }, 'mineCourse')
}
//我的订单
const mineOrder = resolve => {
  require.ensure(['views/mineOrder/mineOrder.vue'], () => {
    resolve(require('views/mineOrder/mineOrder.vue'))
  }, 'mineOrder')
}
//订单详情
const orderDetail = resolve => {
  require.ensure(['views/mineOrder/orderDetail.vue'], () => {
    resolve(require('views/mineOrder/orderDetail.vue'))
  }, 'mineOrder')
}
//pending列表
const pendingList = resolve => {
  require.ensure(['views/mineOrder/pendingList.vue'], () => {
    resolve(require('views/mineOrder/pendingList.vue'))
  }, 'mineOrder')
}
//pengding详情
const pendingDetail = resolve => {
  require.ensure(['views/mineOrder/pendingDetail.vue'], () => {
    resolve(require('views/mineOrder/pendingDetail.vue'))
  }, 'mineOrder')
}
const treasureCourse = resolve => {
  require.ensure(['views/trainCourse/treasureCourse.vue'], () => {
    resolve(require('views/trainCourse/treasureCourse.vue'))
  }, 'trainCourse')

};
const trainCourse = resolve => {
  require.ensure(['views/trainCourse/trainCourse.vue'], () => {
    resolve(require('views/trainCourse/trainCourse.vue'))
  }, 'trainCourse')
};
const reference = resolve => {
  require.ensure(['views/porductCompared/reference.vue'], () => {
    resolve(require('views/porductCompared/reference.vue'))
  }, 'porductCompared')
};
const insurance = resolve => {
  require.ensure(['views/porductCompared/insurance.vue'], () => {
    resolve(require('views/porductCompared/insurance.vue'))
  }, 'porductCompared')
};
const addCompare = resolve => {
  require.ensure(['views/porductCompared/addCompare.vue'], () => {
    resolve(require('views/porductCompared/addCompare.vue'))
  }, 'porductCompared')
};
const addProduct = resolve => {
  require.ensure(['views/porductCompared/addProduct.vue'], () => {
    resolve(require('views/porductCompared/addProduct.vue'))
  }, 'porductCompared')
};
const register = resolve => {
  require.ensure(['views/register/register.vue'], () => {
    resolve(require('views/register/register.vue'))
  }, 'register')
};
const setAccount = resolve => {
  require.ensure(['views/register/setAccount.vue'], () => {
    resolve(require('views/register/setAccount.vue'))
  }, 'register')
};
const planList = resolve =>{
  require.ensure(['views/electronicPlan/planList.vue'],() => {
    resolve(require('views/electronicPlan/planList.vue'))
  },'planList')
};
const planList1 = resolve =>{
  require.ensure(['views/myTeam/planList.vue'],() => {
    resolve(require('views/myTeam/planList.vue'))
  },'planList')
};
const plan = resolve =>{
  require.ensure(['views/electronicPlan/plan.vue'],() => {
    resolve(require('views/electronicPlan/plan.vue'))
  },'plan')
};
const normalPlan = resolve =>{
  require.ensure(['views/electronicPlan/normalPlan.vue'],() => {
    resolve(require('views/electronicPlan/normalPlan.vue'))
  },'normalPlan')
};

const myOrder = resolve =>{
  require.ensure(['views/order/myOrder.vue'],() => {
    resolve(require('views/order/myOrder.vue'))
  },'myOrder')
};

const orderInfo = resolve =>{
  require.ensure(['views/order/orderInfo.vue'],() => {
    resolve(require('views/order/orderInfo.vue'))
  },'orderInfo')
};

const policyPending = resolve =>{
  require.ensure(['views/order/policyPending.vue'],() => {
    resolve(require('views/order/policyPending.vue'))
  },'policyPending')
};

const searchPendingInfo = resolve =>{
  require.ensure(['views/order/searchPendingInfo.vue'],() => {
    resolve(require('views/order/searchPendingInfo.vue'))
  },'searchPendingInfo')
};
const authentication = resolve =>{
  require.ensure(['views/order/authentication.vue'],() => {
    resolve(require('views/order/authentication.vue'))
  },'authentication')
};

const compareInfo = resolve =>{
  require.ensure(['views/porductCompared/compareInfo.vue'],() => {
    resolve(require('views/porductCompared/compareInfo.vue'))
  },'compareInfo')
};
const compareChart = resolve =>{
  require.ensure(['views/porductCompared/compareChart.vue'],() => {
    resolve(require('views/porductCompared/compareChart.vue'))
  },'compareChart')
};
const afterSale = resolve =>{
  require.ensure(['views/afterSale/afterSale.vue'],() => {
    resolve(require('views/afterSale/afterSale.vue'))
  },'afterSale')
};
const claimsDetail = resolve =>{
  require.ensure(['views/afterSale/claimsDetail.vue'],() => {
    resolve(require('views/afterSale/claimsDetail.vue'))
  },'claimsDetail')
};
const serviceReservation = resolve =>{
  require.ensure(['views/service/serviceReservation.vue'],() => {
    resolve(require('views/service/serviceReservation.vue'))
  },'serviceReservation')
};
const courseInfo = resolve =>{
  require.ensure(['views/trainCourse/courseInfo.vue'],() => {
    resolve(require('views/trainCourse/courseInfo.vue'))
  },'courseInfo')
};
const courseRegistration = resolve =>{
  require.ensure(['views/trainCourse/courseRegistration.vue'],() => {
    resolve(require('views/trainCourse/courseRegistration.vue'))
  },'courseRegistration')
};
const onlinePayment = resolve =>{
  require.ensure(['views/trainCourse/onlinePayment.vue'],() => {
    resolve(require('views/trainCourse/onlinePayment.vue'))
  },'onlinePayment')
};
const evaluateCourse = resolve =>{
  require.ensure(['views/trainCourse/evaluateCourse.vue'],() => {
    resolve(require('views/trainCourse/evaluateCourse.vue'))
  },'evaluateCourse')
};
const review = resolve=>{
  require(['views/trainCourse/review.vue'],resolve);
};
const reviewInfo = resolve=>{
  require(['views/trainCourse/reviewInfo.vue'],resolve);
};
const myTeam = resolve=>{
  require(['views/myTeam/myTeam.vue'],resolve);
};
const contractDetail = resolve=>{
  require(['views/myTeam/contractDetail.vue'],resolve);
};
const special = resolve=>{
  require(['views/myTeam/special.vue'],resolve);
};
const mineTeam = resolve=>{
  require(['views/myTeam/mineTeam.vue'],resolve);
};
const set = resolve=>{
  require(['views/myTeam/set.vue'],resolve);
};
const channelInfo = resolve=>{
  require(['views/myTeam/channelInfo.vue'],resolve);
};
const budget = resolve=>{
  require(['views/porductCompared/budget.vue'],resolve);
};
const protocol = resolve=>{
  require(['views/register/protocol.vue'],resolve);
};
const performance = resolve=>{
  require(['views/service/performance.vue'],resolve);
};
const orderList = resolve=>{
  require(['views/myTeam/orderList.vue'],resolve);
};

const router = new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/treasureCourse',
      name: 'treasureCourse',
      meta: {
        title: '财课堂'
      },
      component: treasureCourse
    },
    {
      path: '/planList',
      name: 'planList',
      component: planList
    },
    {
      path: '/orderList',
      name: 'orderList',
      component: orderList
    },
    {
      path: '/trainCourse',
      name: 'trainCourse',
      meta: {
        title: '培训课程'
      },
      component: trainCourse
    },
	{
      path: '/productCenter',
      name: 'productCenter',
      meta: {
      title: '产品中心'
    },
    //beforeRouteEnter(to, from, next){
    //  next(vm=>{
    //
    //  }),
      component: productCenter
    },
    {
      path: '/share',
      name: 'share',
      meta: {
        title: '提示页面'
      },
      component: share
    },
    {
      path: '/contractDetail',
      name:'contractDetail',
      component: contractDetail
    },
    {
      path: '/special',
      name: 'special',
      component: special
    },
    {
      path: '/share2C',
      name: 'share2C',
      meta: {
        title: '提示页面'
      },
      component: share2C
    },
    //{
    //  path: '/insuranceScreen',
    //  name: 'insuranceScreen',
    //  meta: {
    //    title: '保险筛选'
    //  },
    //  component: insuranceScreen
    //},
    //{
    //  path: '/investScreen',
    //  name: 'investScreen',
    //  meta: {
    //    title: '移民投资筛选'
    //  },
    //  component:investScreen
    //},
    //{
    //  path: '/bondScreen',
    //  name: 'bondScreen',
    //  meta: {
    //    title: '债券筛选'
    //  },
    //  component:bondScreen
    //},
    {
      path: '/bondDetail',
      name: 'bondDetail',
      meta: {
        title: '债券详情'
      },
      component:bondDetail
    },
    {
      path: '/serviceDetail',
      name: 'serviceDetail',
      meta: {
        title: '增值服务详情'
      },
      component:serviceDetail
    },
    {
      path: '/investDetail',
      name: 'investDetail',
      component:investDetail
    },
    {
      path: '/productDetail',
      name: 'productDetail',
      meta: {
        title: '保险详情'
      },
      component:productDetail
    },
    {
      path: '/clubReserve',
      name: 'clubReserve',
      meta: {
        title: '会所预定'
      },
      component:clubReserve
    }, {
      path: '/hotelReserve',
      name: 'hotelReserve',
      meta: {
        title: '酒店预定'
      },
      component:hotelReserve
    },
    {
      path: '/HPVReserve',
      name: 'HPVReserve',
      meta: {
        title: 'HPV预定'
      },
      component:HPVReserve
    },
    {
      path: '/carReserve',
      name: 'carReserve',
      component:carReserve
    },
    {
      path: '/signReserve',
      name: 'signReserve',
      meta: {
        title: '团队签订预定'
      },
      component:signReserve
    },
    {
      path: '/productImformation',
      name: 'productImformation',
      meta: {
        title: '产品资料'
      },
      component:productImformation
    },
    {
      path: '/customer',
      name: 'customer',
      meta: {
        title: '客户选择'
      },
      component:customer
    },
    {
      path: '/policy',
      name: 'policy',
      meta: {
        title: '保单选择'
      },
      component:policy
    },
    {
      path: '/events',
      name: 'events',
      meta: {
        title: '优惠详情'
      },
      component:events
    },
    {
      path: '/operationalSupport',
      name: 'operationalSupport',
      meta: {
        title: '业务支援'
      },
      component:operationalSupport
    },
    {
      path: '/trainApply',
      name: 'trainApply',
      meta: {
        title: '培训申请'
      },
      component:trainApply
    },
    {
      path: '/willpinApply',
      name: 'willpinApply',
      meta: {
        title: '会销申请'
      },
      component:willpinApply
    },
    {
      path: '/receiveApply',
      name: 'receiveApply',
      meta: {
        title: '会客申请'
      },
      component:receiveApply
    },
    {
      path: '/rule',
      name: 'rule',
      meta: {
        title: '支援服务收费规则'
      },
      component:rule
    },
    {
      path: '/mineCourse',
      name: 'mineCourse',
      meta: {
        title: '我的课程'
      },
      component:mineCourse
    },
    {
      path: '/courseDetail',
      name: 'courseDetail',
      meta: {
        title: '课程详情'
      },
      component:courseDetail
    },
    {
      path: '/mineReserve',
      name: 'mineReserve',
      meta: {
        title: '我的预约'
      },
      component:mineReserve
      //redirect:to=>{
      //  if(window.localStorage.wechatOpenid ===window.localStorage.openid){
      //      return '/mineReserve1';
      //  }else{
      //    window.localStorage.page = "";
      //      return '/';
      //  }
      //}
    },
    {
      path: '/reserveDetail',
      name: 'reserveDetail',
      meta: {
        title: '增值服务预约详情'
      },
      component:reserveDetail
    },
    {
      path: '/supportDetail',
      name: 'supportDetail',
      meta: {
        title: '业务支援详情'
      },
      component:supportDetail
    },
    {
      path: '/mineOrder',
      name: 'mineOrder',
      meta: {
        title: '我的订单'
      },
      component:mineOrder
    },
    {
      path: '/orderDetail',
      name: 'orderDetail',
      meta: {
        title: '订单详情'
      },
      component:orderDetail
    },

    {
      path: '/pendingList',
      name: 'pendingList',
      meta: {
        title: 'pending列表'
      },
      component:pendingList
    },
    {
      path: '/pendingDetail',
      name: 'pendingDetail',
      meta: {
        title: 'pending详情'
      },
      component:pendingDetail
    },
    //产品对比
    {
      path: '/reference',
      name: 'reference',
      meta: {
        title: '产品对比条件'
      },
      component: reference
    },
    {
      path: '/insurance',
      name: 'insurance',
      meta: {
        title: '电子计划书'
      },
      component: insurance
    },
    {
      path: '/addProduct',
      name: 'addProduct',
      meta: {
        title: '添加产品对比'
      },
      component: addProduct
    },
    {
      path: '/addCompare',
      name: 'addCompare',
      meta: {
        title: '产品列表'
      },
      component: addCompare
    },
    {
      path:'/compareInfo',
      name:'compareInfo',
      meta: {
        title: '对比表'
      },
      component:compareInfo
    },
    {
      path:'/compareChart',
      name:'compareChart',
      meta: {
        title: '对比图'
      },
      component:compareChart
    },
    //注册
    {
      path: '/',
      name: 'register',
      meta: {
        title: '注册'
      },
      component: register
    },
    {
      path: '/setAccount',
      name: 'setAccount',
      meta: {
        title: '设置账户'
      },
      component: setAccount
    },
    {
      path: '/planList1',
      name: 'planList1',
      component: planList1
    },
    //计划书
    {
      path:'/plan',
      name:'plan',
      meta: {
        title: '计划书详情'
      },
      component:plan
    },
    {
      path:'/normalPlan',
      name:'normalPlan',
      meta: {
        title: '普通计划书'
      },
      component:normalPlan
    },
    //订单
    {
      path:'/myOrder',
      name:'myOrder',
      meta: {
        title: '我的订单'
      },
      component:myOrder
    },
    {
      path:'/orderInfo',
      name:'orderInfo',
      meta: {
        title: '订单详情'
      },
      component:orderInfo
    },
    {
      path:'/policyPending',
      name:'policyPending',
      meta: {
        title: 'pending列表'
      },
      component:policyPending
    },
    {
      path:'/searchPendingInfo',
      name:'searchPendingInfo',
      meta: {
        title: 'pending详情'
      },
      component:searchPendingInfo
    },
    {
      path:'/authentication',
      name:'authentication',
      meta: {
        title: '校验'
      },
      component:authentication
    },
    // 售后
    {
      path:'/afterSale',
      name:'afterSale',
      component:afterSale
    },
    {
      path:'/claimsDetail',
      name:'claimsDetail',
      component:claimsDetail
    },
    {
      path:'/serviceReservation',
      name:'serviceReservation',
      component:serviceReservation
    },
    {
      path:'/courseInfo',
      name:'courseInfo',
      component:courseInfo
    },
    {
      path:'/courseRegistration',
      name:'courseRegistration',
      component:courseRegistration
    },
    {
      path:'/onlinePayment',
      name:'onlinePayment',
      component:onlinePayment
    },
    {
      path:'/evaluateCourse',
      name:'evaluateCourse',
      component:evaluateCourse
    },
    {
      path:'/review',
      name:'review',
      component:review
    },
    {
      path:'/reviewInfo',
      name:'reviewInfo',
      component:reviewInfo
    },
    {
      path:'/myTeam',
      name:'myTeam',
      component:myTeam
    },
    {
      path:'/mineTeam',
      name:'mineTeam',
      component:mineTeam
    },
    {
      path:'/set',
      name:'set',
      component:set
    },
    {
      path:'/channelInfo',
      name:'channelInfo',
      component:channelInfo
    },
    {
      path:'/budget',
      name:'budget',
      component:budget
    },
    {
      path:'/protocol',
      name:'protocol',
      component:protocol
    },
    {
      path:'/performance',
      name:'performance',
      component:performance
    }
  ]
});

export default router

import Vuex from 'vuex';
import Vue from 'vue';
import config from './modules/config.js';
Vue.use(Vuex);

/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */

const state = {
  customerList:{}, //客户信息
  policyList:{}, //查询保单后选择的信息
  token:'',   //获取access_token
  //sessionId:'',  //用户sessionId
  product:{},  //产品详情
  screen1:{}, //保险查询条件
  discount:{},  //优惠信息
  courseDetail:{},
  courseId:'',
  orderId:'',
  pendingId:'',
  reviewParams:{},
  passParam:{},
  productInfo:{},
  supportId:'',
};
const getters = {
  getCustomerList: state=> {
    return state.customerList
  },
  getPolicyList: state=> {
    return state.policyList

  },
  getProduct:state=>{
    return state.product
  },
  getScreen1:state=>{
    return state.screen1
  },
  getDiscount:state=>{
    return state.discount
  },
  getCourseDetail:state=>{
    return state.courseDetail
  },
  getCourseId:state=>{
    return state.courseId
  },
  getOrderId:state=>{   //通过此id获取增值服务预约详情或订单详情
    return state.orderId
  },
  getPendingId:state=>{
    return state.pendingId
  },
  getSupportId:state=>{  //通过此id获取业务支援预约详情
    return state.supportId
  }
}
const mutations = {
  assignmentCustomerList: function (state, payload) {
    state.customerList = payload.param;
  },
  assignmentPolicyList: function (state, payload) {
    state.policyList = payload.param;
  },
  getToken(state,token){
    state.token = token;
  },
  assignmentProduct: function (state, payload) {  //存储产品详情
    state.product = payload.param;

  },
  assignmentScreen1:function(state,payload){    //存储查询后的保险列表
    state.screen1 = payload.param;
  },
  assignmentDiscount:function(state,payload){   //存储产品中心保险优惠信息
    state.discount=payload.param;
  },
  assignmentCourseDetail:function(state,payload){
    state.courseDetail=payload.param;
  },
  assignmentCourseId: function (state, payload) {
    state.courseId=payload.param;
  },
  assignmentOrderId: function (state,payload) {
    state.orderId=payload.param;
  },
  assignmentPendingId:function(state,payload) {
    state.pendingId = payload.param;
  },
  setParam(state,params){
    state.reviewParams = params;
  },
  passParam(state,params){
    state.passParam = params;
  },
  setProductInfo(state,params){
    state.productInfo = params;
  },
  assignmentSupportId(state,payload){
    state.supportId=payload.param;
  }


};
const actions = {}

/* eslint-disable no-new */
export default new Vuex.Store({
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions,
  modules: {
    config
  },
  strict: process.env.NODE_ENV !== 'production'
  //plugins: debug ? [createLogger()] : []
});

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource';


// import App from './App'
import router from './router'
import store from './vuex/store'
import axios from '../node_modules/axios';
import config from './api/config';
import echart from './assets/js/echarts.min.js';
import CLBService from './common/serivce.js';
import httpRequest from './assets/js/httpRequest.js';
import CPdf from './components/CPdf.vue';
import  { LoadingPlugin,ConfirmPlugin,ToastPlugin} from 'vux';
Vue.use(ConfirmPlugin);
Vue.use(LoadingPlugin);
Vue.use(ToastPlugin );
Vue.prototype.config = config;
Vue.prototype.echart = echart;
Vue.prototype.axios = axios;
Vue.use(httpRequest);
Vue.use(CLBService);
Vue.use(VueResource);


Vue.component(CPdf.name,CPdf);
new Vue({
  el: '#app',
  router,
  store,
  config,
  axios,
  echart,
  render: h => h('router-view'),
  created(){
    this.$getToken().then(response=> {
      if(location.pathname ==='/2c/'){
        this.$getOpenId().then(response=> {
          if(response !== window.localStorage.wechatOpenid) {
            window.localStorage.page = location.hash.substring(1);
            this.$router.push('authentication');
          }else{
            this.$checkWXAccount().then(data=> {
              if (!data) {
                window.localStorage.page = location.hash.substring(1);
                this.$router.push('authentication');
              }
            })
          }
        });
      }else{
        this.$getOpenId().then(response=> {
          if(response !== window.localStorage.wechatOpenid) {
            window.localStorage.wechatOpenid = '';
            window.localStorage.page = location.hash.substring(1);
            this.$router.push('/');
          }else{
            this.$checkWXAccount().then(data=> {
              if (!data) {
                window.localStorage.page = location.hash.substring(1);
                this.$router.push('/');
              }
            });
          }
        });
      }
    },function(){
      this.$vux.toast.show({text:'token获取失败'});
      this.$router.push('/');
    });
    var vm=this;
    if(location.pathname ==='/2c/'){
      var url=window.location.href.split('#')[0];
      vm.$configWx(url,['onMenuShareAppMessage','onMenuShareTimeline']);
      vm.$wechat.ready(function() {
        vm.$wechat.onMenuShareTimeline({
          title: '财联邦', // 分享标题
          link: 'http://weixin.fortunefed.com/#/share2C', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
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
          link: 'http://weixin.fortunefed.com/#/share2C', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: '', // 分享图标
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
            // 用户确认分享后执行的回调函数
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        });
      });
    }else{
      var url=window.location.href.split('#')[0];
      vm.$configWx(url,['onMenuShareAppMessage','onMenuShareTimeline']);
      vm.$wechat.ready(function() {
        vm.$wechat.onMenuShareTimeline({
          title: '财联邦', // 分享标题
          link: 'http://weixin.fortunefed.com/#/share', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
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
          link: 'http://weixin.fortunefed.com/#/share', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: '', // 分享图标
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
            // 用户确认分享后执行的回调函数
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        });
      });
    }


  }
});



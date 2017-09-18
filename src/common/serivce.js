/**
 * Created by Administrator on 2017/7/14 0014.
 */
import Vue from 'vue'
import config from '.././api/config';
import VueResource from 'vue-resource';
import { WechatPlugin } from 'vux'
Vue.use(WechatPlugin);
Vue.use(VueResource);
console.log(WechatPlugin.$wechat);

class CLBService {
  getCode(){
    let argsWx = {};
    let queryWx = location.search.substring(1);
    let pairsWx = queryWx.split("&");
    for (let i = 0; i < pairsWx.length; i++) {
      let pos = pairsWx[i].indexOf('=');
      if (pos == -1) {
        continue;
      }
      let argName = pairsWx[i].substring(0, pos);
      argsWx[argName] = pairsWx[i].substring(pos + 1);
    }
    return argsWx.code;
  };
  getOpenId(){
    return new Promise(resolve=>{
      Vue.http.post(`${config.baseUrl}/api/wxAccount/getOpenId?access_token=${window.localStorage.wxToken}`,{},{
        }).then(response=>{
        if(response.status ===200){
          window.localStorage.openid = response.data.rows[0].openId;
          resolve(response.data.rows[0].openId);
          //window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8a7d8fead458d831&redirect_uri=http%3a%2f%2fweixin.fortunefed.com%2f%23%2fregister&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect'
        }
      }).catch(err=>{
        alert('openId'+err)
      })
    });
  };
  checkWXAccount(){
    return new Promise(resolve=>{
      if(location.pathname ==='/2c/'){
        let url = '/api/public/checkWxAccount',
          param = {
            userType: 'CUSTOMER',
            backgroundAppid:config.appId,
            wechatOpenid: window.localStorage.openid
          };
        Vue.http.post(`${config.baseUrl}/api/public/checkWxAccount?access_token=${window.localStorage.wxToken}`, param).then(response=> {
          if (response.data.success) {

            window.localStorage.userInfoc=JSON.stringify(response.data);
            window.localStorage.wechatOpenid = param.wechatOpenid;
            localStorage.sessionIdc = response.data.sessionId;
          }
          resolve(response.data.success);
        });
      }else{
        let url = '/api/public/checkWxAccount',
          status = false,
          param = {
            userType: 'CHANNEL',
            backgroundAppid:config.appId,
            wechatOpenid: window.localStorage.openid
          };
        Vue.http.post(`${config.baseUrl}/api/public/checkWxAccount?access_token=${window.localStorage.wxToken}`, param).then(response=> {
          if (response.data.success) {
            window.localStorage.userInfo = JSON.stringify(response.data);
            localStorage.sessionIdb = response.data.sessionId;
            window.localStorage.wechatOpenid = param.wechatOpenid;
          }
          resolve(response.data.success);
        });
      }
    });
  };
  getToken () {
    return new Promise((resolve,reject)=> {
    let code = new CLBService().getCode(),
      timeStamp = new Date().getTime();
      //alert(code);
    let url = `${config.baseUrl}/oauth/token?client_id=client2&client_secret=secret&username=${code}&password=${timeStamp}&grant_type=password&appId=${config.appId}`,//2c
    //let url = `${config.baseUrl}/oauth/token?client_id=client2&client_secret=secret&username=admin&password=admin&grant_type=password`,
      param = {
        client_id:'client2',
        client_secret:'secret',
        //username:'admin',
        username:code,
        //password:'admin',
        password:timeStamp,
        //grant_type:'password',
        appId:config.appId
      };
      Vue.http.post(url,param).then(response=>{
        if (response.status === 200) {
          window.localStorage.wxToken = response.data.access_token;
          resolve(response.data);
        } else {
          reject('获取token失败');
        }
      });
    });
  };
  configWx(nowUrl, jsApiList){
    let token = window.localStorage.wxToken;
    //let timestamp = (new Date()).getTime();
    let params = {
      'url': nowUrl,
      'appId':config.appId
    };
    let url =config.baseUrl+ '/api/public/wxAccount/getJsSdkInfo';
    let header = {
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    };
    Vue.http.post(url,params,header)
      .then((response)=> {
        WechatPlugin.$wechat.config({
          debug: false,
          appId: config.appId,
          timestamp: response.data.timestamp,
          nonceStr: response.data.nonceStr,
          signature: response.data.signature,
          jsApiList: jsApiList
        });
      })
      .catch((error)=> {
      });
  }
};
CLBService.install = (Vue) => {
  Vue.prototype.$getOpenId = new CLBService().getOpenId;
  Vue.prototype.$configWx = new CLBService().configWx;
  Vue.prototype.$getToken = new CLBService().getToken;
  Vue.prototype.$checkWXAccount = new CLBService().checkWXAccount;
};
export default CLBService

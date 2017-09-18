/**
 * Created by Administrator on 2017/7/12 0012.
 */
import Vue from 'vue';
import VueResource from 'vue-resource';
import store from '../../vuex/store';
import CLBService from './../../common/serivce.js';
import config from './../../api/config';
import axios from 'axios';
Vue.use(VueResource);
class XHR {
  get(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && (xhr.status < 300 || xhr.status === 304)) {
            if (xhr.responseText) {
              resolve(JSON.parse(xhr.responseText));
            } else {
              resolve(xhr.responseText);
            }
          } else {
            reject(`XHR unsuccessful:${xhr.status}`);
          }
        }
      };
      xhr.open('get', url, true);
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.send(null);
    });
  }
  post1(url, data) {
    return new Promise((resolve, reject) => {
      let heard = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${store.state.token}`
        }
      };
      data.sessionId=window.localStorage.sessionId;
      Vue.http.post(config.baseUrl+url,data,heard).then(response=>{
        console.log(response.status);
        if(response.status ===200){
          return resolve(response.data);
        }
      }).catch(response=>{
        console.log(response.status);
        if(response.status ===401){
          CLBService.getToken().then(response=>{
            console.log(response.data.access_token);
            store.commit('getToken',response.data.access_token);
            XHR.post(url,data);
          });
        }
      });
    });
  }
  post(url, data) {
    //return new Promise((resolve, reject) => {
    //  //if (url.indexOf('?') !== -1) {
    //  //  url = `${url}&sessionId=${window.localStorage.sessionId}`
    //  //} else {
    //  //  url = `${url}?sessionId=${window.localStorage.sessionId}`
    //  //}
    //  //var instance = axios.create({
    //  //  baseURL: `${this.config.baseUrl}`,
    //  //  params: data
    //  //});
    //  //axios.interceptors.request.use(function (config) {
    //  // config.headers.common['Authorization'] =  'Bearer ' + window.localStorage.wxToken;
    //  //  return config;
    //  //}, function (error) {
    //  //  return Promise.reject(error);
    //  //});
    //
    //  //instance.defaults.headers.common['authorization'] =  'Bearer ' + window.localStorage.wxToken;
    //  instance.defaults.headers.common['authorization'] =  'Bearer edfsdhfisuwhdacslfjsklj';
    //
    //  instance.post(url+'&access_token='+window.localStorage.wxToken).then(response=>{
    //    resolve(response.data);
    //  });
    //});

    //
    return new Promise((resolve, reject) => {

      if(location.pathname ==='/2c/'){
        localStorage.sessionId = window.localStorage.sessionIdc;
      }else{
        localStorage.sessionId = window.localStorage.sessionIdb;
      }

      if(url.indexOf('?')!==-1){
        url = `${url}&access_token=${window.localStorage.wxToken}&sessionId=${localStorage.sessionId}`
      }else{
        url = `${url}?access_token=${window.localStorage.wxToken}&sessionId=${localStorage.sessionId}`
      }
      Vue.http.post(`${this.config.baseUrl}${url}`,data).then(response=>{
        if(response.status ===200){
           resolve(response.data);
        }
      }).catch(response=>{
        if(response.status ===401){
          CLBService.getToken().then(response=>{
            store.commit('getToken',response.access_token);
            new XHR().post1(url,data);
          });
        }
      });
    });
  }
}

/* Vue插件要求提供install方法：https://cn.vuejs.org/v2/guide/plugins.html */
XHR.install = (Vue) => {
  Vue.prototype.$get = new XHR().get;
  Vue.prototype.$post = new XHR().post;
};

export default XHR;

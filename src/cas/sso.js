import Vue from 'vue';
import { ACCESS_TOKEN } from '@/store/mutation-types';
import store from '@/store';

/**
 * 单点登录
 */
const init = (callback) => {
  if (window._CONFIG['SSO'] !== true && window._CONFIG['SSO'] !== 'true') {
    callback && callback();
    return;
  }
  console.log('-------单点登录开始-------');
  const token = Vue.ls.get(ACCESS_TOKEN);
  const st = getUrlParam('ticket');
  const sevice = 'http://' + window.location.host + '/';
  if (token) {
    loginSuccess(callback);
  } else {
    if (st) {
      validateSt(st, sevice, callback);
    } else {
      let serviceUrl = encodeURIComponent(sevice);
      window.location.href = window._CONFIG['CAS_BASE_URL'] + '/login?service=' + serviceUrl;
    }
  }
  console.log('-------单点登录结束-------');
};

function getUrlParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name) || '';
}

function validateSt(ticket, service, callback) {
  const params = {
    ticket: ticket,
    service: service,
  };
  store
    .dispatch('ValidateLogin', params)
    .then((res) => {
      if (res.success) {
        loginSuccess(callback);
      } else {
        const sevice = 'http://' + window.location.host + '/';
        const serviceUrl = encodeURIComponent(sevice);
        window.location.href = window._CONFIG['CAS_BASE_URL'] + '/login?service=' + serviceUrl;
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function loginSuccess(callback) {
  callback();
}

export default {
  init: init,
};

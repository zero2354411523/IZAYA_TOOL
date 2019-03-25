import Vue from 'vue'
import router from '../router'
import axios from 'axios'
import store from '../store/store'
// @ts-ignore
Vue.use(router)
/* Take the baseurl from the configuration file */
// @ts-ignore
let baseUrl = config.baseUrl
/* Initialize axios, do string conversion processing */
let myAxiosPostJson = axios.create({
  baseURL: baseUrl,
  timeout: 15000,
  transformRequest: [(data) => {
    return JSON.stringify(data)
  }]
})
/* Initialize axios, don't do string conversion processing */
let myAxiosPostForm = axios.create({
  baseURL: baseUrl,
  timeout: 15000
})
class request {
  constructor() {
  }
  /* According to the agreement with the background developer, whether to log in or not */
  static hasLogin(res) {
    return !res.data.bizCode && !res.data.success
  }
  /* Preprocess the returned information */
  static processResult(res, response) {
    if (this.hasLogin(res)) {
      alert(res.data.msg ? res.data.msg : '网络或系统错误')
      router.replace({
        path: 'login',
        query: {redirect: router.currentRoute.fullPath} // 登录成功后跳入浏览的当前页面
      })
    } else if (res.data.success) {
      response(res.data)
    } else {
      alert(res.data.msg ? res.data.msg : '后台未提示错误信息')
    }
  }
  /* Preprocessing error information */
  static processError(err, response) {
    let str = err + ''
    if (str.search('timeout') !== -1) { // 超时error捕获
      alert('请求超时')
    } else {
      alert(err.data ? err.data.msg ? err.data.msg : '网络或系统错误.' : '网络或系统错误')
    }
    response(err)
  }
  /* Initialize the request configuration */
  static initConfig(method, url, params, headers, responseType, contentType) {
    return {
      method: method,
      url: url,
      data: method === 'POST' || method === 'PUT' ? params : null,
      params: method === 'GET' || method === 'DELETE' ? params : null,
      headers: Object.keys(headers).length ? headers : contentType === 'json' ? {
        'Content-Type': 'application/json;charset=utf-8'
      } : contentType === 'formData' ? {
        'Content-Type': 'multipart/form-data'
      }: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      responseType: responseType
    }
  }
}

export class requestData extends request {
  constructor() {
    super()
  }
  static postJson(url: string, params: object, headers: object, response: object) {
    if (store.state.isLoading) {
      return
    }
    let self = this
    return new Promise(function (resolve,reject) {
      myAxiosPostJson(self.initConfig('POST', url, params, headers, 'json', 'json')).then(res => {
        self.processResult(res, response)
        resolve(res.data.msg)
      }).catch(err => {
        self.processError(err, response)
        resolve(err.data.msg)
      })
    })


  }
  static getJson(url: string, params: object, headers: object, response: object) {
    if (store.state.isLoading) {
      return
    }
    let self = this
    return new Promise(function (resolve,reject) {
      myAxiosPostJson(self.initConfig('GET', url, params, headers, 'json', 'json')).then(res => {
        self.processResult(res, response)
        resolve(res.data.msg)
      }).catch(err => {
        self.processError(err, response)
        resolve(err.data.msg)
      })
    })



  }
  static postForm(url: string, formData: object, headers: object, response: object) {
    if (store.state.isLoading) {
      return
    }
    let self = this
    return new Promise(function (resolve,reject) {
      myAxiosPostForm(self.initConfig('POST', url, formData, headers, 'json', 'formData')).then(res => {
        self.processResult(res, response)
        resolve(res.data.msg)
      }).catch(err => {
        self.processError(err, response)
        resolve(err.data.msg)
      })
    })

  }
  static getForm(url: string, formData: object, headers: object, response: object) {
    if (store.state.isLoading) {
      return
    }
    let self = this
    return new Promise(function (resolve, reject) {
      myAxiosPostForm(self.initConfig('GET', url, formData, headers, 'json', 'formData')).then(res => {
        self.processResult(res, response)
        resolve(res.data.msg)
      }).catch(err => {
        self.processError(err, response)
        resolve(err.data.msg)
      })
    })
  }
}
export class requestBlob extends request {
  constructor() {
    super()
  }
  static postJson(url: string, params: object, headers: object, response: any) {
    if (store.state.isLoading) {
      return
    }
    myAxiosPostJson(this.initConfig('POST', url, params, headers, 'blob', 'json')).then(res => {
      response(res)
    }).catch(err => {
      this.processError(err, response)
    })
  }
  static getJson(url: string, params: object, headers: object, response: any) {
    if (store.state.isLoading) {
      return
    }
    myAxiosPostJson(this.initConfig('GET', url, params, headers, 'blob', 'json')).then(res => {
      response(res)
    }).catch(err => {
      this.processError(err, response)
    })
  }
  static postForm(url: string, formData: object, headers: object, response: any) {
    if (store.state.isLoading) {
      return
    }
    myAxiosPostForm(this.initConfig('POST', url, formData, headers, 'blob', 'formData')).then(res => {
      response(res)
    }).catch(err => {
      this.processError(err, response)
    })
  }
  static getForm(url: string, formData: object, headers: object, response: any) {
    if (store.state.isLoading) {
      return
    }
    myAxiosPostForm(this.initConfig('GET', url, formData, headers, 'blob', 'formData')).then(res => {
      response(res)
    }).catch(err => {
      this.processError(err, response)
    })
  }
}

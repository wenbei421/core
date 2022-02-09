/*
 * @Author: 文贝
 * @Date: 2022-02-09 12:32:05
 * @LastEditors: 文贝
 * @LastEditTime: 2022-02-09 17:58:43
 * @Descripttion:
 * @FilePath: \src\core\imedx.ts
 */
import { ExecOptons, IImedx } from '../interfaces/interfaces'
import utils from './utils'

export default class Imedx implements IImedx {
  private _callbacks: { [key: string]: Array<Function> } = {}
  public isImedx: boolean = !!window['CefSharp']
  public cefSharp: any = window['CefSharp'] || { PostMessage: () => {} }
  private _baseCommandUrl: string = 'http://command.com/'
  private baseAjaxUrl: string = 'http://icreate.com/'

  public $command(opts: ExecOptons): void {
    let link = document.createElement('a')
    let params: Array<string> = []
    for (let key in opts.data) {
      params.push(key + '=' + opts.data[key])
    }
    link.href = `${this._baseCommandUrl}${opts.url}${
      params.length > 0 ? `?${params.join('&')}` : ''
    }`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  public $function(opts: ExecOptons): Promise<any> {
    let that = this
    return new Promise<XMLHttpRequest>((resolve, reject) => {
      this._ajax({
        ...opts,
        url: `${this.baseAjaxUrl}${opts.url}`,
        method: opts.method || 'GET'
      })
        .then(xhr => {
          try {
            const response = JSON.parse(xhr.responseText)
            if (response.Code === 200) {
              resolve(response.Data)
            } else {
              reject(response.Message)
            }
          } catch (error) {
            console.error(`[imedx ajax error('${opts.url}')]:${error}`)
            reject(error)
          }
        })
        .catch(xhr => {
          if (xhr) {
            console.error(`[imedx ajax error('${opts.url}')]:${xhr}`)
            reject(xhr) // 失败
          } else {
            console.error(`[imedx ajax error('${opts.url}')]:${xhr}`)
            // alert(xhr.responseText)
          }
        })
    })
  }

  /**
   * 接受cef分发事件，触发容器中的该属性eventName的回调函数
   * @param {*} eventName 事件名称
   * @param {*} data 数据
   */
  private $onReceive(message: string) {
    const { eventName, data } = JSON.parse(message)
    let callbacks = this._callbacks[eventName]
    if (!callbacks || !callbacks.length) {
      return
    }
    for (let i: number = 0; i < callbacks.length; i++) {
      callbacks[i].apply(this, data)
    }
  }

  /**
   * @description:订阅C#事件
   * @param {string} eventName
   * @param {Function} callback
   * @return {void}
   */
  public $on(eventName: string, callback: Function): void {
    if (!this._callbacks[eventName]) {
      this._callbacks[eventName] = []
    }

    this._callbacks[eventName].push(callback)
  }

  /**
   * @description: 取消C#订阅事件
   * @param {string} eventName
   * @param {Function} callback
   * @return {void}
   */
  public $off(eventName: string, callback: Function): void {
    let callbacks = this._callbacks[eventName]
    if (!callbacks) {
      return
    }

    let index: number = -1
    for (let i: number = 0; i < callbacks.length; i++) {
      if (callbacks[i] === callback) {
        index = i
        break
      }
    }

    if (index < 0) {
      return
    }

    this._callbacks[eventName].splice(index, 1)
  }

  /**
   * @description: 触发C#事件
   * @param {string} eventName
   * @return {void}
   */
  public $emit(eventName: string): void {
    let args = Array.prototype.slice.call(arguments, 1)
    this.cefSharp.PostMessage(JSON.stringify({ eventName, ...args }))
  }

  // ajax请求
  private _ajax(opts: ExecOptons): Promise<XMLHttpRequest> {
    let that = this
    return new Promise<XMLHttpRequest>(function(resolve, reject) {
      try {
        let xhr = that._httpRequest(opts)
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              try {
                resolve(xhr)
              } catch (error) {
                reject(xhr)
              }
            } else reject(xhr)
          }
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  // 发起请求函数
  private _httpRequest(opts: ExecOptons): XMLHttpRequest {
    let _option = new ExecOptons()
    utils.extend(_option, opts)
    var xhr = this._getXMLHttpRequest()
    if (_option.timeout > 0) xhr.timeout = _option.timeout
    if (_option.method.toUpperCase() === 'POST') {
      xhr.open(_option.method, _option.url, _option.async)
      xhr.setRequestHeader('Content-Type', _option.contentType)
      xhr.send(_option.data)
    } else if (_option.method.toUpperCase() === 'GET') {
      var params = []
      for (var key in _option.data) {
        params.push(key + '=' + _option.data[key])
      }
      xhr.open(
        _option.method,
        _option.url + (params.length > 0 ? `?${params.join('&')}` : ''),
        _option.async
      )
      xhr.send(null)
    }
    return xhr
  }

  // 创建XMLHttpRequest
  private _getXMLHttpRequest(): XMLHttpRequest {
    let xhr: XMLHttpRequest = new XMLHttpRequest()
    if (xhr.overrideMimeType) {
      xhr.overrideMimeType('text/xml')
    }
    return xhr
  }
}

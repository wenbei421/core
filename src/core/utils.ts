/*
 * @Author: 文贝
 * @Date: 2022-02-09 00:39:00
 * @LastEditors: 文贝
 * @LastEditTime: 2022-03-28 13:17:46
 * @Descripttion:
 * @FilePath: \src\core\utils.ts
 */
import { ExecOptons } from '../interfaces/interfaces'
const md5 = require('js-md5');

export default class Utils {
  private static _baseCommandUrl: string = 'http://command.com/'
  private static _baseAjaxUrl: string = 'http://icreate.com/'
  /* Creates a name namespace.
   *  Example:
   *  var taskService = createNamespace(ics, 'services.task');
   *  taskService will be equal to ics.services.task
   *  first argument (root) must be defined first
   ************************************************************/
  public static createNamespace(root: any, ns: string): object {
    let parts: Array<string> = ns.split('.')
    for (let i: number = 0; i < parts.length; i++) {
      if (typeof root[parts[i]] == 'undefined') {
        root[parts[i]] = {}
      }
      root = root[parts[i]]
    }
    return root
  }

  /* Find and replaces a string (search) to another string (replacement) in
   *  given string (str).
   *  Example:
   *  replaceAll('This is a test string', 'is', 'X') = 'ThX X a test string'
   ************************************************************/
  public static replaceAll(str: string, search: string, replacement: string): string {
    var fix = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    return str.replace(new RegExp(fix, 'g'), replacement)
  }

  /* Formats a string just like string.format in C#.
   *  Example:
   *  formatString('Hello {0}','Tuana') = 'Hello Tuana'
   ************************************************************/
  public static formatString(): string | null {
    if (arguments.length < 1) {
      return null
    }
    var str = arguments[0]
    for (var i = 1; i < arguments.length; i++) {
      var placeHolder = '{' + (i - 1) + '}'
      str = this.replaceAll(str, placeHolder, arguments[i])
    }
    return str
  }

  public static toPascalCase(str: string): string {
    if (!str || !str.length) {
      return str
    }
    if (str.length === 1) {
      return str.charAt(0).toUpperCase()
    }
    return str.charAt(0).toUpperCase() + str.substring(1)
  }

  public static toCamelCase(str: string): string {
    if (!str || !str.length) {
      return str
    }
    if (str.length === 1) {
      return str.charAt(0).toLowerCase()
    }
    return str.charAt(0).toLowerCase() + str.substring(1)
  }

  //驼峰转短横线
  public static CamelCasetoKebab(value: string) {
    return value.replace(/([A-Z])/g, '-$1').toLowerCase()
  }

  //短横线转小驼峰
  public static KebabtoCamelCase(value: string) {
    return value.replace(/-(\w)/g, ($0, $1) => $1.toUpperCase())
  }

  //短横线转大驼峰
  public static KebabtoPascalCase(value: string) {
    return value[0].toUpperCase() + value.slice(1).replace(/-(\w)/g, ($0, $1) => $1.toUpperCase())
  }

  public static truncateString(str: string, maxLength: number): string {
    if (!str || !str.length || str.length <= maxLength) {
      return str
    }
    return str.substring(0, maxLength)
  }

  public static truncateStringWithPostfix(str: string, maxLength: number, postfix: string): string {
    postfix = postfix || '...'

    if (!str || !str.length || str.length <= maxLength) {
      return str
    }
    if (maxLength <= postfix.length) {
      return postfix.substring(0, maxLength)
    }
    return str.substring(0, maxLength - postfix.length) + postfix
  }

  public static isFunction(obj: any): boolean {
    return !!(obj && obj.constructor && obj.call && obj.apply)
  }

  public static isString(obj: any) {
    //判断对象是否是字符串
    return Object.prototype.toString.call(obj) === '[object String]'
  }

  /**
   * Sets a cookie value for given key.
   * This is a simple implementation created to be used by ics.
   * Please use a complete cookie library if you need.
   * @param {string} key
   * @param {string} value
   * @param {Date} expireDate (optional). If not specified the cookie will expire at the end of session.
   * @param {string} path (optional)
   */
  public static buildQueryString(key: string, value: string, expireDate: Date, path: string): void {
    var cookieValue = encodeURIComponent(key) + '='

    if (value) {
      cookieValue = cookieValue + encodeURIComponent(value)
    }

    if (expireDate) {
      cookieValue = cookieValue + '; expires=' + expireDate.toUTCString()
    }

    if (path) {
      cookieValue = cookieValue + '; path=' + path
    }

    document.cookie = cookieValue
  }

  /**
   * Gets a cookie with given key.
   * This is a simple implementation created to be used by ics.
   * Please use a complete cookie library if you need.
   * @param {string} key
   * @returns {string} Cookie value or null
   */
  public static getCookieValue(key: string): string | null {
    var equalities = document.cookie.split('; ')
    for (var i = 0; i < equalities.length; i++) {
      if (!equalities[i]) {
        continue
      }

      var splitted = equalities[i].split('=')
      if (splitted.length != 2) {
        continue
      }

      if (decodeURIComponent(splitted[0]) === key) {
        return decodeURIComponent(splitted[1] || '')
      }
    }

    return null
  }

  public static deleteCookie(key: string, path: string): void {
    var cookieValue = encodeURIComponent(key) + '='

    cookieValue =
      cookieValue + '; expires=' + new Date(new Date().getTime() - 86400000).toUTCString()

    if (path) {
      cookieValue = cookieValue + '; path=' + path
    }

    document.cookie = cookieValue
  }

  /**
   * Escape HTML to help prevent XSS attacks.
   */
  public static htmlEscape(html: string): string {
    return html
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
  }

  /**
   * @description:复制对象
   * @param {object} dst 目的对象
   * @param {object} src 源对象
   * @return {*}
   */
  public static extend(dstObj: object, srcObj: object): object {
    var keys = Object.keys(srcObj)
    for (var i = 0; i < keys.length; i += 1) {
      var val = srcObj[keys[i]]
      dstObj[keys[i]] =
        ['string', 'number', 'array', 'boolean'].indexOf(typeof val) === -1
          ? this.extend(dstObj[keys[i]] || {}, val)
          : val
    }
    return dstObj
  }

  public static command(opts: ExecOptons): void {
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

  public static md5(message: string): string {
    return md5(message)
  }

  public static function(opts: ExecOptons): Promise<any> {
    let that = this
    return new Promise<XMLHttpRequest>((resolve, reject) => {
      this._ajax({
        ...opts,
        url: `${this._baseAjaxUrl}${opts.url}`,
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

  // ajax请求
  private static _ajax(opts: ExecOptons): Promise<XMLHttpRequest> {
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
  private static _httpRequest(opts: ExecOptons): XMLHttpRequest {
    let _option = new ExecOptons()
    this.extend(_option, opts)
    var xhr = this._getXMLHttpRequest()
    if (_option.timeout > 0) xhr.timeout = _option.timeout
    if (_option.method.toUpperCase() === 'POST') {
      xhr.open(_option.method, _option.url, _option.async)
      xhr.setRequestHeader('Content-Type', _option.contentType)
      xhr.send(JSON.stringify(_option.data))
    } else if (_option.method.toUpperCase() === 'GET') {
      var params = []
      for (var key in _option.data) {
        params.push(key + '=' + _option.data[key])
      }
      console.log(_option.url + (params.length > 0 ? `?${params.join('&')}` : ''))
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
  private static _getXMLHttpRequest(): XMLHttpRequest {
    // let XMLHttpRequest = require('xhr2');
    let xhr: XMLHttpRequest = new XMLHttpRequest()
    if (xhr.overrideMimeType) {
      xhr.overrideMimeType('text/xml')
    }
    return xhr
  }
}

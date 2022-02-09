/*
 * @Author: 文贝
 * @Date: 2022-02-09 00:39:00
 * @LastEditors: 文贝
 * @LastEditTime: 2022-02-09 17:31:27
 * @Descripttion:
 * @FilePath: \src\core\utils.ts
 */
export default class Utils {
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
}

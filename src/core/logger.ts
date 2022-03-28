/*
 * @Author: 文贝
 * @Date: 2022-02-09 00:24:01
 * @LastEditors: 文贝
 * @LastEditTime: 2022-03-11 10:03:58
 * @Descripttion:
 * @FilePath: \src\core\logger.ts
 */
import { ILogger, LogLevels } from '../interfaces/interfaces'

export default class Logger implements ILogger {
  public level: LogLevels = LogLevels.DEBUG
  private color: any = {
    debug: '#6e6e6e',
    info: '#2a53cd',
    warn: '#f4bd00',
    error: '#ce9178',
    fatal: '#eb3941'
  }

  private log(logObject: any, logLevel: LogLevels, color: string | null = null): void {
    if (typeof window === 'undefined' || !window.console || !window.console.log) {
      return
    }
    if (logLevel != undefined && logLevel < this.level) {
      return
    }
    if (color) {
      console.log(
        logObject,
        `color: ${color};font-size: 14px;font-weight: bold;line-height: 19px;font-family: Consolas, "Courier New", monospace;`
      )
    } else {
      console.log(logObject)
    }
  }

  /**
   * @description: 输出调试日志
   * @param {any} logObject 日志对象
   */
  public debug(logObject: any, message: string = ''): void {
    this.log(`%c${new Date().toLocaleString()} [DEBUG] (${message})`, LogLevels.DEBUG, this.color.debug)
    this.log(logObject, LogLevels.DEBUG)
    this.log('', LogLevels.DEBUG)
  }

  /**
   * @description: 输出信息日志
   * @param {any} logObject 日志对象
   */
  public info(logObject: any, message: string = ''): void {
    this.log(`%c${new Date().toLocaleString()} [INFO] (${message})`, LogLevels.INFO, this.color.info)
    this.log(logObject, LogLevels.INFO)
    this.log('', LogLevels.INFO)
  }

  /**
   * @description: 输出警告日志
   * @param {any} logObject 日志对象
   */
  public warn(logObject: any, message: string = ''): void {
    this.log(`%c${new Date().toLocaleString()} [WARN] (${message})`, LogLevels.WARN, this.color.warn)
    this.log(logObject, LogLevels.WARN)
    this.log('', LogLevels.WARN)
  }

  /**
   * @description: 输出错误日志
   * @param {any} logObject 日志对象
   */
  public error(logObject: any, message: string = ''): void {
    this.log(`%c${new Date().toLocaleString()} [ERROR] (${message})`, LogLevels.ERROR, this.color.error)
    this.log(logObject, LogLevels.ERROR)
    this.log('', LogLevels.ERROR)
  }

  /**
   * @description: 输出致命错误日志
   * @param {any} logObject 日志对象
   */
  public fatal(logObject: any, message: string = ''): void {
    this.log(`%c${new Date().toLocaleString()} [FATAL] (${message})`, LogLevels.FATAL, this.color.fatal)
    this.log(logObject, LogLevels.FATAL)
    this.log('', LogLevels.FATAL)
  }
}

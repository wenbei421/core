/*
 * @Author: 文贝
 * @Date: 2022-02-09 00:24:01
 * @LastEditors: 文贝
 * @LastEditTime: 2022-02-12 00:51:58
 * @Descripttion:
 * @FilePath: \src\core\logger.ts
 */
import { ILogger, LogLevels } from '../interfaces/interfaces'

export default class Logger implements ILogger {
  public level: LogLevels = LogLevels.DEBUG

  private log(logObject: any, logLevel: LogLevels): void {
    if (!window.console || !window.console.log) {
      return
    }
    if (logLevel != undefined && logLevel < this.level) {
      return
    }
    console.log(logObject)
  }

  /**
   * @description: 输出调试日志
   * @param {any} logObject 日志对象
   */
   public debug(logObject: any): void {
    this.log('DEBUG: ', LogLevels.DEBUG)
    this.log(logObject, LogLevels.DEBUG)
  }

  /**
   * @description: 输出信息日志
   * @param {any} logObject 日志对象
   */
   public info(logObject: any): void {
    this.log('INFO: ', LogLevels.INFO)
    this.log(logObject, LogLevels.INFO)
  }

  /**
   * @description: 输出警告日志
   * @param {any} logObject 日志对象
   */
   public warn(logObject: any): void {
    this.log('WARN: ', LogLevels.WARN)
    this.log(logObject, LogLevels.WARN)
  }

  /**
   * @description: 输出错误日志
   * @param {any} logObject 日志对象
   */
   public error(logObject: any): void {
    this.log('ERROR: ', LogLevels.ERROR)
    this.log(logObject, LogLevels.ERROR)
  }

  /**
   * @description: 输出致命错误日志
   * @param {any} logObject 日志对象
   */
   public fatal(logObject: any): void {
    this.log('FATAL: ', LogLevels.FATAL)
    this.log(logObject, LogLevels.FATAL)
  }
}

/*
 * @Author: 文贝
 * @Date: 2022-02-08 22:24:51
 * @LastEditors: 文贝
 * @LastEditTime: 2022-03-11 08:49:46
 * @Descripttion:
 * @FilePath: \src\interfaces\interfaces.ts
 */

export class ExecOptons {
  public url!: string
  public method: string = 'GET'
  public data: any
  public timeout: number = 0
  public contentType: string = 'text/xml; charset=UTF-8'
  public async: boolean = true
}

export class UIOptions {
  public elm: string | null = null
  public busy: boolean = false
  public promise: Promise<any> | undefined = undefined
}

export interface IEvent {
  $on(eventName: string, callback: Function): void
  $off(eventName: string, callback: Function): void
  $emit(eventName: string): void
}

export interface IBlockUI {
  block(opts: UIOptions): void
  unblock(opts: UIOptions): void
  setBusy(opts: UIOptions): void
  clearBusy(opts: UIOptions): void
}

export enum LogLevels {
  DEBUG = 1,
  INFO,
  WARN,
  ERROR,
  FATAL
}

export interface ILogger {
  level: LogLevels
  debug(logObject: any, message: string): void
  info(logObject: any, message: string): void
  warn(logObject: any, message: string): void
  error(logObject: any, message: string): void
  fatal(logObject: any, message: string): void
}

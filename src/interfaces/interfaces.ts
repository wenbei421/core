/*
 * @Author: 文贝
 * @Date: 2022-02-08 22:24:51
 * @LastEditors: 文贝
 * @LastEditTime: 2022-02-09 23:34:47
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
  debug(logObject: any): void
  info(logObject: any): void
  warn(logObject: any): void
  error(logObject: any): void
  fatal(logObject: any): void
}

export interface IImedx {
  isImedx: boolean
  cefSharp: Object
  $on(eventName: string, callback: Function): void
  $off(eventName: string, callback: Function): void
  $emit(eventName: string): void
  $command(opts: ExecOptons): void
  $function(opts: ExecOptons): Promise<any>
}

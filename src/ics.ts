/*
 * @Author: 文贝
 * @Date: 2022-02-08 22:01:59
 * @LastEditors: 文贝
 * @LastEditTime: 2022-02-10 00:36:43
 * @Descripttion:
 * @FilePath: \src\ics.ts
 */
import {
  ExecOptons,
  IBlockUI,
  IEvent,
  ILogger,
  LogLevels,
  UIOptions
} from './interfaces/interfaces'
import Event from './core/event'
import BlockUI from './core/block_ui'
import Logger from './core/logger'
import Utils from './core/utils'
import Imedx from './core/imedx'

class Ics {
  // private static _singleton: Ics | null = null
  // public constructor() {
  //   if (!Ics._singleton) {
  //     Ics._singleton = this
  //   }
  //   return Ics._singleton
  // }
  public appPath: string = '/'

  public pageLoadTime = new Date()

  public toAbsAppPath(path: string): string {
    if (path.indexOf('/') == 0) {
      path = path.substring(1)
    }
    return this.appPath + path
  }

  public event: IEvent = new Event()

  public ui: IBlockUI = new BlockUI()

  public log: ILogger = new Logger()

  public utils: Utils = Utils

  public imedx: Imedx = new Imedx()
}

const ics = new Ics()
// export default ics

export { ics, Event, BlockUI, Logger, Utils, Imedx, LogLevels, ExecOptons, UIOptions }

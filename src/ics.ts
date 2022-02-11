/*
 * @Author: 文贝
 * @Date: 2022-02-08 22:01:59
 * @LastEditors: 文贝
 * @LastEditTime: 2022-02-12 01:47:40
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

  public utils = Utils
}

const ics = new Ics()

// export default ics
export { ics, Event, BlockUI, Logger, Utils, LogLevels, ExecOptons, UIOptions }

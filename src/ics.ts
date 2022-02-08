/*
 * @Author: 文贝
 * @Date: 2022-02-08 22:01:59
 * @LastEditors: 文贝
 * @LastEditTime: 2022-02-08 22:46:56
 * @Descripttion:
 * @FilePath: \src\ics.ts
 */
import IEvent from './interfaces/ievent'
import Event from './core/event'

export default class Ics {
  public appPath: string = '/'

  public pageLoadTime = new Date()

  public toAbsAppPath(path: string): string {
    if (path.indexOf('/') == 0) {
      path = path.substring(1)
    }
    return this.appPath + path
  }

  public event: IEvent = new Event()
}

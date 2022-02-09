/*
 * @Author: 文贝
 * @Date: 2022-02-08 22:01:59
 * @LastEditors: 文贝
 * @LastEditTime: 2022-02-09 17:50:18
 * @Descripttion:
 * @FilePath: \src\core\event.ts
 */
import { IEvent } from "../interfaces/interfaces"

class Event implements IEvent {
  private _callbacks: { [key: string]: Array<Function> } = {}

  /**
   * @description: 构造函数
   */
  public constructor(){

  }

  /**
   * @description:订阅事件
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
   * @description: 取消订阅事件
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
   * @description: 触发事件
   * @param {string} eventName
   * @return {void}
   */
  public $emit(eventName: string): void {
    let callbacks = this._callbacks[eventName]
    if (!callbacks || !callbacks.length) {
      return
    }

    let args = Array.prototype.slice.call(arguments, 1)
    for (let i:number = 0; i < callbacks.length; i++) {
      callbacks[i].apply(this, args)
    }
  }
}

export default Event

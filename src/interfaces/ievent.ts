/*
 * @Author: 文贝
 * @Date: 2022-02-08 22:24:51
 * @LastEditors: 文贝
 * @LastEditTime: 2022-02-08 22:46:32
 * @Descripttion:
 * @FilePath: \src\interfaces\interfaces.ts
 */
interface IEvent {
  $on(eventName: string, callback: Function): void
  $off(eventName: string, callback: Function): void
  $emit(eventName: string): void
}

export default IEvent

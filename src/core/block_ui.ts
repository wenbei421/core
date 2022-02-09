/*
 * @Author: 文贝
 * @Date: 2022-02-08 23:09:25
 * @LastEditors: 文贝
 * @LastEditTime: 2022-02-09 23:04:40
 * @Descripttion:
 * @FilePath: \src\core\block_ui.ts
 */
import { IBlockUI, UIOptions } from '../interfaces/interfaces'

export default class UIBlock implements IBlockUI {
  private _uiBlockArea: any
  public constructor() {
    this._uiBlockArea = null
    if (typeof window !== 'undefined') {
      this._uiBlockArea = document.createElement('div')
      this._uiBlockArea.classList.add('ics-block-area')
    }
  }
  block(opts: UIOptions): void {
    if (!opts) opts = new UIOptions()
    let $elm = (opts.elm && document.querySelector(opts.elm)) || document.body
    if (opts.busy) {
      this._uiBlockArea.classList.add('ics-block-area-busy')
    } else {
      this._uiBlockArea.classList.remove('ics-block-area-busy')
    }

    if (opts.elm && document.querySelector(opts.elm)) {
      this._uiBlockArea.style.position = 'absolute'
    } else {
      this._uiBlockArea.style.position = 'fixed'
    }

    $elm.appendChild(this._uiBlockArea)

    if (opts.promise) {
      let that = this
      opts.promise.finally(function() {
        that.unblock(opts)
      })
    }
  }

  unblock(opts: UIOptions): void {
    if (!opts) opts = new UIOptions()
    let element = document.querySelector('.ics-block-area')
    if (element) {
      element.classList.add('ics-block-area-disappearing')
      setTimeout(function() {
        if (element) {
          element.classList.remove('ics-block-area-disappearing')
          element.parentElement?.removeChild(element)
        }
      }, 250)
    }
  }
  setBusy(opts: UIOptions): void {
    if (!opts) {
      opts = new UIOptions()
      opts.busy = true
    }
    this.block(opts)
  }
  clearBusy(opts: UIOptions): void {
    this.unblock(opts)
  }
}

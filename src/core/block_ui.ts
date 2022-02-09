/*
 * @Author: 文贝
 * @Date: 2022-02-08 23:09:25
 * @LastEditors: 文贝
 * @LastEditTime: 2022-02-09 17:28:50
 * @Descripttion:
 * @FilePath: \src\core\block_ui.ts
 */
import { IBlockUI, UIOptions } from '../interfaces/interfaces'

export default class UIBlock implements IBlockUI {
  private $uiBlockArea = document.createElement('div')
  public constructor() {
    this.$uiBlockArea.classList.add('ics-block-area')
  }
  block(opts: UIOptions): void {
    if (!opts) opts = new UIOptions()
    let $elm = (opts.elm && document.querySelector(opts.elm)) || document.body
    if (opts.busy) {
      this.$uiBlockArea.classList.add('ics-block-area-busy')
    } else {
      this.$uiBlockArea.classList.remove('ics-block-area-busy')
    }

    if (opts.elm && document.querySelector(opts.elm)) {
      this.$uiBlockArea.style.position = 'absolute'
    } else {
      this.$uiBlockArea.style.position = 'fixed'
    }

    $elm.appendChild(this.$uiBlockArea)

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

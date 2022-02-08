/*
 * @Author: 文贝
 * @Date: 2022-02-08 23:09:25
 * @LastEditors: 文贝
 * @LastEditTime: 2022-02-09 00:22:09
 * @Descripttion:
 * @FilePath: \src\core\block_ui.ts
 */
import { IBlockUI, UIOptions } from '../interfaces/interfaces'

const $uiBlockArea = document.createElement('div')
$uiBlockArea.classList.add('ics-block-area')

export default class UIBlock implements IBlockUI {
  block(opts: UIOptions): void {
    if (!opts) opts = new UIOptions()
    let $elm = (opts.elm && document.querySelector(opts.elm)) || document.body
    if (opts.busy) {
      $uiBlockArea.classList.add('ics-block-area-busy')
    } else {
      $uiBlockArea.classList.remove('ics-block-area-busy')
    }

    if (opts.elm && document.querySelector(opts.elm)) {
      $uiBlockArea.style.position = 'absolute'
    } else {
      $uiBlockArea.style.position = 'fixed'
    }

    $elm.appendChild($uiBlockArea)

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

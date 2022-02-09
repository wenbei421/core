/*
 * @Author: 文贝
 * @Date: 2022-02-08 21:36:57
 * @LastEditors: 文贝
 * @LastEditTime: 2022-02-10 01:16:45
 * @Descripttion:
 * @FilePath: \test\core\imedx.test.ts
 */
import Imedx from '../../src/core/imedx'
import { ExecOptons } from '../../src/ics'

/**
 * ics test
 */
describe('imedx test', () => {
  let imedx = new Imedx()
  it('event.$on test', () => {
    let opts = new ExecOptons()
    opts.url = `logger/debug`
    opts.data = { 'imedx':'test' }
    console.log(opts)
    imedx
      .$function(opts)
      .then(res => {
        console.log('res')
      })
      .finally(() => {
        console.log('finally')
      })
  })
})

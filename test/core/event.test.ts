/*
 * @Author: 文贝
 * @Date: 2022-02-08 21:36:57
 * @LastEditors: 文贝
 * @LastEditTime: 2022-02-09 22:48:17
 * @Descripttion:
 * @FilePath: \test\core\event.test.ts
 */
import Event from '../../src/core/event'

/**
 * ics test
 */
describe('ics test', () => {
  let event = new Event()
  let callback = function(p: string) {
    console.log(p)
    expect(p === 'test-event').toBeTruthy()
  }
  it('event.$on test', () => {
    event.$on('event-test', callback)
    event.$emit('event-test', 'test-event')
  })

  it('ics.toAbsAppPath test', () => {
    event.$off('event-test', callback)
    event.$emit('event-test', 'test-event1')
  })
})

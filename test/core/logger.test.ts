/*
 * @Author: 文贝
 * @Date: 2022-02-08 21:36:57
 * @LastEditors: 文贝
 * @LastEditTime: 2022-03-11 09:38:10
 * @Descripttion:
 * @FilePath: \test\core\logger.test.ts
 */
import Logger from '../../src/core/logger'

/**
 * ics test
 */
describe('logger test', () => {
  let logger = new Logger()
  it('logger.debug test', () => {
    logger.debug('debug-test')
  })
  it('logger.info test', () => {
    logger.info('info-test')
  })
  it('logger.warn test', () => {
    logger.warn('warn-test')
  })
  it('logger.error test', () => {
    logger.error('error-test')
  })
  it('logger.fatal test', () => {
    logger.fatal('fatal-test')
  })
})

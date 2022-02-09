/*
 * @Author: 文贝
 * @Date: 2022-02-08 21:36:57
 * @LastEditors: 文贝
 * @LastEditTime: 2022-02-10 01:01:08
 * @Descripttion:
 * @FilePath: \test\ics.test.ts
 */
import {ics}  from "../src/ics"

/**
 * ics test
 */
describe("ics test", () => {
  it("ics.appPath test", () => {
    expect(ics.appPath == '/').toBeTruthy()
  })

  it("ics.toAbsAppPath test", () => {
    expect(ics.toAbsAppPath('/src/ics') === '/src/ics').toBeTruthy()
    expect(ics.toAbsAppPath('src/ics') === '/src/ics').toBeTruthy()
  })
})

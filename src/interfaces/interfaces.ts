/*
 * @Author: 文贝
 * @Date: 2022-02-08 22:24:51
 * @LastEditors: 文贝
 * @LastEditTime: 2022-02-18 00:14:06
 * @Descripttion:
 * @FilePath: \src\interfaces\interfaces.ts
 */
export interface IPackage {
  /**
   * @description: 打包
   * @param {dir} 目录
   * @param {pkgFile} 包文件
   */
  packageSync(dir: string, pkgFile: string): Promise<void>

  /**
   * @description: 合并脚本
   * @param {dir} 目录
   * @param {scriptFile} 脚本文件
   */
  scriptSync(dir: string, scriptFile: string): Promise<void>

  /**
   * @description:写入数据到指定文件
   * @param {file} 文件路径
   * @param {data} 数据对象
   */
  writeSync(file: string, data: Object): Promise<void>

  /**
   * @description:处理权限
   * @param {routes} 路由数组
   */
  permission(routes: Array<Route>): void
}

export class Route {
  public path?: string
  public name?: string
  public component: object = {}
  public meta?: Metadata
  public children?: Array<Route>
}

export class Metadata {
  public id?: string
  public title?: string
  public path?: string
  public icon?: string
  public affix: boolean = false
  public color?: string
  public remark?: string
  public permissions: Array<Permission> = []
  public scenes: Array<string> = []
  public params: Param = { client: [], system: [] }
}

export class Permission {
  public id?: string
  public name?: string
}

export class Param {
  public client: Array<string> = []
  public system: Array<string> = []
}

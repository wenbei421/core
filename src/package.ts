/*
 * @Author: 文贝
 * @Date: 2022-02-08 22:01:59
 * @LastEditors: 文贝
 * @LastEditTime: 2022-02-18 00:29:24
 * @Descripttion:
 * @FilePath: \src\package.ts
 */
import JSZip from 'jszip'
import fs from 'fs'
import path from 'path'
import os from 'os'
import { IPackage, Metadata, Route } from './interfaces/interfaces'

export default class Package implements IPackage {
  /**
   * @description:处理权限
   * @param {routes} 路由数组
   */
  permission(routes: Array<Route>): Array<Metadata> {
    let permissions: Array<Metadata> = []
    routes.forEach(route => {
      if (route.meta && route.meta.id) {
        permissions.push({
          ...route.meta,
          ...{ path: route.path }
        })
      }
      if (route.children && route.children.length > 0) {
        permissions.concat(this.permission(route.children))
      }
    })
    return permissions
  }
  /**
   * @description:写入数据到指定文件
   * @param {file} 文件路径
   * @param {data} 数据对象
   */
  public async writeSync(file: string, data: Object): Promise<void> {
    await fs.writeFileSync(path.resolve(file), Buffer.from(JSON.stringify(data)).toString('base64'))
  }

  /**
   * @description: 合并脚本
   * @param {dir} 目录
   * @param {scriptFile} 脚本文件
   */
  public async scriptSync(dir: string, scriptFile: string): Promise<void> {
    const dirPath = path.resolve(dir)
    // 根据文件路径读取文件，返回文件列表
    const files = fs.readdirSync(dirPath)
    // 遍历读取到的文件列表
    files.forEach(async function(filename) {
      // 获取当前文件的绝对路径
      var filedir = path.join(dirPath, filename)
      // 根据文件路径获取文件信息，返回一个fs.Stats对象
      var stats = fs.statSync(filedir)
      var isFile = stats.isFile() // 是文件
      // var isDir = stats.isDirectory();//是文件夹
      if (isFile) {
        if (/.sql/.test(filename)) {
          const content = await fs.readFileSync(filedir, 'utf-8')
          await fs.appendFileSync(
            scriptFile,
            content
              .replace(/^\uFEFF/, '')
              .replace(/(\n[\s\t]*\r*\n)/g, '')
              .replace(/^[\n\r\n\t]*|[\n\r\n\t]*$/g, '') + os.EOL
          )
        }
      }
    })
  }
  /**
   * @description:打包
   * @param {string} dir 目录
   * @param {string} pkgFile 打包文件
   */
  public async packageSync(dir: string, pkgFile: string) {
    const dirPath = path.resolve(dir)
    // 创建 zip 实例
    const zip = new JSZip()
    // 删除目标文件
    if (fs.existsSync(pkgFile)) {
      fs.unlinkSync(pkgFile)
    }
    // zip 递归读取文件夹下的文件流
    this.readDir(zip, dirPath)
    // 设置压缩格式，开始打包
    let content = await zip.generateAsync({
      // nodejs 专用
      type: 'nodebuffer',
      // 压缩算法
      compression: 'DEFLATE',
      // 压缩级别
      compressionOptions: { level: 9 }
    })
    //获取随机数
    const key = this.random()
    for (let i = 0; i < content.length; i++) {
      content[i] = content[i] ^ key
    }
    // 将打包的内容写入 当前目录下的 result.zip中
    const pkgName = Buffer.from(path.basename(pkgFile))
    // 第一位key随机数 第二位文件名称长度 第三位算法版本 1:第一版算法 2第二版算法......
    const head = Buffer.from([key, pkgName.length, 1])
    // 写入文件
    await fs.writeFileSync(
      pkgFile,
      // content,
      Buffer.concat([head, content, pkgName]),
      'utf-8'
    )
  }

  /**
   * @description: zip 递归读取文件夹下的文件流
   * @param {JSZip} zip
   * @param {string} nowPath
   * @return {*}
   */
  private readDir(zip: JSZip, nowPath: string) {
    // 读取目录中的所有文件及文件夹（同步操作）
    const files: string[] = fs.readdirSync(nowPath)
    // 遍历检测目录中的文件 .filter(exclude)
    files.forEach(fileName => {
      // 当前文件的全路径
      const fillPath = path.join(nowPath, fileName)
      // 获取一个文件的属性
      const file = fs.statSync(fillPath)
      // 如果是目录的话，继续查询
      if (file.isDirectory()) {
        // 压缩对象中生成该目录
        // eslint-disable-next-line prefer-const
        let dirlist = zip.folder(fileName)
        if (dirlist != null) {
          // （递归）重新检索目录文件
          this.readDir(dirlist, fillPath)
        }
      } else {
        // 压缩目录添加文件
        zip.file(fileName, fs.readFileSync(fillPath))
      }
    })
  }

  /**
   * @description: 随机一个1~255的整数
   * @return {number} 随机数
   */
  private random(): number {
    const num = ~~(Math.random() * (1 << 8))
    if (num === 0) return this.random()
    return num
  }
}

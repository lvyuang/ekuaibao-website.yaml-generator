#!/usr/bin/env node
const exec = require('child_process').execSync
const fs = require('fs-extra')
const os = require('os')

const tmpdir = os.tmpdir() + '/ekuaibao-website-yaml-generator'

// 删除 repos 目录
console.log('## 清空临时目录', tmpdir)
fs.removeSync(tmpdir)

// 下载代码
console.log('## 下载代码')
exec(`git clone --depth 1 -b refactor git@git.ekuaibao.com:whispered/applet.git ${tmpdir}/applet`)
exec(`git clone --depth 1 -b refactor-datagrid git@git.ekuaibao.com:whispered/web.git ${tmpdir}/web`)

// 读取版本号
function readVersion(packageJsonPath) {
  const packageJSON = require(packageJsonPath)

  return packageJSON.version
}

console.log('## 读取版本号')
const webVersion = readVersion(tmpdir + '/web/package.json')
console.log('## webVersion', webVersion)
const appletVersion = readVersion(tmpdir + '/applet/package.json')
console.log('## appletVersion', appletVersion)

// 生成配置文件
console.log('## 生成配置文件')
const template = fs.readFileSync(`${__dirname}/website.yaml`, {
  encoding: 'utf8'
})
const content = template.replace('${WEB_VERSION}', webVersion).replace('${APPLET_VERSION}', appletVersion)
const outputPath = `${process.cwd()}/website.yaml`
fs.writeFileSync(outputPath, content, {
  encoding: 'utf8'
})
console.log('## 生成完成', outputPath)

// 删除 repos 目录
console.log('## 清空临时目录', tmpdir)
fs.removeSync(tmpdir)

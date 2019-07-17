#!/usr/bin/env node
const exec = require('child_process').execSync
const fs = require('fs-extra')
const os = require('os')
const argv = process.argv

if (!argv[2] || argv[2] === 'help' || argv[2] === '--help' || argv[2] === '-h' || (argv[2] !== '460' && argv[2] !== 'es')) {
  console.log(`
  ekuaibao-wyg [options]

  options:
    es: 生成 es 环境所需配置文件
    460: 生成 460 环境所需配置文件
    help: 查看帮助文档
  `)
  process.exit()
}

const namespace = argv[2]
const tmpdir = os.tmpdir() + '/ekuaibao-website-yaml-generator'

// 删除 repos 目录
console.log('## 清空临时目录', tmpdir)
fs.removeSync(tmpdir)

// 下载代码
console.log('## 下载代码')
exec(`git clone --depth 1 -b ${namespace === '460' ? 'develop' : 'refactor'} git@git.ekuaibao.com:whispered/applet.git ${tmpdir}/applet`)
exec(`git clone --depth 1 -b ${namespace === '460' ? 'develop' : 'refactor-datagrid'} git@git.ekuaibao.com:whispered/web.git ${tmpdir}/web`)

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
let content = template.replace('${WEB_VERSION}', webVersion).replace('${APPLET_VERSION}', appletVersion)

if (namespace === '460') {
  content = content.replace(/namespace:\ es/g, 'namespace: 460')
}

const outputPath = `${process.cwd()}/website.yaml`
fs.writeFileSync(outputPath, content, {
  encoding: 'utf8'
})
console.log('## 生成完成', outputPath)

// 删除 repos 目录
console.log('## 清空临时目录', tmpdir)
fs.removeSync(tmpdir)

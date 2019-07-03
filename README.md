# 说明
用于在多人并行开发时，生成易快报前端项目 web/applet 部署的配置文件 website.yaml。

# 运行环境
node 10.15.3

# 安装
```
> npm i -g ekuaibao-website-yaml-generator@latest
```

# 使用
```
> ekuaibao-wyg

## 清空临时目录 /var/folders/k2/t4_kf4qx2td7qkm9vrnb__jw0000gn/T/ekuaibao-website-yaml-generator
## 下载代码
Cloning into '/var/folders/k2/t4_kf4qx2td7qkm9vrnb__jw0000gn/T/ekuaibao-website-yaml-generator/applet'...
Cloning into '/var/folders/k2/t4_kf4qx2td7qkm9vrnb__jw0000gn/T/ekuaibao-website-yaml-generator/web'...
## 读取版本号
## webVersion 5.28.4
## appletVersion 5.28.9
## 生成配置文件
## 生成完成 /Users/lvyuang/Downloads/website.yaml
## 清空临时目录 /var/folders/k2/t4_kf4qx2td7qkm9vrnb__jw0000gn/T/ekuaibao-website-yaml-generator
```

脚本会去分析 git@git.ekuaibao.com:whispered/applet.git 的 refactor 分支和 git@git.ekuaibao.com:whispered/web.git 的 refactor-datagrid 分支，获取最新的版本号，并在当前目录生成 website.yaml 文件。

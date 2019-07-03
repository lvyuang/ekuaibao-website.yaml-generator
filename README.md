# 说明
用于在多人并行开发时，生成易快报前端项目 web/applet 部署的配置文件 website.yaml。

# 运行环境
node 10.15.3

# 安装
```
> npm i -g ekuaibao-website-yaml-generator
```

# 使用
```
> ekuaibao-wyg
```

脚本会去分析 git@git.ekuaibao.com:whispered/applet.git 的 refactor 和 git@git.ekuaibao.com:whispered/web.git 的 refactor-datagrid 分支，获取最新的版本号，并在当前目录生成 website.yaml 文件。

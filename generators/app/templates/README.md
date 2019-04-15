# 项目名称

### 开发构建环境

基于 [Generator-kmapp](https://github.com/sumaolin/generator-kmapp) 生成的，具体使用看项目的使用手册

### 项目的开发流程

1. `git clone git@git.kmtongji.com:sumaolin/lego-lcs.git`
2. `npm install` 安装开发环境依赖包
3. `bower install` 通过 bower 安装项目用到的 JavaScript 库
4. `gulp serve` 开启本地开发环境 ( 新建 html，需要重新运行改命令)
5. `gulp build` 项目上线时打包压缩前端 css，js, images, fonts 到 dist 目录下，不会压缩 html 文件，根据具体需要可以开启

**注意**

1, 2, 3 第一次克隆项目时候运行成功一次就可以，平常开发只需要 4，5 就可以

### Git Commit 流程

对应 git commit msg 做了格式化规范，所以下面的 git commit 流程

1. `git status` 查看变更的文件
2. `git add .` 把变更文件提交到暂存区
3. `git cz` 触发 [Commitizen](https://github.com/commitizen/cz-cli) 工具，编写 git commit msg 信息
4. `git pull & git push` 拉取线上代码并提交当前代码到线上

有问题，可以参考：[git commit message 规范设置](https://github.com/sumaolin/study/blob/master/readme/git_cmmit_message.md) 解决

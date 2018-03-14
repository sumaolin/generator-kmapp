# generator-kmapp [![Build Status](https://secure.travis-ci.org/sumaolin/generator-kmapp.png?branch=master)](https://travis-ci.org/sumaolin/generator-kmapp)

## 开始使用 (Getting Started)

### 1. 安装 `Yeoman`, `bower`, `gulp`是环境依赖两种包管理工具，不清楚的自己搜索相关知识 (To install Yeoman from npm, run:)
```bash
npm install -g yo bower gulp
```

### 2. 安装`generator-kmapp` (To install generator-kmapp from npm, run:)
```bash
npm install -g generator-kmapp
```

### 3. 使用 `generator-kmapp` (Finally, initiate the generator:)
```bash
yo kmapp
```
### 4. 进入开发环境
```bash
gulp serve 
```
自动打开浏览器，并开启自动刷新功能，赶快试试吧！

### 5. 开发完成，打包压缩`js`, `css`, `images`文件
```bash
gulp build 
```
生产的目录dist, 开发中使用的是相对路径，所以可以直接点击查看html的效果

## Getting To Know Yeoman

[Yeoman](http://yeoman.io) generator has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [gulp](http://gulpjs.com/) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).

## 背景知识

> [前端自动化——快速的移动Web开发模式(Yeoman: generator-gulp-webapp)](https://github.com/xiao-hai/blog/issues/1)

最终想写个自己的generator 统一开发环境，所以有了 generator-kmapp，km 来源公司名称 [孔明科技](http://www.kongming-inc.com/)。

## 深入了解

### 首要的当然是官方文档了，怎么写自己的 generator
      1. [WRITING YOUR OWN YEOMAN GENERATOR](http://yeoman.io/authoring/index.html)

### 英语渣，相关的国内文档
      1. [yeoman - 搭建自己的脚手架 - 1](http://segmentfault.com/a/1190000002629851)
      2. [yeoman - 搭建自己的脚手架 - 2](http://segmentfault.com/a/1190000002630463)
      3. [yeoman - 搭建自己的脚手架 - 3 - 弃坑](http://segmentfault.com/a/1190000002630997)

### 整理
      4. [自定义Yeoman生成器 ](https://github.com/sumaolin/generator-kmapp/blob/master/readme/1.md) 自己整理了下

## License

MIT

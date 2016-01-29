# generator-kmapp [![Build Status](https://secure.travis-ci.org/sumaolin/generator-kmapp.png?branch=master)](https://travis-ci.org/sumaolin/generator-kmapp)

> [Yeoman](http://yeoman.io) generator

## 背景知识

> [前端自动化——快速的移动Web开发模式(Yeoman: generator-gulp-webapp)](https://github.com/xiao-hai/blog/issues/1)

最终想写个自己的generator 统一开发环境，所以有了 generator-kmapp，km 来源公司名称 [孔明科技](http://www.kongming-inc.com/)。


## 参考文章

### 首要的当然是官方文档了，怎么写自己的 generator

   1. [WRITING YOUR OWN YEOMAN GENERATOR](http://yeoman.io/authoring/index.html)

### 英语渣，相关的国内文档

   1. [yeoman - 搭建自己的脚手架 - 1](http://segmentfault.com/a/1190000002629851)
   2. [yeoman - 搭建自己的脚手架 - 2](http://segmentfault.com/a/1190000002630463)
   3. [yeoman - 搭建自己的脚手架 - 3 - 弃坑](http://segmentfault.com/a/1190000002630997)

   4. [自定义Yeoman生成器 ](https://github.com/sumaolin/generator-kmapp/blob/master/readme/1.md) 自己整理了下

## Getting Started
## 开始介绍怎么使用

### What is Yeoman?
### 什么是Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

安装Yeoman :

```bash
npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-kmapp from npm, run:

安装generator-kmapp：

```bash
npm install -g generator-kmapp
```

Finally, initiate the generator:

使用generator-kmapp：
```bash
yo kmapp
```

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [gulp](http://gulpjs.com/) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

MIT

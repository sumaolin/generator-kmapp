// generated on <%= date %> using <%= name %> <%= version %>
/*
 * @Author: Kevin.Su
 * @Date: <%= date %>
 * @Last Modified by: Kevin.su
 * @Last Modified time: 2019-04-30 16:18:15
 */

import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import browserSync from 'browser-sync'
import del from 'del'
import { stream as wiredep } from 'wiredep'
import merge from 'merge-stream'
import fontSpider from 'gulp-font-spider'
import proxyMiddleware from 'http-proxy-middleware'
import cleanCSS from 'gulp-clean-css'
import taskListing from 'gulp-task-listing'
import terser from 'gulp-terser'
const $ = gulpLoadPlugins({ lazy: true })
const reload = browserSync.reload

//编译less
//注意：任务只处理less文件，如需处理css文件请自行修改。
// 编译生成的css到.tmp目录下   px/24 -> rem
gulp.task('styles', () => {
  return gulp
    .src('app/assets/styles/*.less')
    .pipe(
      $.plumber({
        errorHandler: function(err) {
          console.log(err)
          this.emit('end')
        }
      })
    )
    .pipe($.replace(/(\d+)px/g, '$1/24rem')) // px -> rem单位转换
    .pipe($.less())
    .pipe($.autoprefixer({ browsers: ['> 5%'] }))
    .pipe(gulp.dest('.tmp/assets/styles'))
})

// 注入组件并替换gulp-include内容
// app -> .tmp
gulp.task('wiredep-include', () => {
  gulp
    .src('app/*.html')
    .pipe(
      wiredep({
        ignorePath: /^(\.\.\/)*\.\./
      })
    )
    .pipe($.include())
    .pipe(gulp.dest('.tmp'))
})

//文件压缩(build时才执行)
gulp.task('html', ['styles'], () => {
  const assets = $.useref.assets({ searchPath: ['.tmp', 'app'] })

  return gulp
    .src('.tmp/*.html')
    .pipe(assets)
    .pipe(
      $.if(
        '*.js',
        terser({
          compress: {
            drop_console: true,
            drop_debugger: true
          }
        })
      )
    )
    .pipe(
      $.if(
        '*.css',
        cleanCSS({
          advanced: false, //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
          compatibility: '*', //保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
          keepBreaks: false, //类型：Boolean 默认：false [是否保留换行]
          keepSpecialComments: '*' //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        })
      )
    )
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe(gulp.dest('dist'))
})
/*
 * 图片压缩2
 * gulp-tinypng：
 * 1.https://tinypng.com/developers 在网站上用邮箱申请一个API_KEY，免费版每月可压缩500张图片；
 * 2.源目录文件夹层级无法保留，需进一步处理。
 */
gulp.task('images', () => {
  return gulp
    .src(['app/assets/images/**/*'])
    .pipe($.tinypng('Mo-Ofo6bmYy-rZym6oNxxhdHBm6kZVi3'))
    .pipe(gulp.dest('dist/assets/images'))
})

/*
  拷贝其他文件
  app/assets/fonts
  app/assets/images 不压缩，由于API的调用次数限制，图片压缩单独gulp images
*/
gulp.task('extras', () => {
  gulp.src(['app/assets/fonts/*']).pipe(gulp.dest('dist/assets/fonts/'))
  return gulp
    .src(['app/assets/images/*'], {
      dot: true
    })
    .pipe(gulp.dest('dist/assets/images/'))
})

//清除动态生成的文件夹
gulp.task('clean', del.bind(null, ['.tmp', 'dist']))

//运行测试代码
gulp.task('serve', ['wiredep-include', 'styles'], () => {
  // gulp.start('fontspider');

  var proxy = proxyMiddleware('/api', {
    target: 'http://huggies.kmapp.cn',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '/' // rewrite paths
    }
  })

  browserSync({
    notify: false,
    open: 'external',
    port: 9000,
    server: {
      baseDir: ['.tmp', 'app'],
      routes: {
        '/bower_components': 'bower_components'
      },
      middleware: [proxy]
    }
  })

  gulp
    .watch([
      '.tmp/*.html',
      '.tmp/assets/styles/**/*.css',
      'app/assets/scripts/**/*.js',
      'app/assets/images/**/*',
      'app/assets/fonts/**/*'
    ])
    .on('change', reload)

  gulp.watch(['app/*.html', 'app/common/*.html'], ['wiredep-include'])
  gulp.watch('app/assets/styles/**/*.less', ['styles'])
})

gulp.task('build', ['wiredep-include', 'extras', 'html'], () => {
  gulp.src('dist/*.html').pipe(fontSpider()) // 字体分离在 dist 目录文件生成完后运行
  return gulp
    .src('dist/assets/**/*')
    .pipe($.size({ title: 'build', gzip: true }))
})
//运行最终代码
gulp.task('serve:dist', () => {
  browserSync({
    notify: false,
    port: 9001,
    open: 'external', // 使用本机IP地址打开浏览器，方便局域网调试
    server: {
      baseDir: ['dist']
    }
  })
})
gulp.task('default', () => {
  gulp.start('help')
})

gulp.task('help', taskListing)

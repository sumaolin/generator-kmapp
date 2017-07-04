// generated on <%= date %> using <%= name %> <%= version %>
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';
import {stream as wiredep} from 'wiredep';
import merge from 'merge-stream';
import fontSpider from 'gulp-font-spider';
import proxyMiddleware from 'http-proxy-middleware';
import cleanCSS from 'gulp-clean-css';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

//编译less
//注意：任务只处理less文件，如需处理css文件请自行修改。
gulp.task('styles', () => {
  return gulp.src('app/assets/styles/*.less')
    .pipe($.plumber({
      errorHandler: function (err) {
          console.log(err);
          this.emit('end');
      }
    }))
    // .pipe($.sourcemaps.init())
    .pipe($.less())
    .pipe($.autoprefixer({browsers: ['> 5%']}))
    .pipe(gulp.dest('.tmp/assets/styles'));
});

//文件压缩(build时才执行)
gulp.task('html', ['styles'], () => {
  const assets = $.useref.assets({searchPath: ['.tmp', 'app', '.']});

  return gulp.src('.tmp/*.html')
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', cleanCSS({
      advanced: false,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
      compatibility: '*',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
      keepBreaks: false,//类型：Boolean 默认：false [是否保留换行]
      keepSpecialComments: '*' //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
    })))
    .pipe(assets.restore())
    .pipe($.useref())
    // .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
    .pipe(gulp.dest('dist'));
});

//图片拼合
gulp.task('sprite', () => {
  var spriteData = gulp.src('app/assets/images/sprite/*.png').pipe($.spritesmith({
    imgName: 'spriteassets/.png',
    cssName: 'spritassets/e.css',
    //algorithm: 'top-down',
    imgPath: '../images/sprite.png'
  }));

  var imgStream = spriteData.img
    .pipe(gulp.dest('.tmp/assets/images'));

  //在css文件中替换数值，然后通过less编译实现px转rem
  var cssStream = spriteData.css
    .pipe($.replace(/(\d+)px/g, '$1/24rem'))
    .pipe($.plumber())
    .pipe($.less())
    // .pipe($.less())
    .pipe(gulp.dest('.tmp/assets/styles'));

  return merge(imgStream, cssStream);
});
/*
 * 图片压缩1
 * gulp-imageisux插件的坑：
 * 1.源目录文件夹层级无法保留，各文件夹中的图片压缩完都输出到path目录下(由imageisux函数第一个参数指定)；
 * 2.输出路径不能自由指定；
 * 3.imageisux不支持管道流。
 * 注意：imageisux压缩任务不可与复制任务一同执行，因为复制任务在图片没有全部压缩完成之前就会执行，造成图片丢失。
 */
// gulp.task('imagemin', ['sprite'], () => {
//   return gulp.src([
//       'app/assets/images/**/*',
//       '!app/assets/images/sprite/**/*',
//       '.tmp/assets/images/**/*'
//     ])
//     .pipe($.imageisux('/', false));
// });

/*
 * 图片压缩2
 * gulp-tinypng：
 * 1.https://tinypng.com/developers 在网站上用邮箱申请一个API_KEY，免费版每月可压缩500张图片；
 * 2.源目录文件夹层级无法保留，需进一步处理。
 */
gulp.task('images', ['sprite'], () => {
  return gulp.src([
      'app/assets/images/**/*',
      '.tmp/assets/images/**/*'
      ])
    // .pipe($.tinypng('Mo-Ofo6bmYy-rZym6oNxxhdHBm6kZVi3'))
    .pipe(gulp.dest('dist/assets/images'));
});

//拷贝字体文件
gulp.task('fonts', () => {
  return gulp.src(require('main-bower-files')({
    filter: '**/*.{eot,svg,ttf,woff,woff2}'
  }).concat('app/assets/fonts/**/*'))
    .pipe(gulp.dest('.tmp/assets/fonts'))
    .pipe(gulp.dest('dist/assets/fonts'));
});

// 注入组件并替换include内容
gulp.task('wiredep-include', () => {
  gulp.src('app/*.html')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe($.include())
    .pipe(gulp.dest('.tmp'));
});

//拷贝其他文件
gulp.task('extras', () => {
  return gulp.src([
    'app/*.*',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

//清除动态生成的文件夹
gulp.task('clean', del.bind(null, ['.tmp', 'dist']));


//运行测试代码
gulp.task('serve', ['wiredep-include', 'sprite', 'styles', 'fonts'], () => {
  // gulp.start('fontspider');

  var proxy = proxyMiddleware('/api', {
    target: 'http://yogurt.kmapp.cn',
    changeOrigin: true,
    pathRewrite: {
        '^/api' : '/scrm/'      // rewrite paths
    },
  });

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
  });

  gulp.watch([
    '.tmp/*.html',
    '.tmp/assets/styles/**/*.css',
    'app/assets/scripts/**/*.js',
    'app/assets/images/**/*',
    '.tmp/assets/fonts/**/*'
  ]).on('change', reload);

  gulp.watch('app/*.html', ['wiredep-include']);
  gulp.watch('app/assets/images/sprite/*', ['sprite']);
  gulp.watch('app/assets/styles/**/*.less', ['styles']);
  gulp.watch('app/assets/fonts/**/*', ['fonts']);
  gulp.watch('bower.json', ['wiredep-include', 'fonts']);
});

//运行最终代码
gulp.task('serve:dist', () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});

gulp.task('build', ['wiredep-include', 'images', 'fonts', 'html', 'extras'], () => {
  return gulp.src('dist/assets/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});

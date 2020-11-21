const { task, src, dest, series, parallel } = require('gulp');
const $ = require('gulp-load-plugins')({
  rename: {
    'gulp-rev-delete-original':'revdel',
    'gulp-replace': 'replace'
  }
});

task('clean', function() {
  return src('dist/', {read: false})
      .pipe($.clean());
});

task('copy', function() {
  return src(['site/assets/{img,font}/**/*', 'site/app.yaml'], {base: 'site'})
      .pipe(dest('dist'));
});

task('minify-js', function() {
  return src('site/**/*.js')
    .pipe($.uglify())
    .pipe(dest('dist/'))
});

task('minify-css', function() {
  return src('site/**/*.css')
    .pipe($.cssnano({safe: true}))
    .pipe(dest('dist/'))
});

task('minify-html', function() {
  return src('site/**/*.html')
    .pipe($.htmlmin({
        collapseWhitespace: true,
        removeComments: false
      }))
    .pipe(dest('dist/'))
});

task('svg-sprite-planos', function() {
  return src('img/plano-*.svg', { cwd: 'site/assets' })
  .pipe($.svgSprite({
    mode: {
      css: {
        dest: '.',
        sprite: 'img/planos.svg',
        bust: false,
        render: {
          css: {
            dest: 'css/planos.css'
          }
        }
      }
    }
  }))
  .pipe($.replace('../img', '/assets/img'))
  .pipe(dest('site/assets'));
});

/* Concatenação */
task('useref', function () {
  return src('site/index.html')
      .pipe($.useref())
      .pipe($.if('*.html', $.inlineSource()))
      .pipe($.if('*.html', $.htmlmin({
          collapseWhitespace: true,
          removeComments: true
        })))
      .pipe($.if('*.js', $.uglify()))
      .pipe($.if('*.css', $.cssnano({safe: true})))
      .pipe(dest('dist'));
});

task('imagemin', function() {
  return src('site/assets/img/*')
      .pipe($.imagemin({
          progressive: true,
          svgoPlugins: [
              {removeViewBox: false},
              {cleanupIDs: false}
          ]
      }))
      .pipe(dest('dist/assets/img'));
});

task('rev', function(){
  return src(['dist/**/*.{css,js,jpg,jpeg,png,svg}'])
    .pipe($.rev())
    .pipe($.revdel())
    .pipe(dest('dist/'))
    .pipe($.rev.manifest())
    .pipe(dest('dist/'))
});

task('revreplace', function(){
  return src(['dist/index.html', 'dist/app.yaml', 'dist/**/*.css'])
    .pipe($.revReplace({
        manifest: src('dist/rev-manifest.json'),
        replaceInExtensions: ['.html', '.yaml', '.js', '.css']
    }))
    .pipe(dest('dist/'));
});

task('minify', parallel('minify-js', 'minify-css'));
task('build', series(parallel('imagemin', 'svg-sprite-planos'), 'minify', 'useref'));
task('default', series('clean', 'copy', 'build', 'rev', 'revreplace'));
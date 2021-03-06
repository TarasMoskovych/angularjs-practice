const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const wrap = require('gulp-wrap');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const gulpif = require('gulp-if');
const sass = require('gulp-sass');
const yargs = require('yargs');
const ngAnnotate = require('gulp-ng-annotate-patched');
const templateCache = require('gulp-angular-templatecache');
const server = require('browser-sync').create();
const del = require('del');
const path = require('path');
const child = require('child_process');
const sourcemaps = require('gulp-sourcemaps');

const exec = child.exec;
const argv = yargs.argv;
const root = 'src/';
const paths = {
  dist: './dist/',
  scripts: [`${root}/app/**/*.js`, `!${root}/app/**/*.spec.js`],
  tests: `${root}/app/**/*.spec.js`,
  styles: `${root}/scss/*.scss`,
  templates: `${root}/app/**/*.html`,
  modules: [
    'angular/angular.js',
    'angular-messages/angular-messages.js',
    'angular-ui-router/release/angular-ui-router.js',
    'firebase/firebase-app.js',
    'firebase/firebase-analytics.js',
    'firebase/firebase-auth.js',
    'firebase/firebase-database.js',
    'angularfire/dist/angularfire.js',
    'angular-loading-bar/build/loading-bar.min.js'
  ],
  static: [
    `${root}/index.html`,
    `${root}/fonts/**/*`,
    `${root}/img/**/*`
  ]
};

gulp.task('clean', cb => del(paths.dist + '**/*', cb));

gulp.task('templates', () => {
  return gulp.src(paths.templates)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(templateCache({
      root: 'app',
      standalone: true,
      transformUrl: function (url) {
        return url.replace(path.dirname(url), '.');
      }
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('modules', gulp.series('templates', () => {
  return gulp.src(paths.modules.map(item => 'node_modules/' + item))
    .pipe(concat('vendor.js'))
    .pipe(gulpif(argv.deploy, uglify()))
    .pipe(gulp.dest(paths.dist + 'js/'));
}));

gulp.task('styles', () => {
  return gulp.src(paths.styles)
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(gulp.dest(paths.dist + 'css/'));
});

gulp.task('scripts', gulp.series('modules', () => {
  return gulp.src([
    `!${root}/app/**/*.spec.js`,
    `${root}/app/**/*.module.js`,
    ...paths.scripts,
    './templates.js'
  ])
    .pipe(sourcemaps.init())
    .pipe(wrap('(function(angular){\n\'use strict\';\n<%= contents %>})(window.angular);'))
    .pipe(concat('bundle.js'))
    .pipe(ngAnnotate())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulpif(argv.deploy, uglify()))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.dist + 'js/'));
}));

gulp.task('serve', () => {
  server.init({
    files: [`${paths.dist}/**`],
    port: 4200,
    server: {
      baseDir: paths.dist
    }
  });

  gulp.watch('src/scss/**/*.scss', gulp.series('styles'));
  gulp.watch(['src/app/**/*.js', '!src/app/**/*.spec.js', 'src/app/**/*.html'], gulp.series('scripts'));
});

gulp.task('copy', gulp.series('clean', () => {
  return gulp.src(paths.static, { base: 'src' })
    .pipe(gulp.dest(paths.dist));
}));

gulp.task('firebase', gulp.series('styles', 'scripts', () => {
  return exec('firebase deploy', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
  });
}));

gulp.task('default', gulp.series('copy', 'styles', 'scripts', 'serve'));
gulp.task('production', gulp.series('copy', 'firebase'));

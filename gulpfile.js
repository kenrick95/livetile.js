'use strict'

var gulp = require('gulp')
var tsc = require('gulp-typescript')
var tslint = require('gulp-tslint')
var sourcemaps = require('gulp-sourcemaps')
var uglify = require('gulp-uglify')
var sass = require('gulp-sass')
var del = require('del')
var Config = require('./gulpfile.config')
var tsProject = tsc.createProject('tsconfig.json')

var config = new Config()

/**
 * Generates the app.d.ts references file dynamically from all application *.ts files.
 */
// gulp.task('gen-ts-refs', function () {
//     var target = gulp.src(config.appTypeScriptReferences);
//     var sources = gulp.src([config.allTypeScript], {read: false});
//     return target.pipe(inject(sources, {
//         starttag: '//{',
//         endtag: '//}',
//         transform: function (filepath) {
//             return '/// <reference path="../..' + filepath + '" />';
//         }
//     })).pipe(gulp.dest(config.typings));
// });

/**
 * Lint all custom TypeScript files.
 */
gulp.task('ts-lint', function () {
  return gulp
    .src(config.allTypeScript)
    .pipe(
      tslint({
        formatter: 'verbose'
      })
    )
    .pipe(tslint.report())
})

/**
 * Compile TypeScript and include references to library and app .d.ts files.
 */
gulp.task('compile-ts', function () {
  var sourceTsFiles = [
    config.allTypeScript, // path to typescript files
    config.libraryTypeScriptDefinitions
  ] // reference to library .d.ts files

  var tsResult = gulp
    .src(sourceTsFiles)
    .pipe(sourcemaps.init())
    .pipe(tsProject())

  tsResult.dts.pipe(gulp.dest(config.tsOutputPath))
  return tsResult.js
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.tsOutputPath))
})

// TODO: combine and minify into one file
gulp.task('minify', function () {
  return gulp
    .src(config.allJavaScript)
    .pipe(uglify())
    .pipe(gulp.dest(config.dist))
})

gulp.task('sass', function () {
  return gulp
    .src(config.allSass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.sassOutputPath))
})

gulp.task('watch-sass', function () {
  gulp.watch(config.allSass, ['sass'])
})

/**
 * Remove all generated JavaScript files from TypeScript compilation.
 */
gulp.task('clean-ts', function (cb) {
  var typeScriptGenFiles = [
    config.tsOutputPath + '/**/*.js', // path to all JS files auto gen'd by editor
    config.tsOutputPath + '/**/*.js.map', // path to all sourcemap files auto gen'd by editor
    '!' + config.tsOutputPath + '/lib'
  ]

  // delete the files
  del(typeScriptGenFiles, cb)
})

gulp.task('watch-ts', function () {
  gulp.watch([config.allTypeScript], ['ts-lint', 'compile-ts'])
})
gulp.task('watch', ['watch-ts', 'watch-sass'])

gulp.task('default', ['compile-ts', 'sass'])

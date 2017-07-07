'use strict';
const gulp = require('gulp');
const Builder = require('systemjs-builder');
const path = require('path');
const tsc = require('gulp-typescript');
const runseq = require('run-sequence');
const del = require('del');
const ngc = require('gulp-ngc');
const file = require('gulp-file');
// const gutil = require('gulp-util');

/**var config = {
  transpiler: 'babel',
  typescriptOptions: {
    module: 'cjs'
  },
  map: {
    typescript: 'node_modules/typescript/lib/typescript.js',
    "@angular": "node_modules/@angular",
    "rxjs": "node_modules/rxjs"
  },
  paths: {
    '*': '*.js'
  },
  meta: {
    'node_modules/@angular/*': { build: false },
    'node_modules/rxjs/*': { build: false }
  },
};
 */

let project = tsc.createProject('tsconfig.json');
let aotProject = tsc.createProject('tsconfig-aot.json');


gulp.task('clean:all', ['clean'], function () {
    return del([
        'bundled/*', 'aot/*',
    ]);
});

gulp.task('clean', function () {
    return del([project.options.outDir, aotProject.options.outDir]);
});

gulp.task('compile', function () {
    return project.src()
        .pipe(project())
        .pipe(gulp.dest(project.options.outDir));
});

gulp.task('appbundle', function () {
    var builder = new Builder('./', './system.config.js');
    return builder.buildStatic('build/', {
        minify: true,
        static: true,
        rollup: false,
        runtime: true,
        outputESM: false,
        mangle: false,
        format: 'umd',
        outFile: 'bundled/app.module.min.js'
    }).then(function (output) {
        console.log(output.modules);
    });
});

gulp.task('compile:aot', function() {
    return new Promise(function(resolve, reject) {
        ngc('tsconfig-aot.json')
            .on('error', reject)
            .on('finish', resolve);
        }).then(function() {
            return new Promise(function(resolve, reject) {
                gulp.src('src/main.ts')
                    .on('error', reject)
                    .pipe(gulp.dest(aotProject.options.outDir))
                    .on('finish', resolve);
            });
    });
});

gulp.task('appbundle:aot', function () {
    let builder = new Builder('./', './system.config.js');
    return builder.buildStatic('build:aot/', {
        minify: true,
        static: true,
        rollup: true,
        runtime: true,
        outputESM: false,
        mangle: false,
        format: 'umd',
        outFile: 'bundled/app-aot.module.min.js'
    }).then(function (output) {
        console.log(output.modules);
    });
});

gulp.task('default', function (done) {
    runseq('clean:all', 'compile', 'appbundle', done);
});

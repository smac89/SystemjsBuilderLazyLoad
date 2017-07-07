'use strict';
const gulp = require('gulp');
const Builder = require('systemjs-builder');
const path = require('path');
const tsc = require('gulp-typescript');
const runseq = require('run-sequence');
const del = require('del');
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

gulp.task('default', function (done) {
    runseq('clean:all', 'compile', 'appbundle', done);
});

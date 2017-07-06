"use strict";
const gulp = require('gulp');
const Builder = require('systemjs-builder');
const path = require("path");
const tsc = require('gulp-typescript');
const runseq = require('run-sequence');
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
gulp.task('compile', function() {
  const project = tsc.createProject('tsconfig.json');
  return project.src()
    .pipe(project())
    .pipe(gulp.dest(project.options.outDir));
});

gulp.task('copy', function() {
  return gulp.src(['build/**/*'], {base: 'build'})
  .pipe(gulp.dest('bundled'));
})

gulp.task('appbundle', function() {
    var builder = new Builder('./', './system.config.js');
    return builder.buildStatic('build/app.module','bundled/app.module.min.js',{
        minify: true,
        mangle: false
    });
});

gulp.task('default', function(done) {
  runseq('compile', 'copy', 'appbundle', done);
});

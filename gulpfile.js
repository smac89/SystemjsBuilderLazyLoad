'use strict';
const gulp = require('gulp');
const Builder = require('systemjs-builder');
const path = require('path');
const tsc = require('gulp-typescript');
const runseq = require('run-sequence');
const del = require('del');
const Transform = require('stream').Transform;
const gutil = require('gulp-util');
const inject = require('gulp-inject');
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
    return del('bundled/*');
});

gulp.task('clean', function () {
    return del(project.options.outDir);
});

gulp.task('compile', function () {
    return project.src()
        .pipe(project())
        .pipe(gulp.dest(project.options.outDir));
});

gulp.task('appbundle', function () {
    if (process.env.PROD || process.env.PRODUCTION) {
        var builder = new Builder('./', './system.config.js');
        return builder.buildStatic('build/**/*', {
            minify: true,
            static: true,
            rollup: true,
            runtime: true,
            mangle: false,
            format: 'umd',
            outFile: 'bundled/app.module.min.js'
        }).then(function (output) {
            console.log(output.modules.filter(m => m.search(/admin/g) != -1));
        });
    } else {
        return gulp.src('system.config.js')
        .pipe(new Transform({
            objectMode: true,
            transform: (file, enc, callback) => {
                file = new gutil.File({
                    contents: file.contents,
                    path: 'app.module.min.js'
                });
                // process.stdout.write(file.cwd + '\n');
                // file.path = path.join(file.cwd, 'app.module.min.js');
                callback(null, file);
            }
        })).pipe(gulp.dest('bundled'));
    }
    
});


gulp.task('default', function (done) {
    runseq('clean:all', 'compile', 'appbundle', done);
});

'use strict';
const gulp = require('gulp');
const Builder = require('systemjs-builder');
const path = require('path');
const tsc = require('gulp-typescript');
const runseq = require('run-sequence');
const del = require('del');
const inject = require('gulp-inject');

const project = tsc.createProject('tsconfig.json');
const bundleDir = 'bundled';

gulp.task('clean:all', ['clean'], function () {
    return del(bundleDir);
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
    return new Promise(function(resolve, reject) {
        gulp.src('system.config.js').on('error', reject)
            .pipe(gulp.dest(bundleDir)).on('finish', resolve);
    }).then(function() {
        if (process.env.PROD || process.env.PRODUCTION) {
            var builder = new Builder('./', './system.config.js');
            return builder.buildStatic('build', {
                minify: true,
                static: true,
                rollup: true,
                runtime: true,
                mangle: false,
                format: 'umd',
                outFile: `${bundleDir}/app.module.min.js`
            }).then(function (output) {
                console.log(output.modules);
            });
        }
    });
});

gulp.task('install', function() {
    gulp.src('index.html')
        .pipe(inject(gulp.src(`${bundleDir}/**/*.js`, { read: false }),
            {name: 'app'}))
        .pipe(gulp.dest('.'));
});


gulp.task('default', function (done) {
    runseq('clean:all', 'compile', 'appbundle', 'install', done);
});

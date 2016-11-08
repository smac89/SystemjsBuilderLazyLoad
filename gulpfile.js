"use strict";
var gulp = require('gulp');
var Builder = require('systemjs-builder');
var path = require("path");
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

gulp.task('appbundle', function() {
    var builder = new Builder('./','./systemjs.config.js');
    //builder.loadConfigSync('./systemjs.config.js')
     //builder.config(config);
    builder.buildStatic('build/app.module','bundled/app.module.min.js',{
        minify: true,
        mangle: false
    })
});

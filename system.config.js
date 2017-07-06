/**
 * WEB ANGULAR VERSION
 * (based on systemjs.config.js in angular.io)
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  SystemJS.config({
    // DEMO ONLY! REAL CODE SHOULD NOT TRANSPILE IN THE BROWSER
    transpiler: 'plugin-typescript',

    packageConfigPaths: [
        '@angular/*/package.json',
        '@types/*/package.json',
        'npm:*/package.json'
    ],

    meta: {
      'typescript': {
        "exports": "ts"
      }
    },
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/',
      '@angular/': 'node_modules/@angular/',
      '@types/': 'node_modules/@types/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'bundled',

      // other libraries
      'rxjs':                      'npm:rxjs',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
      'plugin-typescript':         'npm:plugin-typescript@4.0.10/lib/plugin.js',
      'typescript':                'npm:typescript/lib/typescript.js'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {

      app: {
        main: './app.module.min',
        defaultExtension: 'js'
      },
      build: {
        defaultExtension: 'js'
      }
    }
  });

  if (global.noBootstrap) {
    bootstrap();
  }

  // Bootstrap the `AppModule`(skip the `app/main.ts` that normally does this)
  function bootstrap() {

    // Stub out `app/main.ts` so System.import('app') doesn't fail if called in the index.html
    //System.set(System.normalizeSync('app/main.ts'), System.newModule({ }));

    // bootstrap and launch the app (equivalent to standard main.ts)
    Promise.all([
      // SystemJS.import('@angular/platform-browser-dynamic'),
      System.import('app')
    ])
    .then(function (imports) {
      var platform = imports[0];
      // var app      = imports[1];
      // platform.platformBrowserDynamic().bootstrapModule(app.AppModule);
    })
    .catch(function(err){ console.error(err); });
  }

})(this);


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/

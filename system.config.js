/**
 * WEB ANGULAR VERSION
 * (based on systemjs.config.js in angular.io)
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
    const CONFIG = {
        packageConfigPaths: [
            '@angular/*/package.json',
            '@angular/*/*/package.json',
            '@types/*/package.json',
            'npm:*/package.json'
        ],

        paths: {
            // paths serve as alias
            'npm:': 'node_modules/',
            '@angular/': 'node_modules/@angular/',
            '@types/': 'node_modules/@types/'
        },

        // map tells the System loader where to look for things
        map: {
            // other libraries
            rxjs: 'npm:rxjs',
            'ng-bundle': 'npm:ng-bundle/dist/plugin.js',

            // our app is within the build folder
            app: 'build/app'
        },

        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            build: {
                main: 'main',
                defaultExtension: 'js'
            }
        },

        meta: {},
        bundles: {},
        depCache: {}
    };

    if (global.process && (global.process.env.PROD || global.process.env.PRODUCTION)) {
        // production specific
        CONFIG.meta = Object.assign(CONFIG.meta, {
            '*.module.js': {
                loader: 'ng-bundle'
            }
        });

    } else {
        // Non production stuff
        CONFIG.meta = Object.assign(CONFIG.meta, {
            typescript: {
                exports: 'ts'
            }
        });

        CONFIG.packages = Object.assign(CONFIG.packages, {
            src: {
                main: 'main',
                defaultExtension: 'ts'
            }
        });

        CONFIG.map = Object.assign(CONFIG.map, {
            'plugin-typescript': 'npm:plugin-typescript/lib/plugin.js',
            typescript: 'npm:typescript/lib/typescript.js'
        });

        // DEMO ONLY! REAL CODE SHOULD NOT TRANSPILE IN THE BROWSER
        CONFIG.transpiler = 'plugin-typescript'
    }

    SystemJS.config(CONFIG);

    if (global.window === global) {
        SystemJS.import('build').catch(function(err) {
            console.error(err);
        });
    }

})(this);


/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */

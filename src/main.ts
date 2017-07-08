import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import {enableProdMode} from '@angular/core';

// if (process && process.env.PROD || process.env.PRODUCTION) {
// 	enableProdMode();
// }
platformBrowserDynamic().bootstrapModule(AppModule);

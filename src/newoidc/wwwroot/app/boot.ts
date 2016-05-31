import { provide } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { AppComponent } from './app.component';
import { Configuration } from './app.constants';
import {LocationStrategy, HashLocationStrategy} from '@angular/common'



bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    Configuration,
    provide(LocationStrategy, { useClass: HashLocationStrategy })
]);

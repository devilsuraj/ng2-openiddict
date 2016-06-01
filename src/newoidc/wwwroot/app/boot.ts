import { provide } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
//import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { AppComponent } from './app.component';
import { Configuration } from './app.constants';




bootstrap(AppComponent, [
    
    HTTP_PROVIDERS,
    Configuration
]);

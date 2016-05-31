import {Component, provide} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {Http, Headers} from '@angular/http';
import {JwtHelper, AuthHttp, AuthConfig, AUTH_PROVIDERS} from 'angular2-jwt'
import {authorizeComponent} from './authorize/authorize-component'
import {userComponent} from './User/user-component'
import {welcome} from './welcome-component'

import {extauthorizeComponent} from './authorize/externalauth'
import {Router, RouterOutlet, ComponentInstruction} from '@angular/router-deprecated';
@Component({
    selector: 'my-app',
    templateUrl:'app/app.component.html',
    directives: [ROUTER_DIRECTIVES],
   
    providers: [
        ROUTER_PROVIDERS,
        AUTH_PROVIDERS,
        JwtHelper
  
          ]
})
    @RouteConfig([
        { path: '/', name: 'Default', component: welcome, useAsDefault:true  },
        { path: '/login', name: 'Login', component: authorizeComponent},
        { path: '/dashboard', name: 'Dashboard', component: userComponent },
        { path: '/extauth', name: 'Extauth', component: extauthorizeComponent }
        
])
export class AppComponent {
 

    constructor(public jwtHelper: JwtHelper, private _http: Http, private _parentRouter: Router) {  
      
    }

   
    public authcheck() {
        if (!localStorage.getItem('auth_key')) {
            this._parentRouter.navigate(['/Login']);
        }
        else {
            this._parentRouter.navigate(['/Dashboard']);
        }
    }
  
}
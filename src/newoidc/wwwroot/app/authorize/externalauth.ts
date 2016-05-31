import {Component, ViewChild } from '@angular/core'
import {Http, Headers} from '@angular/http';
import {JwtHelper, AuthHttp, AuthConfig, AUTH_PROVIDERS} from 'angular2-jwt'
import {Router} from '@angular/router-deprecated';
declare var System;
@Component({
    selector: 'authorize',
    template: 'Successfully authorized',
    directives: []
})

export class extauthorizeComponent {
    constructor(public jwtHelper: JwtHelper, private _http: Http, private _parentRouter: Router) {
        // System.import('/js/site.js');
    }
   
    public token: any = "";
    public detoken: any = "";
    public isLoggedin: boolean;
    public logMsg: string;
    public login: boolean;
    public register: boolean;
    public loss: boolean;
    public externals: string;
    public hodeModel: boolean = false;
    ngOnInit() {
        // this.getexternals();
        this.getapi();
     
   
    }
    public getapi() {
        this.isLoggedin = false;
        var headers = new Headers();
         return new Promise((resolve) => {
            this._http.get('http://localhost:58056/api/test2').subscribe((data) => {
                localStorage.setItem("authorizationData", data.json());
                localStorage.setItem("auth_key", data.json());
                window.close();
                // resolve(this.isLoggedin)
            }
            )
        })
    }


   

   

}
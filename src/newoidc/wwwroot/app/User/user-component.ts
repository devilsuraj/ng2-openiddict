import {Component} from '@angular/core'
import {JwtHelper, AuthHttp, AuthConfig, AUTH_PROVIDERS} from 'angular2-jwt'
import {Http, Headers} from '@angular/http';
import {Router, RouterOutlet, ComponentInstruction} from '@angular/router-deprecated';
declare var System;
@Component({
    selector: 'authorize',
    template: `<h1>You are logged in</h1> <h3>{{payload}}</h3><hr/>
<button (click)='Logout()' class='btn btn-large'>Logout</button>
`,
    providers: [JwtHelper]
})
export class userComponent {
    private payload: string="loading ...";
    constructor(public jwtHelper: JwtHelper, private _http: Http, private _parentRouter: Router) {
     
    }
    ngOnInit() {
        this.getapi();
    }
    public getapi() {
       
        var headers = new Headers();
        //  var creds = "grant_type=password"
        //      + "&responseType=token,&scope=offline_access profile email roles" + '&username=' + "d@d.d" + '&password=' + "Polardevil#1";
        headers.append("Authorization", "Bearer " + localStorage.getItem("authorizationData"));
        return new Promise((resolve) => {
            this._http.get('http://localhost:58056/api/test', { headers: headers }).subscribe((data) => {
                this.payload=JSON.stringify(data.json());
                // resolve(this.isLoggedin)
            }
            )
        })
    }

    public Logout() {
        var headers = new Headers();
        headers.append("Authorization", "Bearer " + localStorage.getItem("authorizationData"));
        this._http.get('http://localhost:58056/api/account/logout', { headers: headers }).subscribe((data) => {
            localStorage.removeItem("auth_key");
            this._parentRouter.parent.navigate(['/Default']);
            //this.securityService.Logoff();
        });
    }
}
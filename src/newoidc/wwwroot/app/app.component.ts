import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {Http, Headers} from '@angular/http';
import {JwtHelper, AuthHttp, AuthConfig, AUTH_PROVIDERS} from 'angular2-jwt'
import {authorizeComponent} from './authorize/authorize-component'
import {userComponent} from './User/user-component'
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
        { path: '/login', name: 'Login', component: authorizeComponent},
        { path: '/dashboard', name: 'Dashboard', component: userComponent }
])
export class AppComponent {
 

    constructor(public jwtHelper: JwtHelper, private _http: Http, private _parentRouter: Router) {  
      
    }

    public token: any="";
    public detoken: any="";
    public isLoggedin: boolean;
    public authcheck() {
        if (!localStorage.getItem('auth_key')) {
            this._parentRouter.navigate(['/Login']);
        }
        else {
            this._parentRouter.navigate(['/Dashboard']);
        }
    }
    public Login() {
        this.isLoggedin = false;
        var headers = new Headers();
        var creds = "grant_type=password"
            + "&responseType=token,&scope=offline_access profile email roles"+ '&username=' + "d@d.d" + '&password=' + "Polardevil#1";
        headers.append('Content-Type', 'application/X-www-form-urlencoded');
        return new Promise((resolve) => {
            this._http.post('http://localhost:58056/connect/token' , creds, { headers: headers }).subscribe((data) => {
                if (data.json().access_token) {
                    this.token = data.json().access_token
                    alert('auth_key' + data.json());
                    localStorage.setItem("authorizationData", data.json().access_token);
                    localStorage.setItem("whole", data.json());
                    localStorage.setItem("refresh", data.json().refresh_token);
                    var token = data.json();
                    var payload = this.jwtHelper.decodeToken(localStorage.getItem("authorizationData"));
                    var roles = [];
                    if (typeof payload.role === "string")
                        roles.push(payload.role);
                    else if (Object.prototype.toString.call(payload.role) === "[object Array]")
                        roles = payload.role;
                   
                    this.detoken = JSON.stringify( payload);
                 
                    //this.store("authorizationData", data.json().access_token);
                   this.isLoggedin = true;
                }
                resolve(this.isLoggedin)
            }
            )
        })
    }
    public getapi() {
        this.isLoggedin = false;
        var headers = new Headers();
      //  var creds = "grant_type=password"
      //      + "&responseType=token,&scope=offline_access profile email roles" + '&username=' + "d@d.d" + '&password=' + "Polardevil#1";
        headers.append("Authorization", "Bearer " + localStorage.getItem("authorizationData"));
        return new Promise((resolve) => {
            this._http.get('http://localhost:58056/api/test', { headers: headers }).subscribe((data) => {
                alert(JSON.stringify(data.json()));
               // resolve(this.isLoggedin)
            }
            )
        })
    }
    public getapi2() {
        this.isLoggedin = false;
        var headers = new Headers();
        //  var creds = "grant_type=password"
        //      + "&responseType=token,&scope=offline_access profile email roles" + '&username=' + "d@d.d" + '&password=' + "Polardevil#1";
        headers.append("Authorization", "Bearer " + localStorage.getItem("whole"));
        return new Promise((resolve) => {
            this._http.get('http://localhost:58056/api/test', { headers: headers }).subscribe((data) => {
                alert(JSON.stringify(data.json()));
                // resolve(this.isLoggedin)
            }
            )
        })
    }
    public getapi3() {
        this.isLoggedin = false;
        var headers = new Headers();
        //  var creds = "grant_type=password"
        //      + "&responseType=token,&scope=offline_access profile email roles" + '&username=' + "d@d.d" + '&password=' + "Polardevil#1";
        headers.append("Authorization", "Bearer " + localStorage.getItem("refresh"));
        return new Promise((resolve) => {
            this._http.get('http://localhost:58056/api/test', { headers: headers }).subscribe((data) => {
                alert(JSON.stringify(data.json()));
                // resolve(this.isLoggedin)
            }
            )
        })
    }
  /*  private store(key: string, value: any) {
        this.storage.setItem(key, JSON.stringify(value));
    }*/
    public Logout() {
        console.log("Do logout logic");
        //this.securityService.Logoff();
    }
}
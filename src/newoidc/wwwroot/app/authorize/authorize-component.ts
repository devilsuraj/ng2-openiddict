import {Component, ViewChild } from '@angular/core'
import {Http, Headers} from '@angular/http';
import {JwtHelper, AuthHttp, AuthConfig, AUTH_PROVIDERS} from 'angular2-jwt'
import {Router} from '@angular/router-deprecated';
import { MODAL_DIRECTIVES, ModalComponent  } from 'ng2-bs3-modal/ng2-bs3-modal';
declare var System;
@Component({
    selector: 'authorize',
    templateUrl: './app/authorize/authorize-component.html',
    directives: [MODAL_DIRECTIVES]
})

export class authorizeComponent{
    constructor(public jwtHelper: JwtHelper, private _http: Http, private _parentRouter: Router) {
       // System.import('/js/site.js');
    }
    @ViewChild('myModal')
    modal: ModalComponent;

    mclose() {
        this.modal.close();
    }

    mopen() {
        this.modal.open();
    }
    public token: any = "";
    public detoken: any = "";
    public isLoggedin: boolean;
    public logMsg: string;
    public model: logModel;
    public rmodel: registerModel;
    public login: boolean;
    public register: boolean;
    public loss: boolean;
    public hodeModel: boolean = false;
    ngOnInit() {
        this.model = new logModel();
        this.rmodel = new registerModel();
        this.logMsg = "Type your credentials.";
        this.login = true;
        this.loss = false;
        this.register = false;
    }
    public callLogin() {
        this.login = true;
        this.register = false;
        this.loss = false;
    }
    public callLoss() {
        this.login = false;
        this.register = false;
        this.loss = true;
    }
    public callRegister() {
        this.login = false;
        this.register = true;
        this.loss = false;
    }

    public Login() {
        this.isLoggedin = false;
        var headers = new Headers();
        var creds = "grant_type=password"
            + "&responseType=token,&scope=offline_access profile email roles" + '&username=' + this.model.username + '&password=' + this.model.password;
        headers.append('Content-Type', 'application/X-www-form-urlencoded');
        return new Promise((resolve) => {
            this._http.post('http://localhost:58056/connect/token', creds, { headers: headers }).subscribe((data) => {
                if (data.json().access_token) {
                    this.token = data.json().access_token
                    this.logMsg = "You are logged In Now , Please Wait ....";
                    localStorage.setItem("authorizationData", data.json().access_token);
                    localStorage.setItem("auth_key", data.json().access_token);
                    this.isLoggedin = true;
                    this.mclose();
                    // dialog.dismiss();
                    this._parentRouter.parent.navigate(['/Dashboard']);
                }
                else {
                    this.logMsg = "Invalid username or password";
                }
                resolve(this.isLoggedin)
            },error=>this.logMsg= error.json().error_description
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

    /*  private store(key: string, value: any) {
          this.storage.setItem(key, JSON.stringify(value));
      }*/
    public Logout() {
        console.log("Do logout logic");
        //this.securityService.Logoff();
    }
    public userRegister() {
        this.isLoggedin = false;
       // this.rmodel.returnUrl = "http://localhost:58056/connect/token";
        var headers = new Headers();
        var creds = JSON.stringify(this.rmodel);
        headers.append('Content-Type', 'application/json');
        return new Promise((resolve) => {
            this._http.post('http://localhost:58056/api/account/register', creds, { headers: headers }).subscribe((data) => {
                if (data.json().Succeeded) {
                    //get new token
                   // alert('calling login');
                    var headerss = new Headers();
                    var credss = "grant_type=password"
                        + "&responseType=token,&scope=offline_access profile email roles" + '&username=' + this.rmodel.Email + '&password=' + this.rmodel.Password;
                    headerss.append('Content-Type', 'application/X-www-form-urlencoded');
                    return new Promise((resolve) => {
                        this._http.post('http://localhost:58056/connect/token', credss, { headers: headerss }).subscribe((data2) => {
                           // alert('calling done');
                          //  alert(data2.json().access_token);
                            if (data2.json().access_token) {
                                this.token = data2.json().access_token
                                this.logMsg = "You are logged In Now , Please Wait ....";
                                localStorage.setItem("authorizationData", data2.json().access_token);
                                localStorage.setItem("auth_key", data2.json().access_token);
                                this.isLoggedin = true;
                                this.mclose();
                                // dialog.dismiss();
                                this._parentRouter.parent.navigate(['/Dashboard']);
                            }
                            else {
                                this.logMsg = "Invalid username or password";
                            }
                            resolve(this.isLoggedin)
                        }, error => this.logMsg = error.json().error_description
                        )
                    })
                    //end of token
                }
                else {
                   // this.logMsg = "Invalid username or password";
                    this.logMsg = data.json().Errors[0].Description
                }
                resolve(this.isLoggedin)
            }, error => this.logMsg = error.json().Errors[0].Description
            )
        })
    }
}
export class logModel {
    public username: string;
    public password: string;
}

export class registerModel {
    public Email: string;
    public Password: string;
    public ConfirmPassword: string;
   // public returnUrl: string;
}
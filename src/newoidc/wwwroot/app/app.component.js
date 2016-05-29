System.register(['@angular/core', '@angular/router-deprecated', '@angular/http', 'angular2-jwt', './authorize/authorize-component', './User/user-component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_deprecated_1, http_1, angular2_jwt_1, authorize_component_1, user_component_1, router_deprecated_2;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
                router_deprecated_2 = router_deprecated_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            },
            function (authorize_component_1_1) {
                authorize_component_1 = authorize_component_1_1;
            },
            function (user_component_1_1) {
                user_component_1 = user_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(jwtHelper, _http, _parentRouter) {
                    this.jwtHelper = jwtHelper;
                    this._http = _http;
                    this._parentRouter = _parentRouter;
                    this.token = "";
                    this.detoken = "";
                }
                AppComponent.prototype.authcheck = function () {
                    if (!localStorage.getItem('auth_key')) {
                        this._parentRouter.navigate(['/Login']);
                    }
                    else {
                        this._parentRouter.navigate(['/Dashboard']);
                    }
                };
                AppComponent.prototype.Login = function () {
                    var _this = this;
                    this.isLoggedin = false;
                    var headers = new http_1.Headers();
                    var creds = "grant_type=password"
                        + "&responseType=token,&scope=offline_access profile email roles" + '&username=' + "d@d.d" + '&password=' + "Polardevil#1";
                    headers.append('Content-Type', 'application/X-www-form-urlencoded');
                    return new Promise(function (resolve) {
                        _this._http.post('http://localhost:58056/connect/token', creds, { headers: headers }).subscribe(function (data) {
                            if (data.json().access_token) {
                                _this.token = data.json().access_token;
                                alert('auth_key' + data.json());
                                localStorage.setItem("authorizationData", data.json().access_token);
                                localStorage.setItem("whole", data.json());
                                localStorage.setItem("refresh", data.json().refresh_token);
                                var token = data.json();
                                var payload = _this.jwtHelper.decodeToken(localStorage.getItem("authorizationData"));
                                var roles = [];
                                if (typeof payload.role === "string")
                                    roles.push(payload.role);
                                else if (Object.prototype.toString.call(payload.role) === "[object Array]")
                                    roles = payload.role;
                                _this.detoken = JSON.stringify(payload);
                                _this.isLoggedin = true;
                            }
                            resolve(_this.isLoggedin);
                        });
                    });
                };
                AppComponent.prototype.getapi = function () {
                    var _this = this;
                    this.isLoggedin = false;
                    var headers = new http_1.Headers();
                    headers.append("Authorization", "Bearer " + localStorage.getItem("authorizationData"));
                    return new Promise(function (resolve) {
                        _this._http.get('http://localhost:58056/api/test', { headers: headers }).subscribe(function (data) {
                            alert(JSON.stringify(data.json()));
                        });
                    });
                };
                AppComponent.prototype.getapi2 = function () {
                    var _this = this;
                    this.isLoggedin = false;
                    var headers = new http_1.Headers();
                    headers.append("Authorization", "Bearer " + localStorage.getItem("whole"));
                    return new Promise(function (resolve) {
                        _this._http.get('http://localhost:58056/api/test', { headers: headers }).subscribe(function (data) {
                            alert(JSON.stringify(data.json()));
                        });
                    });
                };
                AppComponent.prototype.getapi3 = function () {
                    var _this = this;
                    this.isLoggedin = false;
                    var headers = new http_1.Headers();
                    headers.append("Authorization", "Bearer " + localStorage.getItem("refresh"));
                    return new Promise(function (resolve) {
                        _this._http.get('http://localhost:58056/api/test', { headers: headers }).subscribe(function (data) {
                            alert(JSON.stringify(data.json()));
                        });
                    });
                };
                AppComponent.prototype.Logout = function () {
                    console.log("Do logout logic");
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app/app.component.html',
                        directives: [router_deprecated_1.ROUTER_DIRECTIVES],
                        providers: [
                            router_deprecated_1.ROUTER_PROVIDERS,
                            angular2_jwt_1.AUTH_PROVIDERS,
                            angular2_jwt_1.JwtHelper
                        ]
                    }),
                    router_deprecated_1.RouteConfig([
                        { path: '/login', name: 'Login', component: authorize_component_1.authorizeComponent },
                        { path: '/dashboard', name: 'Dashboard', component: user_component_1.userComponent }
                    ]), 
                    __metadata('design:paramtypes', [angular2_jwt_1.JwtHelper, http_1.Http, router_deprecated_2.Router])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map
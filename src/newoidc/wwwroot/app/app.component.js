System.register(['@angular/core', '@angular/router-deprecated', './forbidden/forbidden.component', './unauthorized/unauthorized.component', './services/SecurityService', './securefile/securefiles.component', '@angular/http', './dataeventrecords/dataeventrecords.component', './dataeventrecords/DataEventRecordsService', 'angular2-jwt'], function(exports_1, context_1) {
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
    var core_1, router_deprecated_1, forbidden_component_1, unauthorized_component_1, SecurityService_1, securefiles_component_1, http_1, dataeventrecords_component_1, DataEventRecordsService_1, angular2_jwt_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (forbidden_component_1_1) {
                forbidden_component_1 = forbidden_component_1_1;
            },
            function (unauthorized_component_1_1) {
                unauthorized_component_1 = unauthorized_component_1_1;
            },
            function (SecurityService_1_1) {
                SecurityService_1 = SecurityService_1_1;
            },
            function (securefiles_component_1_1) {
                securefiles_component_1 = securefiles_component_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (dataeventrecords_component_1_1) {
                dataeventrecords_component_1 = dataeventrecords_component_1_1;
            },
            function (DataEventRecordsService_1_1) {
                DataEventRecordsService_1 = DataEventRecordsService_1_1;
            },
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(securityService, jwtHelper, _http) {
                    this.securityService = securityService;
                    this.jwtHelper = jwtHelper;
                    this._http = _http;
                    this.token = "";
                    this.detoken = "";
                    this.storage = localStorage;
                }
                AppComponent.prototype.ngOnInit = function () {
                    console.log("ngOnInit _securityService.AuthorizedCallback");
                    if (window.location.hash) {
                        this.securityService.AuthorizedCallback();
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
                AppComponent.prototype.store = function (key, value) {
                    this.storage.setItem(key, JSON.stringify(value));
                };
                AppComponent.prototype.Logout = function () {
                    console.log("Do logout logic");
                    this.securityService.Logoff();
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app/app.component.html',
                        styleUrls: ['app/app.component.css'],
                        directives: [router_deprecated_1.ROUTER_DIRECTIVES],
                        providers: [
                            router_deprecated_1.ROUTER_PROVIDERS,
                            DataEventRecordsService_1.DataEventRecordsService, angular2_jwt_1.AUTH_PROVIDERS, angular2_jwt_1.JwtHelper
                        ]
                    }),
                    router_deprecated_1.RouteConfig([
                        { path: '/Forbidden', name: 'Forbidden', component: forbidden_component_1.ForbiddenComponent },
                        { path: '/Unauthorized', name: 'Unauthorized', component: unauthorized_component_1.UnauthorizedComponent },
                        { path: '/securefile/securefiles', name: 'SecureFiles', component: securefiles_component_1.SecureFilesComponent },
                        { path: '/dataeventrecords/...', name: 'DataEventRecords', component: dataeventrecords_component_1.DataEventRecordsComponent }
                    ]), 
                    __metadata('design:paramtypes', [SecurityService_1.SecurityService, angular2_jwt_1.JwtHelper, http_1.Http])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map
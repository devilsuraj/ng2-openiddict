System.register(['@angular/core', '@angular/http', 'angular2-jwt', '@angular/router-deprecated', 'ng2-bs3-modal/ng2-bs3-modal'], function(exports_1, context_1) {
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
    var core_1, http_1, angular2_jwt_1, router_deprecated_1, ng2_bs3_modal_1;
    var authorizeComponent, logModel, extprovider, registerModel;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (ng2_bs3_modal_1_1) {
                ng2_bs3_modal_1 = ng2_bs3_modal_1_1;
            }],
        execute: function() {
            authorizeComponent = (function () {
                function authorizeComponent(jwtHelper, _http, _parentRouter) {
                    this.jwtHelper = jwtHelper;
                    this._http = _http;
                    this._parentRouter = _parentRouter;
                    this.token = "";
                    this.detoken = "";
                    this.hodeModel = false;
                }
                authorizeComponent.prototype.mclose = function () {
                    this.modal.close();
                };
                authorizeComponent.prototype.mopen = function () {
                    this.modal.open();
                };
                authorizeComponent.prototype.ngOnInit = function () {
                    if (localStorage.getItem('auth_key')) {
                        this._parentRouter.navigate(['/Dashboard']);
                    }
                    this.model = new logModel();
                    this.rmodel = new registerModel();
                    this.pros = new extprovider();
                    this.logMsg = "Type your credentials.";
                    this.login = true;
                    this.loss = false;
                    this.register = false;
                };
                authorizeComponent.prototype.callLogin = function () {
                    this.login = true;
                    this.register = false;
                    this.loss = false;
                };
                authorizeComponent.prototype.callLoss = function () {
                    this.login = false;
                    this.register = false;
                    this.loss = true;
                };
                authorizeComponent.prototype.callRegister = function () {
                    this.login = false;
                    this.register = true;
                    this.loss = false;
                };
                authorizeComponent.prototype.Login = function () {
                    var _this = this;
                    this.isLoggedin = false;
                    var headers = new http_1.Headers();
                    var creds = "grant_type=password"
                        + "&responseType=token,&scope=offline_access profile email roles" + '&username=' + this.model.username + '&password=' + this.model.password;
                    headers.append('Content-Type', 'application/X-www-form-urlencoded');
                    return new Promise(function (resolve) {
                        _this._http.post('http://localhost:58056/connect/token', creds, { headers: headers }).subscribe(function (data) {
                            if (data.json().access_token) {
                                alert(JSON.stringify(_this.token));
                                _this.token = data.json().access_token;
                                alert(JSON.stringify(_this.jwtHelper.decodeToken(_this.token)));
                                _this.logMsg = "You are logged In Now , Please Wait ....";
                                localStorage.setItem("auth_key", data.json().access_token);
                                _this.isLoggedin = true;
                                _this.mclose();
                                _this._parentRouter.parent.navigate(['/Dashboard']);
                            }
                            else {
                                _this.logMsg = "Invalid username or password";
                            }
                            resolve(_this.isLoggedin);
                        }, function (error) { return _this.logMsg = error.json().error_description; });
                    });
                };
                authorizeComponent.prototype.extLogin = function (provider) {
                    var instance = this;
                    var popup_window = window.open('http://localhost:58056/api/account/externalaccess?provider=Google', '_blank', 'width=500, height=400');
                    setInterval(function () {
                        if (localStorage.getItem('auth_key')) {
                            popup_window.close();
                            instance.mclose();
                            instance._parentRouter.parent.navigate(['/Dashboard']);
                        }
                    }, 3000);
                };
                authorizeComponent.prototype.getapi = function () {
                    var _this = this;
                    this.isLoggedin = false;
                    var headers = new http_1.Headers();
                    headers.append("Authorization", "Bearer " + "CfDJ8D4ST5ObdZdBt5Xa8O7w3OrXIgeVGcDtHrC09JvKkdP7jkJaXrf9ttEL8Eaq33rhBYKs8ZKSboFvtnRcoSroDkzMt34r93Jv9t2PtL3avXprnRwwsWrPEPO73PGCCSeNLotPP+X0knRneiqFhJV994c1ECW2SuEA3RUiQkuC46k1IVsKGLz374BOR7YGNHB6+NpaS4WPmKi7za/m98BzXperOHBuqKgc73tCkRpSPJARAGl/OKQn/LRUf3PaSOIwaQ==");
                    return new Promise(function (resolve) {
                        _this._http.get('http://localhost:58056/api/test', { headers: headers }).subscribe(function (data) {
                            alert(JSON.stringify(data.json()));
                        });
                    });
                };
                authorizeComponent.prototype.getexternals = function () {
                    var _this = this;
                    this.isLoggedin = false;
                    var headers = new http_1.Headers();
                    return new Promise(function (resolve) {
                        _this._http.get('http://localhost:58056/api/Account/externalAccess?returnUrl=%2F&generateState=true').subscribe(function (data) {
                            _this.externals = JSON.stringify(data.json());
                        });
                    });
                };
                authorizeComponent.prototype.Logout = function () {
                    console.log("Do logout logic");
                };
                authorizeComponent.prototype.userRegister = function () {
                    var _this = this;
                    this.isLoggedin = false;
                    var headers = new http_1.Headers();
                    var creds = JSON.stringify(this.rmodel);
                    headers.append('Content-Type', 'application/json');
                    return new Promise(function (resolve) {
                        _this._http.post('http://localhost:58056/api/account/register', creds, { headers: headers }).subscribe(function (data) {
                            if (data.json().Succeeded) {
                                var headerss = new http_1.Headers();
                                var credss = "grant_type=password"
                                    + "&responseType=token,&scope=offline_access profile email roles" + '&username=' + _this.rmodel.Email + '&password=' + _this.rmodel.Password;
                                headerss.append('Content-Type', 'application/X-www-form-urlencoded');
                                return new Promise(function (resolve) {
                                    _this._http.post('http://localhost:58056/connect/token', credss, { headers: headerss }).subscribe(function (data2) {
                                        if (data2.json().access_token) {
                                            _this.token = data2.json().access_token;
                                            _this.logMsg = "You are logged In Now , Please Wait ....";
                                            localStorage.setItem("auth_key", data2.json().access_token);
                                            _this.isLoggedin = true;
                                            _this.mclose();
                                            _this._parentRouter.parent.navigate(['/Dashboard']);
                                        }
                                        else {
                                            _this.logMsg = "Invalid username or password";
                                        }
                                        resolve(_this.isLoggedin);
                                    }, function (error) { return _this.logMsg = error.json().error_description; });
                                });
                            }
                            else {
                                _this.logMsg = data.json().Errors[0].Description;
                            }
                            resolve(_this.isLoggedin);
                        }, function (error) { return _this.logMsg = error.json().Errors[0].Description; });
                    });
                };
                __decorate([
                    core_1.ViewChild('myModal'), 
                    __metadata('design:type', ng2_bs3_modal_1.ModalComponent)
                ], authorizeComponent.prototype, "modal", void 0);
                authorizeComponent = __decorate([
                    core_1.Component({
                        selector: 'authorize',
                        templateUrl: './app/authorize/authorize-component.html',
                        directives: [ng2_bs3_modal_1.MODAL_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [angular2_jwt_1.JwtHelper, http_1.Http, router_deprecated_1.Router])
                ], authorizeComponent);
                return authorizeComponent;
            }());
            exports_1("authorizeComponent", authorizeComponent);
            logModel = (function () {
                function logModel() {
                }
                return logModel;
            }());
            exports_1("logModel", logModel);
            extprovider = (function () {
                function extprovider() {
                }
                return extprovider;
            }());
            exports_1("extprovider", extprovider);
            registerModel = (function () {
                function registerModel() {
                }
                return registerModel;
            }());
            exports_1("registerModel", registerModel);
        }
    }
});
//# sourceMappingURL=authorize-component.js.map
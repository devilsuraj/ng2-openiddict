System.register(['@angular/core', '@angular/http', 'angular2-jwt', '@angular/router-deprecated'], function(exports_1, context_1) {
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
    var core_1, http_1, angular2_jwt_1, router_deprecated_1;
    var extauthorizeComponent;
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
            }],
        execute: function() {
            extauthorizeComponent = (function () {
                function extauthorizeComponent(jwtHelper, _http, _parentRouter) {
                    this.jwtHelper = jwtHelper;
                    this._http = _http;
                    this._parentRouter = _parentRouter;
                    this.token = "";
                    this.detoken = "";
                    this.hodeModel = false;
                }
                extauthorizeComponent.prototype.ngOnInit = function () {
                    this.getapi();
                };
                extauthorizeComponent.prototype.getapi = function () {
                    var _this = this;
                    this.isLoggedin = false;
                    var headers = new http_1.Headers();
                    return new Promise(function (resolve) {
                        _this._http.get('http://localhost:58056/api/test2').subscribe(function (data) {
                            localStorage.setItem("authorizationData", data.json());
                            localStorage.setItem("auth_key", data.json());
                            window.close();
                        });
                    });
                };
                extauthorizeComponent = __decorate([
                    core_1.Component({
                        selector: 'authorize',
                        template: 'Successfully authorized',
                        directives: []
                    }), 
                    __metadata('design:paramtypes', [angular2_jwt_1.JwtHelper, http_1.Http, router_deprecated_1.Router])
                ], extauthorizeComponent);
                return extauthorizeComponent;
            }());
            exports_1("extauthorizeComponent", extauthorizeComponent);
        }
    }
});
//# sourceMappingURL=externalauth.js.map
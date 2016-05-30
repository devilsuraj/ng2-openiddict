System.register(['@angular/core', 'angular2-jwt', '@angular/http', '@angular/router-deprecated'], function(exports_1, context_1) {
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
    var core_1, angular2_jwt_1, http_1, router_deprecated_1;
    var userComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            }],
        execute: function() {
            userComponent = (function () {
                function userComponent(jwtHelper, _http, _parentRouter) {
                    this.jwtHelper = jwtHelper;
                    this._http = _http;
                    this._parentRouter = _parentRouter;
                    this.payload = "loading ...";
                }
                userComponent.prototype.ngOnInit = function () {
                    this.getapi();
                };
                userComponent.prototype.getapi = function () {
                    var _this = this;
                    var headers = new http_1.Headers();
                    headers.append("Authorization", "Bearer " + localStorage.getItem("authorizationData"));
                    return new Promise(function (resolve) {
                        _this._http.get('http://localhost:58056/api/test', { headers: headers }).subscribe(function (data) {
                            _this.payload = JSON.stringify(data.json());
                        });
                    });
                };
                userComponent.prototype.Logout = function () {
                    localStorage.removeItem("auth_key");
                    this._parentRouter.parent.navigate(['/Default']);
                };
                userComponent = __decorate([
                    core_1.Component({
                        selector: 'authorize',
                        template: "<h1>You are logged in</h1> <h3>{{payload}}</h3><hr/>\n<button (click)='Logout()' class='btn btn-large'>Logout</button>\n",
                        providers: [angular2_jwt_1.JwtHelper]
                    }), 
                    __metadata('design:paramtypes', [angular2_jwt_1.JwtHelper, http_1.Http, router_deprecated_1.Router])
                ], userComponent);
                return userComponent;
            }());
            exports_1("userComponent", userComponent);
        }
    }
});
//# sourceMappingURL=user-component.js.map
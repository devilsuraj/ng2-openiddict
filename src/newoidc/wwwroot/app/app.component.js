System.register(['@angular/core', '@angular/router-deprecated', '@angular/http', 'angular2-jwt', './authorize/authorize-component', './User/user-component', './welcome-component', './authorize/externalauth'], function(exports_1, context_1) {
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
    var core_1, router_deprecated_1, http_1, angular2_jwt_1, authorize_component_1, user_component_1, welcome_component_1, externalauth_1, router_deprecated_2;
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
            },
            function (welcome_component_1_1) {
                welcome_component_1 = welcome_component_1_1;
            },
            function (externalauth_1_1) {
                externalauth_1 = externalauth_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(jwtHelper, _http, _parentRouter) {
                    this.jwtHelper = jwtHelper;
                    this._http = _http;
                    this._parentRouter = _parentRouter;
                }
                AppComponent.prototype.authcheck = function () {
                    if (!localStorage.getItem('auth_key')) {
                        this._parentRouter.navigate(['/Login']);
                    }
                    else {
                        this._parentRouter.navigate(['/Dashboard']);
                    }
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
                        { path: '/', name: 'Default', component: welcome_component_1.welcome, useAsDefault: true },
                        { path: '/login', name: 'Login', component: authorize_component_1.authorizeComponent },
                        { path: '/dashboard', name: 'Dashboard', component: user_component_1.userComponent },
                        { path: '/extauth', name: 'Extauth', component: externalauth_1.extauthorizeComponent }
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
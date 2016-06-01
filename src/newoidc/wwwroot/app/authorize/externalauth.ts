import {Component } from '@angular/core'

import {JwtHelper} from 'angular2-jwt'

declare var System;
@Component({
    selector: 'authorize',
    template: 'Successfully authorized',
    directives: []
})

export class extauthorizeComponent {
    constructor(public jwtHelper: JwtHelper) {
        var x =  location.hash;
       // alert(x);
        x.replace("#id_token=", "");
        localStorage.setItem("auth_key", x);
       // alert(JSON.stringify(this.jwtHelper.decodeToken(x)));
       // window.close();
    }
   
   
   


   

   

};
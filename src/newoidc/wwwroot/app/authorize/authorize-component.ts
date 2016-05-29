import {Component} from '@angular/core'
declare var System;
@Component({
    selector: 'authorize',
    templateUrl:'./app/authorize/authorize-component.html'
})
export class authorizeComponent{
    constructor() {
        System.import('/js/site.js');
    }
}
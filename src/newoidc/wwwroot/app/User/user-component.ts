import {Component} from '@angular/core'
declare var System;
@Component({
    selector: 'authorize',
    template: '<h1>You are logged in</h1>'
})
export class userComponent {
    constructor() {
        System.import('/js/site.js');
    }
}
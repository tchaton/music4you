import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'music4you',
  template: `
    <a [routerLink]="['/login']">Login</a>
    <a [routerLink]="['/listen']">listen</a>
    <router-outlet></router-outlet>
  `,
  directives: [ROUTER_DIRECTIVES],
})
export class AppComponent {
}
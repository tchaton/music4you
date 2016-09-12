import { Component , OnInit} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { window } from '@angular/platform-browser/src/facade/browser';
import {AlbumsComponent} from "./albums.component";
import {Http, HTTP_BINDINGS, Response,Headers} from '@angular/http';

@Component({
  selector: 'music4you',
  template: `
<div class="container">
    <div id="sidebar">
            <ul class="sidebar-nav">
              <li>
              <a [routerLink]="['/login']" routerLinkActive="active">Login</a>
              </li>
              <li>
                  <a [routerLink]="['/listen']" routerLinkActive="active">listen</a>
              </li>
            </ul>
    </div>
    <div id='view'>
    <router-outlet></router-outlet>
  </div>
</div>

  `,
  directives: [ROUTER_DIRECTIVES,AlbumsComponent],
  styleUrls:  ['app/app.component.css']
})
export class AppComponent implements ngOnInit {

ngOnInit () {

}
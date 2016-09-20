import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { window } from '@angular/platform-browser/src/facade/browser';
import {AlbumsComponent} from "./albums.component";
import {Http, HTTP_BINDINGS, Response,Headers} from '@angular/http';

@Component({
  selector: 'music4you',
  template: `
<div class="container">
    <div [class.sidebar]="istoglled" [class.sidebar2]="!istoglled">
            <img class="toggleButton menu"(click)='toggle()' [hidden]='!istoglled' src='./app/images/menu.png'>
            <ul [class.sidebar-nav]="istoglled" [class.sidebar-nav2]="!istoglled" [hidden]="!istoglled">
            
              <li>
              <a [routerLink]="['/login']" class="routerLinkLogin" routerLinkActive="active">  Login</a>
              </li>
              <li>
                  <a [routerLink]="['/listen']" class="routerLinkListen" routerLinkActive="active">  Listen</a>
              </li>
            </ul>
    </div>
    <div id='view'>
      <img class="menu2" (click)='toggle()' [hidden]='istoglled' src='./app/images/menu.png'>
      <router-outlet ></router-outlet>
  </div>
</div>

  `,
  directives: [ROUTER_DIRECTIVES,AlbumsComponent],
  styleUrls:  ['app/app.component.css'],
})
export class AppComponent {
  istoglled:boolean=true;
  contrustor(){
  }
  toggle(){
    console.log(this.istoglled)
    this.istoglled=!this.istoglled;
  }

}
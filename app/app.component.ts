import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'music4you',
  template: `
    <div id="wrapper">
        <div id="sidebar-wrapper">
            <ul class="sidebar-nav">
                <li>
				    <a [routerLink]="['/login']" routerLinkActive="active">Login</a>
				</li>
				<li>
				    <a [routerLink]="['/listen']" routerLinkActive="active">listen</a>
				</li>

            </ul>
        </div>
    </div>
    <div id='view'>
		<router-outlet></router-outlet>
	</div>
  `,
  directives: [ROUTER_DIRECTIVES],
  styleUrls:  ['app/app.component.css']
})
export class AppComponent {
}
import { provideRouter, RouterConfig }  from '@angular/router';
import { LoginComponent } from './login.component';
import { ListenComponent } from './listen.component';

const routes: RouterConfig = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'listen',
    component: ListenComponent
  }
];

export const appRouterProviders = [
  provideRouter(routes)
];
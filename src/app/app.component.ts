import { Component } from '@angular/core';

import { LoginComponent } from './auth/login/login.component';
import { LoginRComponent } from './auth/login-r/login-r.component';
import { SignupComponent } from "./auth/signup/signup.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [LoginComponent, LoginRComponent, SignupComponent],
})
export class AppComponent {}

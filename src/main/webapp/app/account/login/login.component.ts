import { Component, Renderer, ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { JhiEventManager } from 'ng-jhipster';

import { LoginService } from 'app/core/login/login.service';
import { StateStorageService } from 'app/core/auth/state-storage.service';

@Component({
  selector: 'jhi-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  authenticationError: boolean;

  loginForm = this.fb.group({
    username: [''],
    password: [''],
    rememberMe: [false]
  });


  constructor(
    private eventManager: JhiEventManager,
    private loginService: LoginService,
    private stateStorageService: StateStorageService,
    private elementRef: ElementRef,
    private renderer: Renderer,
    private router: Router,
    private fb: FormBuilder
  ) {
  }

  cancel() {
    this.authenticationError = false;
    this.loginForm.patchValue({
      username: '',
      password: ''
    });
  }

  login() {
    this.loginService
      .login({
        username: this.loginForm.get('username').value,
        password: this.loginForm.get('password').value,
        rememberMe: this.loginForm.get('rememberMe').value
      })
      .then(() => {
        this.authenticationError = false;
        if (
          this.router.url === '/account/register' ||
          this.router.url.startsWith('/account/activate/') ||
          this.router.url.startsWith('/account/reset/')
        ) {
          this.router.navigate(['']);
        }

        this.eventManager.broadcast({
          name: 'authenticationSuccess',
          content: 'Sending Authentication Success'
        });

        // previousState was set in the authExpiredInterceptor before being redirected to login modal.
        // since login is successful, go to stored previousState and clear previousState
        const redirect = this.stateStorageService.getUrl();
        if (redirect) {
          this.stateStorageService.storeUrl(null);
          this.router.navigateByUrl(redirect);
        } else {
          this.router.navigate(['']);
        }
      })
      .catch(() => {
        this.authenticationError = true;
      });
  }

  register() {
    this.router.navigate(['/account/register']);
  }

  requestResetPassword() {
    this.router.navigate(['/account/reset', 'request']);
  }
}

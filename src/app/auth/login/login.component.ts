import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(private _formBuilder: FormBuilder, private _adminApiService: AdminApiService, private _router: Router) {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get formControl() {
    return this.loginForm.controls;
  }

  onLogin() {

    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value
      this._adminApiService.login(email, password).subscribe(
        (Response) => {
          console.log('login Successful', Response)
          localStorage.setItem("jwtToken", Response.token)
          localStorage.setItem("user", JSON.stringify(Response.userData));
          this._router.navigate(['/admin/user'])
        },
        (error) => {
          console.error('Login failed', error);
          this.errorMessage = 'Invalid email or password';
        }
      );
    }
  }

}

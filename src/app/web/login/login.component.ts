import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonMethodService } from 'src/app/core/services/common-method.service';
import { FormValidationService } from 'src/app/core/services/form-validation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm!: FormGroup;
  constructor(private commonMethodService: CommonMethodService, private fb: FormBuilder,
    public validation: FormValidationService, private service: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.captcha();
    this.controlLoginForm();
  }

  captcha() {
    this.commonMethodService.createCaptchaCarrerPage();
  }

  controlLoginForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      captcha: ['']
    })
  }

  clearForm() {
    this.loginForm.reset();
    this.controlLoginForm();
  }

  onClickLogin() {
    let userId = this.loginForm.value.username;
    let userPassword = this.loginForm.value.password;
    if (this.loginForm.invalid) {
      this.commonMethodService.matSnackBar('Please Enter Required Credentials', 1);
      return;
    }
    else {
      if (this.loginForm.value.captcha == this.commonMethodService.checkvalidateCaptcha()) {
        this.service.setHttp('get', 'whizhack_cms/login/CheckLogin/' + userId + '/' + userPassword, false, false, false, 'whizhackService');
        this.service.getHttp().subscribe({
          next: (res: any) => {
            if (res.statusCode == '200') {
              sessionStorage.setItem('loggedIn', 'true');
              localStorage.setItem('loggedInData',JSON.stringify(res));
              this.clearForm();
              this.router.navigate(['/dashboard']);
              this.commonMethodService.matSnackBar(res.statusMessage, 0)
              console.log(this.loginForm.value);
            }
            else{
              this.commonMethodService.matSnackBar(res.statusMessage,1)
            }
          }
        })
      }
      else {
        this.commonMethodService.matSnackBar('Invalid Captcha !', 1)
      }
    }
  }
}

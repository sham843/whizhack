import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
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
  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective
  get f() { return this.loginForm.controls }
  constructor(private commonMethodService: CommonMethodService, private fb: FormBuilder,
    public validation: FormValidationService, private service: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.controlLoginForm();
    this.captcha();
  }

  captcha() {
    this.loginForm.controls['captcha'].setValue('');
    this.commonMethodService.createCaptchaCarrerPage();
  }

  controlLoginForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      captcha: ['',Validators.required]
    })
  }

  clearForm() {
    this.controlLoginForm();
  }

  onClickLogin(formDirective?:any) {
    let userId = this.loginForm.value.username;
    let userPassword = this.loginForm.value.password;
    if (this.loginForm.invalid) {
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
              this.router.navigate(['/dashboard']);
              formDirective.resetForm();
              this.clearForm();
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

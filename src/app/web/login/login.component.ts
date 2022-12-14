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
  validationUsernameFlag:boolean = false;
  validationPasswordFlag:boolean = false;
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
      username: ['',[ Validators.required, Validators.maxLength(50)]],
      password: ['',[ Validators.required,Validators.minLength(8),Validators.maxLength(20)]],
      captcha: ['',Validators.required]
    })
  }

  clearForm() {
    this.controlLoginForm();
  }

  clearSpace(){
    let replaceName=this.loginForm.value.username.replace(/\s/g, "");
    this.loginForm.controls['username'].setValue(replaceName);
   }

  onClickLogin(formDirective?:any) {
    // console.log(this.loginForm.controls['username'].status);
    // return;
    
    let loginObj = {
      userName : this.loginForm.value.username,
      password : this.loginForm.value.password
    }
    if (this.loginForm.invalid) {
      return;
    }
    else {
      if (this.loginForm.value.captcha == this.commonMethodService.checkvalidateCaptcha()) {
        this.service.setHttp('post', 'whizhack_cms/login/CheckLogin', false, loginObj, false, 'whizhackService');
        this.service.getHttp().subscribe({
          next: (res: any) => {
            if (res.statusCode == '200') {
              sessionStorage.setItem('loggedIn', 'true');
              localStorage.setItem('loggedInData',JSON.stringify(res));
              this.router.navigate(['/dashboard']);
              formDirective.resetForm();
              this.clearForm();
              this.commonMethodService.matSnackBar(res.statusMessage, 0)
            }
            else{ 
              this.commonMethodService.matSnackBar(res.statusMessage,1)
              this.captcha();
              if(res.statusMessage == 'Please Enter Valid Username')
              {
                this.validationUsernameFlag = true;
                this.validationPasswordFlag = false;
              }else if(res.statusMessage == 'Please Enter Valid Password'){
                this.validationPasswordFlag = true;
                this.validationUsernameFlag = false;
              }
            }
          }
        })
      }
      else {
        this.captcha();
        this.commonMethodService.matSnackBar('Invalid Captcha !', 1)
      }
    }
  }

  fn(){
    this.validationUsernameFlag = false;
    this.validationPasswordFlag = false;
  }
}

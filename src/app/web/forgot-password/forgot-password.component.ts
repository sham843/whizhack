import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonMethodService } from 'src/app/core/services/common-method.service';
import { FormValidationService } from 'src/app/core/services/form-validation.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  hide = true;
  hide1 = true;

  userId: number = 0;
  userName: string = '';
  otpStatus: boolean = false;
  emailVerifyForm!: FormGroup;
  otpVerifyForm!: FormGroup;
  passwordForm!: FormGroup;
  verifyOTPField: boolean = false;
  passwordField: boolean = false;
  emailField: boolean = true;
  timeLeft: number = 60;
  interval: any;
  emailId:any;
  obj = {
    "createdBy": 0,
    "modifiedBy": 0,
    "createdDate": "2022-11-25T13:13:30.972Z",
    "modifiedDate": "2022-11-25T13:13:30.972Z",
    "isDeleted": false,
    "id": 0,
    "mobileNo": "",
    "emailId": "",
    "otp": "",
    "pageName": "",
    "otpExpireDate": "2022-11-25T13:13:30.972Z",
    "isUser": true
  }
  stringOtp: string = '';
  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;
  constructor(private fb: FormBuilder, private api: ApiService,
    public validations: FormValidationService, private common: CommonMethodService,
    private router:Router) { }

  ngOnInit(): void {
    this.defaultForm();
  }

  defaultForm() {
    this.emailVerifyForm = this.fb.group({
      "mobile": [""],
      "email": ["", [Validators.required, Validators.pattern(this.validations.valEmailId)]],
    })
    this.otpVerifyForm = this.fb.group({
      "digitOne": ["", Validators.required],
      "digitTwo": ["", Validators.required],
      "digitThree": ["", Validators.required],
      "digitFour": ["", Validators.required],
      "digitFive": ["", Validators.required],
    })
    this.passwordForm = this.fb.group({
      "passwordNew": ["", [Validators.required, Validators.pattern(this.validations.valPassword)]],
      "retypePassword": ["", [Validators.required, Validators.pattern(this.validations.valPassword)]]
    })
  }

  get fe() { return this.emailVerifyForm.controls };
  get fo() { return this.otpVerifyForm.controls };
  get fp() { return this.passwordForm.controls };

  clearFormFields() {
    this.fo['digitOne'].setValue(''); this.fo['digitTwo'].setValue(''); this.fo['digitThree'].setValue('');
    this.fo['digitFour'].setValue(''), this.fo['digitFive'].setValue('')
  }

  sendOTP(formDirective?: any) {
    if (this.emailVerifyForm.value.email.invalid) {
      return
    }
    else {
      this.obj.emailId = this.emailVerifyForm.value.email;
      if (this.fe['email'].valid) {
        this.api.setHttp('post', 'whizhack_cms/login/AddOTP', false, this.obj, false, 'whizhackService');
        this.api.getHttp().subscribe({
          next: (res: any) => {
            if (res.statusCode == 200) {
              this.common.matSnackBar(res.statusMessage, 0);
              this.emailId=this.obj.emailId;
              this.verifyOTPField = true; this.emailField = false, this.otpStatus = true;
              this.startTimer();
              // formDirective.resetForm();
            }
            else {
              this.common.matSnackBar(res.statusMessage, 1);
              formDirective.resetForm();
            }
          }
        })
      }
    }
  }
  verifyOTP(formDirective:any) {
    if (this.otpVerifyForm.value.digitOne.invalid || this.otpVerifyForm.value.digitTwo.invalid || this.otpVerifyForm.value.digitThree.invalid ||
      this.otpVerifyForm.value.digitFour.invalid || this.otpVerifyForm.value.digitFive.invalid) {
      return
    }
    else {
      let otp = this.otpVerifyForm.value.digitOne + this.otpVerifyForm.value.digitTwo + this.otpVerifyForm.value.digitThree + this.otpVerifyForm.value.digitFour + this.otpVerifyForm.value.digitFive;
      this.obj.otp = otp.toString();
      this.api.setHttp('post', 'whizhack_cms/login/VerifyOTP', false, this.obj, false, 'whizhackService');
      this.api.getHttp().subscribe({
        next: (res: any) => {
          if (res.statusCode == '200') {
            this.common.matSnackBar(res.statusMessage, 0);
            this.passwordField = true; this.startTimer(); this.verifyOTPField = false;
            formDirective.resetForm();
          }
          else {
            this.common.matSnackBar(res.statusMessage, 1);
            this.clearFormFields();
            this.timeLeft = 0;
            formDirective.resetForm();
          }
        }
      })
    }
  }
  startTimer() {
    this.timeLeft = 60;
    const resendOtpInterval = setInterval(() => {
      if (this.timeLeft < 1) {
        clearInterval(resendOtpInterval);
        this.otpStatus = false
      }
      else {
        this.otpStatus = true;
        this.timeLeft = --this.timeLeft
      }
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  getUserName(formDirective:any) {
    this.api.setHttp('get', 'whizhack_cms/login/GetOtpByMobileNo?EmailId=' + this.emailId, false, false, false, 'whizhackService');
    this.api.getHttp().subscribe({
      next: (res: any) => {
        res.statusCode == 200 ? this.userName = res.responseData[0].userName : '';
        this.onSumbit(formDirective);
      }
    })
  }

  onSumbit(formDirective: any) {
    if(this.passwordForm.value.passwordNew != this.passwordForm.value.retypePassword){
      this.common.matSnackBar('new Password And Confirm Password Does Not Match', 1);
      return
    }else{
      let obj = this.passwordForm.value;
        this.api.setHttp('put', 'whizhack_cms/login/ForgotPassword?UserName=' + 'anand@gmail.com' + '&Password=' + 'Admin@123' + '&NewPassword=' + obj.retypePassword + '&EmailId=' + this.emailId, false, false, false, 'whizhackService');
        this.api.getHttp().subscribe({
          next: (res: any) => {
            if(res.statusCode == '200'){
              this.common.matSnackBar(res.statusMessage, 0);formDirective.resetForm();this.verifyOTPField = false;this.passwordField = false;
              this.router.navigate(['../login'])
            }else{
              this.common.matSnackBar(res.statusMessage, 1);
            }
          }
        })
    }
  }
}

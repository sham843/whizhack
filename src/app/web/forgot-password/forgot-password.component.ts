import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  registerForm!: FormGroup;
  displayFields: boolean = false;
  displayFields1: boolean = false;
  displayFields2: boolean = true;

  timeLeft: number = 60;
  interval: any;
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
  constructor(private fb: FormBuilder, private api: ApiService,
    public validations: FormValidationService, private common: CommonMethodService) { }

  ngOnInit(): void {
    this.defaultForm();
    this.startTimer();
  }

  defaultForm() {
    this.registerForm = this.fb.group({
      "mobile": [""],
      "email": ["", [Validators.required, Validators.pattern(this.validations.valEmailId)]],
      "digitOne": ["", Validators.required],
      "digitTwo": ["", Validators.required],
      "digitThree": ["", Validators.required],
      "digitFour": ["", Validators.required],
      "digitFive": ["", Validators.required],
      "passwordNew": ["", [Validators.required, Validators.pattern(this.validations.valPassword)]],
      "retypePassword": ["", [Validators.required, Validators.pattern(this.validations.valPassword)]]
    })
  }

  get fc() { return this.registerForm.controls };

  clearFormFields() {
    this.fc['digitOne'].setValue(''); this.fc['digitTwo'].setValue(''); this.fc['digitThree'].setValue('');
    this.fc['digitFour'].setValue(''), this.fc['digitFive'].setValue('')
  }

  sendOTP() {
    let objj = this.registerForm.value;
    objj.email.length < 1 ? this.common.matSnackBar('Please Enter Email Id', 1) : '';
    this.obj.emailId = objj.email;
    if (this.fc['email'].valid){
      this.api.setHttp('post', 'whizhack_cms/login/AddOTP', false, this.obj, false, 'whizhackService');
    this.api.getHttp().subscribe({
      next: (res: any) => {
        res.statusCode == 200 ? (this.common.matSnackBar(res.statusMessage, 0), this.displayFields = true,this.displayFields2 = false,this.otpStatus = true) : '';
        res.statusCode == 404 ? (this.common.matSnackBar(res.statusMessage, 1) ): '';
      }
    })
  }
}

  verifyOTP() {
    let obj = this.registerForm.value;
    let otp = obj.digitOne + obj.digitTwo + obj.digitThree + obj.digitFour + obj.digitFive;
    this.stringOtp = otp.toString();
    this.obj.otp = this.stringOtp;
    this.timeLeft == 0 ? (this.obj.otp = this.stringOtp = '', this.common.matSnackBar('Please enter Valid OTP', 1)) : '';
    this.fc['digitOne'].invalid ? this.common.matSnackBar('Please enter  OTP', 1) : ''
    if (this.obj.otp) {
      this.api.setHttp('post', 'whizhack_cms/login/VerifyOTP', false, this.obj, false, 'whizhackService');
      this.api.getHttp().subscribe({
        next: (res: any) => {
          res.statusCode == 200 ? this.common.matSnackBar(res.statusMessage, 0) : '';
          res.statusCode == 200 ? (this.displayFields1 = true, this.startTimer(), this.displayFields = false) : false;
          res.statusCode == 409 ? (this.common.matSnackBar(res.statusMessage, 1), this.clearFormFields(), this.pauseTimer()) : '';
        }
      }) 
    }
  }
  startTimer() {
  /*   this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.timeLeft == 0 ? (this.pauseTimer(), this.otpStatus = false) : ''
      } else {
        this.timeLeft = 60;
      }
    }, 1000) */
    this.timeLeft = 60;
    const resendOtpInterval = setInterval(() => {
      if (this.timeLeft < 1) {
        clearInterval(resendOtpInterval);
        this.otpStatus = false
      }
      else {
        this.otpStatus = true;
        this.timeLeft= --this.timeLeft 
      }
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  getUserName() {
    let obj = this.registerForm.value;
    this.api.setHttp('get', 'whizhack_cms/login/GetOtpByMobileNo?EmailId=' + obj.email, false, false, false, 'whizhackService');
    this.api.getHttp().subscribe({
      next: (res: any) => {
        res.statusCode == 200 ? this.userName = res.responseData[0].userName : '';
      }
    })
  }

  onSumbit(clear: any) {
    let obj = this.registerForm.value;
    let otp = obj.digitOne + obj.digitTwo + obj.digitThree + obj.digitFour + obj.digitFive;
    this.stringOtp = otp.toString();
    obj.otp = this.stringOtp;
    obj.passwordNew != obj.retypePassword ? this.common.matSnackBar('Password did not match', 1) : ''
    if (obj.passwordNew == obj.retypePassword) {
      this.getUserName();
      this.api.setHttp('put', 'whizhack_cms/login/ForgotPassword?UserName='+this.userName+'&Password='+obj.newPassword+'&NewPassword='+obj.retypePassword+'&EmailId=' + obj.email, false, false, false, 'whizhackService');
      this.api.getHttp().subscribe({
        next: (res: any) => {
          res.statusCode == 200 ? (this.common.matSnackBar(res.statusMessage, 0), clear.resetForm(), this.displayFields = false, this.displayFields1 = false) : '';
          res.statusCode == 409 ? this.common.matSnackBar(res.statusMessage, 1) : '';
        }
      })
    }
  }
}

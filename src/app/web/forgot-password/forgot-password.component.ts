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
  userId: number = 0;
  userName: string = '';
  otpStatus: boolean = false;
  registerForm!: FormGroup;
  displayFields: boolean = false;
  displayFields1: boolean = false;
  timeLeft: number = 60;
  interval: any;
  obj = {
    "createdBy": 0,
    "modifiedBy": 0,
    "createdDate": "2022-11-23T12:46:11.832Z",
    "modifiedDate": "2022-11-23T12:46:11.832Z",
    "isDeleted": false,
    "id": 0,
    "mobileNo": "",
    "otp": "",
    "pageName": "string",
    "otpExpireDate": "2022-11-23T12:46:11.832Z",
    "isUser": true
  }
  stringOtp: string = '';
  constructor(private fb: FormBuilder, private api: ApiService,
     public validations : FormValidationService, private common : CommonMethodService) { }

  ngOnInit(): void {
    this.defaultForm();
  }

  defaultForm() {
    this.registerForm = this.fb.group({
      "mobile": ["",[Validators.required,Validators.pattern(this.validations.valMobileNo)]],
      "digitOne": ["",Validators.required],
      "digitTwo": ["",Validators.required],
      "digitThree": ["",Validators.required],
      "digitFour": ["",Validators.required],
      "digitFive": ["",Validators.required],
      "passwordNew": ["",[Validators.required,Validators.pattern(this.validations.valPassword)]],
      "retypePassword": ["",[Validators.required,Validators.pattern(this.validations.valPassword)]]
    })
  }

  get fc(){return this.registerForm.controls};

  sendOTP() {
    let objj = this.registerForm.value;
    this.obj.mobileNo = objj.mobile;
    this.api.setHttp('post', 'whizhack_cms/login/AddOTP', false, this.obj, false, 'whizhackService');
    this.api.getHttp().subscribe({
      next: (res: any) => {
        res.statusCode == 200  ? this.common.matSnackBar(res.statusMessage, 0) : '';
        res.statusCode == 404 ?  this.common.matSnackBar(res.statusMessage, 1) : '';
        res.statusCode == 200 ? (this.displayFields = true, this.otpStatus = true) : '';
      }
    })
  }

  verifyOTP() {
    let obj = this.registerForm.value;
    let otp = obj.digitOne + obj.digitTwo + obj.digitThree + obj.digitFour + obj.digitFive;
    this.stringOtp = otp.toString();
    this.obj.otp = this.stringOtp;
    this.timeLeft == 0 ? (this.obj.otp = this.stringOtp = '', this.common.matSnackBar('Please enter Valid OTP',1)):'';
    if (this.obj.otp) {
      this.api.setHttp('post', 'whizhack_cms/login/VerifyOTP', false, this.obj, false, 'whizhackService');
      this.api.getHttp().subscribe({
        next: (res: any) => {
          res.statusCode == 200 || res.statusCode == 409 ? this.common.matSnackBar(res.statusMessage, 0) : '';
          res.statusCode == 200 ? this.displayFields1 = true : false;
        }
      })
      this.getUserName();
      this.startTimer();
    }
  }
  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.timeLeft == 0 ? (this.pauseTimer(), this.otpStatus = false, this.displayFields = true) : ''
      } else {
        this.timeLeft = 60;
      }
    }, 1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  getUserName() {
    let obj = this.registerForm.value;
    this.api.setHttp('get', 'whizhack_cms/login/GetOtpByMobileNo?MobileNo=' + obj.mobile, false, false, false, 'whizhackService');
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

    if (obj.passwordNew == obj.retypePassword) {
      this.api.setHttp('put', 'whizhack_cms/login/ForgotPassword?UserName=' + this.userName + '&Password=' + obj.passwordNew + '&NewPassword=' + obj.retypePassword + '&MobileNo=' + obj.mobile, false, false, false, 'whizhackService');
      this.api.getHttp().subscribe({
        next: (res: any) => {
          res.statusCode == 200  ? (this.common.matSnackBar(res.statusMessage, 0), clear.resetForm(), this.displayFields = false, this.displayFields1 = false) : '';
          res.statusCode == 409 ? this.common.matSnackBar(res.statusMessage, 1) : '';
        }
      })
    }
    
  }
}

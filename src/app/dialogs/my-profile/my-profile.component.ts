import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonMethodService } from 'src/app/core/services/common-method.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { FormValidationService } from 'src/app/core/services/form-validation.service';
import { WebStorageService } from 'src/app/core/services/web-storage.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  profileForm: FormGroup | any;
  userDetailArray: any;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private error: ErrorHandlerService,
    public validation: FormValidationService,
    private commonService: CommonMethodService,
    private webStorageService: WebStorageService
  ) { }

  ngOnInit(): void {
    this.defaultForm();
    this.getUserDetail();
  }

  get f() { return this.profileForm.controls }

  // ----------------------------Start Form Field Here-------------------------------
  defaultForm() {
    this.profileForm = this.fb.group({
      id:[''],
      firstName: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[^\\s0-9\\[\\[`&._@#%*!+,|"\-\'\/\\]\\]{}][a-zA-Z]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[^\\s0-9\\[\\[`&._@#%*!+,|"\-\'\/\\]\\]{}][a-zA-Z]+$')]],
      contactNo: ['', [Validators.required, Validators.pattern('[6-9]\\d{9}')]],
      emailId: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
    });
  }

  getUserDetail() {
    this.apiService.setHttp('get', "whizhack_cms/login/GetById?Id=" + this.webStorageService.getUserId(), false, false, false, 'whizhackService');
    this.apiService.getHttp()?.subscribe({
      next: (res: any) => {
        if (res.statusCode === "200") {
          this.userDetailArray = res.responseData;
          this.patchProfilrData(this.userDetailArray)
        } else {
          this.commonService.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonService.matSnackBar(res.statusMessage, 1);
        }
      },
      error: ((error: any) => { this.error.handelError(error.status) })
    });
  }

  submitForm() {
    if (!this.profileForm.valid) {
      return;
    } else {
      let formData = this.profileForm.value;
      let fullName = formData.firstName.trim().concat(" ", formData.lastName.trim());

      let obj = {
        "createdBy": this.webStorageService.getUserId(),
        "modifiedBy": this.webStorageService.getUserId(),
        "createdDate": new Date(),
        "modifiedDate": new Date(),
        "isDeleted": false,
        "id": formData.id,
        "userTypeId": this.webStorageService.getUserTypeId(),
        "fullName": fullName,
        "mobileNo": formData.contactNo,
        "userName": "",
        "email": formData.emailId,
        "password": ""
      }

      this.apiService.setHttp('put', 'whizhack_cms/login/Update', false, JSON.stringify(obj), false, 'whizhackService');
      this.apiService.getHttp().subscribe({
        next: ((res: any) => {
          if (res.statusCode === '200') {
            this.commonService.matSnackBar(res.statusMessage, 0);
            // this.clearForm();
          } else {
            this.commonService.matSnackBar(res.statusMessage, 1);
          }
        }),
        error: (error: any) => {
          this.error.handelError(error.status);
        }
      })
    }
  }

  clearForm() {
    this.patchProfilrData(this.userDetailArray);
  }

  patchProfilrData(obj: any) {
    this.profileForm.patchValue({
      id:obj?.id,
      UserId: obj?.userTypeId,
      firstName: obj.fullName.split(" ")[0],
      lastName: obj.fullName.split(" ")[1],
      emailId: obj.email,
      contactNo: obj.mobileNo,
    })
  }

}

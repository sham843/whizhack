import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { FormValidationService } from 'src/app/core/services/form-validation.service';
import { CommonMethodService } from 'src/app/core/services/common-method.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-register-now',
  templateUrl: './register-now.component.html',
  styleUrls: ['./register-now.component.css']
})
export class RegisterNowComponent implements OnInit {
  @ViewChild('formDirective')
  private formDirective!: NgForm;
  registerForm!: FormGroup | any;
  courseName:any;
  deviceIpAddress: any;
  deviceDataarray:any;
  address: any
  constructor(
    public dialogRef: MatDialogRef<RegisterNowComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private service: ApiService,
    private errorSer: ErrorHandlerService,
    public validator: FormValidationService,
    private snack: CommonMethodService,
    private http: HttpClient
    ) { }

  ngOnInit(): void {
    this.getFormData();
    this.getDevice();
    this.getdeviceIpAddress();
  }

  //#region  ------------------------------------------------FormData Method Start------------------------------------------------------
  get f() { return this.registerForm.controls }
  getFormData() {
    this.registerForm = this.fb.group({
      "createdBy": 1,
      "modifiedBy": 1,
      "createdDate": new Date(),
      "modifiedDate": new Date(),
      "isDeleted": false,
      "id": 0,
      fullName: ['', [Validators.required, Validators.maxLength(50),Validators.pattern('^[a-zA-Z][a-zA-Z\\s]+$')]],
      email: ['', [Validators.required,Validators.email,Validators.email]],
      mobileNo: ['', [Validators.required,Validators.pattern('(^[0-9\)\(+-\\s]{5,16})*[^\s]$')]],
      // mobileNo: ['', [Validators.required,Validators.pattern('^(\\+\\d{1,3}( )?)?((\\(\\d{3}\\))|\\d{3})[- .]?\\d{3}[- .]?\\d{4}$')]],
      courseId: [this.data.course_Title],
      message: ['', [Validators.required, Validators.maxLength(500)]],
    })
  }
  //#endregion----------------------------------------------FormData Method End---------------------------------------------------------
  getDevice() {
    this.snack.getDeviceInfo()
    this.deviceDataarray =this.snack;
    console.log( this.deviceDataarray.deviceService.browser);
  }
  getdeviceIpAddress() {
    this.http.get("https://api.ipify.org/?format=json").subscribe((res: any) => {
      this.deviceIpAddress = res
      let arr = JSON.stringify(this.deviceIpAddress);
      this.address = arr.slice(7, 22);
    })
  }
  //#region --------------------------------------------------Submit Form Data Method Starts----------------------------------------------
  onSubmit() {
    if (this.registerForm.invalid) {
      return
    } else {
      let obj = this.registerForm.value;
      obj.pageName = this.data.pageName
      obj.courseId = this.data.courseId;
      obj.courseName=this.data.course_Title;
      obj.iP_address=this.address;
      obj.operating_System=this.deviceDataarray.deviceService.os_version;
      obj.browser=this.deviceDataarray.deviceService.browser;
      this.service.setHttp('post', 'whizhack_cms/register/Register', false, obj, false, 'whizhackService');
      this.service.getHttp().subscribe({
        next: ((res: any) => {
          if (res.statusCode == '200') {
            this.snack.matSnackBar(res.statusMessage, 0)
            this.dialogRef.close();
          }
        }), error: (error: any) => {
          this.errorSer.handelError(error.status);
        }
      })
      console.log('post',obj);
    }    
   
    
  }
  //#endregion-------------------------------------------------Submit Form Data Method Ends-----------------------------------------------
  clearForm() {
    this.getFormData();
    this.formDirective && this.formDirective.resetForm();
  }
  clearMobileNo(){
      this.registerForm.value.mobileNo == 0 ?this.registerForm.controls['mobileNo'].setValue(''):'';
  }
}

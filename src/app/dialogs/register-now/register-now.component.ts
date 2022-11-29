import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { FormValidationService } from 'src/app/core/services/form-validation.service';
import { CommonMethodService } from 'src/app/core/services/common-method.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register-now',
  templateUrl: './register-now.component.html',
  styleUrls: ['./register-now.component.css']
})
export class RegisterNowComponent implements OnInit {
  @ViewChild('formDirective')
  private formDirective!: NgForm;
  registerForm!: FormGroup | any;
  constructor(
    public dialogRef: MatDialogRef<RegisterNowComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private service: ApiService,
    private errorSer: ErrorHandlerService,
    public validator: FormValidationService,
    private snack: CommonMethodService,
    private route:Router
    ) { }

  ngOnInit(): void {
    console.log('data',this.data)
    this.getFormData();
  }

  //#region ------------------------------------------------FormData Method Start------------------------------------------------------
  get f() { return this.registerForm.controls }
  getFormData() {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@([a-z0-9.-]+[.])+[a-z]{2,5}$')]],
      mobileNo: ['', [Validators.required, Validators.pattern('[6-9]\\d{9}')]],
      courseId: [this.data.course_Title],
      message: ['', [Validators.required, Validators.maxLength(500)]],
      "createdBy": 1,
      "modifiedBy": 1,
      "createdDate": new Date(),
      "modifiedDate": new Date(),
      "isDeleted": false,
      "id": 0,
    })
  }
  //#endregion----------------------------------------------FormData Method End---------------------------------------------------------

  //#region --------------------------------------------------Submit Form Data Method Starts----------------------------------------------
  onSubmit() {
    if (this.registerForm.invalid) {
      return
    } else {
      let obj = this.registerForm.value;
      obj.pageName = this.route.url.split('/')[1];
      console.log('pgName',obj.pageName);
      obj.courseId = this.data.courseId;
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
    }
  }
  //#endregion-------------------------------------------------Submit Form Data Method Ends-----------------------------------------------
  clearForm() {
    this.getFormData();
    this.formDirective && this.formDirective.resetForm();
  }
}

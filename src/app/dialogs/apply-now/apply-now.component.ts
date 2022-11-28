import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonMethodService } from 'src/app/core/services/common-method.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { FormValidationService } from 'src/app/core/services/form-validation.service';

@Component({
  selector: 'app-apply-now',
  templateUrl: './apply-now.component.html',
  styleUrls: ['./apply-now.component.css']
})
export class ApplyNowComponent implements OnInit {

  postApplayForm:FormGroup | any;
  @ViewChild('fileInput') fileInput!: ElementRef;
  resumePath: any;
  resumeSubmit:boolean = false;
  @ViewChild('formDirective')
  private formDirective!: NgForm;

  constructor(
    public dialogRef: MatDialogRef<ApplyNowComponent>,
    @Inject(MAT_DIALOG_DATA) public resData: any,
    private fb: FormBuilder,
    private service: ApiService,
    private error: ErrorHandlerService,
    public validation: FormValidationService,
    private commonService:CommonMethodService,
    private fileUploadService:FileUploadService,
  ) { }
  
  ngOnInit(): void {
    this.defaultForm();
  }

  get f() { return this.postApplayForm.controls }

    // ----------------------------Start Form Field Here-------------------------------
    defaultForm() {
      this.postApplayForm = this.fb.group({
        firstName: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[^\\s0-9\\[\\[`&._@#%*!+,|"\-\'\/\\]\\]{}][a-zA-Z]+$')]],
        lastName: ['', [Validators.required, Validators.pattern('^[^\\s0-9\\[\\[`&._@#%*!+,|"\-\'\/\\]\\]{}][a-zA-Z]+$')]],
        contactNo: ['', [Validators.required, Validators.pattern('[6-9]\\d{9}')]],
        emailId: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
        resume_Path: ['']
      });
    }

    submitForm() {
      this.resumeSubmit = true;
      if (!this.postApplayForm.valid) {
        return;
      } else if (this.commonService.checkDataType(this.resumePath) == false) {
        return;
      } else {
      let data = this.postApplayForm.value;

      let obj =  {
        "createdBy": 1,
        "modifiedBy": 1,
        "createdDate": new Date(),
        "modifiedDate": new Date(),
        "isDeleted": false,
        "id": 0,
        "jobPostId": this.resData?.id,
        "firstName": data.firstName,
        "lastName": data.lastName,
        "emailId": data.emailId,
        "mobileNo": data.contactNo,
        "resume": this.resumePath,
      }

        this.service.setHttp('post', 'whizhack_cms/jobs/Insertjobs', false, obj, false, 'whizhackService');
        this.service.getHttp().subscribe({
          next: ((res: any) => {
            if (res.statusCode === '200') {
              this.commonService.matSnackBar(res.statusMessage, 0);
              this.dialogRef.close();
              this.clearForm();
            }else{
              this.commonService.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonService.matSnackBar(res.statusMessage, 1);
            }
          }),
          error: (error: any) => {
            this.error.handelError(error.status);
          }
        })
      }
    }

    clearForm() {
      this.formDirective && this.formDirective.resetForm();
      this.defaultForm();
      this.removeDocument();
      this.resumeSubmit = false;
    }

   //................................... Resume Upload code Start Here...............................//

   resumeUpload(event: any) { //Single Image Upload
    let documentUrl: any = this.fileUploadService.uploadMultipleDocument(event, "Resume", "docx,pdf");
    documentUrl.subscribe({
      next: (ele: any) => {
        this.resumePath = ele.responseData;
      },
    })
    this.postApplayForm.controls['resume_Path'].setValue('');
  }

  removeDocument() {
    this.resumePath = '';
    this.fileInput.nativeElement.value = '';
  }

  //................................... Resume Upload code End Here...............................//
}

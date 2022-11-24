import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { FormValidationService } from 'src/app/core/services/form-validation.service';
import { Router } from '@angular/router';
import { CommonMethodService } from 'src/app/core/services/common-method.service';
@Component({
  selector: 'app-register-now',
  templateUrl: './register-now.component.html',
  styleUrls: ['./register-now.component.css']
})
export class RegisterNowComponent implements OnInit {
  registerForm!: FormGroup | any;

  constructor(
    public dialogRef: MatDialogRef<RegisterNowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private service: ApiService,
    private errorSer: ErrorHandlerService,
    public validator: FormValidationService,
    private route: Router,
    private snack:CommonMethodService) { }

  ngOnInit(): void {
    this.getFormData();
    console.log('id',this.data);
    
  }

  get f() { return this.registerForm.controls }

  // Cyber Security Training Program
  getFormData() {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.pattern('^[^\\s0-9\\[\\[`&._@#%*!+"\'\/\\]\\]{}][a-zA-Z.\\s]+$')]],
      email: ['', [Validators.required, Validators.email]],
      mobileNo: ['', [Validators.required, Validators.pattern('[6-9]\\d{9}')]],
      courseId: [this.data == 1 ? 'Cyber Ninja' : this.data == 2 ? 'Cyber Samurai' : this.data == 3 ? 'Cyber Guru' : this.data == 4? 'Cyber Security Training Program' :'Cyber Security Training Program'],
      message: ['', [Validators.required]],
      pageName:['']
    })
  }

  onSubmit() {
    // debugger
    if (this.registerForm.invalid) {
      return
    } else {
      let formData = this.registerForm.value;
      formData.pageName =(this.route.url).split('/')[1];
      console.log('formData.pageName',formData.pageName);
      // formData.courseId = this.data =='Cyber Security Training Program' ? 4 : 5; 
      formData.courseId = this.data == 'Cyber Ninja' ? 1 : formData.courseId = this.data == 'Cyber Samurai' ? 2 : formData.courseId=this.data == 'Cyber Guru' ? 3 : formData.courseId=this.data == 'Cyber Security Training Program' ? 4 : 5;
      console.log('formData.courseId',formData.courseId);
      this.service.setHttp('post', 'whizhack_cms/register/Register', false, formData, false, 'whizhackService');
      console.log('formData.formData',formData);
      this.service.getHttp().subscribe({
        next: ((res: any) => {
          if (res.statusCode == '200') {
            this.snack.matSnackBar(res.statusMessage,0)
            this.dialogRef.close();
          }
        }), error: (error: any) => {
          this.errorSer.handelError(error.status);
          
        }
      })
    }
    
  }

}

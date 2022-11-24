import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { FormValidationService } from 'src/app/core/services/form-validation.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register-now',
  templateUrl: './register-now.component.html',
  styleUrls: ['./register-now.component.css']
})
export class RegisterNowComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<RegisterNowComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder, private service: ApiService,
    private errorSer: ErrorHandlerService,
    public validator: FormValidationService,
    private route: Router) { }

  ngOnInit(): void {
    this.getFormData();
  }


  getFormData() {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@([a-z0-9.-]+[.])+[a-z]{2,5}$')]],
      mobileNo: ['', [Validators.required, Validators.pattern('[7-9]\\d{9}'), Validators.maxLength(10)]],
      courseId: [this.data == 1 ? 'Cyber Ninja' : this.data == 2 ? 'Cyber Samurai' : 'Cyber Guru'],
      message: ['', [Validators.required]],
      pageName:['']
    })
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return
    } else {
      let formData = this.registerForm.value;
      formData.pageName = this.route.url;
      formData.courseId = this.data == 'Cyber Ninja' ? 1 : formData.courseId = this.data == 'Cyber Samurai' ? 2 : 3 ;
      this.service.setHttp('post', 'whizhack_cms/register/Register', false, formData, false, 'whizhackService');
      this.service.getHttp().subscribe({
        next: ((res: any) => {
          if (res.statusCode == '200') {
            console.log('cc',formData);
            this.dialogRef.close();
          }
        }), error: (error: any) => {
          this.errorSer.handelError(error.status);
          
        }
      })
    }
    
  }

  
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { FormValidationService } from 'src/app/core/services/form-validation.service';
@Component({
  selector: 'app-register-now',
  templateUrl: './register-now.component.html',
  styleUrls: ['./register-now.component.css']
})
export class RegisterNowComponent implements OnInit {
  registerForm!: FormGroup;


  constructor(public dialogRef: MatDialogRef<RegisterNowComponent>,
    private fb: FormBuilder, private service: ApiService,
    private errorSer: ErrorHandlerService,
    public validator: FormValidationService) { }

  ngOnInit(): void {
    this.getFormData();
    this.sendCourseData();
  }


  getFormData() {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@([a-z0-9.-]+[.])+[a-z]{2,5}$')]],
      mobileNo: ['', [Validators.required, Validators.pattern('[7-9]\\d{9}'), Validators.maxLength(10)]],
      courseId: 1 ? 'Cyber Ninja' ? 2 : 'Cyber Samurai' ? 3 : 'Cyber Guru' : '',
      message: ['', [Validators.required]],
      "createdBy": 0,
      "modifiedBy": 0,
      "createdDate": new Date(),
      "modifiedDate": new Date(),
      "isDeleted": true,
      "id": 0,
    })
  }

  sendCourseData() {
    let courseId = 1 ? 'Cyber Ninja' ? 2 : 'Cyber Samurai' ? 3 : 'Cyber Guru' : ''
    this.registerForm.controls['courseId'].setValue(courseId)
  }
  onSubmit() {
    if (this.registerForm.invalid) {
      return
    } else {
      let formData = this.registerForm.value;
      this.service.setHttp('post', 'whizhack_cms/register/Register', false, formData, false, 'whizhackService');
      this.service.getHttp().subscribe({
        next: ((res: any) => {
          if (res.statusCode == '200') {
            console.log(res)
            this.dialogRef.close()
          }
        }), error: (error: any) => {
          this.errorSer.handelError(error.status);
        }
      })
    }
  }



}

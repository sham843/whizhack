import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
@Component({
  selector: 'app-register-now',
  templateUrl: './register-now.component.html',
  styleUrls: ['./register-now.component.css']
})
export class RegisterNowComponent implements OnInit {
  registerForm!: FormGroup;
 

  constructor(public dialogRef: MatDialogRef<RegisterNowComponent>, private fb: FormBuilder, private service: ApiService,private errorSer:ErrorHandlerService) { }

  ngOnInit(): void {
    this.getFormData();
    this.sendCourseData();
  }


  getFormData() {
    this.registerForm = this.fb.group({
      fullName: [''],
      email: [''],
      mobileNo: [''],
      courseId: 1 ? 'Cyber Ninja' ? 2 : 'Cyber Samurai' ? 3 : 'Cyber Guru' : '',
      message: [''],
      "createdBy": 0,
      "modifiedBy": 0,
      "createdDate": new Date(),
      "modifiedDate": new Date(),
      "isDeleted": true,
      "id": 0,
    })    
  }

  sendCourseData(){
    let courseId = 1 ? 'Cyber Ninja' ? 2 : 'Cyber Samurai' ? 3 : 'Cyber Guru' : ''
    this.registerForm.controls['courseId'].setValue(courseId)
  }

  onSubmit() {
    if(this.registerForm.invalid){
      return
    }
    let formData = this.registerForm.value;
    // if(formData.courseId == 1){
    //   'Cyber Ninja'
    // }else if(formData.courseId == 2){
    //   'Cyber Samurai'
    // }else{
    //   'Cyber Guru'
    // }
    this.service.setHttp('post', 'whizhack_cms/register/Register', false, formData, false, 'whizhackService');
    this.service.getHttp().subscribe({
      next: ((res: any) => {
        if (res.statusCode == '200' ) {
          console.log(res)
        }
      }),error: (error: any) => {
        this.errorSer.handelError(error.status);
      }
    })
  }

  
}

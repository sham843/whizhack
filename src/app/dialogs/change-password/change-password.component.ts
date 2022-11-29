import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonMethodService } from 'src/app/core/services/common-method.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { FormValidationService } from 'src/app/core/services/form-validation.service';
import { WebStorageService } from 'src/app/core/services/web-storage.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  hide: boolean = true;
  hide1: boolean = true;
  hide2: boolean = true;
  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;
  registerForm!: FormGroup;
  constructor(private fb: FormBuilder,
    private api: ApiService,
    public validations: FormValidationService,
    private common: CommonMethodService,
    private router: Router,
     private errorSer : ErrorHandlerService,
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    private webStorage:WebStorageService) {  dialogRef.disableClose = true;}

  ngOnInit(): void {
    this.defaultForm();
  }
  defaultForm() {
    this.registerForm = this.fb.group({
      currentPassword: ['', [Validators.required, Validators.pattern(this.validations.valPassword)]],
      newPassword: ['', [Validators.required, Validators.pattern(this.validations.valPassword)]],
      retypePassword: ['', [Validators.required, Validators.pattern(this.validations.valPassword)]]
    })
  }

  get fc() { return this.registerForm.controls };

  onSumbit(formDirective: any) {
    if (this.registerForm.invalid) {
      return
    }
    else {
      if(this.registerForm.value.currentPassword == this.registerForm.value.newPassword){
        this.common.matSnackBar("New Password must be different from Current Password.", 1);
        return
      }
      else if (this.registerForm.value.newPassword != this.registerForm.value.retypePassword){
        this.common.matSnackBar('New Password and Confirm Password does not match', 1)
        return
      }
      else{
        let obj = this.registerForm.value;
        this.api.setHttp('get', 'whizhack_cms/login/change-password/' + obj.currentPassword + '?UserId=' +this.webStorage.getUserId()+ '&NewPassword=' + obj.newPassword, false, false, false, 'whizhackService');
        this.api.getHttp().subscribe({
          next: (res: any) => {
            if (res.responseData == 'Password Changed Successfully...') {
              this.common.matSnackBar(res.responseData, 0);
              this.dialogRef.close(); 
              sessionStorage.clear(); localStorage.clear();
              this.router.navigate(['/login']);
              formDirective.resetForm();
            } else {
              this.common.matSnackBar(res.responseData, 1);
              formDirective.resetForm();
            }
          },
          error: (error: any) => {
            this.errorSer.handelError(error.statusMessage)
          }
        })
      }
    }  
  }
  clearFields(formDirective?: any) {
    this.defaultForm();
    formDirective.resetForm();
  }
}

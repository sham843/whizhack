import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonMethodService } from 'src/app/core/services/common-method.service';
import { FormValidationService } from 'src/app/core/services/form-validation.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  hide = true;
  hide1 = true;
  hide2 = true;

  registerForm!: FormGroup;
  constructor(private fb: FormBuilder, private api: ApiService, 
    public validations: FormValidationService, private common : CommonMethodService) { }

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

  
  clearFields(){
    this.fc['newPassword'].setValue('');
    this.fc['retypePassword'].setValue('');
  }


  onCancel(clear: any) {
    clear.resetForm();
  }

  onSumbit() {
    let obj = this.registerForm.value;
    obj.newPassword != obj.retypePassword ? this.common.matSnackBar('Password Did Not Match',1): '';
    if (obj.newPassword == obj.retypePassword && this.registerForm.valid && obj.currentPassword != obj.newPassword) {
      let loginObj = JSON.parse(localStorage.getItem('loggedInData') || '');
      let id = loginObj.responseData[0].id;
      this.api.setHttp('get', 'whizhack_cms/login/change-password/'+obj.currentPassword +'?UserId='+id+'&NewPassword=' + obj.newPassword , false, false, false, 'whizhackService');
      this.api.getHttp().subscribe({
        next: (res: any) => {
          res.responseData =='Password Changed Successfully...'? (this.common.matSnackBar(res.responseData, 0)) : (this.common.matSnackBar(res.responseData, 1), this.clearFields());
        }
      })
    }
    else {
      return;
    }
  }
}

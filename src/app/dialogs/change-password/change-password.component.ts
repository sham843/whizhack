import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/core/services/api.service';
import { FormValidationService } from 'src/app/core/services/form-validation.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  hide = true;
  registerForm!: FormGroup;
  constructor(private fb: FormBuilder, private api: ApiService, private mat: MatSnackBar, private validations: FormValidationService) { }

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

  onCancel(clear: any) {
    clear.resetForm();
  }

  onSumbit(clear: any) {
    let obj = this.registerForm.value;
    if (obj.newPassword == obj.retypePassword && this.registerForm.valid && obj.currentPassword != obj.newPassword) {
      let loginObj = JSON.parse(localStorage.getItem('loggedInData') || '');
      let id = loginObj.responseData[0].id
      this.api.setHttp('get', 'login/change-password/' + obj.currentPassword + '?UserId=' + id + '&NewPassword=' + obj.newPassword, false, false, false, 'whizhackService');
      this.api.getHttp().subscribe({
        next: (res: any) => {
          res.statusCode == 200 || res.statusCode == 409 ? (this.mat.open(res.statusMessage, 'ok', { duration: 2000 })) : '';
          res.statusCode == 200 ? clear.resetForm() : '';
        }
      })
    }
    else {
      return;
    }
  }
}

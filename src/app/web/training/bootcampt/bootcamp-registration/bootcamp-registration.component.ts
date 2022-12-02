import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from 'ngx-editor';
interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-bootcamp-registration',
  templateUrl: './bootcamp-registration.component.html',
  styleUrls: ['./bootcamp-registration.component.css']
})
export class BootcampRegistrationComponent {

  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];
  isLinear = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getpersonal();
  }
  // personal Information Form
  personalInfoForm!: FormGroup;
  get personal(){return this.personalInfoForm.controls;}
  getpersonal() {
    this.personalInfoForm = this.fb.group({
      fullName: ['',[Validators.required]],
      emailId: ['',[Validators.required]],
      dof: ['',[Validators.required]],
      gender: ['',[Validators.required]],
      country: ['',[Validators.required]],
      city: ['',[Validators.required]],
      phoneNo: ['',[Validators.required]]
    })
  }
  personalInfo() {

  }
}

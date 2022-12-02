import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';
import { FormValidationService } from 'src/app/core/services/form-validation.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
@Component({
  selector: 'app-bootcamp-registration',
  templateUrl: './bootcamp-registration.component.html',
  styleUrls: ['./bootcamp-registration.component.css']
})
export class BootcampRegistrationComponent {
  isLinear = false;

  constructor(private fb: FormBuilder, public validator: FormValidationService, private apiService: ApiService,
    private error: ErrorHandlerService) { }

  ngOnInit(): void {
    this.getpersonal();
    this.getQualification();
    this.getExperianceForm();
    this.getProgram();
  }
  //-----------------------------------------------------------personal Information Form------------------------------------------------
  personalInfoForm: FormGroup | any;
  get personal() { return this.personalInfoForm.controls; }
  getpersonal() {
    this.personalInfoForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.pattern('^[a-zA-Z][a-zA-Z\\s]+$')]],
      emailId: ['', [Validators.required, Validators.email]],
      dof: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      phoneNo: ['', [Validators.required]]
    })
  }
  personalInfo() {
    if (this.personalInfoForm.invalid) {
      return
    }
    else{
      console.log(this.personalInfoForm.value)
    }
  }


  //------------------------------------------------------------- Qualification Form----------------------------------------------------------
  qualificationForm!: FormGroup;
  qualificationNameArr = new Array();
  degreeNameArr = new Array();
  get qualification() { return this.qualificationForm.controls }
  // form Control
  getQualification() {
    this.qualificationForm = this.fb.group({
      qualification: ['', [Validators.required]],
      degree: ['', [Validators.required]],
      institude: ['', [Validators.required]],
      passYear: ['', [Validators.required]],
      percentage: ['', [Validators.required]],
    })
    this.getQualificationList();
    this.getDegreeList();
  }
  // get qualification list
  getQualificationList() {
    this.apiService.setHttp('get', 'whizhack_cms/register/getbyQualification', false, false, false, 'whizhackService');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === "200") {
          this.qualificationNameArr = res.responseData;
        }
      }, error: ((error: any) => {
        this.error.handelError(error.status);
      })
    })

  }
  // get degree list
  getDegreeList() {
    this.apiService.setHttp('get', 'whizhack_cms/register/getbyDegree', false, false, false, 'whizhackService');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === "200") {
          this.degreeNameArr = res.responseData;
        }
      }, error: ((error: any) => {
        this.error.handelError(error.status);
      })
    })
  }
  qualificationInfo() {
    {
      // 
    }
  }
  //----------------------------------------------------------------Experiance Form------------------------------------------------------- 
  experianceForm!: FormGroup;
  experianceArray = new Array();
  get experiance() { return this.experianceForm.controls }

  getExperianceForm() {
    this.experianceForm = this.fb.group({
      experianceYr: ['', Validators.required]
    })
    this.experianceYearList();
  }
  experianceYearList() {
    this.apiService.setHttp('get', 'whizhack_cms/register/getbyPercentage', false, false, false, 'whizhackService');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === "200") {
          this.experianceArray = res.responseData;
        }
      }, error: ((error: any) => {
        this.error.handelError(error.status);
      })
    })
  }
  experianceYearInfo() {

  }

  // 
  whyProgram!: FormGroup;
  get program() { return this.whyProgram.controls }
  getProgram() {
    this.whyProgram = this.fb.group({
      Programs: ['', [Validators.required]]
    })
  }
  submitForm() {

  }

}

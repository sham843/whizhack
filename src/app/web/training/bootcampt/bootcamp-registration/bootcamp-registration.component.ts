import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';
import { FormValidationService } from 'src/app/core/services/form-validation.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { CommonMethodService } from 'src/app/core/services/common-method.service';
import { MatStepper } from '@angular/material/stepper';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-bootcamp-registration',
  templateUrl: './bootcamp-registration.component.html',
  styleUrls: ['./bootcamp-registration.component.css']
})
export class BootcampRegistrationComponent {
  isLinear = false;
  registerData: any;
  max = new Date();
  genderValFlag:boolean=false;
  @ViewChild('stepper') myStepper!: MatStepper;
  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;
  constructor(private fb: FormBuilder,
    public validator: FormValidationService,
    private apiService: ApiService,
    private service: ApiService,
    public validation: FormValidationService,
    private commonService: CommonMethodService,
    public dialogRef: MatDialogRef<BootcampRegistrationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
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
      email: ['', [Validators.required, Validators.email,Validators.pattern(this.validation.valEmailId)]],
      date_of_Birth: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      country: ['', [Validators.required, Validators.pattern('^[a-zA-Z][a-zA-Z\\s]+$')]],
      city: ['', [Validators.required, Validators.pattern('^[a-zA-Z][a-zA-Z\\s]+$')]],
      mobileNo: ['', [Validators.required,Validators.maxLength(16),Validators.pattern('(^[0-9\)\(+-\\s]{10,16})*[^\s]$')]]
    })
  }                  
  personalInfo() {
    if (this.personalInfoForm.invalid) {
      this.genderValFlag=true;
      return
    } else {
      this.genderValFlag=false;
      this.myStepper.next();                                                                
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
      instituteName: ['', [Validators.required, Validators.pattern('^[a-zA-Z][a-zA-Z0-9.()\\s]+$')]], 
      year_of_passing: ['', [Validators.required, Validators.pattern('[0-9]{4}')]],
      percentage: [''],
      CGPA: [''],
      remark:['']
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
    if (this.qualificationForm.invalid) {
      return
    } else {
      this.qualificationForm.value.percentage=='0.0%'?this.qualificationForm.controls['percentage'].setValue(0):'';
      this.myStepper.next();
    }
  }
  //----------------------------------------------------------------Experiance Form------------------------------------------------------- 
  experianceForm!: FormGroup;
  experianceArray = new Array();
  get experiance() { return this.experianceForm.controls }

  getExperianceForm() {
    this.experianceForm = this.fb.group({
      total_Experience: ['', Validators.required]
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
    if (this.experianceForm.invalid) {
      return
    } else {
      this.myStepper.next();
    }
  }

  //Reason form 
  whyProgram!: FormGroup;
  get program() { return this.whyProgram.controls }
  getProgram() {
    this.whyProgram = this.fb.group({
      message: ['', [Validators.required]]
    })
  }



  submitForm(formDirective: any) {
    if (this.personalInfoForm.invalid || this.qualificationForm.invalid || this.experianceForm.invalid || this.whyProgram.invalid) {
      return
    } else {
      let perInfoData = this.personalInfoForm.value;
      let qualiData = this.qualificationForm.value;

      let obj = {
        "createdBy": 0,
        "modifiedBy": 0,
        "createdDate": new Date(),
        "modifiedDate": new Date(),
        "isDeleted": false,
        "id": 0,
        "fullName": perInfoData.fullName,
        "email": perInfoData.email,
        "date_of_Birth": perInfoData.date_of_Birth,
        "gender": perInfoData.gender,
        "country": perInfoData.country,
        "city": perInfoData.city,
        "mobileNo": perInfoData.mobileNo,
        "qualification": qualiData.qualification,
        "instituteName": qualiData.instituteName,
        "degree": qualiData.degree,
        "year_of_passing": parseInt(qualiData.year_of_passing),
        "percentage": parseInt(qualiData.percentage),
        "total_Experience": this.experianceForm.value.total_Experience,
        "courseId":this.data?this.data.courseId:0,
        "pageName":this.data?this.data.pageName:'',
        "desc_program": "",
        "iP_address": "",
        "operating_System": "",
        "browser": "",
        "message": this.whyProgram.value.message,
        "flag":this.qualificationForm.value.remark=='percentage'?0:1
      }
      this.service.setHttp('post', 'whizhack_cms/register/Register', false, obj, false, 'whizhackService');
      this.service.getHttp().subscribe({
        next: ((res: any) => {
          if (res.statusCode === '200') {
            this.commonService.matSnackBar(res.statusMessage, 0);
            this.dialogRef.close();
            formDirective.resetForm();
          } else {
            this.commonService.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonService.matSnackBar(res.statusMessage, 1);
          }
        }),
        error: (error: any) => {
          this.error.handelError(error.status);
        }
      })
    }
  }
  cancelForm(formDirective: any) {
    formDirective.resetForm();
  }
  clearData(formDirective: any){
   this.getpersonal();
   formDirective.resetForm();
   this.genderValFlag=false;
  }

  // -------------------------------------------------------percentage validation--------------------------------------------------------
  onSelectPercentage(event:any){
    if(event.value=='CGPA'){
      this.qualificationForm.get('CGPA')?.setValidators([Validators.required,Validators.pattern('^[0-9][.][0-9]\\s?[a-zA-Z]{0,4}?$')]);
      this.qualificationForm.get('CGPA')?.updateValueAndValidity();
      this.qualificationForm.get('percentage')?.clearValidators();
      this.qualificationForm.get('percentage')?.updateValueAndValidity();
      this.qualificationForm.controls['percentage'].setValue('');
    }
    else{
      this.qualificationForm.get('percentage')?.setValidators([Validators.required,Validators.pattern('^[0-9]{1,3}(\\.[0-9]{1,2})?%?$')]);
      this.qualificationForm.get('percentage')?.updateValueAndValidity();
      this.qualificationForm.get('CGPA')?.clearValidators();
      this.qualificationForm.get('CGPA')?.updateValueAndValidity();
      this.qualificationForm.controls['CGPA'].setValue('');
    }
  }
}

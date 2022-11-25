import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Editor, Validators } from 'ngx-editor';
// import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/core/services/api.service';
//  import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { FormValidationService } from 'src/app/core/services/form-validation.service';

@Component({
  selector: 'app-post-new-job',
  templateUrl: './post-new-job.component.html',
  styleUrls: ['./post-new-job.component.css']
})
export class PostNewJobComponent implements OnInit {
  postNewJobFrm!: FormGroup;
  fillterForm!: FormGroup;
  displayedColumns: string[] = ['srNo', 'job_Title', 'job_Location', 'date_of_Posting', 'date_of_Application', 'publish', 'actions'];
  dataSource: any;
  editFlag: boolean = false;
  buttonValue: string = 'Submit';
  pageSize: number = 10;
  currentPage: number = 1;
  totalCount: any;
  @ViewChild(MatSort) sort!: MatSort;
  editorRoles!: Editor;
  editorExperience!: Editor;
  editorQualification!: Editor;
  editorSkills!: Editor;
  
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '10rem',
    minHeight: '5rem',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    toolbarHiddenButtons: [
      [ 'fontName', 'heading', 'fontSize','subscript','link','superscript','justifyLeft',
      'justifyCenter',
      'justifyRight',
      'justifyFull',
      'indent',
      'outdent','heading',
      'fontName','customClasses',
      'link',
      'unlink',
      'insertImage',
      'insertVideo',
      'insertHorizontalRule','textColor',
      'backgroundColor',
    'removeFormat',
  'toggleEditorMode']
    ],
  };
  
  @ViewChild('formDirective')
  private formDirective!: NgForm;
  min = new Date();
  submited:boolean = false;

  constructor(public dialog: MatDialog,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private service: ApiService,
    // private error: ErrorHandlerService,
    public validation: FormValidationService,
    // private ngxSpinner: NgxSpinnerService,
    private dialogRef:MatDialogRef<PostNewJobComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.formData();
    this.editorRoles = new Editor();
    this.editorExperience = new Editor();
    this.editorQualification = new Editor();
    this.editorSkills = new Editor();
  }

  formData() {
    this.data ? this.editFlag = true : ''
    this.postNewJobFrm = this.fb.group({
    createdBy: 0,
    modifiedBy: 0,
    createdDate: new Date(),
    modifiedDate: new Date(),
    isDeleted:false,

    id: this.editFlag ? this.data.jobpostId : 0,
    job_Title: [this.editFlag ? this.data.job_Title : '',Validators.required],
    //   [Validators.required,Validators.pattern('^[^\\s0-9\\[\\[`&._@#%*!+"\'\/\\]\\]{}][a-zA-Z-(),.0-9\\s]+$')]
      job_Location: [this.editFlag ? this.data.job_Location : '',Validators.required],
      // [Validators.required,Validators.pattern('^[^\\s0-9\\[\\[`&._@#%*!+"\'\/\\]\\]{}][a-zA-Z-(),.0-9\\s]+$')]
      // date_of_Posting: [this.editFlag ? this.data.date_of_Posting : ''],
      date_of_Application: [this.editFlag ? this.data.date_of_Application : '', Validators.required],
      job_Description: [this.editFlag ? this.data.job_Description : '', Validators.required],
      roles_and_Responsibility: [this.editFlag ? this.data.roles_and_Responsibility : '', Validators.required],
      qualification: [this.editFlag ? this.data.qualification : '', Validators.required],
      experience: [this.editFlag ? this.data.experience : '', Validators.required],
      skills_Required: [this.editFlag ? this.data.skills_Required : '', Validators.required],
      // publish: false
      publish:[this.editFlag ? true : false]
    });
    // this.editFlag ?  this.buttonValue='Update' : this.buttonValue='Submit';
  }

  
  // "createdBy": 0,
  // "modifiedBy": 0,
  // "createdDate": "2022-11-25T09:19:12.451Z",
  // "modifiedDate": "2022-11-25T09:19:12.451Z",
  // "isDeleted": true,
  // "id": 0,
  // "job_Title": "string",
  // "job_Location": "string",
  // "date_of_Posting": "2022-11-25T09:19:12.451Z",
  // "date_of_Application": "2022-11-25T09:19:12.451Z",
  // "job_Description": "string",
  // "roles_and_Responsibility": "string",
  // "qualification": "string",
  // "experience": "string",
  // "skills_Required": "string",
  // "publish": true

  // onEdit(editObj: any) {
  //   this.editFlag = true;
  //   this.buttonValue = 'Update';
  //   let obj1 = editObj;
  //   this.postNewJobFrm.patchValue({
  //     createdBy: 0,
  //     modifiedBy: 0,
  //     createdDate: new Date(),
  //     modifiedDate: new Date(),
  //     isDeleted: true,
  //     id: obj1.jobpostId,
  //     job_Title: obj1.job_Title,
  //     job_Location: obj1.job_Location,
  //     // date_of_Posting: obj1.date_of_Posting,
  //     date_of_Application: obj1.date_of_Application,
  //     job_Description: obj1.job_Description,
  //     roles_and_Responsibility: obj1.roles_and_Responsibility,
  //     qualification: obj1.qualification,
  //     experience: obj1.experience,
  //     skills_Required: obj1.skills_Required,
  //     publish: true
  //   })
  // }

  get f() { return this.postNewJobFrm.controls }



  onSubmit() {
    this.submited = true;
    if (!this.postNewJobFrm.valid) {
      return;
    } else {
    let data = this.postNewJobFrm.value;
      data.publish = false;
      data.date_of_Posting = new Date();
      this.editFlag ? '' : data.id = 0;
      let url
      this.editFlag ? url = 'whizhack_cms/postjobs/Update' : url = 'whizhack_cms/postjobs/Insert'

      this.service.setHttp(this.editFlag ? 'put' : 'post', url, false, data, false, 'whizhackService');
      this.service.getHttp().subscribe({
        next: ((res: any) => {
          if (res.statusCode === '200') {
           this.snackbar.open(res.statusMessage, 'ok', {
              duration: 2000,
              verticalPosition: 'top',
              horizontalPosition: 'right',
            })
            this.dialogRef.close('Yes');
            // this.bindTable();
            this.clearForm();
            this.buttonValue = 'Submit';
          }
        }),
        error: (error: any) => {
          console.log(error);
        }
      })
    }
  }

  clearForm() {
    this.formDirective && this.formDirective.resetForm();
    this.editFlag = false;
    this.submited = false;
  }
}

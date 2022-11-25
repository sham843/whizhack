import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Editor } from 'ngx-editor';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonMethodService } from 'src/app/core/services/common-method.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { FormValidationService } from 'src/app/core/services/form-validation.service';
import { WebStorageService } from 'src/app/core/services/web-storage.service';

@Component({
  selector: 'app-post-new-job',
  templateUrl: './post-new-job.component.html',
  styleUrls: ['./post-new-job.component.css']
})
export class PostNewJobComponent implements OnInit {
  postNewJobFrm: FormGroup | any;
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
      ['fontName', 'heading', 'fontSize', 'subscript', 'link', 'superscript', 'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull',
        'indent',
        'outdent', 'heading',
        'fontName', 'customClasses',
        'link',
        'unlink',
        'insertImage',
        'insertVideo',
        'insertHorizontalRule', 'textColor',
        'backgroundColor',
        'removeFormat',
        'toggleEditorMode']
    ],
  };

  @ViewChild('formDirective')
  private formDirective!: NgForm;
  min = new Date();
  submited: boolean = false;

  constructor(public dialog: MatDialog,
    private fb: FormBuilder,
    private service: ApiService,
    public validation: FormValidationService,
    private error: ErrorHandlerService,
    private commonService: CommonMethodService,
    private webStorageService: WebStorageService,
    private dialogRef: MatDialogRef<PostNewJobComponent>,
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
      id: [this.editFlag ? this.data.jobpostId : 0],
      job_Title: [this.editFlag ? this.data.job_Title : '', [Validators.required, Validators.pattern('^[^\\s0-9\\[\\[`&._@#%*!+"\'\/\\]\\]{}][a-zA-Z-(),.0-9\\s]+$')]],
      job_Location: [this.editFlag ? this.data.job_Location : '', [Validators.required, Validators.pattern('^[^\\s0-9\\[\\[`&._@#%*!+"\'\/\\]\\]{}][a-zA-Z-(),.0-9\\s]+$')]],
      date_of_Application: [this.editFlag ? this.data.date_of_Application : '', [Validators.required]],
      job_Description: [this.editFlag ? this.data.job_Description : '', [Validators.required]],
      roles_and_Responsibility: [this.editFlag ? this.data.roles_and_Responsibility : '', [Validators.required]],
      qualification: [this.editFlag ? this.data.qualification : '', [Validators.required]],
      experience: [this.editFlag ? this.data.experience : '', [Validators.required]],
      skills_Required: [this.editFlag ? this.data.skills_Required : '', [Validators.required]],
      publish: [this.editFlag ? true : false]
    });
  }

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

      let obj = {
        "createdBy": this.webStorageService.getUserId(),
        "modifiedBy": this.webStorageService.getUserId(),
        "createdDate": new Date(),
        "modifiedDate": new Date(),
        "isDeleted": false,
      }
      let mainData = { ...obj , ...data };
      let url
      this.editFlag ? url = 'whizhack_cms/postjobs/Update' : url = 'whizhack_cms/postjobs/Insert'

      this.service.setHttp(this.editFlag ? 'put' : 'post', url, false, mainData, false, 'whizhackService');
      this.service.getHttp().subscribe({
        next: ((res: any) => {
          if (res.statusCode === '200') {
            this.commonService.matSnackBar(res.statusMessage, 0);
            this.dialogRef.close('Yes');
            this.clearForm();
            this.editFlag = false;
          } else {
            this.commonService.matSnackBar(res.statusMessage, 1);
          }
        }),
        error: (error: any) => {
          this.error.handelError(error.status);
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

import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Editor, Validators } from 'ngx-editor';
import { ApiService } from 'src/app/core/services/api.service';
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
    private snackbar: MatSnackBar,
    private service: ApiService,
    public validation: FormValidationService,
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
      createdBy: 0,
      modifiedBy: 0,
      createdDate: new Date(),
      modifiedDate: new Date(),
      isDeleted: false,

      id: this.editFlag ? this.data.jobpostId : 0,
      job_Title: [this.editFlag ? this.data.job_Title : '', Validators.required],
      //   [Validators.required,Validators.pattern('^[^\\s0-9\\[\\[`&._@#%*!+"\'\/\\]\\]{}][a-zA-Z-(),.0-9\\s]+$')]
      job_Location: [this.editFlag ? this.data.job_Location : '', Validators.required],
      // [Validators.required,Validators.pattern('^[^\\s0-9\\[\\[`&._@#%*!+"\'\/\\]\\]{}][a-zA-Z-(),.0-9\\s]+$')]
      // date_of_Posting: [this.editFlag ? this.data.date_of_Posting : ''],
      date_of_Application: [this.editFlag ? this.data.date_of_Application : '', Validators.required],
      job_Description: [this.editFlag ? this.data.job_Description : '', Validators.required],
      roles_and_Responsibility: [this.editFlag ? this.data.roles_and_Responsibility : '', Validators.required],
      qualification: [this.editFlag ? this.data.qualification : '', Validators.required],
      experience: [this.editFlag ? this.data.experience : '', Validators.required],
      skills_Required: [this.editFlag ? this.data.skills_Required : '', Validators.required],
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

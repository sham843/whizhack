import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Editor } from 'ngx-editor';
import { JobDetailsComponent } from './job-details/job-details.component';
import { FormGroup,NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/core/services/api.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationModalComponent } from 'src/app/dialogs/confirmation-modal/confirmation-modal.component';
import { FormValidationService } from 'src/app/core/services/form-validation.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { PostNewJobComponent } from './post-new-job/post-new-job.component';

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css']
})

export class PostJobComponent implements OnInit {

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
    private snackbar: MatSnackBar,
    private service: ApiService,
    private error: ErrorHandlerService,
    public validation: FormValidationService,
    private ngxSpinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    // this.formData();
    // this. fillterFormData();
    this.bindTable();
    // this.editorRoles = new Editor();
    // this.editorExperience = new Editor();
    // this.editorQualification = new Editor();
    // this.editorSkills = new Editor();
  }

  // ----------------------------Start Form Field Here-------------------------------
  // formData() {
  //   this.postNewJobFrm = this.fb.group({
  //     id: 0,
  //     job_Title: ['', [Validators.required,Validators.pattern('^[^\\s0-9\\[\\[`&._@#%*!+"\'\/\\]\\]{}][a-zA-Z-(),.0-9\\s]+$')]],
  //     job_Location: ['', [Validators.required,Validators.pattern('^[^\\s0-9\\[\\[`&._@#%*!+"\'\/\\]\\]{}][a-zA-Z-(),.0-9\\s]+$')]],
  //     date_of_Posting: [''],
  //     date_of_Application: ['', Validators.required],
  //     job_Description: ['', Validators.required],
  //     roles_and_Responsibility: ['', Validators.required],
  //     qualification: ['', Validators.required],
  //     experience: ['', Validators.required],
  //     skills_Required: ['', Validators.required],
  //     publish: false
  //   });
  // }
  // ----------------------------End Form Field Here-------------------------------

  // get f() { return this.postNewJobFrm.controls }

  //----------------------------Start Bind Table Logic Here--------------------
  bindTable() {
    this.ngxSpinner.show()
    this.service.setHttp('get', 'whizhack_cms/postjobs/GetAllPostJobs?pageno='+ this.currentPage+'&pagesize=10', false, false, false, 'whizhackService');
    this.service.getHttp().subscribe({
      // whizhack_cms/postjobs/GetAllPostJobs?pageno=1&pagesize=10
      next: (res: any) => {
        if (res.statusCode == '200') {
          this.ngxSpinner.hide()
          this.dataSource = new MatTableDataSource(res.responseData.responseData1);
          this.dataSource.sort = this.sort;
          this.totalCount = res.responseData.responseData2.pageCount;
        }
        else {
          this.ngxSpinner.hide();
          this.dataSource = [];
        }
      },
      error: (error: any) => {
        this.ngxSpinner.hide();
      this.error.handelError(error.statusCode);
      }
    })
  }
  //----------------------------End Bind Table Logic Here------------------------

  //----------------------------view logic start Here------------------------
  openDialog1(obj?: any) {
    const dialogRef = this.dialog.open(JobDetailsComponent, {
      height: '80%',
      width: '80%',
      data: obj,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(()=> {
      // console.log(`Dialog result: ${result}`);
    });
  }
  //----------------------------view logic End Here------------------------

  

  //---------------------------------------------------------------------------------
  onClickToggle(element: any) {
    let dialoObj = {
      header: element.publish ? 'isPublish' : 'Publish',
      title: 'Do you want to change the status ?',
      cancelButton: 'Cancel',
      okButton: 'Ok'
    }

    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '300px',
      data: dialoObj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'yes') {
        let isPublishFlag = {
          "id": element.jobpostId,
          "publish": element.publish ? false : true
        }

        this.service.setHttp('put', 'whizhack_cms/postjobs/UpdatePublish', false, isPublishFlag, false, 'whizhackService');
        this.service.getHttp().subscribe({
          next: ((res: any) => {
            if (res.statusCode === '200') {
              this.bindTable();
            }
          }),
          error: (error: any) => {
            console.log(error);
          }
        })
      }
      else {
        this.bindTable();
      }
    });
  }

  //---------------------------Start Delete Logic Here---------------------------------------
  openDeleteDialog(id: any) {
    let dialoObj = {
      title: 'Do you want to delete the selected course ?',
      cancelButton: 'Cancel',
      okButton: 'Ok'
    }

    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '300px',
      data: dialoObj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'yes') {
        this.clearForm();
        let deleteObj = {
          "id": id,
          "modifiedBy": 0,
        }

        this.service.setHttp('delete', 'whizhack_cms/postjobs/Delete', false, deleteObj, false, 'whizhackService');
        this.service.getHttp().subscribe({
          next: ((res: any) => {
            if (res.statusCode === '200') {
              this.bindTable();
            }
          }),
          error: (error: any) => {
            console.log(error);
          }
        })
      }
    });
  }
  // ----------------------------End Delete Logic Here---------------------------
  // ----------------------------Start Delete Logic Here-------------------------
  onDelete(data: any) {
    let obj = {
      id: data.jobpostId,
      modifiedBy: 0
    }
    this.service.setHttp('delete', 'whizhack_cms/postjobs/Delete', false, obj, false, 'whizhackService');
    this.service.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == '200') {
          this.snackbar.open(res.statusMessage, 'ok');
          this.bindTable();
        }
      },
      error: (error: any) => {
        console.log("Error", error);
        this.error.handelError(error.statusCode);
      }
    })

  }
  // ----------------------------End Delete Logic Here-------------------------

  // ----------------------------Start Submit Logic Here-------------------------
  // onSubmit() {
  //   this.submited = true;
  //   if (!this.postNewJobFrm.valid) {
  //     return;
  //   } else {
  //   let data = this.postNewJobFrm.value;
  //     data.publish = false;
  //     data.date_of_Posting = new Date();
  //     this.editFlag ? '' : data.id = 0;
  //     let url
  //     this.editFlag ? url = 'whizhack_cms/postjobs/Update' : url = 'whizhack_cms/postjobs/Insert'

  //     this.service.setHttp(this.editFlag ? 'put' : 'post', url, false, data, false, 'whizhackService');
  //     this.service.getHttp().subscribe({
  //       next: ((res: any) => {
  //         if (res.statusCode === '200') {
  //          this.snackbar.open(res.statusMessage, 'ok', {
  //             duration: 2000,
  //             verticalPosition: 'top',
  //             horizontalPosition: 'right',
  //           })
  //           this.bindTable();
  //           this.clearForm();
  //           this.buttonValue = 'Submit';
  //         }
  //       }),
  //       error: (error: any) => {
  //         console.log(error);
  //       }
  //     })
  //   }
  // }


  // openPostJobDialog() {
  //   const dialogRef = this.dialog.open(PostNewJobComponent, {
  //     width: '90vw',
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }

  openPostJobDialog(obj?: any) {
    const dialogRef = this.dialog.open(PostNewJobComponent, {
      width: '90vw',
      height: '80vw',
      data: obj,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      result == 'Yes' ? this.bindTable() : '';//when we click on * button but not add value then didn't call getTableData()
    });
  }


  //------------------------------------Pagination Logic Start------------------------
  paginationEvent(event: any) {
    // this.clearForm();
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.bindTable();
  }

  clearForm() {
    this.formDirective && this.formDirective.resetForm();
    this.editFlag = false;
    this.submited = false;
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JobDetailsComponent } from './job-details/job-details.component';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationModalComponent } from 'src/app/dialogs/confirmation-modal/confirmation-modal.component';
import { FormValidationService } from 'src/app/core/services/form-validation.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { PostNewJobComponent } from './post-new-job/post-new-job.component';
import { CommonMethodService } from 'src/app/core/services/common-method.service';

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css']
})

export class PostJobComponent implements OnInit {
  displayedColumns: string[] = ['srNo', 'job_Title', 'job_Location', 'date_of_Posting', 'date_of_Application', 'publish', 'actions'];
  dataSource: any;
  editFlag: boolean = false;
  buttonValue: string = 'Submit';
  pageSize: number = 10;
  currentPage: number = 1;
  totalCount: any;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('formDirective')
  private formDirective!: NgForm;
  min = new Date();
  submited: boolean = false;

  constructor(public dialog: MatDialog,
    private service: ApiService,
    private error: ErrorHandlerService,
    public validation: FormValidationService,
    private ngxSpinner: NgxSpinnerService,
    private commonService: CommonMethodService
  ) { }

  ngOnInit(): void {
    this.bindTable();
  }

  //----------------------------Start Bind Table Logic Here--------------------
  bindTable() {
    this.ngxSpinner.show()
    this.service.setHttp('get', 'whizhack_cms/postjobs/GetAllPostJobs?pageno=' + this.currentPage + '&pagesize=10', false, false, false, 'whizhackService');
    this.service.getHttp().subscribe({
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

  //----------------------------View Logic Start Here------------------------
  openDialog1(obj?: any) {
    const dialogRef = this.dialog.open(JobDetailsComponent, {
      // height: '80%',
      width: '60vw',
      data: obj,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(() => {
      // console.log(`Dialog result: ${result}`);
    });
  }
  //----------------------------View Logic End Here------------------------

  //----------------------------Publish Button Logic Start Here--------------
  onClickToggle(element: any) {
    let dialoObj = {
      header: element.publish ? 'Unpublish' : 'Publish',
      title: 'Do you want to change the status ?',
      cancelButton: 'Cancel',
      okButton: 'Ok'
    }

    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '300px',
      data: dialoObj,
      disableClose: true
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
              res.statusMessage == 'Last Date is Greater Than Current Date' ? this.commonService.matSnackBar(res.statusMessage, 1) : this.commonService.matSnackBar(res.statusMessage, 0)
              this.bindTable();
            }
            else {
              this.commonService.matSnackBar(res.statusMessage, 1);
            }
          }),
          error: (error: any) => {
            this.error.handelError(error.status);
          }
        })
      }
      else {
        this.bindTable();
      }
    });
  }
  //----------------------------Publish Button Logic End Here--------------

  //---------------------------Start Delete Logic Here--------------------------
  openDeleteDialog(id: any) {
    let dialoObj = {
      header: 'Delete',
      title: 'Do you want to delete the selected course ?',
      cancelButton: 'Cancel',
      okButton: 'Ok'
    }

    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '300px',
      data: dialoObj,
      disableClose: true
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
              this.commonService.matSnackBar(res.statusMessage, 0);
              this.bindTable();
            }
            else {
              this.commonService.matSnackBar(res.statusMessage, 1);
            }
          }),
          error: (error: any) => {
            this.error.handelError(error.status);
          }
        })
      }
    });
  }
  //----------------------------End Delete Logic Here---------------------------

  //-------------------------Add Button Dialog Box start---------------------------
  openPostJobDialog(obj?: any) {
    const dialogRef = this.dialog.open(PostNewJobComponent, {
      // height:'80%',
      width: '90vw',
      data: obj,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      result == 'Yes' ? this.bindTable() : '';
    });
  }
  //-------------------------Add Button Dialog Box End-----------------------------

  //-----------------------Pagination Logic Start Here---------------------------
  paginationEvent(event: any) {
    // this.clearForm();
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.bindTable();
  }
  //------------------------Pagination Logic End Here------------------------------

  //------------------------Clear Form Logic Start Here----------------------------
  clearForm() {
    this.formDirective && this.formDirective.resetForm();
    this.editFlag = false;
    this.submited = false;
    //------------------------Clear Form Logic End  Here----------------------------
  }
}

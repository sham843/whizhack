import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewEnquiriesComponent } from './view-enquiries/view-enquiries.component';
import { ApiService } from 'src/app/core/services/api.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationModalComponent } from 'src/app/dialogs/confirmation-modal/confirmation-modal.component';
import { CommonMethodService } from 'src/app/core/services/common-method.service';
import { FormControl } from '@angular/forms';
import { filter, debounceTime, distinctUntilChanged } from 'rxjs';
import { FormValidationService } from 'src/app/core/services/form-validation.service';
export interface PeriodicElement {
  srno: number;
  name: string;
  emailid: string;
  contactno: string;
  course: string;
  page: string;
  actions: string;
}

@Component({
  selector: 'app-enquiries',
  templateUrl: './enquiries.component.html',
  styleUrls: ['./enquiries.component.css']
})
export class EnquiriesComponent implements OnInit {

  displayedColumns: string[] = ['srNo', 'fullName', 'email', 'mobileNo', 'courseId', 'pageName', 'actions'];
  dataSource: any;
  totalCount: number = 0;
  currentPage: number = 0;
  getpage: any;
  searchFilter = new FormControl();

  @ViewChild(MatSort) sortheader!: MatSort;
  constructor(public dialog: MatDialog, private service: ApiService,
    public vadations: FormValidationService,
     private errorSer: ErrorHandlerService, private snack: CommonMethodService) { }
  ngOnInit(): void {
    this.getTableData();
  }

  ngAfterViewInit() {
    let formValue = this.searchFilter.valueChanges;
    formValue.pipe(
      filter(() => this.searchFilter.valid),
      debounceTime(1000),
      distinctUntilChanged())
      .subscribe(() => {
        this.currentPage =0;
        this.getTableData();
      })
  }

  clearSearchFilter() {
    this.searchFilter.setValue('');
  }


  // whizhack_cms/register/GetAllByPagination?pageno=1&pagesize=10&searchText=l



  //#region-----------------------------------------------Get Table Data Method Starts------------------------------------------- 
  getTableData() {
    let search = this.searchFilter.value ? this.searchFilter.value.trim() : ''
    this.service.setHttp('get', 'whizhack_cms/register/GetAllByPagination?pageno=' + (this.currentPage + 1) + '&pagesize=10&searchText='+search, false, false, false, 'whizhackService');
    this.service.getHttp().subscribe({
      next: ((res: any) => {
        if (res.statusCode == '200') {
          this.dataSource = new MatTableDataSource(res.responseData.responseData);          
          this.dataSource.sort = this.sortheader;
          this.totalCount = res.responseData.responseData1.pageCount;
        }else{
          this.dataSource = []
        }
      }), error: (error: any) => {
        this.errorSer.handelError(error.status);
      }
    })
  }
  //#endregion--------------------------------------------Get Table Data Method Ends---------------------------------------------

  //#region ----------------------------------------------Open View Enquiries Component Dialogue Box-----------------------------
  openDialog(ele?: any): void {
    this.dialog.open(ViewEnquiriesComponent, {
      data: ele,
      width: '1024px'
    });
  }
  //#endregion--------------------------------------------Open View Enquiries Component Dialogue Box-----------------------------

  //#region-----------------------------------------------Delete Enquiry Data Method---------------------------------------------
  openDeleteDialog(id: any) {
    let dialoObj = {
      title: 'Do you want to delete the selected course ?',
      cancelButton: 'Cancel',
      okButton: 'Delete'
    }
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '300px',
      data: dialoObj
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'yes') {
        let deleteObj = {
          "registerId": id.registerId,
          "modifiedBy": 0
        }
        this.service.setHttp('delete', 'whizhack_cms/register/Delete', false, deleteObj, false, 'whizhackService');
        this.service.getHttp().subscribe({
          next: ((res: any) => {
            if (res.statusCode === '200') {
              this.getTableData();
              this.snack.matSnackBar(res.statusMessage, 0)
            }
          }),
          error: (error: any) => {
            this.errorSer.handelError(error.statusMessage)
          }
        })
      } else {
        this.getTableData();
      }
    });
  }
  //#endregion--------------------------------------------Delete Enquiry Data Method---------------------------------------------

  //#region-----------------------------------------------Get Pagenation Method-------------------------------------------------- 
  pageChanged(event?: any) {
    this.currentPage = event.pageIndex;
    this.getTableData();
  }
}
//#endregion--------------------------------------------Get Pagenation Method--------------------------------------------------




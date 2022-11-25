import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewEnquiriesComponent } from './view-enquiries/view-enquiries.component';
import { ApiService } from 'src/app/core/services/api.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationModalComponent } from 'src/app/dialogs/confirmation-modal/confirmation-modal.component';
// import { Router } from '@angular/router';
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
  @ViewChild(MatSort) sortheader!: MatSort;

  constructor(public dialog: MatDialog, private service: ApiService, private errorSer: ErrorHandlerService) { }
  openDialog(ele?: any): void {
    this.dialog.open(ViewEnquiriesComponent, {
      data: ele,
      width: '1024px'
    });
  }

  ngOnInit(): void {
    this.getTableData();
  }


  getTableData() {
    this.service.setHttp('get', 'whizhack_cms/register/GetAllByPagination?pageno=' + (this.currentPage + 1) + '&pagesize=10', false, false, false, 'whizhackService');
    this.service.getHttp().subscribe({
      next: ((res: any) => {
        if (res.statusCode == '200') {
          this.dataSource = new MatTableDataSource(res.responseData.responseData);
          this.dataSource.sort = this.sortheader;
          this.totalCount = res.responseData.responseData1.pageCount;
        }
      }), error: (error: any) => {
        this.errorSer.handelError(error.status);
      }
    })
  }

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
        let deleteObj = {
          "registerId": id.registerId,
          "modifiedBy": 0
        }
        this.service.setHttp('delete', 'whizhack_cms/register/Delete', false, deleteObj, false, 'whizhackService');
        this.service.getHttp().subscribe({
          next: ((res: any) => {
            if (res.statusCode === '200') {
              this.getTableData();
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

  pageChanged(event?: any) {
    this.currentPage = event.pageIndex;
    this.getTableData();
  }
}




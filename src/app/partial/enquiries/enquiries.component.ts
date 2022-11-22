import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewEnquiriesComponent } from './view-enquiries/view-enquiries.component';
import { ApiService } from 'src/app/core/services/api.service';
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
  dataSource = new Array();
  totalCount!:number;
  currentPage:number=0;
  constructor(public dialog: MatDialog, private service: ApiService,) { }

  openDialog(ele?:any): void {
    this.dialog.open(ViewEnquiriesComponent, {
      data: ele,
      width: '1024px'
    });
  }

  ngOnInit(): void {
    this.getTableData();
  }


  getTableData() {
    this.service.setHttp('get', 'whizhack_cms/register/GetAllByPagination?pageno='+this.currentPage+'&pagesize=10', false, false, false, 'whizhackService');
    this.service.getHttp().subscribe({
      next: ((res: any) => {
        if (res.statusCode == '200') {
          this.dataSource = res.responseData.responseData;
          this.totalCount=res.responseData.responseData1.pageCount;
        }
      }),
    })
  }

  deleteUser(event?: any) {
    let obj;
    obj = {
      "createdBy": 0,
      "modifiedBy": 0,
      "createdDate": "2022-11-22T09:13:43.573Z",
      "modifiedDate": "2022-11-22T09:13:43.573Z",
      "isDeleted": true,
      "id":event.srNo
    }
    this.service.setHttp('put', 'whizhack_cms/register/Delete', false, obj, false, 'whizhackService');
    this.service.getHttp().subscribe({
      next: ((res: any) => {
        if (res.statusCode == '200') {
          console.log('data', this.dataSource);
          this.getTableData();
        }
      }),
    })
  }

 pageChanged(event?:any){
    this.currentPage=event.pageIndex;
    this.getTableData();
  }
}



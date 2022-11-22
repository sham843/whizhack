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
  dataSource=new Array();
  constructor(public dialog: MatDialog, private service: ApiService) { }

  openDialog(): void {
    this.dialog.open(ViewEnquiriesComponent, {
      width: '1024px'
    });
  }

  ngOnInit(): void {
    this.getTableData();
  }


  getTableData() {
    this.service.setHttp('get', 'whizhack_cms/register/GetAllByPagination', false, false, false, 'whizhackService');
    this.service.getHttp().subscribe({
      next: ((res: any) => {
        if (res.statusCode == '200') {
          this.dataSource =res.responseData.responseData;
          console.log('data',this.dataSource);
        }
      }),
    })
  }

  deleteUser(event?:any){
    console.log(event);
  }
}



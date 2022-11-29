import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { RegisterNowComponent } from 'src/app/dialogs/register-now/register-now.component';

@Component({
  selector: 'app-whizteens',
  templateUrl: './whizteens.component.html',
  styleUrls: ['./whizteens.component.css']
})
export class WhizteensComponent implements OnInit {
  getAllCoursesData=new Array();
  whizteenArray=new Array();
  whizteenexclusiveArray=new Array();
  constructor(public dialog: MatDialog,private apiService:ApiService) { }

  openDialog(data: any) {
    const dialogRef = this.dialog.open(RegisterNowComponent, {
      width: '500px',
      disableClose: true,
      data: data
    });
    dialogRef.afterClosed().subscribe({
     
    });
  }

  ngOnInit(): void {
    this.getWhizteenData();
  }
  getWhizteenData() {
    this.apiService.setHttp('get', "whizhack_cms/course/GetAllCourses", false, false, false, 'whizhackService');
    this.apiService.getHttp().subscribe((res:any)=>{
      this.getAllCoursesData=res.responseData;
      this.getAllCoursesData.forEach((ele:any)=>{
        if(ele.pageName=='WhizTeens'){
          ele.exclusive_offer==0?this.whizteenArray.push(ele):this.whizteenexclusiveArray.push(ele);
        }
      })
    })
  }
}

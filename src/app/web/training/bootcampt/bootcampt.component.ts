import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { RegisterNowComponent } from 'src/app/dialogs/register-now/register-now.component';

@Component({
  selector: 'app-bootcampt',
  templateUrl: './bootcampt.component.html',
  styleUrls: ['./bootcampt.component.css']
})
export class BootcamptComponent implements OnInit {
  getAllCoursesData=new Array();
  bootCamptArray=new Array();
  constructor(public dialog: MatDialog,private apiService:ApiService) { }

  openDialog(flag:any) {
    const dialogRef = this.dialog.open(RegisterNowComponent,{
      width: '500px',
      data:flag
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
  }

  ngOnInit(): void {
    this.getAllCourses();
  }
  getAllCourses() {
    this.apiService.setHttp('get', "whizhack_cms/course/GetAllCourses", false, false, false, 'whizhackService');
    this.apiService.getHttp().subscribe((res:any)=>{
      this.getAllCoursesData=res.responseData;
      this.getAllCoursesData.forEach((ele:any)=>{
        if(ele.pageName=='Bootcamp '){
          this.bootCamptArray.push(ele);
        }
      })
    })
    console.log("bootCamptArray",this.bootCamptArray)
  }
}


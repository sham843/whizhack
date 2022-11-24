import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-view-training-schedule',
  templateUrl: './view-training-schedule.component.html',
  styleUrls: ['./view-training-schedule.component.css']
})
export class ViewTrainingScheduleComponent implements OnInit {
 showObj:any
  constructor(
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {    
    this.getCourseById();
  }

  getCourseById(){
    this.api.setHttp('get', 'whizhack_cms/course/GetById?Id='+this.data, false, false, false, 'whizhackService');
    this.api.getHttp().subscribe({
      next: ((res: any) => {
        if (res.statusCode === '200') {
          this.showObj = res.responseData;                    
        }
      }),
      error: (error: any) => {
        console.log(error);
      }
    })

  }

  

}

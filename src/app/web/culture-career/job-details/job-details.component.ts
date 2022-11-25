import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonApiService } from 'src/app/core/services/common-api.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { ApplyNowComponent } from 'src/app/dialogs/apply-now/apply-now.component';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {

  JobPostId:any;
  postJobArray:any;
  allPostJobArray:any;

  constructor(
    public dialog: MatDialog,
    public commonService: CommonApiService,
    private error: ErrorHandlerService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    ) { 
    this.JobPostId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getByIdPostJobs();
    this.getAllPostJob();
  }

  getByIdPostJobs() {
    this.apiService.setHttp('get', 'whizhack_cms/postjobs/GetById?Id=' + this.JobPostId, false, false, false, 'whizhackService');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == '200') {
          this.postJobArray = res.responseData;
        }
        else {
          this.postJobArray = [];
        }
      },
      error: (error: any) => {
      this.error.handelError(error.statusCode);
      }
    })
  }

  getAllPostJob(){
  this.apiService.setHttp('get', 'whizhack_cms/postjobs/GetAllPostJobs?', false, false, false, 'whizhackService');
  this.apiService.getHttp().subscribe({
    next: (res: any) => {
      if (res.statusCode == '200') {
        this.allPostJobArray = res.responseData.responseData;
      }
      else {
        this.allPostJobArray = [];
      }
    },  error: (error: any) => {
      this.error.handelError(error.statusCode);
      }
    })
}

  openDialog(dialoObj:any): void {
    let dialogRef =  this.dialog.open(ApplyNowComponent, {
      width: '700px',
      data: dialoObj
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'yes') {

      }
      else {
        
      }
    });
  }

  

}

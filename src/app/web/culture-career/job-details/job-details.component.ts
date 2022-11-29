import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonMethodService } from 'src/app/core/services/common-method.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { ApplyNowComponent } from 'src/app/dialogs/apply-now/apply-now.component';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {

  JobPostId: any;
  postJobArray: any;
  allPostJobArray: any;

  constructor(
    public dialog: MatDialog,
    public commonService: CommonMethodService,
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
          this.commonService.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonService.matSnackBar(res.statusMessage, 1);
        }
      },
      error: (error: any) => {
        this.error.handelError(error.statusCode);
      }
    })
  }

  getAllPostJob() {
    this.apiService.setHttp('get', 'whizhack_cms/postjobs/GetAllPostJobs', false, false, false, 'whizhackService');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == '200') {
          this.allPostJobArray = res.responseData.responseData;
        }
        else {
          this.allPostJobArray = [];
          this.commonService.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonService.matSnackBar(res.statusMessage, 1);
        }
      }, error: (error: any) => {
        this.error.handelError(error.statusCode);
      }
    })
  }

  openDialog(dialoObj: any): void {
    this.dialog.open(ApplyNowComponent, {
      width: '480px',
      disableClose: true,
      data: dialoObj
    });
  }

}

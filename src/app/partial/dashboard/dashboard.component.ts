import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonMethodService } from 'src/app/core/services/common-method.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboardData!:any;

  constructor(private service: ApiService,private commonMethod: CommonMethodService, private errorHandler: ErrorHandlerService,) {}

  ngOnInit(): void {
    this.displayDashboardData();
  }

  displayDashboardData() {
    this.service.setHttp('get', 'whizhack_cms/Dashboard/getbydashboard', false, false, false, 'whizhackService');
    this.service.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == '200') {
          this.dashboardData = res.responseData;
        }
      }, error: (error: any) => {
        this.commonMethod.checkDataType(error.statusText) == false ? this.errorHandler.handelError(error.statusCode) : this.commonMethod.matSnackBar(error.statusText, 1);
      }
    })
  }
}

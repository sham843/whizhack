import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
@Component({
  selector: 'app-view-enquiries',
  templateUrl: './view-enquiries.component.html',
  styleUrls: ['./view-enquiries.component.css']
})
export class ViewEnquiriesComponent implements OnInit {

  constructor(private errorSer: ErrorHandlerService, private service: ApiService, public dialogRef: MatDialogRef<ViewEnquiriesComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  viewData: any
  deviceDataarray = new Array();
  ipAddress: any;
  ngOnInit(): void {
    this.getDataById();
  }
  //#region ---------------------------------------------------------Get View Data By Id-----------------------------------------------------
  getDataById() {
    this.service.setHttp('get', 'whizhack_cms/register/GetById?id=' + this.data?.registerId, false, false, false, 'whizhackService');
    this.service.getHttp().subscribe({
      next: ((res: any) => {
        if (res.statusCode == '200') {
          this.viewData = res.responseData;
        }
      }), error: (error: any) => {
        this.errorSer.handelError(error.status);
      }
    }) 
  }
  //#endregion ---------------------------------------------------------Get View Data By Id---------------------------------------------------

  //#region------------------------------------------------------------Get Device Information------------------------------------------------
 
  
  //#endregion------------------------------------------------------------Get Device Information------------------------------------------------




}

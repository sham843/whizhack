import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonMethodService } from 'src/app/core/services/common-method.service';
import { ApiService } from 'src/app/core/services/api.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
@Component({
  selector: 'app-view-enquiries',
  templateUrl: './view-enquiries.component.html',
  styleUrls: ['./view-enquiries.component.css']
})
export class ViewEnquiriesComponent implements OnInit {

  constructor(private errorSer:ErrorHandlerService,private service:ApiService,public dialogRef: MatDialogRef<ViewEnquiriesComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private common:CommonMethodService,
  private http:HttpClient) { }
  viewData:any
  deviceDataarray=new Array();
  deviceIpAddress:any;
  ipAddress:any;
  address:any

  ngOnInit(): void {
    this.getDataById();
    this.getDevice();
    this.getdeviceIpAddress();
    console.log('tdata',this.data);
    
  }

  getDataById(){
    this.service.setHttp('get', 'whizhack_cms/register/GetById?id='+this.data.registerId, false, false, false, 'whizhackService');
    this.service.getHttp().subscribe({
      next: ((res: any) => {
        if (res.statusCode == '200') {
         this.viewData=res.responseData;
        }
      }), error: (error: any) => {
        this.errorSer.handelError(error.status);
      }
    })
    
  }


  getDevice() {
   this.common.getDeviceInfo()
    this.deviceDataarray=[this.common]
  }

  getdeviceIpAddress(){
    this.http.get("https://api.ipify.org/?format=json").subscribe((res: any) => {
    this.deviceIpAddress=res 
     let arr=JSON.stringify(this.deviceIpAddress)
     this.address=arr.slice(7,22);
     console.log('addr', this.address);
     
    })   
  }

  



}

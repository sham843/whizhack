import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonMethodService } from 'src/app/core/services/common-method.service';

@Component({
  selector: 'app-view-enquiries',
  templateUrl: './view-enquiries.component.html',
  styleUrls: ['./view-enquiries.component.css']
})
export class ViewEnquiriesComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ViewEnquiriesComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private common:CommonMethodService,
  private http:HttpClient) { }
  newArray = [this.data];
  deviceDataarray=new Array();
  deviceIpAddress:any;
  ipAddress:any;
  address:any

  ngOnInit(): void {
    this.getDevice();
    this.getdeviceIpAddress();
  }


  getDevice() {
   this.common.getDeviceInfo()
    this.deviceDataarray=[this.common]
  }

  getdeviceIpAddress(){
    this.http.get("https://api.ipify.org/?format=json").subscribe((res: any) => {
    this.deviceIpAddress=res 
     let arr=JSON.stringify(this.deviceIpAddress)
     console.log('type',typeof(arr));
     this.address=arr.slice(7,22);
    })   
  }

  



}

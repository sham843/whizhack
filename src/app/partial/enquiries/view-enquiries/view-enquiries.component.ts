import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonMethodService } from 'src/app/core/services/common-method.service';

@Component({
  selector: 'app-view-enquiries',
  templateUrl: './view-enquiries.component.html',
  styleUrls: ['./view-enquiries.component.css']
})
export class ViewEnquiriesComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ViewEnquiriesComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private common: CommonMethodService) { }
  newArray = [this.data];
  deviceDataarray=new Array();

  ngOnInit(): void {
    this.getDevice()
  }


  getDevice() {
   this.common.getDeviceInfo()
    this.deviceDataarray=[this.common]
  }

  



}

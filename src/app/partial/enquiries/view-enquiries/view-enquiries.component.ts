import { Component, Inject, OnInit } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-view-enquiries',
  templateUrl: './view-enquiries.component.html',
  styleUrls: ['./view-enquiries.component.css']
})
export class ViewEnquiriesComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ViewEnquiriesComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  newArray=[this.data]
  ngOnInit(): void {
    console.log('gggg',this.newArray);
  }

}

import { Component,Inject,OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<JobDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  newArray = [this.data];
  ngOnInit(): void {
    //  console.log("data",this.data)
  }

}

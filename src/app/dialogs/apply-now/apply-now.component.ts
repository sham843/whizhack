import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-apply-now',
  templateUrl: './apply-now.component.html',
  styleUrls: ['./apply-now.component.css']
})
export class ApplyNowComponent implements OnInit {



  constructor(
    public dialogRef: MatDialogRef<ApplyNowComponent>,
    @Inject(MAT_DIALOG_DATA) public resData: any
  ) { }
  
  
  ngOnInit(): void {
  }

}

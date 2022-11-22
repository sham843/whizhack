import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// MatDialogRef,
@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any
  // ,private dialogRef:MatDialogRef<JobDetailsComponent>
    ) { }

  ngOnInit(): void {
  }

}

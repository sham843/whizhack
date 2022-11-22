import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-training-schedule',
  templateUrl: './view-training-schedule.component.html',
  styleUrls: ['./view-training-schedule.component.css']
})
export class ViewTrainingScheduleComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    console.log(this.data);    
  }

  

}

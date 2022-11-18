import { Component, OnInit } from '@angular/core';
export interface PeriodicElement {
  srno: number;
  image: string;
  title: string;
  price: number;
  action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {srno: 1, image: '', title: 'Cyber Ninja', price: 124547,action:''},
  {srno: 2, image: '', title: 'Cyber Ninja', price: 124547,action:''},
  {srno: 3, image: '', title: 'Cyber Ninja', price: 124547,action:''},
  {srno: 4, image: '', title: 'Cyber Ninja', price: 124547,action:''},
  {srno: 5, image: '', title: 'Cyber Ninja', price: 124547,action:''},
  {srno: 6, image: '', title: 'Cyber Ninja', price: 124547,action:''},
  {srno: 7, image: '', title: 'Cyber Ninja', price: 124547,action:''},
  {srno: 8, image: '', title: 'Cyber Ninja', price: 124547,action:''},
  {srno: 9, image: '', title: 'Cyber Ninja', price: 124547,action:''},
  {srno: 10, image: '', title: 'Cyber Ninja', price: 124547,action:''},
];
@Component({
  selector: 'app-training-schedule',
  templateUrl: './training-schedule.component.html',
  styleUrls: ['./training-schedule.component.css']
})
export class TrainingScheduleComponent implements OnInit {
  displayedColumns: string[] = ['srno', 'image', 'title', 'price','action'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
  }

}

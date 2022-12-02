import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bootcamp-enquiries',
  templateUrl: './bootcamp-enquiries.component.html',
  styleUrls: ['./bootcamp-enquiries.component.css']
})
export class BootcampEnquiriesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','action'];
  dataSource = ELEMENT_DATA;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H',action:''}
]
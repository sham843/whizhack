import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ViewEnquiriesComponent } from './view-enquiries/view-enquiries.component';
export interface PeriodicElement {
  srno: number;
  name: string;
  emailid: string;
  contactno: string;
  course: string;
  page: string;
  actions: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {srno: 1, name: 'Mr. Anil Vishwas', emailid: 'anilvishwas@gmail.com', contactno: '9876543210', course: 'CyberNinja', page:'Traning', actions:''},
  {srno: 2, name: 'Mr. Sunil Rajaram Shinde', emailid: 'sunilshinde@gmail.com', contactno: '7894651320', course: 'CyberNinja', page:'Traning', actions:''},
  {srno: 3, name: 'Ms. Shrutika Ravikiran Nalawade', emailid: 'shrutika@gmail.com', contactno: '8951320505', course: 'CyberNinja', page:'Traning', actions:''},
  {srno: 4, name: 'Mr. Anil Vishwas', emailid: 'anilvishwas@gmail.com', contactno: '9876543210', course: 'CyberNinja', page:'Traning', actions:''},
  {srno: 5, name: 'Mr. Anil Vishwas', emailid: 'anilvishwas@gmail.com', contactno: '9876543210', course: 'CyberNinja', page:'Traning', actions:''},
  {srno: 6, name: 'Mr. Anil Vishwas', emailid: 'anilvishwas@gmail.com', contactno: '9876543210', course: 'CyberNinja', page:'Traning', actions:''},
  {srno: 7, name: 'Mr. Anil Vishwas', emailid: 'anilvishwas@gmail.com', contactno: '9876543210', course: 'CyberNinja', page:'Traning', actions:''},
  {srno: 8, name: 'Mr. Anil Vishwas', emailid: 'anilvishwas@gmail.com', contactno: '9876543210', course: 'CyberNinja', page:'Traning', actions:''},
  {srno: 9, name: 'Mr. Anil Vishwas', emailid: 'anilvishwas@gmail.com', contactno: '9876543210', course: 'CyberNinja', page:'Traning', actions:''},
  {srno: 10, name: 'Mr. Anil Vishwas', emailid: 'anilvishwas@gmail.com', contactno: '9876543210', course: 'CyberNinja', page:'Traning', actions:''},
];
@Component({
  selector: 'app-enquiries',
  templateUrl: './enquiries.component.html',
  styleUrls: ['./enquiries.component.css']
})
export class EnquiriesComponent implements OnInit {
  displayedColumns: string[] = ['srno', 'name', 'emailid', 'contactno', 'course', 'page','actions'];
  dataSource = ELEMENT_DATA;
  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    this.dialog.open(ViewEnquiriesComponent, {
      width: '600px'
    });
  }

  ngOnInit(): void {
  }

}

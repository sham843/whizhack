import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Editor, Toolbar } from 'ngx-editor';
import { JobDetailsComponent } from './job-details/job-details.component';

export interface PeriodicElement {
  title: string;
  srno: number;
  location: string;
  postdate: string;
  lastdate: string;
  publish: string;
  actions: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {srno: 1, title: 'Hydrogen', location: '1.0079', postdate: 'H', lastdate: 'H',publish:'',actions:''},
  {srno: 2, title: 'Helium', location: '4.0026', postdate: 'He', lastdate: 'H',publish:'',actions:''},
  {srno: 3, title: 'Lithium', location: '6.941', postdate: 'Li', lastdate: 'H',publish:'',actions:''},
  {srno: 4, title: 'Beryllium', location: '9.0122', postdate: 'Be', lastdate: 'H',publish:'',actions:''},
  {srno: 5, title: 'Boron', location: '10.811', postdate: 'B', lastdate: 'H',publish:'',actions:''},
  {srno: 6, title: 'Carbon', location: '12.0107', postdate: 'C', lastdate: 'H',publish:'',actions:''},
  {srno: 7, title: 'Nitrogen', location: '14.0067', postdate: 'N', lastdate: 'H',publish:'',actions:''},
  {srno: 8, title: 'Oxygen', location: '15.9994', postdate: 'O', lastdate: 'H',publish:'',actions:''},
  {srno: 9, title: 'Fluorine', location: '18.9984', postdate: 'F', lastdate: 'H',publish:'',actions:''},
  {srno: 10, title: 'Neon', location: '20.1797', postdate: 'Ne', lastdate: 'H',publish:'',actions:''},
];

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css']
})
export class PostJobComponent implements OnInit {
  displayedColumns: string[] = ['srno', 'title', 'location', 'postdate','lastdate','publish', 'actions'];
  dataSource = ELEMENT_DATA;
  constructor(public dialog: MatDialog) { }

  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['ordered_list', 'bullet_list'],
    ['link'],
  ];

  openDialog(): void {
    this.dialog.open(JobDetailsComponent,{
      width: '750px',
    });
  }

  ngOnInit(): void {
    this.editor = new Editor();
  }

}

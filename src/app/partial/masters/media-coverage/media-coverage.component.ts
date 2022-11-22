import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  srno: number;
  title: string;
  source: string;
  url: string;
  action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {srno: 1, title: 'Hydrogen', source: 'News Paper', url: 'H', action: ''},
  {srno: 2, title: 'Helium', source: 'News Paper', url: 'He', action: ''},
  {srno: 3, title: 'Lithium', source: 'News Paper', url: 'Li', action: ''},
  {srno: 4, title: 'Beryllium', source: 'News Paper', url: 'Be', action: ''},
  {srno: 5, title: 'Boron', source: 'News Paper', url: 'B', action: ''},
  {srno: 6, title: 'Carbon', source: 'News Paper', url: 'C', action: ''},
  {srno: 7, title: 'Nitrogen', source: 'News Paper', url: 'N', action: ''},
  {srno: 8, title: 'Oxygen', source: 'News Paper', url: 'O', action: ''},
  {srno: 9, title: 'Fluorine', source: 'News Paper', url: 'F', action: ''},
  {srno: 10, title: 'Neon', source: 'News Paper', url: 'Ne', action: ''},
];

@Component({
  selector: 'app-media-coverage',
  templateUrl: './media-coverage.component.html',
  styleUrls: ['./media-coverage.component.css']
})
export class MediaCoverageComponent implements OnInit {
  displayedColumns: string[] = ['srno', 'title', 'source', 'url', 'action'];
  dataSource = ELEMENT_DATA;
  
  constructor() { }

  ngOnInit(): void {
  }

}

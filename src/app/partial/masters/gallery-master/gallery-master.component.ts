import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  title: string;
  srno: number;
  gallery: string;
  action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {srno: 1, title: 'Hydrogen', gallery: '', action: 'H'},
  {srno: 2, title: 'Helium', gallery: '', action: 'He'},
  {srno: 3, title: 'Lithium', gallery: '', action: 'Li'},
  {srno: 4, title: 'Beryllium', gallery: '', action: 'Be'},
  {srno: 5, title: 'Boron', gallery: '', action: 'B'},
  {srno: 6, title: 'Carbon', gallery: '', action: 'C'},
  {srno: 7, title: 'Nitrogen', gallery: '', action: 'N'},
  {srno: 8, title: 'Oxygen', gallery: '', action: 'O'},
  {srno: 9, title: 'Fluorine', gallery: '', action: 'F'},
  {srno: 10, title: 'Neon', gallery: '', action: 'Ne'},
];

@Component({
  selector: 'app-gallery-master',
  templateUrl: './gallery-master.component.html',
  styleUrls: ['./gallery-master.component.css']
})
export class GalleryMasterComponent implements OnInit {

  displayedColumns: string[] = ['srno', 'title', 'gallery', 'action'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}

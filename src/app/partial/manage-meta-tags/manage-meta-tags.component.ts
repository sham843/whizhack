import { Component, OnInit } from '@angular/core';

interface Food {
  value: string;
  viewValue: string;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  actions: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H',actions:''},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He',actions:''},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li',actions:''},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be',actions:''},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B',actions:''},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C',actions:''},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N',actions:''},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O',actions:''},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F',actions:''},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne',actions:''},
];

@Component({
  selector: 'app-manage-meta-tags',
  templateUrl: './manage-meta-tags.component.html',
  styleUrls: ['./manage-meta-tags.component.css']
})
export class ManageMetaTagsComponent implements OnInit {
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'actions'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {
  elementData:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }
  resValues:any = this.data;
  ngOnInit(): void {
  }
}

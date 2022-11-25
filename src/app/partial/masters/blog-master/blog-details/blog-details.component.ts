import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {
  elementData:any;
  blogRegDetailsArray= new Array();
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
              private service: ApiService
              ) { }

  ngOnInit(): void {
    this.getElementById();
  }

  resId:number = this.data;
  getElementById(){
    this.service.setHttp('get', 'whizhack_cms/Blogregister/GetById?id=' + this.resId, false, false, false, 'whizhackService');
        this.service.getHttp().subscribe({
          next: (res: any) => {
            if (res.statusCode == '200') {
              this.elementData = res.responseData;
              this.blogRegDetailsArray = this.elementData.blogRegisterDetailsModel;
            }
          }
        })
  }
}

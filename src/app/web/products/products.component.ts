import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  getAllBlog=new Array();
  blogPostArray=new Array();
  whitePaperArray=new Array();
  caseStudyArray=new Array();
  constructor(private apiService:ApiService,private spinner:NgxSpinnerService,private router:Router) { }

  ngOnInit(): void {
    this.getBlogData();
  }
  getBlogData() {
    this.apiService.setHttp('get', "whizhack_cms/Blogregister/GetAllBlog", false, false, false, 'whizhackService');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == 200) {
          this.getAllBlog = res.responseData;
          this.getAllBlog.forEach((ele: any) => {
            ele.blogType == 1 ? this.blogPostArray.push(ele) : ele.blogType == 2 ? this.whitePaperArray.push(ele) : ele.blogType == 3 ? this.caseStudyArray.push(ele) : '';
          })
        } else {
          this.getAllBlog = [];
        }
        this.spinner.hide();
      },
    })
  }
  resourceDetails() {
    this.router.navigate(['../knowledge-hub']);
  }
  blogDetails(blogId: any,title:any) {
    let joinString=title.split(' ').join('-')
  //  let joinString =str.substring(0, str.length-1)
    this.router.navigateByUrl('/blog-details/'+blogId.toString()+'-'+joinString);
  }
}

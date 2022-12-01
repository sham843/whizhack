import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {
  blogId!: number;
  blogTypeId!: number;
  blogArray:any;
  getAllBlog=new Array();
  getBlogArray=new Array();
  getpapersArray=new Array();
  getcaseData=new Array();
  constructor(private route: ActivatedRoute, private apiService: ApiService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((ele: any) => {
      this.blogId = ele.params.id;
    })
    this.getBlogDetails(this.blogId);
    setTimeout(() => {
      this.getAllBlogsDetails();
    }, 500);
  }
  getBlogDetails(blogIds:any) {
    this.apiService.setHttp('get', "whizhack_cms/Blogregister/GetById?id="+blogIds, false, false, false, 'whizhackService');
    this.apiService.getHttp().subscribe((res: any) => {
     this.blogArray=res.responseData;
     this.blogTypeId=this.blogArray.blogType;
    })
  }

  getAllBlogsDetails(){
    this.apiService.setHttp('get', "whizhack_cms/Blogregister/GetAllBlogRegisterByPagination?blogtype="+this.blogTypeId, false, false, false, 'whizhackService');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == 200) {
          this.getAllBlog = res.responseData.responseData1;
          console.log(this.getAllBlog);
        } else {
          this.getAllBlog = [];
        }
        this.spinner.hide();
      },
    })
  }
}

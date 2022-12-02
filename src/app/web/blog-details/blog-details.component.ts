import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  blogArray: any;
  blogIds: any;
  getAllBlog = new Array();
  getBlogArray = new Array();
  getpapersArray = new Array();
  getcaseData = new Array();
  constructor(private apiService: ApiService, private spinner: NgxSpinnerService, private router: Router) {
    this.blogIds = this.router.getCurrentNavigation()?.extras.state;
  }

  ngOnInit(): void {
    this.getBlogDetails();
    setTimeout(() => {
      this.getAllBlogsDetails();
    }, 500);
  }
  getBlogDetails(blogs?: any) {
    let ids = blogs ? blogs :this.blogIds;
    this.apiService.setHttp('get', "whizhack_cms/Blogregister/GetById?id=" + ids, false, false, false, 'whizhackService');
    this.apiService.getHttp().subscribe((res: any) => {
      this.blogArray = res.responseData;
      this.blogTypeId = this.blogArray.blogType;
    })
  }

  getAllBlogsDetails() {
    this.apiService.setHttp('get', "whizhack_cms/Blogregister/GetAllBlogRegisterByPagination?blogtype=" + this.blogTypeId, false, false, false, 'whizhackService');
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

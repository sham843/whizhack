import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-knowledge-hub',
  templateUrl: './knowledge-hub.component.html',
  styleUrls: ['./knowledge-hub.component.css']
})
export class KnowledgeHubComponent implements OnInit {
  getAllBlog = new Array();
  blogPostArray = new Array();
  whitePaperArray = new Array();
  caseStudyArray = new Array();
  scrollId: string='';
  paramsSubscription !: Subscription;
  constructor(private apiService: ApiService, private spinner: NgxSpinnerService, private router: Router, private activated: ActivatedRoute) { }

  ngOnInit(): void {
    this.getBlog();
    this.paramsSubscription=this.activated.params.subscribe((ele: any) => {
      this.scrollId = ele.name;
    })
   setTimeout(() => {
    this.scrollId? document.getElementById(this.scrollId)?.scrollIntoView({    
      behavior: "smooth",
      block: "start",
      inline: "start"
    }):'';
   }, 1000);
  }

  getBlog() {
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
  blogDetails(blogId: number) {
    this.router.navigate(['../blog-details', blogId]);
  }
  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}

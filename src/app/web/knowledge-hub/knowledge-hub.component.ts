import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-knowledge-hub',
  templateUrl: './knowledge-hub.component.html',
  styleUrls: ['./knowledge-hub.component.css']
})
export class KnowledgeHubComponent implements OnInit {
  blogPostData=new Array();
  constructor(private apiService:ApiService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.getBlog();
  }
  getBlog(){
    this.apiService.setHttp('get', "whizhack_cms/Blogregister/GetAllBlog", false, false, false, 'whizhackService');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == 200) {
          this.blogPostData = res.responseData;
          console.log("mediaCoverageData",this.blogPostData)
        } else {
          this.blogPostData = [];
        }
        this.spinner.hide();
      },
  })
    }
}

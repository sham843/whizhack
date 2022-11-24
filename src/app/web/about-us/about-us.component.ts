import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  mediaCoverageData=new Array();
constructor(private apiService:ApiService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.getMediaConverageData();
  }
  getMediaConverageData(){
  this.apiService.setHttp('get', "whizhack_cms/media/GetAllByPagination", false, false, false, 'whizhackService');
  this.apiService.getHttp().subscribe({
    next: (res: any) => {
      if (res.statusCode == 200) {
        this.mediaCoverageData = res.responseData?.responseData;
      } else {
        this.mediaCoverageData = [];
      }
      this.spinner.hide();
    },
})
  }
 
}

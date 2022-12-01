import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  mediaCoverageData = new Array();

  totalCount:number =0 ;
  pageNo:number =1;
   mainArray:any = [];
  constructor(private apiService: ApiService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getMediaConverageData();
  }
  getMediaConverageData() {

    this.apiService.setHttp('get', "whizhack_cms/media/GetAllByPagination", false, false, false, 'whizhackService');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == 200) {
          this.mediaCoverageData = res.responseData?.responseData;
         let tempArray:any  =[];
          let count = 0;
          this.mediaCoverageData.forEach((ele:any)=>{
            count ++ ;
            if(count == 4){
              let obj ={
                name : ele.article_Title,
                isArray : tempArray
              }
              this.mainArray.push(obj)
              tempArray=[];
              count = 0;
            }else{
              tempArray.push(ele)
            }
          })
        } else {
          this.mediaCoverageData = [];
        }
        this.spinner.hide();
      },
    })
  }

  onClickPaginatior(event: any) {
    this.pageNo = event.pageIndex + 1;
    this.getMediaConverageData();
  }
}

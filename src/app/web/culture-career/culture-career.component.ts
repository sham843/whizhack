import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from '@ngx-gallery/core';
import { Lightbox } from '@ngx-gallery/lightbox';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonMethodService } from 'src/app/core/services/common-method.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';

@Component({
  selector: 'app-culture-career',
  templateUrl: './culture-career.component.html',
  styleUrls: ['./culture-career.component.css']
})
export class CultureCareerComponent implements OnInit {

  items!: GalleryItem[];
  imageArray = new Array();
  postJobArray: any;

  imagePageNo: number = 1;
  totalCount !: number;

  //post Job Code
  jobPostPageNo: number = 1;
  jobPostTotalCount !: number;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatPaginator) jobPaginator!: MatPaginator;

  constructor(
    private _errorService: ErrorHandlerService,
    private api: ApiService,
    public gallery: Gallery,
    public commonService: CommonMethodService,
    public lightbox: Lightbox,
    private service: ApiService,
    private error: ErrorHandlerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAllImages();
    this.getAllPostJobs();
  }


  //#region onclick pagination
  onClickPaginatior(event: any) {
    this.imagePageNo = event.pageIndex + 1;
    this.getAllImages();

  }
  //#endregion


  getAllImages() {

    this.api.setHttp('get', 'whizhack_cms/Gallery/GetAllGallery' + "?pageno=" + this.imagePageNo + "&pagesize=5", false, false, false, 'whizhackService');
    this.api.getHttp().subscribe({
      next: ((res: any) => {
        if (res.statusCode === '200') {
          let dataFromServer = res.responseData.responseData1;
          this.totalCount = res.responseData.responseData2?.pageCount;
          this.imageArray = dataFromServer;
        } else {
          this.commonService.checkDataType(res.statusMessage) == false ? this._errorService.handelError(res.statusCode) : this.commonService.matSnackBar(res.statusMessage, 1);
        }
      }),
      error: (error: any) => {
        this.error.handelError(error.statusCode);
      }
    })
  }

  openLightBox(imgArray: any) {
    this.lightbox.open(0, 'lightbox')
    this.items = imgArray.map((item: any) => new ImageItem({ src: item, thumb: item }));
    this.basicLightboxExample();
  }


  basicLightboxExample() {
    this.gallery.ref('lightbox').load(this.items);
    this.withCustomGalleryConfig();
  }

  withCustomGalleryConfig() {

    // 2. Get a lightbox gallery ref
    const lightboxGalleryRef = this.gallery.ref('anotherLightbox');

    // (Optional) Set custom gallery config to this lightbox
    lightboxGalleryRef.setConfig({
      imageSize: ImageSize.Cover,
      thumbPosition: ThumbnailsPosition.Top
    });

    // 3. Load the items into the lightbox
    lightboxGalleryRef.load(this.items);
  }

  //........................................post Job Code Start Here..............................................//
  onClickJobPaginatior(event: any) {
    this.jobPostPageNo = event.pageIndex + 1;
    this.getAllPostJobs();

  }

  getAllPostJobs() {

    this.service.setHttp('get', 'whizhack_cms/postjobs/getALlPublishDetails?' + 'pageno=' + this.jobPostPageNo + '&pagesize=6', false, false, false, 'whizhackService');
    this.service.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == '200') {
          this.postJobArray = res.responseData.responseData1;
          this.jobPostTotalCount = res.responseData.responseData2?.pageCount;
          this.jobPostPageNo == 1 ? this.jobPaginator?.firstPage() : '';
        }
        else {
          this.postJobArray = [];
          this.commonService.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonService.matSnackBar(res.statusMessage, 1);
        }
      },
      error: (error: any) => {
        this.error.handelError(error.statusCode);
      }
    })
  }

  navigatePage(jobpostId: any, title: any) {
    jobpostId
    let joinString = title.split(' ').join('-');
    // let joinString =str.substring(0, str.length-1);
     this.router.navigateByUrl('/job-details/'+jobpostId.toString()+'-'+joinString);
  }

  //........................................post Job Code End Here..............................................//

}


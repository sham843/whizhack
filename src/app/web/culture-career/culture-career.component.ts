import { Component, OnInit } from '@angular/core';
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

  constructor(
    private _errorService: ErrorHandlerService,
    private api: ApiService,
    public gallery: Gallery,
    public commonService: CommonMethodService,
    public lightbox: Lightbox,
    private service: ApiService,
    private error: ErrorHandlerService,
  ) { }

  ngOnInit() {
    this.getAllImages();
    this.getAllPostJobs();
  }

  getAllImages() {
    this.api.setHttp('get', 'whizhack_cms/Gallery/GetAllGallery', false, false, false, 'whizhackService');
    this.api.getHttp().subscribe({
      next: ((res: any) => {
        if (res.statusCode === '200') {
         let dataFromServer = res.responseData.responseData;
          dataFromServer.map((ele: any) => {
            let data = [];
            if (ele.imagepath.includes(',')) {
              data = ele.imagepath.split(',');
            } else {
              data.push(ele.imagepath);
            }
            ele.imageArray = data;
          })
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

  openLightBox(imgArray:any){
    this.lightbox.open(0, 'lightbox')
    this.items = imgArray.map((item:any) => new ImageItem({ src: item, thumb: item }));
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

  getAllPostJobs() {
    this.service.setHttp('get', 'whizhack_cms/postjobs/GetAllPostJobs?', false, false, false, 'whizhackService');
    this.service.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == '200') {
          this.postJobArray = res.responseData.responseData;
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

  navigatePage(jobpostId: any) {
    this.commonService.routerLinkRedirect('../job-details/' + jobpostId);
  }

  //........................................post Job Code End Here..............................................//

}


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

  constructor(
    private _errorService: ErrorHandlerService,
    private api: ApiService,
    public gallery: Gallery,
    public _commonMethodService: CommonMethodService,
    public lightbox: Lightbox,) { }

  ngOnInit() {
    this.getImageData();

  }



  getImageData() {
    this.api.setHttp('get', 'whizhack_cms/Gallery/GetAllImages', false, false, false, 'whizhackService');
    this.api.getHttp().subscribe({
      next: ((res: any) => {
        if (res.statusCode === '200') {
          let data:any = [];
          data = res.responseData;
          data.find((ele: any) => {
            let flag = ele.imagepath.includes(',');
            if (flag) {
              let splitArray = ele.imagepath.split(',');
              splitArray.map((res: any) =>  this.imageArray.push(res))
            } else {
              this.imageArray.push(ele.imagepath);
            }
          })

          this.items =  this.imageArray.map(item =>   new ImageItem({ src: item, thumb: item }) );
          this.basicLightboxExample();

        } else {
          this._commonMethodService.checkDataType(res.statusMessage) == false ? this._errorService.handelError(res.statusCode) : this._commonMethodService.matSnackBar(res.statusMessage, 1);
        }
      }),
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  basicLightboxExample() {
    this.gallery.ref().load(this.items);
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


}


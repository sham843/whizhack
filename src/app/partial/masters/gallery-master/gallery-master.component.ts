import { WebStorageService } from './../../../core/services/web-storage.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { CommonMethodService } from 'src/app/core/services/common-method.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { FormValidationService } from 'src/app/core/services/form-validation.service';
import { ConfirmationModalComponent } from 'src/app/dialogs/confirmation-modal/confirmation-modal.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from '@ngx-gallery/core';
import { Lightbox } from '@ngx-gallery/lightbox';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-gallery-master',
  templateUrl: './gallery-master.component.html',
  styleUrls: ['./gallery-master.component.css']
})
export class GalleryMasterComponent implements OnInit, AfterViewInit {



  //#region File Upload variables
  @ViewChild('fileInput') fileInput!: ElementRef;

  //#region  Pagination Variables
  totalCount!: number;
  currentPage: number = 1;
  perPage: number = 10;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  //#region  table Variables
  displayedColumns: string[] = ['srNo', 'gallery_Title', 'action'];
  dataSource: any;


  //#region  form Group Variables
  frmGallery!: FormGroup;
  searchFilter = new FormControl('');

  //#region  clear Validation
  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;

  //#region  image Variables
  imagepath: any;
  imageArray = new Array();
  showImagError: any;
  //#endregion

  //#region edit Variables
  UpdateObj: any;

  //#region selected Row variables
  highlightedRow: any;

  //#region light box variables
  items!: GalleryItem[];

  constructor(private fb: FormBuilder,
    public vs: FormValidationService,
    private _fileUploadService: FileUploadService,
    public _commonMethodService: CommonMethodService,
    private _errorService: ErrorHandlerService,
    public _webStorageService: WebStorageService,
    private api: ApiService,
    public gallery: Gallery,
    private spinner: NgxSpinnerService,
    public lightbox: Lightbox,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.createMediaForm();
    this.getGalleryList();
  }

  createMediaForm() {
    this.frmGallery = this.fb.group({
      id: [0],
      gallery_title: ['', [Validators.required, Validators.pattern(this.vs.valDescription), Validators.maxLength(50)]],
      // gallery_description: ['', [Validators.required, Validators.pattern(this.vs.valDescription), Validators.maxLength(500)]],
      gallery_description: [''],
      uploadImages: [''],
    })
  }

  //#region  get formControl
  get g() { return this.frmGallery.controls };
  //#endregion
  //#region  For search Bar
  ngAfterViewInit() {
    let formValue = this.searchFilter.valueChanges;
    formValue.pipe(
      filter(() => this.searchFilter.valid),
      debounceTime(1000),
      distinctUntilChanged())
      .subscribe(() => {
        this.currentPage = 1;
        this.createMediaForm();
        this.imageArray = [];
        this.getGalleryList();
      })
  }
  //#endregion


  //#region  clear Filter
  clearSearchFilter() {
    this.searchFilter.setValue('');
  }
  //#endregion

  //#region onclick pagination
  onClickPaginatior(event: any) {
    this.currentPage = event.pageIndex + 1;
    this.clearGalleryForm();
    this.getGalleryList();
  }
  //#endregion

  //#region   GalleryList
  getGalleryList() {
    this.spinner.show();
    let serachValue = this._commonMethodService.checkDataType(this.searchFilter.value?.trim()) ? this.searchFilter.value : '';
    this.api.setHttp('get', 'whizhack_cms/Gallery/GetAllGallery?' + "pageno=" + this.currentPage + "&pagesize=" + this.perPage + "&gallery_Title=" + serachValue, false, false, false, 'whizhackService');
    this.api.getHttp().subscribe({
      next: ((res: any) => {
        if (res.statusCode === '200') {
          this.spinner.hide();
          this.dataSource = new MatTableDataSource(res.responseData.responseData1);
          this.totalCount = res.responseData.responseData2?.pageCount;
          this.currentPage == 1 ? this.paginator?.firstPage() : '';

        } else {

          this.dataSource = [];
          this.totalCount = 0
          if (res.statusCode != 404) {
            this._commonMethodService.checkDataType(res.statusMessage) == false ? this._errorService.handelError(res.statusCode) : this._commonMethodService.matSnackBar(res.statusMessage, 1);
          }
          this.spinner.hide();
        }
      }),
      error: (error: any) => {
        this._errorService.handelError(error.status); this.spinner.hide();
      }
    })
  }
  //#endregion


  //#region multiple Image Upload Code Start here

  mediaFileUpload(event: any) {
    this._fileUploadService.uploadMultipleDocument(event, 'Upload', 'png,jpg,jpeg,jfif').subscribe((res: any) => {
      if (res.statusCode === "200") {
        this.imagepath = res.responseData;
        if (this.imageArray.length) {
          let flag = this.imagepath.includes(',')
          flag ? this.imageArray.push(this.imagepath.split(',')) : this.imageArray.push(this.imagepath);

        } else {
          this.imageArray = this.imagepath.split(',');
        }
        this.showImagError = '';

      } else {
        this.imagepath = '';
        this.fileInput.nativeElement.value = '';
        this.imageArray = [];
      }
    })
  }
  //#endregion

  //#region  Delete IMG Start Here
  deleteImage(ind: number) {
    this.imageArray.splice(ind, 1);
    !this.imageArray.length ? this.showImagError = 'Gallery Images is required' : this.showImagError = '';

  }

  //#endregion

  //#region save Update Data
  onMediaSubmit() {
    if (this.frmGallery.invalid || !this.imageArray.length) {
      !this.imageArray.length ? this.showImagError = "Gallery Images is required" : this.showImagError = '';
      return;
    }
    this.spinner.show();
    let formData = this.frmGallery.value;
    let imagepath: string = '';
    this.imageArray.map((ele: any) => { imagepath += ele + "," });
    imagepath = imagepath.substring(0, imagepath.length - 1);
    let obj = {
      "createdBy": this._webStorageService.getUserId(),
      "modifiedBy": this._webStorageService.getUserId(),
      "createdDate": new Date(),
      "modifiedDate": new Date(),
      "isDeleted": false,
      "id": this.UpdateObj ? this.UpdateObj.galleryId : 0,
      "gallery_Title": formData.gallery_title,
      "description": formData.gallery_description,
      "imagepath": imagepath
    }
    let url, formType: any;
    this.UpdateObj ? (url = 'Update', formType = 'put') : (url = 'insert', formType = 'post');
    this.api.setHttp(formType, 'whizhack_cms/Gallery/' + url, false, obj, false, 'whizhackService');
    this.api.getHttp().subscribe({
      next: ((res: any) => {
        if (res.statusCode === '200') {
          this.spinner.hide();
          this._commonMethodService.matSnackBar(res.statusMessage, 0);
          formType == 'post' ? this.currentPage = 1 : '';
          this.clearGalleryForm();
          this.getGalleryList();
        } else {
          this.spinner.hide();
          this._commonMethodService.checkDataType(res.statusMessage) == false ? this._errorService.handelError(res.statusCode) : this._commonMethodService.matSnackBar(res.statusMessage, 1);
        }
      }),
      error: (error: any) => {
        this._errorService.handelError(error.status); this.spinner.hide();
      }
    })

  }
  //#endregion

  //#region  Onclick Update Button
  editGalleryRecord(data: any) {
    this.spinner.show();
    this.UpdateObj = data;
    this.showImagError = '';
    this.highlightedRow = data.galleryId;
    this.frmGallery.patchValue({
      gallery_description: data?.description,
      gallery_title: data?.gallery_Title,
    });

    this.imageArray = JSON.parse(JSON.stringify(data.imagepaths));
    this.spinner.hide();
  }
  //#endregion

  //#region delete Record
  deleteGalleryRecord(data: any) {
    this.createMediaForm();
    this.imageArray = [];
    let dialoObj = {
      header: 'Delete',
      title: 'Do you want to delete the selected course ?',
      cancelButton: 'Cancel',
      okButton: 'Ok'
    }

    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '300px',
      data: dialoObj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'yes') {
        let deleteObj = {
          "id": data.galleryId,
          "modifiedBy": this._webStorageService.getUserId(),
        }
        this.spinner.show();
        this.api.setHttp('delete', 'whizhack_cms/Gallery/Delete', false, deleteObj, false, 'whizhackService');
        this.api.getHttp().subscribe({
          next: ((res: any) => {
            if (res.statusCode === '200') {
              this.spinner.hide();
              this._commonMethodService.matSnackBar(res.statusMessage, 0);
              this.getGalleryList();
            } else {
              this.spinner.hide();
              this._commonMethodService.checkDataType(res.statusMessage) == false ? this._errorService.handelError(res.statusCode) : this._commonMethodService.matSnackBar(res.statusMessage, 1);
            }
          }),
          error: (error: any) => {
            this._errorService.handelError(error.status); this.spinner.hide();
          }
        })
      }
    });

  }
  //#endregion

  //#region Clear Form And Validation
  clearGalleryForm() {
    this.frmGallery.reset();
    this.createMediaForm();
    this.formGroupDirective.resetForm();
    this.showImagError = '';
    this.imageArray = [];
    this.UpdateObj = '';
    this.highlightedRow = '';
  }
  //#endregion

  //#region light box code start here
  openBox(data: any) {
    this.lightbox.open(0, 'lightbox')
    this.items = data.imagepaths.map((item: any) => new ImageItem({ src: item, thumb: item }));
    this.basicLightboxExample();
    this.withCustomGalleryConfig()
  }

  basicLightboxExample() {
    this.gallery.ref('lightbox').load(this.items);
  }

  withCustomGalleryConfig() {
    const lightboxGalleryRef = this.gallery.ref('anotherLightbox');
    lightboxGalleryRef.setConfig({
      imageSize: ImageSize.Cover,
      thumbPosition: ThumbnailsPosition.Top
    });
    lightboxGalleryRef.load(this.items);
  }
  //#endregion
}

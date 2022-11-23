// import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { CommonMethodService } from 'src/app/core/services/common-method.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { FormValidationService } from 'src/app/core/services/form-validation.service';
import { ConfirmationModalComponent } from 'src/app/dialogs/confirmation-modal/confirmation-modal.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';
@Component({
  selector: 'app-gallery-master',
  templateUrl: './gallery-master.component.html',
  styleUrls: ['./gallery-master.component.css']
})
export class GalleryMasterComponent implements OnInit, AfterViewInit {



  //#region File Upload variables
  @ViewChild('fileInput') fileInput!: ElementRef;

  //#region  Pagination Variables
  totalCount: number = 0;
  currentPage: number = 1;
  perPage: number = 10;

  //#region  table Variables
  displayedColumns: string[] = ['srNo', 'gallery_Title', 'action'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  //#region  form Group Variables
  frmGallery!: FormGroup;
  searchFilter = new FormControl('');

  //#region  image Variables
  imagepath: any;
  imageArray = new Array();

  constructor(private fb: FormBuilder,
    public vs: FormValidationService,
    private _fileUploadService: FileUploadService,
    public _commonMethodService: CommonMethodService,
    // private _errorService: ErrorHandlerService,
    private api: ApiService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.createMediaForm();
    this.getGalleryList();
  }

  createMediaForm() {
    this.frmGallery = this.fb.group({
      id: [0],
      gallery_title: ['', [Validators.required]],
      gallery_description: ['', [Validators.required]],
      uploadImages: ['', [Validators.required]],
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
    this.currentPage = event.pageIndex;
    this.getGalleryList();
  }

  //#region   GalleryList
  getGalleryList() {
    let serachValue = this._commonMethodService.checkDataType(this.searchFilter.value?.trim()) ? this.searchFilter.value : '';
    this.api.setHttp('get', 'whizhack_cms/Gallery/GetAllGallery?' + "pageno=" + this.currentPage + "&pagesize=" + this.perPage + "&gallery_Title=" + serachValue, false, false, false, 'whizhackService');
    this.api.getHttp().subscribe({
      next: ((res: any) => {
        if (res.statusCode === '200') {
          this.dataSource = new MatTableDataSource(res.responseData);
          this.totalCount = res.responseData1.totalPages;

        } else {
          this.dataSource = [];
          if (res.statusCode != 404) {
            this._commonMethodService.matSnackBar(res.statusMessage, 1);
          }

        }
      }),
      error: (error: any) => {
        console.log(error);
      }
    })
  }
  //#endregion


  //#region multiple Image Upload Code Start here

  mediaFileUpload(event: any) {
    this._fileUploadService.uploadMultipleDocument(event, 'Upload', 'png,jpg,jpeg').subscribe((res: any) => {
      if (res.statusCode === "200") {
        this.imagepath = res.responseData;
        if( this.imageArray.length){
         let flag= this.imagepath.includes(',')
         flag ? this.imageArray.push(this.imagepath.split(',')):this.imageArray.push(this.imagepath);
        }else{
          this.imageArray = this.imagepath.split(',');
        }

      } else {
        this.fileInput.nativeElement.value = '';
        this.imageArray = [];
      }
    })
  }
//#endregion

//#region  Delete IMG Start Here
deleteImage(ind:number){
this.imageArray .splice(ind,1);
}

//#endregion


  onMediaSubmit() {
    if (this.frmGallery.invalid) {
      return;
    } else {

    }
  }

  editGalleryRecord(data: any) {
    this.frmGallery.patchValue({
      gallery_title: data
    })
  }

  deleteGalleryRecord(data: any) {
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
          "id": data.id,
          "modifiedBy": 0,
        }

        this.api.setHttp('delete', 'whizhack_cms/course/Delete', false, deleteObj, false, 'whizhackService');
        this.api.getHttp().subscribe({
          next: ((res: any) => {
            if (res.statusCode === '200') {
              this.getGalleryList();
            }
          }),
          error: (error: any) => {
            console.log(error);
          }
        })
      }
    });

  }

  clearGalleryForm() {
    this.frmGallery.reset();
    this.createMediaForm();
  }

}

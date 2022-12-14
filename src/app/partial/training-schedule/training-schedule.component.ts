import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';

import { debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonMethodService } from 'src/app/core/services/common-method.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { FormValidationService } from 'src/app/core/services/form-validation.service';
import { WebStorageService } from 'src/app/core/services/web-storage.service';
import { ConfirmationModalComponent } from 'src/app/dialogs/confirmation-modal/confirmation-modal.component';
import { ViewTrainingScheduleComponent } from './view-training-schedule/view-training-schedule.component';



@Component({
  selector: 'app-training-schedule',
  templateUrl: './training-schedule.component.html',
  styleUrls: ['./training-schedule.component.css']
})
export class TrainingScheduleComponent implements OnInit, AfterViewInit {
  @ViewChild('uploadDocument') file!: ElementRef;

  @ViewChild('uploadBrochure') brochure!: ElementRef;

  courseManageForm!: FormGroup;
  displayedColumns: string[] = ['srno', 'course_Title', 'duration', 'price', 'action'];
  dataSource: any;
  pageNameArray = new Array();
  totalCount: number = 0;
  currentPage: number = 0;
  selRow: number = 0;
  imgSrc: string = '';
  editFlag: boolean = false;
  offer: boolean = false;
  editorConfig = this.comMethods.editorConfig;

  @ViewChild(MatSort) sort!: MatSort;

  searchFilter = new FormControl();
  globalObj: any;
  imgFlag: boolean = false;
  brochurePath: any;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private fileUpl: FileUploadService,
    private api: ApiService,
    private errorService: ErrorHandlerService,
    private ngxSpinner: NgxSpinnerService,
    public vadations: FormValidationService,
    private comMethods: CommonMethodService,
    private webStrorage: WebStorageService) { }

  ngOnInit(): void {
    this.courseManageFormData();
    this.getPageName();
    this.getAllCourseList();
  }

  courseManageFormData() {
    this.courseManageForm = this.fb.group({
      id: 0,
      pageName: ['', Validators.required],
      course_Title: ['', [Validators.required]],
      course_Caption: [''],
      duration: [''],
      course_Description: ['', [Validators.required]],
      syllabus_Summary: [''],
      price: ['', [Validators.required]],
      price_Terms: [''],
      imagePath: [''],
      actual_price: ['', [Validators.required]],
      brochurePath: ['']
    })
  }

  get formControls() { return this.courseManageForm.controls }

  openDialog(obj: any) {
    this.dialog.open(ViewTrainingScheduleComponent, {
      data: obj
    });
  }

  ngAfterViewInit() {
    let formValue = this.searchFilter.valueChanges;
    formValue.pipe(
      filter(() => this.searchFilter.valid),
      debounceTime(1000),
      distinctUntilChanged())
      .subscribe(() => {
        this.clearForm()
        this.courseManageFormData();
        this.getAllCourseList();
      })
  }

  clearSearchFilter() {
    this.selRow = 0
    this.searchFilter.setValue('');
  }

  getAllCourseList() {
    this.ngxSpinner.show();
    let search = this.searchFilter.value ? this.searchFilter.value.trim() : ''
    this.api.setHttp('get', 'whizhack_cms/course/GetAllCourses?pageno=' + (this.currentPage + 1) + '&pagesize=10&course_Title=' + search, false, false, false, 'whizhackService');
    this.api.getHttp().subscribe({
      next: ((res: any) => {
        if (res.statusCode == '200') {
          this.ngxSpinner.hide();
          this.dataSource = new MatTableDataSource(res.responseData);
          this.dataSource.sort = this.sort;
          this.totalCount = res.responseData1.pageCount;
        } else {
          this.ngxSpinner.hide();
          this.dataSource = [];
          if (res.statusCode != '404') {
            this.comMethods.checkDataType(res.statusText) == false ? this.errorService.handelError(res.statusCode) : this.comMethods.matSnackBar(res.statusText, 1);
          }
          this.totalCount = 0
        }
      }),
      error: (error: any) => {
        this.ngxSpinner.hide();
        this.dataSource = [];
        this.comMethods.checkDataType(error.statusText) == false ? this.errorService.handelError(error.statusCode) : this.comMethods.matSnackBar(error.statusText, 1);
      }
    })
  }

  getPageName() {
    this.api.setHttp('get', 'whizhack_cms/course/getPageList', false, false, false, 'whizhackService');
    this.api.getHttp().subscribe({
      next: ((res: any) => {
        if (res.statusCode == '200') {
          this.pageNameArray = res.responseData;
          this.editFlag ? this.courseManageForm.controls['pageName'].setValue(this.globalObj?.pageName) : '';
        } else {
          this.pageNameArray = [];
          this.comMethods.checkDataType(res.statusText) == false ? this.errorService.handelError(res.statusCode) : this.comMethods.matSnackBar(res.statusText, 1);
        }
      }),
      error: (error: any) => {
        this.comMethods.checkDataType(error.statusText) == false ? this.errorService.handelError(error.statusCode) : this.comMethods.matSnackBar(error.statusText, 1);
      }
    })
  }

  fileUpload(event: any, name: string) {
    let fileType = name == 'img' ? 'png,jpg,jpeg,hevc,jfif' : 'pdf'
    this.fileUpl.uploadMultipleDocument(event, 'Upload', fileType).subscribe({
      next: ((res: any) => {
        if (res.statusCode == '200') {

          if (name == 'img') {
            this.imgSrc = res.responseData;
            this.courseManageForm.controls['imagePath'].setValue(this.imgSrc);
          } else {
            this.brochurePath = res.responseData;
            this.courseManageForm.controls['brochurePath'].setValue(this.brochurePath);
          }
          this.comMethods.matSnackBar(res.statusMessage, 0);
        } else {
          this.comMethods.checkDataType(res.statusMessage) == false ? this.errorService.handelError(res.statusCode) : this.comMethods.matSnackBar(res.statusMessage, 1);

          if (name == 'img') {
            this.imgSrc = '';
            this.file.nativeElement.value = '';
            this.courseManageForm.controls['imagePath'].setValue('');
          } else {
            this.brochurePath = '';
            this.brochure.nativeElement.value = '';
            this.courseManageForm.controls['brochurePath'].setValue('');
          }
        }
      }),
      error: (error: any) => {
        if (name == 'img') {
          this.imgSrc = '';
          this.file.nativeElement.value = '';
          this.courseManageForm.controls['imagePath'].setValue('');
        } else {
          this.brochurePath = '';
          this.brochure.nativeElement.value = '';
          this.courseManageForm.controls['brochurePath'].setValue('');
        }
        this.comMethods.checkDataType(error.statusText) == false ? this.errorService.handelError(error.statusCode) : this.comMethods.matSnackBar(error.statusText, 1);
      }
    })
  }

  deleteImage(name: string) {
    if (name == 'img') {
      this.imgSrc = '';
      this.file.nativeElement.value = '';
      this.courseManageForm.controls['imagePath'].setValue('');
    } else {
      this.brochurePath = '';
      this.brochure.nativeElement.value = '';
      this.courseManageForm.controls['brochurePath'].setValue('');
    }
  }

  onClickViewImage(name: string) {
    name == 'img' ? window.open(this.imgSrc, '_blank') : window.open(this.brochurePath, '_blank')
  }

  editCourse(obj: any) {
    this.selRow = obj.courseId;
    this.globalObj = obj;
    this.offer = false;
    this.editFlag = true;
    this.courseManageForm.patchValue({
      id: obj?.courseId,
      course_Title: obj?.course_Title,
      course_Caption: obj?.course_Caption,
      duration: obj?.duration,
      course_Description: obj?.course_Description,
      syllabus_Summary: obj?.syllabus_Summary,
      price: obj?.price,
      price_Terms: obj?.price_Terms,
      actual_price: obj?.actual_price,
      brochurePath: obj?.brochurePath
    })
    this.getPageName();
    obj?.exclusive_offer == 1 ? this.offer = true : false;
    this.courseManageForm.controls['imagePath'].setValue(obj?.imagePath);
    this.courseManageForm.controls['brochurePath'].setValue(obj?.brochurePath);
    this.brochurePath = obj?.brochurePath
    this.imgSrc = obj?.imagePath;
  }

  pageChanged(event: any) {
    this.clearForm();
    this.currentPage = event.pageIndex;
    this.getAllCourseList();
  }

  openDeleteDialog(id: any) {
    this.selRow = id;
    let dialoObj = {
      header: 'Delete',
      title: 'Do you want to delete the selected course ?',
      cancelButton: 'Cancel',
      okButton: 'Delete'
    }
    this.clearForm();
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '300px',
      data: dialoObj
    });

    dialogRef.afterClosed().subscribe(result => {
      this.selRow = 0;
      if (result == 'yes') {
        let deleteObj = {
          "id": id,
          "modifiedBy": this.webStrorage.getUserId()
        }

        this.api.setHttp('delete', 'whizhack_cms/course/Delete', false, deleteObj, false, 'whizhackService');
        this.api.getHttp().subscribe({
          next: ((res: any) => {
            if (res.statusCode == '200') {
              this.getAllCourseList();
              this.comMethods.matSnackBar(res.statusMessage, 0);
            } else {
              this.comMethods.checkDataType(res.statusMessage) == false ? this.errorService.handelError(res.statusCode) : this.comMethods.matSnackBar(res.statusMessage, 1);
            }
          }),
          error: (error: any) => {
            this.comMethods.checkDataType(error.statusText) == false ? this.errorService.handelError(error.statusCode) : this.comMethods.matSnackBar(error.statusText, 1);
          }
        })
      }
    });
  }

  clearForm(clear?: any) {
    this.courseManageForm.reset()
    clear?.resetForm();
    this.imgSrc = '';
    this.brochurePath = ''
    this.brochure.nativeElement.value = '';
    this.file.nativeElement.value = '';
    this.editFlag = false;
    this.offer = false;
    this.courseManageFormData();
    this.selRow = 0;
    this.imgFlag = false;
  }

  onClickSubmit(clear: any) {
    this.updateValidation();
    if (!this.courseManageForm.valid) {      
      return;
    }
    else {
      if(this.offer && Number(this.courseManageForm.value.actual_price) >= Number(this.courseManageForm.value.price)){
        // this.showDiscountMsg = true 
        this.comMethods.matSnackBar('Discount Price is Must Be Less than Price', 1);
      }else{
        this.ngxSpinner.show();
        let submitObj = {
          ...this.webStrorage.createdByProps(),
          ... this.courseManageForm.value
        }
        submitObj.price = +submitObj.price
        submitObj.exclusive_offer = this.offer ? 1 : 0;
        submitObj.actual_price = submitObj.exclusive_offer == 0 ? 0 : +submitObj.actual_price;
        let url = this.editFlag ? 'Update' : 'Insert';
        this.api.setHttp(this.editFlag ? 'put' : 'post', 'whizhack_cms/course/' + url, false, submitObj, false, 'whizhackService');
        this.api.getHttp().subscribe({
          next: ((res: any) => {
            if (res.statusCode == '200') {
              this.ngxSpinner.hide();
              this.selRow = 0;
              this.comMethods.matSnackBar(res.statusMessage, 0);
              this.getAllCourseList();
              this.clearForm(clear);
            } else {
              this.ngxSpinner.hide();
              this.comMethods.checkDataType(res.statusMessage) == false ? this.errorService.handelError(res.statusCode) : this.comMethods.matSnackBar(res.statusMessage, 1);
            }
          }),
          error: (error: any) => {
            this.ngxSpinner.hide();
            this.comMethods.checkDataType(error.statusText) == false ? this.errorService.handelError(error.statusCode) : this.comMethods.matSnackBar(error.statusText, 1);
          }
        })
      }
      
    }
  }

  setOffer(event: any) {
    this.courseManageForm.controls['actual_price'].setValue('');
    this.offer = event.checked;
  }

  updateValidation() {
    if (this.offer) {
      this.courseManageForm.controls['actual_price'].setValidators([Validators.required]);
      this.courseManageForm.controls['actual_price'].updateValueAndValidity();
    } else {
      this.courseManageForm.controls['actual_price'].setValidators([]);
      this.courseManageForm.controls['actual_price'].updateValueAndValidity();
    }
  }

}

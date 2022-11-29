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

  courseManageForm!: FormGroup;
  displayedColumns: string[] = ['srno', 'image', 'course_Title', 'duration', 'price', 'action'];
  dataSource: any;
  pageNameArray = new Array();
  totalCount: number = 0;
  currentPage: number = 0;
  selRow: number = 0;
  imgSrc: string = '';
  editFlag: boolean = false;
  offer: boolean = false;

  @ViewChild(MatSort) sort!: MatSort;

  searchFilter = new FormControl();
  globalObj: any;

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
      course_Title: ['', Validators.required],
      course_Caption: ['', Validators.required],
      duration: ['', Validators.required],
      course_Description: ['', Validators.required],
      syllabus_Summary: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^\d*(\.)?(\d{0,3})?$/), Validators.maxLength(10)]],
      price_Terms: ['', Validators.required],
      imagePath: ['', Validators.required],
      actual_price: ['', [Validators.required, Validators.maxLength(10)]]
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
        // this.selRow = 0
        // this.currentPage = 0;
        // this.imgSrc = '';
        // this.file.nativeElement.value = '';
        // this.editFlag = false;
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
          this.pageNameArray = []
        }
      }),
      error: (error: any) => {
        this.comMethods.checkDataType(error.statusText) == false ? this.errorService.handelError(error.statusCode) : this.comMethods.matSnackBar(error.statusText, 1);
      }
    })
  }

  fileUpload(event: any) {
    this.fileUpl.uploadMultipleDocument(event, 'Upload', 'png,jpg,jpeg,hevc,jfif').subscribe((res: any) => {
      if (res.statusCode == '200') {
        this.imgSrc = res.responseData;
        this.courseManageForm.controls['imagePath'].setValue(this.imgSrc)
        this.comMethods.matSnackBar(res.statusMessage, 0)
      } else {
        this.imgSrc = '';
        this.file.nativeElement.value = ''
      }

    })
  }

  deleteImage() {
    this.imgSrc = ''
    this.file.nativeElement.value = ''
    this.courseManageForm.controls['imagePath'].setValue('')
  }

  onClickViewImage() {
    window.open(this.imgSrc, '_blank');
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
      actual_price: obj?.actual_price
    })
    this.getPageName();
    obj?.exclusive_offer == 1 ? this.offer = true : false;
    this.courseManageForm.controls['imagePath'].setValue(obj?.imagePath)
    this.imgSrc = obj?.imagePath;
  }

  pageChanged(event: any) {
    this.clearForm()
    this.currentPage = event.pageIndex;
    this.getAllCourseList();
  }

  openDeleteDialog(id: any) {
    this.selRow = id;
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
      this.selRow = 0;
      if (result == 'yes') {
        this.clearForm();
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
            }
          }),
          error: (error: any) => {
            this.comMethods.checkDataType(error.statusText) == false ? this.errorService.handelError(error.statusCode) : this.comMethods.matSnackBar(error.statusText, 1);
          }
        })
      } else {
        this.clearForm()
      }
    });
  }

  clearForm(clear?: any) {
    this.courseManageForm.reset()
    clear?.resetForm();
    this.imgSrc = '';
    this.file.nativeElement.value = '';
    this.editFlag = false;
    this.offer = false;
    this.courseManageFormData();
    this.selRow = 0;
  }

  onClickSubmit(clear: any) {
    this.updateValidation();
    if (!this.courseManageForm.valid) {
      if (!this.imgSrc) {
        this.comMethods.matSnackBar('Please Upload Course Image', 1)
        return
      }
      return;
    }
    else {
      this.ngxSpinner.show();
      let submitObj = {
        ...this.webStrorage.createdByProps(),
        ... this.courseManageForm.value
      }
      submitObj.exclusive_offer = this.offer ? 1 : 0;
      submitObj.actual_price = submitObj.exclusive_offer == 0 ? 0 : submitObj.actual_price;
      let url = this.editFlag ? 'whizhack_cms/course/Update' : 'whizhack_cms/course/Insert'

      this.api.setHttp(this.editFlag ? 'put' : 'post', url, false, submitObj, false, 'whizhackService');
      this.api.getHttp().subscribe({
        next: ((res: any) => {
          if (res.statusCode == '200') {
            this.ngxSpinner.hide();
            this.selRow = 0;
            this.comMethods.matSnackBar(res.statusMessage, 0)
            this.getAllCourseList();
            this.clearForm(clear);
          } else {
            this.comMethods.matSnackBar(res.statusMessage, 1)
          }
        }),
        error: (error: any) => {
          this.comMethods.checkDataType(error.statusText) == false ? this.errorService.handelError(error.statusCode) : this.comMethods.matSnackBar(error.statusText, 1);
        }
      })
    }
  }

  setOffer(event: any) {
    this.courseManageForm.controls['actual_price'].setValue('')
    this.offer = event.checked
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

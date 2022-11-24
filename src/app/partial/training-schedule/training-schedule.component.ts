import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/core/services/api.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { FormValidationService } from 'src/app/core/services/form-validation.service';
import { ConfirmationModalComponent } from 'src/app/dialogs/confirmation-modal/confirmation-modal.component';
import { ViewTrainingScheduleComponent } from './view-training-schedule/view-training-schedule.component';



@Component({
  selector: 'app-training-schedule',
  templateUrl: './training-schedule.component.html',
  styleUrls: ['./training-schedule.component.css']
})
export class TrainingScheduleComponent implements OnInit {
  @ViewChild('uploadDocument') file!: ElementRef;

  courseManageForm!: FormGroup;
  fillterForm!: FormGroup;
  displayedColumns: string[] = ['srno', 'image', 'course_Title', 'duration', 'price', 'action'];
  dataSource :any;
  pageNameArray = new Array();

  totalCount: number = 0;
  currentPage: number = 0;
  imgSrc: string = '';
  editFlag: boolean = false;
  sumitted: boolean = false;

  @ViewChild(MatSort) sort!: MatSort;
  title: string = '';

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private fileUpl: FileUploadService,
    private api: ApiService,
    private errorService: ErrorHandlerService,
    private ngxSpinner: NgxSpinnerService,
    private snakBar: MatSnackBar,
    public vadations :FormValidationService) { }

  openDialog(id: any) {
    const dialogRef = this.dialog.open(ViewTrainingScheduleComponent, {
      width: '750px',
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
    this.courseManageFormData();
    this.fillterFormData();
    this.getPageName();
    this.getAllCourseList();
  }

  fillterFormData(){
    this.fillterForm = this.fb.group({
      courseTitle:['']
    })
  }



  courseManageFormData() {
    this.courseManageForm = this.fb.group({
      createdBy: 0,
      modifiedBy: 0,
      createdDate: "2022-11-22T12:17:01.881Z",
      modifiedDate: "2022-11-22T12:17:01.881Z",
      isDeleted: true,
      id: 0,
      pageName: ['', Validators.required],
      course_Title: ['', [Validators.required,Validators.pattern(this.vadations.alphabetsWithSpace)]],
      course_Caption: ['', [Validators.required,Validators.pattern(this.vadations.alphabetsWithSpace)]],
      duration: ['', Validators.required],
      course_Description: ['', Validators.required],
      syllabus_Summary: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(this.vadations.onlyNumbers)]],
      price_Terms: ['', Validators.required],
      imagePath: ['', Validators.required]
    })
  }

  get formControls() { return this.courseManageForm.controls }

  getAllCourseList() {
    this.ngxSpinner.show()
    this.api.setHttp('get', 'whizhack_cms/course/GetAllCourses?pageno=' + (this.currentPage + 1) + '&pagesize=10&course_Title='+this.title, false, false, false, 'whizhackService');
    this.api.getHttp().subscribe({
      next: ((res: any) => {
        if (res.statusCode === '200') {
          this.ngxSpinner.hide()
          this.dataSource =  new MatTableDataSource(res.responseData); 
          this.dataSource.sort = this.sort;       
          this.totalCount = res.responseData1.pageCount;
          this.snakBar.open(res.statusMessage, 'ok', {
            duration: 2000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          })
        }else{
          this.ngxSpinner.hide()
          this.dataSource = '';
          this.totalCount = 0
        }
      }),
      error: (error: any) => {
        this.errorService.handelError(error.statusMessage)
      }
    })
  }

  getPageName() {
    this.api.setHttp('get', 'whizhack_cms/course/getPageList', false, false, false, 'whizhackService');
    this.api.getHttp().subscribe({
      next: ((res: any) => {
        if (res.statusCode === '200') {
          this.pageNameArray = res.responseData;
        }
      }),
      error: (error: any) => {
        this.errorService.handelError(error.statusMessage)
      }
    })
  }

  fileUpload(event: any) {
    console.log(event);
    this.fileUpl.uploadMultipleDocument(event, 'Upload', 'png,jpg,jpeg').subscribe((res: any) => {
      console.log('res', res);
      if (res.statusCode === '200') {
        this.imgSrc = res.responseData;
        this.courseManageForm.controls['imagePath'].setValue(this.imgSrc)
        this.snakBar.open(res.statusMessage, 'ok', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        })
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
    console.log(obj);

    this.editFlag = true;
    this.courseManageForm.patchValue({
      id: obj.courseId,
      pageName: obj.pageName,
      course_Title: obj.course_Title,
      course_Caption: obj.course_Caption,
      duration: obj.duration,
      course_Description: obj.course_Description,
      syllabus_Summary: obj.syllabus_Summary,
      price: obj.price,
      price_Terms: obj.price_Terms,
      // imagePath: obj?.imagePath
    })
    this.courseManageForm.controls['imagePath'].setValue(obj?.imagePath)
    this.imgSrc = obj?.imagePath;
    // this.file.nativeElement.value = obj?.imagePath;
  }

  pageChanged(event: any) {
    this.clearForm()
    this.currentPage = event.pageIndex;
    this.getAllCourseList();
  }

  openDeleteDialog(id: any) {
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
        this.clearForm();
        let deleteObj = {
          "id": id,
          "modifiedBy": 0,
        }
        this.api.setHttp('delete', 'whizhack_cms/course/Delete', false, deleteObj, false, 'whizhackService');
        this.api.getHttp().subscribe({
          next: ((res: any) => {
            if (res.statusCode === '200') {
              this.getAllCourseList();
            }
          }),
          error: (error: any) => {
            this.errorService.handelError(error.statusMessage)
          }
        })
      }
    });
  }

  clearForm(clear?:any) {
    console.log(clear);
    
    this.courseManageForm.reset()
    clear?.resetForm();
    this.imgSrc = '';
    this.file.nativeElement.value = '';
    this.editFlag = false;
    this.courseManageFormData();
  }

  onClickSubmit(clear:any) {
    // this.sumitted = true
    if (!this.courseManageForm.valid) {
      if(!this.imgSrc){
        this.snakBar.open('Please Upload Image', 'ok', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'right',        
        })
      }     
      return;
    } 
     else {
      let submitObj = this.courseManageForm.value;
      console.log(submitObj);
      let url
      this.editFlag ? url = 'whizhack_cms/course/Update' : url = 'whizhack_cms/course/Insert'

      this.api.setHttp(this.editFlag ? 'put' : 'post', url, false, submitObj, false, 'whizhackService');
      this.api.getHttp().subscribe({
        next: ((res: any) => {
          if (res.statusCode === '200') {
            this.snakBar.open(res.statusMessage, 'ok', {
              duration: 2000,
              verticalPosition: 'top',
              horizontalPosition: 'right',
            })
            this.getAllCourseList();
            this.clearForm(clear);
          }
        }),
        error: (error: any) => {
          this.errorService.handelError(error.statusMessage)
        }
      })
    }
  }

  onFillterSubmit(){
    this.title = this.fillterForm.value.courseTitle;
    this.getAllCourseList()
  }

}

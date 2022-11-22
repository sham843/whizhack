import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { ViewTrainingScheduleComponent } from './view-training-schedule/view-training-schedule.component';



@Component({
  selector: 'app-training-schedule',
  templateUrl: './training-schedule.component.html',
  styleUrls: ['./training-schedule.component.css']
})
export class TrainingScheduleComponent implements OnInit {
  @ViewChild('uploadDocument') file!: ElementRef;

  courseManageForm!: FormGroup;
  displayedColumns: string[] = ['srno', 'image', 'title', 'duration', 'price', 'action'];
  dataSource = new Array();
  pageNameArray = new Array();

  totalCount: number = 0;
  currentPage: number = 0;
  imgSrc: string = '';

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private fileUpl: FileUploadService,
    private api: ApiService) { }

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
    this.getPageName();
    this.getAllCourseList();
  }

  courseManageFormData() {
    this.courseManageForm = this.fb.group({
      pageId: ['', Validators.required],
      course_Title: ['', Validators.required],
      course_Caption: ['', Validators.required],
      courseDuration: ['', Validators.required],
      course_Description: ['', Validators.required],
      syllabus_Summary: ['', Validators.required],
      price: ['', Validators.required],
      price_Terms: ['', Validators.required],
      imagePath: ['', Validators.required]
    })
  }


  getPageName() {
    this.api.setHttp('get', 'whizhack_cms/course/getPageList', false, false, false, 'whizhackService');
    this.api.getHttp().subscribe({
      next: ((res: any) => {
        console.log('res',res);
        if (res.statusCode === '200') {
          this.pageNameArray = res.responseData;
        }
      }),
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  fileUpload(event: any) {
    console.log(event);
    this.fileUpl.uploadDocuments(event, 'Upload', 'png,jpg').subscribe((res: any) => {
      console.log('res',res);
      if (res.statusCode === '200') {
        this.imgSrc = res.responseData
      }else{
        this.imgSrc = '';
        this.file.nativeElement.value=''
      }

    })
  }

  getAllCourseList() {
    this.api.setHttp('get', 'whizhack_cms/course/GetAllCourses?pageno=' + (this.currentPage + 1) + '&pagesize=10', false, false, false, 'whizhackService');
    this.api.getHttp().subscribe({
      next: ((res: any) => {
        if (res.statusCode === '200') {
          this.dataSource = res.responseData
          this.totalCount = res.responseData1.pageCount

        }
      }),
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  editCourse(obj: any) {
    console.log(obj);

    this.courseManageForm.patchValue({
      pageId: obj.pageId,
      course_Title: obj.course_Title,
      course_Caption: obj.course_Caption,
      courseDuration: obj.price_Terms.split(' ').slice(1, 3).join(' '),
      course_Description: obj.course_Description,
      syllabus_Summary: obj.syllabus_Summary,
      price: obj.price,
      price_Terms: obj.price_Terms
      // uploadDocument: obj.uploadDocument
    })
  }

  pageChanged(event: any) {
    this.currentPage = event.pageIndex;
    this.getAllCourseList();
  }

  onClickSubmit() {
    let submitObj = this.courseManageForm.value;
    submitObj.imagePath = this.imgSrc;
    console.log(submitObj);

    this.api.setHttp('post', 'whizhack_cms/course/Insert', false, submitObj, false, 'whizhackService');
    this.api.getHttp().subscribe({
      next: ((res: any) => {
        if (res.statusCode === '200') {
         this.getAllCourseList();
        }
      }),
      error: (error: any) => {
        console.log(error);
      }
    })

  }

  deleteImage() {
    this.imgSrc = ''
    this.file.nativeElement.value = ''
  }

  onClickViewImage() {
    window.open(this.imgSrc, '_blank');
  }
}

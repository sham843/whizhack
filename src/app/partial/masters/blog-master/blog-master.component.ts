import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { FormValidationService } from 'src/app/core/services/form-validation.service';
import { ConfirmationModalComponent } from 'src/app/dialogs/confirmation-modal/confirmation-modal.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';

export interface PeriodicElement {
  name: string;
  position: number;
  type: string;
  symbol: string;
}
// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Cyber Attacks You Should Know About: Caution Time!',type: 'Blog',  symbol: 'H'},
//   {position: 2, name: 'Cybersecurity As A Career Option In India: Skills & Scope',type: 'Case Study',  symbol: 'He'},
//   {position: 3, name: 'Future and Present of Hacking',type: 'White Paper', symbol: 'Li'},
//   {position: 4, name: 'AI and the Evolving Threat Landscape',type: 'Blog',symbol: 'Be'},
//   {position: 5, name: 'Is Absolute Cybersecurity an Utopian Dream?',type: 'Case Study',  symbol: 'B'},
//   {position: 6, name: 'Top Reasons To Join IIT Jodhpur TISC',type: 'Case Study',  symbol: 'C'},
//   {position: 7, name: 'How To Select The Best Place To Learn Cyber Security',type: 'White Paper', symbol: 'N'},
//   {position: 8, name: 'Cyber Security Courses for Beginners to Build a Successful Caree',type: 'Blog', symbol: 'O'},
//   {position: 9, name: 'Why Cyber Security Training Programs and Certifications are Worth It',type: 'Blog', symbol: 'F'},
//   {position: 10, name: 'Top Career Prospects After Completing Cyber Security Courses Online',type: 'Case Study', symbol: 'Ne'},
// ];
@Component({
  selector: 'app-blog-master',
  templateUrl: './blog-master.component.html',
  styleUrls: ['./blog-master.component.css']
})
export class BlogMasterComponent implements OnInit {
  @ViewChild('uploadDocument') file!: ElementRef;
  displayedColumns: string[] = ['position', 'name', 'type', 'symbol'];
  dataSource = ELEMENT_DATA;
  imgSrc: string = '';
  frm!: FormGroup;
  filterFrm!:FormGroup;
  blogRegisterDetailsModel!: FormArray;
  isSubBlogAdd: boolean = true;
  totalCount: number = 0;
  currentPage: number = 0;
  editFlag: boolean = false;
  optionsArray: any[] = [{ id: 1, name: 'Blog' }, { id: 2, name: 'White Paper' }, { id: 3, name: 'Case Study' }];
  blogCategoryArray = new Array();
  get f() { return this.frm.controls }
  get itemsForm(): FormArray {
    return this.frm.get('blogRegisterDetailsModel') as FormArray;
  }

  constructor(public dialog: MatDialog,
    private fb: FormBuilder,
    private service: ApiService,
    private errorHandler: ErrorHandlerService,
    private fileUpl: FileUploadService,
    public validation: FormValidationService) { }

  openDialog(id: any): void {
    this.dialog.open(BlogDetailsComponent, {
      width: '1024px',
      data: id
    });
  }

  ngOnInit(): void {
    this.getCategory();
    this.controlForm();
    this.controlFilterForm();
    this.displayData();
  }

  controlFilterForm(){
    this.filterFrm = this.fb.group({
      blogType:[0]
    })
  }

  controlForm() {
    this.frm = this.fb.group({
      id: 0,
      title: ['', Validators.required],
      description: ['', Validators.required],
      blog_categary_Id: [, Validators.required],
      author: ['', Validators.required],
      isPublish: false,
      imagePath: ['', Validators.required],
      blogType: ['', Validators.required],
      createdBy: 0,
      modifiedBy: 0,
      createdDate: "2022-11-23T12:29:30.815Z",
      modifiedDate: "2022-11-23T12:29:30.815Z",
      isDeleted: true,
      // key: 0,
      blogRegisterDetailsModel: this.fb.array([
        this.fb.group({
          id: 0,
          blog_Register_Id: 0,
          title: ['', Validators.required],
          description: ['', Validators.required],
          key: 0,
          createdBy: 0,
          modifiedBy: 0,
          createdDate:  "2022-11-23T12:29:30.815Z",
          modifiedDate: "2022-11-23T12:29:30.815Z",
          isDeleted: false,
        })
      ])
    })
  }

  getCategory() {
    this.service.setHttp('get', 'whizhack_cms/Blogregister/getCategory', false, false, false, 'whizhackService');
    this.service.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == '200') {
          this.blogCategoryArray = res.responseData;
        }
      }
    })
  }

  addItem() {
    let fg = this.fb.group({
      title: [''],
      description: [''],
    });
    if (this.isSubBlogAdd == true) {
      if (this.frm.value.blogRegisterDetailsModel.length > 0) {
        if (this.frm.value.blogRegisterDetailsModel[this.frm.value.blogRegisterDetailsModel.length - 1].title && this.frm.value.blogRegisterDetailsModel[this.frm.value.blogRegisterDetailsModel.length - 1].description) {
          this.itemsForm.push(fg);
        } else {
          alert('Fill Blog Sub Details')
        }
      }
      else {
        this.itemsForm.push(fg);
      }
    }
    this.isSubBlogAdd = true;
  }

  displayData() {
    this.service.setHttp('get', 'whizhack_cms/Blogregister/GetAllBlogRegisterByPagination?pageno=' + (this.currentPage + 1) + '&pagesize=10&blogtype='+ this.filterFrm.value.blogType, false, false, false,
      'whizhackService');
    this.service.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == '200') {
          this.dataSource = res.responseData.responseData1;
          this.totalCount = res.responseData.responseData2.pageCount;
        }
        else {
          this.dataSource = [];
        }
      }, error: (error: any) => {
        this.errorHandler.handelError(error.status);
      }
    })
  }

  clearForm(){
    this.frm.reset();
    this.imgSrc = '';
    this.file.nativeElement.value = '';
    this.editFlag = false;
    this.controlForm()
  }

  fileUpload(event: any) {
    this.fileUpl.uploadDocuments(event, 'Upload', 'png,jpg').subscribe((res: any) => {
      if (res.statusCode === '200') {
        this.imgSrc = res.responseData
        this.frm.controls['imagePath'].setValue(this.imgSrc);
      } else {
        this.imgSrc = '';
        this.frm.value.imagePath = '';
        this.file.nativeElement.value = ''
      }
    })
  }

  onClickSubmit() {
    console.log(this.frm.value,'yyy');
    
    if (!this.frm.valid) {
      alert('warning');
      return;
    } else {
      alert('success')
      let postObj = this.frm.value;

      let url;
      this.editFlag ? url = 'whizhack_cms/Blogregister/UpdateBlogRegister' : url = 'whizhack_cms/Blogregister/InsertBlogRegister'

      this.service.setHttp(this.editFlag ? 'put':'post', url , false, postObj, false, 'whizhackService');
      this.service.getHttp().subscribe({
        next: ((res: any) => {
          if (res.statusCode == '200') {
            this.clearForm();
            this.displayData();
            this.editFlag = false;
          }
        }),
        error: (error: any) => {
          console.log(error);
        }
      })
    }
  }

  onClickEdit(editObj: any) {
    console.log(editObj,'editObj');
    
    this.imgSrc = editObj?.imagePath;
    this.editFlag = true;
    this.frm.patchValue({
      id: editObj.id,
      blogType: editObj.blogType,
      title: editObj.title,
      description: editObj.description,
      blog_categary_Id: editObj.blog_categary_Id,
      author: editObj.author,
      imagePath:editObj?.imagePath,
      blogRegisterDetailsModel: editObj.blogRegisterDetailsModel
    });
    this.itemsForm.removeAt(0);
    editObj.blogRegisterDetailsModel.map((element:any) => { 
     let fg = this.fb.group({
      createdBy: 0,
      modifiedBy: 0,
      createdDate: "2022-11-23T12:31:04.451Z",
      modifiedDate: "2022-11-23T12:31:04.451Z",
      isDeleted: true,
      blog_Register_Id: 0,
      id: [element.id],
      title: [element.title, [Validators.minLength(2), Validators.maxLength(200)]],
      description: [element.description, [Validators.minLength(2)]],
    });
		this.itemsForm.push(fg);
    })
    this.imgSrc = editObj.imagePath;
    this.file.nativeElement.value = editObj?.imagePath;
  }

  onClickDelete(id: any) {
    let dialoObj = {
      title:'Do you want to delete the selected course ?',
      cancelButton:'Cancel',
      okButton:'Ok'
    }
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '300px',
      data: dialoObj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == 'yes'){
        let deleteObj = 
          {
            "id": id,
            "modifiedBy": 0
          }
    
        this.service.setHttp('delete', 'whizhack_cms/Blogregister/DeleteById', false, deleteObj, false, 'whizhackService');
        this.service.getHttp().subscribe({
          next: ((res: any) => {
            if (res.statusCode === '200') {
              this.displayData();
            }
          }),
          error: (error: any) => {
            console.log(error);
          }
        })
      }else{
        this.displayData();
      }
    });
  }


  viewImage() {
    window.open(this.imgSrc, '_blank');
  }

  deleteImage() {
    this.imgSrc = ''
    this.file.nativeElement.value = ''
  }

  onClickPaginatior(event: any) {
    this.currentPage = event.pageIndex;
    this.displayData();
  }
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: '', type: '', symbol: '' }
];

export interface PeriodicElement {
  position: number;
  name: string;
  type: string;
  symbol: string;
}
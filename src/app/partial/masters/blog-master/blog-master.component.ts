import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonMethodService } from 'src/app/core/services/common-method.service';
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
  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective
  displayedColumns: string[] = ['position', 'name', 'type','blog_categary_Id','symbol'];
  dataSource = ELEMENT_DATA;
  imgSrc: string = '';
  frm!: FormGroup;
  filterFrm!:FormGroup;
  blogRegisterDetailsModel!: FormArray;
  isSubBlogAdd: boolean = true;
  totalCount: number = 0;
  currentPage: number = 0;
  editFlag: boolean = false;
  radioFlag:boolean = false;
  optionsArray: any[] = [{ id: 1, name: 'Blog' }, { id: 2, name: 'White Paper' }, { id: 3, name: 'Case Study' }];
  optionsFilterArray: any[] = [{ id: 0, name: 'All' },{ id: 1, name: 'Blog' }, { id: 2, name: 'White Paper' }, { id: 3, name: 'Case Study' }];
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
    private commonMethod : CommonMethodService,
    private ngxspinner : NgxSpinnerService, 
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
      createdDate: new Date(),
      modifiedDate: new Date(),
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
          createdDate:  new Date(),
          modifiedDate: new Date(),
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

  createItem(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required ,Validators.maxLength(200)]],
      description: ['', [Validators.required]],
    });
  }

  addItem() {
    let fg = this.fb.group({
      blog_Register_Id: 0,
      title: ['', Validators.required],
      description: ['', Validators.required],
      key: 0,
      createdBy: 0,
      modifiedBy: 0,
      createdDate:  new Date(),
      modifiedDate: new Date(),
      isDeleted: false,
    });
    if (this.isSubBlogAdd == true) {
      if (this.frm.value.blogRegisterDetailsModel.length > 0) {
        if (this.frm.value.blogRegisterDetailsModel[this.frm.value.blogRegisterDetailsModel.length - 1].title && this.frm.value.blogRegisterDetailsModel[this.frm.value.blogRegisterDetailsModel.length - 1].description) {
          this.itemsForm.push(fg);
        } else {
          this.commonMethod.matSnackBar('Please, Enter Sub-Title and Sub-Description !',1)
        }
      }
      else {
        this.itemsForm.push(fg);
      }
    }
    this.isSubBlogAdd = true;
    console.log(this.itemsForm,'formArray');
    
  }

  removeItem(i:number){
    this.itemsForm.removeAt(i)
  }
  
  filterData(){
    this.currentPage = 0;
    this.displayData();
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

  clearForm(formDirective?:any){
    this.imgSrc = '';
    this.file.nativeElement.value = '';
    this.controlForm();
    formDirective?.resetForm();
    this.editFlag = false;
    this.radioFlag = false;
  }

  fileUpload(event: any) {
    this.ngxspinner.show();
    this.fileUpl.uploadMultipleDocument(event, 'Upload', 'png,jpg').subscribe((res: any) => {
      if (res.statusCode === '200') {
        this.ngxspinner.hide();
        this.imgSrc = res.responseData
        this.frm.controls['imagePath'].setValue(this.imgSrc);
      } else {
        this.imgSrc = '';
        this.frm.value.imagePath = '';
        this.file.nativeElement.value = ''
      }
    })
  }

  onClickSubmit(formDirective?:any) {
    if(this.itemsForm.controls[this.itemsForm.length-1].status == 'INVALID'){
      if(!this.frm.value.blogType){
        this.radioFlag=true;
      }
      return;
    }
    else
    {
      if(this.frm.value.imagePath == ''){
        this.commonMethod.matSnackBar('please, Upload Image !',1)
      if (!this.frm.valid) {
        return;
      }
    }
      else{
        // this.ngxspinner.show();
        let postObj = this.frm.value;
  
        let url;
        this.editFlag ? url = 'whizhack_cms/Blogregister/UpdateBlogRegister' : url = 'whizhack_cms/Blogregister/InsertBlogRegister'
        this.service.setHttp(this.editFlag ? 'put':'post', url , false, postObj, false, 'whizhackService');
        this.service.getHttp().subscribe({
          next: ((res: any) => {
            if (res.statusCode == '200') {
              // this.ngxspinner.hide();
              formDirective?.resetForm();
              this.imgSrc = '';
              this.file.nativeElement.value = '';
              this.controlForm();
              this.displayData();
              this.commonMethod.matSnackBar(res.statusMessage, 0)
              this.editFlag = false;
            }
          }),
          error: (error: any) => {
            console.log(error);
          }
        })
      }
    
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
      createdDate: new Date(),
      modifiedDate: new Date(),
      isDeleted: true,
      blog_Register_Id: 0,
      id: [element.id],
      title: [element.title, [Validators.maxLength(200)]],
      description: [element.description],
    });
		this.itemsForm.push(fg);
    })
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
        this.clearForm();
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
        this.clearForm();
      }
    });
  }


  viewImage() {
    window.open(this.imgSrc, '_blank');
  }

  deleteImage() {
    this.imgSrc = ''
    this.file.nativeElement.value = ''
    this.frm.controls['imagePath'].setValue('');
  }

  onClickPaginatior(event: any) {
    this.currentPage = event.pageIndex;
    this.clearForm();
    this.displayData();
  }
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: '', type: '',blog_categary_Id: 1, symbol: '' }
];

export interface PeriodicElement {
  position: number;
  name: string;
  type: string;
  blog_categary_Id: number
  symbol: string;
}
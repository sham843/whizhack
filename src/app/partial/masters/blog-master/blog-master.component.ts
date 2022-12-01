import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonMethodService } from 'src/app/core/services/common-method.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { FormValidationService } from 'src/app/core/services/form-validation.service';
import { WebStorageService } from 'src/app/core/services/web-storage.service';
import { ConfirmationModalComponent } from 'src/app/dialogs/confirmation-modal/confirmation-modal.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';

@Component({
  selector: 'app-blog-master',
  templateUrl: './blog-master.component.html',
  styleUrls: ['./blog-master.component.css']
})
export class BlogMasterComponent implements OnInit {
  @ViewChild('uploadDocument') file!: ElementRef;
  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective
  displayedColumns: string[] = ['position', 'name', 'type', 'blog_categary_Id', 'symbol'];
  dataSource: any;
  imgSrc: string = '';
  frm!: FormGroup;
  filterFrm!: FormGroup;
  blogRegisterDetailsModel!: FormArray;
  totalCount: number = 0;
  currentPage: number = 0;
  editFlag: boolean = false;
  radioFlag: boolean = false;
  imageFlag: boolean = false;
  optionalFlag: boolean = false;
  optionsArray: any[] = [{ id: 1, name: 'Blog' }, { id: 2, name: 'White Paper' }, { id: 3, name: 'Case Study' }];
  optionsFilterArray: any[] = [{ id: 0, name: 'All' }, { id: 1, name: 'Blog' }, { id: 2, name: 'White Paper' }, { id: 3, name: 'Case Study' }];
  blogCategoryArray = new Array();
  selRow: number = 0;
  imgTooltip!:any;
  get f() { return this.frm.controls }

  get itemsForm(): FormArray {
    return this.frm.get('blogRegisterDetailsModel') as FormArray;
  }

  constructor(public dialog: MatDialog,
    private fb: FormBuilder,
    private webService: WebStorageService,
    private service: ApiService,
    private errorHandler: ErrorHandlerService,
    private fileUpl: FileUploadService,
    private commonMethod: CommonMethodService,
    private ngxspinner: NgxSpinnerService,
    public validation: FormValidationService) { }


  ngOnInit(): void {
    this.getCategory();
    this.controlForm();
    this.controlFilterForm();
    this.displayData();
  }

  controlFilterForm() {
    this.filterFrm = this.fb.group({
      blogType: [0]
    })
  }

  controlForm() {
    this.frm = this.fb.group({
      id: [0],
      title: ['', Validators.required],
      description: ['', Validators.required],
      blog_categary_Id: [, Validators.required],
      author: ['', [Validators.required, Validators.pattern(this.validation.authorName)]],
      isPublish: [false],
      imagePath: ['', Validators.required],
      blogType: ['', Validators.required],
      createdBy: [this.webService.getUserId()],
      modifiedBy: [0],
      createdDate: [new Date()],
      modifiedDate: [new Date()],
      isDeleted: [false],
      // key: 0,
      blogRegisterDetailsModel: this.fb.array([
        this.fb.group({
          id: [0],
          blog_Register_Id: [0],
          title: ['', Validators.required],
          description: ['',Validators.required],
          key: [0],
          createdBy: [this.webService.getUserId()],
          modifiedBy: [0],
          createdDate: [new Date()],
          modifiedDate: [new Date()],
          isDeleted: [false],
        })
      ])
    })
  }

  openDialog(id: any): void {
    this.selRow = id;
    this.editFlag ? this.clearForm() : '';
    const dialogRef = this.dialog.open(BlogDetailsComponent, {
      width: '1024px',
      data: id
    });
    dialogRef.afterClosed().subscribe(_result => {
      this.selRow = 0;
    })
  }

  getCategory() {
    this.service.setHttp('get', 'whizhack_cms/Blogregister/getCategory', false, false, false, 'whizhackService');
    this.service.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == '200') {
          this.blogCategoryArray = res.responseData;
        }
      }, error: (error: any) => {
        this.commonMethod.checkDataType(error.statusText) == false ? this.errorHandler.handelError(error.statusCode) : this.commonMethod.matSnackBar(error.statusText, 1);
      }
    })
  }

  // checkbox changes
  // onClickOptionalCheck(event:any){
  //   console.log(event.checked);
  //   event.checked ? this.optionalFlag = true : this.optionalFlag = false;
  // }
  // --

  addItem() {
    let fg = this.fb.group({
      blog_Register_Id: [0],
      title: ['', Validators.required],
      description: ['',Validators.required],
      key: [0],
      createdBy: [0],
      modifiedBy: [0],
      createdDate: [new Date()],
      modifiedDate: [new Date()],
      isDeleted: [false],
    });
    if (this.frm.value.blogRegisterDetailsModel.length > 0) {
      if (this.frm.value.blogRegisterDetailsModel[this.frm.value.blogRegisterDetailsModel.length - 1].title && this.frm.value.blogRegisterDetailsModel[this.frm.value.blogRegisterDetailsModel.length - 1].description) {
        this.itemsForm.push(fg);
      } else {
        this.commonMethod.matSnackBar('Please, Enter Sub-Title and Sub-Description !', 1)
      }
    }
    else {
      this.itemsForm.push(fg);
    }
  }

  removeItem(i: number) {
    this.itemsForm.removeAt(i)
  }

  filterData() {
    this.currentPage = 0;
    this.displayData();
  }

  displayData() {
    this.ngxspinner.show();
    this.service.setHttp('get', 'whizhack_cms/Blogregister/GetAllBlogRegisterByPagination?pageno=' + (this.currentPage + 1) + '&pagesize=10&blogtype=' + this.filterFrm.value.blogType, false, false, false,
      'whizhackService');
    this.service.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == '200') {
          this.ngxspinner.hide();
          this.dataSource = res.responseData.responseData1;
          this.totalCount = res.responseData.responseData2.pageCount;
        }
        else {
          this.ngxspinner.hide();
          this.dataSource = [];
        }
      }, error: (error: any) => {
        this.dataSource = [];
        this.ngxspinner.hide();
        this.commonMethod.checkDataType(error.statusText) == false ? this.errorHandler.handelError(error.statusCode) : this.commonMethod.matSnackBar(error.statusText, 1);
      }
    })
  }

  clearForm(formDirective?: any) {
    this.imgSrc = '';
    this.file.nativeElement.value = '';
    this.controlForm();
    formDirective?.resetForm();
    this.editFlag = false;
    this.radioFlag = false;
    this.imageFlag = false;
    this.imgTooltip = '';
  }

  fileUpload(event: any) {
    this.ngxspinner.show();
    this.fileUpl.uploadMultipleDocument(event, 'Upload', 'png,jpg,jfif').subscribe({
      next: ((res: any) => {
        if (res.statusCode == '200') {
          let uploadedUrl = res.responseData;
          this.imgTooltip = uploadedUrl.substring(uploadedUrl.lastIndexOf('/')+1);
          this.ngxspinner.hide();
          this.imgSrc = res.responseData
          this.frm.controls['imagePath'].setValue(this.imgSrc);
        } else {
          this.imgSrc = '';
          this.frm.value.imagePath = '';
          this.file.nativeElement.value = ''
        }
      }),
      error: (error: any) => {
        this.commonMethod.checkDataType(error.statusText) == false ? this.errorHandler.handelError(error.statusCode) : this.commonMethod.matSnackBar(error.statusText, 1);
        this.file.nativeElement.value = ''
        this.ngxspinner.hide();
      }
    })
  }


  get blogRegisterCtr():any{
    return  this.frm.controls['blogRegisterDetailsModel']as FormArray 
  }

  onClickSubmit(formDirective?: any) {
      this.radioFlag = true;
   if (this.frm.value.imagePath == '') {
      // this.commonMethod.matSnackBar('Please Upload Image !', 1)
      this.imageFlag = true;
    }
    else if (!this.frm.valid) {
      if (this.itemsForm.controls[this.itemsForm.length - 1].status == 'INVALID') {
        return;
      }
      return;
    } else {

      this.ngxspinner.show();
      let postObj = this.frm.value;
      postObj.title = this.frm.value.title.replace(/  +/g, ' ');

      let url;
      this.editFlag ? url = 'whizhack_cms/Blogregister/UpdateBlogRegister' : url = 'whizhack_cms/Blogregister/InsertBlogRegister'
      this.service.setHttp(this.editFlag ? 'put' : 'post', url, false, postObj, false, 'whizhackService');
      this.service.getHttp().subscribe({
        next: ((res: any) => {
          this.ngxspinner.hide();
          if (res.statusCode == '200') {
            this.selRow = 0;
            formDirective?.resetForm();
            this.imgSrc = '';
            this.file.nativeElement.value = '';
            this.controlForm();
            this.displayData();
            this.commonMethod.matSnackBar(res.statusMessage, 0)
            this.editFlag = false;
            this.radioFlag = false;
            this.imageFlag = false;
            this.imgTooltip = '';
          } else {
            this.commonMethod.checkDataType(res.statusMessage) == false ? this.errorHandler.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1);
          }
        }),
        error: (error: any) => {
          this.ngxspinner.hide();
          this.commonMethod.checkDataType(error.statusMessage) == false ? this.errorHandler.handelError(error.statusCode) : this.commonMethod.matSnackBar(error.statusMessage, 1);
        }
      })
    }
  }

  onClickEdit(editObj: any) {
    this.itemsForm.clear()
    // this.itemsForm.removeAt(0);
    this.selRow = editObj.id;
    this.imgSrc = editObj?.imagePath;
    this.editFlag = true;
    this.frm.patchValue({
      id: editObj.id,
      blogType: editObj.blogType,
      title: editObj.title,
      description: editObj.description,
      blog_categary_Id: editObj.blog_categary_Id,
      author: editObj.author,
      imagePath: editObj?.imagePath,
      // blogRegisterDetailsModel: editObj.blogRegisterDetailsModel
    });
    // this.itemsForm.removeAt(0);
    editObj.blogRegisterDetailsModel.map((element: any) => {
      let fg = this.fb.group({
        createdBy: element?.createdBy,
        modifiedBy: this.webService.getUserId(),
        createdDate: new Date(),
        modifiedDate: new Date(),
        isDeleted: true,
        blog_Register_Id: element?.blog_Register_Id,
        id: [element.id],
        title: [element.title,Validators.required],
        description: [element.description, Validators.required],
      });
      this.itemsForm.push(fg);
    })
  }

  onClickDelete(id: any) {
    this.selRow = id;
    let dialoObj = {
      header: 'Delete',
      title: 'Do You Want To Delete The Selected Content ?',
      cancelButton: 'Cancel',
      okButton: 'Ok'
    }
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '300px',
      data: dialoObj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'yes') {
         this.deleteBlogregister();
      } else {
        this.editFlag ? this.clearForm() : '';
      }
    });
  }

  deleteBlogregister(){
    let deleteObj = {
      "id": this.selRow,
      "modifiedBy": 0
    }

    this.service.setHttp('delete', 'whizhack_cms/Blogregister/DeleteById', false, deleteObj, false, 'whizhackService');
    this.service.getHttp().subscribe({
      next: ((res: any) => {
        if (res.statusCode == '200') {
          this.commonMethod.matSnackBar(res.statusMessage, 0);
          this.clearForm();
          this.displayData();
        }
      }),
      error: (error: any) => {
        this.commonMethod.checkDataType(error.statusText) == false ? this.errorHandler.handelError(error.statusCode) : this.commonMethod.matSnackBar(error.statusText, 1);
      }
    })
  }

  viewImage() {
    window.open(this.imgSrc, '_blank');
  }

  deleteImage() {
    this.imgSrc = ''
    this.file.nativeElement.value = ''
    this.frm.controls['imagePath'].setValue('');
    this.imgTooltip = '';
  }

  onClickPaginatior(event: any) {
    this.currentPage = event.pageIndex;
    this.editFlag ? this.clearForm() : '';
    this.displayData();
  }
}

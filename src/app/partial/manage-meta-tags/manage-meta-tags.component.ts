import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormValidationService } from 'src/app/core/services/form-validation.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonMethodService } from 'src/app/core/services/common-method.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { WebStorageService } from 'src/app/core/services/web-storage.service';
import { ConfirmationModalComponent } from 'src/app/dialogs/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-manage-meta-tags',
  templateUrl: './manage-meta-tags.component.html',
  styleUrls: ['./manage-meta-tags.component.css']
})
export class ManageMetaTagsComponent implements OnInit {

  displayedColumns: string[] = ['srNo', 'pageName', 'metaTitle', 'metadescription', 'actions'];
  dataSource: any;
  pageSize: number = 10;
  currentPage: number = 1;
  totalCount: any;
  allPageNameArray:any;
  @ViewChild(MatSort) sort!: MatSort;

  metaTagForm:FormGroup | any;
  @ViewChild('formDirective')
  private formDirective!: NgForm;
  btnText = 'Submit';
 
  constructor(public dialog: MatDialog,
    private apiService: ApiService,
    private error: ErrorHandlerService,
    public validation: FormValidationService,
    private spinner: NgxSpinnerService,
    private commonService: CommonMethodService,
    private webStrorage: WebStorageService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.defaultForm();
    this.getAllPageName();
    this.bindTable();
  }

  get f() { return this.metaTagForm.controls }

  defaultForm() {
    this.metaTagForm = this.fb.group({
      id:[0],
      pageNameId: ['', [Validators.required]],
      keyWords: ['', [Validators.required,Validators.pattern('^[^[ ]+|[ ][gm]+$')]],
      metaTitle: ['', [Validators.required,Validators.pattern('^[^[ ]+|[ ][gm]+$')]],
      metadescription: ['', [Validators.required,Validators.pattern('^[^[ ]+|[ ][gm]+$')]],
    });
  }

  getAllPageName() {
    this.apiService.setHttp('get', 'whizhack_cms/metatag/get-metatag-Pagelist', false, false, false, 'whizhackService');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == '200') {
          this.allPageNameArray = res.responseData;
        }
        else {
          this.allPageNameArray = [];
          this.commonService.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonService.matSnackBar(res.statusMessage, 1);
        }
      }, error: (error: any) => {
        this.error.handelError(error.statusCode);
      }
    })
  }

    //----------------------------Start Bind Table Logic Here--------------------
    bindTable() {
      this.spinner.show();
      this.apiService.setHttp('get', 'whizhack_cms/metatag/getall?pageno=' + this.currentPage + '&pagesize=10', false, false, false, 'whizhackService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => {
          if (res.statusCode == '200') {
            this.spinner.hide()
            this.dataSource = new MatTableDataSource(res.responseData.responseData1);
            this.dataSource.sort = this.sort;
            this.totalCount = res.responseData.responseData2.pageCount;
          }
          else {
            this.spinner.hide();
            this.dataSource = [];
          }
        },
        error: (error: any) => {
          this.spinner.hide();
          this.error.handelError(error.statusCode);
        }
      })
    }

    onClickPaginatior(event: any) {
      this.currentPage = event.pageIndex + 1;
      this.clearForm();
      this.bindTable();
    }

    pageId:any;

    onClickDelete(id: any) {
      this.pageId = id;
      let dialoObj = {
        header: 'Delete',
        title: 'Do You Want To Delete The Selected Content ?',
        cancelButton: 'Cancel',
        okButton: 'Delete'
      }
      const dialogRef = this.dialog.open(ConfirmationModalComponent, {
        width: '300px',
        data: dialoObj,
        disableClose:true
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result == 'yes') {
           this.deleteBlogregister();
        } else {
          // this.editFlag ? this.clearForm() : '';
        }
      });
    }

    deleteBlogregister(){
      let deleteObj = {
        "id": this.pageId,
        "modifiedBy": this.webStrorage.getUserId()
      }
  
      this.apiService.setHttp('delete', 'whizhack_cms/metatag/Delete', false, deleteObj, false, 'whizhackService');
      this.apiService.getHttp().subscribe({
        next: ((res: any) => {
          if (res.statusCode == '200') {
            this.commonService.matSnackBar(res.statusMessage, 0);
            this.clearForm();
            this.bindTable();
          }
        }),
        error: (error: any) => {
          this.commonService.checkDataType(error.statusText) == false ? this.error.handelError(error.statusCode) : this.commonService.matSnackBar(error.statusText, 1);
        }
      })
    }

    submitForm() {
      if (!this.metaTagForm.valid) {
        return;
      }else {
      let data = this.metaTagForm.value;

      let obj = {
        "createdBy": this.webStrorage.getUserId(),
        "modifiedBy": this.webStrorage.getUserId(),
        "createdDate": new Date(),
        "modifiedDate": new Date(),
        "isDeleted": false,
        "id": data?.id,
        "pageNameId": data?.pageNameId,
        "keyWords": data?.keyWords,
        "metaTitle": data?.metaTitle,
        "metadescription": data?.metadescription
      }
  
        this.apiService.setHttp('post', 'whizhack_cms/metatag/Insert', false, obj, false, 'whizhackService');
        this.apiService.getHttp().subscribe({
          next: ((res: any) => {
            if (res.statusCode === '200') {
              this.commonService.matSnackBar(res.statusMessage, 0);
              this.bindTable();
              this.clearForm();
            }else{
              this.commonService.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonService.matSnackBar(res.statusMessage, 1);
            }
          }),
          error: (error: any) => {
            this.error.handelError(error.status);
          }
        })
      }
    }
  
    clearForm() {
      this.btnText = 'Submit';
      this.formDirective && this.formDirective.resetForm();
      this.defaultForm();
    }

  editMetaTagFormData(obj: any) {
    this.btnText = 'Update';
    this.metaTagForm.patchValue({
      id: obj.id,
      pageNameId: obj.pageNameId,
      keyWords: obj.keyWords,
      metaTitle: obj.metaTitle,
      metadescription: obj.metadescription,
    })
    }

}

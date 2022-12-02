import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';

import { ApiService } from 'src/app/core/services/api.service';
import { CommonMethodService } from 'src/app/core/services/common-method.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { FormValidationService } from 'src/app/core/services/form-validation.service';
import { WebStorageService } from 'src/app/core/services/web-storage.service';
import { ConfirmationModalComponent } from 'src/app/dialogs/confirmation-modal/confirmation-modal.component';
@Component({
  selector: 'app-media-coverage',
  templateUrl: './media-coverage.component.html',
  styleUrls: ['./media-coverage.component.css']
})
export class MediaCoverageComponent implements OnInit {

  frmMedia!: FormGroup;
  submitBtnTxt: string = 'Submit';
  get f() { return this.frmMedia.controls };
  totalCount: number = 0;
  currentPage: number = 0;
  pageSize: number = 10;
  displayedColumns: string[] = ['srno', 'article_Title', 'source', 'url', 'action'];
  dataSource: any;
 reg = '';
  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;
  constructor(private fb: FormBuilder,
    public vs: FormValidationService,
    private api: ApiService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    public commonMethod: CommonMethodService,
    public error: ErrorHandlerService,
    public webStorageService: WebStorageService,
    public apiService: ApiService) { }

  ngOnInit(): void {
    this.createMediaForm();
    this.getMediaList();
  }
  createMediaForm() {
    this.frmMedia = this.fb.group({
      id: [0],
      article_Title: ['',Validators.compose([Validators.required,Validators.minLength(2)])],
      source: ['',Validators.compose([Validators.required,Validators.minLength(2)])],
      url: ['', [Validators.required,Validators.pattern('^(https?://)?(www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6}([-\\w@\\+\\.~#\\?&/=%]*)?$')]],
    })
  }
  onClickPaginatior(event: any) {
    this.currentPage = event.pageIndex;
    this.getMediaList();
  }

  getQueryString() {
    let str = "?pageno=" + (this.currentPage + 1) + "&pagesize=" + this.pageSize;
    return str;
  }

  getMediaList() {
    this.spinner.show();
    this.apiService.setHttp('get', "whizhack_cms/media/GetAllByPagination" + this.getQueryString(), false, false, false, 'whizhackService');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == 200) {
          this.dataSource = res.responseData?.responseData1;
          this.totalCount = res.responseData?.responseData2?.pageCount;
        } else {
          this.dataSource = [];
          this.totalCount = 0;
          this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1);
        }
        this.spinner.hide();
      },
      error: ((error: any) => { this.error.handelError(error.status); this.spinner.hide(); })
    })
  }

  onMediaSubmit(formDirective: any) {
    if (this.frmMedia.invalid) {
      return;
    } else {
      var req = {
        ...this.webStorageService.createdByProps(),
        ...this.frmMedia.value
      }
      this.apiService.setHttp((this.submitBtnTxt == 'Update' ? 'put' : 'post'), "whizhack_cms/media/" + (this.submitBtnTxt == 'Update' ? 'Update' : 'Register'), false, req, false, 'whizhackService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => {
          if (res.statusCode == 200) {
            this.spinner.hide();
            formDirective.resetForm();
            this.getMediaList();
            this.clearMediaForm(formDirective);
            this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 0);
          } else {
            this.spinner.hide();
            this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 1);
          }
        },
        error: ((error: any) => { this.error.handelError(error.status); this.spinner.hide(); })
      })
    }
  }

  editMediaRecord(data: any) {
    this.submitBtnTxt = 'Update'
    this.frmMedia.patchValue({
      id: data?.mediaId,
      article_Title: data?.article_Title,
      source: data?.source,
      url: data?.url,
    })
  }

  deleteMediaRecord(data: any, formDirective?: any) {
    let dialoObj = {
      header: 'Delete',
      title: 'Are you sure, you want to Delete ?',
      cancelButton: 'Cancel',
      okButton: 'Delete'
    }

    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '300px',
      data: dialoObj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'yes') {
        let deleteObj = {
          "id": data.mediaId,
          "modifiedBy": 0,
        }

        this.api.setHttp('delete', 'whizhack_cms/media/Delete', false, deleteObj, false, 'whizhackService');
        this.api.getHttp().subscribe({
          next: ((res: any) => {
            if (res.statusCode == 200) {
              this.commonMethod.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.commonMethod.matSnackBar(res.statusMessage, 0);
              this.getMediaList();
              this.clearMediaForm(formDirective);
            }
          }),
          error: () => {

          }
        })
      }
    });

  }

  clearMediaForm(formDirective?: any) {
    this.submitBtnTxt = 'Submit';
    formDirective.resetForm();
    // this.frmMedia.reset();
    this.createMediaForm();
  }

}

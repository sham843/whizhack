import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { FormValidationService } from 'src/app/core/services/form-validation.service';
import { ConfirmationModalComponent } from 'src/app/dialogs/confirmation-modal/confirmation-modal.component';
@Component({
  selector: 'app-media-coverage',
  templateUrl: './media-coverage.component.html',
  styleUrls: ['./media-coverage.component.css']
})
export class MediaCoverageComponent implements OnInit {

  frmMedia!:FormGroup;
  submitBtnTxt:string = 'Submit';
  get f() { return this.frmMedia.controls };
  totalCount: number = 0;
  currentPage: number = 0;

  displayedColumns: string[] = ['srno', 'title', 'action'];
  dataSource: any;
  
  constructor(private fb: FormBuilder, 
    public vs: FormValidationService,
    private api: ApiService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.createMediaForm();
    this.getMediaList();
  }

  createMediaForm(){
    this.frmMedia = this.fb.group({
      id: [0],
      article_Title: ['', [Validators.required]],
      source: ['', [Validators.required]],
      url: ['', [Validators.required]],
    })
  }

  onClickPaginatior(event:any){
    this.currentPage = event.pageIndex;
    this.getMediaList();
  }

  getMediaList(){

  }

  onMediaSubmit(){
    if(this.frmMedia.invalid){
      return;
    }else{

    }
  }

  editMediaRecord(data: any){
    this.submitBtnTxt = 'Update'
    this.frmMedia.patchValue({
      id: data.id,
      article_Title: data.article_Title,
      source: data.source,
      url: data.url,
    })
  }

  deleteMediaRecord(data: any){
    let dialoObj = {
      header: 'Delete',
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
        let deleteObj = {
          "id": data.id,
          "modifiedBy": 0,
        }
    
        this.api.setHttp('delete', 'whizhack_cms/course/Delete', false, deleteObj, false, 'whizhackService');
        this.api.getHttp().subscribe({
          next: ((res: any) => {
            if (res.statusCode === '200') {
              this.getMediaList();
            }
          }),
          error: (error: any) => {
            console.log(error);
          }
        })
      }
    });
    
  }

  clearMediaForm(){
    this.submitBtnTxt = 'Submit';
    this.frmMedia.reset();
    this.createMediaForm();
  }

}

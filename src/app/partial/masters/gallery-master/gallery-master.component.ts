import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { FormValidationService } from 'src/app/core/services/form-validation.service';
import { ConfirmationModalComponent } from 'src/app/dialogs/confirmation-modal/confirmation-modal.component';
@Component({
  selector: 'app-gallery-master',
  templateUrl: './gallery-master.component.html',
  styleUrls: ['./gallery-master.component.css']
})
export class GalleryMasterComponent implements OnInit {

  frmGallery!:FormGroup;
  get g() { return this.frmGallery.controls };
  @ViewChild('uploadDocument') uploadDocument!: ElementRef;
  totalCount: number = 0;
  currentPage: number = 0;

  displayedColumns: string[] = ['srno', 'title', 'action'];
  dataSource: any;

  constructor(private fb: FormBuilder, 
    public vs: FormValidationService,
    private fileUploadService: FileUploadService,
    private api: ApiService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.createMediaForm();
    this.getGalleryList();
  }

  createMediaForm(){
    this.frmGallery = this.fb.group({
      id: [0],
      gallery_title: ['', [Validators.required]],
      gallery_description: ['', [Validators.required]],
      uploadImages: ['', [Validators.required]],
    })
  }

  onClickPaginatior(event:any){
    this.currentPage = event.pageIndex;
    this.getGalleryList();
  }

  getGalleryList(){

  }

  mediaFileUpload(event: any) {
    console.log(event);
    this.fileUploadService.uploadDocuments(event, 'Upload', 'png,jpg,jpeg').subscribe((res: any) => {
      if (res.statusCode == 200) {

      }else{
        this.uploadDocument.nativeElement.value = ''
      }
    })
  }

  onMediaSubmit(){
    if(this.frmGallery.invalid){
      return;
    }else{

    }
  }

  editGalleryRecord(data: any){
    this.frmGallery.patchValue({
      gallery_title: data
    })
  }

  deleteGalleryRecord(data: any){
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
              this.getGalleryList();
            }
          }),
          error: (error: any) => {
            console.log(error);
          }
        })
      }
    });
    
  }

  clearGalleryForm(){
    this.frmGallery.reset();
    this.createMediaForm();
  }

}

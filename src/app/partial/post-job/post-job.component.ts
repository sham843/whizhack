import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Editor, Toolbar } from 'ngx-editor';
import { JobDetailsComponent } from './job-details/job-details.component';
import { FormGroup,FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
 import { ApiService } from 'src/app/core/services/api.service';
 import {ErrorHandlerService} from 'src/app/core/services/error-handler.service';
 import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationModalComponent } from 'src/app/dialogs/confirmation-modal/confirmation-modal.component';
import { FormValidationService } from 'src/app/core/services/form-validation.service';
import { NgxSpinnerService } from 'ngx-spinner';
export interface PeriodicElement {
  title: string;
  srno: number;
  location: string;
  postdate: string;
  lastdate: string;
  publish: string;
  actions: string;
}



@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css']
})
export class PostJobComponent implements OnInit {
  postNewJobFrm!:FormGroup;
  displayedColumns: string[] = ['srNo', 'job_Title', 'job_Location', 'date_of_Posting','date_of_Application','publish','actions'];
  dataSource:any;
  editFlag:boolean=false;
  buttonValue: string = 'Submit';
  pageSize: number = 10;
currentPage: number = 0;
 totalCount: any;
  constructor(public dialog: MatDialog,private fb:FormBuilder,
     private snackbar:MatSnackBar,
    private service:ApiService,
     private error:ErrorHandlerService,
     public validation: FormValidationService,
     private ngxSpinner: NgxSpinnerService,
    ) { }
    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(FormGroupDirective) formRef!: FormGroupDirective;
  editorRoles!: Editor;
  editorExperience!: Editor;
  editorQualification!: Editor;
  editorSkills!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['ordered_list', 'bullet_list'],
    ['link'],
  ];

  openDialog(): void {
    this.dialog.open(JobDetailsComponent,{
      width: '750px',
    });
  }

  ngOnInit(): void {
    this.formData();
    this.bindTable();
    this.editorRoles = new Editor();
    this.editorExperience = new Editor();
    this.editorQualification = new Editor();
    this.editorSkills = new Editor();
  }
// ----------------------------Start Form Field Here-------------------------------
  formData(){
    this.postNewJobFrm = this.fb.group({
      id: 0,
      job_Title: ['',Validators.required],
      job_Location: ['',Validators.required],
      date_of_Posting: ['',Validators.required],
      date_of_Application: ['',Validators.required],
      job_Description: ['',Validators.required],
      roles_and_Responsibility: ['',Validators.required],
      qualification: ['',Validators.required],
      experience:['',Validators.required],
      skills_Required:['',Validators.required],
      publish:true
    });
  }
  // ----------------------------End Form Field Here-------------------------------

  //---------------------------for Validation Handle---------------------------
  get f() {
    return this.postNewJobFrm.controls;
  }
  //---------------------------for Validation Handle---------------------------/

  //----------------------------Start Bind Table Logic Here--------------------
 bindTable(){
  this.ngxSpinner.show()
  this.service.setHttp('get','whizhack_cms/postjobs/GetAllPostJobs?pageno='+(this.currentPage+1)+'&pagesize=10',false,false,false,'whizhackService');
  this.service.getHttp().subscribe({
    next:(res:any)=>{
      if(res.statusCode == '200'){
        this.ngxSpinner.hide()
        this.dataSource=new MatTableDataSource(res.responseData);
        this.dataSource.sort =this.sort; 
        this.totalCount = res.responseData1.pageCount;
        console.log(this.dataSource)
        this.snackbar.open(res.statusMessage, 'ok', {
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        })
      }
      else{
        this.dataSource=[];
      }
    },
    error:(error:any)=>{
      console.log("Error:",error);
      this.error.handelError(error.statusCode);
    }
  })
}
//----------------------------End Bind Table Logic Here------------------------

//----------------------------view logic start Here------------------------
openDialog1(obj?: any) {
  const dialogRef = this.dialog.open(JobDetailsComponent, {
    height:'80%',
    width:'80%',
    data: obj,
    disableClose: true
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}
//----------------------------view logic End Here------------------------

//----------------------------Start Publish Button Logic Here------------------
// onClickToggle1(element:any){ 
//   let isPublishFlag = {
//     "id": element.jobpostId,
 
//    "publish": element.publish ? false : true
//   }
//   this.service.setHttp('put','whizhack_cms/postjobs/UpdatePublish',false,isPublishFlag,false,'whizhackService');
//   this.service.getHttp().subscribe({
//     next: (res: any) =>{
//       if(res.statusCode == '200')
//       {
//       this.bindTable();
//       console.log("Toggle",element);   
//       } 
//     }
//   })
// }
//----------------------------End Publish Button Logic Here------------------

onEdit(editObj:any){
  console.log("editobj",editObj)
  this.editFlag=true;
  this.buttonValue = 'Update';
  let obj1=editObj;
  this.postNewJobFrm.patchValue({
  createdBy: 0,
  modifiedBy: 0,
  createdDate:new Date(),
  modifiedDate:new Date(),
  isDeleted: true,
  id:obj1.jobpostId,
  job_Title:obj1.job_Title,
  job_Location:obj1.job_Location,
  date_of_Posting:obj1.date_of_Posting,
  date_of_Application:obj1.date_of_Application,
  job_Description:obj1.job_Description,
  roles_and_Responsibility:obj1.roles_and_Responsibility,
  qualification:obj1.qualification,
  experience:obj1.experience,
  skills_Required:obj1.skills_Required,
  publish:true
  })
}
//---------------------------------------------------------------------------------
onClickToggle(element: any) {
  let dialoObj = {
    title:'Do you want to publish the selected field ?',
    cancelButton:'Cancel',
    okButton:'Ok'
  }

  const dialogRef = this.dialog.open(ConfirmationModalComponent, {
    width: '300px',
    data: dialoObj
  });

  dialogRef.afterClosed().subscribe(result => {
    if(result == 'yes'){
      let isPublishFlag = {
        "id": element.jobpostId,
      // "publish": true
       "publish": element.publish ? false : true
      }
  
      this.service.setHttp('put','whizhack_cms/postjobs/UpdatePublish',false,isPublishFlag,false,'whizhackService');
      this.service.getHttp().subscribe({
        next: ((res: any) => {
          if (res.statusCode === '200') {
            this.bindTable();
          }
        }),
        error: (error: any) => {
          console.log(error);
        }
      })
    }else{
      this.bindTable();
    }
  });
}
//---------------------------Start Delete Logic Here---------------------------------------
openDeleteDialog(id: any) {
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
      let deleteObj = {
        "id": id,
        "modifiedBy": 0,
      }
  
      this.service.setHttp('delete', 'whizhack_cms/postjobs/Delete', false, deleteObj, false, 'whizhackService');
      this.service.getHttp().subscribe({
        next: ((res: any) => {
          if (res.statusCode === '200') {
            this.bindTable();
          }
        }),
        error: (error: any) => {
          console.log(error);
        }
      })
    }else{
      this.bindTable();
    }
  });
}
// ----------------------------End Delete Logic Here---------------------------
// ----------------------------Start Delete Logic Here-------------------------
onDelete(data:any){
 let obj={
    id: data.jobpostId,
  modifiedBy: 0
  }
  this.service.setHttp('delete','whizhack_cms/postjobs/Delete',false,obj,false,'whizhackService');
  this.service.getHttp().subscribe({
    next:(res:any)=>{
      if(res.statusCode == '200'){
        this.snackbar.open(res.statusMessage,'ok');
        this.bindTable();
      }
    },
    error:(error:any)=>{
      console.log("Error",error);
      this.error.handelError(error.statusCode);
    }
  })

}
// ----------------------------End Delete Logic Here-------------------------

// ----------------------------Start Submit Logic Here-------------------------
  onSubmit(clear:any) {
  if (!this.postNewJobFrm.valid) {      
      return;
    }  else {
      this.ngxSpinner.show();
      let data = this.postNewJobFrm.value;
    //  console.log(data);
      let url
      this.editFlag ? url = 'whizhack_cms/postjobs/Update' : url = 'whizhack_cms/postjobs/Insert'

      this.service.setHttp(this.editFlag ? 'put' : 'post', url, false, data, false, 'whizhackService');
      this.service.getHttp().subscribe({
        next: ((res: any) => {
          if (res.statusCode === '200') {
            this.ngxSpinner.hide();
            this.snackbar.open(res.statusMessage, 'ok', {
              duration: 2000,
              verticalPosition: 'top',
              horizontalPosition: 'right',
            })
            this.bindTable();
            // this.onClickClear(frm);
            // this.clearAll()
            this.clearForm(clear);
          }
        }),
        error: (error: any) => {
          console.log(error);
        }
      })
    }
  }
 // ----------------------------End Submit Logic Here-------------------------------
onClickClear(frm?:any){
  frm.resetForm();
  this.formData();
  this.buttonValue = 'Submit'
}
//------------------------------------Pagination Logic Start------------------------
paginationEvent(event: any) {
  this.clearForm()
  this.currentPage = event.pageIndex;
  this.pageSize = event.pageSize;
  this.bindTable();
}
clearAll(){
  this.formRef.resetForm();
}

clearForm(clear?:any) {
  console.log(clear);
  this.postNewJobFrm.reset()
  clear?.resetForm();
 this.editFlag = false;
  this.formData();
}
}

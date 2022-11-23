import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Editor, Toolbar } from 'ngx-editor';
import { JobDetailsComponent } from './job-details/job-details.component';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
 import { ApiService } from 'src/app/core/services/api.service';
 import {ErrorHandlerService} from 'src/app/core/services/error-handler.service';
 import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
export interface PeriodicElement {
  title: string;
  srno: number;
  location: string;
  postdate: string;
  lastdate: string;
  publish: string;
  actions: string;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   {srno: 1, title: 'Hydrogen', location: '1.0079', postdate: 'H', lastdate: 'H',publish:'',actions:''},
//   {srno: 2, title: 'Helium', location: '4.0026', postdate: 'He', lastdate: 'H',publish:'',actions:''},
//   {srno: 3, title: 'Lithium', location: '6.941', postdate: 'Li', lastdate: 'H',publish:'',actions:''},
//   {srno: 4, title: 'Beryllium', location: '9.0122', postdate: 'Be', lastdate: 'H',publish:'',actions:''},
//   {srno: 5, title: 'Boron', location: '10.811', postdate: 'B', lastdate: 'H',publish:'',actions:''},
//   {srno: 6, title: 'Carbon', location: '12.0107', postdate: 'C', lastdate: 'H',publish:'',actions:''},
//   {srno: 7, title: 'Nitrogen', location: '14.0067', postdate: 'N', lastdate: 'H',publish:'',actions:''},
//   {srno: 8, title: 'Oxygen', location: '15.9994', postdate: 'O', lastdate: 'H',publish:'',actions:''},
//   {srno: 9, title: 'Fluorine', location: '18.9984', postdate: 'F', lastdate: 'H',publish:'',actions:''},
//   {srno: 10, title: 'Neon', location: '20.1797', postdate: 'Ne', lastdate: 'H',publish:'',actions:''},
// ];

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css']
})
export class PostJobComponent implements OnInit {
  postNewJobFrm!:FormGroup;
  displayedColumns: string[] = ['srNo', 'job_Title', 'job_Location', 'date_of_Posting','date_of_Application','publish','actions'];
  // 'publish',
  dataSource:any;
  editFlag:boolean=false;
  buttonValue: string = 'Submit';
  constructor(public dialog: MatDialog,private fb:FormBuilder,
     private snackbar:MatSnackBar,
    private service:ApiService,
     private error:ErrorHandlerService
    ) { }
    @ViewChild(MatSort) sort!: MatSort;
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
      roles_and_Responsibility: [''],
      qualification: [''],
      experience:[''],
      skills_Required:[''],
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
  // http://whizhackwebapi.mahamining.com/whizhack_cms/postjobs/GetAllCourses?pageno=1&pagesize=10
bindTable(){
  this.service.setHttp('get','whizhack_cms/postjobs/GetAllPostJobs?pageno=1&pagesize=10',false,false,false,'whizhackService');
  this.service.getHttp().subscribe({
    next:(res:any)=>{
      if(res.statusCode == '200'){
        this.dataSource=new MatTableDataSource(res.responseData);
        this.dataSource.sort =this.sort; 
        console.log(this.dataSource)
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
openDialog1(obj?: any): void {
  this.dialog.open(JobDetailsComponent,{
    width: '750px',
  // height: '80%',
    data: obj,
    disableClose: true
  });
}
//----------------------------Start Publish Button Logic Here------------------
onClickToggle(element:any){ 
  let isPublishFlag = {
    "jobpostId": element.jobpostId,
  // "publish": true
   "publish": element.publish ? false : true
  }
  this.service.setHttp('put','whizhack_cms/postjobs/UpdatePublish',false,isPublishFlag,false,'whizhackService');
  this.service.getHttp().subscribe({
    next: (res: any) =>{
      if(res.statusCode == '200')
      {
      this.bindTable();
      console.log("Toggle",element);   
      } 
    }
  })
}
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
// ----------------------------End Delete Logic Here---------------------------

// ----------------------------Start Submit Logic Here-------------------------
  onSubmit(){
    let data=this.postNewJobFrm.value;
    if(!this.editFlag){
      this.service.setHttp('post','whizhack_cms/postjobs/Insert',false,data,false,'whizhackService');
      this.service.getHttp().subscribe({
        next:(res:any)=>{
          if (res.statusCode == '200'){
            this.snackbar.open(res.statusMessage, 'ok');
            this.bindTable();
          }
        },
        error:(error:any)=>{
          console.log("Error:",error);
          this.error.handelError(error.statusCode)
        }
      })
    }
  else{
      this.editFlag=true;
      //data.id = this.editObj.jobpostId
      this.service.setHttp('put','whizhack_cms/postjobs/Update',false,data,false,'whizhackService');
      this.service.getHttp().subscribe({
        next:(res:any)=>{
          if(res.statusCode == '200'){
            this.snackbar.open(res.statusMessage,'ok');
            this.bindTable();
          }
        },
          error: (error: any) => {
            console.log("Error : ", error);
            this.error.handelError(error.statusCode);
          
        }
      })
    }
  }
 // ----------------------------End Submit Logic Here-------------------------------

 onClickClear(){
  this.postNewJobFrm.reset();
  this.formData();
  this.buttonValue = 'Submit'
}
}

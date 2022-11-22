import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Editor, Toolbar } from 'ngx-editor';
import { JobDetailsComponent } from './job-details/job-details.component';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/core/services/api.service';
import {ErrorHandlerService} from 'src/app/core/services/error-handler.service';
export interface PeriodicElement {
  title: string;
  srno: number;
  location: string;
  postdate: string;
  lastdate: string;
  publish: string;
  actions: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {srno: 1, title: 'Hydrogen', location: '1.0079', postdate: 'H', lastdate: 'H',publish:'',actions:''},
  {srno: 2, title: 'Helium', location: '4.0026', postdate: 'He', lastdate: 'H',publish:'',actions:''},
  {srno: 3, title: 'Lithium', location: '6.941', postdate: 'Li', lastdate: 'H',publish:'',actions:''},
  {srno: 4, title: 'Beryllium', location: '9.0122', postdate: 'Be', lastdate: 'H',publish:'',actions:''},
  {srno: 5, title: 'Boron', location: '10.811', postdate: 'B', lastdate: 'H',publish:'',actions:''},
  {srno: 6, title: 'Carbon', location: '12.0107', postdate: 'C', lastdate: 'H',publish:'',actions:''},
  {srno: 7, title: 'Nitrogen', location: '14.0067', postdate: 'N', lastdate: 'H',publish:'',actions:''},
  {srno: 8, title: 'Oxygen', location: '15.9994', postdate: 'O', lastdate: 'H',publish:'',actions:''},
  {srno: 9, title: 'Fluorine', location: '18.9984', postdate: 'F', lastdate: 'H',publish:'',actions:''},
  {srno: 10, title: 'Neon', location: '20.1797', postdate: 'Ne', lastdate: 'H',publish:'',actions:''},
];

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css']
})
export class PostJobComponent implements OnInit {
  postNewJobFrm!:FormGroup;
  displayedColumns: string[] = ['srno', 'title', 'location', 'postdate','lastdate','publish', 'actions'];
  dataSource = ELEMENT_DATA;
  editFlag:boolean=false;
  constructor(public dialog: MatDialog,private fb:FormBuilder,private snackbar:MatSnackBar,
    private service:ApiService,private error:ErrorHandlerService) { }

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
<<<<<<< HEAD
    this.formData();
    // this.bindTable();
=======
    this.editorRoles = new Editor();
    this.editorExperience = new Editor();
    this.editorQualification = new Editor();
    this.editorSkills = new Editor();
>>>>>>> 5891ae93bfe8ef4c3f87f53098b364f20693dbd6
  }
// ----------------------------Start Form Field Here-------------------------------
  formData(){
    this.postNewJobFrm = this.fb.group({
      jobTitle: ['',Validators.required],
      jobLocation: ['',Validators.required],
      dateOfPosting: ['',Validators.required],
      lastDateOfApp: ['',Validators.required],
      description: ['',Validators.required],
      roles: [''],
      experience: [''],
      qualification:[''],
       skills:['']
    });
  }
  // ----------------------------End Form Field Here-------------------------------

  //---------------------------for Validation Handle---------------------------
  get f() {
    return this.postNewJobFrm.controls;
  }
  //---------------------------for Validation Handle---------------------------/

  //----------------------------Start Bind Table Logic Here--------------------
// bindTable(){
//   this.service.setHttp('get','',false,false,false,'whizhackService');
//   this.service.getHttp().subscribe({
//     next:(res:any)=>{
//       if(res.statusCode == '200'){
//         this.dataSource=res.res.responseData;
//       }
//       else{
//         this.dataSource=[];
//       }
//     },
//     error:(error:any)=>{
//       console.log("Error:",error);
//       this.error.handelError(error.statusCode);
//     }
//   })
// }
//----------------------------End Bind Table Logic Here------------------------

//----------------------------Start Publish Button Logic Here------------------
// onClickToggle(element:any){ 
//   this.service.setHttp('put','',false,false,false,'whizhackService');
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

// ----------------------------Start Delete Logic Here-------------------------
// onDelete(id:any){
//   this.service.setHttp('delete',''+id,false,false,false,'whizhackService');
//   this.service.getHttp().subscribe({
//     next:(res:any)=>{
//       if(res.statusCode == '200'){
//         this.snackbar.open(res.statusMessage,'ok');
//         this.bindTable();
//       }
//     },
//     error:(error:any)=>{
//       console.log("Error",error);
//       this.error.handelError(error.statusCode);
//     }
//   })

// }
// ----------------------------End Delete Logic Here---------------------------

// ----------------------------Start Submit Logic Here-------------------------
  // onSubmit(){
  //   let data=this.postNewJobFrm.value;
  //   if(!this.editFlag){
  //     this.service.setHttp('post','',false,data,false,'whizhackService');
  //     this.service.getHttp().subscribe({
  //       next:(res:any)=>{
  //         if (res.statusCode == '200'){
  //           this.snackbar.open(res.statusMessage, 'ok');
  //           this.bindTable();
  //         }
  //       },
  //       error:(error:any)=>{
  //         console.log("Error:",error);
  //         this.error.handelError(error.statusCode)
  //       }
  //     })
  //   }
  //   else{
  //     this.editFlag=true;
  //     this.service.setHttp('put','',false,data,false,'whizhackService');
  //     this.service.getHttp().subscribe({
  //       next:(res:any)=>{
  //         if(res.statusCode == '200'){
  //           this.snackbar.open(res.statusMessage,'ok');
  //           this.bindTable();
  //         }
  //       },
  //         error: (error: any) => {
  //           console.log("Error : ", error);
  //           this.error.handelError(error.statusCode);
          
  //       }
  //     })
  //   }
  // }
 // ----------------------------End Submit Logic Here-------------------------------
}

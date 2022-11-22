import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { ViewTrainingScheduleComponent } from './view-training-schedule/view-training-schedule.component';
export interface PeriodicElement {
  srno: number;
  image: string;
  title: string;
  duration: string;
  price: number;
  action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {srno: 1, image: '', title: 'Cyber Ninja',duration:'1 Month', price: 124547,action:''},
  {srno: 2, image: '', title: 'Cyber Ninja',duration:'1 Month', price: 124547,action:''},
  {srno: 3, image: '', title: 'Cyber Ninja',duration:'1 Month', price: 124547,action:''},
  {srno: 4, image: '', title: 'Cyber Ninja',duration:'1 Month', price: 124547,action:''},
  {srno: 5, image: '', title: 'Cyber Ninja',duration:'1 Month', price: 124547,action:''},
  {srno: 6, image: '', title: 'Cyber Ninja',duration:'1 Month', price: 124547,action:''},
  {srno: 7, image: '', title: 'Cyber Ninja',duration:'1 Month', price: 124547,action:''},
  {srno: 8, image: '', title: 'Cyber Ninja',duration:'1 Month', price: 124547,action:''},
  {srno: 9, image: '', title: 'Cyber Ninja',duration:'1 Month', price: 124547,action:''},
  {srno: 10, image: '', title: 'Cyber Ninja',duration:'1 Month', price: 124547,action:''},
];
@Component({
  selector: 'app-training-schedule',
  templateUrl: './training-schedule.component.html',
  styleUrls: ['./training-schedule.component.css']
})
export class TrainingScheduleComponent implements OnInit {
  @ViewChild('uploadDocument') file!: ElementRef;
  manageCoForm!:FormGroup;
  displayedColumns: string[] = ['srno', 'image', 'title','duration', 'price','action'];
  dataSource = ELEMENT_DATA;
  constructor(public dialog: MatDialog, private fb: FormBuilder,private fileUpl: FileUploadService) { }

  openDialog() {
    const dialogRef = this.dialog.open(ViewTrainingScheduleComponent, {
      width: '750px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
    this.controlManageCoForm();
  }

  controlManageCoForm(){
    this.manageCoForm = this.fb.group({
      pageName: ['',Validators.required],
      coTitle: ['',Validators.required],
      coCaption: ['',Validators.required],
      coDuration: ['',Validators.required],
      coDescription: ['',Validators.required],
      syllSummary:['',Validators.required],
      price:['',Validators.required],
      priceTerms:['',Validators.required],
      uploadDocument:['',Validators.required]
    })
  }

  fileUpload(event:any){
    console.log(event);
    this.fileUpl.uploadDocuments(event,'GR','png',10000,20000);
  }

  onClickSubmit(){
  }
  
  onClickView(){
  }
}

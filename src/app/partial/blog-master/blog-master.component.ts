import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { BlogDetailsComponent } from './blog-details/blog-details.component';

export interface PeriodicElement {
  name: string;
  position: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Cyber Attacks You Should Know About: Caution Time!',  symbol: 'H'},
  {position: 2, name: 'Cybersecurity As A Career Option In India: Skills & Scope',  symbol: 'He'},
  {position: 3, name: 'Future and Present of Hacking', symbol: 'Li'},
  {position: 4, name: 'AI and the Evolving Threat Landscape',symbol: 'Be'},
  {position: 5, name: 'Is Absolute Cybersecurity an Utopian Dream?',  symbol: 'B'},
  {position: 6, name: 'Top Reasons To Join IIT Jodhpur TISC Advanced Certificate Program on Cyber Defense',  symbol: 'C'},
  {position: 7, name: 'How To Select The Best Place To Learn Cyber Security', symbol: 'N'},
  {position: 8, name: 'Cyber Security Courses for Beginners to Build a Successful Career in Cyber Security', symbol: 'O'},
  {position: 9, name: 'Why Cyber Security Training Programs and Certifications are Worth It', symbol: 'F'},
  {position: 10, name: 'Top Career Prospects After Completing Cyber Security Courses Online',symbol: 'Ne'},
];
@Component({
  selector: 'app-blog-master',
  templateUrl: './blog-master.component.html',
  styleUrls: ['./blog-master.component.css']
})
export class BlogMasterComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'symbol'];
  dataSource = ELEMENT_DATA;
  frm!:FormGroup;
  items!:FormArray;
  isSubBlogAdd:boolean=true;
  get f() { return this.frm.controls }
  get itemsForm(): FormArray{
    return this.frm.get('items') as FormArray;
  }

  constructor(public dialog: MatDialog, private fb: FormBuilder) { }

  openDialog(): void {
    this.dialog.open(BlogDetailsComponent,{
      width: '1024px',
    });
  }

  ngOnInit(): void {
    this.controlForm();
  }

  controlForm() {
    this.frm = this.fb.group({
      blogTitle: ['', Validators.required],
      blogDesc: ['', Validators.required],
      blogCategory: ['', Validators.required],
      blogAuthor: ['', Validators.required],
      items: this.fb.array([
        this.fb.group({
          subTitle: ['', Validators.required],
          subDescription: ['', Validators.required]
        })
      ])
    })
  }

  addItem(){
    let fg = this.fb.group({
      subTitle: [''],
      subDescription: [''],
    });
    if(this.isSubBlogAdd == true){
      if(this.frm.value.items.length > 0){
      if (this.frm.value.items[this.frm.value.items.length - 1].subTitle && this.frm.value.items[this.frm.value.items.length - 1].subDescription) {
        this.itemsForm.push(fg);
      } else {
        alert('Fill Blog Sub Details')
      }
    }
    else{
      this.itemsForm.push(fg);
    }
    }
    this.isSubBlogAdd =true;
  }

  onClickSubmit(){}
}

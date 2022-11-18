import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-register-now',
  templateUrl: './register-now.component.html',
  styleUrls: ['./register-now.component.css']
})
export class RegisterNowComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RegisterNowComponent>) { }

  ngOnInit(): void {
  }

}

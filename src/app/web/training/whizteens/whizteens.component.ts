import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { RegisterNowComponent } from 'src/app/dialogs/register-now/register-now.component';

@Component({
  selector: 'app-whizteens',
  templateUrl: './whizteens.component.html',
  styleUrls: ['./whizteens.component.css']
})
export class WhizteensComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  openDialog(flag:any) {
    const dialogRef = this.dialog.open(RegisterNowComponent,{
      width: '500px',
      disableClose:true,
      data:flag
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
  }

  ngOnInit(): void {
    
  }

}

import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from 'src/app/dialogs/change-password/change-password.component';
import { ConfirmationModalComponent } from 'src/app/dialogs/confirmation-modal/confirmation-modal.component';
import { Router } from '@angular/router';
import { MyProfileComponent } from 'src/app/dialogs/my-profile/my-profile.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public sidebarservice: SidebarService, public dialog: MatDialog, public router: Router) { }
  toggleSidebar() {
    this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
  }
  toggleBackgroundImage() {
    this.sidebarservice.hasBackgroundImage = !this.sidebarservice.hasBackgroundImage;
  }
  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  hideSidebar() {
    this.sidebarservice.setSidebarState(true);
  }

  openDialog() {
    this.dialog.open(ChangePasswordComponent, {
      width: '700px',
    });
  }

  openProfileDialog() {
    this.dialog.open(MyProfileComponent, {
      width: '350px',disableClose:true
    });
  }

  ngOnInit(): void {
  }

  logout(){
    let dialoObj = {
      header: 'Logout',
      title:'Are your sure, you want to Logout ?',
      cancelButton:'Cancel',
      okButton:'Logout'
    }

    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '300px',
      data: dialoObj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == 'yes'){
        sessionStorage.clear();
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })
  }

}

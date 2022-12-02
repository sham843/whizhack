import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BootcampEnquiriesComponent } from './bootcamp-enquiries.component';

const routes: Routes = [{ path: '', component: BootcampEnquiriesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BootcampEnquiriesRoutingModule { }

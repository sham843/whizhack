import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BootcampEnquiriesRoutingModule } from './bootcamp-enquiries-routing.module';
import { BootcampEnquiriesComponent } from './bootcamp-enquiries.component';
import { ViewBootcampEnquiriesComponent } from './view-bootcamp-enquiries/view-bootcamp-enquiries.component';


@NgModule({
  declarations: [
    BootcampEnquiriesComponent,
    ViewBootcampEnquiriesComponent
  ],
  imports: [
    CommonModule,
    BootcampEnquiriesRoutingModule
  ]
})
export class BootcampEnquiriesModule { }

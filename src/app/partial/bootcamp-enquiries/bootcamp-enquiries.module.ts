import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BootcampEnquiriesRoutingModule } from './bootcamp-enquiries-routing.module';
import { BootcampEnquiriesComponent } from './bootcamp-enquiries.component';
import { ViewBootcampEnquiriesComponent } from './view-bootcamp-enquiries/view-bootcamp-enquiries.component';
import { MaterialModule } from 'src/app/shared/angularMaterialModule/material.module';


@NgModule({
  declarations: [
    BootcampEnquiriesComponent,
    ViewBootcampEnquiriesComponent
  ],
  imports: [
    CommonModule,
    BootcampEnquiriesRoutingModule,
    MaterialModule
  ]
})
export class BootcampEnquiriesModule { }

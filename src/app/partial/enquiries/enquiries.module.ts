import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnquiriesRoutingModule } from './enquiries-routing.module';
import { EnquiriesComponent } from './enquiries.component';
import { MaterialModule } from 'src/app/shared/angularMaterialModule/material.module';
import { ViewEnquiriesComponent } from './view-enquiries/view-enquiries.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EnquiriesComponent,
    ViewEnquiriesComponent
  ],
  imports: [
    CommonModule,
    EnquiriesRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EnquiriesModule { }

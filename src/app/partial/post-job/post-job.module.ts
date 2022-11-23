import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostJobRoutingModule } from './post-job-routing.module';
import { PostJobComponent } from './post-job.component';
import { MaterialModule } from 'src/app/shared/angularMaterialModule/material.module';
import { JobDetailsComponent } from './job-details/job-details.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';
@NgModule({
  declarations: [
    PostJobComponent,
    JobDetailsComponent
  ],
  imports: [
    CommonModule,
    PostJobRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule
  ]
})
export class PostJobModule { }
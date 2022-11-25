import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostJobRoutingModule } from './post-job-routing.module';
import { PostJobComponent } from './post-job.component';
import { MaterialModule } from 'src/app/shared/angularMaterialModule/material.module';
import { JobDetailsComponent } from './job-details/job-details.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { PostNewJobComponent } from './post-new-job/post-new-job.component';
@NgModule({
  declarations: [
    PostJobComponent,
    JobDetailsComponent,
    PostNewJobComponent
  ],
  imports: [
    CommonModule,
    PostJobRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularEditorModule,
  ]
})
export class PostJobModule { }

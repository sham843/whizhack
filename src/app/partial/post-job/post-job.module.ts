import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostJobRoutingModule } from './post-job-routing.module';
import { PostJobComponent } from './post-job.component';
import { MaterialModule } from 'src/app/shared/angularMaterialModule/material.module';
import { JobDetailsComponent } from './job-details/job-details.component';


@NgModule({
  declarations: [
    PostJobComponent,
    JobDetailsComponent
  ],
  imports: [
    CommonModule,
    PostJobRoutingModule,
    MaterialModule
  ]
})
export class PostJobModule { }

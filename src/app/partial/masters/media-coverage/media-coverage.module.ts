import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaCoverageRoutingModule } from './media-coverage-routing.module';
import { MediaCoverageComponent } from './media-coverage.component';
import { MaterialModule } from 'src/app/shared/angularMaterialModule/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MediaCoverageComponent
  ],
  imports: [
    CommonModule,
    MediaCoverageRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class MediaCoverageModule { }

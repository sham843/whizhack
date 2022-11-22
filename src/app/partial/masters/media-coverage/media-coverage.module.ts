import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaCoverageRoutingModule } from './media-coverage-routing.module';
import { MediaCoverageComponent } from './media-coverage.component';


@NgModule({
  declarations: [
    MediaCoverageComponent
  ],
  imports: [
    CommonModule,
    MediaCoverageRoutingModule
  ]
})
export class MediaCoverageModule { }

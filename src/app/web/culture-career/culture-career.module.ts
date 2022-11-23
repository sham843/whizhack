import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CultureCareerRoutingModule } from './culture-career-routing.module';
import { CultureCareerComponent } from './culture-career.component';
import { GalleryModule } from '@ngx-gallery/core';
import { LightboxModule } from '@ngx-gallery/lightbox';
@NgModule({
  declarations: [
    CultureCareerComponent
  ],
  imports: [
    CommonModule,
    CultureCareerRoutingModule,
    GalleryModule,
    LightboxModule
  ]
})
export class CultureCareerModule { }

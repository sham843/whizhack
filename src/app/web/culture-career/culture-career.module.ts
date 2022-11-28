import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CultureCareerRoutingModule } from './culture-career-routing.module';
import { CultureCareerComponent } from './culture-career.component';
import { GalleryModule } from '@ngx-gallery/core';
import { LightboxModule } from '@ngx-gallery/lightbox';
import { LazyImgDirectiveDirective } from 'src/app/core/directive/lazy-img-directive.directive';
@NgModule({
  declarations: [
    CultureCareerComponent,LazyImgDirectiveDirective
  ],
  imports: [
    CommonModule,
    CultureCareerRoutingModule,
    GalleryModule,
    LightboxModule,

  ]
})
export class CultureCareerModule { }

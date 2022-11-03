import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CultureCareerRoutingModule } from './culture-career-routing.module';
import { CultureCareerComponent } from './culture-career.component';


@NgModule({
  declarations: [
    CultureCareerComponent
  ],
  imports: [
    CommonModule,
    CultureCareerRoutingModule
  ]
})
export class CultureCareerModule { }

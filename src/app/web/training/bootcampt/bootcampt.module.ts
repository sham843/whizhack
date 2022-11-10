import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BootcamptRoutingModule } from './bootcampt-routing.module';
import { BootcamptComponent } from './bootcampt.component';


@NgModule({
  declarations: [
    BootcamptComponent
  ],
  imports: [
    CommonModule,
    BootcamptRoutingModule
  ]
})
export class BootcamptModule { }

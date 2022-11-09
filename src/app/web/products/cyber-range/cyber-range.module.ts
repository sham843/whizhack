import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CyberRangeRoutingModule } from './cyber-range-routing.module';
import { CyberRangeComponent } from './cyber-range.component';


@NgModule({
  declarations: [
    CyberRangeComponent
  ],
  imports: [
    CommonModule,
    CyberRangeRoutingModule
  ]
})
export class CyberRangeModule { }

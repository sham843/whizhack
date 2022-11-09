import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TraceRoutingModule } from './trace-routing.module';
import { TraceComponent } from './trace.component';


@NgModule({
  declarations: [
    TraceComponent
  ],
  imports: [
    CommonModule,
    TraceRoutingModule
  ]
})
export class TraceModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingScheduleRoutingModule } from './training-schedule-routing.module';
import { TrainingScheduleComponent } from './training-schedule.component';


@NgModule({
  declarations: [
    TrainingScheduleComponent
  ],
  imports: [
    CommonModule,
    TrainingScheduleRoutingModule
  ]
})
export class TrainingScheduleModule { }

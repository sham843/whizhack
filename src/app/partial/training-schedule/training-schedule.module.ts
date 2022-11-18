import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingScheduleRoutingModule } from './training-schedule-routing.module';
import { TrainingScheduleComponent } from './training-schedule.component';
import { MaterialModule } from 'src/app/shared/angularMaterialModule/material.module';
import { ViewTrainingScheduleComponent } from './view-training-schedule/view-training-schedule.component';


@NgModule({
  declarations: [
    TrainingScheduleComponent,
    ViewTrainingScheduleComponent
  ],
  imports: [
    CommonModule,
    TrainingScheduleRoutingModule,
    MaterialModule
  ]
})
export class TrainingScheduleModule { }

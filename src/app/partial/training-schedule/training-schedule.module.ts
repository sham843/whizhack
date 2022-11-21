import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingScheduleRoutingModule } from './training-schedule-routing.module';
import { TrainingScheduleComponent } from './training-schedule.component';
import { MaterialModule } from 'src/app/shared/angularMaterialModule/material.module';
import { ViewTrainingScheduleComponent } from './view-training-schedule/view-training-schedule.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    TrainingScheduleComponent,
    ViewTrainingScheduleComponent
  ],
  imports: [
    CommonModule,
    TrainingScheduleRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TrainingScheduleModule { }

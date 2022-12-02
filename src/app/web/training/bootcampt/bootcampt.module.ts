import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BootcamptRoutingModule } from './bootcampt-routing.module';
import { BootcamptComponent } from './bootcampt.component';
import { BootcampRegistrationComponent } from './bootcamp-registration/bootcamp-registration.component';
import { MaterialModule } from 'src/app/shared/angularMaterialModule/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    BootcamptComponent,
    BootcampRegistrationComponent
  ],
  imports: [
    CommonModule,
    BootcamptRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MatIconModule
  ]
})
export class BootcamptModule { }

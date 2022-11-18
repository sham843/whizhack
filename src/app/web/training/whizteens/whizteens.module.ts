import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WhizteensRoutingModule } from './whizteens-routing.module';
import { WhizteensComponent } from './whizteens.component';
import { MaterialModule } from 'src/app/shared/angularMaterialModule/material.module';


@NgModule({
  declarations: [
    WhizteensComponent
  ],
  imports: [
    CommonModule,
    WhizteensRoutingModule,
    MaterialModule
  ]
})
export class WhizteensModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnergyProfessionalsRoutingModule } from './energy-professionals-routing.module';
import { EnergyProfessionalsComponent } from './energy-professionals.component';


@NgModule({
  declarations: [
    EnergyProfessionalsComponent
  ],
  imports: [
    CommonModule,
    EnergyProfessionalsRoutingModule
  ]
})
export class EnergyProfessionalsModule { }

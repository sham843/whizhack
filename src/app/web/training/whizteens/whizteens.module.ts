import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WhizteensRoutingModule } from './whizteens-routing.module';
import { WhizteensComponent } from './whizteens.component';


@NgModule({
  declarations: [
    WhizteensComponent
  ],
  imports: [
    CommonModule,
    WhizteensRoutingModule
  ]
})
export class WhizteensModule { }

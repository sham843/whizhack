import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZeroHackRoutingModule } from './zero-hack-routing.module';
import { ZeroHackComponent } from './zero-hack.component';


@NgModule({
  declarations: [
    ZeroHackComponent
  ],
  imports: [
    CommonModule,
    ZeroHackRoutingModule
  ]
})
export class ZeroHackModule { }

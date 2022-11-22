import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryMasterRoutingModule } from './gallery-master-routing.module';
import { GalleryMasterComponent } from './gallery-master.component';
import { MaterialModule } from 'src/app/shared/angularMaterialModule/material.module';


@NgModule({
  declarations: [
    GalleryMasterComponent
  ],
  imports: [
    CommonModule,
    GalleryMasterRoutingModule,
    MaterialModule
  ]
})
export class GalleryMasterModule { }

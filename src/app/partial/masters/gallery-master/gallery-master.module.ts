import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryMasterRoutingModule } from './gallery-master-routing.module';
import { GalleryMasterComponent } from './gallery-master.component';


@NgModule({
  declarations: [
    GalleryMasterComponent
  ],
  imports: [
    CommonModule,
    GalleryMasterRoutingModule
  ]
})
export class GalleryMasterModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryMasterRoutingModule } from './gallery-master-routing.module';
import { GalleryMasterComponent } from './gallery-master.component';
import { MaterialModule } from 'src/app/shared/angularMaterialModule/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GalleryModule } from '@ngx-gallery/core';
import { LightboxModule } from '@ngx-gallery/lightbox';

@NgModule({
  declarations: [
    GalleryMasterComponent
  ],
  imports: [
    CommonModule,
    GalleryMasterRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    GalleryModule,
    LightboxModule

  ]
})
export class GalleryMasterModule { }

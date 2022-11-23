import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryMasterRoutingModule } from './gallery-master-routing.module';
import { GalleryMasterComponent } from './gallery-master.component';
import { MaterialModule } from 'src/app/shared/angularMaterialModule/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


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
  ]
})
export class GalleryMasterModule { }

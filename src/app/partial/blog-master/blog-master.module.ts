import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogMasterRoutingModule } from './blog-master-routing.module';
import { BlogMasterComponent } from './blog-master.component';
import { MaterialModule } from 'src/app/shared/angularMaterialModule/material.module';


@NgModule({
  declarations: [
    BlogMasterComponent
  ],
  imports: [
    CommonModule,
    BlogMasterRoutingModule,
    MaterialModule
  ]
})
export class BlogMasterModule { }

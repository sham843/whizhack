import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogMasterRoutingModule } from './blog-master-routing.module';
import { BlogMasterComponent } from './blog-master.component';


@NgModule({
  declarations: [
    BlogMasterComponent
  ],
  imports: [
    CommonModule,
    BlogMasterRoutingModule
  ]
})
export class BlogMasterModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageMetaTagsRoutingModule } from './manage-meta-tags-routing.module';
import { ManageMetaTagsComponent } from './manage-meta-tags.component';
import { MaterialModule } from 'src/app/shared/angularMaterialModule/material.module';


@NgModule({
  declarations: [
    ManageMetaTagsComponent
  ],
  imports: [
    CommonModule,
    ManageMetaTagsRoutingModule,
    MaterialModule
  ]
})
export class ManageMetaTagsModule { }

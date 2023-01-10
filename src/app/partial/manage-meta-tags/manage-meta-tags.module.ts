import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageMetaTagsRoutingModule } from './manage-meta-tags-routing.module';
import { ManageMetaTagsComponent } from './manage-meta-tags.component';
import { MaterialModule } from 'src/app/shared/angularMaterialModule/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ManageMetaTagsComponent
  ],
  imports: [
    CommonModule,
    ManageMetaTagsRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ManageMetaTagsModule { }

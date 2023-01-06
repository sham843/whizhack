import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageMetaTagsRoutingModule } from './manage-meta-tags-routing.module';
import { ManageMetaTagsComponent } from './manage-meta-tags.component';


@NgModule({
  declarations: [
    ManageMetaTagsComponent
  ],
  imports: [
    CommonModule,
    ManageMetaTagsRoutingModule
  ]
})
export class ManageMetaTagsModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageMetaTagsComponent } from './manage-meta-tags.component';

const routes: Routes = [{ path: '', component: ManageMetaTagsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageMetaTagsRoutingModule { }

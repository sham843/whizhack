import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryMasterComponent } from './gallery-master.component';

const routes: Routes = [{ path: '', component: GalleryMasterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryMasterRoutingModule { }

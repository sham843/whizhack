import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MediaCoverageComponent } from './media-coverage.component';

const routes: Routes = [{ path: '', component: MediaCoverageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MediaCoverageRoutingModule { }

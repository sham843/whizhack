import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BootcamptComponent } from './bootcampt.component';

const routes: Routes = [{ path: '', component: BootcamptComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BootcamptRoutingModule { }

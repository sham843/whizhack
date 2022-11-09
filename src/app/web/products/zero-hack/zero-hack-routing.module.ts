import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZeroHackComponent } from './zero-hack.component';

const routes: Routes = [{ path: '', component: ZeroHackComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZeroHackRoutingModule { }

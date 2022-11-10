import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WhizteensComponent } from './whizteens.component';

const routes: Routes = [{ path: '', component: WhizteensComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WhizteensRoutingModule { }

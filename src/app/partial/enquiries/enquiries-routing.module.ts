import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnquiriesComponent } from './enquiries.component';

const routes: Routes = [{ path: '', component: EnquiriesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnquiriesRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CyberRangeComponent } from './cyber-range.component';

const routes: Routes = [{ path: '', component: CyberRangeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CyberRangeRoutingModule { }

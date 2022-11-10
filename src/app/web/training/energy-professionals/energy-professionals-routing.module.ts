import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnergyProfessionalsComponent } from './energy-professionals.component';

const routes: Routes = [{ path: '', component: EnergyProfessionalsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnergyProfessionalsRoutingModule { }

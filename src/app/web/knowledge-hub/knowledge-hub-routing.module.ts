import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KnowledgeHubComponent } from './knowledge-hub.component';

const routes: Routes = [{ path: '', component: KnowledgeHubComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KnowledgeHubRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KnowledgeHubRoutingModule } from './knowledge-hub-routing.module';
import { KnowledgeHubComponent } from './knowledge-hub.component';


@NgModule({
  declarations: [
    KnowledgeHubComponent
  ],
  imports: [
    CommonModule,
    KnowledgeHubRoutingModule
  ]
})
export class KnowledgeHubModule { }

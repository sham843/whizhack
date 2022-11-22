import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogMasterComponent } from './blog-master.component';

const routes: Routes = [{ path: '', component: BlogMasterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogMasterRoutingModule { }

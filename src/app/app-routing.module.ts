import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'web-layout', loadChildren: () => import('./web/web-layout/web-layout.module').then(m => m.WebLayoutModule) }, { path: 'home', loadChildren: () => import('./web/home/home.module').then(m => m.HomeModule) }, { path: 'about-us', loadChildren: () => import('./web/about-us/about-us.module').then(m => m.AboutUsModule) }, { path: 'products', loadChildren: () => import('./web/products/products.module').then(m => m.ProductsModule) }, { path: 'services', loadChildren: () => import('./web/services/services.module').then(m => m.ServicesModule) }, { path: 'training', loadChildren: () => import('./web/training/training.module').then(m => m.TrainingModule) }, { path: 'knowledge-hub', loadChildren: () => import('./web/knowledge-hub/knowledge-hub.module').then(m => m.KnowledgeHubModule) }, { path: 'contact-us', loadChildren: () => import('./web/contact-us/contact-us.module').then(m => m.ContactUsModule) }, { path: 'culture-career', loadChildren: () => import('./web/culture-career/culture-career.module').then(m => m.CultureCareerModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

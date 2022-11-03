import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('../../web/home/home.module').then(m => m.HomeModule), data: { breadcrumb: [{ title: 'Home', active: true }] } },
  { path: 'about-us', loadChildren: () => import('../../web/about-us/about-us.module').then(m => m.AboutUsModule), data: { breadcrumb: [{ title: 'About Us', active: true }] } },
  { path: 'products', loadChildren: () => import('../../web/products/products.module').then(m => m.ProductsModule), data: { breadcrumb: [{ title: 'Products', active: true }] } },
  { path: 'services', loadChildren: () => import('../../web/services/services.module').then(m => m.ServicesModule), data: { breadcrumb: [{ title: 'Services', active: true }] } },
  { path: 'training', loadChildren: () => import('../../web/training/training.module').then(m => m.TrainingModule), data: { breadcrumb: [{ title: 'Training', active: true }] } },
  { path: 'knowledge-hub', loadChildren: () => import('../../web/knowledge-hub/knowledge-hub.module').then(m => m.KnowledgeHubModule), data: { breadcrumb: [{ title: 'Knowledge Hub', active: true }] } },
  { path: 'contact-us', loadChildren: () => import('../../web/contact-us/contact-us.module').then(m => m.ContactUsModule), data: { breadcrumb: [{ title: 'Contact Us', active: true }] } },
  { path: 'culture-and-career', loadChildren: () => import('../../web/culture-career/culture-career.module').then(m => m.CultureCareerModule), data: { breadcrumb: [{ title: 'Culture & Career', active: true }] } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebLayoutRoutingModule { }

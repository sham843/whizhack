import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('../../web/login/login.module').then(m => m.LoginModule) },
  { path: 'home', loadChildren: () => import('../../web/home/home.module').then(m => m.HomeModule), data: { breadcrumb: [{ title: 'Home', active: true }] } },
  { path: 'about-us', loadChildren: () => import('../../web/about-us/about-us.module').then(m => m.AboutUsModule), data: { breadcrumb: [{ title: 'About Us', active: true }] } },
  { path: 'products', loadChildren: () => import('../../web/products/products.module').then(m => m.ProductsModule), data: { breadcrumb: [{ title: 'Products', active: true }] } },
  { path: 'products/cyber-range', loadChildren: () => import('../../web/products/cyber-range/cyber-range.module').then(m => m.CyberRangeModule), data: { breadcrumb: [{ title: 'Cyber Range', active: true }] } },
  { path: 'products/trace', loadChildren: () => import('../../web/products/trace/trace.module').then(m => m.TraceModule), data: { breadcrumb: [{ title: 'Trace', active: true }] } },
  { path: 'products/zero-hack', loadChildren: () => import('../../web/products/zero-hack/zero-hack.module').then(m => m.ZeroHackModule), data: { breadcrumb: [{ title: 'Zero Hack', active: true }] } },
  { path: 'services', loadChildren: () => import('../../web/services/services.module').then(m => m.ServicesModule), data: { breadcrumb: [{ title: 'Services', active: true }] } },
  { path: 'training', loadChildren: () => import('../../web/training/training.module').then(m => m.TrainingModule), data: { breadcrumb: [{ title: 'Training', active: true }] } },
  { path: 'training/whizteens', loadChildren: () => import('../../web/training/whizteens/whizteens.module').then(m => m.WhizteensModule), data: { breadcrumb: [{ title: 'Whizteens', active: true }] } },
  { path: 'training/bootcamp', loadChildren: () => import('../../web/training/bootcampt/bootcampt.module').then(m => m.BootcamptModule), data: { breadcrumb: [{ title: 'Bootcamp', active: true }] } },
  { path: 'training/energy-professionals', loadChildren: () => import('../../web/training/energy-professionals/energy-professionals.module').then(m => m.EnergyProfessionalsModule), data: { breadcrumb: [{ title: 'Energy Professionals', active: true }] } },
  { path: 'knowledge-hub', loadChildren: () => import('../../web/knowledge-hub/knowledge-hub.module').then(m => m.KnowledgeHubModule), data: { breadcrumb: [{ title: 'Knowledge Hub', active: true }] } },
  { path: 'blog-details', loadChildren: () => import('../../web/blog-details/blog-details.module').then(m => m.BlogDetailsModule), data: { breadcrumb: [{ title: 'Blog Details', active: true }] }  },
  { path: 'contact-us', loadChildren: () => import('../../web/contact-us/contact-us.module').then(m => m.ContactUsModule), data: { breadcrumb: [{ title: 'Contact Us', active: true }] } },
  { path: 'culture-and-career', loadChildren: () => import('../../web/culture-career/culture-career.module').then(m => m.CultureCareerModule), data: { breadcrumb: [{ title: 'Culture & Career', active: true }] } },
  { path: 'job-details', loadChildren: () => import('../../web/culture-career/job-details/job-details.module').then(m => m.JobDetailsModule), data: { breadcrumb: [{ title: 'Job Details', active: true }] }  },
  { path: 'job-details/:id', loadChildren: () => import('../../web/culture-career/job-details/job-details.module').then(m => m.JobDetailsModule), data: { breadcrumb: [{ title: 'Job Details', active: true }] }  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebLayoutRoutingModule { }

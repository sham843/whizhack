import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('../../web/login/login.module').then(m => m.LoginModule) , data: {title: 'Login'}},
  { path: 'home', loadChildren: () => import('../../web/home/home.module').then(m => m.HomeModule), data: {title: 'Home'} },
  { path: 'about-us', loadChildren: () => import('../../web/about-us/about-us.module').then(m => m.AboutUsModule), data: {title: 'About Us' } },
  { path: 'products', loadChildren: () => import('../../web/products/products.module').then(m => m.ProductsModule), data: {title:'Products'} },
  { path: 'products/cyber-range', loadChildren: () => import('../../web/products/cyber-range/cyber-range.module').then(m => m.CyberRangeModule), data: {  title: 'Cyber Range' } },
  { path: 'products/trace', loadChildren: () => import('../../web/products/trace/trace.module').then(m => m.TraceModule), data: {title: 'Trace' } },
  { path: 'products/zero-hack', loadChildren: () => import('../../web/products/zero-hack/zero-hack.module').then(m => m.ZeroHackModule), data: {title: 'Zero Hack'} },
  { path: 'services', loadChildren: () => import('../../web/services/services.module').then(m => m.ServicesModule), data: {title: 'Services'} },
  { path: 'training', loadChildren: () => import('../../web/training/training.module').then(m => m.TrainingModule), data: {title: 'Training'} },
  { path: 'training/whizteens', loadChildren: () => import('../../web/training/whizteens/whizteens.module').then(m => m.WhizteensModule), data: {title: 'Whizteens'} },
  { path: 'training/bootcamp', loadChildren: () => import('../../web/training/bootcampt/bootcampt.module').then(m => m.BootcamptModule), data: {title: 'Bootcamp'} },
  { path: 'training/energy-professionals', loadChildren: () => import('../../web/training/energy-professionals/energy-professionals.module').then(m => m.EnergyProfessionalsModule), data: { title: 'Energy Professionals'} },
  { path: 'knowledge-hub', loadChildren: () => import('../../web/knowledge-hub/knowledge-hub.module').then(m => m.KnowledgeHubModule), data: {title: 'Knowledge Hub'} },
  { path: 'knowledge-hub/:name', loadChildren: () => import('../../web/knowledge-hub/knowledge-hub.module').then(m => m.KnowledgeHubModule), data: {title: 'Knowledge Hub'} },
  { path: 'blog-details', loadChildren: () => import('../../web/blog-details/blog-details.module').then(m => m.BlogDetailsModule), data: {title: 'Blog Details'}  },
  { path: 'blog-details/:id', loadChildren: () => import('../../web/blog-details/blog-details.module').then(m => m.BlogDetailsModule), data: {title: 'Blog Details'}  },
  { path: 'contact-us', loadChildren: () => import('../../web/contact-us/contact-us.module').then(m => m.ContactUsModule), data: {title: 'Contact Us'} },
  { path: 'culture-and-career', loadChildren: () => import('../../web/culture-career/culture-career.module').then(m => m.CultureCareerModule), data: {title: 'Culture & Career'} },
  { path: 'job-details', loadChildren: () => import('../../web/culture-career/job-details/job-details.module').then(m => m.JobDetailsModule), data: {title: 'Job Details'}  },
  { path: 'job-details/:id', loadChildren: () => import('../../web/culture-career/job-details/job-details.module').then(m => m.JobDetailsModule), data: {title: 'Job Details'}  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebLayoutRoutingModule { }

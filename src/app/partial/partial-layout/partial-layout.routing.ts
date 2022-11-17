import { Routes } from '@angular/router';

export const PartialLayoutRoutes: Routes = [
  { path: 'dashboard', loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule), data: { title: 'Dashboard' } },
  { path: 'blog-master', loadChildren: () => import('../../partial/blog-master/blog-master.module').then(m => m.BlogMasterModule), data: { title: 'Blog Master' } },
  { path: 'enquiries', loadChildren: () => import('../../partial/enquiries/enquiries.module').then(m => m.EnquiriesModule), data: { title: 'Enquiries' } },
];

import { Routes } from '@angular/router';

export const PartialLayoutRoutes: Routes = [
  { path: 'dashboard', loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule), data: { title: 'Dashboard' } },
  { path: 'blog-master', loadChildren: () => import('../../partial/masters/blog-master/blog-master.module').then(m => m.BlogMasterModule), data: { title: 'Blog Master' } },
  { path: 'gallery-master', loadChildren: () => import('../../partial/masters/gallery-master/gallery-master.module').then(m => m.GalleryMasterModule), data: { title: 'Gallery Master' } },
  { path: 'media-coverage', loadChildren: () => import('../../partial/masters/media-coverage/media-coverage.module').then(m => m.MediaCoverageModule), data: { title: 'Media Coverage' } },
  { path: 'enquiries', loadChildren: () => import('../../partial/enquiries/enquiries.module').then(m => m.EnquiriesModule), data: { title: 'Enquiries' } },
  { path: 'training-schedule', loadChildren: () => import('../../partial/training-schedule/training-schedule.module').then(m => m.TrainingScheduleModule), data: { title: 'Training Schedule' } },
  { path: 'post-job', loadChildren: () => import('../../partial/post-job/post-job.module').then(m => m.PostJobModule), data: { title: 'Post Job' } },
];

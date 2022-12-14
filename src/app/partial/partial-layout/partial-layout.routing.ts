import { Routes } from '@angular/router';

export const PartialLayoutRoutes: Routes = [
  { path: 'dashboard', loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule), data: { title: 'Dashboard' } },
  { path: 'content-master', loadChildren: () => import('../../partial/masters/blog-master/blog-master.module').then(m => m.BlogMasterModule), data: { title: 'Content Master' } },
  { path: 'gallery-master', loadChildren: () => import('../../partial/masters/gallery-master/gallery-master.module').then(m => m.GalleryMasterModule), data: { title: 'Gallery Master' } },
  { path: 'media-coverage', loadChildren: () => import('../../partial/masters/media-coverage/media-coverage.module').then(m => m.MediaCoverageModule), data: { title: 'Media Coverage' } },
  { path: 'enquiries', loadChildren: () => import('../../partial/enquiries/enquiries.module').then(m => m.EnquiriesModule), data: { title: 'Enquiries' } },
  { path: 'bootcamp-enquiries', loadChildren: () => import('../../partial/bootcamp-enquiries/bootcamp-enquiries.module').then(m => m.BootcampEnquiriesModule), data: { title: 'Enquiries' } },
  { path: 'training-schedule', loadChildren: () => import('../../partial/training-schedule/training-schedule.module').then(m => m.TrainingScheduleModule), data: { title: 'Training Schedule' } },
  { path: 'post-job', loadChildren: () => import('../../partial/post-job/post-job.module').then(m => m.PostJobModule), data: { title: 'Post Job' } },
  { path: 'manage-meta-tags', loadChildren: () => import('../../partial/manage-meta-tags/manage-meta-tags.module').then(m => m.ManageMetaTagsModule), data: { title: 'Manage Meta Tags' } },
];

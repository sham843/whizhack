import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { CheckLoggedInGuard } from './core/guards/check-logged-in.guard';
import { PartialLayoutComponent } from './partial/partial-layout/partial-layout.component';
import { WebLayoutComponent } from './web/web-layout/web-layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', canActivate:[CheckLoggedInGuard], component: WebLayoutComponent, loadChildren: () => import('./web/web-layout/web-layout.module').then(m => m.WebLayoutModule) },
  {
    path: '',
    canActivate: [AuthGuard],
    component: PartialLayoutComponent,
    loadChildren: () => import('./partial/partial-layout/partial-layout.module').then(m => m.PartialLayoutModule)
  },
  { path: 'forgot-password', loadChildren: () => import('./web/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) },
  
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

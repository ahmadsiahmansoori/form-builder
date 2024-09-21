import { NgModule, inject } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { dashboardGuard } from './core/guards/dashboard.guard';
import { AuthService } from './data/services/auth.service';
import { filter, switchMap } from 'rxjs';
import { userConfirmGuard } from './core/guards/user-confirm.guard';

const routes: Routes = [
  {path: '', loadChildren: () => import('./form/form.module').then(m => m.FormModule)}
  // {
  //   path: '',
  //   redirectTo: 'dashboard',
  //   pathMatch: 'full',
  // },
  // {
  //   path: "dashboard",
  //   loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
  //   title: "dashboard",
  //   canActivate: [dashboardGuard, userConfirmGuard],
  // },
  // {
  //   path: "auth",
  //   loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  //   title: 'auth'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  // constructor(private authService: AuthService){
  //   this.authService.getToken.pipe(filter((data: string|null) => {
  //     if(data == null) {
  //       this.authService.logoutConf();
  //       inject(Router).navigate(['/auth'])
  //       return false;
  //     }
  //     return true;
  //   }),switchMap(_ => this.authService.attempt)).subscribe()
  // }
}

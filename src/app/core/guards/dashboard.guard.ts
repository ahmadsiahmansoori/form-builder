import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { AuthService } from 'src/app/data/services/auth.service';

export const dashboardGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);

  return inject(AuthService).isLoginSystem$.pipe(tap(isLogin => {
    if(isLogin === false) {
      router.navigate(['./auth'] , {queryParams: {r: state.url}})
    }
  }));
};

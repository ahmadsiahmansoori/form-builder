import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { UserService } from 'src/app/data/services/user.service';

export const userConfirmGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  return inject(UserService).user$.pipe(map(data => {
    if(data?.status == 1) {
      router.navigate(['/auth/confirm'])
    }
    return true;
  }))
};

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../service/storage-service';
import { AuthService } from '../service/auth-service';
import { map } from 'rxjs';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const storage = inject(StorageService);
  const router = inject(Router);
  const user = storage.getUser()
  const authService = inject(AuthService);

  if (!user) {
    router.navigate(['/login']);
    return false;
  }
  return authService.testToken().pipe(
    map(isValid => {
      if (isValid) return true;
      router.navigate(['/login']);
      return false;
    })
  );
};

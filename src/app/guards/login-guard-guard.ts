import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../service/storage-service';
import { inject } from '@angular/core';

export const loginGuardGuard: CanActivateFn = (route, state) => {
  const storage = inject(StorageService);
  const router = inject(Router);
  const user = storage.getUser()

  if (user) {
    router.navigate(['/app']); // Si ya está logueado, lo mandamos a inicio
    return false;
  }
  return true;
};

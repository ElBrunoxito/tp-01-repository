import { HttpInterceptorFn } from '@angular/common/http';
import { enviorement } from '../config/enviorement';
import { StorageService } from '../service/storage-service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
 const allowedEndpoints = enviorement.allowed;
 const isAllowedEndpoint = allowedEndpoints.some(url => req.url.includes(url));

  if (isAllowedEndpoint) {
    return next(req);
  }
  const storageService = inject(StorageService);
  const user = storageService.getUser();
  const authToken = user?.token;

  
  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });

  return next(clonedRequest);
};

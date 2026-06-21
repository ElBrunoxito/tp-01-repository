import { HttpInterceptorFn } from '@angular/common/http';
import { enviorement } from '../config/enviorement';
import { StorageService } from '../service/storage-service';
import { inject } from '@angular/core';
import { ResponseUserDTO } from '../model/User';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
 const allowedEndpoints = enviorement.allowed;


  const isAllowedEndpoint = allowedEndpoints.some(url => req.url.includes(url));

  if (isAllowedEndpoint) {
    return next(req);
  }
  const storageService = inject(StorageService)

  const authToken = (storageService.getUser() as ResponseUserDTO).token
  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });

  return next(clonedRequest);
};

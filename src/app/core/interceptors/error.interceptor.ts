import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { ToastService } from '../../shared/toast/toast.service';

/** Centralise la gestion des erreurs HTTP : affiche un message clair et propage l'erreur. */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      toastService.error(extractMessage(error));
      return throwError(() => error);
    })
  );
};

function extractMessage(error: HttpErrorResponse): string {
  if (typeof error.error?.message === 'string') {
    return error.error.message;
  }
  if (error.status === 0) {
    return 'Impossible de contacter le serveur.';
  }
  return `Erreur ${error.status} : une erreur est survenue.`;
}

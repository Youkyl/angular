import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { CurrentClientStore } from './current-client.store';

/** Bloque l'accès aux routes Client tant qu'aucun numéro de téléphone n'a été saisi. */
export const clientSessionGuard: CanActivateFn = () => {
  const store = inject(CurrentClientStore);
  const router = inject(Router);

  if (store.phone()) {
    return true;
  }

  return router.createUrlTree(['/login']);
};

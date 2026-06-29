import { Injectable, signal } from '@angular/core';

const STORAGE_KEY = 'badwallet.currentClientPhone';

/** Détient le numéro de téléphone du client actuellement connecté (pas d'authentification réelle). */
@Injectable({ providedIn: 'root' })
export class CurrentClientStore {
  readonly phone = signal<string | null>(localStorage.getItem(STORAGE_KEY));

  setPhone(phone: string): void {
    localStorage.setItem(STORAGE_KEY, phone);
    this.phone.set(phone);
  }

  clear(): void {
    localStorage.removeItem(STORAGE_KEY);
    this.phone.set(null);
  }
}

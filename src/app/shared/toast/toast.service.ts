import { Injectable, signal } from '@angular/core';

import { ToastKind, ToastMessage } from './toast.model';

const AUTO_DISMISS_MS = 4000;

/** Détient l'état des notifications affichées à l'utilisateur. */
@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly messages = signal<ToastMessage[]>([]);
  private nextId = 0;

  readonly toasts = this.messages.asReadonly();

  success(text: string): void {
    this.show('success', text);
  }

  error(text: string): void {
    this.show('error', text);
  }

  dismiss(id: number): void {
    this.messages.update((current) => current.filter((m) => m.id !== id));
  }

  private show(kind: ToastKind, text: string): void {
    const id = this.nextId++;
    this.messages.update((current) => [...current, { id, kind, text }]);
    setTimeout(() => this.dismiss(id), AUTO_DISMISS_MS);
  }
}

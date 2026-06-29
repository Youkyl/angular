import { Component, inject } from '@angular/core';

import { ToastService } from './toast.service';

/** Affiche la pile de notifications en cours (succès en vert, erreurs en rouge). */
@Component({
  selector: 'app-toast-container',
  standalone: true,
  template: `
    <div class="toast-container">
      @for (toast of toastService.toasts(); track toast.id) {
        <div
          class="toast"
          [class.text-success]="toast.kind === 'success'"
          [class.border-success]="toast.kind === 'success'"
          [class.text-danger]="toast.kind === 'error'"
          [class.border-danger]="toast.kind === 'error'"
        >
          <span>{{ toast.text }}</span>
          <button class="secondary" type="button" (click)="toastService.dismiss(toast.id)">×</button>
        </div>
      }
    </div>
  `,
  styles: [
    `
      .toast-container {
        position: fixed;
        top: 1rem;
        right: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        z-index: 1000;
      }

      .toast {
        background: #ffffff;
        border: 2px solid;
        padding: 0.5rem 0.75rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        min-width: 220px;
      }

      .toast button {
        margin-left: auto;
        border: none;
        background: none;
        color: inherit;
        font-size: 1rem;
        padding: 0;
      }
    `
  ]
})
export class ToastContainerComponent {
  readonly toastService = inject(ToastService);
}

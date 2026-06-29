import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { ToastService } from '../../../../shared/toast/toast.service';
import { phoneValidator } from '../../../../shared/validators/phone.validator';
import { CreateWalletRequest } from '../../models/wallet.model';
import { WalletApiService } from '../../services/wallet-api.service';

/** Formulaire d'inscription d'un nouveau client (création de portefeuille). */
@Component({
  selector: 'app-wallet-create-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './wallet-create-page.component.html'
})
export class WalletCreatePageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly walletApi = inject(WalletApiService);
  private readonly toastService = inject(ToastService);
  private readonly router = inject(Router);

  readonly submitting = signal(false);

  readonly form = this.fb.group({
    phone: ['', [Validators.required, phoneValidator()]],
    email: ['', [Validators.required, Validators.email]],
    initialBalance: [0, [Validators.required, Validators.min(0)]],
    code: ['', [Validators.required]],
    currency: ['XOF', [Validators.required]]
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.walletApi.create(this.form.getRawValue() as CreateWalletRequest).subscribe({
      next: () => {
        this.toastService.success('Portefeuille créé avec succès.');
        this.router.navigateByUrl('/admin/wallets');
      },
      error: () => this.submitting.set(false)
    });
  }
}

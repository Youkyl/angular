import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, of } from 'rxjs';

import { ToastService } from '../../../../shared/toast/toast.service';
import { PhoneFormatPipe } from '../../../../shared/pipes/phone-format.pipe';
import { XofPipe } from '../../../../shared/pipes/xof.pipe';
import { phoneValidator } from '../../../../shared/validators/phone.validator';
import { TransactionApiService } from '../../../transactions/services/transaction-api.service';
import { Wallet } from '../../models/wallet.model';
import { WalletApiService } from '../../services/wallet-api.service';

/** Recherche un portefeuille par téléphone et permet d'y effectuer un dépôt ou un retrait. */
@Component({
  selector: 'app-wallet-search-page',
  standalone: true,
  imports: [ReactiveFormsModule, XofPipe, PhoneFormatPipe],
  templateUrl: './wallet-search-page.component.html'
})
export class WalletSearchPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly walletApi = inject(WalletApiService);
  private readonly transactionApi = inject(TransactionApiService);
  private readonly toastService = inject(ToastService);

  readonly searching = signal(false);
  readonly wallet = signal<Wallet | null>(null);
  readonly operating = signal(false);

  readonly searchForm = this.fb.group({
    phone: ['', [Validators.required, phoneValidator()]]
  });

  readonly depositForm = this.fb.group({
    amount: [0, [Validators.required, Validators.min(1)]],
    paymentMethod: ['WALLET_TARGET' as const, [Validators.required]]
  });

  readonly withdrawForm = this.fb.group({
    amount: [0, [Validators.required, Validators.min(1)]]
  });

  search(): void {
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;
    }

    const phone = this.searchForm.getRawValue().phone as string;
    this.searching.set(true);
    this.wallet.set(null);

    this.walletApi
      .getByPhone(phone)
      .pipe(catchError(() => of(null)))
      .subscribe((found) => {
        this.wallet.set(found);
        this.searching.set(false);
      });
  }

  deposit(): void {
    const wallet = this.wallet();
    if (!wallet || this.depositForm.invalid) {
      this.depositForm.markAllAsTouched();
      return;
    }

    this.operating.set(true);
    const { amount, paymentMethod } = this.depositForm.getRawValue();
    this.transactionApi.deposit(wallet.id, { amount: amount!, paymentMethod: paymentMethod! }).subscribe({
      next: (updated) => {
        this.wallet.set(updated);
        this.toastService.success('Dépôt effectué avec succès.');
        this.depositForm.reset({ amount: 0, paymentMethod: 'WALLET_TARGET' });
        this.operating.set(false);
      },
      error: () => this.operating.set(false)
    });
  }

  withdraw(): void {
    const wallet = this.wallet();
    if (!wallet || this.withdrawForm.invalid) {
      this.withdrawForm.markAllAsTouched();
      return;
    }

    this.operating.set(true);
    this.transactionApi.withdraw({ phone: wallet.phone, amount: this.withdrawForm.getRawValue().amount! }).subscribe({
      next: (updated) => {
        this.wallet.set(updated);
        this.toastService.success('Retrait effectué avec succès.');
        this.withdrawForm.reset({ amount: 0 });
        this.operating.set(false);
      },
      error: () => this.operating.set(false)
    });
  }
}

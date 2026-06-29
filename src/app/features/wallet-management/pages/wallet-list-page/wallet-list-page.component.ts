import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PhoneFormatPipe } from '../../../../shared/pipes/phone-format.pipe';
import { XofPipe } from '../../../../shared/pipes/xof.pipe';
import { Wallet } from '../../models/wallet.model';
import { WalletApiService } from '../../services/wallet-api.service';

const PAGE_SIZE = 10;

/** Affiche la liste paginée des portefeuilles pour l'agent de guichet. */
@Component({
  selector: 'app-wallet-list-page',
  standalone: true,
  imports: [RouterLink, XofPipe, PhoneFormatPipe],
  templateUrl: './wallet-list-page.component.html'
})
export class WalletListPageComponent implements OnInit {
  private readonly walletApi = inject(WalletApiService);

  readonly wallets = signal<Wallet[]>([]);
  readonly page = signal(0);
  readonly totalPages = signal(0);
  readonly loading = signal(false);

  ngOnInit(): void {
    this.loadPage(0);
  }

  loadPage(page: number): void {
    this.loading.set(true);
    this.walletApi.list(page, PAGE_SIZE).subscribe({
      next: (result) => {
        this.wallets.set(result.content);
        this.page.set(result.number);
        this.totalPages.set(result.totalPages);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  goToPreviousPage(): void {
    if (this.page() > 0) {
      this.loadPage(this.page() - 1);
    }
  }

  goToNextPage(): void {
    if (this.page() < this.totalPages() - 1) {
      this.loadPage(this.page() + 1);
    }
  }
}

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'admin/wallets',
    loadComponent: () =>
      import('./features/wallet-management/pages/wallet-list-page/wallet-list-page.component').then(
        (m) => m.WalletListPageComponent
      )
  },
  { path: '', redirectTo: 'admin/wallets', pathMatch: 'full' }
];

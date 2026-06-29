import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'admin/wallets',
    loadComponent: () =>
      import('./features/wallet-management/pages/wallet-list-page/wallet-list-page.component').then(
        (m) => m.WalletListPageComponent
      )
  },
  {
    path: 'admin/wallets/new',
    loadComponent: () =>
      import('./features/wallet-management/pages/wallet-create-page/wallet-create-page.component').then(
        (m) => m.WalletCreatePageComponent
      )
  },
  { path: '', redirectTo: 'admin/wallets', pathMatch: 'full' }
];

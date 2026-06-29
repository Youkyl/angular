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
  {
    path: 'admin/wallets/search',
    loadComponent: () =>
      import('./features/wallet-management/pages/wallet-search-page/wallet-search-page.component').then(
        (m) => m.WalletSearchPageComponent
      )
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./shared/session/pages/client-login-page/client-login-page.component').then(
        (m) => m.ClientLoginPageComponent
      )
  },
  { path: '', redirectTo: 'admin/wallets', pathMatch: 'full' }
];

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { CreateWalletRequest, Wallet, WalletPage } from '../models/wallet.model';

/** Centralise les appels HTTP CRUD vers /api/wallets. */
@Injectable({ providedIn: 'root' })
export class WalletApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/wallets`;

  list(page: number, size: number): Observable<WalletPage> {
    return this.http.get<WalletPage>(this.baseUrl, { params: { page, size } });
  }

  create(request: CreateWalletRequest): Observable<Wallet> {
    return this.http.post<Wallet>(this.baseUrl, request);
  }

  getByPhone(phone: string): Observable<Wallet> {
    return this.http.get<Wallet>(`${this.baseUrl}/${phone}`);
  }

  getBalance(phone: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/${phone}/balance`);
  }
}

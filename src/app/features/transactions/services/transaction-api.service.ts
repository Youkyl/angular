import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Wallet } from '../../wallet-management/models/wallet.model';
import { DepositRequest, TransferRequest, WithdrawRequest } from '../models/transaction.model';

/** Centralise les appels HTTP liés aux mouvements d'un portefeuille (dépôt, retrait, transfert). */
@Injectable({ providedIn: 'root' })
export class TransactionApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/wallets/transactions`;

  deposit(walletId: number, request: DepositRequest): Observable<Wallet> {
    return this.http.post<Wallet>(`${this.baseUrl}/${walletId}/deposit`, request);
  }

  withdraw(request: WithdrawRequest): Observable<Wallet> {
    return this.http.post<Wallet>(`${this.baseUrl}/withdraw`, request);
  }

  transfer(request: TransferRequest): Observable<Wallet> {
    return this.http.post<Wallet>(`${this.baseUrl}/transfer`, request);
  }
}

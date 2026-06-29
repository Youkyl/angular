import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import {
  DepositRequest,
  Transaction,
  TransferRequest,
  WithdrawRequest
} from '../models/transaction.model';

/** Centralise les appels HTTP liés aux mouvements d'un portefeuille (dépôt, retrait, transfert, historique). */
@Injectable({ providedIn: 'root' })
export class TransactionApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/wallets`;

  deposit(walletId: string, request: DepositRequest): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${walletId}/deposit`, request);
  }

  withdraw(request: WithdrawRequest): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/withdraw`, request);
  }

  transfer(request: TransferRequest): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/transfer`, request);
  }

  getHistory(phone: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.baseUrl}/${phone}/transactions`);
  }
}

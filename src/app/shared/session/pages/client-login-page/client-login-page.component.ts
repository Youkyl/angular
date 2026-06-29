import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { phoneValidator } from '../../../validators/phone.validator';
import { CurrentClientStore } from '../../current-client.store';

/** Saisie du numéro de téléphone simulant la connexion d'un client (pas de mot de passe). */
@Component({
  selector: 'app-client-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './client-login-page.component.html'
})
export class ClientLoginPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(CurrentClientStore);
  private readonly router = inject(Router);

  readonly form = this.fb.group({
    phone: ['', [Validators.required, phoneValidator()]]
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.store.setPhone(this.form.getRawValue().phone as string);
    this.router.navigateByUrl('/dashboard');
  }
}

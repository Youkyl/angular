import { Pipe, PipeTransform } from '@angular/core';

/** Formate un nombre en devise XOF (ex: 50000 -> "50 000 XOF"). */
@Pipe({ name: 'xof', standalone: true })
export class XofPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value === null || value === undefined) {
      return '';
    }
    return new Intl.NumberFormat('fr-SN', {
      style: 'currency',
      currency: 'XOF',
      maximumFractionDigits: 0
    }).format(value);
  }
}

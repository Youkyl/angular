import { Pipe, PipeTransform } from '@angular/core';

/** Formate un numéro sénégalais local (771234567) en format lisible (+221 77 123 45 67). */
@Pipe({ name: 'phoneFormat', standalone: true })
export class PhoneFormatPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) {
      return '';
    }
    const digits = value.replace(/\D/g, '').replace(/^221/, '');
    if (digits.length !== 9) {
      return value;
    }
    const groups = [digits.slice(0, 2), digits.slice(2, 5), digits.slice(5, 7), digits.slice(7, 9)];
    return `+221 ${groups.join(' ')}`;
  }
}

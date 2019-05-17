import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'laptime'})
export class LaptimePipe implements PipeTransform {
  transform(value: number, exponent: string): string {
    let s = value;
    console.log(value / 1000);
    const ms = s % 1000;
    s = (s - ms) / 1000;
    const secs = s % 60;
    s = (s - secs) / 60;
    const mins = s % 60;
    return `${mins}min. ${secs}sek. ${ms}ms.`;
  }
}
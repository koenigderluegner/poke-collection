import { Service } from '@angular/core';

@Service()
export class NaturesService {

  private natures: string[] = ['Adamant',
    'Bashful',
    'Bold',
    'Brave',
    'Calm',
    'Careful',
    'Docile',
    'Gentle',
    'Hasty',
    'Impish',
    'Jolly',
    'Lax',
    'Lonely',
    'Mild',
    'Modest',
    'Naive',
    'Naughty',
    'Quiet',
    'Quirky',
    'Rash',
    'Relaxed',
    'Sassy',
    'Serious',
    'Timid'];


  isNature(natureToCheck: string): boolean {
    return this.natures.findIndex(nature => nature.toLowerCase() === natureToCheck.toLowerCase()) !== -1;
  }


}

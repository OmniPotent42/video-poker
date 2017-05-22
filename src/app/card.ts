import { Suits } from './suits';

export class Card {
  alternateValue: number;
  
  constructor(public suit: Suits, public value:number) {
    if (value === 1) {
      this.alternateValue = 14;
    }
  }
  
  getDisplayName() {
    let suitName = Suits[this.suit];
    let displayName = '';
    switch(this.value) {
      case 1:
        displayName = 'Ace';
        break;
      case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9: case 10:
        displayName = this.value.toString();
        break;
      case 11:
        displayName = 'Jack';
        break;
      case 12:
        displayName = 'Queen';
        break;
      case 13:
        displayName = 'King';
        break;
    }
    
    return displayName + ' of ' + suitName;
  }
  
  getClass() {
    //get the first character of the suit, and append the value to it
    const s = Suits[this.suit].substr(0, 1);
    return s + '-' + this.value;
  }
}

export class PokerCard extends Card {
  mulligan = true;

  constructor(suit: Suits, value: number) {
    super(suit, value);
    this.mulligan = true;
  }
}
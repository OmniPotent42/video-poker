import { Card } from './card';

export class Player {
  hand: Card[] = [];

  constructor(public name) { }

  draw(cards: Card[]): void {
    this.hand = this.hand.concat(cards);
  }

  discard(indexes: number[]): void {
    indexes.reverse();
    
    for (let i = 0; i < indexes.length; i++) {
      this.hand.splice(indexes[i], 1);
    }
  }

  readHand(): string {
    let str = 'You are holding: ';

    for (let i = 0; i < this.hand.length; i++) {
      str += this.hand[i].getDisplayName() + ' ';
    }

    return str;
  }
}

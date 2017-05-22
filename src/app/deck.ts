import { Card } from './card';
import { CardFactory } from './card-factory';

export class Deck {

  private cards: Card[] = [];

  constructor() {
    const factory = new CardFactory;

    // we need to construct a deck of 52 cards, all suits and values
    for (let i = 0; i <= 3; i++) {
      for (let j = 1; j <= 13; j++) {
        this.cards.push(factory.createCard(i, j));
      }
    }
    //console.log(this.cards);
  }

  shuffle() {
    const array = this.cards;
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
  }

  draw(amt: number) {
    return this.cards.splice(0, amt);
  }
}

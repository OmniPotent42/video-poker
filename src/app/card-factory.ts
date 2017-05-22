import { Suits } from './suits';
import { Card } from './card';

export class CardFactory {
  createCard(suit: Suits, value: number): Card {
    // ensure that the card falls in the range of 1 to 13
    if (value < 1 || value > 13 || value % 1 !== 0) {
      throw new Error('ERROR: card value must be an integer between 1 and 13');
    }
    if (suit < 0 || suit > 3 || suit % 1 !== 0) {
      throw new Error('ERROR: suit must be an integer between 0 and 3');
    }

    return new Card(suit, value);
  }
}

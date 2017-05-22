import { Card } from './card';
import { p_hand } from './hand';

export class HandDetector {
  hand: p_hand;
  
  setAces(high: boolean) {
    for (let i = 0; i < this.hand.length; i++) {
      let card = this.hand[i];
      //console.log('setting aces');
      if (high && card.value === 1 || !high && card.value === 14) {
        let temp = card.value;
        card.value = card.alternateValue;
        card.alternateValue = temp;
      }
    }
  }
  
  private sortBy( sortType: string ) {
    let hand = this.hand;
    for (let i = 0; i < hand.length; i++) {
      let min = i;
      
      for (let j = i + 1; j < hand.length; j++) {
        if (sortType === 'suit') {
          if (hand[j].suit < hand[min].suit) {
            min = j;
          }
        } else if (sortType === 'value') {
          if (hand[j].value < hand[min].value) {
            min = j;
          }
        }
      }
      
      let temp = hand[i];
      hand[i] = hand[min];
      hand[min] = temp;
    }
  }
  
  isStraight(recurse?: boolean) {
    this.sortBy('value');
    for (let i = 0; i < this.hand.length - 1; i++) {
      if (this.hand[i].value !== this.hand[i+1].value - 1) {
        return false;
      }
    }
    
    return true;
  }
  
  isFlush() {
    this.sortBy('suit');
    for (let i = 0; i < this.hand.length - 1; i++) {
      if (this.hand[i].suit !== this.hand[i + 1].suit) {
        return false;
      }
    }
    return true;
  }
  
  isOfKind(kind: number, sort?: boolean) {
    if (sort) {
      this.sortBy('value');
    }
    
    let values = [];
    let amts = [];
    
    for (let i = 0; i < this.hand.length; i++) {
      let index = values.indexOf(this.hand[i].value);
      if (index > -1) {
        amts[index]++;
      } else {
        values.push(this.hand[i].value);
        amts.push(1);
      }
    }
    
    let index = amts.indexOf(kind);
    if (index > -1) {
      return values[index];
    }
    
  }
  
  isFullHouse() {
    let three = this.isOfKind(3, true);
    let two = this.isOfKind(2, false);
    if (two === three) {
      this.hand.reverse();
      two = this.isOfKind(2, false);
    }
    
    if (three && two && two !== three) {
      return true;
    }
    return false;
  }
  
  isPair() {
    let firstTwo = this.isOfKind(2, true);
    this.hand.reverse();
    let lastTwo = this.isOfKind(2, false);
    
    if (firstTwo && firstTwo !== lastTwo) {
      return true;
    }
    
    return false;
  }
  
  isStraightFlush() {
    if (this.isStraight() && this.isFlush()) {
      return true;
    }
    
    return false;
  }
  
  isRoyalFlush() {
    if (this.isStraightFlush() && this.hand[this.hand.length - 1].value === 14) {
      return true;
    }
  }
  
  constructor( cards: Card[]) {
    let hand = cards.slice() as p_hand;
    //sort it by the suit
    this.hand = hand;
  }
  
  doTest(func, param?) {
    this.setAces(false);
    let result1 = func(param);
    if (result1) {
      return result1;
    }
    this.setAces(true);
    let result2 = func(param);
    if (result2) {
      return result2;
    }
  }
  
  detectBestHand() {
    if (this.doTest(this.isRoyalFlush.bind(this))) {
      return 'Royal Flush';
    }
    if (this.doTest(this.isStraightFlush.bind(this))) {
      return 'Straight Flush';
    }
    if (this.doTest(this.isOfKind.bind(this), 4)) {
      return '4 of a Kind';
    }
    if (this.doTest(this.isFullHouse.bind(this))) {
      return 'Full House';
    }
    if (this.doTest(this.isFlush.bind(this))) {
      return 'Flush';
    }
    if (this.doTest(this.isStraight.bind(this))) {
      return 'Straight';
    }
    if (this.doTest(this.isOfKind.bind(this), 3)) {
      return '3 of a Kind';
    }
    if (this.doTest(this.isPair.bind(this))) {
      return '2 Pair'
    }
    if (this.doTest(this.isOfKind.bind(this), 2)) {
      return 'Pair';
    }
  }
}
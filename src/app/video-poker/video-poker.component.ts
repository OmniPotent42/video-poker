import { Component, OnInit } from '@angular/core';

import { Player } from '../player';
import { Deck } from '../deck';
import { Card } from '../card';
import { HandDetector } from '../hand-detector';
import { Suits } from '../suits';

class PokerCard extends Card {
  keep = false;

  constructor(suit: Suits, value: number) {
    super(suit, value);
    this.keep = true;
  }
}

@Component({
  selector: 'app-video-poker',
  templateUrl: './video-poker.component.html',
  styleUrls: ['./video-poker.component.css', './card-classes.css']
})

export class VideoPokerComponent implements OnInit {
  log = console.log;
  
  started = false;
  deck: Deck;
  player: Player = new Player('player1');
  winText: string = '';
  
  constructor() { }

  ngOnInit() {  
    this.startGame();
    
    /*
    // test the handDetector class
    let testHand = [{suit: 0, value: 1, alternateValue: 14}, {suit: 1, value: 1, alternateValue: 14}, {suit: 2, value: 1, alternateValue: 14}, {suit: 0, value: 11}, {suit: 0, value: 10}];
    
    let testHandDetector = new HandDetector(testHand as Card[]);
    
    
    console.log(testHandDetector.detectBestHand());
    */
    
  }

  startGame() {
    this.winText = '';
    this.started = true;
    this.player.discard([0, 1, 2, 3, 4]);
    this.deck = new Deck();
    this.deck.shuffle();
    this.player.draw(this.deck.draw(5));
  }
  
  mulligan() {
    this.started = false;
    let cards = (this.player.hand as PokerCard[]);
    
    let mulligans = [];
    
    for (let i = 0; i < cards.length; i++) {
      if (!cards[i].keep) {
        mulligans.push(i);
      }
    }
    
    this.player.discard(mulligans);
    
    this.player.draw(this.deck.draw(mulligans.length));
    
    let handDetector = new HandDetector(this.player.hand);
    this.winText = handDetector.detectBestHand();
    
    for (let i = 0; i < this.player.hand.length; i++) {
      (this.player.hand[i] as PokerCard).keep = true;
    }
  }
}

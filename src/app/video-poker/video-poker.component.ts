import { Component, OnInit } from '@angular/core';

import { Player } from '../player';
import { Deck } from '../deck';
import { Card } from '../card';
import { HandDetector } from '../hand-detector';
import { Suits } from '../suits';

@Component({
  selector: 'app-video-poker',
  templateUrl: './video-poker.component.html',
  styleUrls: ['./video-poker.component.css', './card-classes.css']
})

export class VideoPokerComponent implements OnInit {
  log = console.log;
  
  money: number;
  started = false;
  deck: Deck;
  player: Player = new Player('player1');
  winText: string = '';
  mulligans: number[];
  
  constructor() { }

  ngOnInit() {
    this.money = 100;
    this.startGame();
  }
  
  toggleMulligan(i: number) {
    let index = this.mulligans.indexOf(i);
    if (index > -1) {
      this.mulligans[i] = -1;
    } else {
      this.mulligans[i] = i;
    }
    console.log(this.mulligans)
  }
  
  isMulligan(i: number) {
    return !!(this.mulligans.indexOf(i) + 1);
  }

  startGame() {
    this.money -= 20;
    this.mulligans = [0,1,2,3,4];
    this.winText = '';
    this.started = true;
    this.player.discard([0, 1, 2, 3, 4]);
    this.deck = new Deck();
    this.deck.shuffle();
    this.player.draw(this.deck.draw(5));
  }
  
  mulligan() {
    this.started = false;
    let cards = this.player.hand;
    
    this.mulligans = this.mulligans.filter(function(i) {
      return i > -1;
    });
    
    this.player.discard(this.mulligans);
    
    this.player.draw(this.deck.draw(this.mulligans.length));
    
    let handInfo = new HandDetector(this.player.hand).detectBestHand();
    
    this.winText = 'You got a ' + handInfo[0] + '!';
    this.money += (handInfo[1] as number);
    
    this.mulligans = [0,1,2,3,4]
  }
}

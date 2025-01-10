import { Dealer } from "./dealer";
import { Deck } from "./deck";
import { Player } from "./player";

export type Round = {
  result: string; //win, lose, draw
  action: string; //stand, bust, surrender, blackjack
  bet: number;
  prize: number;
};

export class Table {
  private _dealer: Dealer;
  private _player: Player;
  private _deck: Deck;
  private _gamePhase: string; //bet, distribute, action, evaluate
  private _rounds: number;
  private _currentRound: number = 1;
  private _results: Round[];

  get dealer() {
    return this._dealer;
  }
  get player() {
    return this._player;
  }
  get deck() {
    return this._deck;
  }
  set deck(newDeck: Deck) {
    this._deck = newDeck;
  }
  get gamePhase() {
    return this._gamePhase;
  }
  set gamePhase(updateGamePhase: string) {
    this._gamePhase = updateGamePhase;
  }
  get rounds() {
    return this._rounds;
  }
  get currentRound() {
    return this._currentRound;
  }
  set currentRound(value: number) {
    this._currentRound = value;
  }
  get results() {
    return this._results;
  }
  set results(newResults: Round[]) {
    this._results = newResults;
  }

  constructor(name: string, rounds: number) {
    this._dealer = new Dealer();
    this._player = new Player(name);

    this._deck = new Deck();
    this._deck.shuffle();

    this._gamePhase = "bet";
    this._rounds = rounds;
    this._results = [];
  }

  //手札の初期化 -> Dealerに1枚、Playerに2枚のカードを配る
  initializeHands(): void {
    this.dealer.hand.push(this.deck.drawOne()!);
    this.player.hand.push(this.deck.drawOne()!);
    this.player.hand.push(this.deck.drawOne()!);
  }

  resetDeck(): void {
    this.deck = new Deck();
    this.deck.shuffle();
  }

  toString(): string {
    return `Round${this.currentRound}: gamePhase -> ${
      this.gamePhase
    }, dealer -> ${this.dealer.toString()}, player -> ${this.player.toString()}`;
  }
}

import { Card } from "./card";

export class Player {
  private _name: string;
  private _hand: Card[];
  private _status: string; //betting, acting | surrender, hit, double, stand | bust, blackjack
  private _bet: number = 0;
  private _chips: number = 400;

  get name() {
    return this._name;
  }
  get hand() {
    return this._hand;
  }
  get status() {
    return this._status;
  }
  set status(updateStatus: string) {
    this._status = updateStatus;
  }
  get bet() {
    return this._bet;
  }
  set bet(updateBet: number) {
    this._bet = updateBet;
  }
  get chips() {
    return this._chips;
  }
  set chips(updateChips: number) {
    this._chips = updateChips;
  }

  constructor(name: string) {
    this._name = name;
    this._hand = [];
    this._status = "betting"; 
  }

  toString(): string {
    return `プレイヤー名: ${this.name}, 状態: ${this.status}, 賭け金: ${this.bet}`;
  }
}

import { Card } from "./card";

export class Dealer {
  private _name: string;
  private _hand: Card[];
  private _status: string; //waiting for bets, waiting for actions | hit, stand | bust, blackjack

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

  constructor() {
    this._name = "Dealer";
    this._hand = [];
    this._status = "waiting for bets";
  }

  toString(): string {
    return `状態: ${this.status}, 手札: ${
      this.hand.length > 0 ? this.hand[0].getRankNumber() : "???"
    }`;
  }
}

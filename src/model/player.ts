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
  set hand(newHand: Card[]) {
    this._hand = newHand;
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

  //手札の点数を取得するメソッド
  getHandPoint(): number {
    let totalPoint = 0;
    let aceRankCards: Card[] = this.getAceRankFromHand();

    this.hand.forEach((card: Card) => {
      totalPoint += card.getRankNumber();
    });

    if (totalPoint > 21 && aceRankCards.length > 0) {
      //"A"の点数は1点または11点(最初は11点で計算してる)
      //totalPointが21点を上回っていて、尚且つ手札に"A"が存在するなら21点に収まるように"A"の点数を1点として計算し直す
      while (aceRankCards.length > 0) {
        totalPoint = totalPoint - 11 + 1;
        if (totalPoint <= 21) return totalPoint;

        aceRankCards.pop();
      }
    }

    return totalPoint;
  }

  //rankが"A"の手札を取得するメソッド
  getAceRankFromHand(): Card[] {
    let results: Card[] = [];

    this.hand.forEach((card: Card) => {
      if (card.rank === "A") {
        results.push(card);
      }
    });

    return results;
  }

  //手札の点数は有効なのか確認するメソッド(21点以下)
  isBelow21Point(): boolean {
    return this.getHandPoint() <= 21;
  }

  //手札が「blackjack」か判定
  isBlackJack(): boolean {
    if (this.hand.length !== 2 || this.getHandPoint() !== 21) return false;

    const ranks = new Set<string>(["A", "J", "Q", "K"]);

    for (let i = 0; i < this.hand.length; i++) {
      if (!ranks.has(this.hand[i].rank)) {
        return false;
      }
    }

    return true;
  }
}

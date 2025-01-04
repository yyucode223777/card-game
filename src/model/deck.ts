import { Card } from "./card";

export class Deck {
  private _cardList: Card[];

  get cardList() {
    return this._cardList;
  }

  constructor() {
    this._cardList = [];

    let suits = ["S", "C", "H", "D"]; //スペード, クラブ, ハート,ダイアモンド
    let ranks = [
      "A",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
    ];

    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < ranks.length; j++) {
        this.cardList.push(new Card(suits[i], ranks[j]));
      }
    }
  }

  shuffle(): void {
    for (let i = 0; i < this.cardList.length; i++) {
      let currentIndex = Math.floor(Math.random() * this.cardList.length);
      let temp = this.cardList[i];
      this.cardList[i] = this.cardList[currentIndex];
      this.cardList[currentIndex] = temp;
    }
  }

  isEmpty(): boolean {
    return this.cardList.length === 0;
  }

  drawOne(): Card | null {
    if (this.isEmpty()) {
      window.alert(
        "カードがもう残っていません。新しいゲームを始めるにはデッキを更新してください。"
      );
      return null;
    } else {
      return this.cardList.pop()!;
    }
  }
}

export class Card {
  private readonly _suit: string;
  private readonly _rank: string;

  get suit() {
    return this._suit;
  }
  get rank() {
    return this._rank;
  }

  constructor(suit: string, rank: string) {
    this._suit = suit;
    this._rank = rank;
  }

  toString(): string {
    return `${this.suit}: ${this.rank}`;
  }

  getRankNumber(): number {
    const rankToNumberMap = new Map<string, number>([
      ["A", 11],
      ["2", 2],
      ["3", 3],
      ["4", 4],
      ["5", 5],
      ["6", 6],
      ["7", 7],
      ["8", 8],
      ["9", 9],
      ["10", 10],
      ["J", 10],
      ["Q", 10],
      ["K", 10],
    ]);

    return rankToNumberMap.get(this.rank) ?? 0;
  }
}

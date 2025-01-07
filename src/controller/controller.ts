import { Table } from "../model/table";
import { View } from "../view/view";

export class Controller {
  private _table: Table;

  get table() {
    return this._table;
  }

  constructor(table: Table) {
    this._table = table;
  }

  //ゲームの初期化 -> tableクラスのインスタンス化、初期画面の描画
  initializeGame(): void {
    if (this.table.currentRound <= this.table.rounds) {
      this.initializeRound();
      View.renderGame(this.table); //ゲーム画面の大枠
      View.initDealerHand(); //カード配布前のDealerの手札
      View.initPlayerHand(); //カード配布前のPlayerの手札
      View.updateOperation("bet");
      View.initResultList(this.table); //結果画面の描画
    } else {
      //1.トータルの結果を表示,2.再プレイするか確認
      alert(`お疲れ様です。あなたのチップは${this.table.player.chips}です。`);
      this.initializeRound();

      this.table.player.chips = 400;
      this.table.currentRound = 1;
      this.table.results = [];

      this.initializeGame();
    }
  }

  //playerが賭け金ををsubmitした時に実行 -> 1.player,dealer,tableの状態を変更 2.カードの配布 3.operationDivの更新(actionsDiv)
  handleBetting(stakes: number): void {
    if (this.table.player.chips < stakes) {
      window.alert("賭け金がチップを超えています。もう一度入力してください!");
      View.updateOperation("bet");
      return;
    }
    // 1.player,dealer,tableの状態を変更
    // -- Model --
    this.table.player.bet = stakes;
    this.table.player.status = "acting";
    this.table.dealer.status = "waiting for actions";
    this.table.gamePhase = "action";
    // -- View --
    View.updateDealer(this.table.dealer);
    View.updatePlayer(this.table.player);

    // 2.カードの配布
    // -- Model --
    this.table.initializeHands();
    // -- View --
    View.deleteDealerHand();
    View.deletePlayerHand();
    View.addDealerHand(this.table.dealer.hand[0]);
    this.table.player.hand.forEach((card) => View.addPlayerHand(card));

    // 3.operationDivの変更
    // -- View --
    View.updateOperation("action");
  }

  //action:stringに応じて、実行内容が変わるメソッド
  async handleActing(action: string): Promise<void> {
    switch (action) {
      case "surrender": {
        this.table.player.status = "surrender";
        this.table.player.chips -= Math.floor(this.table.player.bet / 2);
        View.updatePlayer(this.table.player);

        //ボタンを使用不可
        View.disableSurrenderBtn();
        View.disableStandBtn();
        View.disableHitBtn();
        View.disableDoubleBtn();

        await this.draw17PointOver();

        //Roundの評価をする関数(table.resultsの更新)
        await this.evaluateRound();
        break;
      }
      case "stand": {
        this.table.player.status = "stand";
        if (this.table.player.isBlackJack()) {
          this.table.player.status = "blackjack";
        }
        View.updatePlayer(this.table.player);
        //ボタンを使用不可
        View.disableSurrenderBtn();
        View.disableStandBtn();
        View.disableHitBtn();
        View.disableDoubleBtn();

        await this.draw17PointOver();

        //Roundの評価をする関数(table.resultsの更新)
        await this.evaluateRound();
        break;
      }
      case "hit": {
        const addedCard = this.table.deck.drawOne()!;
        this.table.player.status = "hit";
        this.table.player.hand.push(addedCard);

        //ボタンを使用不可
        View.disableSurrenderBtn();
        View.disableDoubleBtn();
        if (!this.table.player.isBelow21Point()) {
          this.table.player.status = "bust";
          this.table.player.chips -= this.table.player.bet;
          View.updatePlayer(this.table.player);
          View.addPlayerHand(addedCard);

          View.disableStandBtn();
          View.disableHitBtn();

          await this.draw17PointOver();

          //Roundの評価をする関数(table.resultsの更新)
          await this.evaluateRound();
        }
        View.updatePlayer(this.table.player);
        View.addPlayerHand(addedCard);

        break;
      }
      case "double": {
        const addedCard = this.table.deck.drawOne()!;
        this.table.player.status = "double";
        this.table.player.bet *= 2;
        this.table.player.hand.push(addedCard);

        //ボタンを使用不可
        View.disableSurrenderBtn();
        View.disableDoubleBtn();
        if (!this.table.player.isBelow21Point()) {
          this.table.player.status = "bust";
          this.table.player.chips -= this.table.player.bet;
          View.updatePlayer(this.table.player);
          View.addPlayerHand(addedCard);

          View.disableStandBtn();
          View.disableHitBtn();

          await this.draw17PointOver();

          //Roundの評価をする関数(table.resultsの更新)
          await this.evaluateRound();
        }
        View.updatePlayer(this.table.player);
        View.addPlayerHand(addedCard);

        break;
      }
    }
  }

  //Roundの評価
  async evaluateRound(): Promise<void> {
    if (this.table.gamePhase !== "evaluate") return;

    await this.delay(1000);

    if (this.table.player.status === "surrender") {
      this.table.results.push(`${this.table.player.name} Surrender.`);
    } else if (this.table.player.status === "bust") {
      this.table.results.push(`${this.table.player.name} Bust.`);
    } else if (this.table.dealer.status === "blackjack") {
      if (this.table.player.status === "blackjack") {
        this.table.results.push(`${this.table.player.name} Push.`);
      } else {
        this.table.results.push(`${this.table.player.name} Lose.`);
        this.table.player.chips -= this.table.player.bet;
      }
    } else if (
      this.table.dealer.status === "bust" ||
      this.table.dealer.getHandPoint() < this.table.player.getHandPoint()
    ) {
      if (this.table.player.status === "blackjack") {
        this.table.results.push(`${this.table.player.name} BlackJack.`);
        this.table.player.chips += Math.floor(this.table.player.bet * 1.5);
      } else {
        this.table.results.push(`${this.table.player.name} Win.`);
        this.table.player.chips += this.table.player.bet;
      }
    } else if (
      this.table.dealer.status !== "bust" &&
      this.table.dealer.getHandPoint() > this.table.player.getHandPoint()
    ) {
      this.table.results.push(`${this.table.player.name} Lose.`);
      this.table.player.chips -= this.table.player.bet;
    } else {
      this.table.results.push(`${this.table.player.name} Push.`);
    }

    //ここまででラウンド終了
    this.table.currentRound++;
    View.insertNextBtn();
  }

  initializeRound(): void {
    this.table.player.hand = [];
    this.table.player.status = "betting";
    this.table.player.bet = 0;

    this.table.dealer.hand = [];
    this.table.dealer.status = "wating for bets";

    this.table.gamePhase = "bet";
    this.table.resetDeck();
  }

  async draw17PointOver(): Promise<void> {
    while (this.table.dealer.getHandPoint() < 17) {
      await this.delay(1000);
      const addedCard = this.table.deck.drawOne()!;
      this.table.dealer.status = "hit";
      this.table.dealer.hand.push(addedCard);
      View.updateDealer(this.table.dealer);
      View.addDealerHand(addedCard);
    }

    if (!this.table.dealer.isBelow21Point()) {
      this.table.dealer.status = "bust";
      View.updateDealer(this.table.dealer);
    } else {
      this.table.dealer.status = "stand";
      if (this.table.dealer.isBlackJack()) {
        this.table.dealer.status = "blackjack";
      }
      View.updateDealer(this.table.dealer);
    }

    this.table.gamePhase = "evaluate";
  }

  delay(sm: number): Promise<void> {
    return new Promise<void>((resolve, _reject) => {
      setTimeout(() => {
        resolve();
      }, sm);
    });
  }
}

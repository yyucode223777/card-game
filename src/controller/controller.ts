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
    View.renderGame(this.table); //ゲーム画面の大枠
    View.initDealerHand(); //カード配布前のDealerの手札
    View.initPlayerHand(); //カード配布前のPlayerの手札
    View.updateOperation("bet");
  }

  //playerが賭け金ををsubmitした時に実行 -> 1.player,dealer,tableの状態を変更 2.カードの配布 3.operationDivの更新(actionsDiv)
  handleBetting(stakes: number): void {
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

    // console.log(this.table.toString())
  }
}

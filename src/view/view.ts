import { blackJack } from "../main";
import { Card } from "../model/card";
import { Dealer } from "../model/dealer";
import { Player } from "../model/player";
import { Table } from "../model/table";

export class View {
  //ゲームの初期画面を作成
  static renderGame(table: Table): void {
    const app = document.querySelector("#app") as HTMLDivElement;
    app.innerHTML = "";

    const gameDiv = document.createElement("div");
    gameDiv.classList.add(
      "flex",
      "flex-col",
      "items-center",
      "justify-center",
      "gap-y-4",
      "px-3",
      "py-10"
    );
    gameDiv.id = "game-div";

    const gridContainer = document.createElement("div");
    gridContainer.classList.add(
      "container",
      "grid",
      "grid-cols-4",
      "gap-4",
      "max-w-5xl"
    );
    gridContainer.append(View.renderTable(table), View.renderOperation());

    gameDiv.append(gridContainer, View.renderResult());
    app.append(gameDiv);
  }

  static renderTable(table: Table): HTMLDivElement {
    const tableDiv = document.createElement("div");
    tableDiv.classList.add(
      "sm:col-span-2",
      "md:col-span-3",
      "col-span-4",
      "flex",
      "flex-col",
      "gap-10",
      "py-14",
      "bg-green-900",
      "rounded",
      "border-4",
      "border-yellow-400",
      "px-2"
    );
    tableDiv.id = "table";

    tableDiv.append(
      View.renderDealer(table.dealer),
      View.renderPlayer(table.player)
    );

    return tableDiv;
  }

  static renderDealer(dealer: Dealer): HTMLDivElement {
    const dealerDiv = document.createElement("div");
    dealerDiv.classList.add("flex", "flex-col", "gap-2");
    dealerDiv.id = "dealer";
    dealerDiv.innerHTML = `
    <h2 class="text-yellow-400 text-3xl font-semibold text-center">Dealer</h2>
    <p id="dealer-status" class="text-white text-xl text-center">S: ${dealer.status}</p>
    <div id="dealer-hand" class="flex gap-5 justify-center"></div>
    `;

    return dealerDiv;
  }

  static updateDealer(dealer: Dealer): void {
    const dealerDiv = document.querySelector("#dealer") as HTMLDivElement;
    const dealerStatus = dealerDiv.querySelector(
      "#dealer-status"
    ) as HTMLParagraphElement;
    dealerStatus.innerText = `S: ${dealer.status}`;
  }

  static initDealerHand(): void {
    const dealerHandEl = document.querySelector(
      "#dealer-hand"
    ) as HTMLDivElement;
    dealerHandEl.innerHTML = "";

    dealerHandEl.append(View.renderCard(new Card("questionMark", "?")));
  }

  static addDealerHand(card: Card): void {
    const dealerHandEl = document.querySelector(
      "#dealer-hand"
    ) as HTMLDivElement;

    dealerHandEl.append(View.renderCard(card));
  }

  static deleteDealerHand(): void {
    const dealerHandEl = document.querySelector(
      "#dealer-hand"
    ) as HTMLDivElement;
    dealerHandEl.innerHTML = "";
  }

  static renderPlayer(player: Player): HTMLDivElement {
    const playerDiv = document.createElement("div");
    playerDiv.classList.add("flex", "flex-col", "gap-2");
    playerDiv.id = "player";
    playerDiv.innerHTML = `
    <h2 class="text-yellow-400 text-3xl font-semibold text-center">${player.name}</h2>
    <div class="flex gap-5 justify-center">
        <p id="player-status" class="text-white text-xl">S: ${player.status}</p>
        <p id="player-bet" class="text-white text-xl">B: ${player.bet}</p>
        <p id="player-chips" class="text-white text-xl">C: ${player.chips}</p>
    </div>
    <div id="player-hand" class="flex gap-5 justify-center"></div>
    `;

    return playerDiv;
  }

  static updatePlayer(player: Player): void {
    const playerDiv = document.querySelector("#player") as HTMLDivElement;
    const playerStatus = playerDiv.querySelector(
      "#player-status"
    ) as HTMLParagraphElement;
    playerStatus.innerText = `S: ${player.status}`;
    const playerBet = playerDiv.querySelector(
      "#player-bet"
    ) as HTMLParagraphElement;
    playerBet.innerText = `B: ${player.bet}`;
    const playerChips = playerDiv.querySelector(
      "#player-chips"
    ) as HTMLParagraphElement;
    playerChips.innerText = `C: ${player.chips};`;
  }
  
  static initPlayerHand(): void {
    const playerHandEl = document.querySelector(
      "#player-hand"
    ) as HTMLDivElement;
    playerHandEl.innerHTML = "";

    playerHandEl.append(
      View.renderCard(new Card("questionMark", "?")),
      View.renderCard(new Card("questionMark", "?"))
    );
  }

  static addPlayerHand(card: Card): void {
    const playerHandEl = document.querySelector(
      "#player-hand"
    ) as HTMLDivElement;

    playerHandEl.append(View.renderCard(card));
  }

  static deletePlayerHand(): void {
    const playerHandEl = document.querySelector(
      "#player-hand"
    ) as HTMLDivElement;
    playerHandEl.innerHTML = "";
  }

  static renderCard(card: Card): HTMLDivElement {
    const suitMap = new Map<string, string>([
      ["S", "spade"],
      ["C", "clover"],
      ["H", "heart"],
      ["D", "diamond"],
    ]);

    const cardDiv = document.createElement("div");
    cardDiv.classList.add(
      "bg-white",
      "flex",
      "flex-col",
      "justify-center",
      "items-center",
      "px-2"
    );
    cardDiv.innerHTML = `
    <div class="text-center pt-2">
      <img src="https://recursionist.io/img/${
        suitMap.get(card.suit) ?? "questionMark"
      }.png" style="width: 50px; height: 50px;" />
    </div>
    <p class="mt-3 font-bold text-center text-2xl">${card.rank}</p>
    `;

    return cardDiv;
  }

  static renderOperation(): HTMLDivElement {
    const operationDiv = document.createElement("div");
    operationDiv.classList.add(
      "col-span-4",
      "sm:col-span-2",
      "md:col-span-1",
      "bg-green-900",
      "rounded",
      "border-4",
      "border-yellow-400",
      "py-14",
      "px-2"
    );
    operationDiv.id = "operation";

    return operationDiv;
  }

  static updateOperation(mode: "bet" | "action"): void {
    const operationDiv = document.querySelector("#operation") as HTMLDivElement;
    operationDiv.innerHTML = "";
    if (mode === "bet") {
      operationDiv.append(View.renderBet());
    } else {
      operationDiv.append(View.renderActions());
    }
  }

  static renderResult(): HTMLDivElement {
    const resultDiv = document.createElement("div");
    resultDiv.classList.add(
      "container",
      "max-w-2xl",
      "bg-green-900",
      "rounded",
      "border-4",
      "border-yellow-400",
      "py-6",
      "px-2"
    );
    resultDiv.id = "result";
    resultDiv.innerHTML = `
    <h2 class="text-yellow-400 text-3xl font-bold text-center mb-3">Results</h2>
    <ul id="result-list" class="list-none text-2xl"></ul>
    `;

    return resultDiv;
  }

  static renderResultListItem(round: number, message: string): HTMLLIElement {
    const resultListItem = document.createElement("li");
    resultListItem.classList.add(
      "font-semibold",
      "ml-16",
      "mb-3",
      `text-white`
    );
    resultListItem.innerText = `${round}: ${message}`;

    return resultListItem;
  }

  static initResultList(table: Table): void {
    const resultListEl = document.querySelector(
      "#result-list"
    ) as HTMLUListElement;
    resultListEl.innerHTML = "";

    table.results.forEach((message: string, index: number) => {
      resultListEl.append(View.renderResultListItem(index + 1, message));
    });
  }

  static addResultListItem(round: number, message: string): void {
    const resultListEl = document.querySelector(
      "#result-list"
    ) as HTMLUListElement;

    resultListEl.append(View.renderResultListItem(round, message));
  }

  static renderBet(): HTMLDivElement {
    //引数でユーザーのchipsが必要 -> inputタグのmax属性をchipsの値に応じて変更する為
    const betDiv = document.createElement("div");
    betDiv.id = "bet";
    betDiv.innerHTML = `
    <p class="text-center text-yellow-400 text-3xl font-semibold mb-7">Stake</p>
    <form>
        <div class="flex flex-row justify-around sm:flex-col gap-3">
            <div class="sm:flex sm:gap-2 sm:justify-between">
                <label class="text-lg sm:text-2xl text-white font-semibold" for="5">$ 5</label>
                <input inputmode="numeric" class="text-lg sm:text-2xl w-full sm:w-2/4 font-semibold rounded px-2 focus:outline-2 outline-emerald-400"
                    type="number" min="0" placeholder="0" id="5"/>
            </div>
            <div class="sm:flex sm:gap-2 sm:justify-between">
                <label class="text-lg sm:text-2xl text-white font-semibold" for="20">$ 20</label>
                <input inputmode="numeric" class="text-lg sm:text-2xl w-full sm:w-2/4 font-semibold rounded px-2 focus:outline-2 outline-emerald-400"
                    type="number" min="0" placeholder="0" id="20"/>
            </div>
            <div class="sm:flex sm:gap-2 sm:justify-between">
                <label class="text-lg sm:text-2xl text-white font-semibold" for="50">$ 50</label>
                <input inputmode="numeric" class="text-lg sm:text-2xl w-full sm:w-2/4 font-semibold rounded px-2 focus:outline-2 outline-emerald-400"
                    type="number" min="0" placeholder="0" id="50"/>
            </div>
            <div class="sm:flex sm:gap-2 sm:justify-between">
                <label class="text-lg sm:text-2xl text-white font-semibold" for="100">$ 100</label>
                <input inputmode="numeric" class="text-lg sm:text-2xl w-full sm:w-2/4 font-semibold rounded px-2 focus:outline-2 outline-emerald-400"
                    type="number" min="0" placeholder="0" id="100"/>
            </div>
        </div>
        <div class="flex justify-center mt-5">
            <button id="bet-btn" type="submit"
                class="bg-yellow-500 rounded-full text-white text-2xl w-4/5 py-2 shadow-black shadow-md tarnsition-all duration-150 hover:opacity-90 hover:translate-y-1 hover:shadow-none">Submit</button>
        </div>
    </form>`;

    const formEl = betDiv.querySelector("form") as HTMLFormElement;
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
      let totalBet = 0;
      formEl.querySelectorAll("input").forEach((inputEl) => {
        totalBet += Number(inputEl.id) * Number(inputEl.value);
      });

      //ControllerのメソッドにtotalBetを引数として渡して、Modelの更新、カードの配布、operationDivの更新(actionsをレンダリング)
      blackJack.handleBetting(totalBet);
    });

    return betDiv;
  }

  static renderActions(): HTMLDivElement {
    const actionsDiv = document.createElement("div");
    actionsDiv.id = "actions";
    actionsDiv.innerHTML = `
    <p class="text-center text-yellow-400 text-3xl font-semibold mb-7">Action</p>
    <div class="flex flex-col items-center gap-5">
        <button
            id="surrender" class="bg-slate-500 rounded-full text-white text-2xl w-4/5 py-2 shadow-black shadow-md tarnsition-all duration-150 hover:bg-slate-400 hover:translate-y-1 hover:shadow-none disabled:shadow-none disabled:translate-y-0 disabled:cursor-not-allowed disabled:bg-slate-500 disabled:bg-opacity-80">Surrender</button>
        <button
            id="stand" class="bg-blue-500 rounded-full text-white text-2xl w-4/5 py-2 shadow-black shadow-md tarnsition-all duration-150 hover:bg-blue-400 hover:translate-y-1 hover:shadow-none disabled:shadow-none disabled:translate-y-0 disabled:cursor-not-allowed disabled:bg-blue-500 disabled:bg-opacity-80">Stand</button>
        <button
            id="hit" class="bg-amber-500 rounded-full text-white text-2xl w-4/5 py-2 shadow-black shadow-md tarnsition-all duration-150 hover:bg-amber-400 hover:translate-y-1 hover:shadow-none disabled:shadow-none disabled:translate-y-0 disabled:cursor-not-allowed disabled:bg-amber-500 disabled:bg-opacity-80">Hit</button>
        <button
            id="double" class="bg-red-500 rounded-full text-white text-2xl w-4/5 py-2 shadow-black shadow-md tarnsition-all duration-150 hover:bg-red-400 hover:translate-y-1 hover:shadow-none disabled:shadow-none disabled:translate-y-0 disabled:cursor-not-allowed disabled:bg-red-500 disabled:bg-opacity-80">Double</button>
    </div>
    `;

    //各ボタンにイベントリスナーを追加
    const surrenderBtn = actionsDiv.querySelector(
      "#surrender"
    ) as HTMLButtonElement;
    const standBtn = actionsDiv.querySelector("#stand") as HTMLButtonElement;
    const hitBtn = actionsDiv.querySelector("#hit") as HTMLButtonElement;
    const doubleBtn = actionsDiv.querySelector("#double") as HTMLButtonElement;

    if (blackJack.table.player.chips < blackJack.table.player.bet * 2) {
      doubleBtn.disabled = true;
    }

    surrenderBtn.addEventListener("click", () => {
      blackJack.handleActing(surrenderBtn.id);
    });
    standBtn.addEventListener("click", () => {
      blackJack.handleActing(standBtn.id);
    });
    hitBtn.addEventListener("click", () => {
      blackJack.handleActing(hitBtn.id);
    });
    doubleBtn.addEventListener("click", () => {
      blackJack.handleActing(doubleBtn.id);
    });

    return actionsDiv;
  }

  static disableSurrenderBtn(): void {
    const actionDiv = document.querySelector("#actions") as HTMLDivElement;
    const surrenderBtn = actionDiv.querySelector(
      "#surrender"
    ) as HTMLButtonElement;

    surrenderBtn.disabled = true;
  }

  static disableStandBtn(): void {
    const actionDiv = document.querySelector("#actions") as HTMLDivElement;
    const standBtn = actionDiv.querySelector("#stand") as HTMLButtonElement;

    standBtn.disabled = true;
  }

  static disableHitBtn(): void {
    const actionDiv = document.querySelector("#actions") as HTMLDivElement;
    const hitBtn = actionDiv.querySelector("#hit") as HTMLButtonElement;

    hitBtn.disabled = true;
  }

  static disableDoubleBtn(): void {
    const actionDiv = document.querySelector("#actions") as HTMLDivElement;
    const doubleBtn = actionDiv.querySelector("#double") as HTMLButtonElement;

    doubleBtn.disabled = true;
  }

  static renderNextBtn(): HTMLDivElement {
    const nextBtnDiv = document.createElement("div");
    nextBtnDiv.classList.add("flex", "justify-center", "my-5", "w-full");
    nextBtnDiv.innerHTML = `
    <button id="next-btn" type="button"
                class="bg-violet-700 rounded-full text-white text-2xl w-4/5 max-w-md py-2 shadow-black shadow-md tarnsition-all duration-150 hover:opacity-90 hover:translate-y-1 hover:shadow-none">Next</button>
    `;

    const nextBtn = nextBtnDiv.querySelector("#next-btn") as HTMLButtonElement;
    nextBtn.addEventListener("click", () => {
      blackJack.initializeGame();
    });

    return nextBtnDiv;
  }

  static insertNextBtn(): void {
    const gameDiv = document.querySelector("#game-div") as HTMLDivElement;
    const resultDiv = document.querySelector("#result") as HTMLDivElement;
    gameDiv.insertBefore(View.renderNextBtn(), resultDiv);
  }
}

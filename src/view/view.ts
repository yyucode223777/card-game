export class View {
  static renderGame(): HTMLDivElement {
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
    gridContainer.append(View.renderTable(), View.renderOperation());

    gameDiv.append(gridContainer, View.renderResult());
    return gameDiv;
  }

  static renderTable(): HTMLDivElement {
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

    tableDiv.append(View.renderDealer(), View.renderPlayer("hogehoge"));

    return tableDiv;
  }

  static renderDealer(): HTMLDivElement {
    const dealerDiv = document.createElement("div");
    dealerDiv.classList.add("flex", "flex-col", "gap-2");
    dealerDiv.id = "dealer";
    dealerDiv.innerHTML = `
    <h2 class="text-yellow-400 text-3xl font-semibold text-center">Dealer</h2>
    <p id="dealer-status" class="text-white text-xl text-center">S: waiting for bets</p>
    <div id="dealer-hand" class="flex gap-5 justify-center"></div>
    `;

    return dealerDiv;
  }

  static renderPlayer(playerName: string): HTMLDivElement {
    const playerDiv = document.createElement("div");
    playerDiv.classList.add("flex", "flex-col", "gap-2");
    playerDiv.id = "player";
    playerDiv.innerHTML = `
    <h2 class="text-yellow-400 text-3xl font-semibold text-center">${playerName}</h2>
    <div class="flex gap-5 justify-center">
        <p id="player-status" class="text-white text-xl">S: betting</p>
        <p id="player-bet" class="text-white text-xl">B: 0</p>
        <p id="player-chips" class="text-white text-xl">C: 400</p>
    </div>
    <div id="player-hand" class="flex gap-5 justify-center"></div>
    `;

    return playerDiv;
  }

  static renderCard(suit: string, value: string): HTMLDivElement {
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
      <img src="https://recursionist.io/img/${suit}.png" style="width: 50px; height: 50px;" />
    </div>
    <p class="mt-3 font-bold text-center text-2xl">${value}</p>
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
      "py-6",
      "px-2"
    );
    operationDiv.id = "operation";

    return operationDiv;
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

  static renderResultListItem(round: number, isWin: boolean): HTMLLIElement {
    const resultListItem = document.createElement("li");
    resultListItem.classList.add(
      "font-semibold",
      "ml-16",
      "mb-3",
      `text-${isWin ? "pink" : "sky"}-400`
    );
    resultListItem.innerText = `${round}: You ${isWin ? "Win" : "Lose"}`;

    return resultListItem;
  }

  static renderBet(): void {
    const operationDiv = document.querySelector("#operation") as HTMLDivElement;
    operationDiv.innerHTML = "";

    const betDiv = document.createElement("div");
    betDiv.id = "bet";
    betDiv.innerHTML = `
    <p class="text-center text-yellow-400 text-3xl font-semibold mb-7">Stake</p>
    <div class="flex flex-row justify-around sm:flex-col gap-3">
        <div class="flex gap-2 sm:justify-between">
            <label class="text-2xl text-white font-semibold" for="denomination-5">5:</label>
            <input class="text-xl sm:w-2/3 font-semibold rounded px-2 focus:outline-2 outline-emerald-400"
                type="number" min="0" max="80" value="0" id="denomination-5" />
        </div>
        <div class="flex gap-2 sm:justify-between">
            <label class="text-2xl text-white font-semibold" for="denomination-20">20:</label>
            <input class="text-xl sm:w-2/3 font-semibold rounded px-2 focus:outline-2 outline-emerald-400"
                type="number" min="0" max="20" value="0" id="denomination-20" />
        </div>
        <div class="flex gap-2 sm:justify-between">
            <label class="text-2xl text-white font-semibold" for="denomination-50">50:</label>
            <input class="text-xl sm:w-2/3 font-semibold rounded px-2 focus:outline-2 outline-emerald-400"
                type="number" min="0" max="8" value="0" id="denomination-50" />
        </div>
        <div class="flex gap-2 sm:justify-between">
            <label class="text-2xl text-white font-semibold" for="denomination-100">100:</label>
            <input class="text-xl sm:w-2/3 font-semibold rounded px-2 focus:outline-2 outline-emerald-400"
                type="number" min="0" max="4" value="0" id="denomination-100" />
        </div>
    </div>
    <div class="flex justify-center mt-5">
        <button id="bet-btn"
            class="bg-yellow-500 rounded-full text-white text-2xl w-4/5 py-2 shadow-black shadow-md tarnsition-all duration-150 hover:opacity-90 hover:translate-y-1 hover:shadow-none">Submit</button>
    </div>`;

    const betBtn = betDiv.querySelector("#bet-btn") as HTMLButtonElement;
    betBtn.addEventListener("click", () => {
      console.log("Bet!!!");
    });

    operationDiv.append(betDiv);
  }

  static renderActions(): void {
    const operationDiv = document.querySelector("#operation") as HTMLDivElement;
    operationDiv.innerHTML = "";

    const actionsDiv = document.createElement("div");
    actionsDiv.id = "actions";
    actionsDiv.innerHTML = `
    <p class="text-center text-yellow-400 text-3xl font-semibold mb-7">Action</p>
    <div class="flex flex-col items-center gap-5">
        <button
            class="bg-slate-500 rounded-full text-white text-2xl w-4/5 py-2 shadow-black shadow-md tarnsition-all duration-150 hover:bg-slate-400 hover:translate-y-1 hover:shadow-none">Surrender</button>
        <button
            class="bg-blue-500 rounded-full text-white text-2xl w-4/5 py-2 shadow-black shadow-md tarnsition-all duration-150 hover:bg-blue-400 hover:translate-y-1 hover:shadow-none">Stand</button>
        <button
            class="bg-amber-500 rounded-full text-white text-2xl w-4/5 py-2 shadow-black shadow-md tarnsition-all duration-150 hover:bg-amber-400 hover:translate-y-1 hover:shadow-none">Hit</button>
        <button
            class="bg-red-500 rounded-full text-white text-2xl w-4/5 py-2 shadow-black shadow-md tarnsition-all duration-150 hover:bg-red-400 hover:translate-y-1 hover:shadow-none">Double</button>
    </div>
    `;

    //各ボタンにイベントリスナーを追加

    operationDiv.append(actionsDiv);
  }
}

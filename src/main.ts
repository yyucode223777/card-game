import { View } from "./view/view";

const app = document.getElementById("app") as HTMLDivElement;
app.innerHTML = "";
app.append(View.renderGame());

View.renderBet();

const dealerHand = document.querySelector("#dealer-hand") as HTMLDivElement;
const playerHand = document.querySelector("#player-hand") as HTMLDivElement;

dealerHand.append(View.renderCard("diamond", "10"));
dealerHand.append(View.renderCard("questionMark", "?"));

playerHand.append(View.renderCard("heart", "8"));
playerHand.append(View.renderCard("spade", "J"));

const resultListEl = document.querySelector("#result-list") as HTMLUListElement;

[true, false, true, true, false, false, true, false, false, true].forEach(
  (value, index) => {
    resultListEl.append(View.renderResultListItem(index + 1, value));
  }
);

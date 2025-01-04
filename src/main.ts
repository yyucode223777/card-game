import { Controller } from "./controller/controller";
import { Table } from "./model/table";

export const blackJack = new Controller(new Table("Player", 5));
blackJack.initializeGame();

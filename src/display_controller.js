import * as comp from "./components";
import * as logic from "./logic_controller";

const build = () => {
    const board = comp.Board();
    const cells = board.querySelectorAll("div");
    cells.forEach((cell) => {
        cell.addEventListener("click", logic.addStart);
    })
    document.body.append(board);
}

export {
    build
}
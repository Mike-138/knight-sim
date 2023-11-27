import * as comp from "./components";
import * as logic from "./logic_controller";

const build = () => {
    const board = comp.Board();
    logic.addStart(board);
    document.body.append(board);
}

export {
    build
}
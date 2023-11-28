import * as comp from "./components";
import * as logic from "./logic_controller";

const build = () => {
    const board = comp.Board();
    const startButton = comp.StartButton();
    const endButton = comp.EndButton();
    const resultButton = comp.ResultButton();
    logic.addStart(board);
    document.body.append(
        board,
        startButton,
        endButton,
        resultButton
    );
}

export {
    build
}
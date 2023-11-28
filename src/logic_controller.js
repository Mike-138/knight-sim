import * as comp from "./components";


const boardListener = (board) => {
    const cells = board.querySelectorAll(".cell");

    const __startHandler = function() {
        for (const cell of cells) {
            if (cell.firstChild) {
                cell.firstChild.remove();
            }
        }
        this.append(comp.Knight());
    }

    const selectStart = function() {
        for (const cell of cells) {
            cell.addEventListener("mousedown", __startHandler);
        }
    }

    return {
        selectStart
    }
}

export {
    boardListener
}
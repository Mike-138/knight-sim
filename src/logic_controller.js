import * as comp from "./components";


/* Callback function to be attached to board object */
const addStart = function(board) {
    const cells = board.querySelectorAll(".cell");
    for (const cell of cells) {
        cell.addEventListener("click", () => {
            for (const cell of cells) {
                if (cell.firstChild) {
                    cell.firstChild.remove();
                }
            }
            cell.append(comp.Knight());
        })
    }
}

export {
    addStart
}
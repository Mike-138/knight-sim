import * as comp from "./components";


const board = comp.Board();
// Use getElementsByClassName to return a live HTMLCollection
const _cells = board.getElementsByClassName("cell");

const startButton = comp.ContentButton("Select Start");
const targetButton = comp.ContentButton("Select Target");
const resultButton = comp.ContentButton("Find Shortest Paths");

const __startHandler = function() {
    // Returns null if there is no active start
    const activeStart = _cells.namedItem("start");
    if (activeStart) {
        activeStart.firstChild.remove();
        activeStart.removeAttribute("id");
    }
    this.append(comp.Knight());
    this.setAttribute("id", "start");
}

const __targetHandler = function() {
    // Returns null if there is no active target
    const activeTarget = _cells.namedItem("target");
    if (activeTarget) {
        activeTarget.classList.remove("target");
        activeTarget.removeAttribute("id");
    }
    this.classList.add("target");
    this.setAttribute("id", "target");
}

const _addHandlers = function(handler) {
    for (const cell of _cells) {
        cell.removeEventListener("mousedown", __startHandler);
        cell.removeEventListener("mousedown", __targetHandler);
        cell.addEventListener("mousedown", handler);
    }
}

const __addStartHandlers = () => {
    _addHandlers(__startHandler);
}

const __addTargetHandlers = () => {
    _addHandlers(__targetHandler);
}

export {
    board,
    startButton,
    targetButton,
    resultButton,
    __addStartHandlers,
    __addTargetHandlers,
}
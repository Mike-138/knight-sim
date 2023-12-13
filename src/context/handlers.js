import * as comp from "../components/components";


const board = comp.Board();
// Use getElementsByClassName to return a live HTMLCollection
const _cells = board.getElementsByClassName("cell");
let _activeStart;
let _activeTarget;
let _currentposition = 0;

const __startHandler = function() {
    // Returns null if there is no active start
    if (_activeStart) {
        _activeStart.firstChild.remove();
        delete _activeStart.dataset.start;
    }
    _activeStart = this;
    this.append(comp.Knight());
    this.dataset.start = true;
}

const __targetHandler = function() {
    // Returns null if there is no active target
    if (_activeTarget) {
        _activeTarget.classList.remove("target");
        delete _activeTarget.dataset.target;
    }
    _activeTarget = this;
    this.classList.add("target");
    this.dataset.target = true;
}

const _addHandler = function(handler) {
    for (const cell of _cells) {
        cell.removeEventListener("mousedown", __startHandler);
        cell.removeEventListener("mousedown", __targetHandler);
        cell.addEventListener("mousedown", handler);
    }
}

const __addStartHandler = () => {
    _addHandler(__startHandler);
}

const __addTargetHandler = () => {
    _addHandler(__targetHandler);
}

const __forwardHandler = function(array) {
    if (_currentposition < array.length - 1) {
        const knight = document.getElementsByClassName("knight");
        knight.remove();
        _currentposition++;
        const square = document.querySelector(`[data-row="${array[_currentposition][0]}"][data-col="${array[_currentposition][1]}"]`);
        square.append(comp.Knight());
    }
}

const __backwardHandler = function(array) {
    if (_currentposition > 0) {
        const knight = document.getElementsByClassName("knight");
        knight.remove();
        _currentposition--;
        const square = document.querySelector(`[data-row="${array[_currentposition][0]}"][data-col="${array[_currentposition][1]}"]`);
        square.append(comp.Knight());
    }
}

export {
    board,
    __addStartHandler,
    __addTargetHandler,
    __forwardHandler,
    __backwardHandler
}
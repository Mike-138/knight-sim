import * as comp from "../components/components";
import * as knightUtil from "../utils/return-knight";


let _activeStart;
let _activeTarget;

const __startHandler = function(element) {
    // Returns null if there is no active start
    if (_activeStart) {
        _activeStart.firstChild.remove();
        delete _activeStart.dataset.start;
    }
    _activeStart = element;
    element.append(comp.Knight());
    element.dataset.start = true;
}

const __targetHandler = function(element) {
    // Returns null if there is no active target
    if (_activeTarget) {
        _activeTarget.classList.remove("target");
        delete _activeTarget.dataset.target;
    }
    _activeTarget = element;
    element.classList.add("target");
    element.dataset.target = true;
}

const __forwardHandler = function(array) {
    if (knightUtil.getCurrentPosition() < array.length - 1) {
        const knight = document.querySelector(".knight");
        knight.remove();
        knightUtil.incrementPosition();
        const square = document.querySelector(`[data-row="${array[knightUtil.getCurrentPosition()][0]}"][data-col="${array[knightUtil.getCurrentPosition()][1]}"]`);
        square.append(comp.Knight());
    }
}

const __backwardHandler = function(array) {
    if (knightUtil.getCurrentPosition() > 0) {
        const knight = document.querySelector(".knight");
        knight.remove();
        knightUtil.decrementPosition();
        const square = document.querySelector(`[data-row="${array[knightUtil.getCurrentPosition()][0]}"][data-col="${array[knightUtil.getCurrentPosition()][1]}"]`);
        square.append(comp.Knight());
    }
}

export {
    __startHandler,
    __targetHandler,
    __forwardHandler,
    __backwardHandler
}
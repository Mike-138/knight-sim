import * as comp from "../components/components";
import * as knightUtil from "../utils/return-knight";


let _activeStart;
let _activeTarget;

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

const _removeHandlers = function(element) {
    element.removeEventListener("mousedown", __startHandler);
    element.removeEventListener("mousedown", __targetHandler);
}

const __removeAllHandlers = function(HTMLcollection) {
    for (const element of HTMLcollection) {
        _removeHandlers(element);
    }
}

const _addHandler = function(HTMLcollection, handler) {
    for (const element of HTMLcollection) {
        _removeHandlers(element);
        element.addEventListener("mousedown", handler);
    }
}

const __addStartHandler = (HTMLcollection) => {
    _addHandler(HTMLcollection, __startHandler);
}

const __addTargetHandler = (HTMLcollection) => {
    _addHandler(HTMLcollection, __targetHandler);
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
    __removeAllHandlers,
    __addStartHandler,
    __addTargetHandler,
    __forwardHandler,
    __backwardHandler
}
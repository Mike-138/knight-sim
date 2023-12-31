import * as comp from "../components/components";

let currentPosition = 0;

const getCurrentPosition = () => currentPosition;

const incrementPosition = () => {
    currentPosition++;
}

const decrementPosition = () => {
    currentPosition--;
}

const returnKnight = () => {
    const knight = document.querySelector(".knight");
    if (knight) {
        document.querySelector(".knight").remove();
        document.querySelector('[data-start="true"]').append(comp.Knight());
        currentPosition = 0;
    }
}

export {
    getCurrentPosition,
    incrementPosition,
    decrementPosition,
    returnKnight
}
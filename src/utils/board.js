const hideNumber = (array) => {
    for (const item of array) {
        const square = document.querySelector(`[data-row="${item[0]}"][data-col="${item[1]}"]`);
        const number = square.querySelector(".number");
        if (square.querySelector(".knight") !== null) {
            number.classList.add("hidden");
        } else {
            number.classList.remove("hidden");
        }
    }
}

const resetBoard = (array) => {
    array.forEach((item) => {
        item.style.removeProperty("background-color");
        const numberIcon = item.querySelector(".number");
        if (numberIcon) {
            item.removeChild(numberIcon);
        }
    });
}

export {
    hideNumber,
    resetBoard
}
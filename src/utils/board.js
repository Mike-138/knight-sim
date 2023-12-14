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

export {
    hideNumber
}
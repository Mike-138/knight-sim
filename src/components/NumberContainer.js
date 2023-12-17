const NumberContainer = (icon) => {
    const container = document.createElement("img");
    container.src = icon;
    container.classList.add("number");
    return container;
}

export default NumberContainer;
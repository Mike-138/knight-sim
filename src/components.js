import "./styles/components.css";

const Cell = () => {
    const container = document.createElement("div");
    container.classList.add("cell");
    return container;
}

const Board = () => {
    const container = document.createElement("div");
    container.classList.add("board");
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const cell = Cell();
            cell.dataset.index = `[${row}, ${col}]`;
            container.append(cell);
        }
    }
    return container;
}

export {
    Cell,
    Board
}
import "../styles/components.css";
import KnightIcon from "../assets/icons/chess-knight.svg"

const Knight = () => {
    const container = document.createElement("img");
    container.src = KnightIcon;
    container.classList.add("knight");
    return container;
}

const Cell = () => {
    const container = document.createElement("div");
    container.classList.add("cell");
    return container;
}

const Board = () => {
    const container = document.createElement("div");
    container.classList.add("board");
    let tabIndex = 1;
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const cell = Cell();
            cell.dataset.row = `${row}`;
            cell.dataset.col = `${col}`;
            cell.tabIndex = tabIndex;
            tabIndex += 1;
            container.append(cell);
        }
    }
    return container;
}

export {
    Knight,
    Cell,
    Board,
}
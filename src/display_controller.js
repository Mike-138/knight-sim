import * as logic from "./logic_controller";

const ContentButton = (content) => {
    const container = document.createElement("button");
    container.textContent = content;
    return container;
}

let lastSelectedSolution;

const SolutionContainer = (num, array) => {
    const container = document.createElement("details");
    const summary = document.createElement("summary");
    const list = document.createElement("ol");

    summary.textContent = `Solution ${num}`;

    for (const square of array) {
        const item = document.createElement("li");
        item.textContent = `[${square[0]}, ${square[1]}]`;
        list.append(item);
    }

    container.addEventListener("toggle", (event) => {
        const squares = document.querySelectorAll("[style='background-color: blue;']");
        // Condition ensures deselection only occurs upon toggling the active detail off
        if (lastSelectedSolution === event.target) {
            squares.forEach((square) => square.style.removeProperty("background-color"));
        }
        // Only add blue background when toggled open
        if (event.target.open) {
            if (lastSelectedSolution) {
                // Calls event on last solution after this event completes -- will not trigger deselection
                lastSelectedSolution.open = false;
            }
            lastSelectedSolution = event.target;
            // Necessary to clear squares on this line when switching between solutions without toggling last solution off first
            squares.forEach((square) => square.style.removeProperty("background-color"));
            for (const square of array) {
                const activeSquare = document.querySelector(`[data-row="${square[0]}"][data-col="${square[1]}"]`);
                // TODO: Overwrite green background color
                activeSquare.style.backgroundColor = "blue";
            }
        }
    })

    container.append(summary, list);
    return container;
}

const solutionDiv = document.createElement("div");

const build = () => {

    const startButton = ContentButton("Select Start");
    const targetButton = ContentButton("Select Target");
    const resultButton = ContentButton("Find Shortest Paths");

    startButton.addEventListener("click", logic.__addStartHandlers);
    targetButton.addEventListener("click", logic.__addTargetHandlers);
    resultButton.addEventListener("click", () => {
        const start = document.querySelector("[data-start]");
        const target = document.querySelector("[data-target]");
        const results = logic.knightMoves([Number(start.dataset.row), Number(start.dataset.col)], [Number(target.dataset.row), Number(target.dataset.col)]);
        const listOfSolutions = [];
        for (let i = 0; i < results.length; i++) {
            listOfSolutions.push(SolutionContainer(i + 1, results[i]));
        }
        solutionDiv.replaceChildren(...listOfSolutions);
    })

    document.body.append(
        logic.board,
        startButton,
        targetButton,
        resultButton,
        solutionDiv
    );
}

export {
    build
}
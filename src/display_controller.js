import * as logic from "./logic_controller";

const ContentButton = (content) => {
    const container = document.createElement("button");
    container.textContent = content;
    return container;
}

const build = () => {

    const startButton = ContentButton("Select Start");
    const targetButton = ContentButton("Select Target");
    const resultButton = ContentButton("Find Shortest Paths");

    startButton.addEventListener("click", logic.__addStartHandlers);
    targetButton.addEventListener("click", logic.__addTargetHandlers);
    resultButton.addEventListener("click", () => {
        const start = document.getElementById("start");
        const target = document.getElementById("target");
        const results = logic.knightMoves([Number(start.dataset.row), Number(start.dataset.col)], [Number(target.dataset.row), Number(target.dataset.col)]);
        for (const result of results) {
            console.log(result);
        }
    })

    document.body.append(
        logic.board,
        startButton,
        targetButton,
        resultButton
    );
}

export {
    build
}
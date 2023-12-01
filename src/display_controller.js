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
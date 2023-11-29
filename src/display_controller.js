import * as logic from "./logic_controller";

const build = () => {

    logic.startButton.addEventListener("click", logic.__addStartHandlers);
    logic.targetButton.addEventListener("click", logic.__addTargetHandlers);

    document.body.append(
        logic.board,
        logic.startButton,
        logic.targetButton,
        logic.resultButton
    );
}

export {
    build
}
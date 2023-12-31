import * as comp from "../components/components";
import NumberContainer from "../components/NumberContainer";
import * as knight from "../utils/knight";
import ZeroIcon from "../assets/icons/numeric-0.svg";
import OneIcon from "../assets/icons/numeric-1.svg";
import TwoIcon from "../assets/icons/numeric-2.svg";
import ThreeIcon from "../assets/icons/numeric-3.svg";
import FourIcon from "../assets/icons/numeric-4.svg";
import FiveIcon from "../assets/icons/numeric-5.svg";
import SixIcon from "../assets/icons/numeric-6.svg";
import SevenIcon from "../assets/icons/numeric-7.svg";
import EightIcon from "../assets/icons/numeric-8.svg";
import NineIcon from "../assets/icons/numeric-9.svg";
import * as handler from "./handlers";
import * as knightUtil from "../utils/return-knight";
import * as boardUtil from "../utils/board";


const MOVE_NUMBER_ICON = [
    NumberContainer(ZeroIcon),
    NumberContainer(OneIcon),
    NumberContainer(TwoIcon),
    NumberContainer(ThreeIcon),
    NumberContainer(FourIcon),
    NumberContainer(FiveIcon),
    NumberContainer(SixIcon),
    NumberContainer(SevenIcon),
    NumberContainer(EightIcon),
    NumberContainer(NineIcon)];

const ContentButton = (content) => {
    const container = document.createElement("button");
    container.textContent = content;
    return container;
}

let lastSelectedSolution;

// Temporary implementation of navigation buttons
const forwardButton = ContentButton("Go Forward");
const backwardButton = ContentButton("Go Backward");

let __activeForwardHandler;
let __activeBackwardHandler;

const disableNavigation = () => {
    forwardButton.removeEventListener("click", __activeForwardHandler);
    backwardButton.removeEventListener("click", __activeBackwardHandler);
}

const SolutionContainer = (num, array) => {
    const container = document.createElement("details");
    const summary = document.createElement("summary");
    const list = document.createElement("ol");
    // Start move index from 0
    list.start = 0;

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
            boardUtil.resetBoard(squares);
        }
        // Only add blue background when toggled open
        if (event.target.open) {
            if (lastSelectedSolution && lastSelectedSolution !== event.target) {
                // Calls event on last solution after this event completes -- will not trigger deselection
                lastSelectedSolution.open = false;
            }
            lastSelectedSolution = event.target;
            // Necessary to clear squares on this line when switching between solutions without toggling last solution off first
            boardUtil.resetBoard(squares);
            let currentMove = 0;
            for (const square of array) {
                const activeSquare = document.querySelector(`[data-row="${square[0]}"][data-col="${square[1]}"]`);
                activeSquare.style.backgroundColor = "blue";
                activeSquare.append(MOVE_NUMBER_ICON[currentMove]);
                currentMove += 1;
            }
            knightUtil.returnKnight();
            boardUtil.hideNumber(array);
            // Update navigation buttons depending on selected solution
            forwardButton.removeEventListener("click", __activeForwardHandler);
            backwardButton.removeEventListener("click", __activeBackwardHandler);
            __activeForwardHandler = () => {
                handler.__forwardHandler(array);
                boardUtil.hideNumber(array);
            };
            __activeBackwardHandler = () => {
                handler.__backwardHandler(array);
                boardUtil.hideNumber(array);
            };
            forwardButton.addEventListener("click", __activeForwardHandler);
            backwardButton.addEventListener("click", __activeBackwardHandler);
        }
    })
    container.append(summary, list);
    return container;
}

const solutionDiv = document.createElement("div");

const build = () => {

    const board = comp.Board();
    const startButton = ContentButton("Select Start");
    const targetButton = ContentButton("Select Target");
    const resultButton = ContentButton("Find Shortest Paths");

    let cellHandler = (element) => undefined;
    const _cells = board.getElementsByClassName("cell");
    for (const cell of _cells) {
        cell.addEventListener("mousedown", (event) => {
            cellHandler(event.target);
        });
    }

    startButton.addEventListener("click", () => {
        const squares = document.querySelectorAll("[style='background-color: blue;']");
        boardUtil.resetBoard(squares);
        disableNavigation();
        solutionDiv.replaceChildren();
        cellHandler = handler.__startHandler;
        knightUtil.returnKnight();
    });
    targetButton.addEventListener("click", () => {
        const squares = document.querySelectorAll("[style='background-color: blue;']");
        boardUtil.resetBoard(squares);
        disableNavigation();
        solutionDiv.replaceChildren();
        cellHandler = handler.__targetHandler;
        knightUtil.returnKnight();
    });
    resultButton.addEventListener("click", () => {
        const start = document.querySelector("[data-start]");
        const target = document.querySelector("[data-target]");
        const results = knight.knightMoves([Number(start.dataset.row), Number(start.dataset.col)], [Number(target.dataset.row), Number(target.dataset.col)]);
        const listOfSolutions = [];
        for (let i = 0; i < results.length; i++) {
            listOfSolutions.push(SolutionContainer(i + 1, results[i]));
        }
        solutionDiv.replaceChildren(...listOfSolutions);
        cellHandler = (element) => undefined;
    })

    document.body.append(
        board,
        startButton,
        targetButton,
        forwardButton,
        backwardButton,
        resultButton,
        solutionDiv
    );
}

export {
    build
}
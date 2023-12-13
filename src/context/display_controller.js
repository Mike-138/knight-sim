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


const NumberContainer = (icon) => {
    const container = document.createElement("img");
    container.src = icon;
    container.classList.add("number");
    return container;
}

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

const hideNumber = (square, numberIcon) => {
    if (square.querySelector(".knight") !== null) {
        numberIcon.classList.add("hidden");
    } else {
        numberIcon.classList.remove("hidden");
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

let lastSelectedSolution;

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
            resetBoard(squares);
        }
        // Only add blue background when toggled open
        if (event.target.open) {
            if (lastSelectedSolution && lastSelectedSolution !== event.target) {
                // Calls event on last solution after this event completes -- will not trigger deselection
                lastSelectedSolution.open = false;
            }
            lastSelectedSolution = event.target;
            // Necessary to clear squares on this line when switching between solutions without toggling last solution off first
            resetBoard(squares);
            let currentMove = 0;
            for (const square of array) {
                const activeSquare = document.querySelector(`[data-row="${square[0]}"][data-col="${square[1]}"]`);
                activeSquare.style.backgroundColor = "blue";
                hideNumber(activeSquare, MOVE_NUMBER_ICON[currentMove]);
                activeSquare.append(MOVE_NUMBER_ICON[currentMove]);
                currentMove += 1;
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

    startButton.addEventListener("click", () => {
        const squares = document.querySelectorAll("[style='background-color: blue;']");
        resetBoard(squares);
        solutionDiv.replaceChildren();
        handler.__addStartHandler();
    });
    targetButton.addEventListener("click", () => {
        const squares = document.querySelectorAll("[style='background-color: blue;']");
        resetBoard(squares);
        solutionDiv.replaceChildren();
        handler.__addTargetHandler();
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
    })

    document.body.append(
        handler.board,
        startButton,
        targetButton,
        resultButton,
        solutionDiv
    );
}

export {
    build
}
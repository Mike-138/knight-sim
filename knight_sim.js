const Cell = () => {
    let isOccupied = false;

    const occupy = () => {
        isOccupied = true;
    }

    const deoccupy = () => {
        isOccupied = false;
    }

    return {
        get isOccupied() {
            return isOccupied
        },
        occupy,
        deoccupy
    }
}

const Board = () => {
    const grid = [
        [Cell(), Cell(), Cell(), Cell(), Cell(), Cell(), Cell(), Cell()],
        [Cell(), Cell(), Cell(), Cell(), Cell(), Cell(), Cell(), Cell()],
        [Cell(), Cell(), Cell(), Cell(), Cell(), Cell(), Cell(), Cell()],
        [Cell(), Cell(), Cell(), Cell(), Cell(), Cell(), Cell(), Cell()],
        [Cell(), Cell(), Cell(), Cell(), Cell(), Cell(), Cell(), Cell()],
        [Cell(), Cell(), Cell(), Cell(), Cell(), Cell(), Cell(), Cell()],
        [Cell(), Cell(), Cell(), Cell(), Cell(), Cell(), Cell(), Cell()],
        [Cell(), Cell(), Cell(), Cell(), Cell(), Cell(), Cell(), Cell()]
    ];

    return {
        get grid() {
            return grid;
        }
    }
}
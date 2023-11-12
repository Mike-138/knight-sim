const Square = () => {
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
    const board = [
        [Square(), Square(), Square(), Square(), Square(), Square(), Square(), Square()],
        [Square(), Square(), Square(), Square(), Square(), Square(), Square(), Square()],
        [Square(), Square(), Square(), Square(), Square(), Square(), Square(), Square()],
        [Square(), Square(), Square(), Square(), Square(), Square(), Square(), Square()],
        [Square(), Square(), Square(), Square(), Square(), Square(), Square(), Square()],
        [Square(), Square(), Square(), Square(), Square(), Square(), Square(), Square()],
        [Square(), Square(), Square(), Square(), Square(), Square(), Square(), Square()],
        [Square(), Square(), Square(), Square(), Square(), Square(), Square(), Square()]
    ];
}
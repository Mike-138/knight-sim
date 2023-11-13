const Knight = () => {
    const moves = [
        [1, 2],
        [2, 1],
        [-1, 2],
        [2, -1],
        [1, -2],
        [-2, 1],
        [-1, -2],
        [-2, -1]
    ];

    return { moves };
}

const Board = () => {
    const grid = [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null]
    ];

    const _graph = new Map();

    const _addPiece = (piece) => {
        _graph.set(piece, []);
    }

    const _setMoves = (piece, col, row) => {
        for (let move of piece.moves) {
            const newCol = col + move[0];
            const newRow = row + move[1];
            if (0 <= newCol && newCol <= 7 && 0 <= newRow && newRow <= 7) {
                _graph.get(piece).push([newCol, newRow]);
            }
        }
    }

    const placePiece = (piece, col, row) => {
        grid[col][row] = piece;
        _addPiece(piece);
        _setMoves(piece, col, row);
        return grid;
    }

    return {
        get grid() {
            return grid;
        },
        placePiece
    }
}

module.exports = {
    Knight,
    Board
}
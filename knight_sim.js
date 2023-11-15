const Knight = () => {
    const position = null;
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

    return {
        position,
        moves
    };
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

    const placePiece = (piece, row, col) => {
        piece.position = (row, col);
        grid[row][col] = piece;
        return grid;
    }

    const knightMoves = (start, end) => {
        const visited = {};
        const queue = [];
        // Stringify coordinate pair to be used as object key
        const root = JSON.stringify(start);
        visited[root] = null;
        queue.push(start);
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
        while (!queue.isEmpty) {
            const [ currentX, currentY ] = queue.shift();
            // Stringify coordinate pair to reference object key
            let parent = JSON.stringify([currentX, currentY]);
            for (const [ dx, dy ] of moves) {
                const xPos = currentX + dx;
                const yPos = currentY + dy;
                // Stringify coordinate pair to be used as object key
                const child = JSON.stringify([xPos, yPos])
                if (child === JSON.stringify(end)) {
                    const result = [end];
                    // Loop back up visited references to track shortest path
                    while (parent in visited) {
                        // Parse coordinate string for final result
                        result.unshift(JSON.parse(parent));
                        parent = visited[parent];
                    }
                    return result;
                }
                if (xPos >= 0 && xPos <= 7 && yPos >= 0 && yPos <= 7 && !(child in visited)) {
                    visited[child] = parent;
                    queue.push([xPos, yPos]);
                }
            }
        }
    }

    return {
        get grid() {
            return grid;
        },
        placePiece,
        knightMoves
    }
}

module.exports = {
    Knight,
    Board
}
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
        const results = [];
        let queue = [];
        let buffer = [];
        // Stringify coordinate pair to be used as object key
        const root = JSON.stringify(start);
        visited[root] = null;
        // Buffer concats to queue to begin loop
        buffer.push(start);
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
        // Buffer allows queue to retrieve all paths of shortest length, instead of just the first
        while (!buffer.includes(end)) {
            queue = queue.concat(buffer);
            buffer = [];
            // Only receives new coordinates after emptying itself; waves of BFS
            while (!(queue.length === 0)) {
                const [ currentX, currentY ] = queue.shift();
                // Stringify coordinate pair to reference object key
                let parent = JSON.stringify([currentX, currentY]);
                for (const [ dx, dy ] of moves) {
                    const xPos = currentX + dx;
                    const yPos = currentY + dy;
                    // Stringify coordinate pair to be used as object key
                    const child = JSON.stringify([xPos, yPos])
                    if (child === JSON.stringify(end)) {
                        const path = [end];
                        // Loop back up visited references to track shortest path
                        while (parent in visited) {
                            // Parse coordinate string for final result
                            path.unshift(JSON.parse(parent));
                            parent = visited[parent];
                        }
                        results.push(path);
                        buffer.push(end);
                    }
                    if (xPos >= 0 && xPos <= 7 && yPos >= 0 && yPos <= 7 && !(child in visited)) {
                        visited[child] = parent;
                        buffer.push([xPos, yPos]);
                    }
                }
            }
        }
        // Returns a 2D array of lists containing shortest paths
        return results;
    }

    return {
        get grid() {
            return grid;
        },
        placePiece,
        knightMoves
    }
}

const board = Board();
board.knightMoves([0, 0],[1, 2]);

module.exports = {
    Knight,
    Board
}
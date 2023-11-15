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

    const _getMoves = (graph, child, path, result) => {
        path.unshift(JSON.parse(child));
        if (!graph[child]) {
            result.push(path);
        } else {
            const parents = graph[child];
            for (const parent of parents) {
                // Pass shallow path copy so each DFS call produces a unique path
                _getMoves(graph, parent, path.slice(), result);
            }
        }
        return result
    }

    const knightMoves = (start, end) => {
        const ignore = [];
        const visited = {};
        let queue = [];
        let buffer = [];
        // Stringify coordinate pair to be used as object child
        const path = JSON.stringify(start);
        visited[path] = null;
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
        while (!(JSON.stringify(end) in visited)) {
            queue = queue.concat(buffer);
            for (const child of buffer) {
                ignore.push(JSON.stringify(child));
            }
            buffer = [];
            // Only receives new coordinates after emptying itself; waves of BFS
            while (!(queue.length === 0)) {
                const [ currentX, currentY ] = queue.shift();
                // Stringify coordinate pair to reference object child
                const parent = JSON.stringify([currentX, currentY]);
                for (const [ dx, dy ] of moves) {
                    const xPos = currentX + dx;
                    const yPos = currentY + dy;
                    // Stringify coordinate pair to be used as object child
                    const child = JSON.stringify([xPos, yPos])
                    // X and Y must be between 0 and 7 and cannot be the origin
                    if (xPos >= 0 && xPos <= 7 && yPos >= 0 && yPos <= 7 && !(ignore.includes(child))) {
                        if (child in visited) {
                            visited[child].push(parent);
                        } else {
                            visited[child] = [parent];
                            buffer.push([xPos, yPos]);
                        }
                    }
                }
            }
        }

        return _getMoves(visited, JSON.stringify(end), [], []);
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
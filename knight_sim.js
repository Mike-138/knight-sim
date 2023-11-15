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

    /**
     * Returns an array containing all shortest paths from start to target following the given moves
     * @param   {Array} start  An array of 2 integers between 0 and 7
     * @param   {Array} target An array of 2 integers between 0 and 7
     * @returns {Array}        An array of arrays containing arrays of 2 integers between 0 and 7
     */
    const knightMoves = (start, target) => {
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
        const ignore = [];

        const graph = {};
        // Stringify coordinate pair to be used as object child
        const root = JSON.stringify(start);
        graph[root] = null;

        let queue = [];
        // Buffer must pass starting vertex to queue
        let buffer = [start];

        // Buffer allows queue to retrieve all paths of shortest length, instead of just the first
        while (!(JSON.stringify(target) in graph)) {
            queue = queue.concat(buffer);
            // Ignore in buffer allows vertices to have multiple parents only if they occur in the same BFS wave
            for (const child of buffer) {
                ignore.push(JSON.stringify(child));
            }
            buffer = [];
            // Only receives new coordinates after emptying itself, creating waves of BFS
            while (!(queue.length === 0)) {
                const [ currentX, currentY ] = queue.shift();
                // Stringify coordinate pair to reference object child
                const parent = JSON.stringify([currentX, currentY]);
                for (const [ dx, dy ] of moves) {
                    const xPos = currentX + dx;
                    const yPos = currentY + dy;
                    // Stringify coordinate pair to be used as object child
                    const child = JSON.stringify([xPos, yPos])
                    // X and Y must be between 0 and 7 and cannot have been traversed in a previous BFS wave
                    if (xPos >= 0 && xPos <= 7 && yPos >= 0 && yPos <= 7 && !(ignore.includes(child))) {
                        if (child in graph) {
                            graph[child].push(parent);
                        } else {
                            graph[child] = [parent];
                            buffer.push([xPos, yPos]);
                        }
                    }
                }
            }
        }
        return _getMoves(graph, JSON.stringify(target), [], []);
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
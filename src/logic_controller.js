import * as comp from "./components";


const board = comp.Board();
// Use getElementsByClassName to return a live HTMLCollection
const _cells = board.getElementsByClassName("cell");

const __startHandler = function() {
    // Returns null if there is no active start
    const activeStart = _cells.namedItem("start");
    if (activeStart) {
        activeStart.firstChild.remove();
        activeStart.removeAttribute("id");
    }
    this.append(comp.Knight());
    this.setAttribute("id", "start");
}

const __targetHandler = function() {
    // Returns null if there is no active target
    const activeTarget = _cells.namedItem("target");
    if (activeTarget) {
        activeTarget.classList.remove("target");
        activeTarget.removeAttribute("id");
    }
    this.classList.add("target");
    this.setAttribute("id", "target");
}

const _addHandlers = function(handler) {
    for (const cell of _cells) {
        cell.removeEventListener("mousedown", __startHandler);
        cell.removeEventListener("mousedown", __targetHandler);
        cell.addEventListener("mousedown", handler);
    }
}

const __addStartHandlers = () => {
    _addHandlers(__startHandler);
}

const __addTargetHandlers = () => {
    _addHandlers(__targetHandler);
}

const _getMoves = (graph, child, path = [], result = []) => {
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
    return _getMoves(graph, JSON.stringify(target));
}

export {
    board,
    __addStartHandlers,
    __addTargetHandlers,
    knightMoves
}
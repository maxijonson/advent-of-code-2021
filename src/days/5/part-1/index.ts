type Axis = "horizontal" | "vertical" | "diagonal";
type Direction =
    | "left"
    | "right"
    | "up"
    | "down"
    | "upleft"
    | "upright"
    | "downleft"
    | "downright";

class Point {
	constructor(
		public x: number,
		public y: number
	) {
		this.x = x;
		this.y = y;
	}

	public toString() {
		return `(${this.x}, ${this.y})`;
	}
}

class Movement {
    public axis: Axis;
    public direction: Direction;
    public points: Point[] = [];

    constructor(
        public from: Point,
        public to: Point
    ) {
        this.axis = (() => {
            if (from.x === to.x) {
                return "vertical";
            }
            if (from.y === to.y) {
                return "horizontal";
            }
            return "diagonal";
        })();

        this.direction = (() => {
            if (this.axis === "vertical") {
                return from.y < to.y ? "down" : "up";
            }
            if (this.axis === "horizontal") {
                return from.x < to.x ? "right" : "left";
            }
            if (this.axis === "diagonal") {
                if (from.x < to.x && from.y < to.y) {
                    return "downright";
                }
                if (from.x < to.x && from.y > to.y) {
                    return "upright";
                }
                if (from.x > to.x && from.y < to.y) {
                    return "downleft";
                }
                if (from.x > to.x && from.y > to.y) {
                    return "upleft";
                }
            }
            throw new Error(
                `Unknown direction for (${from.x}, ${from.y}) -> (${to.x}, ${to.y})`
            );
        })();

        // Calculate each point between from and to in the direction of the movement and add it to the points array
        const current = { x: from.x, y: from.y };
        while (current.x !== to.x || current.y !== to.y) {
            this.points.push(new Point(current.x, current.y));

            switch (this.direction) {
                case "up":
                    current.y--;
                    break;
                case "down":
                    current.y++;
                    break;
                case "left":
                    current.x--;
                    break;
                case "right":
                    current.x++;
                    break;
                case "upleft":
                    current.x--;
                    current.y--;
                    break;
                case "upright":
                    current.x++;
                    current.y--;
                    break;
                case "downleft":
                    current.x--;
                    current.y++;
                    break;
                case "downright":
                    current.x++;
                    current.y++;
                    break;
            }
        }
        this.points.push(new Point(current.x, current.y));
    }

    public print() {
        console.log(
            `${this.from.x},${this.from.y} -> ${this.to.x},${this.to.y}`
        );

        this.points.forEach((point) => {
            console.log(`${point.x},${point.y}`);
        });

        console.log("");
    }
}

export const parseMovement = (input: string): Movement => {
    const [from, to] = input.split("->");
    const [fromX, fromY] = from.split(",").map(Number);
    const [toX, toY] = to.split(",").map(Number);

    return new Movement(new Point(fromX, fromY), new Point(toX, toY));
};

export const getOverlaps = (movements: Movement[]) => {
    return movements.reduce((acc, movement) => {
		movement.points.forEach((point) => {
			acc.set(point.toString(), (acc.get(point.toString()) ?? 0) + 1);
		});
		return acc;
	}, new Map<string, number>());
}

export default (input: string) => {
    // Note: in this challenge, we're ignoring diagonal movements. 
    // You don't need to be a genie to know we'll take them in to account in the next one. 
    // So I prepared the Movement class to handle them in this first challenge, assuming they will be useful in the next.
    const movements = input
        .split("\n")
        .map(parseMovement)
        .filter((m) => m.axis !== "diagonal");
    return `${Array.from(getOverlaps(movements).values()).filter((v) => v > 1).length}`;
};

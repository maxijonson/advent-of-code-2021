import chalk from "chalk";

class BoardNumber {
    public isMarked = false;

    constructor(
        public value: number,
        public position: { x: number; y: number }
    ) {}

    public tryMark(n: number): boolean {
        if (this.isMarked) {
            return true;
        }
        this.isMarked = this.value === n;
        return this.isMarked;
    }
}

// Bingo board
export class Board {
    public values: BoardNumber[][] = [];
    public score = 0;

    constructor(boardArray: string[][]) {
        for (let y = 0; y < boardArray.length; y++) {
            for (let x = 0; x < boardArray[y].length; x++) {
                if (!this.values[x]) {
                    this.values[x] = [];
                }
                this.values[x][y] = new BoardNumber(Number(boardArray[y][x]), {
                    x,
                    y,
                });
            }
        }
    }

    public get(x: number, y: number): BoardNumber {
        return this.values[x][y];
    }

    public activate(n: string): boolean {
        const activatedPositions = []; // Probably won't be more than 1
        const nValue = Number(n);

        for (let y = 0; y < this.values.length; y++) {
            for (let x = 0; x < this.values[y].length; x++) {
                const bn = this.values[x][y];
                if (bn.tryMark(nValue)) {
                    activatedPositions.push(bn.position);
                }
            }
        }

        for (const pos of activatedPositions) {
            if (this.getCol(pos.x).every((bn) => bn.isMarked)) {
                for (let x = 0; x < this.values.length; x++) {
                    if (x !== pos.x) {
                        this.score += this.sumUmarkedBoardNumbers(this.getCol(x));
                    }
                }
                this.score *= nValue;
                return true;
            }

            if (this.getRow(pos.y).every((bn) => bn.isMarked)) {
                for (let y = 0; y < this.values.length; y++) {
                    if (y !== pos.y) {
                        this.score += this.sumUmarkedBoardNumbers(this.getRow(y));
                    }
                }
                this.score *= nValue;
                return true;
            }
        }

        return false;
    }

    public getCol(x: number): BoardNumber[] {
        return this.values[x];
    }

    public getRow(y: number): BoardNumber[] {
        return this.values.map((col) => col[y]);
    }

    public print(): void {
        for (let y = 0; y < this.values.length; y++) {
            let line = "";
            for (let x = 0; x < this.values[y].length; x++) {
                const bn = this.values[x][y];
                const n = Number(bn.value);
                const print = n < 10 ? ` ${n} ` : `${n} `;
                line += bn.isMarked ? chalk.green(print) : chalk.red(print);
            }
            console.log(line);
        }
        console.log("\n");
    }

    private sumUmarkedBoardNumbers(boardNumbers: BoardNumber[]): number {
        return boardNumbers
            .filter((bn) => !bn.isMarked)
            .reduce((acc, bn) => acc + bn.value, 0);
    }
}

export const parseBoards = (lines: string[]): Board[] => {
    const boards: Board[] = [];
    
    let i = 0;
    while (i < lines.length) {
        let line = lines[i];

        if (line.length === 0) {
            i++;
            continue;
        }

        const board: string[][] = [];

        while (line !== undefined && line.length > 0) {
            board.push(line.split(" ").filter((c) => c !== ""));
            i++;
            line = lines[i];
        }

        boards.push(new Board(board));
    }

    return boards;
}

export default (input: string) => {
    const [numbersLine,, ...boardLines] = input.split("\n");
    const numbers = numbersLine.split(",");
    const boards: Board[] = parseBoards(boardLines);

    let winningBoard: Board | null = null;
    for (const n of numbers) {
        for (const board of boards) {
            if (board.activate(n)) {
                winningBoard = board;
                break;
            }
        }
        if (winningBoard !== null) {
            break;
        }
    }

    return winningBoard ? `${winningBoard.score}` : "0";
};

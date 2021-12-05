import { Board, parseBoards } from "../part-1";

export default (input: string) => {
    const [numbersLine,, ...boardLines] = input.split("\n");
    const numbers = numbersLine.split(",");
    const boards: Board[] = parseBoards(boardLines);

    let winningBoard: Board | null = null;
    for (const n of numbers) {
        for (const board of boards) {
            if (board.score === 0 && board.activate(n)) {
                winningBoard = board;
            }
        }
    }

    return winningBoard ? `${winningBoard.score}` : "0";
};
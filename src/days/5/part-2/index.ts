import { getOverlaps, parseMovement } from "../part-1";

export default (input: string) => {
    const movements = input
        .split("\n")
        .map(parseMovement);
    return `${Array.from(getOverlaps(movements).values()).filter((v) => v > 1).length}`;
};

import { getFishCount } from "../part-1";

export default (input: string) => {
    const fishes = input.split(",").map(Number);
    return getFishCount(fishes, 256).toString();
};

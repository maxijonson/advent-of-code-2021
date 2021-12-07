/**
 * Fuel costs per move
 * 1 move  : 1
 * 2 moves : 1 + 2 = 3
 * 3 moves : 1 + 2 + 3 = 6
 * 4 moves : 1 + 2 + 3 + 4 = 10
 * 5 moves : 1 + 2 + 3 + 4 + 5 = 15
 * 6 moves : 1 + 2 + 3 + 4 + 5 + 6 = 21
 * 7 moves : 1 + 2 + 3 + 4 + 5 + 6 + 7 = 28
 * 8 moves : 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 = 36
 * 9 moves : 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 = 45
 * 10 moves: 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10 = 55
 *
 * General formula:
 * fuelCost = (n * (n + 1)) / 2
 */

import { getMinFuelCost } from "../part-1";

const getFuelCost = (distance: number): number =>
    (distance * (distance + 1)) / 2;

export default (input: string) => {
    const positions = input.split(",").map(Number);
    return getMinFuelCost(positions, getFuelCost).toString();
};

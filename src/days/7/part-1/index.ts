export const getMinFuelCost = (positions: number[], getFuelCost: (distance: number) => number) => {
    let minFuelCost = Infinity;
    const min = Math.min(...positions);
    const max = Math.max(...positions);

    for (let tempTarget = min; tempTarget <= max; tempTarget++) {
        let currentFuelCost = 0;

        for (let i = 0; i < positions.length; i++) {
            currentFuelCost += getFuelCost(Math.abs(tempTarget - positions[i]));

            if (currentFuelCost > minFuelCost) {
                break;
            }
        }

        if (currentFuelCost < minFuelCost) {
            minFuelCost = currentFuelCost;
        }
    }

    return minFuelCost;
}

const getFuelCost = (distance: number) => distance;

export default (input: string) => {
    const positions = input.split(",").map(Number);
    return getMinFuelCost(positions, getFuelCost).toString();
};

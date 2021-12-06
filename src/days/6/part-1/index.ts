const CYCLE = 7;
const FIRST_CYCLE = CYCLE + 2;

// Old Part 1. Was blazing fast! But not enough for 256...
// export const getFishCount = (initialFishes: number[], days: number): number => {
//     let fishes = [...initialFishes];
//     let count = fishes.length;

//     for (let day = 0; day < days; day++) {
// 		console.log(`Day ${day}: ${count} fishes`);
//         const nextFishes = [];

//         for (let i = 0; i < fishes.length; i++) {
//             if (fishes[i] === day) {
//                 count++;
//                 nextFishes.push(day + FIRST_CYCLE);
//                 nextFishes.push(day + CYCLE);
//             } else {
//                 nextFishes.push(fishes[i]);
//             }
//         }

//         fishes = nextFishes;
//     }

//     return count;
// };

// Part 2 inspired by https://zonito.medium.com/lantern-fish-day-6-advent-of-code-2021-python-solution-4444387a8380
export const getFishCount = (fishes: number[], days: number): number => {
	const dayFishes = new Array(FIRST_CYCLE).fill(0);

	fishes.forEach(fish => {
		dayFishes[fish]++;
	});

	for (let day = 0; day < days; day++) {
		const today = day % FIRST_CYCLE;
		dayFishes[(today + CYCLE) % FIRST_CYCLE] += dayFishes[today];
	}

	return dayFishes.reduce((acc, curr) => acc + curr, 0);
};

export default (input: string) => {
    const fishes = input.split(",").map(Number);
    return getFishCount(fishes, 80).toString();
};

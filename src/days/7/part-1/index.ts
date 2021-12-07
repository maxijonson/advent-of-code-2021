export default (input: string) => {
    const positions = input
        .split(",")
        .map(Number)
        .sort((a, b) => a - b);
    const median = positions[Math.floor(positions.length / 2)];

    let fuel = 0;
    for (let i = 0; i < positions.length; i++) {
        while (positions[i] !== median) {
            if (positions[i] > median) {
                positions[i]--;
            } else {
                positions[i]++;
            }
            fuel++;
        }
    }

    return fuel.toString();
};

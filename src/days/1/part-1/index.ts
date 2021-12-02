export default (input: string): string => {
    const measurements = input.split("\n").map(Number);
    let i = 0;
    let answer = 0;
    let prev: number = measurements[i++];

    while (i < measurements.length) {
        const current = measurements[i++];
        if (current > prev) {
            answer++;
        }
        prev = current;
    }

    return `${answer}`;
};

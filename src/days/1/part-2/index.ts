const SUM_AMOUNT = 3;

export default (input: string) => {
    const measurements = input.split('\n').map(Number);
    let prevSum = Infinity;
    let answer = 0;

    for (let i = 0; i < measurements.length - SUM_AMOUNT; i++) {
        const sum = measurements.slice(i, i + SUM_AMOUNT).reduce((a, b) => a + b, 0);

        if (sum > prevSum) {
            answer++;
        }

        prevSum = sum;
    }

    return `${answer}`;
}
type Bit = "0" | "1";

export const getBitFrequencies = (numbers: string[]) => {
    const freqs: { "0": number; "1": number }[] = [];

    // Initialize array with the length of the first number in the input
    for (let i = 0; i < numbers[0].length; i++) {
        freqs.push({ "0": 0, "1": 0 });
    }

    numbers.forEach((number) => {
        number.split("").forEach((bit, i) => {
            freqs[i][bit as Bit]++;
        });
    });

    return freqs;
};

export default (input: string) => {
    const numbers = input.split("\n");
    const freqs = getBitFrequencies(numbers);

    let gamma = "";
    let epsilon = "";

    freqs.forEach((freq) => {
        if (freq["0"] > freq["1"]) {
            gamma += "0";
            epsilon += "1";
        } else {
            gamma += "1";
            epsilon += "0";
        }
    });

    return `${parseInt(gamma, 2) * parseInt(epsilon, 2)}`;
};

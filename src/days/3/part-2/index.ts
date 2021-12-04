import { getBitFrequencies } from "../part-1";

export default (input: string) => {
    const numbers = input.split("\n");
    let o2Numbers = [...numbers];
    let co2Numbers = [...numbers];

    for (
        let bitPos = 0;
        o2Numbers.length > 1 || co2Numbers.length > 1;
        bitPos++
    ) {
        const o2Frequencies = getBitFrequencies(o2Numbers);
        const co2Frequencies = getBitFrequencies(co2Numbers);

        const o2Freq = o2Frequencies[bitPos];
        const co2Freq = co2Frequencies[bitPos];

        const o2Bit =
        o2Freq["1"] >= o2Freq["0"] ? "1" : "0";
        const co2Bit =
        co2Freq["1"] < co2Freq["0"] ? "1" : "0";

        if (o2Numbers.length > 1) {
            o2Numbers = o2Numbers.filter(
                (number) => number[bitPos] === o2Bit
            );
        }

        if (co2Numbers.length > 1) {
            co2Numbers = co2Numbers.filter(
                (number) => number[bitPos] === co2Bit
            );
        }
    }

    const oxygenRating = parseInt(o2Numbers[0], 2);
    const co2Rating = parseInt(co2Numbers[0], 2);

    return `${oxygenRating * co2Rating}`;
};

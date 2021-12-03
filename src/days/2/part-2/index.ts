import { parseCommand, State } from "../part-1";

export default (input: string) => {
    const state: State = { depth: 0, x: 0 };
    let aim = 0;

    input.split("\n").forEach((line) => {
        const command = parseCommand(line);

        switch (command.type) {
            case "forward":
                state.x += command.value;
                state.depth += command.value * aim;
                break;
            case "down":
                aim += command.value;
                break;
            case "up":
                aim -= command.value;
                break;
        }
    });

    return `${state.depth * state.x}`;
};

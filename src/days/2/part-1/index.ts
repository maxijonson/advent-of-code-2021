export type CommandType = "forward" | "down" | "up";

export interface Command {
    type: CommandType;
    value: number;
}

export interface State {
    depth: number;
    x: number;
}

export const parseCommand = (line: string): Command => {
    const [direction, value] = line.split(" ");
    return {
        type: direction as CommandType,
        value: parseInt(value, 10),
    };
};

export default (input: string) => {
    const state: State = { depth: 0, x: 0 };

    input.split("\n").forEach((line) => {
        const command = parseCommand(line);

        switch(command.type) {
            case "forward":
                state.x += command.value;
                break;
            case "down":
                state.depth += command.value;
                break;
            case "up":
                state.depth -= command.value;
                break;
        }
    });

    return `${state.depth * state.x}`;
};

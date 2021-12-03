import yargs from "yargs";
import Command from "./Command";
import fs from "fs";
import path from "path";

const LAST_DAY = fs
    .readdirSync(path.resolve(__dirname, "../days"))
    .sort((a, b) => {
        return parseInt(a) - parseInt(b);
    })
    .pop();

type Arguments = {
    day: number;
    part?: number;
};

class CommandSolve extends Command<Arguments> {
    constructor() {
        super("solve [day] [part]", "Solves a challenge for a specific day/part.", {
            day: {
                description: "The day of the challenge",
                defaultDescription: `Last day (${LAST_DAY})`,
                number: true,
                default: Number(LAST_DAY),
            },
            part: {
                description: "The part of the day",
                defaultDescription: `The last part`,
                number: true,
            },
        });
    }

    async run({ day, part: partArg }: yargs.Arguments<Arguments>) {
        const dayPath = path.resolve(__dirname, `../days/${day}`);

        if (!fs.existsSync(dayPath)) {
            console.error(`Day ${day} does not exist!`, dayPath);
            process.exit(1);
        }

        const lastPart =
            fs
                .readdirSync(path.resolve(dayPath))
                .sort((a, b) => {
                    const aPart = parseInt(a.split("-")[1]);
                    const bPart = parseInt(b.split("-")[1]);

                    return aPart - bPart;
                })
                .pop()?.split("-")[1] ?? 1;
        const part = partArg ?? lastPart;

        const challengePath = path.resolve(dayPath, `part-${part}`);

        if (!fs.existsSync(challengePath)) {
            console.error(
                `Part ${part} does not exist on day ${day}!`,
                challengePath
            );
            process.exit(1);
        }

        const module = await import(challengePath);

        if (!module?.default) {
            console.error(`Day ${day} part ${part} does not export a default!`);
            process.exit(1);
        }

        if (typeof module.default !== "function") {
            console.error(
                `Day ${day} part ${part} does not export a default function!`
            );
            process.exit(1);
        }

        const inputFile = path.resolve(challengePath, "input.txt");
        if (!fs.existsSync(inputFile)) {
            console.error(
                `Day ${day} part ${part} does not have an input file!`
            );
            process.exit(1);
        }
        const input = fs.readFileSync(inputFile, "utf8");

        const answer = module.default(input);

        if (answer) {
            console.log("Answer:", answer);
            const answerFile = path.resolve(challengePath, "answer.txt");
            fs.writeFileSync(answerFile, answer);
        }
    }
}

export default CommandSolve;

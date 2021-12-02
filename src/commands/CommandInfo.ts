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

class CommandInfo extends Command<Arguments> {
    constructor() {
        super(
            "info [day] [part]",
            "Get info on a challenge for a specific day/part.",
            {
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
            }
        );
    }

    async run({ day, part: partArg }: yargs.Arguments<Arguments>) {
        const dayPath = path.resolve(__dirname, `../days/${day}`);

        if (!fs.existsSync(dayPath)) {
            console.error(`Day ${day} does not exist!`);
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
                .pop()
                ?.split("-")[1] ?? 1;
        const part = partArg ?? lastPart;

        const challengePath = path.resolve(dayPath, `part-${part}`);

        if (!fs.existsSync(challengePath)) {
            console.error(`Part ${part} does not exist on day ${day}!`);
            process.exit(1);
        }

        const challengeFile = path.resolve(challengePath, "challenge.txt");
        const answerFile = path.resolve(challengePath, "answer.txt");

        if (!fs.existsSync(challengeFile)) {
            console.error(`Challenge file does not exist on day ${day}!`);
            process.exit(1);
        }

        console.log(fs.readFileSync(challengeFile, "utf8"));

        if (fs.existsSync(answerFile)) {
            console.log(`Answer: ${fs.readFileSync(answerFile, "utf8")}`);
        }
    }
}

export default CommandInfo;

import path from "path";
import fs from "fs";
import yargs from "yargs";
import Command from "./Command";

type Arguments = {
    day: number;
};

const LAST_DAY = fs
    .readdirSync(path.resolve(__dirname, "../days"))
    .sort((a, b) => {
        return parseInt(a) - parseInt(b);
    })
    .pop();

class CommandCreate extends Command<Arguments> {
    constructor() {
        super(
            "create [day]",
            "Creates a new folder for the specified day with the first part folder. If the folder already exists, will add the next part folder.",
            {
                day: {
                    description: "The day of the challenge",
                    defaultDescription: `Last day (${LAST_DAY})`,
                    number: true,
                    default: Number(LAST_DAY),
                },
            }
        );
    }

    run({ day }: yargs.Arguments<Arguments>): void {
        // Create the day folder in the days folder, if it doesn't exist
        const dayFolder = path.resolve(__dirname, "../days", day.toString());
        if (!fs.existsSync(dayFolder)) {
            fs.mkdirSync(dayFolder);
        }

        // Count the amount of folders in the day folder
        const folders = fs.readdirSync(dayFolder);
        const folderCount = folders.length;

        // Create the folder for the next part
        const partFolder = path.resolve(dayFolder, `part-${folderCount + 1}`);
        fs.mkdirSync(partFolder);

        // Create the index.ts file
        const indexPath = path.resolve(partFolder, "index.ts");
        fs.writeFileSync(
            indexPath,
            'export default (input: string) => {\n\treturn "";\n};\n'
        );

        // Create the challenge.txt file
        const challengePath = path.resolve(partFolder, "challenge.txt");
        fs.writeFileSync(challengePath, "");

        // Create the input.txt file
        const inputPath = path.resolve(partFolder, "input.txt");
        fs.writeFileSync(inputPath, "");
    }
}

export default CommandCreate;

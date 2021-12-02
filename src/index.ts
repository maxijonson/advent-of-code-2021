import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import fs from "fs";
import path from "path";
import Command from "./commands/Command";

const COMMAND_DIR = path.resolve(__dirname, "./commands");

(async () => {
    const commands = await Promise.all<Command<never> | null>(
        fs
            .readdirSync(COMMAND_DIR)
            .filter((file) => file !== "Command.ts" && file.endsWith(".ts"))
            .map(async (file) => {
                const module = await import(path.resolve(COMMAND_DIR, file));

                if (!module.default) {
                    console.error(
                        "Module does not have a default export:",
                        file
                    );
                    return null;
                }

                if (typeof module.default !== "function") {
                    console.error(
                        "Module default export is not a function:",
                        file
                    );
                    return null;
                }

                return new module.default();
            })
    );

    const y = yargs(hideBin(process.argv));

    commands.forEach((command) => {
        if (!command) {
            return;
        }

        y.command(
            command.name,
            command.description,
            command.builder,
            command.run
        );
    });

    y.parse();
})();

import yargs from "yargs";

type ArgumentType = string | number | boolean;

abstract class Command<A extends { [key: string]: ArgumentType } = Record<string, ArgumentType>> {
    constructor(
        public name: string,
        public description: string,
        public builder: { [key in keyof A]: yargs.Options }
    ) {}

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    abstract run(args: yargs.Arguments<A>): void;
}

export default Command;

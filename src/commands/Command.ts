import yargs from "yargs";

abstract class Command<A extends { [key: string]: string | number | boolean }> {
    constructor(
        public name: string,
        public description: string,
        public builder: { [key in keyof A]: yargs.Options }
    ) {}

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    abstract run(args: yargs.Arguments<A>): void;
}

export default Command;

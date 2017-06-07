export declare class IO {
    static of(func: Function): IO;
    func: Function;
    constructor(func: Function);
    chain(f: (...args) => IO): IO;
    map(f: Function): IO;
    ap(thatIO: IO): IO;
    run(...args: any[]): any;
    toString(): string;
}

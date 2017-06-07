export declare abstract class Maybe {
    static of(x: any): Nothing | Just;
    static maybe(x: any, f: (x: any) => any, m: Maybe): void;
    static Just(x: any): Just;
    static Nothing(): Nothing;
    static isJust(x: Maybe): boolean;
    static isNothing(x: Maybe): boolean;
    val: any;
    abstract map(f: (x: any) => any): Maybe;
    abstract ap(m: Maybe): Maybe;
    abstract chain(f: (x: any) => any): any;
    toString(): string;
    isNothing(): boolean;
    isJust(): boolean;
}
export declare class Just extends Maybe {
    constructor(x: any);
    isJust(): boolean;
    isNothing(): boolean;
    map(f: (x: any) => any): Just;
    chain(f: (x: any) => any): any;
    ap(m: Maybe): Maybe;
    getOrElse(): any;
    toString(): string;
}
export declare class Nothing extends Maybe {
    isJust(): boolean;
    isNothing(): boolean;
    map(f: (x: any) => any): this;
    chain(f: (x: any) => any): this;
    ap(m: Maybe): this;
    getOrElse(value: any): any;
    toString(): string;
}

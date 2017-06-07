export declare abstract class Either {
    val: any;
    constructor(x: any);
    abstract map(f: (x: any) => any): Either;
    abstract chain(f: (x: any) => Either): Either;
    either<T, R>(leftFn: (x: any) => T, rightFn: (x: any) => R): T | R;
}
export declare class Right extends Either {
    static of(x: any): Right;
    isRight(): boolean;
    isLeft(): boolean;
    map(f: (x: any) => any): Right;
    ap(that: Either): Either;
    chain(f: (x: any) => Either): Either;
    toString(): string;
}
export declare class Left extends Either {
    static of(x: any): Left;
    isRight(): boolean;
    isLeft(): boolean;
    map(f: (x: any) => any): this;
    ap(that: Either): this;
    chain(f: (x: any) => Either): this;
    toString(): string;
}

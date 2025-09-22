export declare class BaseEvent<T> {
    private readonly data;
    constructor(data: T);
    toString(): string;
    toJSON(): T;
}

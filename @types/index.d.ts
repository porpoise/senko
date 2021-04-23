export type ReactiveHandler<T> = (value: T[keyof T]) => void;

export interface IObservable<T> {
    readonly data: T;
    attach(prop: keyof T, handler: ReactiveHandler<T>): void;
}

export function createObservable<T>(initial: T): IObservable<T>;

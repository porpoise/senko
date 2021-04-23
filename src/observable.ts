// eslint-disable-next-line import/no-unresolved
import { IObservable, ReactiveHandler } from "@types";

export default function createObservable<T>(initial: T): IObservable<T> {
    // Internally stores the most updated data:
    const internal: T = { ...initial };

    // Wrapper around "internal" populated with getters & setters:
    const observable: T = Object.create(null);

    // Store handlers to trigger when property values change:
    const handlers: Record<keyof T, ReactiveHandler<T>[]> = Object.create(null);

    // Populate "observable" with getters and setters:
    for (const key of Object.keys(internal) as (keyof T)[]) {
        handlers[key] = [];

        Object.defineProperty(observable, key, {
            get() {
                return internal[key];
            },
            set(value: T[keyof T]) {
                internal[key] = value;

                handlers[key].forEach((handler) => handler(value));
            },
        });
    }

    return {
        data: observable,
        attach: (prop, handler) => handlers[prop].push(handler),
    };
}

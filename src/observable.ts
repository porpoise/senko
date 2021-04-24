export type ReactiveHandler<T> = (value: T) => void;

export interface IObservable<T> {
    data: T;
    attach<ValueType = T[keyof T]>(
        prop: keyof T,
        handler: ReactiveHandler<ValueType>
    ): void;
}

export default function createObservable<T>(
    initial: T
): Readonly<IObservable<T>> {
    // Internally stores the most updated data:
    const internal: T = { ...initial };

    // Wrapper around "internal" populated with getters & setters:
    const observable: T = Object.create(null);

    // Store handlers to trigger when property values change:
    const handlers: Record<
        keyof T,
        ReactiveHandler<T[keyof T]>[]
    > = Object.create(null);

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

    return Object.freeze({
        data: observable,
        attach: <ValueType = T[keyof T]>(
            prop: keyof T,
            handler: ReactiveHandler<ValueType>
        ) =>
            handlers[prop].push(
                (handler as unknown) as ReactiveHandler<T[keyof T]>
            ),
    });
}

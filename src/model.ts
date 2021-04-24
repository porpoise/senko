import React from "react";

export interface IModel<Value> {
    value: Value;
    onInput: React.FormEventHandler<HTMLInputElement>;
}

export default function model<Store>(
    store: Store,
    prop: keyof Store
): IModel<Store[keyof Store]> {
    return {
        value: store[prop],
        onInput: ({ target }) =>
            (store[prop] = ((target as HTMLInputElement)
                .value as unknown) as Store[keyof Store]),
    };
}

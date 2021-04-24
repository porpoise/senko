import React from "react";

export interface IModel<Value> {
    value: Value;
    onInput?: React.FormEventHandler<HTMLInputElement>;
    onChange?: React.FormEventHandler<HTMLInputElement>;
}

export type InputProp = "value" | "checked";

const eventNameFromProp = {
    value: "onInput",
    checked: "onChange",
};

export default function model<Store>(
    store: Store,
    prop: keyof Store,
    inputProp: InputProp
): IModel<Store[keyof Store]> {
    return {
        value: store[prop],
        [eventNameFromProp[inputProp]]: ({ target }: React.FormEvent) => {
            store[prop] = ((target as HTMLInputElement)[
                inputProp
            ] as unknown) as Store[keyof Store];
        },
    };
}

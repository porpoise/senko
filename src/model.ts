import React from "react";

export interface IModel<Value> {
    value: Value;
    onInput: React.FormEventHandler<HTMLInputElement>;
    onChange: React.FormEventHandler<HTMLInputElement>;
}

export default function model<Store>(
    store: Store,
    prop: keyof Store
): IModel<Store[keyof Store]> { 
    const handler: React.FormEventHandler<HTMLInputElement> = ({ target }) => {
        let inputProp: "value" | "checked" = "value";

        if ((target as HTMLInputElement).type = "checkbox") {
            inputProp = "checked";
        }

        (store[prop] = ((target as HTMLInputElement)[inputProp] as unknown) as Store[keyof Store])
    }

    return {
        value: store[prop],
        onInput: handler,
        onChange: handler
    };
}

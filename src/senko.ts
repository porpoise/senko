import { useState } from "react";
import model, { IModel, InputProp } from "./model";
import createObservable from "./observable";

export type Senko<Store> = Store & {
    model: Record<keyof Store, <Value>() => ReturnType<typeof model>>;
};

export type SenkoState<Value> = [Value, (val: Value) => void];

export default function senko<Store>(initial: Store) {
    const observable = createObservable(initial);

    const useSpecificState = <Value = Store[keyof Store]>(
        prop: keyof Store
    ): SenkoState<Value> => {
        const [value, setValue] = useState<Value>(
            (observable.data[prop] as unknown) as Value
        );

        observable.attach<Value>(prop, setValue);

        const setter = (newValue: Value) => {
            observable.data[prop] = (newValue as unknown) as Store[keyof Store];
        };

        return [value, setter];
    };

    const useSenko = (): Senko<Store> => {
        const stateObject: Senko<Store> = Object.create(null);
        stateObject.model = Object.create(null);

        for (const prop of Object.keys(initial) as (keyof Store)[]) {
            const [val, setVal] = useSpecificState(prop);

            Object.defineProperty(stateObject, prop, {
                get: () => val,
                set: setVal,
            });

            Object.defineProperty(stateObject.model, prop, {
                get: () => (inputProp: InputProp = "value") =>
                    model(stateObject, prop, inputProp),
            });
        }

        return stateObject;
    };

    return Object.assign(useSenko, { current: () => observable.data });
}

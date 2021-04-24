import { useState } from "react";
import createObservable from "./observable";

export type SenkoState<Value> = [Value, (val: Value) => void];

export default function senko<StoreType>(initial: StoreType) {
    const observable = createObservable(initial);

    const useSenko = <ValueType = StoreType[keyof StoreType]>(
        prop: keyof StoreType
    ): SenkoState<ValueType> => {
        const [value, setValue] = useState<ValueType>(
            (observable.data[prop] as unknown) as ValueType
        );

        observable.attach<ValueType>(prop, setValue);

        const setter = (newValue: ValueType) => {
            observable.data[
                prop
            ] = (newValue as unknown) as StoreType[keyof StoreType];
        };

        return [value, setter];
    };

    useSenko.current = () => observable.data;

    return useSenko;
}

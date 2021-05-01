type SenkoArray<T> = Array<T> & { readonly iterable: Array<T> };

const NONMUTABLE_ARRAY_METHODS: (keyof Array<any>)[] = [
    "concat",
    "entries",
    "every",
    "filter",
    "find",
    "findIndex",
    "forEach",
    "includes",
    "indexOf",
    "join",
    "keys",
    "lastIndexOf",
    "map",
    "reduce",
    "reduceRight",
    "slice",
    "some",
    "toLocaleString",
    "toString",
    "values"
];

function updateGetters<T>(
    wrapperObject: Record<string | number, any>,
    arr: T[],
    setVal: (val: T[]) => void
) {
    // Remove old getters
    Object.keys(Object.getOwnPropertyDescriptors(wrapperObject))
        .filter((k) => !isNaN(parseInt(k)))
        .forEach((k) =>
            Object.defineProperty(wrapperObject, k, {
                get: undefined,
                set: undefined,
                configurable: true,
            })
        );

    // New getters:
    arr.forEach((val, i) => {
        Object.defineProperty(wrapperObject, i, {
            get() {
                // if (typeof val === "object") {
                //     return senko(val)();
                // }

                return val;
            },
            set(val) {
                arr[i] = val;
                setVal([...arr]);
            },
            configurable: true,
        });
    });
}

export default function useArray<T>(val: T[], setVal: (val: T[]) => void): SenkoArray<T> {
    const copy = [...val];

    function update() {
        setVal(copy);
        updateGetters(returnValue, copy, setVal);
    }

    const returnValue = {
        get length() {
            return copy.length;
        },

        get iterable() {
            return copy;
        },

        copyWithin(target: number, start: number, end?: number) {
            const response = copy.copyWithin(target, start, end);
            update();
            return response;
        },

        fill(value: T, start?: number | undefined, end?: number) {
            const response = copy.fill(value, start, end);
            update();
            return response;
        },

        pop() {
            const response = copy.pop();
            update();
            return response;
        },

        push(...items: T[]) {
            const response = copy.push(...items);

            update();
            return response;
        },

        reverse() {
            const response = copy.reverse();
            update();
            return response;
        },

        shift() {
            const response = copy.shift();
            update();
            return response;
        },

        sort(compareFn?: ((a: T, b: T) => number) | undefined) {
            const response = copy.sort(compareFn);
            update();
            return response;
        },

        splice(start: number, deleteCount?: number | undefined) {
            const response = copy.splice(start, deleteCount);
            update();
            return response;
        },

        unshift(...items: T[]) {
            const response = copy.unshift(...items);
            update();
            return response;
        },
    };

    NONMUTABLE_ARRAY_METHODS.forEach(method => Object.defineProperty(returnValue, method, {
        get: () => val[method]
    }));

    updateGetters(returnValue, copy, setVal);

    return (returnValue as unknown) as SenkoArray<T>;
}

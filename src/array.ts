const MUTATIONS = ["pop", "push", "reverse", "shift", "splice", "sort", "unshift"];

interface SenkoArray<T> extends Array<T> {
    modify(index: number, value: T): void;
}

export default function useArray<T>(val: T[], setVal: (n: any) => void): SenkoArray<T> {
    let copy = [...val] as SenkoArray<T>;
    
    function mutate(funcName: string, args: any[]) {
        const res = (Array.prototype[funcName as any] as any).call(copy, ...args);
        setVal(copy);
        return res;
    }
    
    for (const type of MUTATIONS) {
        copy[type as any] = 
            ((...args: any[]) => mutate(type, args)) as any;
    }

    copy.modify = (index: number, value: T) => {
        copy[index] = value;
        setVal(copy);
    };

    return copy;
}
export default class SenkoArray < T > {
    [k: number]: T
    value: T[]
    setValue: (val: T[]) => void
    update = () => {
        this.setValue([...this.value])
        this.updateGetters()
    }
    updateGetters() {
        //Remove old getters
        Object.keys(Object.getOwnPropertyDescriptors(this)).filter(k => !isNaN(parseInt(k))).forEach(k => Object.defineProperty(this, k, {get:undefined,set:undefined,configurable:true}))
        this.value.forEach((val, i) => {
            Object.defineProperty(this, i, {
                get() {
                    return val
                },
                set(val) {
                    this.array[i] = val
                    this.setVal([...this.array])
                },
                configurable: true
            })
        })
    }
    constructor(val: T[], setVal: (val: T[]) => void) {
        this.value = val
        this.setValue = setVal
        this.updateGetters()

    }
    get length() {
        return this.value.length
    }
    //Non Mutable
    concat(...items: ConcatArray < T > []) {
        return this.value.concat(...items)
    }
    entries() {
        return this.value.entries()
    }
    every(predicate: (value: T, index: number, array: T[]) => value is T, thisArg ? : any) {
        return this.value.every(predicate)
    }
    filter(predicate: (value: T, index: number, array: T[]) => value is T, thisArg ? : any) {
        return this.value.filter(predicate)
    }
    find(predicate: (value: T, index: number, array: T[]) => value is T, thisArg ? : any) {
        return this.value.find(predicate)
    }
    findIndex(predicate: (value: T, index: number, array: T[]) => value is T, thisArg ? : any) {
        return this.value.findIndex(predicate)
    }
    //flatMap
    forEach(callbackfn: (value: T, index: number, array: T[]) => value is T, thisArg ? : any) {
        return this.value.forEach(callbackfn)
    }
    includes(searchElement: T, fromIndex ? : number | undefined) {
        return this.value.includes(searchElement)
    }
    indexOf(searchElement: T, fromIndex ? : number | undefined) {
        return this.value.indexOf(searchElement)
    }
    join(separator ? : string | undefined) {
        return this.value.join(separator)
    }
    keys() {
        return this.value.keys()
    }
    lastIndexOf(searchElement: T, fromIndex ? : number | undefined) {
        return this.value.lastIndexOf(searchElement)
    }
    map(callbackfn: (value: T, index: number, array: T[]) => value is T, thisArg ? : any) {
        return this.value.map(callbackfn)
    }
    reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T) {
        return this.value.reduce(callbackfn)
    }
    reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T) {
        return this.value.reduceRight(callbackfn)
    }
    slice(start ? : number | undefined, end ? : number | undefined) {
        return this.value.slice(start, end)
    }
    some(predicate: (value: T, index: number, array: T[]) => value is T, thisArg ? : any) {
        return this.value.some(predicate)
    }
    toLocaleString() {
        return this.value.toLocaleString()
    }
    toString() {
        return this.value.toString()
    }
    values() {
        return this.value.values()
    }

    //Mutable 
    copyWithin(target: number, start: number, end ? : number | undefined) {
        const response = this.value.copyWithin(target, start, end)

        this.update()
        return response
    }
    fill(value: T, start ? : number | undefined, end ? : number | undefined) {
        const response = this.value.fill(value, start, end)

        this.update()
        return response
    }
    //flat
    pop() {
        const response = this.value.pop()

        this.update()
        return response
    }
    push(value: T) {
        const response = this.value.push(value)

        this.update()
        return response
    }
    reverse() {
        const response = this.value.reverse()

        this.update()
        return response
    }
    shift() {
        const response = this.value.shift()

        this.update()
        return response
    }
    sort(compareFn ? : ((a: T, b: T) => number) | undefined) {
        const response = this.value.sort(compareFn)

        this.update()
        return response
    }
    splice(start: number, deleteCount ? : number | undefined) {
        const response = this.value.splice(start, deleteCount)

        this.update()
        return response
    }
    unshift(...items: T[]) {
        const response = this.value.unshift(...items)

        this.update()
        return response
    }



}
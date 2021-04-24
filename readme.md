# senko

making react good since 2021

```ts
import React from "react";
import senko from "senko";

// build a hook that allows component-level access to the state
const useSenko = senko({
    count: 0
});

function Counter() {
    // returns an observable that gives us a mutable state object
    const state = useSenko();

    return (
        <>
            <code>{state.count}</code>
            <button onClick={() => state.count++}>+</button>
            <button onClick={() => state.count--}>-</button>
        </>
    )
}

// render
ReactDOM.render(
    [h(Counter), h(Counter)], // render two counters to flex the globalness
    document.querySelector("main")
);

// fun fact, you can get a read-writable object of the state with useSenko.current()
// probably dont use this for production though lol 
console.log(useSenko.current())
```
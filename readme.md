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
    // identical to useState, 
    // except the parameter is the prop name
    // in our case, "count"
    const [count, setCount] = useSenko("count");

    return (
        <>
            <code>{count}</code>
            <button onClick={() => setCount(count + 1)}>+</button>
            <button onClick={() => setCount(count + 1)}>-</button>
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
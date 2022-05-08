![senko is cool and amazing for react users](/img/header.png)

# senko

a global state for react but its actually easy and not overcomplicated to hell and back

## install

`npm i senko`

## the counter but senko

```ts
import React from "react";
import ReactDOM from "react-dom";

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
    [<Counter />, <Counter />], // render two counters to flex the globalness
    document.querySelector("main")
);
```

### arrays

although, technically, arrays are deeply nested objects, the data structure is common enough that we've exclusively added in support for them. everything works as expected with arrays (all the methods, immutable and mutable), except direct modification at an index:

```js

senkoState.someArray[69] = 420; // this WONT work sorry
senkoState.someArray.setAt(69, 420); // scuffed alternative <3
```

## caveat: property destructuring

this will NOT work. this essentially destroys the getter/setter magic that is used internally to making changing values reactive (see the vue 3 reactive function for example). 

if it bothers you that much, don't use this. you always have `useState` for component-specific state, senko is only for cross-component data.

```js
// BAD BAD BAD
const { a, b } = useSenko(); // a, b

// GOOD GOOD 
const state = useSenko(); // state.a, state.b
```

### caveat: nested objects

theoretically, you could write something like this:

```js
const useSenko = senko({
    nestedObject: {
        prop: 1,
    }
});
```

it logically follows that you could then write something like this:

```js
// assume i'm in a react function component
const state = useSenko();

function doWork() {
    state.nestedObject.prop++;
}
```

that doesn't work. to keep senko simple, small, and performant, deeply nested objects are not reactive by nature. this, however, would work.

```js
// assume i'm in a react function component
const state = useSenko();

function doWork() {
    state.nestedObject = {
        ... state.nestedObject,
        prop: state.nestedObject.prop + 1,
    };
}
```

generally, if you need multiple nested objects within the same senko state, you should just move them to individual senko states:
```js

// BAD, not GOOD:
const useSenko = senko({
    auth: {
        token: "something_secret",
        username: "raghav-misra",
        /* ... */
    },
    profile: {
        darkTheme: true,
        avatarUrl: "https://epicgames.com/fortnite",
        /* ... */
    }
});

// GOOD GOOD GOOD:
const useAuthSenko = senko({
    token: "something_secret",
    username: "raghav-misra",
    /* ... */
});

const useProfileSenko = senko({
    darkTheme: true,
    avatarUrl: "https://epicgames.com/fortnite",
    /* ... */
});
```

## go czech it out ;)

![go use senko now](/img/footer.png)
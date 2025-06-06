# JavaScript Runtime and Async JavaScript Practice Exam

This practice exam contains questions about JavaScript runtime behavior, event loop, async operations, and execution order. Each question has four possible answers, with only one correct answer.

## Theoretical Questions

---

### Question 1

What is the `Call Stack` in JavaScript?

**Options:**

- a) A data structure that stores variables and function declarations during code execution
- b) A **LIFO** (Last In, First Out) data structure that tracks function calls and their execution context
- c) A queue that manages asynchronous operations in JavaScript
- d) A list of available `Web APIs` in the browser

<details>
<summary>View Answer and Explanation</summary>

**Correct Answer:** b) A **LIFO** (Last In, First Out) data structure that tracks function calls and their execution context

**Explanation:**  
The `Call Stack` is a fundamental part of JavaScript's execution context. It follows the **Last In, First Out (LIFO)** principle, where the most recently added function call is the first to be removed. When a function is called, it's **pushed** onto the stack; when it returns, it's **popped** off. This mechanism keeps track of where the program is in its execution.

</details>

---

### Question 2

What is the `Event Loop`'s main responsibility?

**Options:**

- a) Execute JavaScript code line by line
- b) Store variables and function declarations
- c) Check if the `Call Stack` is empty and move tasks from `Callback Queue` to the `Call Stack`
- d) Handle network requests directly

<details>
<summary>View Answer and Explanation</summary>

**Correct Answer:** c) Check if the `Call Stack` is empty and move tasks from `Callback Queue` to the `Call Stack`

**Explanation:**  
The `Event Loop`'s primary job is to monitor the `Call Stack`, `Microtask Queue`, and `Callback Queue`. When the `Call Stack` is empty, it first processes all tasks in the `Microtask Queue`. Only after all microtasks are completed does it take the first task from the `Callback Queue` and push it onto the `Call Stack` for execution. This process ensures that async operations don't block the main thread and are executed in the correct priority order.

</details>

---

### Question 3

Which of the following is NOT part of the browser's JavaScript runtime environment?

**Options:**

- a) Call Stack
- b) Web APIs
- c) Java Virtual Machine
- d) Callback Queue

<details>
<summary>View Answer and Explanation</summary>

**Correct Answer:** c) Java Virtual Machine

**Explanation:**  
The Java Virtual Machine (JVM) is not part of the JavaScript runtime environment. The browser's JavaScript runtime includes the Call Stack (for executing code), Web APIs (for browser-provided functionality), the Callback Queue (for managing async callbacks), and the Event Loop (for coordinating between them).

</details>

---

### Question 4

What is the Callback Queue?

**Options:**

- a) A stack that stores all callback functions
- b) A database of Web API functions
- c) A list of all variables in the program
- d) A queue that stores callback functions ready to be executed

<details>
<summary>View Answer and Explanation</summary>

**Correct Answer:** d) A queue that stores callback functions ready to be executed

**Explanation:**  
The Callback Queue (also known as Task Queue) is where completed asynchronous operations' callbacks wait to be executed. It follows the First In, First Out (FIFO) principle. When an async operation completes, its callback is added to the queue, and the Event Loop will move it to the Call Stack when appropriate.

</details>

---

### Question 5

What is the primary difference between microtasks and macrotasks?

**Options:**

- a) Microtasks are faster to execute than macrotasks
- b) Microtasks have higher priority and execute before the next macrotask
- c) Macrotasks are always related to DOM operations
- d) Microtasks can only be created using async/await

<details>
<summary>View Answer and Explanation</summary>

**Correct Answer:** b) Microtasks have higher priority and execute before the next macrotask

**Explanation:**  
**Microtasks** (like `Promise.then()`, `Promise.catch()`, `Promise.finally()`, and `queueMicrotask()`) have higher priority than **macrotasks** (like `setTimeout()`, `setInterval()`, `setImmediate()`). After each macrotask, the JavaScript engine will execute **ALL** queued microtasks before moving on to the next macrotask. This ensures that Promise chains and similar operations complete before handling other async operations.

</details>

---

### Question 6

Which of these is a microtask?

**Options:**

- a) setTimeout callback
- b) setInterval callback
- c) Promise.then() callback
- d) addEventListener callback

<details>
<summary>View Answer and Explanation</summary>

**Correct Answer:** c) Promise.then() callback

**Explanation:**  
Promise.then() callbacks are microtasks. They are processed in the microtask queue, which has priority over the macrotask queue. setTimeout, setInterval, and addEventListener callbacks are all macrotasks and are processed in the macrotask queue.

</details>

---

### Question 7

What happens when a Promise is created?

**Options:**

- a) The executor function runs immediately and synchronously
- b) The executor function is added to the microtask queue
- c) The executor function runs after all synchronous code
- d) The executor function runs in the next event loop tick

<details>
<summary>View Answer and Explanation</summary>

**Correct Answer:** a) The executor function runs immediately and synchronously

**Explanation:**  
When a Promise is created using `new Promise(executor)`, the executor function runs synchronously during the Promise construction. This is why you can see console.logs from inside Promise executors before other synchronous code. Only the .then(), .catch(), and .finally() handlers are scheduled as microtasks.

</details>

---

### Question 8

What is the purpose of the Web APIs in the browser?

**Options:**

- a) To execute JavaScript code
- b) To provide additional functionality not included in the JavaScript engine
- c) To store global variables
- d) To manage the event loop

<details>
<summary>View Answer and Explanation</summary>

**Correct Answer:** b) To provide additional functionality not included in the JavaScript engine

**Explanation:**  
Web APIs are provided by the browser to extend JavaScript's capabilities. They include features like DOM manipulation, AJAX (`fetch`), `setTimeout`, and geolocation. These APIs are not part of the JavaScript engine itself but are provided by the browser environment to allow JavaScript to interact with the outside world.

</details>

---

## Code Execution Questions

---

### Question 9

What is the output order of the following code?

```javascript
console.log("1");

Promise.resolve().then(() => console.log("2"));

setTimeout(() => console.log("3"), 0);

console.log("4");
```

**Options:**

- a) 1, 2, 3, 4
- b) 1, 4, 3, 2
- c) 4, 1, 2, 3
- d) 1, 4, 2, 3

<details>
<summary>View Answer and Explanation</summary>

**Correct Answer:** d) 1, 4, 2, 3

**Explanation:**

1. First, synchronous code executes: `console.log('1')` and `console.log('4')`
2. The Promise.then() callback is queued as a microtask
3. The setTimeout callback is queued as a macrotask
4. After synchronous code finishes, microtasks are processed: `console.log('2')`
5. Finally, the macrotask (setTimeout) executes: `console.log('3')`
</details>

---

### Question 10

What is the output order of this code?

```javascript
console.log("1");

Promise.resolve()
  .then(() => console.log("2"))
  .then(() => console.log("3"));

console.log("4");
```

**Options:**

- a) 1, 2, 3, 4
- b) 1, 4, 2, 3
- c) 1, 4, 3, 2
- d) 4, 1, 2, 3

<details>
<summary>View Answer and Explanation</summary>

**Correct Answer:** b) 1, 4, 2, 3

**Explanation:**

1. First, synchronous code executes: `console.log("1")` and `console.log("4")`
2. The first .then() callback is queued as a microtask
3. When executed, it logs "2" and returns, queueing the second .then()
4. Finally, the second .then() executes, logging "3"
</details>

---

### Question 11

What will be logged?

```javascript
Promise.resolve()
  .then(() => console.log("1"))
  .then(() => console.log("2"));

Promise.resolve()
  .then(() => console.log("3"))
  .then(() => console.log("4"));
```

**Options:**

- a) 1, 3, 2, 4
- b) 1, 2, 3, 4
- c) 3, 4, 1, 2
- d) 4, 3, 2, 1

<details>
<summary>View Answer and Explanation</summary>

**Correct Answer:** a) 1, 3, 2, 4

**Explanation:**

1. Both Promise chains start resolving immediately
2. First `.then()` callbacks from both chains are queued in the same microtask tick
3. In the first microtask tick:
   - First chain's first `.then` executes: `console.log("1")`
   - Second chain's first `.then` executes: `console.log("3")`
4. Each `.then()` completion queues its next `.then()` in a new microtask tick
5. In the next microtask tick:
   - First chain's second `.then` executes: `console.log("2")`
   - Second chain's second `.then` executes: `console.log("4")`

This demonstrates how Promise chains queue their continuations in separate microtask ticks.

</details>

---

### Question 12

What is the output sequence?

```javascript
setTimeout(() => console.log("1"), 0);

new Promise((resolve) => {
  console.log("2");
  resolve();
}).then(() => console.log("3"));

console.log("4");
```

**Options:**

- a) 1, 2, 3, 4
- b) 4, 1, 2, 3
- c) 2, 4, 3, 1
- d) 2, 3, 4, 1

<details>
<summary>View Answer and Explanation</summary>

**Correct Answer:** c) 2, 4, 3, 1

**Explanation:**

1. Promise constructor executes synchronously: `console.log("2")`
2. setTimeout callback is scheduled as a macrotask
3. Synchronous code executes: `console.log("4")`
4. Promise.then microtask executes: `console.log("3")`
5. Finally, the setTimeout macrotask executes: `console.log("1")`
</details>

---

### Question 13

What will be the output?

```javascript
const promise1 = Promise.resolve("First");

const promise2 = new Promise((resolve) =>
  setTimeout(() => resolve("Second"), 0)
);

promise1.then((result) => console.log(result));

promise2.then((result) => console.log(result));

console.log("Third");
```

**Options:**

- a) First, Second, Third
- b) Third, First, Second
- c) First, Third, Second
- d) Third, Second, First

<details>
<summary>View Answer and Explanation</summary>

**Correct Answer:** b) Third, First, Second

**Explanation:**

1. promise1 is created as an already resolved promise
2. promise2 is created with a setTimeout
3. Both .then handlers are queued, but won't execute yet
4. Synchronous code executes: `console.log("Third")`
5. Microtask from promise1.then executes: `console.log("First")`
6. After the timeout completes, promise2 resolves and its .then executes: `console.log("Second")`
</details>

---

### Question 14

What is the execution order?

```javascript
queueMicrotask(() => console.log("1"));

Promise.resolve().then(() => console.log("2"));

setTimeout(() => console.log("3"), 0);

console.log("4");
```

**Options:**

- a) 4, 1, 2, 3
- b) 4, 2, 1, 3
- c) 1, 2, 3, 4
- d) 3, 4, 1, 2

<details>
<summary>View Answer and Explanation</summary>

**Correct Answer:** a) 4, 1, 2, 3

**Explanation:**

1. Synchronous code executes: `console.log("4")`
2. Microtasks execute in order of queueing: `console.log("1")`, then `console.log("2")`
3. Finally, the setTimeout macrotask executes: `console.log("3")`
</details>

---

### Question 15

What gets logged?

```javascript
const promise = new Promise((resolve) => {
  console.log("1");
  resolve("2");
  console.log("3");
});

promise.then(console.log);

console.log("4");
```

**Options:**

- a) 1, 2, 3, 4
- b) 4, 1, 2, 3
- c) 1, 3, 4, 2
- d) 1, 4, 2, 3

<details>
<summary>View Answer and Explanation</summary>

**Correct Answer:** c) 1, 3, 4, 2

**Explanation:**

1. Promise constructor executes synchronously: `console.log("1")` and `console.log("3")`
2. Synchronous code continues: `console.log("4")`
3. Promise.then microtask executes: `console.log("2")`
</details>

---

### Question 16

What is the correct order of logs?

```javascript
Promise.resolve()
  .then(() => {
    console.log("1");
    return Promise.resolve("2");
  })
  .then((result) => {
    console.log(result);
    return Promise.reject("3");
  })
  .catch((error) => {
    console.log(error);
    return "4";
  })
  .then((result) => console.log(result));
```

**Options:**

- a) 1, 2, 3, 4
- b) 4, 1, 2, 3
- c) 1, 3, 2, 4
- d) 2, 1, 3, 4

<details>
<summary>View Answer and Explanation</summary>

**Correct Answer:** a) 1, 2, 3, 4

**Explanation:**

1. First `.then` executes: `console.log("1")`
2. It returns `Promise.resolve("2")`, which creates a new Promise and adds an extra microtask tick
3. When that Promise resolves, the next `.then` prints its value: `console.log("2")`
4. This `.then` rejects with "3", triggering the `.catch` handler: `console.log("3")`
5. `.catch` returns "4" (automatically wrapped in a resolved Promise)
6. Final `.then` prints the resolved value: `console.log("4")`

Note: Returning `Promise.resolve()` in a `.then` handler creates an additional microtask tick, which is important for understanding Promise chaining behavior.

</details>

---

### Question 17

What will be output?

```javascript
setTimeout(() => console.log("1"), 0);

Promise.resolve().then(() => console.log("2"));

requestAnimationFrame(() => console.log("3"));

console.log("4");
```

**Options:**

- a) 4, 2, 3, 1
- b) 4, 1, 2, 3
- c) 1, 2, 3, 4
- d) 4, 2, 1, 3

<details>
<summary>View Answer and Explanation</summary>

**Correct Answer:** a) 4, 2, 3, 1

**Explanation:**

1. Synchronous code executes first: `console.log("4")`
2. Promise.then microtask executes next: `console.log("2")`
3. requestAnimationFrame callback executes before next frame: `console.log("3")`
4. setTimeout macrotask executes last: `console.log("1")`

Note: This demonstrates the typical priority order in browsers: synchronous code → microtasks → animation frames → macrotasks. While `requestAnimationFrame` always executes after microtasks and before the next macrotask, its exact timing depends on the browser's rendering cycle and screen refresh rate (typically 60fps).

</details>

---

### Question 18

What is the execution sequence?

```javascript
Promise.resolve()
  .then(() => {
    console.log("1");
    throw new Error("error");
  })
  .then(() => console.log("2"))
  .catch(() => console.log("3"))
  .then(() => console.log("4"));

console.log("5");
```

**Options:**

- a) 1, 3, 4, 5
- b) 5, 1, 3, 4
- c) 5, 1, 4, 3
- d) 1, 5, 3, 4

<details>
<summary>View Answer and Explanation</summary>

**Correct Answer:** b) 5, 1, 3, 4

**Explanation:**

The execution order follows these steps:

1. First, synchronous code runs: `console.log("5")`
2. Then the Promise chain starts:
   - First `.then` executes: `console.log("1")`
   - This `.then` throws an error
   - The error causes the next `.then` to be skipped (so "2" is never logged)
   - The error is caught by `.catch`: `console.log("3")`
   - After the `.catch`, the chain continues normally: `console.log("4")`

Note: When a `.then()` throws an error, the Promise chain immediately looks for the nearest `.catch()` handler, skipping any `.then()` handlers in between. That's why "2" is never logged - the error from the first `.then()` causes execution to jump directly to the `.catch()`.

</details>

---

### Question 19

What will be logged?

```javascript
const promise1 = Promise.resolve("1");
const promise2 = Promise.resolve("2");

promise1
  .then((result) => {
    console.log(result);
    return promise2;
  })
  .then((result) => {
    console.log(result);
    throw new Error("3");
  })
  .catch((error) => {
    console.log(error.message);
    return Promise.resolve("4");
  })
  .then((result) => console.log(result));

console.log("5");
```

**Options:**

- a) 1, 2, 3, 4, 5
- b) 5, 1, 2, 4, 3
- c) 1, 5, 2, 3, 4
- d) 5, 1, 2, 3, 4

<details>
<summary>View Answer and Explanation</summary>

**Correct Answer:** d) 5, 1, 2, 3, 4

**Explanation:**

1. Synchronous code executes first: `console.log("5")`
2. First .then executes: `console.log("1")`
3. Second .then executes with promise2's value: `console.log("2")`
4. Error is thrown, .catch handler prints just the error message (error.message): `console.log("3")`
5. .catch returns a new resolved promise with value "4"
6. Final .then prints this resolved value: `console.log("4")`
</details>

const flashcardsData = [
  {
    id: 1,
    question: "What is the difference between var, let, and const?",
    answer: "var is function-scoped and can be re-declared; let and const are block-scoped, with let allowing re-assignment and const preventing it. However, const objects can have their contents modified."
  },
  {
    id: 2,
    question: "What is a closure in JavaScript?",
    answer: "A closure is a function that has access to its outer function's scope even after the outer function has returned. This allows for data privacy and partial application."
  },
  {
    id: 3,
    question: "What is the event loop in JavaScript?",
    answer: "The event loop is responsible for executing code, collecting and processing events, and executing queued sub-tasks. It allows JavaScript to perform non-blocking operations despite being single-threaded."
  },
  {
    id: 4,
    question: "What is the difference between == and ===?",
    answer: "== compares values after type coercion, while === compares both value and type without coercion. It's best practice to use === to avoid unexpected type conversions."
  },
  {
    id: 5,
    question: "What is a Promise in JavaScript?",
    answer: "A Promise is an object representing the eventual completion or failure of an asynchronous operation. It can be in one of three states: pending, fulfilled, or rejected."
  },
  {
    id: 6,
    question: "What is the spread operator?",
    answer: "The spread operator (...) allows an iterable to be expanded in places where zero or more arguments or elements are expected. It's commonly used for copying arrays/objects and combining them."
  },
  {
    id: 7,
    question: "What is destructuring in JavaScript?",
    answer: "Destructuring is a convenient way of extracting multiple values from data stored in arrays or objects and assigning them to distinct variables."
  },
  {
    id: 8,
    question: "What is the this keyword in JavaScript?",
    answer: "The 'this' keyword refers to the context in which a function is executed. Its value depends on how the function is called (global, object method, constructor, etc.)."
  },
  {
    id: 9,
    question: "What are arrow functions?",
    answer: "Arrow functions provide a concise syntax for writing functions. They don't have their own this, arguments, or prototype, and cannot be used as constructors."
  },
  {
    id: 10,
    question: "What is hoisting in JavaScript?",
    answer: "Hoisting is JavaScript's behavior of moving declarations to the top of their scope during compilation. Variables declared with var are hoisted and initialized as undefined, while let/const are hoisted but not initialized."
  },
  {
    id: 11,
    question: "What is the difference between null and undefined?",
    answer: "undefined indicates a variable has been declared but not assigned a value. null is an assignment value representing 'no value' and must be explicitly assigned."
  },
  {
    id: 12,
    question: "What are template literals?",
    answer: "Template literals are string literals allowing embedded expressions using backticks (`). They support multi-line strings and string interpolation with ${expression}."
  },
  {
    id: 13,
    question: "What is the map() method?",
    answer: "map() creates a new array by applying a function to each element of the original array. It's commonly used for transforming data without mutating the original array."
  },
  {
    id: 14,
    question: "What is the filter() method?",
    answer: "filter() creates a new array with elements that pass a test function. It's useful for extracting subsets of data based on conditions."
  },
  {
    id: 15,
    question: "What is the reduce() method?",
    answer: "reduce() executes a reducer function on each element, resulting in a single output value. It's powerful for accumulating values or aggregating data."
  },
  {
    id: 16,
    question: "What are JavaScript modules?",
    answer: "Modules allow code to be split into separate files. Using import/export statements, you can share functions, objects, or variables between files while maintaining encapsulation."
  },
  {
    id: 17,
    question: "What is the difference between localStorage and sessionStorage?",
    answer: "localStorage persists data indefinitely until explicitly cleared, while sessionStorage persists only for the duration of the page session (until the tab is closed)."
  },
  {
    id: 18,
    question: "What is the fetch() API?",
    answer: "fetch() provides a modern interface for making HTTP requests. It returns Promises and is more powerful and flexible than XMLHttpRequest."
  },
  {
    id: 19,
    question: "What is the difference between synchronous and asynchronous code?",
    answer: "Synchronous code executes sequentially, blocking further execution until each operation completes. Asynchronous code allows operations to run in the background, preventing blocking."
  },
  {
    id: 20,
    question: "What is the purpose of package.json?",
    answer: "package.json holds metadata about the project, including dependencies, scripts, version, and configuration. It's essential for managing Node.js/JavaScript projects."
  }
];

export default flashcardsData;
// cf⇥ const arrow function assignment

// ta⇥ ternary statement
// fl⇥ for loop (ES6)
// fo⇥ for of loop (ES6)
// ife⇥ else statement
// tc⇥ try/catch

// ae⇥ addEventListener
// gi⇥ getElementById
// gt⇥ getElementsByTagName
// qs⇥ querySelector
// cel⇥ createElement
// heac⇥ appendChild
// hecla⇥ classList.add
// hect⇥ classList.toggle
// hega⇥ getAttribute
// hesa⇥ setAttribute
// hera⇥ removeAttribute

// cs⇥ class (ES6)
// csx⇥ extend a class (ES6)
// m⇥ method (ES6 syntax)
// get⇥ getter (ES6 syntax)
// set⇥ setter (ES6 syntax)

// fan⇥ anonymous function
// fn⇥ named function
// asf⇥ async function
// aa⇥ async arrow function with
// af⇥ arrow function (ES6)
// f⇥ arrow function with body (ES6)
// fr⇥ arrow function with return (ES6)

// ra⇥ return new array
// rp⇥ return Promise (ES6)
// tf⇥ this

// fe⇥ forEach loop
// map⇥ map function

// st⇥ setTimeout
// si⇥ setInterval

const { Engine, Render, Runner, World, Bodies } = Matter

const width = 600
const height = 600

const engine = Engine.create()
const { world } = engine
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        wireframes: true,
        width,
        height,
    },
})
Render.run(render)
Runner.run(Runner.create(), engine)

// Walls
const walls = [
    Bodies.rectangle(width / 2, 0, width, 40, {
        isStatic: true,
    }),
    Bodies.rectangle(width / 2, height, width, 40, {
        isStatic: true,
    }),
    Bodies.rectangle(0, height / 2, 40, height, {
        isStatic: true,
    }),
    Bodies.rectangle(width, height / 2, 40, height, {
        isStatic: true,
    }),
]

World.add(world, walls)

// Maze generation

const grid = Array(3)
    .fill(null)
    .map(() => Array(3).fill(false))

const verticals = Array(3)
    .fill(null)
    .map(() => Array(2).fill(false))

const horizontals = Array(2)
    .fill(null)
    .map(() => Array(3).fill(false))

console.log(grid)
console.log(verticals)
console.log(horizontals)

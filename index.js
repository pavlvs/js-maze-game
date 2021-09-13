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

const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter

const cellsHorizontal = 5
const cellsVertical = 4
const width = window.innerWidth
const height = window.innerHeight

const unitLengthX = width / cellsHorizontal
const unitLengthY = height / cellsVertical

const engine = Engine.create()
engine.world.gravity.y = 0
const { world } = engine
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        wireframes: false,
        width,
        height,
    },
})
Render.run(render)
Runner.run(Runner.create(), engine)

// Walls
const walls = [
    Bodies.rectangle(width / 2, 0, width, 2, {
        isStatic: true,
    }),
    Bodies.rectangle(width / 2, height, width, 2, {
        isStatic: true,
    }),
    Bodies.rectangle(0, height / 2, 2, height, {
        isStatic: true,
    }),
    Bodies.rectangle(width, height / 2, 2, height, {
        isStatic: true,
    }),
]

World.add(world, walls)

// Maze generation

const shuffle = (arr) => {
    let counter = arr.length

    while (counter > 0) {
        const index = Math.floor(Math.random() * counter)
        counter--

        const temp = arr[counter]
        arr[counter] = arr[index]
        arr[index] = temp
    }

    return arr
}

const grid = Array(cellsVertical)
    .fill(null)
    .map(() => Array(cellsHorizontal).fill(false))

const verticals = Array(cellsVertical)
    .fill(null)
    .map(() => Array(cellsHorizontal - 1).fill(false))

const horizontals = Array(cellsVertical - 1)
    .fill(null)
    .map(() => Array(cellsHorizontal).fill(false))

const startRow = Math.floor(Math.random() * cellsVertical)
const startColumn = Math.floor(Math.random() * cellsHorizontal)

const stepThroughCell = (row, column) => {
    // If  I have visited the cell at [row, column] return
    if (grid[row][column]) {
        return
    }
    // Mark this cell as being visited
    grid[row][column] = true
    // Assemble randomly-ordered list of neighbors
    const neighbors = shuffle([
        [row - 1, column, 'up'],
        [row, column + 1, 'right'],
        [row + 1, column, 'down'],
        [row, column - 1, 'left'],
    ])

    // For each neighbor...
    for (let neighbor of neighbors) {
        const [nextRow, nextColumn, direction] = neighbor

        // See if that neighbor is out of bounds
        if (
            nextRow < 0 ||
            nextRow >= cellsVertical ||
            nextColumn < 0 ||
            nextColumn >= cellsHorizontal
        ) {
            continue
        }

        // If we have visited that neighbor, continue to next neighbor
        if (grid[nextRow][nextColumn]) {
            continue
        }

        // Remove a wall from either horizontals or verticals
        if (direction === 'left') {
            verticals[row][column - 1] = true
        } else if (direction === 'right') {
            verticals[row][column] = true
        } else if (direction === 'up') {
            horizontals[row - 1][column] = true
        } else if (direction === 'down') {
            horizontals[row][column] = true
        }

        stepThroughCell(nextRow, nextColumn)
    }

    // Visit that cell

    // Call stepThroughCell with new cell row and column
}

stepThroughCell(startRow, startColumn)

horizontals.forEach((row, rowIndex) => {
    row.forEach((open, columnIndex) => {
        if (open) {
            return
        }

        const wall = Bodies.rectangle(
            columnIndex * unitLengthX + unitLengthX / 2,
            rowIndex * unitLengthY + unitLengthY,
            unitLengthX,
            5,
            {
                isStatic: true,
                label: 'wall',
                render: {
                    fillStyle: 'red',
                },
            }
        )
        World.add(world, wall)
    })
})

verticals.forEach((row, rowIndex) => {
    row.forEach((open, columnIndex) => {
        if (open) {
            return
        }

        const wall = Bodies.rectangle(
            columnIndex * unitLengthX + unitLengthX,
            rowIndex * unitLengthY + unitLengthY / 2,
            5,
            unitLengthY,
            {
                isStatic: true,
                label: 'wall',
                render: {
                    fillStyle: 'red',
                },
            }
        )
        World.add(world, wall)
    })
})

// Goal
const goal = Bodies.rectangle(
    width - unitLengthX / 2,
    height - unitLengthY / 2,
    unitLengthX * 0.7,
    unitLengthY * 0.7,
    {
        isStatic: true,
        label: 'goal',
        render: {
            fillStyle: 'green',
        },
    }
)

World.add(world, goal)

//Ball
const ballRadius = Math.min(unitLengthX, unitLengthY) / 4
const ball = Bodies.circle(unitLengthX / 2, unitLengthY / 2, ballRadius, {
    label: 'ball',
    render: {
        fillStyle: 'blue',
    },
})

World.add(world, ball)

document.addEventListener('keydown', (event) => {
    const { x, y } = ball.velocity

    if (event.keyCode === 87) {
        Body.setVelocity(ball, { x, y: y - 5 })
    }
    if (event.keyCode === 68) {
        Body.setVelocity(ball, { x: x + 5, y })
    }
    if (event.keyCode === 83) {
        Body.setVelocity(ball, { x, y: y + 5 })
    }
    if (event.keyCode === 65) {
        Body.setVelocity(ball, { x: x - 5, y })
    }
})

// Win condition

Events.on(engine, 'collisionStart', (event) => {
    event.pairs.forEach((collision) => {
        const labels = ['ball', 'goal']
        if (
            labels.includes(collision.bodyA.label) &&
            labels.includes(collision.bodyB.label)
        ) {
            document.querySelector('.winner').classList.remove('hidden')
            world.gravity.y = 1
            world.bodies.forEach((body) => {
                if (body.label === 'wall') {
                    Body.setStatic(body, false)
                }
            })
        }
    })
})

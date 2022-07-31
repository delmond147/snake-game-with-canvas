// Select the canvas element from the html document
const canvas = document.getElementById("canvas")

// Create a 2d context on the canvas element from the html element.
const context = canvas.getContext("2d")

// Set game sound
const sound = new Audio()
sound.src = "./audio/sound.mp3"

//TODO Randomize the speed of the snake with time

//TODO Create a game controller board to:

//TODO START
//TODO START OVER
//TODO PUASE / CONTINUE
//TODO STORE HIGHEST SCORES TO LOCAL SOTRAGE
//TODO ADD CONTROLLER TO WORK ON MOBILE PHONE

// Create a box unit for the game environment
const box = 32
// Load gameArea images
const gameContainerImg = new Image()
gameContainerImg.src = "./img/ground.png"
const snakeFoodImg = new Image()
snakeFoodImg.src = "./img/food.png"

// Load game audio files for some game effects
let dead = new Audio()
let eat = new Audio()
let up = new Audio()
let down = new Audio()
let left = new Audio()
let right = new Audio()
dead.src = "./audio/dead.mp3"
eat.src = "./audio/eat.mp3"
up.src = "./audio/up.mp3"
down.src = "./audio/down.mp3"
left.src = "./audio/left.mp3"
right.src = "./audio/right.mp3"

// Create the snake
let snake = []
snake[0] = {
    x: 9 * box,
    y: 10 * box
}

// Create the snakes snakeFood
let snakeFood = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}

// Create Score variable 
let score = 0

// Snake Game Controller
let d

document.addEventListener("keydown", direction)

function direction(e) {
    let key = e.keyCode
    if (key == 37 && d != "RIGHT") {
        // left.play()
        d = "LEFT"
    } else if (key == 38 && d != "DOWN") {
        // up.play()
        d = "UP"
    } else if (key == 39 && d != "LEFT") {
        // right.play()
        d = "RIGHT"
    } else if (key == 40 && d != "UP") {
        // down.play()
        d = "DOWN"
    }

}

// Check for collision
function collision(head, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (head.x == arr[i].x && head.y == arr[i].y) {
            return true
        }
    }
    return false
}

// Draw all components to the canvas
function draw() {

    context.drawImage(gameContainerImg, 0, 0)
    sound.play()
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = (i == 0) ? "green" : "yellow"
        context.fillRect(snake[i].x, snake[i].y, box, box)

        context.strokeStyle = "black"
        context.strokeRect(snake[i].x, snake[i].y, box, box)

    }
    context.drawImage(snakeFoodImg, snakeFood.x, snakeFood.y)
    // Old head position

    let snakeX = snake[0].x
    let snakeY = snake[0].y

    // Directions
    if (d == "LEFT") snakeX -= box
    if (d == "UP") snakeY -= box
    if (d == "RIGHT") snakeX += box
    if (d == "DOWN") snakeY += box

    // Check if snake has eaten food
    if (snakeX == snakeFood.x && snakeY == snakeFood.y) {
        score++
        eat.play()
        snakeFood = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }

        // Don't remove the tail
    } else {
        // Now remove the tail
        snake.pop()
    }

    // Add new head
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    // Alert Game over 
    if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead, snake)) {
        clearInterval(game)
        dead.play()
    }

    snake.unshift(newHead)

    context.fillStyle = "black"
    context.font = "45px Changa one"
    context.fillText(`Scores: ${score}`, 2 * box, 1.6 * box)
}

// Call the draw game function every 100ms

let game = setInterval(draw, 100)



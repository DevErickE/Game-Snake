const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
let snake, food, dir, score, game;

function init() {
    snake = [{ x: 9 * box, y: 10 * box }];
    food = {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box
    };
    dir = undefined;
    score = 0;
}

init();

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && dir !== "RIGHT") dir = "LEFT";
    if (event.key === "ArrowUp" && dir !== "DOWN") dir = "UP";
    if (event.key === "ArrowRight" && dir !== "LEFT") dir = "RIGHT";
    if (event.key === "ArrowDown" && dir !== "UP") dir = "DOWN";
});

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "lime" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (dir === "LEFT") snakeX -= box;
    if (dir === "UP") snakeY -= box;
    if (dir === "RIGHT") snakeX += box;
    if (dir === "DOWN") snakeY += box;

    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };
    } else {
        snake.pop();
    }

    let newHead = { x: snakeX, y: snakeY };

    // Bateu na parede
    if (
        snakeX < 0 || snakeX >= canvas.width ||
        snakeY < 0 || snakeY >= canvas.height
    ) {
        clearInterval(game);
        setTimeout(() => {
            alert("Game Over!");
            init();
            game = setInterval(draw, 100);
        }, 100);
        return;
    }

    // Bateu no próprio corpo
    for (let i = 0; i < snake.length; i++) {
        if (snakeX === snake[i].x && snakeY === snake[i].y) {
            clearInterval(game);
            setTimeout(() => {
                alert("Game Over!");
                init();
                game = setInterval(draw, 100);
            }, 100);
            return;
        }
    }

    snake.unshift(newHead);
}

game = setInterval(draw, 100);

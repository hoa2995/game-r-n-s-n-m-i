const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const box = 20;
let snake;
let food;
let score;
let d;
let game;
let gameSpeed = 100; // Tốc độ mặc định của rắn

const speedSlider = document.getElementById('speedSlider');
const speedValue = document.getElementById('speedValue');

// Cập nhật tốc độ khi người dùng thay đổi thanh trượt
speedSlider.addEventListener('input', function() {
    gameSpeed = speedSlider.value;
    speedValue.textContent = gameSpeed + 'ms';
    restartGame();
});

// Khởi tạo trò chơi
function initGame() {
    snake = [];
    snake[0] = { x: 9 * box, y: 10 * box };
    food = {
        x: Math.floor(Math.random() * 19 + 1) * box,
        y: Math.floor(Math.random() * 19 + 1) * box
    };
    score = 0;
    d = '';
    restartGame(); // Chạy trò chơi với tốc độ mới
}

// Khởi động lại trò chơi với tốc độ mới
function restartGame() {
    clearInterval(game); // Dừng trò chơi hiện tại
    game = setInterval(draw, gameSpeed); // Khởi động trò chơi với tốc độ mới
}

// Xử lý sự kiện di chuyển
function direction(event) {
    if (event.keyCode == 37 && d != 'RIGHT') {
        d = 'LEFT';
    } else if (event.keyCode == 38 && d != 'DOWN') {
        d = 'UP';
    } else if (event.keyCode == 39 && d != 'LEFT') {
        d = 'RIGHT';
    } else if (event.keyCode == 40 && d != 'UP') {
        d = 'DOWN';
    }
}

// Kiểm tra va chạm
function collision(newHead, snake) {
    for (let i = 0; i < snake.length; i++) {
        if (newHead.x == snake[i].x && newHead.y == snake[i].y) {
            return true;
        }
    }
    return false;
}

// Vẽ trò chơi
function draw() {
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? 'green' : 'white';
        ctx.strokeStyle = 'red';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (d == 'LEFT') snakeX -= box;
    if (d == 'UP') snakeY -= box;
    if (d == 'RIGHT') snakeX += box;
    if (d == 'DOWN') snakeY += box;

    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
        };
    } else {
        snake.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
    }

    snake.unshift(newHead);

    ctx.fillStyle = 'black';
    ctx.font = '45px Changa one';
    ctx.fillText(score, 2 * box, 1.6 * box);
}

// Xử lý sự kiện nhấn nút di chuyển
document.getElementById('upButton').addEventListener('click', function() {
    if (d != 'DOWN') d = 'UP';
});

document.getElementById('leftButton').addEventListener('click', function() {
    if (d != 'RIGHT') d = 'LEFT';
});

document.getElementById('downButton').addEventListener('click', function() {
    if (d != 'UP') d = 'DOWN';
});

document.getElementById('rightButton').addEventListener('click', function() {
    if (d != 'LEFT') d = 'RIGHT';
});

// Xử lý sự kiện nhấn nút Reset
document.getElementById('resetButton').addEventListener('click', initGame);

// Xử lý sự kiện nhấn phím
document.addEventListener('keydown', direction);

// Khởi động trò chơi lần đầu
initGame();
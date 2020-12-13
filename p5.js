console.log('Starting polygon app...')


let ballX, ballY;
let ball;
let rX;
let rY;
let slope;
let slope2;
let intercept;
let x1;
let y1;
let d;
let d1;

let line1;
let gameBall1;

let levelVar = 1
let points = []
let shapes = []
let size = 10
let isDrawing = false
let gameStart = false
let ballHitLine = false
let instruct1El = document.getElementById('instruct1')
let instruct2El = document.getElementById('instruct2')
let levelEl = document.getElementById('level')
let lostEl = document.getElementById('lost')
let lost2El = document.getElementById('lost2')

function setup() {
    let canv = createCanvas (700, 450)
    canv.position(360, 10, 'relative')

    ballX = width / 2
    ballY = height / 2
    rX = random(-1, 1)
    rY = random(-1, 1)
}

function draw() {
    background ('wheat')

    drawDots()
    drawLines()
    if (isDrawing) {
        drawMouseDot()
    }
    gameBall()
    gameText()
}

function gameText() {
    if(gameStart) {
        instruct1El.classList.add('remove')
        instruct2El.classList.add('remove')
    }
}

function drawMouseDot() {
    noStroke()

    circle (mouseX, mouseY, size)

    stroke ('white')
    strokeWeight(10)

    line(mouseX, mouseY,
        points[points.length-1].x, points[points.length-1].y)
}

function mousePressed() {
    if (mouseButton === LEFT){
    if (isDrawing && currentPointIsCloseToFirst()) {
        shapes.push(points)
        clearDots()
} else{

    isDrawing = true
    points.push({x: mouseX, y: mouseY})
}
    }
    if (mouseButton === RIGHT) {
        clearLastDot()
    }
}

function keyPressed() {
    if(keyCode === 32) { //space key
        clearDots()
        gameStart = true
    }
    if(keyCode === 82) { // r key
        lost2El.classList.add('remove')
        lostEl.classList.add('remove')
        points = []
        setup()
        clearDots()
        levelVar = 1
        levelEl.innerHTML = levelVar
        gameStart = false
        
    }
}

function drawDots() {
    fill('darkred')
    noStroke()

    points.forEach(point=> {
        circle(point.x, point.y, size)
    })
    
}

function clearDots() {
    points = []
    isDrawing = false
}

function clearLastDot() {
    points.pop()
}

function distance(pt1, pt2) {
    let deltaX = pt2.x - pt1.x
    let deltaY = pt2.y - pt1.y
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY)
}

function currentPointIsCloseToFirst() {
    return distance({x: mouseX, y: mouseY}, points[0]) < size
}


function gameBall() {
    fill('red')
    noStroke()
    gameBall1 = circle(ballX, ballY, 20)


    if (gameStart) {
    ballX = ballX + (rX * levelVar)
    ballY = ballY + (rY * levelVar)
    }

    if(ballX >  width + 50) {
        gameStart = false
        ballX = width / 2
        ballY = height / 2
        lostEl.classList.remove('remove')
        lost2El.classList.remove('remove')
    }
    if(ballY >  height + 50) {
        gameStart = false
        ballX = width / 2
        ballY = height / 2
        lostEl.classList.remove('remove')
        lost2El.classList.remove('remove')
    }
    if(ballX <  width - 750) {
        gameStart = false
        ballX = width / 2
        ballY = height / 2
        lostEl.classList.remove('remove')
        lost2El.classList.remove('remove')
    }
    if(ballY <  height - 500) {
        gameStart = false
        ballX = width / 2
        ballY = height / 2
        lostEl.classList.remove('remove')
        lost2El.classList.remove('remove')
    }
}

function drawLines() {
    stroke('black')
    strokeWeight(10)

    for (let i = 0; i < points.length - 1; i++) {
        line1 = line(points[i].x, points[i].y,
            points[i+1].x, points[i+1].y)

        slope = (points[i+1].y - points[i].y)/(points[i+1].x - points[i].x)
        intercept = (-slope * points[i].x) + points[i].y
        slope2 = (points[i+1].y - ballY)/(points[i+1].x - ballX)
        console.log(slope - slope2)
        console.log(slope)
        if((slope - slope2) < 0.2) {
            if((slope - slope2) > -0.2) {
            console.log('yesss')
            gameStart = false
            setup()
            clearDots()
            levelVar = levelVar + 1
            levelEl.innerHTML = levelVar
            }
        }
    }   
}

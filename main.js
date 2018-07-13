window.onload = function (){
    buildSplash();
}

function buildSplash(){
    var startScreen = document.getElementById('start-screen');
    startScreen.id = 'start-screen';
    startScreen.style.width = '320px';
    startScreen.style.height = '568px';

    var title = document.createElement('h1');
    title.className = 'main-title';
    title.style.fontSize = '80px';
    title.innerHTML = 'Plastic Kills';

    var startButton = document.createElement('button');
    startButton.className = 'button-start';
    startButton.innerHTML = 'Start';

    var infoButton = document.createElement('div');
    infoButton.className = 'info-icon';

    var instructions = document.createElement('p');
    instructions.className = 'instructions';
    instructions.innerHTML = '';

    startScreen.appendChild(title);
    startScreen.appendChild(startButton);
    startScreen.appendChild(infoButton);
    startScreen.appendChild(instructions);

    startButton.addEventListener('click', function(){
        destroySplash();
        buildGame();
    });

    infoButton.addEventListener('click', function(){
        if (instructions.innerHTML === ''){
            instructions.innerHTML = 'Touch left or right side of the screen to change the direction. Avoid plastic and collect stars.';
        } else {
            instructions.innerHTML = '';
        }
    });
}

function destroySplash(){
    var startScreen = document.getElementById('start-screen');
    while (startScreen.firstChild) {
        startScreen.removeChild(startScreen.firstChild);
    }
    
    startScreen.style.width = '0px';
    startScreen.style.height = '0px';
}

function buildGame(){
    var playScreen = document.getElementById('play-screen');
    playScreen.style.width = '320px';
    playScreen.style.height = '568px';

    var canvas = document.createElement('canvas');
    canvas.id = 'my-canvas';
    canvas.width = 320;
    canvas.height = 568;

    playScreen.appendChild(canvas);

    var ctx = canvas.getContext('2d');

    //ctx.fillStyle = '#3b3b3b';
    //ctx.fillRect(0,0,400,650);

    game = new Game({
        fish: new Fish(),
        background: new Background(ctx),
        sound: new Sound(),
        ctx: ctx,
        canvas: canvas,
        gameOver: destroyGame,
    });

    game.start();
    
}

function destroyGame(){
    var playScreen = document.getElementById('play-screen');
    while (playScreen.firstChild) {
        playScreen.removeChild(playScreen.firstChild);
    }
    playScreen.style.width = '0px';
    playScreen.style.height = '0px';
    buildGameOver();
}

function buildGameOver(){
    var finishScreen = document.getElementById('finish-screen');
    finishScreen.style.background = "url('Media/Background.png')";
    finishScreen.style.backgroundRepeat = 'no-repeat';
    finishScreen.style.width = '320px';
    finishScreen.style.height = '568px';

    var canvas = document.createElement('canvas');
    canvas.id = 'canvas-game-over';
    canvas.width = 320;
    canvas.height = 568;

    finishScreen.appendChild(canvas);
    var ctx = canvas.getContext('2d');

    var background = new Background(ctx);

    drawBackground();

    function drawBackground() {
        background.newPosition();
        background.updateBackground();
        window.requestAnimationFrame(drawBackground.bind(this))
    }

    var finishElements = document.createElement('div');
    finishElements.id = 'finish-elements';

    finishScreen.appendChild(finishElements);

    var title = document.createElement('h1');
    title.className = 'game-over-title';
    title.innerHTML = 'Game over';

    var textScore = document.createElement('h3');
    textScore.className = 'score-text';
    textScore.innerHTML = 'Your score is';

    var score = document.createElement('h2');
    score.className = 'score';
    score.innerHTML = localStorage.getItem('score');

    var restartButton = document.createElement('button');
    restartButton.className = 'button-restart';
    restartButton.innerHTML = 'Try again';

    var factContainer = document.createElement('div');
    factContainer.className = 'fact-container';

    var fact = new Fact();
    var factText = document.createElement('h4');
    factText.className = 'fact-text';
    factText.innerHTML = fact.text;

    var sourceText = document.createElement('p');
    sourceText.className = 'source-text';
    sourceText.innerHTML = fact.source;

    var homeButton = document.createElement('div');
    homeButton.className = 'button-home';

    //finishElements.appendChild(title);
    finishElements.appendChild(textScore);
    finishElements.appendChild(score);
    finishElements.appendChild(factContainer);
    factContainer.appendChild(factText);
    factContainer.appendChild(sourceText);
    finishElements.appendChild(restartButton);
    finishElements.appendChild(homeButton);

    restartButton.addEventListener('click', function(){
        destroyGameOver();
        buildGame();
    });

    homeButton.addEventListener('click', function(){
        destroyGameOver();
        buildSplash();
    });
}

function destroyGameOver(){
    var finishScreen = document.getElementById('finish-screen');
    while (finishScreen.firstChild) {
        finishScreen.removeChild(finishScreen.firstChild);
    }
    finishScreen.style.width = '0px';
    finishScreen.style.height = '0px';
}

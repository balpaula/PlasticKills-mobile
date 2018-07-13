function Game (options) {
    this.fish = options.fish;
    this.ctx = options.ctx;
    this.background = options.background;
    this.obstacles = [];
    this.gameOver = options.gameOver;
    this.score = 0;
    this.autoScore = 0;
    this.level = 1;
    this.extra = {x: undefined, y: undefined, text: undefined};
    this.lives = 3;
    this.livesImage = new Image();
    this.livesImage.src = 'Media/heart.png';
    this.isEnded = false;
    this.speedObstacles = 600;
    this.sound = options.sound;
}

Game.prototype._drawBackground = function () {
    this.background.newPosition();
    this.background.updateBackground();
}

Game.prototype._drawFish = function () {
    this.ctx.drawImage(this.fish.image, this.fish.x-46, this.fish.y-54, 93, 109);
}

Game.prototype._drawObstacle = function () {
    this.obstacles.forEach( function(obstacle) {
        if (obstacle.type === 'plasticItem'){
            this.ctx.drawImage(obstacle.image, obstacle.x, obstacle.y, 32, 70);
        } else if (obstacle.type === 'star'){
            this.ctx.drawImage(obstacle.image, obstacle.x, obstacle.y, 30, 30);
        } else {
            this.ctx.drawImage(obstacle.image, obstacle.x, obstacle.y, 25, 21);
        }
        obstacle.start();
    }.bind(this));
}

Game.prototype._drawLevel = function () {
    this.ctx.fillStyle = 'white';
    this.ctx.font = '31px Gaegu';
    this.ctx.fillText('Level '+this.level, 16, 32);
}

Game.prototype._drawScore = function () {
    this.ctx.fillStyle ='white';
    this.ctx.font ='31px Gaegu';
    var textScore = ('0000'+this.score).slice(-5);
    this.ctx.fillText(textScore,220,32);
}

Game.prototype._drawExtra = function (x, y) {
    if (this.extra.y){
        this.ctx.fillStyle = 'white';
        this.ctx.font = '700 22px Gaegu';
        this.ctx.fillText(this.extra.text, this.extra.x, this.extra.y+10);
    }
}
   
Game.prototype._drawLives = function () {
    if (this.lives > 3){
        this.lives = 3;
    }
    for (var i = 0; i < this.lives; i++){
        this.ctx.drawImage(this.livesImage, 220+30*i, 42, 25, 21);
    }
}

Game.prototype._drawMessage = function () {
    this.ctx.fillStyle = 'white';
    this.ctx.font = '50px Gaegu';
    this.ctx.fillText('GAME OVER',40,300);
}

Game.prototype.start = function () {
    this.ctx.canvas = document.getElementById('canvas');
    this.ctx.canvas.addEventListener('click', this.onCanvasClick.bind(this), false);
    this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
    this._generateObstacle();
    this.intervalObstacle = setInterval(this._generateObstacle.bind(this), this.speedObstacles);
}

Game.prototype.onCanvasClick = function (e) {
    var x = e.clientX - this.ctx.canvas.offsetLeft;
    var y = e.clientY - this.ctx.canvas.offsetTop;

    if (x < 160){
        this.fish.goLeft();
    } else {
        this.fish.goRight();
    }

    if (!this.isEnded){
        this.fish.start();
    }
}

Game.prototype._generateObstacle = function () {
    var item;
    var options = 5
    if (this.lives < 3){
        options = 8;
    }
    var num = Math.floor(Math.random()*options);
    if (num === 4 || num === 5){
        item = new Star();
    } else if (num === 6){
        item = new Heart();
    } else {
        item = new PlasticItem();
    }
    this.obstacles.push(item);
}

Game.prototype._checkObstacle = function () {
    this.obstacles.forEach(function(obstacle, index){
        if (obstacle.y < 0){
            obstacle.clear();
            this.obstacles.splice(index,1);
        }
    }.bind(this));
}

Game.prototype._collision = function () {
    this.obstacles.forEach(function(obstacle, index){
        var cornerTopLeft = [obstacle.x, obstacle.y];
        var cornerTopRight = [obstacle.x+32, obstacle.y];
        var cornerBottomLeft = [obstacle.x, obstacle.y+70];
        var cornerBottomRight = [obstacle.x+32, obstacle.y+70];

        var corners = [cornerTopLeft, cornerTopRight, cornerBottomLeft, cornerBottomRight];
        corners.forEach(function(corner){
            if (corner[0]  >=this.fish.x && corner[0] <= this.fish.x+47 && corner[1] >= this.fish.y && corner[1] <= this.fish.y+55){
                if (obstacle.collision === false){
                    obstacle.collision = true;
                    this.checkCollision(obstacle, index);
                } 
            }
        }.bind(this));
    }.bind(this))
}

Game.prototype.checkCollision = function (obstacle, index) {
    if (obstacle.type === 'plasticItem'){
        this.sound.plasticCollision.play();
        this.removeLive();
    } else {
        this.extra.x = obstacle.x;
        this.extra.y = obstacle.y+10;
        setTimeout(this._removeExtra.bind(this), 300);
        if (obstacle.type === 'star') {
            this.sound.starCollision.play();
            this.score += 10;
            this.extra.text = '+10';
        } else {
            this.sound.heartCollision.play();
            this.lives++;
            this.extra.text = 'LIVE UP';
        }
    }
    obstacle.clear();
    this.obstacles.splice(index,1);
}

Game.prototype._removeExtra = function () {
    this.extra.x = undefined;
    this.extra.y = undefined;
}

Game.prototype.removeLive = function () {
    this.lives -= 1;
}

Game.prototype._increaseScore = function () {
    this.autoScore++;
    if (this.autoScore === 10){
        this.score++;
        this.autoScore = 0;
    }
}

Game.prototype._checkLevel = function () {
    this.level = 1 + Math.floor(this.score/100);
    this.speedObstacles = 600 - 100*(this.level-1);
    this.obstacles.forEach(function(obstacle){
        obstacle.speed = ((this.level-1)/10)*5;
    }.bind(this));
}

Game.prototype.checkIfEnded = function () {
    if (this.lives === 0){
        setTimeout(function(){
            this.isEnded = true;
        }.bind(this), 100);
    }
}

Game.prototype._update = function () {
    this._drawBackground();
    this._drawFish();
    this._drawObstacle();
    this._drawScore();
    this._drawExtra();
    this._drawLevel();
    this._drawLives();
    this._checkObstacle();
    this._collision();
    this._increaseScore();
    this._checkLevel();
    this.checkIfEnded();
    

    if (!this.isEnded){
        this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
    } else {
        localStorage.setItem('score',this.score);
        this.fish.stop();
        this.sound.gameOver.play();
        this._drawMessage();
        setTimeout(this.gameOver, 1000);
    }
    
}



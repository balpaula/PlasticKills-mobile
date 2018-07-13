function Obstacle(){
    this.x = Math.floor(Math.random()*321);
    this.y = 630;
    this.intervalId = undefined;
    this.collision = false;
    this.image = new Image();
    this.type = undefined;
    this.speed = 0;
    this.image.src = undefined;
    this.image.width = undefined;
    this.image.height = undefined;
}

Obstacle.prototype.start = function () {
    if (!this.intervalId) {
        this.intervalId = setInterval(this.move.bind(this), 6);
    }
}

Obstacle.prototype.clear = function () {
    if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = undefined;
    }
}

Obstacle.prototype.move = function () {
    this.y -= (2+this.speed);
}

Obstacle.prototype.stop = function () {
    this.y = 0;
}

function PlasticItem () {
    Obstacle.call(this);
    this.type = 'plasticItem';
    this.image.src = this.randomPlasticItem();
    this.image.width = 32;
    this.image.height = 70;
}

PlasticItem.prototype = Object.create(Obstacle.prototype);

PlasticItem.prototype.randomPlasticItem = function () {
    var imagesArray = ['Media/bottle.png','Media/bag.png', 'Media/spoon.png'];
    return imagesArray[Math.floor(Math.random()*imagesArray.length)];
}

function Star (){
    Obstacle.call(this);
    this.type = 'star';
    this.image.src = this.randomStarColor();
    this.image.width = 30;
    this.image.height = 30;
}

Star.prototype = Object.create(Obstacle.prototype);

Star.prototype.randomStarColor = function () {
    var imagesArray = ['Media/star.png'];
    return imagesArray[Math.floor(Math.random()*imagesArray.length)];
}

function Heart () {
    Obstacle.call(this);
    this.type = 'heart';
    this.image.src = 'Media/heart.png';
    this.width = 25;
    this.height = 25;
}

Heart.prototype = Object.create(Obstacle.prototype);
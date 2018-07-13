function Fish () {
    this.x = 160;
    this.y = 190;
    this.direction = undefined;
    this.intervalId = undefined;
    this.image = new Image();
    this.image.src = 'Media/Fish.png';
    this.width = 93;
    this.height = 109;
}

Fish.prototype.start = function () {
    this.move();
}

Fish.prototype.move = function () {
    if (!this.intervalId) {
        this.intervalId = setInterval(this._moveForward.bind(this), 25);
    }
}

Fish.prototype._moveForward = function () {
    if (this.direction === 'right'){
        this.goRight();
    } else {
        this.goLeft();
    }
}

Fish.prototype.goLeft = function () {
    this.direction = 'left';
    this.image.src = 'Media/Fish-Left.png';
    if (this.x > 10){
        this.x-=5;
    } else {
        this.goRight();
    }
}

Fish.prototype.goRight = function () {
    this.direction = 'right';
    this.image.src = 'Media/Fish-Right.png';
    if (this.x < 310){
        this.x+=5;
    } else {
        this.goLeft();
    }
}

Fish.prototype.stop = function () {
    if ( this.intervalId ) {
        clearInterval(this.intervalId)
        this.intervalId = undefined;
    }
}
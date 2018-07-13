function Background(ctx){
    this.image = new Image();
    this.image.src = 'Media/Background.png';
    this.width = 320;
    this.height = 900;
    this.speedY = -2;
    this.x = 0;
    this.y = 0;
    this.ctx = ctx;
}

Background.prototype.updateBackground = function () {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    this.ctx.drawImage(this.image, this.x, this.y + this.height, this.width, this.height);
}

Background.prototype.newPosition = function () {
    this.y += this.speedY;
    if (this.y == -(this.height)) {
        this.y = 0;
    }
}
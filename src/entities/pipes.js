class Pipes extends Entity {
    _deltaX = 1
    _maxYposition = -200
    _position = []
    _coordUpdateRate = 150
    score = 0

    constructor(params) {
        super(params)
        this._pipeGap = params.gap
        this.bird = params.bird
    }

    update(delta) {
        if (this._coordUpdateRate % 170 === 0) {
            this._position.push({
                x: this._game.width,
                y: this._maxYposition * (Math.random() + 1)
            });
        }
        this._coordUpdateRate += 1
        this._deltaX = 2
        for (let i = 0; i < this._position.length; i++) {
            this._position[i].x -= (this._deltaX)
            if (this._position.length > 2) {
                this._position.shift();
                this.score += 1;
            }
            let bottomPipeY = this._position[i].y + this.height + this._pipeGap

            if (this.bird.x + this.bird.width > this._position[i].x && this.bird.x < this._position[i].x + this.width && this.bird.y < this._position[i].y + this.height) {
                this._game.gameOver()
            }

            if (this.bird.x + this.bird.width > this._position[i].x && this.bird.x < this._position[i].x + this.width && this.bird.y + this.bird.height > bottomPipeY && this.bird.y < bottomPipeY + this.height) {
                this._game.gameOver()
            }
        }
    }

    draw() {
        for (let i = 0; i < this._position.length; i++) {
            this._spriteSheet.then(sprite => {
                this._drawEngine.drawImage({
                    spriteSheet: sprite,
                    image: this._frames[0],
                    x: this._position[i].x,
                    y: this._position[i].y + this.height + this._pipeGap,
                    width: this.width,
                    height: this.height
                })

                this._drawEngine.drawImage({
                    spriteSheet: sprite,
                    image: this._frames[1],
                    x: this._position[i].x,
                    y: this._position[i].y,
                    width: this.width,
                    height: this.height
                })
            })

        }
    }
}
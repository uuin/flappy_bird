class Bird extends Entity {
    _rotation = 0
    constructor(params) {
        super(params)
        this._flapSpeed = params.flapSpeed
        this._physicsEngine = params.physicsEngine
        this._foreground = params.foreground
        this.falling = true
        this._degree = params.degree
        this._context = params.context
    }

    update(delta) {
        super.update(delta)
        this._physicsEngine.update(this, delta)
        if (this.y < 0) {
            this.y = 0;
        }

        if (this.y + this.height >= this._foreground.y) {
            this._game.gameOver()
        }

        if(this.speed >= this._flapSpeed){
            this._rotation = 90 * this._degree;
        }else{
            this._rotation = 0;
        }
    }

    draw() {
        this._spriteSheet.then(sprite => {
            this._drawEngine.drawImage({
                spriteSheet: sprite,
                image: this._frames[this._frameIdx],
                x: this.x,
                y: this.y,
                width: this.width,
                height: this.height
            })
        })
    }

    flap() {
        this.speed = -this._flapSpeed
        this._rotation = -1 * this._degree;
    }
}



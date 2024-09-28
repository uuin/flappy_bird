class Foreground extends Entity {
    _index = 0
    constructor(params) {
        super(params)
        this.speed = params.speed
    }

    update(delta) {
        this._index += delta*3
        this.x = -((this._index * this.speed*3) % this._game.width)
    }

    draw() {
        this._spriteSheet.then(sprite => {
            this._drawEngine.drawImage({
				spriteSheet: sprite,
				image: this._frames[this._frameIdx],
				x: this.x + this._game.width,
				y: this.y,
				width: this.width,
				height: this.height
			})

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
}
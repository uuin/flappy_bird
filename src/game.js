class Game {
    _countCurrent = document.getElementById('count_current');
    _countBest = document.getElementById('count_best');
    _bestStored = parseInt(localStorage.getItem('bestScore'));
    _startBtn = document.getElementById('start')
    _getReadyListener = null

    constructor() {
        this._config = new Config()
        this._canvas = document.getElementById(this._config.canvas.canvasId)
        this._canvas.width = this._config.canvas.width
        this._canvas.height = this._config.canvas.height
        this.height = this._config.canvas.height
        this.width = this._config.canvas.width
        this._drawEngine = new CanvasDrawEngine({ canvas: this._canvas })
        this._physicsEngine = new PhysicsEngine({ gravity: this._config.gravity })
        this._resourceLoader = new ResourceLoader()

        this._mouseInputHandler = new MouseInputHandler({
            left: () => {
                this._bird.flap()
            },
        })

        this._keyBoardInputHandler = new KeyBoardInputHandler({
            ArrowUp: () => {
                console.log(5)
                this._bird.flap()
            },
            space: () => {
                console.log(5)
                this._bird.flap()
            }
        })
    }

    async prepare() {
            this._spriteSheet = this._resourceLoader.load({
            type: RESOURCE_TYPE.IMAGE,
            src: this._config.spritesheet.src,
            width: this._config.spritesheet.width,
            height: this._config.spritesheet.height,
        })

    }

        reset() {
            this._score = 0

            this._background = new Background({
                x: this._config.background.x,
                y: this._config.background.y,
                width: this._config.background.width,
                frames: this._config.background.frames,
                height: this._config.background.height,
                spriteSheet: this._spriteSheet,
                drawEngine: this._drawEngine,
                speed: this._config.GAME_SPEED,
                game: this
            })

            this._foreground = new Foreground({
                x: this._config.foreground.x,
                y: this._config.foreground.y,
                width: this._config.foreground.width,
                frames: this._config.foreground.frames,
                height: this._config.foreground.height,
                spriteSheet: this._spriteSheet,
                drawEngine: this._drawEngine,
                speed: this._config.GAME_SPEED,
                game: this
            })

            this._bird = new Bird({
                x: this._config.bird.x,
                y: this._config.bird.y,
                width: this._config.bird.width,
                height: this._config.bird.height,
                degree: this._config.DEGREE,
                context: this._drawEngine._context,
                frames: this._config.bird.frames,
                spriteSheet: this._spriteSheet,
                foreground: this._config.foreground,
                flapSpeed: this._config.bird.flapSpeed,
                physicsEngine: this._physicsEngine,
                drawEngine: this._drawEngine,
                game: this
            })

            this._pipes = new Pipes({
                x: this._config.pipes.x,
                y: this._config.pipes.y,
                width: this._config.pipes.widthFactor*this._bird.width,
                frames: this._config.pipes.frames,
                height: this._config.pipes.height,
                gap: this._config.pipes.gapFactor*this._bird.height,
                bird: this._bird,
                spriteSheet: this._spriteSheet,
                drawEngine: this._drawEngine,
                speed: this._config.GAME_SPEED,
                game: this
            })
        }

        update(delta) {
            this._background.update(delta)
            this._foreground.update(delta)
            this._bird.update(delta)
            this._pipes.update(delta)
            this.updateCounter()

        }

        draw() {
            this._background.draw()
            this._pipes.draw()
            this._bird.draw()
            this._foreground.draw()
        }

        _loop() {
            const now = Date.now()
            const delta = now - this._lastUpdate

            this.update(delta / 700)

            if (this._playing) {
                this._drawEngine.clear()
                this.draw()
                this._lastUpdate = now
                requestAnimationFrame(this._loop.bind(this))
            }
        }

        updateCounter() {
            if(!this._bestStored) {
                this._bestStored = this._scoreCurrent
            }
            this._scoreCurrent = this._pipes.score
            this._countCurrent.innerText = `набрано ${this._scoreCurrent}`
            this._bestStored = Math.max(this._scoreCurrent, this._bestStored);
            this._countBest.innerText = `лучший ${this._bestStored}`
            localStorage.setItem("bestScore", this._bestStored);
        }

        start() {
            this._canvas.removeEventListener('click', this._getReadyListener)
            this._playing = true
            this._mouseInputHandler.subscribe()
            this._keyBoardInputHandler.subscribe()
            this._lastUpdate = Date.now()
            this.reset()
            this._loop()
        }

        gameOver() {
            this._playing = false
            this._gameOverMessage = new GameOverMessage({
                x: this._config.gameOverMessage.x,
                y: this._config.gameOverMessage.y,
                width: this._config.gameOverMessage.width,
                frames: this._config.gameOverMessage.frames,
                height: this._config.gameOverMessage.height,
                spriteSheet: this._spriteSheet,
                drawEngine: this._drawEngine,
                game: this
            })
            this._gameOverMessage.draw()
            this._startBtn.style.display = "flex"
            this._startBtn.addEventListener('click', (event)=>{window.location = '/'})
        }

        getReady() {
            this._playing = false;
            console.log(this._bestStored)
                if (this._bestStored === 0 || Number.isNaN(this._bestStored)) {


                    this._background = new Background({
                        x: this._config.background.x,
                        y: this._config.background.y,
                        width: this._config.background.width,
                        frames: this._config.background.frames,
                        height: this._config.background.height,
                        spriteSheet: this._spriteSheet,
                        drawEngine: this._drawEngine,
                        speed: this._config.GAME_SPEED,
                        game: this
                    })

                    this._background.draw()
                    this._getReadyListener = (event) => {
                        this.start()
                    }
                    this._canvas.addEventListener('click', this._getReadyListener)
                }

                else this.start()
        }
}
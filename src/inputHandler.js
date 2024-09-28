class InputHandler {
    eventHandlerMap = {}

    constructor(eventHandlerMap) {
        this._eventHandlerMap = eventHandlerMap
    }

    subscribe() {
        Object.entries(this.eventHandlerMap).forEach(([name, handler])=> {
            document.addEventListener(name, handler)
        })
    }
}

class MouseInputHandler extends InputHandler {
    buttonIndexNameMap = {
        0: 'left',
    }

    eventHandlerMap = {
        click: (event) => {
            const buttonName = this.buttonIndexNameMap[event.button]
            const handler = this._eventHandlerMap[buttonName]
            if(handler) {
                handler(event)
            }
        }
    }
}

class KeyBoardInputHandler extends InputHandler {
    buttonIndexNameMap = {
        38: 'ArrowUp',
        32: 'space',
    }

    eventHandlerMap = {
        keydown: (event) => {
            const buttonName = this.buttonIndexNameMap[event.keyCode]
            const handler = this._eventHandlerMap[buttonName]
            if(handler) {
                handler(event)
            }
        }
    }
}
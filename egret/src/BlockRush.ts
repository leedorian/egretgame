class BlockRush extends Block{
    public constructor(param: any) {
        super(param);
    }

    private _timeMark:number;
    private _rushState:boolean = false;

    _beforeDraw(): void {
        this._clickableColor = BlockColor.clickable;
    }
    _onTouch(oEvent: Event) {
        if (this._currentState === BlockState.clickable) {
            this._hit();
        }
    }
    _hit():void {
        super._hit();
        if (this._rushState) {
            let hitRushEvent: GameEvents.BlockEvent = new GameEvents.BlockEvent(GameEvents.BlockEvent.HIT_RUSH);
            this.dispatchEvent(hitRushEvent);
        }
    }
    move(speed: number, dir: string = "down"):void{
        this._timeMark = egret.getTimer();
        super.move(speed, dir);
    }
    _moveBlock(timeStamp: number): boolean {
        let redrawScreen = super._moveBlock(timeStamp);
        if (this.state === "clickable") {
            let pass = Math.floor((timeStamp - this._timeMark) / 1000);
            if (pass === 1) {
                this._rushState = !this._rushState;
                if (this._rushState) {
                    this._clickableColor = BlockColor.clickableRush;
                } else {
                    this._clickableColor = BlockColor.clickable;
                }
                this._draw();
                this._timeMark = timeStamp;
            }
        }
        return redrawScreen;
    }
}

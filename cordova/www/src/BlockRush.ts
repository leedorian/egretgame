class BlockRush extends BlockBase{
    public constructor(param: any) {
        super(param);
    }

    private _timeMark:number;
    private _activeState:boolean = false;
    protected _activeColor:BlockColor = BlockColor.clickableRush;

    _beforeDraw(): void {
        this._clickableColor = BlockColor.clickable;
    }

    _hit() {
        super._hit();
        if (this._activeState) {
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
                this._activeState = !this._activeState;
                if (this._activeState) {
                    this._clickableColor = this._activeColor;
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

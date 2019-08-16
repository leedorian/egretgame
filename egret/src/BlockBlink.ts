class BlockBlink extends BlockBase {
    public constructor(param: any) {
        super(param);
        this.blockTypeName = BlockType.BlockBlink;
    }
    private _timeMark: number;
    private _activeState: boolean = true;

    _beforeDraw(): void {
        this._clickableRushColor = RES.getRes(BlockTexture.clickableBlinkRushStyle);
        this._clickableColor = RES.getRes(BlockTexture.clickableBlink);
    }
    // _hit() {
    //     super._hit();
    //     if (this._activeState) {
    //         let hitBlinkEvent: GameEvents.BlockEvent = new GameEvents.BlockEvent(GameEvents.BlockEvent.HIT_BLINK);
    //         this.dispatchEvent(hitBlinkEvent);
    //     }
    // }
    move(speed: number, dir: string = "down"): void {
        this._timeMark = egret.getTimer();
        super.move(speed, dir);
    }
    _moveBlock(timeStamp: number): boolean {
        let redrawScreen = super._moveBlock(timeStamp);
        if (this.state !== "clicked") {
            let pass = Math.floor((timeStamp - this._timeMark) / 1000);
            if (pass === 1) {
                this._activeState = !this._activeState;
                if (this._activeState) {
                    this.state = "clickable";
                } else {
                    this.state = "unclickable";
                }
                this._timeMark = timeStamp;
            }
        }
        return redrawScreen;
    }
}

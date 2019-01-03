class BlockFlashBase extends BlockBase{
    public constructor(param: any) {
        super(param);
    }

    private _timeMark:number;
    protected _activeState:boolean = false;
    protected _activeColor:egret.Texture;

    _beforeDraw(): void {
        this._clickableColor  = RES.getRes(BlockTexture.clickableNormal);
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
                    this._clickableColor = RES.getRes(BlockTexture.clickableNormal);
                }
                this._draw();
                this._timeMark = timeStamp;
            }
        }
        return redrawScreen;
    }
}

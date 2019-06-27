class BlockFlashBase extends BlockBase{
    public constructor(param: any) {
        super(param);
    }

    private _timeMark:number;
    private _cachedClickableColor:egret.Texture = this._clickableColor;
    private _cachedClickableRushColor:egret.Texture = this._clickableRushColor;
    protected _activeState:boolean = true;

    _beforeDraw(): void {
       
    }


    move(speed: number, dir: string = "down"):void{
        this._timeMark = egret.getTimer();
        super.move(speed, dir);
    }
    _moveBlock(timeStamp: number): boolean {
        let redrawScreen = super._moveBlock(timeStamp);
        const blockStyle = Utils.blockStyle;
        if (this.state === "clickable") {
            let pass = Math.floor((timeStamp - this._timeMark) / 1000);
            if(pass === 1){
                this._activeState = !this._activeState;
                if (this._activeState) {
                    if(blockStyle === "rush"){
                        this._clickableRushColor = this._cachedClickableRushColor;
                    }else{
                        this._clickableColor = this._cachedClickableColor;
                    }
                } else {
                    if(blockStyle === "rush"){
                        this._clickableRushColor = RES.getRes(BlockTexture.clickableNormalRushStyle);
                    }else{
                        this._clickableColor = RES.getRes(BlockTexture.clickableNormal);
                    }
                }
                this._draw();
                this._timeMark = timeStamp;
            }
        }
        return redrawScreen;
    }
}

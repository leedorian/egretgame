class BlockDouble extends BlockBase {
    public constructor(param: any) {
        super(param);
    }
    private _clickCount: number = 0;
    _beforeDraw(): void {
        this._clickableColor = RES.getRes(BlockTexture.clickableDouble);
    }
    _onTouch(oEvent: Event) {
        if (this._currentState === BlockState.clickable) {
            this._clickCount++;
            if (this._clickCount === 1) {
                this._clickableColor = RES.getRes(BlockTexture.clickableNormal);
                this._draw();
            } else if (this._clickCount === 2) {
                this._hit();
            }
        }
    }
}

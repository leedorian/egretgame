class BlockDouble extends BlockBase {
    public constructor(param: any) {
        super(param);
        this.blockTypeName = BlockType.BlockDouble;
    }
    private _clickCount: number = 0;
    _beforeDraw(): void {
        this._clickableRushColor = RES.getRes(BlockTexture.clickableDoubleRushStyle);
        this._clickableColor = RES.getRes(BlockTexture.clickableDouble);
    }
    _onTouch(oEvent: Event) {
        const blockStyle = Utils.blockStyle;
        if (this._currentState === BlockState.clickable) {
            this._clickCount++;
            if (this._clickCount === 1) {
                if(blockStyle.indexOf("rush") !== -1){
                    this._clickableRushColor = RES.getRes(BlockTexture.clickableNormalRushStyle);
                }else{
                    this._clickableColor = RES.getRes(BlockTexture.clickableNormal);
                }
                this._draw();
            } else if (this._clickCount === 2) {
                this._hit();
            }
        }
    }
}

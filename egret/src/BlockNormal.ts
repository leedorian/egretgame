class BlockNormal extends Block {
    public constructor(param:any){
        super(param);
    }
    _beforeDraw():void{
        this._clickableColor = BlockColor.clickable;
    }
    _onTouch(oEvent: Event) {
        if (this._currentState === BlockState.clickable) {
            this._hit();
        }
    }
}

class BlockNormal extends BlockBase {
    public constructor(param:any){
        super(param);
    }
    _beforeDraw():void{
        this._clickableColor = RES.getRes(BlockTexture.clickableNormal);
        this._clickableRushColor = RES.getRes(BlockTexture.clickableNormalRushStyle);
        
    }
}

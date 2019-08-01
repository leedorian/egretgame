class BlockShrink extends BlockFlashBase{
    public constructor(param: any) {
        super(param);
    }
    
    _beforeDraw(): void {
        this._clickableRushColor = RES.getRes(BlockTexture.clickableShrinkRushStyle);
        this._clickableColor = RES.getRes(BlockTexture.clickableShrink);
    }
    _hit(bProgramTriggered?:boolean) {
        super._hit(bProgramTriggered);
        if (!bProgramTriggered && this._activeState) {
            let hitShrinkEvent: GameEvents.BlockEvent = new GameEvents.BlockEvent(GameEvents.BlockEvent.HIT_SHRINK);
            this.dispatchEvent(hitShrinkEvent);
        }
    }
}

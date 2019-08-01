class BlockRush extends BlockFlashBase{
    public constructor(param: any) {
        super(param);
    }
    _beforeDraw(): void {
        this._clickableRushColor = RES.getRes(BlockTexture.clickableRushRushStyle);
        this._clickableColor = RES.getRes(BlockTexture.clickableRush);
    }
    _hit(bProgramTriggered?:boolean) {
        super._hit(bProgramTriggered);
        if (!bProgramTriggered && this._activeState) {
            let hitRushEvent: GameEvents.BlockEvent = new GameEvents.BlockEvent(GameEvents.BlockEvent.HIT_RUSH);
            this.dispatchEvent(hitRushEvent);
        }
    }
}

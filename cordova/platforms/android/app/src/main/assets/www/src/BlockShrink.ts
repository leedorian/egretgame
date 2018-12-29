class BlockShrink extends BlockFlashBase{
    public constructor(param: any) {
        super(param);
    }
    protected _activeColor:BlockColor = BlockColor.clickableShrink;

    _hit() {
        super._hit();
        if (this._activeState) {
            let hitShrinkEvent: GameEvents.BlockEvent = new GameEvents.BlockEvent(GameEvents.BlockEvent.HIT_SHRINK);
            this.dispatchEvent(hitShrinkEvent);
        }
    }
}

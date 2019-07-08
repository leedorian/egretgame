abstract class BlockBase extends egret.Sprite{
     public constructor(param:any){
        super();

        this._currentState = param.state;
        this._coverState = param.coverState;
        this.shrinkRate = param.shrinkRate;
        this.width = param.width;
        this.height = param.height;
        this._shrinkWidth = (this.width - (this._blockPadding + this._blockMargin) * 2) * this.shrinkRate;
        this._shrinkHeight = (this.height - (this._blockPadding + this._blockMargin) * 2) * this.shrinkRate;
        this._colorRect = new egret.Bitmap();
        this._colorRect.width = this._shrinkWidth;
        this._colorRect.height = this._shrinkHeight;
        // this._colorRect.x = this._blockMargin + this._blockPadding;
        // this._colorRect.y = this._blockMargin + this._blockPadding;
        // this._colorRect.touchEnabled = true;

        this._coverRect = new egret.Bitmap();
        this._coverRect.width = this._shrinkWidth;
        this._coverRect.height = this._shrinkHeight;
        this._coverRect.touchEnabled = true;

        this._backRect = Utils.createBitmapByName("blockFrame_png");
        const rect:egret.Rectangle = new egret.Rectangle(6,6,88,106);
        this._backRect.scale9Grid =rect;
        this._backRect.width = this.width - this._blockMargin * 2;
        this._backRect.height = this.height - this._blockMargin * 2;
        this._backRect.x = this._blockMargin;
        this._backRect.y = this._blockMargin;
        this._backRect.touchEnabled = true;



        this._beforeDraw();
        this._draw();
        this._colorRect.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._onTouch, this);
        this._coverRect.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._onTouch, this);
        this._backRect.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._onBackTouch, this);
    }
    abstract _beforeDraw(): void;

    protected _currentState:number;
    protected _clickableColor: egret.Texture;
    protected _clickableRushColor: egret.Texture;

    // private _type:string;
    public speed:number;
    public shrinkRate:number;
    public active:boolean = false;
    private _dir:string;
    private _colorRect:egret.Bitmap;
    private _backRect:egret.Bitmap;
    private _coverRect:egret.Bitmap;
    private _coverState:number;
    private _unClickableColor:egret.Texture = RES.getRes(BlockTexture.unClickable);
    // private _clickedColor:egret.Texture = RES.getRes(BlockTexture.clicked);

    private _shrinkWidth:number;
    private _shrinkHeight:number;
    private _blockMargin:number = 2;
    private _blockPadding:number = 3;

    protected _draw(){
        // let fillColor: BlockColor;
        // let bgFillColor: BlockColor = this._unClickableColor;
        // let labelColor: BlockColor = BlockColor.unClickable;
        if (this._backRect.parent === null) {
            this.addChild(this._backRect);
        }

        const blockStyle = Utils.blockStyle;
        if(blockStyle.indexOf("rush") !== -1){
            this._colorRect.texture = this._clickableRushColor;
        }else{
            this._colorRect.texture = this._clickableColor;
        }
        
        // const rect:egret.Rectangle = new egret.Rectangle(5,5,90,90);
        // this._colorRect.scale9Grid =rect;


        const lineColor: BlockColor = BlockColor.border;
        let rectWidth = this._shrinkWidth;
        let rectHeight = this._shrinkHeight;
        if (this._currentState === BlockState.unclickable) {
            rectWidth = this.width - (this._blockMargin + this._blockPadding) * 2;
            rectHeight = this.height - (this._blockMargin + this._blockPadding) *2;
        }

        if(this._currentState === BlockState.clicked){
            rectWidth = this._colorRect.width;
            rectHeight = this._colorRect.height;
        }

        if(this._currentState > 0){
            if(blockStyle.indexOf("rush") !== -1){
                this._colorRect.texture = this._clickableRushColor;
            }else{
                this._colorRect.texture = this._clickableColor;
            }
            // this._colorRect.graphics.beginFill( this._clickableColor, 1);
        }else{
            this._colorRect.texture = this._unClickableColor;
            // this._colorRect.graphics.beginFill( this._unClickableColor, 0);
        }

        // this._colorRect.graphics.lineStyle(1, lineColor);
        // this._colorRect.graphics.drawRect((this.width - rectWidth) / 2, (this.height - rectHeight) / 2, rectWidth, rectHeight);
        this._colorRect.x = (this.width - rectWidth) / 2 ;
        this._colorRect.y = (this.height - rectHeight) / 2;
        this._colorRect.width = rectWidth;
        this._colorRect.height = rectHeight;

        if(this._colorRect.parent === null){
            this.addChild(this._colorRect);
        }

        if(this._currentState !== BlockState.unclickable){
            if(this._coverState === BlockCoverState.freezed){
                this._coverRect.texture = RES.getRes("ice_png");
            }else if(this._coverState === BlockCoverState.quelled){
                this._coverRect.texture = RES.getRes("quellEye_png");
            }else{
                this._coverRect.texture = null;
            }
            this._coverRect.x = (this.width - rectWidth) / 2 ;
            this._coverRect.y = (this.height - rectHeight) / 2;
            this._coverRect.width = rectWidth;
            this._coverRect.height = rectHeight;

            if(this._coverRect.parent === null){
                this.addChild(this._coverRect);
            }
        }
        
        
    }
    protected _onTouch(oEvent: Event) {
        if(this.active){
            if (this._currentState === BlockState.clickable) {
                this._hit();
            }else if(this._currentState === BlockState.unclickable){
                this._hitUnclickable();
            }
        }
    }
    private _onBackTouch(oEvent: Event) {
        if(this.active){
            this._hitUnclickable();
        }
    }

    private _hitAni():boolean {
        let rectWidth:number = this._colorRect.width * this.shrinkRate;
        let rectHeight:number = this._colorRect.height * this.shrinkRate;
        if (this._currentState === BlockState.unclickable) {
            rectWidth = this._colorRect.width;
            rectHeight = this._colorRect.height;
        }
        if (rectWidth > 0){
            let tempWidth = rectWidth - 6;
            this._colorRect.width = tempWidth > 0 ? tempWidth : 0;
        }
        if (rectHeight > 0) {
            let tempHeight = rectHeight - 8;
            this._colorRect.height = tempHeight > 0 ? tempHeight : 0;
        }

        if (rectWidth === 0 && rectHeight === 0) {
        // let rectWidth: number = this._colorRect.scaleX;
        // let rectHeight: number = this._colorRect.scaleY;
        // if (rectWidth > 0) {
        //     this._colorRect.scaleX = rectWidth - 0.1;
        // } else {
        //     this._colorRect.scaleX = 0;
        // }
        // if (rectHeight > 0) {
        //     this._colorRect.scaleY = rectHeight - 0.1;
        // } else {
        //     this._colorRect.scaleY = 0;
        // }
        // if (rectWidth === 0 && rectHeight === 0) {
            egret.stopTick(this._hitAni, this);
            this.removeChild(this._colorRect);

            // this.removeEventListener(egret.Event.ENTER_FRAME, this._hitAni, this);

        }else{
            this._draw();
        }
        // if(this._backRect != null && this._backRect.parent != null){
        //     this.removeChild(this._backRect);
        //     this._backRect = null;
        // }

        return false;
    }
    protected _hit(){
        // this.addEventListener(egret.Event.ENTER_FRAME, this._hitAni, this);
        egret.startTick(this._hitAni, this);
        this.state = "clicked";
        const hitEvent: GameEvents.BlockEvent = new GameEvents.BlockEvent(
            GameEvents.BlockEvent.HIT
        );
        this.dispatchEvent(hitEvent);
    }
    private _hitUnclickable(){
        const hitEvent: GameEvents.BlockEvent = new GameEvents.BlockEvent(
            GameEvents.BlockEvent.HIT_UNCLICKABLE
        );
        this.dispatchEvent(hitEvent);
    }

    public move(speed:number, dir:string = "down"){
        this.speed = speed;
        this._dir = dir;
        egret.startTick(this._moveBlock, this);
    }
    public stop(){
        egret.stopTick(this._moveBlock, this);
    }
    protected _moveBlock(timeStamp: number):boolean{

        if(this._dir === "down"){
            if(this.y >= this.height){
                this._triggerAllMovedInEvent();
            }
            if(this.y >= Utils.getArenaHeight()){
                this._triggerMovedOutEvent();
            }else{
                this._setY();
            }
        }else{
            if(this.y <= Utils.getArenaHeight() - this.height ){
                this._triggerAllMovedInEvent();
            }
            if(this.y <= -this.height){
                this._triggerMovedOutEvent();
            }else{
                this._setY();
            }
        }
        return false;
    }
    private _setY(){
        let tempY:number = this.y;
        if(this._dir === "up"){
            this.y = tempY - this.speed;
        }else{
            this.y = tempY + this.speed;
        }

    }
    private _triggerMovedOutEvent(){
        let missed:boolean = false;
        let movedOutEvent:GameEvents.BlockEvent = new GameEvents.BlockEvent(GameEvents.BlockEvent.MOVED_OUT);
        if(this._currentState === BlockState.clickable){
            missed = true;
        }
        movedOutEvent.missed = missed;
        this.dispatchEvent(movedOutEvent);
    }
    private _triggerAllMovedInEvent(){
        let allMovedInEvent:GameEvents.BlockEvent = new GameEvents.BlockEvent(GameEvents.BlockEvent.ALL_MOVED_IN);
        this.dispatchEvent(allMovedInEvent);
    }
    /**
     * sizeUpdate
     */
    public sizeUpdate() {
        this._shrinkWidth = this.width * this.shrinkRate - this._blockMargin;;
        this._shrinkHeight = this.height * this.shrinkRate - this._blockMargin;;
        if (this._currentState !== BlockState.clicked) {
            this._draw();
        }
    }
    public get state():string{
        let state:string;
        state = BlockState[this._currentState];
        return state;
    }
    public set state(val:string){
        this._currentState = BlockState[val];

        this.graphics.clear();
        this._draw();
    }
    public freeze(){
        if(this._currentState !== BlockState.unclickable){
            this._coverState = BlockCoverState.freezed;
            this._coverRect.texture = RES.getRes("ice_png");
        }
    }
    public cleanCover(){
        if(this._currentState !== BlockState.unclickable){
            this._coverRect.texture = null;
            this._coverState = BlockCoverState.normal;
        }
    }
}

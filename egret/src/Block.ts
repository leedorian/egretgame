abstract class Block extends egret.Sprite{
     public constructor(param:any){
        super();
        this.touchEnabled = true;
        this._currentState = param.state;
        this.width = param.width;
        this.height = param.height;
        this._colorRect = new egret.Shape();
        this._colorRect.width = this.width;
        this._colorRect.height = this.height;
        this._beforeDraw();
        this._draw();
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._onTouch, this);
    }
    abstract _beforeDraw(): void;
    abstract _onTouch(oEvent: Event): void;

    protected _currentState:number;
    protected _clickableColor: BlockColor;

    private _type:string;
    public speed:number;
    private _dir:string;
    private _colorRect:egret.Shape;
    private _unClickableColor:BlockColor = BlockColor.unClickable;


    protected _draw(){
        let fillColor: BlockColor;
        // let labelColor: BlockColor = BlockColor.unClickable;
        const lineColor: BlockColor = BlockColor.border;
        const rectWidth = this._colorRect.width;
        const rectHeight = this._colorRect.height;
        // const rectX = rectWidth / 2;
        // const rectY = rectHeight / 2;

        // this._colorRect.anchorOffsetX = rectX;
        // this._colorRect.anchorOffsetY = rectY;
        // this._colorRect.x = rectX;
        // this._colorRect.y = rectY;
        if (this._currentState === BlockState.clickable || this._currentState === BlockState.clicked){
            fillColor = this._clickableColor;
        }
        this._colorRect.graphics.clear();
        this._colorRect.graphics.lineStyle(1, lineColor);
        if(this._currentState !== BlockState.unclickable){
            this._colorRect.graphics.beginFill( fillColor, 1);
        }

        this._colorRect.graphics.drawRect((this.width - rectWidth) / 2, (this.height - rectHeight) / 2, rectWidth, rectHeight);
        if(this._colorRect.parent === null){
            this.addChild(this._colorRect);
        }

        // if(this._currentState === 1){
        //     lineColor = BlockColor.unClickable;
        // }
        // this.graphics.lineStyle(1, lineColor);
        // this.graphics.moveTo( this.x,this.y );
        // this.graphics.lineTo( this.x  + this.width, this.y );
        // this.graphics.endFill();

        // var label:egret.TextField = new egret.TextField();
        // label.width = this.width;
        // label.height = this.height;
        // label.textAlign = egret.HorizontalAlign.CENTER;
        // label.verticalAlign = egret.VerticalAlign.MIDDLE;
        // label.textColor = labelColor;
        // label.text = this.hashCode.toString();
        // this.addChild( label );
    }
    private _hitAni():boolean {
        let rectWidth:number = this._colorRect.width;
        let rectHeight:number = this._colorRect.height;
        if (rectWidth > 0){
            this._colorRect.width = rectWidth - 6;
        }else{
            this._colorRect.width = 0;
        }
        if (rectHeight > 0) {
            this._colorRect.height = rectHeight - 8;
        }else{
            this._colorRect.height = 0;
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
            this._colorRect = null;
            // this.removeEventListener(egret.Event.ENTER_FRAME, this._hitAni, this);

        }else{
            this._draw();
        }
        return false;
    }
    protected _hit(){
        // this.addEventListener(egret.Event.ENTER_FRAME, this._hitAni, this);
        egret.startTick(this._hitAni, this);
        this.state = "clicked";
        let hitEvent: GameEvents.BlockEvent = new GameEvents.BlockEvent(
            GameEvents.BlockEvent.HIT
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
    private _moveBlock():boolean{

        if(this._dir === "down"){
            if(this.y >= Utils.getStageHeight()){
                this._triggerMovedOutEvent();
            }else{
                this._setY();
            }
        }else{
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
}

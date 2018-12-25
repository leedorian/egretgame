class Block extends egret.Sprite{
     public constructor(param:any){
        super();
        this.touchEnabled = true;
        this._currentState = param.state;
        this.width = param.width;
        this.height = param.height;
        this._draw();
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._onTouch, this);
    }
    private _currentState:number;
    private _type:string;
    public speed:number;
    private _dir:string;
    private _draw(){
        let fillColor: BlockColor;
        let labelColor: BlockColor = BlockColor.unClickable;
        let lineColor: BlockColor = BlockColor.clickable;
        if(this._currentState === 0){
            fillColor = BlockColor.unClickable;
            labelColor = BlockColor.clickable;
        }else if(this._currentState === 1){
            fillColor = BlockColor.clickable;
        }else if(this._currentState === 2){
            fillColor = BlockColor.clicked;
        }
        this.graphics.lineStyle(1, lineColor);
        this.graphics.beginFill( fillColor, 1);
        this.graphics.drawRect( 0, 0, this.width, this.height );
        if(this._currentState === 1){
            lineColor = BlockColor.unClickable;
        }
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
    private _onTouch(oEvent:Event){
        if(this._currentState === 1){
            this.state = "clicked";
            let hitEvent:GameEvents.BlockEvent = new GameEvents.BlockEvent(GameEvents.BlockEvent.HIT);
            this.dispatchEvent(hitEvent);
        }
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
        if(this._currentState === 1){
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

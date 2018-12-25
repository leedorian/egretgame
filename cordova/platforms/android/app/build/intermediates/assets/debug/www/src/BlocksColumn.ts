class BlocksColumn extends egret.Sprite{
    public constructor(param:any){
        super();
        this._dir = param.dir;
        this._speed = param.speed;
        this.name = param.name;
        this._index = parseInt(this.name.split("_")[1], 10);
        this._draw();
    }
    private _blocks:Array<any> = [];
    private _speed:number = 1;
    private _dir:string;
    private _index:number;
    private _creatingRowIndex:number = 0;
    private _draw(){
        let n:number = this._dir === "down" ? -1 : 0;
        let blockCount = this._dir === "down" ? Utils.rows : Utils.rows + 1;
        for(let i = n; i < blockCount; i++){
            this._creatingRowIndex = this._dir === "down" ? i + 1 : i;
            let block = this._createBlock({
                state: Utils.getRowBlockState(this._creatingRowIndex)[this._index]
            });
            block.y = i * block.height;
            this.addChild(block);
            this._blocks.push(block);
        }
        console.log(this._blocks);
    }
    private _createBlock(settings:any):Block{
        let blockWidth:number = Utils.getBlockWidth();
        let blockHeight:number = Utils.getBlockHeight();
        let param:any = {
            width: blockWidth,
            height: blockHeight,
            state: settings.state
        };
        let block = new Block(param);
        block.addEventListener(GameEvents.BlockEvent.MOVED_OUT, this._onMovedOut, this);
        return block;
    }
    private _onMovedOut(evt:GameEvents.BlockEvent){
        let tarBlock: Block = evt.target;
        // let missed: boolean = evt.missed;
        let missed: boolean = false;
        tarBlock.removeEventListener(GameEvents.BlockEvent.MOVED_OUT, this._onMovedOut, this);
        if(this._dir === "down"){
            this._blocks.pop();
        }else{
            this._blocks.shift();
        }
        
        tarBlock.stop();
        this.removeChild(tarBlock);
        tarBlock = null;
        if(missed){
            this.stop();
        }else{
            console.log(this._creatingRowIndex);
            let newBlock: Block  = this._createBlock({
                state: Utils.getRowBlockState(this._creatingRowIndex)[this._index]
            });
            this._creatingRowIndex++;
            this.addChild(newBlock);
            if(this._dir === "down"){
                newBlock.y = this._blocks[0].y - newBlock.height + this._speed;
                // newBlock.y = - newBlock.height;
            }else{
                newBlock.y = this._blocks[this._blocks.length - 1].y + newBlock.height - this._speed;
                // newBlock.y = Utils.getStageHeight();
                // newBlock.y = Utils.rows * Utils.getBlockHeight();
            }
            console.log(newBlock.y);
            newBlock.move(this._speed, this._dir);
            if(this._dir === "down"){
                this._blocks.unshift(newBlock);
            }else{
                this._blocks.push(newBlock);
            }
        }
        
    }
    public move(){
        let blocks:Array<any> = this._blocks;
        for(let i = 0; i < blocks.length; i++){
            blocks[i].move(this._speed, this._dir);
        }
    }
    public stop(){
        console.log("stop");
        for(let i = 0; i < this._blocks.length; i++){
            this._blocks[i].stop();
        }
    }
}
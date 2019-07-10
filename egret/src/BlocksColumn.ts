class BlocksColumn extends egret.Sprite {
    public constructor(param: any) {
        super();
        this.dir = param.dir;
        this._dir = this.dir;
        this.name = param.name;
        this.blockWeightNumber = param.blockWeightNumber;
        this._speedUpInterval = param.speedUpInterval * 1000;
        this._index = parseInt(this.name.split("_")[1], 10);
        this._draw();
    }
    //blocks array
    private _blocks: Array<any> = [];
    //blocks in initial screen
    private _initialBlocks: Array<any> = [];
    private _dir: string;
    private _index: number;
    private _creatingRowIndex: number = 0;
    private _speedUpTimer: egret.Timer;
    private _speedLevel: number = 0;
    private _speedUpInterval: number;
    private _speedTick: boolean = false;
    private _reverseTimer: egret.Timer;
    private _shrinkRate:number = 1;
    private _blockWeightNumber:Array<number>;
    private _blockCoverState:number = BlockCoverState.normal;

    public speed: number = Service.GAME_CONFIG.speedLevels[this._speedLevel];
    public dir: string;

    private _draw() {
        this._blocks = [];
        this._initialBlocks = [];
        let n: number = this._dir === "down" ? -1 : 0;
        let blockCount = this._dir === "down" ? Utils.rows : Utils.rows + 1;
        for (let i = n; i < blockCount; i++) {
            let state:number = BlockState.unclickable;
            this._creatingRowIndex = this._dir === "down" ? i + 1 : i;
            if ((this._dir === "down" && i === -1) || (this._dir === "up" && i === blockCount - 1)) {
                state = Utils.getRowBlockState(this._creatingRowIndex)[
                    this._index
                ]
            }
            const block = this._createBlock({
                state: state,
                startBlock: true,
                coverState: this._blockCoverState
            });
            this.addChild(block);
            block.x = 0;
            block.y = i * block.height;
            this._blocks.push(block);
            this._initialBlocks.push(block);
        }
    }
    public reset(){
        this.stop();
        this.speedLevel = 0;
        this._blockCoverState = BlockCoverState.normal;
        this._dir =  this.dir;
        this.shrinkReset();
        const blockLength =  this._blocks.length;
        for (let i = 0; i < blockLength; i++) {
            this.removeChild(this._blocks[i]);
            this._blocks[i] = null;
        }
        this._draw();
    }
    private _createBlock(settings: any): any {
        let blockWidth: number = Utils.getBlockWidth();
        let blockHeight: number = Utils.getBlockHeight();
        let param: any = {
            width: blockWidth,
            height: blockHeight,
            shrinkRate: this._shrinkRate,
            state: settings.state,
            coverState: settings.coverState
        };
        // let block = new BlockNormal(param);
        // let block = new BlockDouble(param);
        // let block = new BlockRush(param);
        // let block = new BlockBlink(param);
        let block:any;
        if (settings.startBlock == null && settings.state === BlockState.clickable) {
            if(Utils.blockStyle.indexOf("quell") === -1){
                let weightArray = [];
                for (const key in this._blockWeightNumber) {
                    if (this._blockWeightNumber.hasOwnProperty(key)) {
                        const weight = this._blockWeightNumber[key];
                        for (let index = 0; index < weight; index++) {
                            weightArray.push(BlockType[key]);
                        }
                    }
                }
                if (weightArray.length !== 10) {
                    weightArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                }
                const weightNumbers = weightArray;//[0, 0, 0, 0, 0, 1, 1, 2, 3, 4]
                const idx = Math.floor(Math.random() * weightNumbers.length);
                const blockType:number = weightNumbers[idx];
                block = new window[BlockType[blockType]](param);
            }else{
                block = new BlockNormal(param);
            }
        }else{
            block = new BlockNormal(param);
        }
        if(!settings.startBlock){
            block.active = true;
        }
        block.addEventListener(
            GameEvents.BlockEvent.MOVED_OUT,
            this._onMovedOut,
            this
        );
        block.addEventListener(
            GameEvents.BlockEvent.ALL_MOVED_IN,
            this._onAllMovedIn,
            this
        );
        return block;
    }
    private _onAllMovedIn(evt: GameEvents.BlockEvent) {
        let tarBlock: BlockBase = evt.target;
        let y = tarBlock.y;
        let idx;
        if(Utils.blockStyle.indexOf("destroy") !== -1 && (tarBlock.state === "clickable" || tarBlock instanceof BlockBlink || tarBlock instanceof BlockShrink)){
            for(var i = 0; i< this._blocks.length; i++){
                if(this._blocks[i] === tarBlock){
                    idx = i;
                    break;
                }
            }
            tarBlock.stop();
            this.removeChild(tarBlock);
            tarBlock = null;
            const block = this._createBlock({
                state:BlockState.unclickable
            });
            this.addChild(block);
            block.x = 0;
            block.y = y;
            block.move(this.speed, this._dir);
            this._blocks[idx] = block;

            let scoreEvent:GameEvents.PlayEvent = new GameEvents.PlayEvent(GameEvents.PlayEvent.SCORE);
            
            scoreEvent.score = 1;
            this.dispatchEvent(scoreEvent);
        }
    }
    private _onMovedOut(evt: GameEvents.BlockEvent) {
        let tarBlock: BlockBase = evt.target;
        // let missed: boolean = evt.missed;
        let missed: boolean = false;
        tarBlock.removeEventListener(
            GameEvents.BlockEvent.MOVED_OUT,
            this._onMovedOut,
            this
        );
        if (this._dir === "down") {
            this._blocks.pop();
        } else {
            this._blocks.shift();
        }

        tarBlock.stop();
        this.removeChild(tarBlock);
        tarBlock = null;
        if (missed) {
            this.stop();
        } else {
            let newBlock: BlockBase = this._createBlock({
                state: Utils.getRowBlockState(this._creatingRowIndex)[
                    this._index
                ],
                coverState: this._blockCoverState
            });
            this._creatingRowIndex++;
            this.addChildAt(newBlock, 0);
            if (this._dir === "down") {
                newBlock.y = this._blocks[0].y - newBlock.height + this.speed;
            } else {
                newBlock.y =
                    this._blocks[this._blocks.length - 1].y +
                    newBlock.height -
                    this.speed;
            }
            newBlock.move(this.speed, this._dir);
            if (this._dir === "down") {
                this._blocks.unshift(newBlock);
            } else {
                this._blocks.push(newBlock);
            }
        }
    }
    private _speedLooper() {
        if(Utils.blockStyle.indexOf("freeze") == -1){
            if (this._speedTick) {
                this._slowDown();
            } else {
                this._speedUp();
            }
        }
    }
    private _speedUp() {
        if (this._speedLevel < Service.GAME_CONFIG.speedLevels.length) {
            this._CalculateSpeed();
            
            this.updateSpeed();
            this._speedLevel++;
        }
        if (this._speedLevel === Service.GAME_CONFIG.speedLevels.length) {
            this._speedTick = true;
        }
    }
    private _CalculateSpeed() {
        if(Utils.blockStyle.indexOf("rush") !== -1){
            this.speed = Service.GAME_CONFIG.speedLevels[this._speedLevel] * Service.GAME_CONFIG.rushFactor;
        }else{
            this.speed = Service.GAME_CONFIG.speedLevels[this._speedLevel];
        }
    }
    private _slowDown() {
        if (this._speedLevel > 0) {
            this._speedLevel--;
            this._CalculateSpeed();
            this.updateSpeed();
        }
        if (this._speedLevel === 0) {
            this._speedTick = false;
            this._reversePause();
        }
    }
    private _revertDir() {
        if (this._dir === "up") {
            this._dir = "down";
        } else {
            this._dir = "up";
        }
        this.move();
    }
    private _reversePause() {
        egret.startTick(this._checkPauseToFit, this);
        
    }
    private _checkPauseToFit(){
        let nBlocks:number = this._blocks.length;
        let lastBlockIndex:number = 0;
        if(this._dir === "down"){
            lastBlockIndex = nBlocks - 1;
        }
        let bDowScrollOut:boolean = this._dir === "down" && this._blocks[lastBlockIndex].y >= Utils.getArenaHeight();
        let bUpScrollOut:boolean = this._dir === "up" && this._blocks[lastBlockIndex].y <= - this._blocks[lastBlockIndex].height;
        if( bDowScrollOut || bUpScrollOut){
            egret.stopTick(this._checkPauseToFit, this);
            this._excuteReversePause();
        }
        return false;
    }
    private _excuteReversePause() {
        this.stop();
        console.log(this._blocks);
        if (this._reverseTimer == null) {
            this._reverseTimer = new egret.Timer(2000, 1);
            this._reverseTimer.addEventListener(
                egret.TimerEvent.TIMER_COMPLETE,
                this._revertDir,
                this
            );
        }
        this._reverseTimer.reset();
        this._reverseTimer.start();
    }
    private _blockSizeUpdate(){
        for (let i = 0; i < this._blocks.length; i++) {
            const blockInstance = this._blocks[i];
            blockInstance.shrinkRate = this._shrinkRate;
            blockInstance.sizeUpdate();
        }
    }
    public updateSpeed() {
        let blocks: Array<any> = this._blocks;
        for (let i = 0; i < blocks.length; i++) {
            blocks[i].speed = this.speed;
        }
    }
    public startSpeedUpTimer() {
        this._speedUpTimer = new egret.Timer(this._speedUpInterval, 0);
        //注册事件侦听器
        this._speedUpTimer.addEventListener(
            egret.TimerEvent.TIMER,
            this._speedLooper,
            this
        );
        this._speedUpTimer.start();
    }
    public stopSpeedUpTimer() {
        if (this._speedUpTimer != null) {
            this._speedUpTimer.stop();
            this._speedUpTimer.removeEventListener(
                egret.TimerEvent.TIMER,
                this._speedLooper,
                this
            );
            this._speedUpTimer = null;
        }
        this._speedTick = false;
    }
    private _stopReverseTimer(){
        if(this._reverseTimer != null){
            this._reverseTimer.removeEventListener(
                egret.TimerEvent.TIMER_COMPLETE,
                this._revertDir,
                this
            );
            this._reverseTimer = null;
        }
    }
    //start moving blocks in this column
    public move(isGameSceneTriggered:boolean = false) {
        const blocks: Array<any> = this._blocks;
        for (let i = 0; i < blocks.length; i++) {
            blocks[i].move(this.speed, this._dir);
            if(isGameSceneTriggered){
                blocks[i].active = true;
            }
        }
        if(isGameSceneTriggered){
            // const initialBlocks: Array<any> = this._initialBlocks;
            // for (let i = 0; i < initialBlocks.length; i++) {
            //     initialBlocks[i].active = true;
            // }
        }
        this.startSpeedUpTimer();
    }
    public stop(isGameSceneTriggered:boolean = false) {
        for (let i = 0; i < this._blocks.length; i++) {
            this._blocks[i].stop();
            if(isGameSceneTriggered){
                this._blocks[i].active = false;
            }
        }
        this.stopSpeedUpTimer();
        this._stopReverseTimer();
    }
    public shrink() {
        this._shrinkRate = 0.5;
        this._blockSizeUpdate();
    }
    public shrinkReset() {
        this._shrinkRate = 1;
        this._blockSizeUpdate();
    }

    /**
     * get speedLevel
     */
    public get speedLevel():number {
        return this._speedLevel;
    }
    /**
     * set speedLevel
     */
    public set speedLevel(val:number) {
        this._speedLevel = val;
        this.speed = Service.GAME_CONFIG.speedLevels[this._speedLevel];
    }

    /**
     * set blockWeightNumber
     * @param val weight array
     *
     */
    public set blockWeightNumber(val:Array<number>) {
        this._blockWeightNumber = val;
    }
    /**
     * get blockWeightNumber
     * @param val weight array
     *
     */
    public get blockWeightNumber():Array<number> {
        return this._blockWeightNumber;
    }

    public freezeBlocks(){
        this._blockCoverState = BlockCoverState.freezed;
        const blocks: Array<any> = this._blocks;
        for (let i = 0; i < blocks.length; i++) {
            blocks[i].freeze();
        }
    }
    private _removeEffectCover(){
        this._blockCoverState = BlockCoverState.normal;
        const blocks: Array<any> = this._blocks;
        for (let i = 0; i < blocks.length; i++) {
            blocks[i].cleanCover();
        }
    }
    public unFreezeBlocks(){
        this._removeEffectCover();
    }
    public unQuell(){
        this._removeEffectCover();
    }
    public quell(){
        this._blockCoverState = BlockCoverState.quelled;
        const blocks: Array<any> = this._blocks;
        for (let i = 0; i < blocks.length; i++) {
            let tarBlock = blocks[i];
            let y = tarBlock.y;
            if(tarBlock.state === "clickable" || tarBlock instanceof BlockBlink || tarBlock instanceof BlockShrink){
                tarBlock.stop();
                this.removeChild(tarBlock);
                tarBlock = null;
                const block = this._createBlock({
                    state:BlockState.clickable,
                    coverState: BlockCoverState.quelled
                });
                this.addChild(block);
                block.x = 0;
                block.y = y;
                block.move(this.speed, this._dir);
                this._blocks[i] = block;
            }
        }
    }

    public destroy(){
        const blocks: Array<any> = this._blocks;
        for (let i = 0; i < blocks.length; i++) {
            let tarBlock = blocks[i];
            let y = tarBlock.y;
            if(tarBlock.state === "clickable" || tarBlock instanceof BlockBlink || tarBlock instanceof BlockShrink){
                tarBlock.stop();
                this.removeChild(tarBlock);
                tarBlock = null;
                const block = this._createBlock({
                    state:BlockState.unclickable
                });
                this.addChild(block);
                block.x = 0;
                block.y = y;
                block.move(this.speed, this._dir);
                this._blocks[i] = block;
            }
        }
    }

    public purify():number{
        const blocks: Array<any> = this._blocks;
        var destroyed:number = 0;
        for (let i = 0; i < blocks.length; i++) {
            let tarBlock = blocks[i];
            let y = tarBlock.y;
            if(tarBlock.state === "clickable" || tarBlock instanceof BlockBlink || tarBlock instanceof BlockShrink){
                tarBlock.stop();
                this.removeChild(tarBlock);
                tarBlock = null;
                const block = this._createBlock({
                    state:BlockState.unclickable
                });
                this.addChild(block);
                block.x = 0;
                block.y = y;
                block.move(this.speed, this._dir);
                this._blocks[i] = block;
                destroyed++;
            }
        }
        return destroyed;
    }

}

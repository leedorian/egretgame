///<reference path="cordova.d.ts"/>

class GameScene extends egret.Sprite {
    public constructor(param: any) {
        super();
        this._mode = param.mode;
        this._level = param.level;
        this._rushFactor = Service.GAME_CONFIG.rushFactor;
        this._rushTime = Service.GAME_CONFIG.rushTime;
        this._shrinkTime = Service.GAME_CONFIG.shrinkTime;
        this._levelUpTime = Service.GAME_CONFIG.levelUpInterval;
        this._calculateColsRows();
        this._drawColumns();
        this.width = Utils.getArenaWidth();
        this.height = Utils.getArenaHeight();
        this.scrollRect = new egret.Rectangle(0, 0, this.width, this.height);
        this.addEventListener(
            GameEvents.BlockEvent.MOVED_OUT,
            this._onMovedOut,
            this,
            true
        );
        this.addEventListener(
            GameEvents.BlockEvent.HIT_RUSH,
            this._onHitRush,
            this,
            true
        );
        this.addEventListener(
            GameEvents.BlockEvent.HIT_UNCLICKABLE,
            this._onHitUnclickable,
            this,
            true
        );
        this.addEventListener(
            GameEvents.BlockEvent.HIT_SHRINK,
            this._onHitShrink,
            this,
            true
        );
        document.addEventListener("pause", this._onPause.bind(this), false);
        document.addEventListener("resume", this._onResume.bind(this), false);
        // let state = "_" + (+new Date());
        // Wechat.auth("snsapi_userinfo", state, function (response) {
        //     // you may use response.code to get the access token.
        //     if (response.code) {
        //         console.log(response.code);
        //     }
        // }, function (reason) {
        //     console.log("Failed: " + reason);
        // });
    }
    private _mode: number;
    private _level: number;
    private _cols: number;
    private _rows: number;
    private _blockColumns: Array<BlocksColumn> = [];
    private _columnSpeeds: Array<number> = [];
    private _rushFactor:number;
    private _rushTime:number;
    private _rushWatch:Time.StopWatch;
    private _freezeWatch:Time.StopWatch;
    private _quellWatch:Time.StopWatch;
    private _purifyWatch:Time.StopWatch;
    private _destroyWatch:Time.StopWatch;    
    private _shrinkTime:number;
    private _shrinkWatch:Time.StopWatch;
    private _levelUpTime:number;
    private _levelUpWatch:Time.StopWatch;
    private _difficulty:number = 0;
    private _bgm:egret.Sound = RES.getRes("midnight-ride_mp3");
    private _bgmChanel:egret.SoundChannel;
    private _freezeSound:egret.Sound = RES.getRes("iceCracking_mp3");
    private _windSound:egret.Sound = RES.getRes("wind_mp3");
    private _quellSound:egret.Sound = RES.getRes("quell_mp3");
    private _purifySound:egret.Sound = RES.getRes("Purify_mp3");
    private _purifyingSound:egret.Sound = RES.getRes("Purifying_mp3");
    private _destroySound:egret.Sound = RES.getRes("Destroy1_mp3");
    private _effectChanel:egret.SoundChannel;
    public started:boolean = false;

    private _onPause(){
        this._stopbgm();
        this._effectChanel.stop();
    }
    private _onResume(){
        if(this.started){
            this._playbgm();
        }
        if(Utils.blockStyle.indexOf("freeze") !== -1){
            this._freezeSound.play(0,0);
        }
        if(Utils.blockStyle.indexOf("quell") !== -1){
            this._quellSound.play(0,0);
        }
    }
    private _drawColumns() {
        let blockColumn: BlocksColumn;
        let aDir: Array<string> = ["up", "down"];
        let nColWidth: number = Utils.getBlockWidth();
        for (let i = 0; i < Utils.columns; i++) {
            let sDir: string = "up";
            if (this._mode === GameMode.BI_DIR) {
                sDir = aDir[Math.floor(Math.random() * 2)];
            } else if (this._mode === GameMode.DOWN) {
                sDir = aDir[1];
            }
            blockColumn = new BlocksColumn({
                dir: sDir,
                speedUpInterval: Service.GAME_CONFIG.colmuns[i].interval,
                name: "col_" + i,
                blockWeightNumber: Service.GAME_CONFIG.difficulty[this._difficulty]
            });
            blockColumn.x = i * nColWidth;
            blockColumn.width = nColWidth;
            this.addChildAt(blockColumn, 1);
            this._blockColumns.push(blockColumn);
        }
    }
    private _calculateColsRows() {
        Utils.columns = 4;
        Utils.rows = 5;
    }

    private _onMovedOut(evt: GameEvents.BlockEvent) {
        let tarBlock = evt.target;
        let missed: boolean = evt.missed;
        if(missed){
            this._gameOver();
        }
    }

    private _onHitRush(evt: GameEvents.BlockEvent) {
        
        if (this._rushWatch == null) {
            this._rushWatch = new Time.StopWatch({ times: this._rushTime, finish:this._stopRush }, this);
            if(Utils.blockStyle.indexOf("freeze") == -1){
                this._columnSpeeds = [];
            }
            
            for (let i = 0; i < this._blockColumns.length; i++) {
                if(Utils.blockStyle.indexOf("freeze") == -1){
                    let speed: number = this._blockColumns[i].speed;
                    this._columnSpeeds.push(speed);
                    this._blockColumns[i].speed = speed * this._rushFactor;
                    // this._blockColumns[i].stopSpeedUpTimer();
                    this._blockColumns[i].updateSpeed();
                }
            }
            
        }
        const rushTimer = this._rushWatch.run();
    
            //All blocks are in rush style
        Utils.blockStyle = Utils.blockStyle + "rush";
        
        // this._bg.texture = RES.getRes("rush_bg_png");
    }
    private _stopRush(){
        if(Utils.blockStyle.indexOf("freeze") == -1){
            for (let i = 0; i < this._blockColumns.length; i++) {
                let speed: number = this._columnSpeeds[i];
                this._blockColumns[i].speed = speed;
                this._blockColumns[i].updateSpeed();
                // this._blockColumns[i].startSpeedUpTimer();
            }
        }
        this._rushWatch = null;
        //All blocks are in non rush style
        Utils.blockStyle = Utils.blockStyle.replace(/rush/g,"");
        // this._bg.texture = RES.getRes("normal_bg_png");
    }
    private _onHitUnclickable(){
        this._gameOver();
    }
    private _onHitShrink() {
        if (this._shrinkWatch == null) {
            this._shrinkWatch = new Time.StopWatch({ times: this._shrinkTime, finish:this._stopShrink }, this);
            for (let i = 0; i < this._blockColumns.length; i++) {
                this._blockColumns[i].shrink();
            }
        }
        const rushTimer = this._shrinkWatch.run();

    }
    private _stopShrink(){
        for (let i = 0; i < this._blockColumns.length; i++) {
            this._blockColumns[i].shrinkReset();
        }
        this._shrinkWatch = null;
    }
    public gameStart() {
        for (let i = 0; i < this._blockColumns.length; i++) {
            this._blockColumns[i].move(true);
        }
        this._startLevelUp();
        this._playbgm();
        this.started = true;
        //Send start request
        Service.gameStart();
    }
    private _gameOver(){
        for (let i = 0; i < this._blockColumns.length; i++) {
            this._blockColumns[i].stop(true);
        }

        let gameoverEvent:GameEvents.PlayEvent = new GameEvents.PlayEvent(GameEvents.PlayEvent.GAME_OVER);
        // gameoverEvent.score = this._score.score;
        this.dispatchEvent(gameoverEvent);
        this._stopbgm();
        this._stopeffect();
        this.started = false;
        Utils.blockStyle = "";
    }
    private _startLevelUp(){
        if (this._levelUpWatch == null) {
            this._levelUpWatch = new Time.StopWatch({
                times: Service.GAME_CONFIG.difficulty.length,
                finish:this._stopLevelUp,
                interval: this._levelUpTime,
                tick: this.levelUp
            }, this);
        }
        const rushTimer = this._levelUpWatch.run();
    }
    private _stopLevelUp() {
        this._levelUpWatch = null;
    }
    public levelUp(second:number){
        if (this._difficulty < Service.GAME_CONFIG.difficulty.length - 1) {
            this._difficulty++;
        }
        console.log(this._difficulty);

        for (let i = 0; i < this._blockColumns.length; i++) {
            this._blockColumns[i].blockWeightNumber = Service.GAME_CONFIG.difficulty[this._difficulty];
        }
    }
    public getLevel(){
        return this._difficulty;
    }
    private _playbgm(){
        this._bgmChanel = this._bgm.play(0,0);
    }
    private _stopbgm(){
        this._bgmChanel.stop();
    }
    private _stopeffect(){
        if(this._effectChanel){
            this._effectChanel.stop();
        }
    }
    /**
     * @param {boolean} bMagic reset triggered by magic
     */
    public reset(bMagic=false){
        this._difficulty = 0;
        Utils.rowsState = {};
        for (let i = 0; i < this._blockColumns.length; i++) {
            this._blockColumns[i].blockWeightNumber = Service.GAME_CONFIG.difficulty[this._difficulty];
            this._blockColumns[i].reset();
        }
        if(!bMagic){
            if(this._rushWatch != null){
                this._rushWatch.destroy();
                this._rushWatch = null;
            }
            if(this._freezeWatch != null){
                this._freezeWatch.destroy();
                this._freezeWatch = null;
            }
            if(this._quellWatch != null){
                this._quellWatch.destroy();
                this._quellWatch = null;
            }
            if(this._purifyWatch != null){
                this._purifyWatch.destroy();
                this._purifyWatch = null;
            }
            if(this._destroyWatch != null){
                this._destroyWatch.destroy();
                this._destroyWatch = null;
            }
            if(this._shrinkWatch != null){
                this._shrinkWatch.destroy();
                this._shrinkWatch = null;
            }
            if(this._levelUpWatch != null){
                this._levelUpWatch.destroy();
                this._levelUpWatch = null;
            }
            Utils.blockStyle = "";
        }
        
    }
    private _resetSpeed(){
        // this.reset(true);
        for (let i = 0; i < this._blockColumns.length; i++) {
            this._blockColumns[i].reset();
            this._blockColumns[i].updateSpeed();
            this._blockColumns[i].move(true);
        }
    }

    private _pauseMove(miliseconds:number, pauseCallBack){
        for (let i = 0; i < this._blockColumns.length; i++) {
            this._blockColumns[i].stop(true);
        }
        const pauseTimer = new Time.Timer(miliseconds, function(){
            for (let i = 0; i < this._blockColumns.length; i++) {
                this._blockColumns[i].move(true);
            }
            pauseCallBack.call(this);
        }, this);
        pauseTimer.run();
    }
    private _unFreeze(){
        this._effectChanel.stop();
        for (let i = 0; i < this._blockColumns.length; i++) {
            let speed: number = this._columnSpeeds[i];
            this._blockColumns[i].speed = speed;
            this._blockColumns[i].updateSpeed();
            this._blockColumns[i].unFreezeBlocks();
            // this._blockColumns[i].startSpeedUpTimer();
        }
        Utils.blockStyle = Utils.blockStyle.replace(/freeze/g,"");
        this._freezeWatch = null;
        const unfreezeEvent: GameEvents.MagicEvent = new GameEvents.MagicEvent(
            GameEvents.MagicEvent.UNFREEZE
        );
        this.dispatchEvent(unfreezeEvent);
    }
    public freeze(){
        this._effectChanel = this._windSound.play(0,1);

        this._pauseMove(4000,function(){
            this._effectChanel = this._freezeSound.play(0,0);
            if (this._freezeWatch == null) {
                this._freezeWatch = new Time.StopWatch({ times: this._rushTime, finish:this._unFreeze }, this);
                this._columnSpeeds = [];
                for (let i = 0; i < this._blockColumns.length; i++) {
                    let speed: number = this._blockColumns[i].speed;
                    this._columnSpeeds.push(speed);
                    this._blockColumns[i].speed = 1;
                    // this._blockColumns[i].stopSpeedUpTimer();
                    this._blockColumns[i].updateSpeed();
                    this._blockColumns[i].freezeBlocks();
                }
            }
            const freezeTimer = this._freezeWatch.run();
        });
        
    }
     private _unQuell(){
         this._effectChanel.stop();
        for (let i = 0; i < this._blockColumns.length; i++) {
            this._blockColumns[i].unQuell();
        }
        Utils.blockStyle = Utils.blockStyle.replace(/quell/g,"");
        this._quellWatch = null;
         const unQuellEvent: GameEvents.MagicEvent = new GameEvents.MagicEvent(
            GameEvents.MagicEvent.UNQUELL
        );
        this.dispatchEvent(unQuellEvent);
    }
    public quell(){
        this._effectChanel = this._quellSound.play(0,0);

        this._pauseMove(5100,function(){
            // this._effectChanel = this._quellSound.play(0,0);
            if (this._quellWatch == null) {
                this._quellWatch = new Time.StopWatch({ times: this._rushTime, finish:this._unQuell }, this);
                for (let i = 0; i < this._blockColumns.length; i++) {
                    this._blockColumns[i].quell();
                }
            }
            const quellTimer = this._quellWatch.run();
        });
        
    }
    public purify(oScore:Score){
        this._effectChanel = this._purifySound.play(0,1);
        
        this._pauseMove(5000,function(){
            this._effectChanel = this._purifyingSound.play(0,0);
            if (this._purifyWatch == null) {
                this._purifyWatch = new Time.StopWatch({ times: this._rushTime, finish:this._unPurify }, this);
                var purified:number = 0;
                for (let i = 0; i < this._blockColumns.length; i++) {
                    purified = purified + this._blockColumns[i].purify();
                }
                oScore.score = oScore.score + purified;
            }
            const purifyTimer = this._purifyWatch.run();
        });
    
    }
    private _unPurify(){
        this._effectChanel.stop();
        Utils.blockStyle = Utils.blockStyle.replace(/purify/g,"");
        this._purifyWatch = null;
        const unPurifyEvent: GameEvents.MagicEvent = new GameEvents.MagicEvent(
            GameEvents.MagicEvent.UNPURIFY
        );
        this.dispatchEvent(unPurifyEvent);
    }

    public destroy(){
        this._effectChanel = this._destroySound.play(0,1);
  
        this._pauseMove(5000,function(){
            // this._effectChanel = this._quellSound.play(0,0);
           if (this._destroyWatch == null) {
                this._destroyWatch = new Time.StopWatch({ times: 3, finish:this._unDestroy }, this);
                for (let i = 0; i < this._blockColumns.length; i++) {
                    this._blockColumns[i].destroy();
                }
                this._resetSpeed();
            }
            const destroyTimer = this._destroyWatch.run();
        });
         
    }

    private _unDestroy(){
        this._effectChanel.stop();
        Utils.blockStyle = Utils.blockStyle.replace(/destroy/g,"");
        this._destroyWatch = null;
        const unDestroyEvent: GameEvents.MagicEvent = new GameEvents.MagicEvent(
            GameEvents.MagicEvent.DESTROY
        );
        this.dispatchEvent(unDestroyEvent);
    }
}

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
    private _shrinkTime:number;
    private _shrinkWatch:Time.StopWatch;
    private _levelUpTime:number;
    private _levelUpWatch:Time.StopWatch;
    private _difficulty:number = 0;
    private _bgm:egret.Sound = RES.getRes("lone-wolf-short");
    private _bgmChanel:egret.SoundChannel;
    private _stated:boolean = false;

    // private _drawBg(){
    //     this._bg = Utils.createBitmapByName("bg_png");
    //     const stageW = Utils.getStageWidth();
    //     const stageH = Utils.getStageHeight();
    //     this._bg.width = stageW;
    //     this._bg.height = stageH;
    //     this.addChildAt(this._bg, 0);
    // }
    private _onPause(){
        this._stopbgm();
    }
    private _onResume(){
        if(this._stated){
            this._playbgm();
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
        // let tarBlock: Block = evt.target;
        // let missed: boolean = evt.missed;
    }


    private _onHitRush(evt: GameEvents.BlockEvent) {
        if (this._rushWatch == null) {
            this._rushWatch = new Time.StopWatch({ times: this._rushTime, finish:this._stopRush }, this);
            this._columnSpeeds = [];
            for (let i = 0; i < this._blockColumns.length; i++) {
                let speed: number = this._blockColumns[i].speed;
                this._columnSpeeds.push(speed);
                this._blockColumns[i].speed = speed * this._rushFactor;
                this._blockColumns[i].stopSpeedUpTimer();
                this._blockColumns[i].updateSpeed();
            }
        }
        const rushTimer = this._rushWatch.run();
        //All blocks are in rush style
        Utils.blockStyle = 1;
        // this._bg.texture = RES.getRes("rush_bg_png");
    }
    private _stopRush(){
        for (let i = 0; i < this._blockColumns.length; i++) {
            let speed: number = this._columnSpeeds[i];
            this._blockColumns[i].speed = speed;
            this._blockColumns[i].updateSpeed();
            this._blockColumns[i].startSpeedUpTimer();
        }
        this._rushWatch = null;
        //All blocks are in non rush style
        Utils.blockStyle = 0;
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
        this._stated = true;
    }
    private _gameOver(){
        for (let i = 0; i < this._blockColumns.length; i++) {
            this._blockColumns[i].stop(true);
        }

        let gameoverEvent:GameEvents.PlayEvent = new GameEvents.PlayEvent(GameEvents.PlayEvent.GAME_OVER);
        // gameoverEvent.score = this._score.score;
        this.dispatchEvent(gameoverEvent);
        this._stopbgm();
        this._stated = false;
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
    private _playbgm(){
        this._bgmChanel = this._bgm.play(0,0);
    }
    private _stopbgm(){
        this._bgmChanel.stop();
    }
    public reset(){
        this._difficulty = 0;
        for (let i = 0; i < this._blockColumns.length; i++) {
            this._blockColumns[i].blockWeightNumber = Service.GAME_CONFIG.difficulty[this._difficulty];
            this._blockColumns[i].reset();
        }
        if(this._rushWatch != null){
            this._rushWatch.destroy();
            this._rushWatch = null;
            // this._bg.texture = RES.getRes("normal_bg_png");
        }
        if(this._shrinkWatch != null){
            this._shrinkWatch.destroy();
            this._shrinkWatch = null;
        }
        if(this._levelUpWatch != null){
            this._levelUpWatch.destroy();
            this._levelUpWatch = null;
        }
    }
}

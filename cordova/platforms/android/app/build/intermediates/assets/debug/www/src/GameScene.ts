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
        this._score = 0;
        this._calculateColsRows();
        this._drawBg();
        this._drawColumns();
        this._drawScore();
        this.addEventListener(
            GameEvents.BlockEvent.MOVED_OUT,
            this._onMovedOut,
            this,
            true
        );
        this.addEventListener(
            GameEvents.BlockEvent.HIT,
            this._onHit,
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
    private _score: number;
    private _scoreText: egret.TextField;
    private _blockColumns: Array<BlocksColumn> = [];
    private _columnSpeeds: Array<number> = [];
    private _rushFactor:number;
    private _rushTime:number;
    private _rushWatch:Time.StopWatch;
    private _shrinkTime:number;
    private _shrinkWatch:Time.StopWatch;
    private _levelUpTime:number;
    private _levelUpWatch:Time.StopWatch;
    private _bg:egret.Bitmap;
    private _difficulty:number = 0;

    private _drawBg(){
        this._bg = Utils.createBitmapByName("normal_bg_png");
        this._bg.fillMode = egret.BitmapFillMode.REPEAT;
        this.addChild(this._bg);
        const stageW = Utils.getStageWidth();
        const stageH = Utils.getStageHeight();
        this._bg.width = stageW;
        this._bg.height = stageH;
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
            this.addChild(blockColumn);
            this._blockColumns.push(blockColumn);
        }
    }
    private _calculateColsRows() {
        let nThumbWidth: number = 48;
        let nThumbHeight: number = 48;
        let nStageWidth: number = Utils.getStageWidth();
        let nStageHeight: number = Utils.getStageHeight();
        let nColsMax: number = Math.floor(nStageWidth / nThumbWidth);
        let nRowsMax: number = Math.floor(nStageWidth / nThumbHeight);
        if (this._level === GameLevel.EASY) {
            Utils.columns = 4;
            Utils.rows = 6;
        } else if (this._level === GameLevel.NORMAL) {
            Utils.columns = 5;
            Utils.rows = 7;
        } else if (this._level === GameLevel.HARD) {
            Utils.columns = 6;
            Utils.rows = 8;
        }
        if (Utils.columns > nColsMax) {
            Utils.columns = nColsMax;
        }
        if (Utils.rows > nRowsMax) {
            Utils.rows = nRowsMax;
        }
    }
    private _drawScore() {
        let label: egret.TextField = new egret.TextField();
        label.width = Utils.getStageWidth();
        label.y = Utils.getStageHeight() * 0.2;
        label.height = 30;
        label.textAlign = egret.HorizontalAlign.CENTER;
        label.verticalAlign = egret.VerticalAlign.MIDDLE;
        label.textColor = 0xffffff;
        label.bold = true;
        label.strokeColor = 0x0000ff;
        label.stroke = 2;
        label.text = this._score.toString();
        this._scoreText = label;
        this.addChild(this._scoreText);
    }
    private _onMovedOut(evt: GameEvents.BlockEvent) {
        // let tarBlock: Block = evt.target;
        // let missed: boolean = evt.missed;
    }

    private _onHit(evt: GameEvents.BlockEvent) {
        this._score++;
        this._scoreText.text = this._score.toString();
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
        this._bg.texture = RES.getRes("rush_bg_png");
    }
    private _stopRush(){
        for (let i = 0; i < this._blockColumns.length; i++) {
            let speed: number = this._columnSpeeds[i];
            this._blockColumns[i].speed = speed;
            this._blockColumns[i].updateSpeed();
            this._blockColumns[i].startSpeedUpTimer();
        }
        this._rushWatch = null;
        this._bg.texture = RES.getRes("normal_bg_png");
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
            this._blockColumns[i].move();
        }
        this._startLevelUp();
    }
    private _gameOver(){
        for (let i = 0; i < this._blockColumns.length; i++) {
            this._blockColumns[i].stop();
        }

        let gameoverEvent:GameEvents.PlayEvent = new GameEvents.PlayEvent(GameEvents.PlayEvent.GAME_OVER);
        gameoverEvent.score = this._score;
        this.dispatchEvent(gameoverEvent);
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
    public reset(){
        this.score = 0;
        this._difficulty = 0;
        for (let i = 0; i < this._blockColumns.length; i++) {
            this._blockColumns[i].reset();
        }
        if(this._rushWatch != null){
            this._rushWatch.destroy();
            this._rushWatch = null;
            this._bg.texture = RES.getRes("normal_bg_png");
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
    public set score(val:number){
        this._score = val;
        this._scoreText.text = val.toString();
    }
    public get score():number{
       return this._score;
    }
}

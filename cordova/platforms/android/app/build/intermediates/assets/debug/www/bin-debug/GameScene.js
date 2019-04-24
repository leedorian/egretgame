///<reference path="cordova.d.ts"/>
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene(param) {
        var _this = _super.call(this) || this;
        _this._blockColumns = [];
        _this._columnSpeeds = [];
        _this._difficulty = 0;
        _this._bgm = RES.getRes("lone-wolf-short");
        _this._stated = false;
        _this._mode = param.mode;
        _this._level = param.level;
        _this._rushFactor = Service.GAME_CONFIG.rushFactor;
        _this._rushTime = Service.GAME_CONFIG.rushTime;
        _this._shrinkTime = Service.GAME_CONFIG.shrinkTime;
        _this._levelUpTime = Service.GAME_CONFIG.levelUpInterval;
        _this._calculateColsRows();
        // this._drawBg();
        _this._drawColumns();
        _this.width = Utils.getArenaWidth();
        _this.height = Utils.getArenaHeight();
        _this.scrollRect = new egret.Rectangle(0, 0, _this.width, _this.height);
        _this.addEventListener(GameEvents.BlockEvent.MOVED_OUT, _this._onMovedOut, _this, true);
        _this.addEventListener(GameEvents.BlockEvent.HIT_RUSH, _this._onHitRush, _this, true);
        _this.addEventListener(GameEvents.BlockEvent.HIT_UNCLICKABLE, _this._onHitUnclickable, _this, true);
        _this.addEventListener(GameEvents.BlockEvent.HIT_SHRINK, _this._onHitShrink, _this, true);
        document.addEventListener("pause", _this._onPause.bind(_this), false);
        document.addEventListener("resume", _this._onResume.bind(_this), false);
        return _this;
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
    // private _drawBg(){
    //     this._bg = Utils.createBitmapByName("bg_png");
    //     const stageW = Utils.getStageWidth();
    //     const stageH = Utils.getStageHeight();
    //     this._bg.width = stageW;
    //     this._bg.height = stageH;
    //     this.addChildAt(this._bg, 0);
    // }
    GameScene.prototype._onPause = function () {
        this._stopbgm();
    };
    GameScene.prototype._onResume = function () {
        this._playbgm();
    };
    GameScene.prototype._drawColumns = function () {
        var blockColumn;
        var aDir = ["up", "down"];
        var nColWidth = Utils.getBlockWidth();
        for (var i = 0; i < Utils.columns; i++) {
            var sDir = "up";
            if (this._mode === GameMode.BI_DIR) {
                sDir = aDir[Math.floor(Math.random() * 2)];
            }
            else if (this._mode === GameMode.DOWN) {
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
    };
    GameScene.prototype._calculateColsRows = function () {
        var nThumbWidth = 48;
        var nThumbHeight = 48;
        var nArenaWidth = Utils.getStageWidth();
        var nArenaHeight = Utils.getStageHeight();
        var nColsMax = Math.floor(nArenaWidth / nThumbWidth);
        var nRowsMax = Math.floor(nArenaHeight / nThumbHeight);
        if (this._level === GameLevel.EASY) {
            Utils.columns = 4;
            Utils.rows = 5;
        }
        else if (this._level === GameLevel.NORMAL) {
            Utils.columns = 5;
            Utils.rows = 7;
        }
        else if (this._level === GameLevel.HARD) {
            Utils.columns = 6;
            Utils.rows = 8;
        }
        if (Utils.columns > nColsMax) {
            Utils.columns = nColsMax;
        }
        if (Utils.rows > nRowsMax) {
            Utils.rows = nRowsMax;
        }
    };
    GameScene.prototype._onMovedOut = function (evt) {
        // let tarBlock: Block = evt.target;
        // let missed: boolean = evt.missed;
    };
    GameScene.prototype._onHitRush = function (evt) {
        if (this._rushWatch == null) {
            this._rushWatch = new Time.StopWatch({ times: this._rushTime, finish: this._stopRush }, this);
            this._columnSpeeds = [];
            for (var i = 0; i < this._blockColumns.length; i++) {
                var speed = this._blockColumns[i].speed;
                this._columnSpeeds.push(speed);
                this._blockColumns[i].speed = speed * this._rushFactor;
                this._blockColumns[i].stopSpeedUpTimer();
                this._blockColumns[i].updateSpeed();
            }
        }
        var rushTimer = this._rushWatch.run();
        this._bg.texture = RES.getRes("rush_bg_png");
    };
    GameScene.prototype._stopRush = function () {
        for (var i = 0; i < this._blockColumns.length; i++) {
            var speed = this._columnSpeeds[i];
            this._blockColumns[i].speed = speed;
            this._blockColumns[i].updateSpeed();
            this._blockColumns[i].startSpeedUpTimer();
        }
        this._rushWatch = null;
        this._bg.texture = RES.getRes("normal_bg_png");
    };
    GameScene.prototype._onHitUnclickable = function () {
        this._gameOver();
    };
    GameScene.prototype._onHitShrink = function () {
        if (this._shrinkWatch == null) {
            this._shrinkWatch = new Time.StopWatch({ times: this._shrinkTime, finish: this._stopShrink }, this);
            for (var i = 0; i < this._blockColumns.length; i++) {
                this._blockColumns[i].shrink();
            }
        }
        var rushTimer = this._shrinkWatch.run();
    };
    GameScene.prototype._stopShrink = function () {
        for (var i = 0; i < this._blockColumns.length; i++) {
            this._blockColumns[i].shrinkReset();
        }
        this._shrinkWatch = null;
    };
    GameScene.prototype.gameStart = function () {
        for (var i = 0; i < this._blockColumns.length; i++) {
            this._blockColumns[i].move(true);
        }
        this._startLevelUp();
        this._playbgm();
        this._stated = true;
    };
    GameScene.prototype._gameOver = function () {
        for (var i = 0; i < this._blockColumns.length; i++) {
            this._blockColumns[i].stop(true);
        }
        var gameoverEvent = new GameEvents.PlayEvent(GameEvents.PlayEvent.GAME_OVER);
        // gameoverEvent.score = this._score.score;
        this.dispatchEvent(gameoverEvent);
        this._stopbgm();
        this._stated = false;
    };
    GameScene.prototype._startLevelUp = function () {
        if (this._levelUpWatch == null) {
            this._levelUpWatch = new Time.StopWatch({
                times: Service.GAME_CONFIG.difficulty.length,
                finish: this._stopLevelUp,
                interval: this._levelUpTime,
                tick: this.levelUp
            }, this);
        }
        var rushTimer = this._levelUpWatch.run();
    };
    GameScene.prototype._stopLevelUp = function () {
        this._levelUpWatch = null;
    };
    GameScene.prototype.levelUp = function (second) {
        if (this._difficulty < Service.GAME_CONFIG.difficulty.length - 1) {
            this._difficulty++;
        }
        console.log(this._difficulty);
        for (var i = 0; i < this._blockColumns.length; i++) {
            this._blockColumns[i].blockWeightNumber = Service.GAME_CONFIG.difficulty[this._difficulty];
        }
    };
    GameScene.prototype._playbgm = function () {
        this._bgmChanel = this._bgm.play(0, 0);
    };
    GameScene.prototype._stopbgm = function () {
        this._bgmChanel.stop();
    };
    GameScene.prototype.reset = function () {
        this._difficulty = 0;
        for (var i = 0; i < this._blockColumns.length; i++) {
            this._blockColumns[i].blockWeightNumber = Service.GAME_CONFIG.difficulty[this._difficulty];
            this._blockColumns[i].reset();
        }
        if (this._rushWatch != null) {
            this._rushWatch.destroy();
            this._rushWatch = null;
            this._bg.texture = RES.getRes("normal_bg_png");
        }
        if (this._shrinkWatch != null) {
            this._shrinkWatch.destroy();
            this._shrinkWatch = null;
        }
        if (this._levelUpWatch != null) {
            this._levelUpWatch.destroy();
            this._levelUpWatch = null;
        }
    };
    return GameScene;
}(egret.Sprite));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map
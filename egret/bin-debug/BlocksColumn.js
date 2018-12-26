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
var BlocksColumn = (function (_super) {
    __extends(BlocksColumn, _super);
    function BlocksColumn(param) {
        var _this = _super.call(this) || this;
        _this._blocks = [];
        _this._creatingRowIndex = 0;
        _this._speedLevel = 0;
        _this._speed = Service.GAME_CONFIG.speedLevels[_this._speedLevel];
        _this._speedTick = false;
        _this._dir = param.dir;
        _this.name = param.name;
        _this._speedUpInterval = param.speedUpInterval * 1000;
        _this._index = parseInt(_this.name.split("_")[1], 10);
        _this._draw();
        return _this;
    }
    BlocksColumn.prototype._draw = function () {
        var n = this._dir === "down" ? -1 : 0;
        var blockCount = this._dir === "down" ? Utils.rows : Utils.rows + 1;
        for (var i = n; i < blockCount; i++) {
            this._creatingRowIndex = this._dir === "down" ? i + 1 : i;
            // let block = this._createBlock({
            //     state: Utils.getRowBlockState(this._creatingRowIndex)[
            //         this._index
            //     ]
            // });
            var block = this._createBlock({
                state: BlockState.unclickable
            });
            this.addChild(block);
            block.x = 0;
            block.y = i * block.height;
            this._blocks.push(block);
        }
    };
    BlocksColumn.prototype._createBlock = function (settings) {
        var blockWidth = Utils.getBlockWidth();
        var blockHeight = Utils.getBlockHeight();
        var param = {
            width: blockWidth,
            height: blockHeight,
            state: settings.state
        };
        // let block = new BlockNormal(param);
        var block = new BlockDouble(param);
        block.addEventListener(GameEvents.BlockEvent.MOVED_OUT, this._onMovedOut, this);
        return block;
    };
    BlocksColumn.prototype._onMovedOut = function (evt) {
        var tarBlock = evt.target;
        // let missed: boolean = evt.missed;
        var missed = false;
        tarBlock.removeEventListener(GameEvents.BlockEvent.MOVED_OUT, this._onMovedOut, this);
        if (this._dir === "down") {
            this._blocks.pop();
        }
        else {
            this._blocks.shift();
        }
        tarBlock.stop();
        this.removeChild(tarBlock);
        tarBlock = null;
        if (missed) {
            this.stop();
        }
        else {
            var newBlock = this._createBlock({
                state: Utils.getRowBlockState(this._creatingRowIndex)[this._index]
            });
            this._creatingRowIndex++;
            this.addChild(newBlock);
            if (this._dir === "down") {
                newBlock.y = this._blocks[0].y - newBlock.height + this._speed;
            }
            else {
                newBlock.y =
                    this._blocks[this._blocks.length - 1].y +
                        newBlock.height -
                        this._speed;
            }
            newBlock.move(this._speed, this._dir);
            if (this._dir === "down") {
                this._blocks.unshift(newBlock);
            }
            else {
                this._blocks.push(newBlock);
            }
        }
    };
    BlocksColumn.prototype._speedLooper = function () {
        if (this._speedTick) {
            this._slowDown();
        }
        else {
            this._speedUp();
        }
    };
    BlocksColumn.prototype._speedUp = function () {
        if (this._speedLevel < Service.GAME_CONFIG.speedLevels.length) {
            this._speed = Service.GAME_CONFIG.speedLevels[this._speedLevel];
            this._updateSpeed();
            this._speedLevel++;
        }
        if (this._speedLevel === Service.GAME_CONFIG.speedLevels.length) {
            this._speedTick = true;
        }
    };
    BlocksColumn.prototype._slowDown = function () {
        if (this._speedLevel > 0) {
            this._speedLevel--;
            this._speed = Service.GAME_CONFIG.speedLevels[this._speedLevel];
            this._updateSpeed();
        }
        if (this._speedLevel === 0) {
            this._speedTick = false;
            this._reversePause();
        }
    };
    BlocksColumn.prototype._revertDir = function () {
        if (this._dir === "up") {
            this._dir = "down";
        }
        else {
            this._dir = "up";
        }
    };
    BlocksColumn.prototype._reversePause = function () {
        this.stop();
        if (this._reverseTimer === undefined) {
            this._reverseTimer = new egret.Timer(2000, 1);
            this._reverseTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function () {
                this._revertDir();
                this.move();
            }, this);
        }
        this._reverseTimer.reset();
        this._reverseTimer.start();
    };
    BlocksColumn.prototype._updateSpeed = function () {
        var blocks = this._blocks;
        for (var i = 0; i < blocks.length; i++) {
            blocks[i].speed = this._speed;
        }
    };
    BlocksColumn.prototype._startSpeedUpTimer = function () {
        this._speedUpTimer = new egret.Timer(this._speedUpInterval, 0);
        //注册事件侦听器
        this._speedUpTimer.addEventListener(egret.TimerEvent.TIMER, this._speedLooper, this);
        this._speedUpTimer.start();
    };
    BlocksColumn.prototype._stopSpeedUpTimer = function () {
        this._speedUpTimer.stop();
        this._speedUpTimer.removeEventListener(egret.TimerEvent.TIMER, this._speedLooper, this);
        this._speedUpTimer = null;
    };
    BlocksColumn.prototype.move = function () {
        var blocks = this._blocks;
        for (var i = 0; i < blocks.length; i++) {
            blocks[i].move(this._speed, this._dir);
        }
        this._startSpeedUpTimer();
    };
    BlocksColumn.prototype.stop = function () {
        for (var i = 0; i < this._blocks.length; i++) {
            this._blocks[i].stop();
        }
        this._stopSpeedUpTimer();
    };
    return BlocksColumn;
}(egret.Sprite));
__reflect(BlocksColumn.prototype, "BlocksColumn");
//# sourceMappingURL=BlocksColumn.js.map
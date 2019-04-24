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
        //blocks array
        _this._blocks = [];
        //blocks in initial screen
        _this._initialBlocks = [];
        _this._creatingRowIndex = 0;
        _this._speedLevel = 0;
        _this._speedTick = false;
        _this._shrinkRate = 1;
        _this.speed = Service.GAME_CONFIG.speedLevels[_this._speedLevel];
        _this.dir = param.dir;
        _this._dir = _this.dir;
        _this.name = param.name;
        _this.blockWeightNumber = param.blockWeightNumber;
        _this._speedUpInterval = param.speedUpInterval * 1000;
        _this._index = parseInt(_this.name.split("_")[1], 10);
        _this._draw();
        return _this;
    }
    BlocksColumn.prototype._draw = function () {
        this._blocks = [];
        this._initialBlocks = [];
        var n = this._dir === "down" ? -1 : 0;
        var blockCount = this._dir === "down" ? Utils.rows : Utils.rows + 1;
        for (var i = n; i < blockCount; i++) {
            var state = BlockState.unclickable;
            this._creatingRowIndex = this._dir === "down" ? i + 1 : i;
            if ((this._dir === "down" && i === -1) || (this._dir === "up" && i === blockCount - 1)) {
                state = Utils.getRowBlockState(this._creatingRowIndex)[this._index];
            }
            var block = this._createBlock({
                state: state,
                startBlock: true
            });
            this.addChild(block);
            block.x = 0;
            block.y = i * block.height;
            this._blocks.push(block);
            this._initialBlocks.push(block);
        }
    };
    BlocksColumn.prototype.reset = function () {
        this.stop();
        this.speedLevel = 0;
        this._dir = this.dir;
        this.shrinkReset();
        var blockLength = this._blocks.length;
        for (var i = 0; i < blockLength; i++) {
            this.removeChild(this._blocks[i]);
            this._blocks[i] = null;
        }
        this._draw();
    };
    BlocksColumn.prototype._createBlock = function (settings) {
        var blockWidth = Utils.getBlockWidth();
        var blockHeight = Utils.getBlockHeight();
        var param = {
            width: blockWidth,
            height: blockHeight,
            shrinkRate: this._shrinkRate,
            state: settings.state
        };
        // let block = new BlockNormal(param);
        // let block = new BlockDouble(param);
        // let block = new BlockRush(param);
        // let block = new BlockBlink(param);
        var block;
        if (settings.startBlock == null && settings.state === BlockState.clickable) {
            var weightArray = [];
            for (var key in this._blockWeightNumber) {
                if (this._blockWeightNumber.hasOwnProperty(key)) {
                    var weight = this._blockWeightNumber[key];
                    for (var index = 0; index < weight; index++) {
                        weightArray.push(BlockType[key]);
                    }
                }
            }
            if (weightArray.length !== 10) {
                weightArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            }
            var weightNumbers = weightArray; //[0, 0, 0, 0, 0, 1, 1, 2, 3, 4]
            var idx = Math.floor(Math.random() * weightNumbers.length);
            var blockType = weightNumbers[idx];
            block = new window[BlockType[blockType]](param);
        }
        else {
            block = new BlockNormal(param);
        }
        if (!settings.startBlock) {
            block.active = true;
        }
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
            this.addChildAt(newBlock, 0);
            if (this._dir === "down") {
                newBlock.y = this._blocks[0].y - newBlock.height + this.speed;
            }
            else {
                newBlock.y =
                    this._blocks[this._blocks.length - 1].y +
                        newBlock.height -
                        this.speed;
            }
            newBlock.move(this.speed, this._dir);
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
            this.speed = Service.GAME_CONFIG.speedLevels[this._speedLevel];
            this.updateSpeed();
            this._speedLevel++;
        }
        if (this._speedLevel === Service.GAME_CONFIG.speedLevels.length) {
            this._speedTick = true;
        }
    };
    BlocksColumn.prototype._slowDown = function () {
        if (this._speedLevel > 0) {
            this._speedLevel--;
            this.speed = Service.GAME_CONFIG.speedLevels[this._speedLevel];
            this.updateSpeed();
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
        this.move();
    };
    BlocksColumn.prototype._reversePause = function () {
        egret.startTick(this._checkPauseToFit, this);
    };
    BlocksColumn.prototype._checkPauseToFit = function () {
        var nBlocks = this._blocks.length;
        var lastBlockIndex = 0;
        if (this._dir === "down") {
            lastBlockIndex = nBlocks - 1;
        }
        var bDowScrollOut = this._dir === "down" && this._blocks[lastBlockIndex].y >= Utils.getArenaHeight();
        var bUpScrollOut = this._dir === "up" && this._blocks[lastBlockIndex].y <= -this._blocks[lastBlockIndex].height;
        if (bDowScrollOut || bUpScrollOut) {
            egret.stopTick(this._checkPauseToFit, this);
            this._excuteReversePause();
        }
        return false;
    };
    BlocksColumn.prototype._excuteReversePause = function () {
        this.stop();
        console.log(this._blocks);
        if (this._reverseTimer == null) {
            this._reverseTimer = new egret.Timer(2000, 1);
            this._reverseTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this._revertDir, this);
        }
        this._reverseTimer.reset();
        this._reverseTimer.start();
    };
    BlocksColumn.prototype._blockSizeUpdate = function () {
        for (var i = 0; i < this._blocks.length; i++) {
            var blockInstance = this._blocks[i];
            blockInstance.shrinkRate = this._shrinkRate;
            blockInstance.sizeUpdate();
        }
    };
    BlocksColumn.prototype.updateSpeed = function () {
        var blocks = this._blocks;
        for (var i = 0; i < blocks.length; i++) {
            blocks[i].speed = this.speed;
        }
    };
    BlocksColumn.prototype.startSpeedUpTimer = function () {
        this._speedUpTimer = new egret.Timer(this._speedUpInterval, 0);
        //注册事件侦听器
        this._speedUpTimer.addEventListener(egret.TimerEvent.TIMER, this._speedLooper, this);
        this._speedUpTimer.start();
    };
    BlocksColumn.prototype.stopSpeedUpTimer = function () {
        if (this._speedUpTimer != null) {
            this._speedUpTimer.stop();
            this._speedUpTimer.removeEventListener(egret.TimerEvent.TIMER, this._speedLooper, this);
            this._speedUpTimer = null;
        }
        this._speedTick = false;
    };
    BlocksColumn.prototype._stopReverseTimer = function () {
        if (this._reverseTimer != null) {
            this._reverseTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this._revertDir, this);
            this._reverseTimer = null;
        }
    };
    //start moving blocks in this column
    BlocksColumn.prototype.move = function (isGameSceneTriggered) {
        if (isGameSceneTriggered === void 0) { isGameSceneTriggered = false; }
        var blocks = this._blocks;
        for (var i = 0; i < blocks.length; i++) {
            blocks[i].move(this.speed, this._dir);
        }
        if (isGameSceneTriggered) {
            var initialBlocks = this._initialBlocks;
            for (var i = 0; i < initialBlocks.length; i++) {
                initialBlocks[i].active = true;
            }
        }
        this.startSpeedUpTimer();
    };
    BlocksColumn.prototype.stop = function (isGameSceneTriggered) {
        if (isGameSceneTriggered === void 0) { isGameSceneTriggered = false; }
        for (var i = 0; i < this._blocks.length; i++) {
            this._blocks[i].stop();
            if (isGameSceneTriggered) {
                this._blocks[i].active = false;
            }
        }
        this.stopSpeedUpTimer();
        this._stopReverseTimer();
    };
    BlocksColumn.prototype.shrink = function () {
        this._shrinkRate = 0.5;
        this._blockSizeUpdate();
    };
    BlocksColumn.prototype.shrinkReset = function () {
        this._shrinkRate = 1;
        this._blockSizeUpdate();
    };
    Object.defineProperty(BlocksColumn.prototype, "speedLevel", {
        /**
         * get speedLevel
         */
        get: function () {
            return this._speedLevel;
        },
        /**
         * set speedLevel
         */
        set: function (val) {
            this._speedLevel = val;
            this.speed = Service.GAME_CONFIG.speedLevels[this._speedLevel];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlocksColumn.prototype, "blockWeightNumber", {
        /**
         * get blockWeightNumber
         * @param val weight array
         *
         */
        get: function () {
            return this._blockWeightNumber;
        },
        /**
         * set blockWeightNumber
         * @param val weight array
         *
         */
        set: function (val) {
            this._blockWeightNumber = val;
        },
        enumerable: true,
        configurable: true
    });
    return BlocksColumn;
}(egret.Sprite));
__reflect(BlocksColumn.prototype, "BlocksColumn");
//# sourceMappingURL=BlocksColumn.js.map
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var BlockBase = (function (_super) {
    __extends(BlockBase, _super);
    function BlockBase(param) {
        var _this = _super.call(this) || this;
        _this._unClickableColor = BlockColor.unClickable;
        _this._clickedColor = BlockColor.clicked;
        _this._currentState = param.state;
        _this.shrinkRate = param.shrinkRate;
        _this.width = param.width;
        _this.height = param.height;
        _this._colorRect = new egret.Shape();
        _this._colorRect.width = _this.width;
        _this._colorRect.height = _this.height;
        _this._colorRect.touchEnabled = true;
        _this._beforeDraw();
        _this._draw();
        _this._colorRect.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this._onTouch, _this);
        return _this;
    }
    BlockBase.prototype._draw = function () {
        // let fillColor: BlockColor;
        // let bgFillColor: BlockColor = this._unClickableColor;
        // let labelColor: BlockColor = BlockColor.unClickable;
        var lineColor = BlockColor.border;
        var rectWidth = this._colorRect.width * this.shrinkRate;
        var rectHeight = this._colorRect.height * this.shrinkRate;
        if (this._currentState === BlockState.unclickable) {
            rectWidth = this._colorRect.width;
            rectHeight = this._colorRect.height;
        }
        // const rectX = rectWidth / 2;
        // const rectY = rectHeight / 2;
        // this._colorRect.anchorOffsetX = rectX;
        // this._colorRect.anchorOffsetY = rectY;
        // this._colorRect.x = rectX;
        // this._colorRect.y = rectY;
        // if (this._currentState === BlockState.clickable || this._currentState === BlockState.clicked){
        //     fillColor = this._clickableColor;
        // }
        this._colorRect.graphics.clear();
        this.graphics.lineStyle(1, lineColor);
        if (this._currentState === BlockState.clicked) {
            this.graphics.beginFill(this._clickedColor, 1);
        }
        this.graphics.drawRect(0, 0, this.width, this.height);
        if (this._currentState > 0) {
            this._colorRect.graphics.beginFill(this._clickableColor, 1);
        }
        else {
            this._colorRect.graphics.beginFill(this._unClickableColor, 0);
        }
        this._colorRect.graphics.lineStyle(1, lineColor);
        this._colorRect.graphics.drawRect((this.width - rectWidth) / 2, (this.height - rectHeight) / 2, rectWidth, rectHeight);
        if (this._colorRect.parent === null) {
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
    };
    BlockBase.prototype._onTouch = function (oEvent) {
        if (this._currentState === BlockState.clickable) {
            this._hit();
        }
        else if (this._currentState === BlockState.unclickable) {
            this._hitUnclickable();
        }
    };
    BlockBase.prototype._hitAni = function () {
        var rectWidth = this._colorRect.width * this.shrinkRate;
        var rectHeight = this._colorRect.height * this.shrinkRate;
        if (this._currentState === BlockState.unclickable) {
            rectWidth = this._colorRect.width;
            rectHeight = this._colorRect.height;
        }
        if (rectWidth > 0) {
            this._colorRect.width = rectWidth - 6;
        }
        else {
            this._colorRect.width = 0;
        }
        if (rectHeight > 0) {
            this._colorRect.height = rectHeight - 8;
        }
        else {
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
        }
        else {
            this._draw();
        }
        return false;
    };
    BlockBase.prototype._hit = function () {
        // this.addEventListener(egret.Event.ENTER_FRAME, this._hitAni, this);
        egret.startTick(this._hitAni, this);
        this.state = "clicked";
        var hitEvent = new GameEvents.BlockEvent(GameEvents.BlockEvent.HIT);
        this.dispatchEvent(hitEvent);
    };
    BlockBase.prototype._hitUnclickable = function () {
        var hitEvent = new GameEvents.BlockEvent(GameEvents.BlockEvent.HIT_UNCLICKABLE);
        this.dispatchEvent(hitEvent);
    };
    BlockBase.prototype.move = function (speed, dir) {
        if (dir === void 0) { dir = "down"; }
        this.speed = speed;
        this._dir = dir;
        egret.startTick(this._moveBlock, this);
    };
    BlockBase.prototype.stop = function () {
        egret.stopTick(this._moveBlock, this);
    };
    BlockBase.prototype._moveBlock = function (timeStamp) {
        if (this._dir === "down") {
            if (this.y >= Utils.getStageHeight()) {
                this._triggerMovedOutEvent();
            }
            else {
                this._setY();
            }
        }
        else {
            if (this.y <= -this.height) {
                this._triggerMovedOutEvent();
            }
            else {
                this._setY();
            }
        }
        return false;
    };
    BlockBase.prototype._setY = function () {
        var tempY = this.y;
        if (this._dir === "up") {
            this.y = tempY - this.speed;
        }
        else {
            this.y = tempY + this.speed;
        }
    };
    BlockBase.prototype._triggerMovedOutEvent = function () {
        var missed = false;
        var movedOutEvent = new GameEvents.BlockEvent(GameEvents.BlockEvent.MOVED_OUT);
        if (this._currentState === BlockState.clickable) {
            missed = true;
        }
        movedOutEvent.missed = missed;
        this.dispatchEvent(movedOutEvent);
    };
    /**
     * sizeUpdate
     */
    BlockBase.prototype.sizeUpdate = function () {
        if (this._currentState !== BlockState.clicked) {
            this._draw();
        }
    };
    Object.defineProperty(BlockBase.prototype, "state", {
        get: function () {
            var state;
            state = BlockState[this._currentState];
            return state;
        },
        set: function (val) {
            this._currentState = BlockState[val];
            this.graphics.clear();
            this._draw();
        },
        enumerable: true,
        configurable: true
    });
    return BlockBase;
}(egret.Sprite));
__reflect(BlockBase.prototype, "BlockBase");
var BlockFlashBase = (function (_super) {
    __extends(BlockFlashBase, _super);
    function BlockFlashBase(param) {
        var _this = _super.call(this, param) || this;
        _this._activeState = false;
        return _this;
    }
    BlockFlashBase.prototype._beforeDraw = function () {
        this._clickableColor = BlockColor.clickable;
    };
    BlockFlashBase.prototype.move = function (speed, dir) {
        if (dir === void 0) { dir = "down"; }
        this._timeMark = egret.getTimer();
        _super.prototype.move.call(this, speed, dir);
    };
    BlockFlashBase.prototype._moveBlock = function (timeStamp) {
        var redrawScreen = _super.prototype._moveBlock.call(this, timeStamp);
        if (this.state === "clickable") {
            var pass = Math.floor((timeStamp - this._timeMark) / 1000);
            if (pass === 1) {
                this._activeState = !this._activeState;
                if (this._activeState) {
                    this._clickableColor = this._activeColor;
                }
                else {
                    this._clickableColor = BlockColor.clickable;
                }
                this._draw();
                this._timeMark = timeStamp;
            }
        }
        return redrawScreen;
    };
    return BlockFlashBase;
}(BlockBase));
__reflect(BlockFlashBase.prototype, "BlockFlashBase");
var BlockDouble = (function (_super) {
    __extends(BlockDouble, _super);
    function BlockDouble(param) {
        var _this = _super.call(this, param) || this;
        _this._clickCount = 0;
        return _this;
    }
    BlockDouble.prototype._beforeDraw = function () {
        this._clickableColor = BlockColor.clickableDouble;
    };
    BlockDouble.prototype._onTouch = function (oEvent) {
        if (this._currentState === BlockState.clickable) {
            this._clickCount++;
            if (this._clickCount === 1) {
                this._clickableColor = BlockColor.clickable;
                this._draw();
            }
            else if (this._clickCount === 2) {
                this._hit();
            }
        }
    };
    return BlockDouble;
}(BlockBase));
__reflect(BlockDouble.prototype, "BlockDouble");
var Utils = (function () {
    function Utils() {
    }
    Utils.getBlockWidth = function () {
        if (Utils._blockWidth === 0) {
            Utils._blockWidth = egret.MainContext.instance.stage.stageWidth / this.columns;
        }
        return Utils._blockWidth;
    };
    Utils.getBlockHeight = function () {
        if (Utils._blockHeight === 0) {
            Utils._blockHeight = Math.ceil(egret.MainContext.instance.stage.stageHeight / this.rows);
        }
        return Utils._blockHeight;
    };
    Utils.getStageWidth = function () {
        if (Utils._stageWidth === 0) {
            Utils._stageWidth = egret.MainContext.instance.stage.stageWidth;
        }
        return Utils._stageWidth;
    };
    Utils.getStageHeight = function () {
        if (Utils._stageHeight === 0) {
            Utils._stageHeight = egret.MainContext.instance.stage.stageHeight;
        }
        return Utils._stageHeight;
    };
    Utils.getRowBlockState = function (rowIndex) {
        if (Utils.rowsState[rowIndex] == null) {
            var rowState = [];
            var clickableColmun = Math.floor(Math.random() * Utils.columns);
            for (var i = 0; i < Utils.columns; i++) {
                if (i === clickableColmun) {
                    rowState.push(BlockState.clickable);
                }
                else {
                    rowState.push(BlockState.unclickable);
                }
            }
            Utils.rowsState[rowIndex] = rowState;
            return rowState;
        }
        return Utils.rowsState[rowIndex];
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Utils.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    Utils._blockWidth = 0;
    Utils._blockHeight = 0;
    Utils._stageHeight = 0;
    Utils._stageWidth = 0;
    Utils.rowsState = {};
    Utils.rows = 6;
    Utils.columns = 6;
    return Utils;
}());
__reflect(Utils.prototype, "Utils");
var BlockNormal = (function (_super) {
    __extends(BlockNormal, _super);
    function BlockNormal(param) {
        return _super.call(this, param) || this;
    }
    BlockNormal.prototype._beforeDraw = function () {
        this._clickableColor = BlockColor.clickable;
    };
    return BlockNormal;
}(BlockBase));
__reflect(BlockNormal.prototype, "BlockNormal");
var BlockRush = (function (_super) {
    __extends(BlockRush, _super);
    function BlockRush(param) {
        var _this = _super.call(this, param) || this;
        _this._activeState = false;
        _this._activeColor = BlockColor.clickableRush;
        return _this;
    }
    BlockRush.prototype._beforeDraw = function () {
        this._clickableColor = BlockColor.clickable;
    };
    BlockRush.prototype._hit = function () {
        _super.prototype._hit.call(this);
        if (this._activeState) {
            var hitRushEvent = new GameEvents.BlockEvent(GameEvents.BlockEvent.HIT_RUSH);
            this.dispatchEvent(hitRushEvent);
        }
    };
    BlockRush.prototype.move = function (speed, dir) {
        if (dir === void 0) { dir = "down"; }
        this._timeMark = egret.getTimer();
        _super.prototype.move.call(this, speed, dir);
    };
    BlockRush.prototype._moveBlock = function (timeStamp) {
        var redrawScreen = _super.prototype._moveBlock.call(this, timeStamp);
        if (this.state === "clickable") {
            var pass = Math.floor((timeStamp - this._timeMark) / 1000);
            if (pass === 1) {
                this._activeState = !this._activeState;
                if (this._activeState) {
                    this._clickableColor = this._activeColor;
                }
                else {
                    this._clickableColor = BlockColor.clickable;
                }
                this._draw();
                this._timeMark = timeStamp;
            }
        }
        return redrawScreen;
    };
    return BlockRush;
}(BlockBase));
__reflect(BlockRush.prototype, "BlockRush");
var BlocksColumn = (function (_super) {
    __extends(BlocksColumn, _super);
    function BlocksColumn(param) {
        var _this = _super.call(this) || this;
        _this._blocks = [];
        _this._creatingRowIndex = 0;
        _this._speedLevel = 0;
        _this._speedTick = false;
        _this._shrinkRate = 1;
        _this.speed = Service.GAME_CONFIG.speedLevels[_this._speedLevel];
        _this.dir = param.dir;
        _this._dir = _this.dir;
        _this.name = param.name;
        _this._speedUpInterval = param.speedUpInterval * 1000;
        _this._index = parseInt(_this.name.split("_")[1], 10);
        _this._draw();
        return _this;
    }
    BlocksColumn.prototype._draw = function () {
        this._blocks = [];
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
            var weightNumbers = [0, 0, 0, 0, 0, 1, 1, 2, 3, 4];
            var idx = Math.floor(Math.random() * weightNumbers.length);
            var blockType = weightNumbers[idx];
            block = new window[BlockType[blockType]](param);
        }
        else {
            block = new BlockNormal(param);
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
            this.addChild(newBlock);
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
        if (this._speedUpTimer !== null) {
            this._speedUpTimer.stop();
            this._speedUpTimer.removeEventListener(egret.TimerEvent.TIMER, this._speedLooper, this);
            this._speedUpTimer = null;
        }
    };
    BlocksColumn.prototype.move = function () {
        var blocks = this._blocks;
        for (var i = 0; i < blocks.length; i++) {
            blocks[i].move(this.speed, this._dir);
        }
        this.startSpeedUpTimer();
    };
    BlocksColumn.prototype.stop = function () {
        for (var i = 0; i < this._blocks.length; i++) {
            this._blocks[i].stop();
        }
        this.stopSpeedUpTimer();
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
    return BlocksColumn;
}(egret.Sprite));
__reflect(BlocksColumn.prototype, "BlocksColumn");
var BlockShrink = (function (_super) {
    __extends(BlockShrink, _super);
    function BlockShrink(param) {
        var _this = _super.call(this, param) || this;
        _this._activeColor = BlockColor.clickableShrink;
        return _this;
    }
    BlockShrink.prototype._hit = function () {
        _super.prototype._hit.call(this);
        if (this._activeState) {
            var hitShrinkEvent = new GameEvents.BlockEvent(GameEvents.BlockEvent.HIT_SHRINK);
            this.dispatchEvent(hitShrinkEvent);
        }
    };
    return BlockShrink;
}(BlockFlashBase));
__reflect(BlockShrink.prototype, "BlockShrink");
var BlockState;
(function (BlockState) {
    BlockState[BlockState["unclickable"] = 0] = "unclickable";
    BlockState[BlockState["clicked"] = 1] = "clicked";
    BlockState[BlockState["clickable"] = 2] = "clickable";
    BlockState[BlockState["clickableDouble"] = 3] = "clickableDouble";
    BlockState[BlockState["clickableRush"] = 4] = "clickableRush";
})(BlockState || (BlockState = {}));
var BlockColor;
(function (BlockColor) {
    BlockColor[BlockColor["unClickable"] = 16777215] = "unClickable";
    BlockColor[BlockColor["clickable"] = 0] = "clickable";
    BlockColor[BlockColor["clicked"] = 15066597] = "clicked";
    BlockColor[BlockColor["border"] = 6710886] = "border";
    BlockColor[BlockColor["clickableDouble"] = 1782970] = "clickableDouble";
    BlockColor[BlockColor["clickableRush"] = 12000541] = "clickableRush";
    BlockColor[BlockColor["clickableBlink"] = 9688320] = "clickableBlink";
    BlockColor[BlockColor["clickableShrink"] = 13172991] = "clickableShrink";
})(BlockColor || (BlockColor = {}));
var BlockType;
(function (BlockType) {
    BlockType[BlockType["BlockNormal"] = 0] = "BlockNormal";
    BlockType[BlockType["BlockDouble"] = 1] = "BlockDouble";
    BlockType[BlockType["BlockRush"] = 2] = "BlockRush";
    BlockType[BlockType["BlockBlink"] = 3] = "BlockBlink";
    BlockType[BlockType["BlockShrink"] = 4] = "BlockShrink";
    BlockType[BlockType["BlockBonus"] = 5] = "BlockBonus";
})(BlockType || (BlockType = {}));
var GameMode;
(function (GameMode) {
    GameMode[GameMode["BI_DIR"] = 0] = "BI_DIR";
    GameMode[GameMode["DOWN"] = 1] = "DOWN";
    GameMode[GameMode["UP"] = 2] = "UP";
})(GameMode || (GameMode = {}));
var GameLevel;
(function (GameLevel) {
    GameLevel[GameLevel["EASY"] = 0] = "EASY";
    GameLevel[GameLevel["NORMAL"] = 1] = "NORMAL";
    GameLevel[GameLevel["HARD"] = 2] = "HARD";
})(GameLevel || (GameLevel = {}));
var TextColors;
(function (TextColors) {
    TextColors[TextColors["defaultButtonLable"] = 16777215] = "defaultButtonLable";
})(TextColors || (TextColors = {}));
var BlockBlink = (function (_super) {
    __extends(BlockBlink, _super);
    function BlockBlink(param) {
        var _this = _super.call(this, param) || this;
        _this._activeState = false;
        return _this;
    }
    BlockBlink.prototype._beforeDraw = function () {
        this._clickableColor = BlockColor.clickableBlink;
    };
    // _hit() {
    //     super._hit();
    //     if (this._activeState) {
    //         let hitBlinkEvent: GameEvents.BlockEvent = new GameEvents.BlockEvent(GameEvents.BlockEvent.HIT_BLINK);
    //         this.dispatchEvent(hitBlinkEvent);
    //     }
    // }
    BlockBlink.prototype.move = function (speed, dir) {
        if (dir === void 0) { dir = "down"; }
        this._timeMark = egret.getTimer();
        _super.prototype.move.call(this, speed, dir);
    };
    BlockBlink.prototype._moveBlock = function (timeStamp) {
        var redrawScreen = _super.prototype._moveBlock.call(this, timeStamp);
        if (this.state !== "clicked") {
            var pass = Math.floor((timeStamp - this._timeMark) / 1000);
            if (pass === 1) {
                this._activeState = !this._activeState;
                if (this._activeState) {
                    this.state = "clickable";
                }
                else {
                    this.state = "unclickable";
                }
                this._timeMark = timeStamp;
            }
        }
        return redrawScreen;
    };
    return BlockBlink;
}(BlockBase));
__reflect(BlockBlink.prototype, "BlockBlink");
///<reference path="cordova.d.ts"/>
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene(param) {
        var _this = _super.call(this) || this;
        _this._blockColumns = [];
        _this._columnSpeeds = [];
        _this._mode = param.mode;
        _this._level = param.level;
        _this._rushFactor = Service.GAME_CONFIG.rushFactor;
        _this._rushTime = Service.GAME_CONFIG.rushTime;
        _this._shrinkTime = Service.GAME_CONFIG.shrinkTime;
        _this._score = 0;
        _this._calculateColsRows();
        _this._drawBg();
        _this._drawColumns();
        _this._drawScore();
        _this.addEventListener(GameEvents.BlockEvent.MOVED_OUT, _this._onMovedOut, _this, true);
        _this.addEventListener(GameEvents.BlockEvent.HIT, _this._onHit, _this, true);
        _this.addEventListener(GameEvents.BlockEvent.HIT_RUSH, _this._onHitRush, _this, true);
        _this.addEventListener(GameEvents.BlockEvent.HIT_UNCLICKABLE, _this._onHitUnclickable, _this, true);
        _this.addEventListener(GameEvents.BlockEvent.HIT_SHRINK, _this._onHitShrink, _this, true);
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
    GameScene.prototype._drawBg = function () {
        this._bg = Utils.createBitmapByName("normal_bg_png");
        this._bg.fillMode = egret.BitmapFillMode.REPEAT;
        this.addChild(this._bg);
        var stageW = Utils.getStageWidth();
        var stageH = Utils.getStageHeight();
        this._bg.width = stageW;
        this._bg.height = stageH;
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
                name: "col_" + i
            });
            blockColumn.x = i * nColWidth;
            blockColumn.width = nColWidth;
            this.addChild(blockColumn);
            this._blockColumns.push(blockColumn);
        }
    };
    GameScene.prototype._calculateColsRows = function () {
        var nThumbWidth = 48;
        var nThumbHeight = 48;
        var nStageWidth = Utils.getStageWidth();
        var nStageHeight = Utils.getStageHeight();
        var nColsMax = Math.floor(nStageWidth / nThumbWidth);
        var nRowsMax = Math.floor(nStageWidth / nThumbHeight);
        if (this._level === GameLevel.EASY) {
            Utils.columns = 4;
            Utils.rows = 6;
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
    GameScene.prototype._drawScore = function () {
        var label = new egret.TextField();
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
    };
    GameScene.prototype._onMovedOut = function (evt) {
        // let tarBlock: Block = evt.target;
        // let missed: boolean = evt.missed;
    };
    GameScene.prototype._onHit = function (evt) {
        this._score++;
        this._scoreText.text = this._score.toString();
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
            this._blockColumns[i].move();
        }
    };
    GameScene.prototype._gameOver = function () {
        for (var i = 0; i < this._blockColumns.length; i++) {
            this._blockColumns[i].stop();
        }
        var gameoverEvent = new GameEvents.PlayEvent(GameEvents.PlayEvent.GAME_OVER);
        gameoverEvent.score = this._score;
        this.dispatchEvent(gameoverEvent);
    };
    GameScene.prototype.reset = function () {
        this.score = 0;
        for (var i = 0; i < this._blockColumns.length; i++) {
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
    };
    Object.defineProperty(GameScene.prototype, "score", {
        get: function () {
            return this._score;
        },
        set: function (val) {
            this._score = val;
            this._scoreText.text = val.toString();
        },
        enumerable: true,
        configurable: true
    });
    return GameScene;
}(egret.Sprite));
__reflect(GameScene.prototype, "GameScene");
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.createView();
        return _this;
    }
    LoadingUI.prototype.createView = function () {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = 300;
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.textAlign = "center";
    };
    LoadingUI.prototype.onProgress = function (current, total) {
        this.textField.text = "Loading..." + current + "/" + total;
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI", ["RES.PromiseTaskReporter"]);
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
            context.onUpdate = function () {
            };
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.createGameScene()];
                    case 2:
                        _a.sent();
                        this._attachEvents();
                        // const result = await RES.getResAsync("description_json")
                        // this.startAnimation(result);
                        return [4 /*yield*/, platform.login()];
                    case 3:
                        // const result = await RES.getResAsync("description_json")
                        // this.startAnimation(result);
                        _a.sent();
                        return [4 /*yield*/, platform.getUserInfo()];
                    case 4:
                        userInfo = _a.sent();
                        console.log(userInfo);
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 2:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    Main.prototype.createGameScene = function () {
        return __awaiter(this, void 0, void 0, function () {
            var gameService, gameConfig, gameScene, startButtonWidth, startButtonHeight, startButton, gameOverButtonWidth, gameOverButtonHeight, gameOverButton;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.stage.setContentSize(window.innerWidth, window.innerHeight);
                        gameService = new Service();
                        return [4 /*yield*/, gameService.getGameConfig()];
                    case 1:
                        gameConfig = _a.sent();
                        gameScene = new GameScene({
                            mode: GameMode.UP,
                            level: GameLevel.EASY
                        });
                        this._gameScene = gameScene;
                        this.addChild(gameScene);
                        startButtonWidth = Utils.getStageWidth() / 2;
                        startButtonHeight = 80;
                        startButton = new UIComponents.DefaultButton(startButtonWidth, startButtonHeight, "Start");
                        startButton.x = Utils.getStageWidth() / 2 - startButtonWidth / 2;
                        startButton.y = Utils.getStageHeight() * 0.3;
                        startButton.addEventListener("touchTap", this._startGame, this);
                        this._startButton = startButton;
                        this.addChild(startButton);
                        gameOverButtonWidth = Utils.getStageWidth() / 2;
                        gameOverButtonHeight = 80;
                        gameOverButton = new UIComponents.DefaultButton(gameOverButtonWidth, gameOverButtonHeight, "Game over");
                        gameOverButton.x = Utils.getStageWidth() / 2 - gameOverButtonWidth / 2;
                        gameOverButton.y = Utils.getStageHeight() * 0.3;
                        gameOverButton.visible = false;
                        gameOverButton.addEventListener("touchTap", this._restartGame, this);
                        this._gameOverButton = gameOverButton;
                        this.addChild(gameOverButton);
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype._startGame = function () {
        this._startButton.visible = false;
        this._gameScene.gameStart();
    };
    Main.prototype._restartGame = function () {
        this._startButton.visible = true;
        this._gameOverButton.visible = false;
        this._gameScene.reset();
    };
    Main.prototype._attachEvents = function () {
        this.addEventListener(GameEvents.PlayEvent.GAME_OVER, this._gameOver, this);
    };
    Main.prototype._gameOver = function (oEvent) {
        console.log(oEvent.score);
        this._gameOverButton.visible = true;
    };
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    Main.prototype.startAnimation = function (result) {
        var _this = this;
        var parser = new egret.HtmlTextParser();
        var textflowArr = result.map(function (text) { return parser.parse(text); });
        var textfield = this.textfield;
        var count = -1;
        var change = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var textFlow = textflowArr[count];
            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            var tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, _this);
        };
        change();
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
var DebugPlatform = (function () {
    function DebugPlatform() {
    }
    DebugPlatform.prototype.getUserInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, { nickName: "username" }];
            });
        });
    };
    DebugPlatform.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return DebugPlatform;
}());
__reflect(DebugPlatform.prototype, "DebugPlatform", ["Platform"]);
if (!window.platform) {
    window.platform = new DebugPlatform();
}
var Service = (function () {
    function Service() {
        this._baseURL = "";
        this._gameConfig = this._baseURL + "resource/config/gameconfig.json";
    }
    /**
     * getGameConfig
     */
    Service.prototype.getGameConfig = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (Service.GAME_CONFIG === undefined) {
                var request = new egret.HttpRequest();
                var respHandler = function (evt) {
                    switch (evt.type) {
                        case egret.Event.COMPLETE:
                            var request = evt.currentTarget;
                            Service.GAME_CONFIG = JSON.parse(request.response);
                            resolve(Service.GAME_CONFIG);
                            break;
                        case egret.IOErrorEvent.IO_ERROR:
                            resolve({
                                message: "IO ERROR in" + this._gameConfig
                            });
                            break;
                    }
                };
                var progressHandler = function (evt) {
                    console.log("progress:", evt.bytesLoaded, evt.bytesTotal);
                };
                request.once(egret.Event.COMPLETE, respHandler, _this);
                request.once(egret.IOErrorEvent.IO_ERROR, respHandler, _this);
                request.once(egret.ProgressEvent.PROGRESS, progressHandler, _this);
                request.open(_this._gameConfig, egret.HttpMethod.GET);
                request.send();
            }
            else {
                resolve(Service.GAME_CONFIG);
            }
        });
    };
    return Service;
}());
__reflect(Service.prototype, "Service");
var Time;
(function (Time) {
    var StopWatch = (function () {
        function StopWatch(param, scope) {
            this._time = 0;
            this._interval = 1;
            this._times = param.times;
            this._callbackFinish = param.finish;
            this._scope = scope;
            if (param.interval) {
                this._interval = param.interval;
            }
            if (param.tick) {
                this._callbackTick = param.tick;
            }
        }
        StopWatch.prototype.run = function () {
            if (this._timer == null) {
                this._timer = new egret.Timer(this._interval * 1000, this._times);
                this._timer.addEventListener(egret.TimerEvent.TIMER, this._tick, this);
                this._timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this._fini, this);
            }
            else {
                this._timer.stop();
                this._timer.repeatCount = this._timer.repeatCount + this._times;
            }
            this._timer.start();
            return this._timer;
        };
        StopWatch.prototype._tick = function () {
            this._time = this._time + this._interval;
            if (this._callbackTick) {
                this._callbackTick.apply(this._scope, this._time);
            }
        };
        StopWatch.prototype._fini = function () {
            this.destroy();
            this._callbackFinish.apply(this._scope);
        };
        /**
         * destroy
         */
        StopWatch.prototype.destroy = function () {
            if (this._timer != null) {
                this._timer.stop();
                this._timer.removeEventListener(egret.TimerEvent.TIMER, this._tick, this);
                this._timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this._fini, this);
                this._timer = null;
            }
        };
        return StopWatch;
    }());
    Time.StopWatch = StopWatch;
    __reflect(StopWatch.prototype, "Time.StopWatch");
})(Time || (Time = {}));
var UIComponents;
(function (UIComponents) {
    var DefaultButton = (function (_super) {
        __extends(DefaultButton, _super);
        function DefaultButton(w, h, label) {
            var _this = _super.call(this) || this;
            _this.width = w;
            _this.height = h;
            _this._label = label;
            _this.touchEnabled = true;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this._onAddToStage, _this);
            return _this;
        }
        DefaultButton.prototype._onAddToStage = function () {
            var btnImage = new egret.Bitmap();
            btnImage.texture = RES.getRes("buttonBg_png");
            var rect = new egret.Rectangle(30, 35, 196, 33);
            btnImage.scale9Grid = rect;
            btnImage.width = this.width;
            btnImage.height = this.height;
            this.addChild(btnImage);
            var label = new egret.TextField();
            label.width = this.width;
            label.height = this.height;
            label.textColor = TextColors.defaultButtonLable;
            label.textAlign = egret.HorizontalAlign.CENTER;
            label.verticalAlign = egret.VerticalAlign.MIDDLE;
            label.text = this._label;
            label.bold = true;
            this.addChild(label);
        };
        return DefaultButton;
    }(egret.DisplayObjectContainer));
    UIComponents.DefaultButton = DefaultButton;
    __reflect(DefaultButton.prototype, "UIComponents.DefaultButton");
})(UIComponents || (UIComponents = {}));
var GameEvents;
(function (GameEvents) {
    var BlockEvent = (function (_super) {
        __extends(BlockEvent, _super);
        function BlockEvent(type, bubbles, cancelable) {
            if (bubbles === void 0) { bubbles = true; }
            if (cancelable === void 0) { cancelable = false; }
            var _this = _super.call(this, type, bubbles, cancelable) || this;
            _this.missed = false;
            return _this;
        }
        BlockEvent.MOVED_OUT = "movedout";
        BlockEvent.MISSED = "missed";
        BlockEvent.HIT = "hit";
        BlockEvent.HIT_RUSH = "hitrush";
        BlockEvent.HIT_SHRINK = "hitshrink";
        BlockEvent.HIT_UNCLICKABLE = "hitunclickable";
        return BlockEvent;
    }(egret.Event));
    GameEvents.BlockEvent = BlockEvent;
    __reflect(BlockEvent.prototype, "GameEvents.BlockEvent");
    var PlayEvent = (function (_super) {
        __extends(PlayEvent, _super);
        function PlayEvent(type, bubbles, cancelable) {
            if (bubbles === void 0) { bubbles = true; }
            if (cancelable === void 0) { cancelable = false; }
            var _this = _super.call(this, type, bubbles, cancelable) || this;
            _this.score = 0;
            return _this;
        }
        PlayEvent.GAME_OVER = "gameover";
        return PlayEvent;
    }(egret.Event));
    GameEvents.PlayEvent = PlayEvent;
    __reflect(PlayEvent.prototype, "GameEvents.PlayEvent");
})(GameEvents || (GameEvents = {}));
//# sourceMappingURL=main.min.js.map
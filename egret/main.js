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
var Block = (function (_super) {
    __extends(Block, _super);
    function Block(param) {
        var _this = _super.call(this) || this;
        _this._unClickableColor = BlockColor.unClickable;
        _this._clickedColor = BlockColor.clicked;
        _this.touchEnabled = true;
        _this._currentState = param.state;
        _this.width = param.width;
        _this.height = param.height;
        _this._colorRect = new egret.Shape();
        _this._colorRect.width = _this.width;
        _this._colorRect.height = _this.height;
        _this._beforeDraw();
        _this._draw();
        _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this._onTouch, _this);
        return _this;
    }
    Block.prototype._draw = function () {
        var fillColor;
        // let labelColor: BlockColor = BlockColor.unClickable;
        var lineColor = BlockColor.border;
        var rectWidth = this._colorRect.width;
        var rectHeight = this._colorRect.height;
        // const rectX = rectWidth / 2;
        // const rectY = rectHeight / 2;
        // this._colorRect.anchorOffsetX = rectX;
        // this._colorRect.anchorOffsetY = rectY;
        // this._colorRect.x = rectX;
        // this._colorRect.y = rectY;
        if (this._currentState === BlockState.clickable || this._currentState === BlockState.clicked) {
            fillColor = this._clickableColor;
        }
        this._colorRect.graphics.clear();
        this._colorRect.graphics.lineStyle(1, lineColor);
        if (this._currentState !== BlockState.unclickable) {
            this._colorRect.graphics.beginFill(fillColor, 1);
        }
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
    Block.prototype._hitAni = function () {
        var rectWidth = this._colorRect.width;
        var rectHeight = this._colorRect.height;
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
    Block.prototype._hit = function () {
        // this.addEventListener(egret.Event.ENTER_FRAME, this._hitAni, this);
        egret.startTick(this._hitAni, this);
        this.state = "clicked";
        var hitEvent = new GameEvents.BlockEvent(GameEvents.BlockEvent.HIT);
        this.dispatchEvent(hitEvent);
    };
    Block.prototype.move = function (speed, dir) {
        if (dir === void 0) { dir = "down"; }
        this.speed = speed;
        this._dir = dir;
        egret.startTick(this._moveBlock, this);
    };
    Block.prototype.stop = function () {
        egret.stopTick(this._moveBlock, this);
    };
    Block.prototype._moveBlock = function () {
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
    Block.prototype._setY = function () {
        var tempY = this.y;
        if (this._dir === "up") {
            this.y = tempY - this.speed;
        }
        else {
            this.y = tempY + this.speed;
        }
    };
    Block.prototype._triggerMovedOutEvent = function () {
        var missed = false;
        var movedOutEvent = new GameEvents.BlockEvent(GameEvents.BlockEvent.MOVED_OUT);
        if (this._currentState === BlockState.clickable) {
            missed = true;
        }
        movedOutEvent.missed = missed;
        this.dispatchEvent(movedOutEvent);
    };
    Object.defineProperty(Block.prototype, "state", {
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
    return Block;
}(egret.Sprite));
__reflect(Block.prototype, "Block");
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
        if (Utils.rowsState[rowIndex] === undefined) {
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
            Utils.rowsState.push(rowState);
            return rowState;
        }
        return Utils.rowsState[rowIndex];
    };
    Utils._blockWidth = 0;
    Utils._blockHeight = 0;
    Utils._stageHeight = 0;
    Utils._stageWidth = 0;
    Utils.rowsState = [];
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
    BlockNormal.prototype._onTouch = function (oEvent) {
        if (this._currentState === BlockState.clickable) {
            this._hit();
        }
    };
    return BlockNormal;
}(Block));
__reflect(BlockNormal.prototype, "BlockNormal");
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
var BlockState;
(function (BlockState) {
    BlockState[BlockState["unclickable"] = 0] = "unclickable";
    BlockState[BlockState["clickable"] = 1] = "clickable";
    BlockState[BlockState["clicked"] = 2] = "clicked";
})(BlockState || (BlockState = {}));
var BlockColor;
(function (BlockColor) {
    BlockColor[BlockColor["unClickable"] = 16777215] = "unClickable";
    BlockColor[BlockColor["clickable"] = 0] = "clickable";
    BlockColor[BlockColor["border"] = 6710886] = "border";
    BlockColor[BlockColor["clickableDouble"] = 1782970] = "clickableDouble";
})(BlockColor || (BlockColor = {}));
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
        return BlockEvent;
    }(egret.Event));
    GameEvents.BlockEvent = BlockEvent;
    __reflect(BlockEvent.prototype, "GameEvents.BlockEvent");
})(GameEvents || (GameEvents = {}));
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
}(Block));
__reflect(BlockDouble.prototype, "BlockDouble");
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
                        this.createGameScene();
                        // const result = await RES.getResAsync("description_json")
                        // this.startAnimation(result);
                        return [4 /*yield*/, platform.login()];
                    case 2:
                        // const result = await RES.getResAsync("description_json")
                        // this.startAnimation(result);
                        _a.sent();
                        return [4 /*yield*/, platform.getUserInfo()];
                    case 3:
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
            var bg, stageW, stageH, gameService, gameConfig, gameScene, startButtonWidth, startButtonHeight, startButton;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.stage.setContentSize(window.innerWidth, window.innerHeight);
                        bg = this.createBitmapByName("bg_texture_jpg");
                        bg.fillMode = egret.BitmapFillMode.REPEAT;
                        this.addChild(bg);
                        stageW = this.stage.stageWidth;
                        stageH = this.stage.stageHeight;
                        bg.width = stageW;
                        bg.height = stageH;
                        gameService = new Service();
                        return [4 /*yield*/, gameService.getGameConfig()];
                    case 1:
                        gameConfig = _a.sent();
                        gameScene = new GameScene({
                            mode: GameMode.DOWN,
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
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype._startGame = function () {
        this._startButton.visible = false;
        this._gameScene.gameStart();
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
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
        });
    };
    return Service;
}());
__reflect(Service.prototype, "Service");
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
///<reference path="cordova.d.ts"/>
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene(param) {
        var _this = _super.call(this) || this;
        _this._score = 0;
        _this._blockColumns = [];
        _this._mode = param.mode;
        _this._level = param.level;
        _this._calculateColsRows();
        _this._drawColumns();
        _this._drawScore();
        _this.addEventListener(GameEvents.BlockEvent.MOVED_OUT, _this._onMovedOut, _this, true);
        _this.addEventListener(GameEvents.BlockEvent.HIT, _this._onHit, _this, true);
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
    GameScene.prototype.gameStart = function () {
        for (var i = 0; i < this._blockColumns.length; i++) {
            this._blockColumns[i].move();
        }
    };
    return GameScene;
}(egret.Sprite));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=main.min.js.map
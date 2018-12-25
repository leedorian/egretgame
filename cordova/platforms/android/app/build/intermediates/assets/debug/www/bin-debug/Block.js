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
var Block = (function (_super) {
    __extends(Block, _super);
    function Block(param) {
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        _this._currentState = param.state;
        _this.width = param.width;
        _this.height = param.height;
        console.log(_this.width + "|" + _this.height);
        _this._draw();
        _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this._onTouch, _this);
        return _this;
    }
    Block.prototype._draw = function () {
        var fillColor;
        var labelColor = BlockColor.unClickable;
        var lineColor = BlockColor.clickable;
        if (this._currentState === 0) {
            fillColor = BlockColor.unClickable;
            labelColor = BlockColor.clickable;
        }
        else if (this._currentState === 1) {
            fillColor = BlockColor.clickable;
        }
        else if (this._currentState === 2) {
            fillColor = BlockColor.clicked;
        }
        this.graphics.lineStyle(1, lineColor);
        this.graphics.beginFill(fillColor, 1);
        this.graphics.drawRect(0, 0, this.width, this.height);
        if (this._currentState === 1) {
            lineColor = BlockColor.unClickable;
        }
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
    Block.prototype._onTouch = function (oEvent) {
        if (this._currentState === 1) {
            this.state = "clicked";
            var hitEvent = new GameEvents.BlockEvent(GameEvents.BlockEvent.HIT);
            this.dispatchEvent(hitEvent);
        }
    };
    Block.prototype.move = function (speed, dir) {
        if (dir === void 0) { dir = "down"; }
        this._speed = speed;
        if (dir === "up") {
            this._speed = -speed;
        }
        this._dir = dir;
        //  this.addEventListener(egret.Event.ENTER_FRAME,this._moveBlock,this);
        egret.startTick(this._moveBlock, this);
    };
    Block.prototype.stop = function () {
        // this.removeEventListener(egret.Event.ENTER_FRAME,this._moveBlock,this);
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
        this.y = tempY + this._speed;
    };
    Block.prototype._triggerMovedOutEvent = function () {
        console.log(this.y + this.height);
        var missed = false;
        var movedOutEvent = new GameEvents.BlockEvent(GameEvents.BlockEvent.MOVED_OUT);
        if (this._currentState === 1) {
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
//# sourceMappingURL=Block.js.map
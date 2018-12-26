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
//# sourceMappingURL=Block.js.map
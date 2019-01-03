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
var BlockRush = (function (_super) {
    __extends(BlockRush, _super);
    function BlockRush(param) {
        var _this = _super.call(this, param) || this;
        _this._activeState = false;
        _this._activeColor = RES.getRes(BlockTexture.clickableRush);
        return _this;
    }
    BlockRush.prototype._beforeDraw = function () {
        this._clickableColor = RES.getRes(BlockTexture.clickableNormal);
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
                    this._clickableColor = RES.getRes(BlockTexture.clickableNormal);
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
//# sourceMappingURL=BlockRush.js.map
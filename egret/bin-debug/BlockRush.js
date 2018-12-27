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
        _this._rushState = false;
        return _this;
    }
    BlockRush.prototype._beforeDraw = function () {
        this._clickableColor = BlockColor.clickable;
    };
    BlockRush.prototype._onTouch = function (oEvent) {
        if (this._currentState === BlockState.clickable) {
            this._hit();
        }
    };
    BlockRush.prototype._hit = function () {
        _super.prototype._hit.call(this);
        if (this._rushState) {
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
                this._rushState = !this._rushState;
                if (this._rushState) {
                    this._clickableColor = BlockColor.clickableRush;
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
}(Block));
__reflect(BlockRush.prototype, "BlockRush");
//# sourceMappingURL=BlockRush.js.map
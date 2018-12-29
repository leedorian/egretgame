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
//# sourceMappingURL=BlockFlashBase.js.map
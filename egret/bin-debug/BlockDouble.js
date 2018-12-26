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
//# sourceMappingURL=BlockDouble.js.map
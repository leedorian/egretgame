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
var BlockShrink = (function (_super) {
    __extends(BlockShrink, _super);
    function BlockShrink(param) {
        var _this = _super.call(this, param) || this;
        _this._activeColor = RES.getRes(BlockTexture.clickableShrink);
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
//# sourceMappingURL=BlockShrink.js.map
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
//# sourceMappingURL=BlockNormal.js.map
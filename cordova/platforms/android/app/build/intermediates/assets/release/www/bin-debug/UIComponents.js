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
//# sourceMappingURL=UIComponents.js.map
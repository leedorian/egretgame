var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Utils = (function () {
    function Utils() {
    }
    Utils.getBlockWidth = function () {
        if (Utils._blockWidth === 0) {
            var aspectRadio = 175 / 214;
            var preferedWidth = Utils.getBlockHeight() * aspectRadio;
            Utils._blockWidth = preferedWidth;
            // Utils._blockWidth = (egret.MainContext.instance.stage.stageWidth - Utils.horizontalMargin * 2) / this.columns;
        }
        return Utils._blockWidth;
    };
    Utils.getBlockHeight = function () {
        if (Utils._blockHeight === 0) {
            // const aspectRadio = 214/175;
            // var preferedHeight = Utils.getBlockWidth() * aspectRadio;
            // Utils._blockHeight = preferedHeight;
            Utils._blockHeight = Math.ceil((egret.MainContext.instance.stage.stageHeight - (Utils.verticalMarginTop + Utils.verticalMarginBottom)) / this.rows);
        }
        return Utils._blockHeight;
    };
    Utils.getArenaHeight = function () {
        return Utils.getBlockHeight() * Utils.rows;
    };
    Utils.getArenaWidth = function () {
        return Utils.getBlockWidth() * Utils.columns;
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
        if (Utils.rowsState[rowIndex] == null) {
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
            Utils.rowsState[rowIndex] = rowState;
            return rowState;
        }
        return Utils.rowsState[rowIndex];
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Utils.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    Utils.fitToWidth = function (img, width) {
        img.width = width;
        img.height = width * img.texture.textureHeight / img.texture.textureWidth;
    };
    Utils._blockWidth = 0;
    Utils._blockHeight = 0;
    Utils._stageHeight = 0;
    Utils._stageWidth = 0;
    Utils.verticalMarginTop = 100;
    Utils.verticalMarginBottom = 150;
    Utils.horizontalMargin = 30;
    Utils.rowsState = {};
    Utils.rows = 6;
    Utils.columns = 6;
    return Utils;
}());
__reflect(Utils.prototype, "Utils");
//# sourceMappingURL=Utils.js.map
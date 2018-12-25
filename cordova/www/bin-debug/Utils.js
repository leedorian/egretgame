var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Utils = (function () {
    function Utils() {
    }
    Utils.getBlockWidth = function () {
        if (Utils._blockWidth === 0) {
            Utils._blockWidth = egret.MainContext.instance.stage.stageWidth / this.columns;
        }
        return Utils._blockWidth;
    };
    Utils.getBlockHeight = function () {
        if (Utils._blockHeight === 0) {
            Utils._blockHeight = Math.ceil(egret.MainContext.instance.stage.stageHeight / this.rows);
        }
        return Utils._blockHeight;
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
        if (Utils.rowsState[rowIndex] === undefined) {
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
            Utils.rowsState.push(rowState);
            return rowState;
        }
        return Utils.rowsState[rowIndex];
    };
    Utils._blockWidth = 0;
    Utils._blockHeight = 0;
    Utils._stageHeight = 0;
    Utils._stageWidth = 0;
    Utils.rowsState = [];
    Utils.rows = 6;
    Utils.columns = 6;
    return Utils;
}());
__reflect(Utils.prototype, "Utils");
//# sourceMappingURL=Utils.js.map
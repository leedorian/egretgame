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
var BlocksColumn = (function (_super) {
    __extends(BlocksColumn, _super);
    function BlocksColumn(param) {
        var _this = _super.call(this) || this;
        _this._blocks = [];
        _this._speed = 1;
        _this._creatingRowIndex = 0;
        _this._dir = param.dir;
        _this._speed = param.speed;
        _this.name = param.name;
        _this._index = parseInt(_this.name.split("_")[1], 10);
        _this._draw();
        return _this;
    }
    BlocksColumn.prototype._draw = function () {
        var n = this._dir === "down" ? -1 : 0;
        var blockCount = this._dir === "down" ? Utils.rows : Utils.rows + 1;
        for (var i = n; i < blockCount; i++) {
            this._creatingRowIndex = this._dir === "down" ? i + 1 : i;
            var block = this._createBlock({
                state: Utils.getRowBlockState(this._creatingRowIndex)[this._index]
            });
            block.y = i * block.height;
            this.addChild(block);
            this._blocks.push(block);
        }
        console.log(this._blocks);
    };
    BlocksColumn.prototype._createBlock = function (settings) {
        var blockWidth = Utils.getBlockWidth();
        var blockHeight = Utils.getBlockHeight();
        var param = {
            width: blockWidth,
            height: blockHeight,
            state: settings.state
        };
        var block = new Block(param);
        block.addEventListener(GameEvents.BlockEvent.MOVED_OUT, this._onMovedOut, this);
        return block;
    };
    BlocksColumn.prototype._onMovedOut = function (evt) {
        var tarBlock = evt.target;
        // let missed: boolean = evt.missed;
        var missed = false;
        tarBlock.removeEventListener(GameEvents.BlockEvent.MOVED_OUT, this._onMovedOut, this);
        if (this._dir === "down") {
            this._blocks.pop();
        }
        else {
            this._blocks.shift();
        }
        tarBlock.stop();
        this.removeChild(tarBlock);
        tarBlock = null;
        if (missed) {
            this.stop();
        }
        else {
            console.log(this._creatingRowIndex);
            var newBlock = this._createBlock({
                state: Utils.getRowBlockState(this._creatingRowIndex)[this._index]
            });
            this._creatingRowIndex++;
            this.addChild(newBlock);
            if (this._dir === "down") {
                newBlock.y = this._blocks[0].y - newBlock.height + this._speed;
                // newBlock.y = - newBlock.height;
            }
            else {
                newBlock.y = this._blocks[this._blocks.length - 1].y + newBlock.height - this._speed;
                // newBlock.y = Utils.getStageHeight();
                // newBlock.y = Utils.rows * Utils.getBlockHeight();
            }
            console.log(newBlock.y);
            newBlock.move(this._speed, this._dir);
            if (this._dir === "down") {
                this._blocks.unshift(newBlock);
            }
            else {
                this._blocks.push(newBlock);
            }
        }
    };
    BlocksColumn.prototype.move = function () {
        var blocks = this._blocks;
        for (var i = 0; i < blocks.length; i++) {
            blocks[i].move(this._speed, this._dir);
        }
    };
    BlocksColumn.prototype.stop = function () {
        console.log("stop");
        for (var i = 0; i < this._blocks.length; i++) {
            this._blocks[i].stop();
        }
    };
    return BlocksColumn;
}(egret.Sprite));
__reflect(BlocksColumn.prototype, "BlocksColumn");
//# sourceMappingURL=BlocksColumn.js.map
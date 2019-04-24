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
var GameEvents;
(function (GameEvents) {
    var BlockEvent = (function (_super) {
        __extends(BlockEvent, _super);
        function BlockEvent(type, bubbles, cancelable) {
            if (bubbles === void 0) { bubbles = true; }
            if (cancelable === void 0) { cancelable = false; }
            var _this = _super.call(this, type, bubbles, cancelable) || this;
            _this.missed = false;
            return _this;
        }
        BlockEvent.MOVED_OUT = "movedout";
        BlockEvent.MISSED = "missed";
        BlockEvent.HIT = "hit";
        BlockEvent.HIT_RUSH = "hitrush";
        BlockEvent.HIT_SHRINK = "hitshrink";
        BlockEvent.HIT_UNCLICKABLE = "hitunclickable";
        return BlockEvent;
    }(egret.Event));
    GameEvents.BlockEvent = BlockEvent;
    __reflect(BlockEvent.prototype, "GameEvents.BlockEvent");
    var PlayEvent = (function (_super) {
        __extends(PlayEvent, _super);
        // public score:number = 0;
        function PlayEvent(type, bubbles, cancelable) {
            if (bubbles === void 0) { bubbles = true; }
            if (cancelable === void 0) { cancelable = false; }
            return _super.call(this, type, bubbles, cancelable) || this;
        }
        PlayEvent.GAME_OVER = "gameover";
        return PlayEvent;
    }(egret.Event));
    GameEvents.PlayEvent = PlayEvent;
    __reflect(PlayEvent.prototype, "GameEvents.PlayEvent");
})(GameEvents || (GameEvents = {}));
//# sourceMappingURL=Events.js.map
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Time;
(function (Time) {
    var StopWatch = (function () {
        function StopWatch(param, scope) {
            this._time = 0;
            this._interval = 1;
            this._times = param.times;
            this._callbackFinish = param.finish;
            this._scope = scope;
            if (param.interval) {
                this._interval = param.interval;
            }
            if (param.tick) {
                this._callbackTick = param.tick;
            }
        }
        StopWatch.prototype.run = function () {
            if (this._timer == null) {
                this._timer = new egret.Timer(this._interval * 1000, this._times);
                this._timer.addEventListener(egret.TimerEvent.TIMER, this._tick, this);
                this._timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this._fini, this);
            }
            else {
                this._timer.stop();
                this._timer.repeatCount = this._timer.repeatCount + this._times;
            }
            this._timer.start();
            return this._timer;
        };
        StopWatch.prototype._tick = function () {
            this._time = this._time + this._interval;
            if (this._callbackTick) {
                this._callbackTick.apply(this._scope, this._time);
            }
        };
        StopWatch.prototype._fini = function () {
            this.destroy();
            this._callbackFinish.apply(this._scope);
        };
        /**
         * destroy
         */
        StopWatch.prototype.destroy = function () {
            if (this._timer != null) {
                this._timer.stop();
                this._timer.removeEventListener(egret.TimerEvent.TIMER, this._tick, this);
                this._timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this._fini, this);
                this._timer = null;
            }
        };
        return StopWatch;
    }());
    Time.StopWatch = StopWatch;
    __reflect(StopWatch.prototype, "Time.StopWatch");
})(Time || (Time = {}));
//# sourceMappingURL=Time.js.map
namespace Time {
    export class StopWatch {
        constructor(param: { times: number; finish: Function }, scope: any);
        constructor(
            param: { times: number; finish: Function; interval: number },
            scope: any
        );
        constructor(
            param: {
                times: number;
                finish: Function;
                tick(second: number): Function;
            },
            scope: any
        );
        constructor(
            param: {
                times: number;
                finish: Function;
                interval: number;
                tick(second: number): Function;
            },
            scope: any
        );
        constructor(param, scope: any){
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

        private _time: number = 0;
        private _interval: number = 1;
        private _times: number;
        private _scope: any;
        private _callbackTick: Function;
        private _callbackFinish: Function;
        private _timer: egret.Timer;

        run():egret.Timer {
            if(this._timer == null){
                this._timer = new egret.Timer(this._interval * 1000, this._times);
                this._timer.addEventListener(
                    egret.TimerEvent.TIMER,
                    this._tick,
                    this
                );

                this._timer.addEventListener(
                    egret.TimerEvent.TIMER_COMPLETE,
                    this._fini,
                    this
                );
            }else{
                this._timer.stop();
                this._timer.repeatCount = this._timer.repeatCount + this._times;
            }


            this._timer.start();
            return this._timer;
        }
        private _tick() {
            this._time = this._time + this._interval;
            if (this._callbackTick) {
                this._callbackTick.apply(this._scope, this._time);
            }
        }
        private _fini() {
            this.destroy();
            this._callbackFinish.apply(this._scope);
        }
        /**
         * destroy
         */
        public destroy() {
            if(this._timer != null){
                this._timer.stop();
                this._timer.removeEventListener(
                    egret.TimerEvent.TIMER,
                    this._tick,
                    this
                );
                this._timer.removeEventListener(
                    egret.TimerEvent.TIMER_COMPLETE,
                    this._fini,
                    this
                );
                this._timer = null;
            }
        }
    }
}

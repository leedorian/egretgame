namespace Time{
    export class StopWatch {
        constructor() {

        }

        private _time:number;
        private _msecond:number;
        private _callback:Function;

        count(param:any){
            this._msecond = param.msecond;
            this._callback = param.callback;
            this._time = egret.getTimer();
            egret.startTick(this._tick, this);
        }
        private _tick(timeStamp: number):boolean{
            let pass = timeStamp - this._time;
            if (pass >= this._msecond) {
                egret.stopTick(this._tick, this);
                this._callback.call(this);
            }
            this._time = timeStamp;
            return false;
        }
    }
}

var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Service = (function () {
    function Service() {
        this._baseURL = "";
        this._gameConfig = this._baseURL + "resource/config/gameconfig.json";
    }
    /**
     * getGameConfig
     */
    Service.prototype.getGameConfig = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (Service.GAME_CONFIG === undefined) {
                var request = new egret.HttpRequest();
                var respHandler = function (evt) {
                    switch (evt.type) {
                        case egret.Event.COMPLETE:
                            var request = evt.currentTarget;
                            Service.GAME_CONFIG = JSON.parse(request.response);
                            resolve(Service.GAME_CONFIG);
                            break;
                        case egret.IOErrorEvent.IO_ERROR:
                            resolve({
                                message: "IO ERROR in" + this._gameConfig
                            });
                            break;
                    }
                };
                var progressHandler = function (evt) {
                    console.log("progress:", evt.bytesLoaded, evt.bytesTotal);
                };
                request.once(egret.Event.COMPLETE, respHandler, _this);
                request.once(egret.IOErrorEvent.IO_ERROR, respHandler, _this);
                request.once(egret.ProgressEvent.PROGRESS, progressHandler, _this);
                request.open(_this._gameConfig, egret.HttpMethod.GET);
                request.send();
            }
            else {
                resolve(Service.GAME_CONFIG);
            }
        });
    };
    return Service;
}());
__reflect(Service.prototype, "Service");
//# sourceMappingURL=Service.js.map
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Service = (function () {
    function Service(loadingView) {
        // private  _baseURL:string = "";
        // private  _gameConfig:string = this._baseURL + "resource/config/gameconfig.json";
        this._baseURL = "https://game.weiplus5.com/";
        this._gameConfig = this._baseURL + "index.php?m=game&f=index&v=public_load_dtwconfig";
        this._configrations = [
            {
                url: "index.php?m=game&f=index&v=public_load_dtwconfig",
                name: "gameConfig"
            }
        ];
        this._loaded = 0;
        this._loadingView = loadingView;
    }
    /**
     * getGameConfig
     */
    Service.prototype.getGameConfig = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var _loop_1 = function (i) {
                _this._loadingView.onRemoteProgress(i + 1, _this._configrations.length);
                var resource = _this._configrations[i];
                if (Service.GAME_CONFIG == null || resource.name !== "gameConfig") {
                    var request = new egret.HttpRequest();
                    var respHandler = function (evt) {
                        switch (evt.type) {
                            case egret.Event.COMPLETE:
                                var request = evt.currentTarget;
                                var result = JSON.parse(request.response);
                                if (resource.name === "gameConfig") {
                                    Service.GAME_CONFIG = result;
                                }
                                resolve(result);
                                break;
                            case egret.IOErrorEvent.IO_ERROR:
                                resolve({
                                    message: "IO ERROR in" + resource.name
                                });
                                break;
                        }
                    };
                    // let progressHandler = function( evt:egret.ProgressEvent ):void{
                    //     console.log( "progress:", evt.bytesLoaded, evt.bytesTotal );
                    // }
                    request.once(egret.Event.COMPLETE, respHandler, _this);
                    request.once(egret.IOErrorEvent.IO_ERROR, respHandler, _this);
                    // request.once( egret.ProgressEvent.PROGRESS, progressHandler, this);
                    request.open(_this._baseURL + resource.url, egret.HttpMethod.GET);
                    request.send();
                }
                else {
                    resolve(Service.GAME_CONFIG);
                }
            };
            for (var i = 0; i < _this._configrations.length; i++) {
                _loop_1(i);
            }
        });
    };
    return Service;
}());
__reflect(Service.prototype, "Service");
//# sourceMappingURL=Service.js.map
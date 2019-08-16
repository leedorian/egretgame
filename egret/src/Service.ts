class Service {
    constructor(loadingView: LoadingUI) {
        this._loadingView = loadingView;
    }
    // private  _baseURL:string = "";
    // private  _gameConfig:string = this._baseURL + "resource/config/gameconfig.json";


    public static baseURL: string = "https://game.weiplus5.com/";
    public static gameStartURL: string = Service.baseURL + "index.php?m=game&v=startgame";
    public static gameScoreURL: string = Service.baseURL + "index.php?m=game&v=addGameScore";
    public static gameUseMagicURL: string = Service.baseURL + "index.php?m=game&v=useGameProp";
    public static GAME_CONFIG: any;
    public static MAGIC_CONFIG: any;
    private _loadingView: LoadingUI;
    private _configrations: Array<any> = [
        {
            url: "index.php?m=game&f=index&v=public_load_dtwconfig",
            name: "gameConfig"
        }
    ];
    private _loaded: number = 0;
    /**
     * getGameConfig
     */
    public getGameConfig(): any {
        return new Promise(resolve => {

            for (let i = 0; i < this._configrations.length; i++) {
                this._loadingView.onRemoteProgress(i + 1, this._configrations.length);
                let resource = this._configrations[i];
                if (Service.GAME_CONFIG == null || resource.name !== "gameConfig") {
                    let request: egret.HttpRequest = new egret.HttpRequest();
                    let respHandler = function (evt: egret.Event): void {
                        switch (evt.type) {
                            case egret.Event.COMPLETE:
                                var request: egret.HttpRequest = evt.currentTarget;
                                var result: any = JSON.parse(request.response);
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
                    }
                    // let progressHandler = function( evt:egret.ProgressEvent ):void{
                    //     console.log( "progress:", evt.bytesLoaded, evt.bytesTotal );
                    // }
                    request.once(egret.Event.COMPLETE, respHandler, this);
                    request.once(egret.IOErrorEvent.IO_ERROR, respHandler, this);
                    // request.once( egret.ProgressEvent.PROGRESS, progressHandler, this);
                    request.open(Service.baseURL + resource.url, egret.HttpMethod.GET);
                    request.send();
                } else {
                    resolve(Service.GAME_CONFIG);
                }
            }
        });
    }
    public static gameStart() {
        let request: egret.HttpRequest = new egret.HttpRequest();
        let respHandler = function (evt: egret.Event): void {
            switch (evt.type) {
                case egret.Event.COMPLETE:
                    var request: egret.HttpRequest = evt.currentTarget;
                    var result: any = JSON.parse(request.response);
                    if (result.status && result.status === "0") {
                        console.info("Service:GameStarted:Success");
                    } else {
                        console.error("Service:GameStarted:Error" + result.reason);
                    }
                    break;
                case egret.IOErrorEvent.IO_ERROR:
                    console.error("Service:GameStarted:Error");
                    break;
            }
        }
        // let progressHandler = function( evt:egret.ProgressEvent ):void{
        //     console.log( "progress:", evt.bytesLoaded, evt.bytesTotal );
        // }
        request.once(egret.Event.COMPLETE, respHandler, this);
        request.once(egret.IOErrorEvent.IO_ERROR, respHandler, this);
        // request.once( egret.ProgressEvent.PROGRESS, progressHandler, this);
        request.open(Service.gameStartURL + "&" + WxgUtils.getTokenParam(), egret.HttpMethod.GET);
        request.send();
    }
    //报分
    public static gameScore(oResult) {
        let request: egret.HttpRequest = new egret.HttpRequest();
        let respHandler = function (evt: egret.Event): void {
            switch (evt.type) {
                case egret.Event.COMPLETE:
                    var request: egret.HttpRequest = evt.currentTarget;
                    var result: any = JSON.parse(request.response);
                    if (result.status && result.status === "0") {
                        console.info("Service:GameScore:Success");
                    } else {
                        console.error("Service:GameScore:Error" + result.reason);
                    }
                    break;
                case egret.IOErrorEvent.IO_ERROR:
                    console.error("Service:GameScore:Error");
                    break;
            }
        };
        let oGdata = {
            "black_block": oResult.score.BlockNormalNumber,
            "blue_block": oResult.score.BlockDoubleNumber,
            "red_block": oResult.score.BlockRushNumber,
            "yellow_block": oResult.score.BlockBlinkNumber,
            "purple_block": oResult.score.BlockShrinkNumber
            // "speed_down_skill": 101, 
            // "urge_skill": 102, 
            // "clean_screen_skill": 103, 
            // "relive_skill": 104, 
            // "speed_up_skill": 105, 
            // "narrow_skill": 106
        };

        request.once(egret.Event.COMPLETE, respHandler, this);
        request.once(egret.IOErrorEvent.IO_ERROR, respHandler, this);
        request.open(Service.gameScoreURL + "&" + WxgUtils.getTokenParam() + "&level=" + oResult.level + "&score=" + oResult.score.score + "&gdata=" + JSON.stringify(oGdata), egret.HttpMethod.GET);
        request.send();
    }
    //使用道具
    public static useMagic(oResult) {
        return new Promise(resolve => {
            let request: egret.HttpRequest = new egret.HttpRequest();
            let respHandler = function (evt: egret.Event): void {
                switch (evt.type) {
                    case egret.Event.COMPLETE:
                        var request: egret.HttpRequest = evt.currentTarget;
                        var result: any = JSON.parse(request.response);
                        console.log(result);
                        if (result.status && result.status === "0") {
                            let magicData = JSON.parse(result.data);
                            resolve(magicData.num);
                            console.info("Service:UseMagic:Success");
                        } else {
                            console.error("Service:UseMagic:Error" + result.reason);
                        }
                        break;
                    case egret.IOErrorEvent.IO_ERROR:
                        console.error("Service:UseMagic:Error");
                        break;
                }
            };
            request.once(egret.Event.COMPLETE, respHandler, this);
            request.once(egret.IOErrorEvent.IO_ERROR, respHandler, this);
            request.open(Service.gameUseMagicURL + "&" + WxgUtils.getTokenParam() + "&m2gid=" + oResult.id, egret.HttpMethod.GET);
            request.send();
        });
    }
    //获取我的道具列表
    public getMyProlist(): Promise<any> {
        return new Promise(resolve => {
            var request = new egret.HttpRequest();
            var respHandler = function (evt) {
                switch (evt.type) {
                    case egret.Event.COMPLETE:
                        var request = evt.currentTarget;
                        var result = JSON.parse(request.response);
                        var magicConf = {
                            freeze: {
                                qty:0,
                                id:""
                            },
                            purify: {
                                qty:0,
                                id:""
                            },
                            destroy: {
                                qty:0,
                                id:""
                            },
                            quell: {
                                qty:0,
                                id:""
                            }
                        };
                        // console.log(request.response);
                        if (result.status == 0) {
                            for (var i = 0; i < result.rows.length; i++) {
                                var numTmp = parseInt(result.rows[i]["num"], 10);
                                var idTmp = result.rows[i]["id"];
                                var opertypeTmp = result.rows[i]["opertype"];
                                if (opertypeTmp == "speed") {
                                    magicConf.freeze.qty = numTmp;
                                    magicConf.freeze.id = idTmp;
                                } else if (opertypeTmp == "clear") {
                                    magicConf.purify.qty = numTmp;
                                    magicConf.purify.id = idTmp;
                                } else if (opertypeTmp == "lock") {
                                    magicConf.quell.qty = numTmp;
                                    magicConf.quell.id = idTmp;
                                } else if (opertypeTmp == "stillclear") {
                                    magicConf.destroy.qty = numTmp;
                                    magicConf.destroy.id = idTmp;
                                }
                            }
                            Service.MAGIC_CONFIG = magicConf;
                            resolve(magicConf);
                        } else {
                            //window.alert(result.reason+","+result.status);
                            console.log("err =>" + result.reason + "," + result.status);
                        }
                        break;
                    case egret.IOErrorEvent.IO_ERROR:
                        break;
                }
            };
            request.once(egret.Event.COMPLETE, respHandler, this);
            request.once(egret.IOErrorEvent.IO_ERROR, respHandler, this);
            var url = Constant.getMyProlist();
            url = url + "&" + WxgUtils.getTokenParam();
            console.log("#" + url);
            request.open(url, egret.HttpMethod.GET);
            request.send();
        });
    }
}

class Service {
    constructor(loadingView:LoadingUI) {
        this._loadingView = loadingView;
    }
    // private  _baseURL:string = "";
    // private  _gameConfig:string = this._baseURL + "resource/config/gameconfig.json";


    private  _baseURL:string = "https://game.weiplus5.com/";
    private  _gameConfig:string = this._baseURL + "index.php?m=game&f=index&v=public_load_dtwconfig";
    public static GAME_CONFIG:any;
    private _loadingView:LoadingUI;
    private _configrations:Array<any> = [
        {
            url: "index.php?m=game&f=index&v=public_load_dtwconfig",
            name: "gameConfig"
        }
    ];
    private _loaded:number = 0;
    /**
     * getGameConfig
     */
    public getGameConfig():any {
        return new Promise( resolve => {

            for (let i = 0; i < this._configrations.length; i++) {
                this._loadingView.onRemoteProgress(i + 1, this._configrations.length);
                let resource = this._configrations[i];
                if(Service.GAME_CONFIG == null || resource.name !== "gameConfig"){
                    let request:egret.HttpRequest = new egret.HttpRequest();
                    let respHandler = function( evt:egret.Event ):void{
                        switch ( evt.type ){
                            case egret.Event.COMPLETE:
                                var request:egret.HttpRequest = evt.currentTarget;
                                var result:any = JSON.parse(request.response);
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
                    request.once( egret.Event.COMPLETE, respHandler, this);
                    request.once( egret.IOErrorEvent.IO_ERROR, respHandler, this);
                    // request.once( egret.ProgressEvent.PROGRESS, progressHandler, this);
                    request.open( this._baseURL + resource.url, egret.HttpMethod.GET );
                    request.send();
                }else{
                    resolve(Service.GAME_CONFIG);
                }
            }
        });
    }
}

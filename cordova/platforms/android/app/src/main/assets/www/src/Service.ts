class Service {
    constructor() {

    }
    // private  _baseURL:string = "";
    // private  _gameConfig:string = this._baseURL + "resource/config/gameconfig.json";


    private  _baseURL:string = "https://game.weiplus5.com/";
    private  _gameConfig:string = this._baseURL + "index.php?m=game&f=index&v=public_load_dtwconfig";
    public static GAME_CONFIG:any;

    /**
     * getGameConfig
     */
    public getGameConfig():any {
        return new Promise( resolve => {
            if(Service.GAME_CONFIG === undefined){
                let request:egret.HttpRequest = new egret.HttpRequest();
                let respHandler = function( evt:egret.Event ):void{
                    switch ( evt.type ){
                        case egret.Event.COMPLETE:
                            var request:egret.HttpRequest = evt.currentTarget;
                            Service.GAME_CONFIG = JSON.parse(request.response);
                            resolve(Service.GAME_CONFIG);
                            break;
                        case egret.IOErrorEvent.IO_ERROR:
                            resolve({
                                message: "IO ERROR in" + this._gameConfig
                            });
                            break;
                    }
                }
                let progressHandler = function( evt:egret.ProgressEvent ):void{
                    console.log( "progress:", evt.bytesLoaded, evt.bytesTotal );
                }
                request.once( egret.Event.COMPLETE, respHandler, this);
                request.once( egret.IOErrorEvent.IO_ERROR, respHandler, this);
                request.once( egret.ProgressEvent.PROGRESS, progressHandler, this);
                request.open( this._gameConfig, egret.HttpMethod.GET );
                request.send();
            }else{
                resolve(Service.GAME_CONFIG);
            }
        });
    }
}

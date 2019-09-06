//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

import Timer = egret.Timer;

class Main extends egret.DisplayObjectContainer {


    private tokenTimer:Timer;
    public constructor() {
        super();

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        this.runGame().catch(e => {
            console.log(e);
        })
        
        this.tokenTimer = new egret.Timer(60000,0);
        this.tokenTimer.addEventListener(egret.TimerEvent.TIMER,this.localCheck,this);
        this.tokenTimer.start();
        this.localCheck();
    }

    private localCheck():void{
        var token = egret.localStorage.getItem(Constant.G_TOKEN_KEY);
        var expire = egret.localStorage.getItem(Constant.G_TOKEN_EXPIRE_KEY);
        var self = this;
        if (token == "" || expire == "" || Number(expire) < WxgUtils.getNowTimestamp()+300)
        {
            var request = new egret.HttpRequest();
            var respHandler = function (evt) {
                switch (evt.type) {
                    case egret.Event.COMPLETE:
                        var request = evt.currentTarget;
                        var result = JSON.parse(request.response);

                        if (result.status == 0)
                        {
                            egret.localStorage.setItem(Constant.G_TOKEN_KEY, result.token);
                            egret.localStorage.setItem(Constant.G_TOKEN_EXPIRE_KEY, result.expire);
                        } else {
                            //window.alert(result.reason+","+result.status);
                            console.log("gettoken err =>" + result.reason+","+result.status);
                        }
                        break;
                    case egret.IOErrorEvent.IO_ERROR:
                        break;
                }
            };
            var url = Constant.getGettokenUrl();
            egret.ExternalInterface.call("showtest", url);
            request.once(egret.Event.COMPLETE, respHandler, self);
            request.once(egret.IOErrorEvent.IO_ERROR, respHandler, self);

            var openid = egret.localStorage.getItem(Constant.G_OPENID_KEY);
            var uname = egret.localStorage.getItem(Constant.G_UNAME_KEY);
            if (Constant.isdebug)
            {
                if (openid == "" || openid == null || uname == null || uname == "")
                {
                    console.log("调用调试openid");
                    openid = "o7Vp401Z9LZaQoBfO1Zq_wfN7QSk";
                    egret.localStorage.setItem(Constant.G_UNAME_KEY, "g1561620209406139");
                }
            }
            url = url +"&openid="+openid;
            // console.log(url);
            request.open(url, egret.HttpMethod.GET);
            request.send();
        }
    }

    private async runGame() {
        await this.loadResource();
        await this.createGameScene();
        Toast.init( this, RES.getRes( "toast-bg_png" ) ); 
        this._attachEvents();
        // const result = await RES.getResAsync("description_json")
        // this.startAnimation(result);
        // await platform.login();
        // const userInfo = await platform.getUserInfo();
        // console.log(userInfo);

    }
    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }
    
    private async loadResource() {
        // this._loadingView = new LoadingUI();
        // this.stage.addChild(this._loadingView);
        // await RES.loadConfig("resource/default.res.json", "resource/");
        // RES.addEventListener( RES.ResourceEvent.GROUP_COMPLETE, this._onResourceLoadComplete, this );
        // RES.addEventListener( RES.ResourceEvent.GROUP_PROGRESS, this._onResourceProgress, this );
        // RES.addEventListener( RES.ResourceEvent.GROUP_LOAD_ERROR, this._onResourceLoadErr, this );
        // await RES.loadGroup("preload", 0);
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");

            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);

            this._gameService = new Service(loadingView);
            const gameConfig: any = await this._gameService.getGameConfig();
            this.stage.removeChild(loadingView);
            
        }
        catch (e) {
            console.error(e);
        }
    }

    // private _onResourceProgress( event:RES.ResourceEvent ):void {
    //     if( event.groupName=="preload" ){
    //         this._loadingView.onProgress( event.itemsLoaded,event.itemsTotal );
    //     }
    // }

    // private _onResourceLoadComplete( event:RES.ResourceEvent ):void {
    //     if( event.groupName=="preload" ){

    //     }
    // }

    // private _onResourceLoadErr( event:RES.ResourceEvent ):void {
    //     if( event.groupName=="preload" ){

    //     }
    // }

    // private _loadingView: LoadingUI;
    private textfield: egret.TextField;
    // private _gameScene: GameScene;
    private _GameScreen: GameScreen;
    private _startButton: UIComponents.DefaultButton;
    private _gameOverButton: UIComponents.DefaultButton;
    private _gameService: Service;
    /**
     * 创建游戏场景
     * Create a game scene
     */
    private async createGameScene() {
        //this.stage.setContentSize(Constant.DESIGN_WID, Constant.DESIGN_HEI);
        // this.stage.setContentSize(window.innerWidth, window.innerHeight);
        this.setNativeListener();

        //判断是否登录

        // this.checkLogin();
        this.index();
    }
    private checkLogin():void{
        var uid = egret.localStorage.getItem(Constant.G_UID_KEY);
        if (uid == null || uid == "")
        {
            this.login();
        } else {
            this.index();
        }
    }
    private index():void{
        this.removeChildren();
        var indexcon = new Indexcon();
        this.addChild(indexcon);
        var usertopScreen = new Usertop();
        this.addChild(usertopScreen);
        indexcon.addEventListener(GameEvent.GAME_START, this.startgame, this);
        indexcon.addEventListener(GameEvent.GAME_RANK, this.rank, this);
        indexcon.addEventListener(GameEvent.GAME_MESSAGE,this.message, this);
        indexcon.addEventListener(GameEvent.GAME_FRIEND, this.friend, this);
        indexcon.addEventListener(GameEvent.GAME_SETTING, this.setting, this);
        usertopScreen.addEventListener(GameEvent.GAME_SHOPSKILL, this.skillshop, this);
        this._testBtn();
    }
    private setting():void {
        this.removeChildren();
        var settingScreen = new Setting();
        settingScreen.addEventListener(GameEvent.GAME_INDEX,this.index, this);
        this.addChild(settingScreen);
    }
    private friend():void {
        this.removeChildren();
        var friendScreen = new Friend();
        this.addChild(friendScreen);
        friendScreen.addEventListener(GameEvent.GAME_INDEX, this.index, this);
        friendScreen.addEventListener(GameEvent.GAME_SEARCHFRIEND, this.searchuser, this);
    }
    private searchuser():void {
        this.removeChildren();
        var k = egret.localStorage.getItem(Constant.G_SEARCHUSER_KEY);
        var searchFriend = new SearchFriend(k);
        this.addChild(searchFriend);
        searchFriend.addEventListener(GameEvent.GAME_FRIEND, this.friend, this);
    }
    private login():void {
        this.removeChildren();
        const loginScreen = new Login();
        this.addChild(loginScreen);
    }
    //消息界面
    private message():void{
        this.removeChildren();
        var msgScreen = new Message();
        this.addChild(msgScreen);
        msgScreen.addEventListener(GameEvent.GAME_INDEX, this.index, this);
    }
    //排行榜
    private rank():void{
        this.removeChildren();
        var rankScreen = new Rank();
        this.addChild(rankScreen);
        rankScreen.addEventListener(GameEvent.GAME_INDEX, this.index, this);
    }
    //技能商店
    private skillshop():void{
        this.removeChildren();
        var shopskillScreen = new Shopskill();
        this.addChild(shopskillScreen);
        shopskillScreen.addEventListener(GameEvent.GAME_INDEX, this.index, this);
    }
    //游戏结束
    private gameover():void{
        this.removeChildren();
        var gameoverSkin = new Gameover();
        this.addChild(gameoverSkin);
        gameoverSkin.addEventListener(GameEvent.GAME_INDEX, this.index, this);
        gameoverSkin.addEventListener(GameEvent.GAME_START, this.startgame, this);
    }
    private setNativeListener(): void{
        var self_m1 = this;
        egret.ExternalInterface.addCallback("getcode",function(message:string){
            if (message != "")
            {
                window.alert(message);
            }
        });
        egret.ExternalInterface.addCallback("wxloginR",function(message:string){
            //console.log("message from Native is = "+message);
            if (message != "")
            {
                //进行http登录
                var request = new egret.HttpRequest();
                var respHandler = function (evt) {
                    switch (evt.type) {
                        case egret.Event.COMPLETE:
                            var request = evt.currentTarget;
                            var result = JSON.parse(request.response);

                            if (result.status == 0)
                            {
                                // window.alert(result.status + " | "+result.data.uid+" | " + new Date().toString());
                                egret.localStorage.setItem(Constant.G_UID_KEY, result.data.uid);
                                egret.localStorage.setItem(Constant.G_NICKNAME_KEY, result.data.truename);
                                var timestr:string = String((Constant.G_USEREXPIRETIME_KEY, Date.parse(new Date().toString())/1000));
                                egret.localStorage.setItem(Constant.G_USEREXPIRETIME_KEY,timestr);
                                egret.localStorage.setItem(Constant.G_UNAME_KEY, result.data.username);
                                self_m1.index();
                            } else {
                                window.alert(result.reason);
                            }
                            break;
                        case egret.IOErrorEvent.IO_ERROR:
                            break;
                    }
                };
                request.once(egret.Event.COMPLETE, respHandler, self_m1);
                request.once(egret.IOErrorEvent.IO_ERROR, respHandler, self_m1);
                var url = Constant.getLoginUrl();
                var msgArr = JSON.parse(message);
                egret.localStorage.setItem(Constant.G_OPENID_KEY, msgArr.openid);
                // egret.ExternalInterface.call("showtest", msgArr.openid);
                url = url +"&c="+encodeURIComponent(message)+"&type=weixin&openid="+msgArr.openid+"&unionid="+msgArr.unionid;
                request.open(url, egret.HttpMethod.GET);
                request.send();
            }
        });
        //google login
        egret.ExternalInterface.addCallback("googleloginR",function(message:string){
            console.log("message from Native google login is = "+message);
            if (message != "")
            {
                //进行http登录
                // var request = new egret.HttpRequest();
                // var respHandler = function (evt) {
                //     switch (evt.type) {
                //         case egret.Event.COMPLETE:
                //             var request = evt.currentTarget;
                //             var result = JSON.parse(request.response);

                //             if (result.status == 0)
                //             {
                //                 // window.alert(result.status + " | "+result.data.uid+" | " + new Date().toString());
                //                 egret.localStorage.setItem(Constant.G_UID_KEY, result.data.uid);
                //                 egret.localStorage.setItem(Constant.G_NICKNAME_KEY, result.data.truename);
                //                 var timestr:string = String((Constant.G_USEREXPIRETIME_KEY, Date.parse(new Date().toString())/1000));
                //                 egret.localStorage.setItem(Constant.G_USEREXPIRETIME_KEY,timestr);
                //                 egret.localStorage.setItem(Constant.G_UNAME_KEY, result.data.username);
                //                 self_m1.index();
                //             } else {
                //                 window.alert(result.reason);
                //             }
                //             break;
                //         case egret.IOErrorEvent.IO_ERROR:
                //             break;
                //     }
                // };
                // request.once(egret.Event.COMPLETE, respHandler, self_m1);
                // request.once(egret.IOErrorEvent.IO_ERROR, respHandler, self_m1);
                // var url = Constant.getLoginUrl();
                // var msgArr = JSON.parse(message);
                // egret.localStorage.setItem(Constant.G_OPENID_KEY, msgArr.openid);
                // // egret.ExternalInterface.call("showtest", msgArr.openid);
                // url = url +"&c="+encodeURIComponent(message)+"&type=weixin&openid="+msgArr.openid+"&unionid="+msgArr.unionid;
                // request.open(url, egret.HttpMethod.GET);
                // request.send();
            }
        });
    }

    //进入游戏界面
    private async startgame(){
        //window.alert("进入游戏界面");
        this.removeChildren();
        const magicConfig: any = await this._gameService.getMyProlist();
        this._GameScreen = new GameScreen();
        this.addChild(this._GameScreen);
        const startButtonWidth:number = Utils.getStageWidth()/2;
        console.log(Utils.getStageWidth());

        const startButtonHeight:number = 80;
        const startButton: UIComponents.DefaultButton =
            new UIComponents.DefaultButton(startButtonWidth,startButtonHeight,"Start");
        startButton.x = Utils.getStageWidth()/2 - startButtonWidth/2;
        startButton.y = Utils.getStageHeight() * 0.3;
        startButton.addEventListener("touchTap", this._startGame, this);
        this._startButton = startButton;
        this.addChild(startButton);

        const gameOverButtonWidth:number = Utils.getStageWidth()/2;
        const gameOverButtonHeight:number = 80;
        const gameOverButton: UIComponents.DefaultButton =
            new UIComponents.DefaultButton(gameOverButtonWidth,gameOverButtonHeight,"Game over");
        gameOverButton.x = Utils.getStageWidth()/2 - gameOverButtonWidth/2;
        gameOverButton.y = Utils.getStageHeight() * 0.3;
        gameOverButton.visible = false;
        gameOverButton.addEventListener("touchTap", this._restartGame, this);
        this._gameOverButton = gameOverButton;
        this.addChild(gameOverButton);

        //这里是测试代码 add by wuxiaoguang 20190426 start
        // const testButton: UIComponents.DefaultButton =
        //     new UIComponents.DefaultButton(startButtonWidth,startButtonHeight,"弹出层测试");
        // testButton.x = Utils.getStageWidth()/2 - startButtonWidth/2;
        // testButton.y = Utils.getStageHeight() * 0.5;
        // testButton.addEventListener("touchTap", this._testBtn, this);
        // this.addChild(testButton);
        //这里是测试代码 add by wuxiaoguang 20190426 end



    }
    private  _startGame() {
        this._startButton.visible = false;
        this._GameScreen.gameScene.gameStart();
    }
    private _testBtn(){
        //进入测试的界面
        console.log("点击了测试按钮哦..................我哈哈");
        var ymd = WxgUtils.getYmd(new Date().getTime());
        var lookYmd = egret.localStorage.getItem(Constant.G_FIRST_LOOKDATE);
        if(lookYmd == null || lookYmd == "" || lookYmd != ymd){
            egret.localStorage.setItem(Constant.G_FIRST_LOOKDATE, ymd);
            var taskUI = new TaskUI();
            taskUI.x = 0;
            taskUI.y = 0;
            this.addChild(taskUI);
        }
    }
    private _restartGame() {
        this._startButton.visible = true;
        this._gameOverButton.visible = false;
        this._GameScreen.reset();
    }

    private _attachEvents(){
        this.addEventListener(GameEvents.PlayEvent.GAME_OVER, this._gameOver, this);
    }
    private _gameOver(oEvent){
        // this._gameOverButton.visible = true;
        this.gameover();
    }


    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result: string[]) {
        let parser = new egret.HtmlTextParser();

        let textflowArr = result.map(text => parser.parse(text));
        let textfield = this.textfield;
        let count = -1;
        let change = () => {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            let textFlow = textflowArr[count];

            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            let tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, this);
        };

        change();
    }
}

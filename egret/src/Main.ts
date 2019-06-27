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

class Main extends egret.DisplayObjectContainer {



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



    }

    private async runGame() {
        await this.loadResource();
       await this.createGameScene();

        this._attachEvents();
        // const result = await RES.getResAsync("description_json")
        // this.startAnimation(result);
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);

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

            const gameService: Service = new Service(loadingView);
            const gameConfig: any = await gameService.getGameConfig();
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

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private async createGameScene() {
        this.stage.setContentSize(window.innerWidth, window.innerHeight);


        // let topMask = new egret.Shape();
        // topMask.graphics.beginFill(0x000000, 0.5);
        // topMask.graphics.drawRect(0, 0, stageW, 172);
        // topMask.graphics.endFill();
        // topMask.y = 33;
        // this.addChild(topMask);

        // let icon = this.createBitmapByName("egret_icon_png");
        // this.addChild(icon);
        // icon.x = 26;
        // icon.y = 33;

        // let line = new egret.Shape();
        // line.graphics.lineStyle(2, 0xffffff);
        // line.graphics.moveTo(0, 0);
        // line.graphics.lineTo(0, 117);
        // line.graphics.endFill();
        // line.x = 172;
        // line.y = 61;
        // this.addChild(line);


        // let colorLabel = new egret.TextField();
        // colorLabel.textColor = 0xffffff;
        // colorLabel.width = stageW - 172;
        // colorLabel.textAlign = "center";
        // colorLabel.text = "Hello Egret";
        // colorLabel.size = 24;
        // colorLabel.x = 172;
        // colorLabel.y = 80;
        // this.addChild(colorLabel);

        // let textfield = new egret.TextField();
        // this.addChild(textfield);
        // textfield.alpha = 0;
        // textfield.width = stageW - 172;
        // textfield.textAlign = egret.HorizontalAlign.CENTER;
        // textfield.size = 24;
        // textfield.textColor = 0xffffff;
        // textfield.x = 172;
        // textfield.y = 135;
        // this.textfield = textfield;




        this._GameScreen = new GameScreen();
        this.addChild(this._GameScreen);


        // gameScene.skewX = 3;
        // gameScene.skewY = 50;

        // gameScene.anchorOffsetX = gameScene.width/2;
        // gameScene.anchorOffsetY = gameScene.height/2;
        // gameScene.x = Utils.getStageWidth()/2;
        // gameScene.y = Utils.getStageHeight()/2;
        // gameScene.rotation = -45;
        // gameScene.scaleX = 0.5;
        // gameScene.scaleY = 0.5;

        // this._gameScene = gameScene;
        // this._gameScene.x =  Utils.horizontalMargin;
        // this._gameScene.y =  Utils.verticalMarginTop;
        // this.addChild(gameScene);

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
        
        
        // const loginScreen = new Login();
        
        // this.stage.addChild(loginScreen);

    }
    private _startGame() {
        this._startButton.visible = false;
        this._GameScreen.gameScene.gameStart();
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
        this._gameOverButton.visible = true;
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

class GameScreen extends egret.Sprite {
    public constructor(param: any = {}) {
        super();

        this._drawBg();
        this._drawGameScene();
        this._drawScore();
        this._drawMagics();
        this.addEventListener(
            GameEvents.BlockEvent.HIT,
            this._onHit,
            this,
            true
        );
        this.addEventListener(GameEvents.PlayEvent.GAME_OVER, this._gameOver, this);
        this.addEventListener(GameEvents.MagicEvent.UNFREEZE, this._enableMagic, this);
        this.addEventListener(GameEvents.MagicEvent.UNQUELL, this._enableMagic, this);
        this.addEventListener(GameEvents.MagicEvent.UNPURIFY, this._enableMagic, this);
        this.addEventListener(GameEvents.MagicEvent.DESTROY, this._enableMagic, this);

        this.addEventListener(
            GameEvents.PlayEvent.SCORE,
            this._onMagicScore,
            this,
            true
        );
    }

    private _score: Score;
    private _bg: egret.Bitmap;
    private _gameScene: GameScene;
    private _magicFreeze: MagicFreeze;
    private _magicQuell: MagicQuell;
    private _magicPurify: MagicPurify;
    private _magicDestroy: MagicDestroy;

    private _FreezeEffectMCs = [];
    private _QuellEffectMCs = [];
    private _PurifyEffectMCs = [];
    private _DestroyEffectMCs = [];

    private _drawBg() {
        this._bg = Utils.createBitmapByName("bg_png");
        const stageW = Utils.getStageWidth();
        const stageH = Utils.getStageHeight();
        const widthRate = stageW / this._bg.texture.bitmapData.width;
        const heightRate = stageH / this._bg.texture.bitmapData.height;
        this._bg.width = stageW;
        this._bg.height = stageH;
        this.addChild(this._bg);

        //亮光动画
        let data = RES.getRes("shanguang_json");
        let txtr = RES.getRes("shanguang_png");
        let mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
        let mc1: egret.MovieClip = new egret.MovieClip(mcFactory.generateMovieClipData("shanguang"));
        mc1.x = 425 * widthRate;
        mc1.y = 1415 * heightRate;
        mc1.scaleX = widthRate;
        mc1.scaleY = heightRate;

        // console.log(this._bg.texture.bitmapData.width+ "|" + this._bg.texture.bitmapData.height);
        // console.log(widthRate);
        // //var mc2:egret.MovieClip = new egret.MovieClip( mcFactory.generateMovieClipData( "mc2" ) );
        this.addChild(mc1);
        mc1.gotoAndPlay("shan", -1);
    }
    private _drawGameScene() {
        const gameScene = new GameScene({
            mode: GameMode.DOWN,
            level: GameLevel.EASY
        });
        this._gameScene = gameScene;
        this._gameScene.x = (Utils.getStageWidth() - Utils.getArenaWidth()) / 2;
        this._gameScene.y = Utils.verticalMarginTop;
        this.addChild(gameScene);
    }
    private _drawMagics() {
        let magicCount = 0;

        this._magicFreeze = new MagicFreeze();
        let itemWidth = this._magicFreeze.getBaseWidth();
        let itemSpace = (Utils.getStageWidth() - Utils.horizontalMargin * 2 - itemWidth * 4) / 3;
        this._magicFreeze.anchorOffsetY = this._magicFreeze.height;
        this._magicFreeze.x = magicCount * (itemSpace + itemWidth)+ Utils.horizontalMargin;
        this._magicFreeze.y = Utils.getStageHeight() - 20;
        this.addChild(this._magicFreeze);
        this._magicFreeze.addEventListener(egret.TouchEvent.TOUCH_TAP, this._freeze, this);
        magicCount++;

        this._magicQuell = new MagicQuell();
        this._magicQuell.anchorOffsetY = this._magicQuell.height;
        this._magicQuell.x = magicCount * (itemSpace + itemWidth)+ Utils.horizontalMargin;
        this._magicQuell.y = Utils.getStageHeight() - 20;
        this.addChild(this._magicQuell);
        this._magicQuell.addEventListener(egret.TouchEvent.TOUCH_TAP, this._quell, this);
        magicCount++;

        this._magicPurify = new MagicPurify();
        this._magicPurify.anchorOffsetY = this._magicPurify.height;
        this._magicPurify.x = magicCount * (itemSpace + itemWidth)+ Utils.horizontalMargin;
        this._magicPurify.y = Utils.getStageHeight() - 20;
        this.addChild(this._magicPurify);
        this._magicPurify.addEventListener(egret.TouchEvent.TOUCH_TAP, this._purify, this);
        magicCount++;

        this._magicDestroy = new MagicDestroy();
        this._magicDestroy.anchorOffsetY = this._magicDestroy.height;
        this._magicDestroy.x = magicCount * (itemSpace + itemWidth)+ Utils.horizontalMargin;
        this._magicDestroy.y = Utils.getStageHeight() - 20;
        this.addChild(this._magicDestroy);
        this._magicDestroy.addEventListener(egret.TouchEvent.TOUCH_TAP, this._destroy, this);

    }
    private _onHit(evt: GameEvents.BlockEvent) {
        this._score.score = this._score.score + 1;
    }
    private _drawScore() {
        this._score = new Score();
        this.addChild(this._score);
    }
    private _gameOver() {
        console.log(this._score.score);
    }
    private _handleMagicsState(reset?:boolean){
        var aMagic = [
            this._magicFreeze,
            this._magicQuell,
            this._magicPurify,
            this._magicDestroy
        ];
        const len = aMagic.length;
        
        for(var i = 0; i < len; i++){
            if(reset){
                aMagic[i].enable();
            }else{
                aMagic[i].disable();
            }
            
        }
    }

    private _setEffectMCSize(mc){
        const stageW = Utils.getStageWidth();
        const stageH = Utils.getStageHeight();
        const widthRate = stageW / 500;
        const heightRate = stageH / 889;

        mc.scaleX = widthRate;
        mc.scaleY = heightRate;
    }
    private _concatenateClips(aClips){
        const nClips = aClips.length;
        for(var i = 0; i < nClips; i++){
            let nextClip = aClips[i+1];
            let clip = aClips[i];
            let index = i;
            clip.addEventListener(egret.Event.COMPLETE, (e:egret.Event)=>{
                this.removeChild(clip);
                if(index < nClips - 1){
                    this.addChild(nextClip);
                    nextClip.gotoAndPlay(0);
                }
            }, this);
        }
    }
    private _createEffectClips(name, length){
        var aClips = [];
        for(var i = 1; i <= length; i++){
            const data = RES.getRes(name + i + "_json");
            const txtr = RES.getRes(name + i + "_png");
            const mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
            const mc: egret.MovieClip = new egret.MovieClip(mcFactory.generateMovieClipData(name));
            this._setEffectMCSize(mc);
            aClips.push(mc);
        }
        return aClips;
    }

    private _freeze(){
        if(this._gameScene.started && Utils.blockStyle.indexOf("freeze") === -1){
            Utils.blockStyle = Utils.blockStyle + "freeze";
            this._handleMagicsState();
            if(this._FreezeEffectMCs.length === 0){
                this._FreezeEffectMCs = this._createEffectClips("FreezeA", 6);
                this._concatenateClips(this._FreezeEffectMCs);
            }
            
            this.addChild(this._FreezeEffectMCs[0]);
            this._FreezeEffectMCs[0].gotoAndPlay(0);
            this._gameScene.freeze();
        }
    }
    private _enableMagic(){
        this._handleMagicsState(true);
    }
    private _quell(){
        if(this._gameScene.started && Utils.blockStyle.indexOf("quell") === -1){
            Utils.blockStyle = Utils.blockStyle + "quell";
            this._handleMagicsState();
            if(this._QuellEffectMCs.length === 0){
                this._QuellEffectMCs = this._createEffectClips("QuellA", 10);
                this._concatenateClips(this._QuellEffectMCs);
            }
            
            this.addChild(this._QuellEffectMCs[0]);
            this._QuellEffectMCs[0].gotoAndPlay(0);
            this._gameScene.quell();
        }
    }
    private _purify(){
        if(this._gameScene.started && Utils.blockStyle.indexOf("purify") === -1){
            Utils.blockStyle = Utils.blockStyle + "purify";
            this._handleMagicsState();
            if(this._PurifyEffectMCs.length === 0){
                this._PurifyEffectMCs = this._createEffectClips("PurifyA", 17);
                this._concatenateClips(this._PurifyEffectMCs);
            }
            
            this.addChild(this._PurifyEffectMCs[0]);
            this._PurifyEffectMCs[0].gotoAndPlay(0);
            this._gameScene.purify(this._score);
        }
    }
    private _destroy(){
        if(this._gameScene.started && Utils.blockStyle.indexOf("destroy") === -1){
            Utils.blockStyle = Utils.blockStyle + "destroy";
            this._handleMagicsState();
            if(this._DestroyEffectMCs.length === 0){
                this._DestroyEffectMCs = this._createEffectClips("DestroyA", 5);
                this._concatenateClips(this._DestroyEffectMCs);
            }
            
            this.addChild(this._DestroyEffectMCs[0]);
            this._DestroyEffectMCs[0].gotoAndPlay(0);
            this._gameScene.destroy();
        }
    }
    private _onMagicScore(evt:GameEvents.PlayEvent){
        var nScore:number = evt.score;
        this._score.score = this._score.score + nScore;
    }
    public reset() {
        this._score.score = 0;
        this._gameScene.reset();
        this._handleMagicsState(true);
    }
    public get gameScene() {
        return this._gameScene;
    }
}
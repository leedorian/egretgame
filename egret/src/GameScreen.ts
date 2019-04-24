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
    }

    private _score: Score;
    private _scoreNumber: number;
    private _bg: egret.Bitmap;
    private _gameScene: GameScene;
    private _magicFreeze: MagicFreeze;
    private _magicQuell: MagicQuell;
    private _magicPurify: MagicPurify;
    private _magicDestroy: MagicDestroy;

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
        magicCount++;

        this._magicQuell = new MagicQuell();
        this._magicQuell.anchorOffsetY = this._magicQuell.height;
        this._magicQuell.x = magicCount * (itemSpace + itemWidth)+ Utils.horizontalMargin;
        this._magicQuell.y = Utils.getStageHeight() - 20;
        this.addChild(this._magicQuell);
        magicCount++;

        this._magicPurify = new MagicPurify();
        this._magicPurify.anchorOffsetY = this._magicPurify.height;
        this._magicPurify.x = magicCount * (itemSpace + itemWidth)+ Utils.horizontalMargin;
        this._magicPurify.y = Utils.getStageHeight() - 20;
        this.addChild(this._magicPurify);
        magicCount++;

        this._magicDestroy = new MagicDestroy();
        this._magicDestroy.anchorOffsetY = this._magicDestroy.height;
        this._magicDestroy.x = magicCount * (itemSpace + itemWidth)+ Utils.horizontalMargin;
        this._magicDestroy.y = Utils.getStageHeight() - 20;
        this.addChild(this._magicDestroy);

    }
    private _onHit(evt: GameEvents.BlockEvent) {
        this._scoreNumber++;
        this._score.score = this._scoreNumber;
    }
    private _drawScore() {
        this._scoreNumber = 0;
        this._score = new Score();
        this.addChild(this._score);
    }
    private _gameOver() {
        console.log(this._score.score);
    }
    public reset() {
        this._score.score = 0;
        this._gameScene.reset();

    }
    public get gameScene() {
        return this._gameScene;
    }
}
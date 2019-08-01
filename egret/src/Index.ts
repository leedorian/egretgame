class Index extends egret.Sprite {
	public constructor() {
		super();
		this.init();
	}
	private init() {

        var stageW = Utils.getStageWidth();
        var stageH = Utils.getStageHeight();

        var indexcon = new Indexcon();
        this.addChild(indexcon);
        var usertopScreen = new Usertop();
        this.addChild(usertopScreen);
        
        //背景
        // var bg = new egret.Bitmap();
        // bg.texture = RES.getRes("Bg01_png");
        // bg.height = stageH/3;
        // bg.width = stageW;
        // bg.x = 0;
        // bg.y = stageH/6;
        // this.addChild(bg);
    }
}
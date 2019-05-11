class Score extends egret.Sprite {
    public constructor() {
        super();
        const scoreY:number = 20;
        const scoreHeight:number = 35;
        let bg:egret.Bitmap = Utils.createBitmapByName("bg_score_png");
        bg.height = scoreHeight;
        bg.width = Utils.getStageWidth() * 0.7;
        bg.x = (Utils.getStageWidth() - bg.width) / 2;
        bg.y = scoreY;
        this.addChild(bg);
        let label: egret.TextField = new egret.TextField();
        label.width = Utils.getStageWidth();
        label.y = scoreY;
        label.height = scoreHeight;
        label.textAlign = egret.HorizontalAlign.CENTER;
        label.verticalAlign = egret.VerticalAlign.MIDDLE;
        label.textColor = 0xffffff;
        label.strokeColor = 0xfff100;
        label.size = 26;
        label.textFlow = <Array<egret.ITextElement>>[
            {text: this._scorePrefix, style: {"size": 24}},
            {text: this._score.toString(), style: {"textColor":0xfff100}}
        ];
        // label.text = this._scorePrefix + this._score.toString();
        this._scoreText = label;
        this.addChild(this._scoreText);

        
    }
    private _scorePrefix = "Score: ";
    private _scoreText:egret.TextField;
    private _score:number = 0;
    public set score (score){
        this._score = score;
        this._scoreText.textFlow = <Array<egret.ITextElement>>[
            {text: this._scorePrefix, style: {"size": 24}},
            {text: this._score.toString(), style: {"textColor":0xfff100}}
        ];
    }
    public get score (){
        return this._score;
    }
}
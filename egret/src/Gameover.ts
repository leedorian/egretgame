class Gameover extends eui.Component implements  eui.UIComponent {
	private scoreLabel:eui.Label;
    private homepageBtn:eui.Button;
    private playBtn:eui.Button;
    private currentRankingLabel:eui.Label;
    private weekRankingLabel:eui.Label;

    private score:string = "";
	public constructor() {
		super();
        this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.initEui, this);
	}
    private initEui():void{
        //开始游戏
        this.playBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.playCallback, this);
        this.playBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.playCallback, this);
        this.playBtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.playCallback, this);
        //回到首页
        this.homepageBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.indexCallBack, this);
        this.homepageBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.indexCallBack, this);
        this.homepageBtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.indexCallBack, this);

        this.score = egret.localStorage.getItem(Constant.G_GAME_SCORE_KEY);
        this.scoreLabel.text = this.score;
        //获取当前名次
        this.loadMyRank();
    }
    private loadMyRank(){
        var self = this;
        var request = new egret.HttpRequest();
        var respHandler = function (evt) {
            switch (evt.type) {
                case egret.Event.COMPLETE:
                    var request = evt.currentTarget;
                    var result = JSON.parse(request.response);
                    if (result.status == 0)
                    {
                        var mydayrank = result.mydayrank;
                        var myweekrank = result.myweekrank;
                        self.currentRankingLabel.text = mydayrank;
                        self.weekRankingLabel.text = myweekrank;
                    } else {
                        Toast.launch(Constant.getErrorDesc(result.status));
                        //window.alert(result.reason+","+result.status);
                        console.log("getTaskList err =>" + result.reason+","+result.status);
                    }
                    break;
                case egret.IOErrorEvent.IO_ERROR:
                    break;
            }
        };
        request.once(egret.Event.COMPLETE, respHandler, self);
        request.once(egret.IOErrorEvent.IO_ERROR, respHandler, self);
        var url = Constant.getMyRankUrl();
        url = url +"&"+WxgUtils.getTokenParam();
        // console.log("#"+url);
        request.open(url, egret.HttpMethod.GET);
        request.send();
    }
    private playCallback(evt:egret.TouchEvent){
        if(evt.type == egret.TouchEvent.TOUCH_BEGIN){
            evt.currentTarget.scaleX = 1.05;
            evt.currentTarget.scaleY = 1.05;
        } else if(evt.type == egret.TouchEvent.TOUCH_END){
            evt.currentTarget.scaleX = 1.0;
            evt.currentTarget.scaleY = 1.0;
            var event:GameEvent = new GameEvent(GameEvent.GAME_START);
            this.dispatchEvent(event);  
        } else if(evt.type == egret.TouchEvent.TOUCH_RELEASE_OUTSIDE){
            evt.currentTarget.scaleX = 1.0;
            evt.currentTarget.scaleY = 1.0;
        }
    }
    private indexCallBack(evt:egret.TouchEvent){
        if(evt.type == egret.TouchEvent.TOUCH_BEGIN){
            evt.currentTarget.scaleX = 1.05;
            evt.currentTarget.scaleY = 1.05;
        } else if(evt.type == egret.TouchEvent.TOUCH_END){
            evt.currentTarget.scaleX = 1.0;
            evt.currentTarget.scaleY = 1.0;
            var event:GameEvent = new GameEvent(GameEvent.GAME_INDEX);
            this.dispatchEvent(event);  
        } else if(evt.type == egret.TouchEvent.TOUCH_RELEASE_OUTSIDE){
            evt.currentTarget.scaleX = 1.0;
            evt.currentTarget.scaleY = 1.0;
        }
    }
}
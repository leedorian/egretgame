class Gameover extends eui.Component implements  eui.UIComponent {
	private scoreLabel:eui.Label;
    private homepageBtn:eui.Button;
    private playBtn:eui.Button;
    private currentRankingLabel:eui.Label;
    private weekRankingLabel:eui.Label;
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


class Indexcon  extends eui.Component implements eui.UIComponent {
    private playgame:eui.Button;
    private rankImg:eui.Button;
    private faceImg:eui.Button;
    private settingImg:eui.Button;
    private scoreImg:eui.Button;
    private faceIcon:eui.Image;
    private scoreIcon:eui.Image;
	public constructor() {
		super();
        this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.initEui, this);
		//this.init();
        
	}
    private initEui():void{
        //开始游戏
        this.playgame.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.playgameBtnCallback, this);
        this.playgame.addEventListener(egret.TouchEvent.TOUCH_END, this.playgameBtnCallback, this);
        this.playgame.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.playgameBtnCallback, this);
        //榜单
        this.rankImg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.rankBtnCallback, this);
        this.rankImg.addEventListener(egret.TouchEvent.TOUCH_END, this.rankBtnCallback, this);
        this.rankImg.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.rankBtnCallback, this);
        //setting
        this.settingImg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.settingBtnCallback, this);
        this.settingImg.addEventListener(egret.TouchEvent.TOUCH_END, this.settingBtnCallback, this);
        this.settingImg.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.settingBtnCallback, this);
        //好友
        this.faceImg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.faceBtnCallback, this);
        this.faceImg.addEventListener(egret.TouchEvent.TOUCH_END, this.faceBtnCallback, this);
        this.faceImg.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.faceBtnCallback, this);
        //信息
        this.scoreImg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.msgBtnCallback, this);
        this.scoreImg.addEventListener(egret.TouchEvent.TOUCH_END, this.msgBtnCallback, this);
        this.scoreImg.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.msgBtnCallback, this);

    }
    private msgBtnCallback(evt:egret.TouchEvent):void{
        
        if(evt.type == egret.TouchEvent.TOUCH_BEGIN){
            evt.currentTarget.scaleX = 1.05;
            evt.currentTarget.scaleY = 1.05;
        } else if(evt.type == egret.TouchEvent.TOUCH_END){
            evt.currentTarget.scaleX = 1.0;
            evt.currentTarget.scaleY = 1.0;
            var event:GameEvent = new GameEvent(GameEvent.GAME_MESSAGE);
            this.dispatchEvent(event);  
        } else if(evt.type == egret.TouchEvent.TOUCH_RELEASE_OUTSIDE){
            evt.currentTarget.scaleX = 1.0;
            evt.currentTarget.scaleY = 1.0;
        }
    }
    private faceBtnCallback(evt:egret.TouchEvent):void{
        
        if(evt.type == egret.TouchEvent.TOUCH_BEGIN){
            evt.currentTarget.scaleX = 1.05;
            evt.currentTarget.scaleY = 1.05;
        } else if(evt.type == egret.TouchEvent.TOUCH_END){
            evt.currentTarget.scaleX = 1.0;
            evt.currentTarget.scaleY = 1.0;
            var event:GameEvent = new GameEvent(GameEvent.GAME_FRIEND);
            this.dispatchEvent(event);  
        } else if(evt.type == egret.TouchEvent.TOUCH_RELEASE_OUTSIDE){
            evt.currentTarget.scaleX = 1.0;
            evt.currentTarget.scaleY = 1.0;
        }
    }
    private settingBtnCallback(evt:egret.TouchEvent):void{
        console.log("settingBtnCallback.......");
        if(evt.type == egret.TouchEvent.TOUCH_BEGIN){
            evt.currentTarget.scaleX = 1.05;
            evt.currentTarget.scaleY = 1.05;
        } else if(evt.type == egret.TouchEvent.TOUCH_END){
            evt.currentTarget.scaleX = 1.0;
            evt.currentTarget.scaleY = 1.0;
            var event:GameEvent = new GameEvent(GameEvent.GAME_SETTING);
            this.dispatchEvent(event);  
        } else if(evt.type == egret.TouchEvent.TOUCH_RELEASE_OUTSIDE){
            evt.currentTarget.scaleX = 1.0;
            evt.currentTarget.scaleY = 1.0;
        }
    }
    private rankBtnCallback(evt:egret.TouchEvent):void{
        console.log("rankBtnCallback.......");
        if(evt.type == egret.TouchEvent.TOUCH_BEGIN){
            evt.currentTarget.scaleX = 1.05;
            evt.currentTarget.scaleY = 1.05;
        } else if(evt.type == egret.TouchEvent.TOUCH_END){
            evt.currentTarget.scaleX = 1.0;
            evt.currentTarget.scaleY = 1.0;
            var event:GameEvent = new GameEvent(GameEvent.GAME_RANK);
            this.dispatchEvent(event);  
        } else if(evt.type == egret.TouchEvent.TOUCH_RELEASE_OUTSIDE){
            evt.currentTarget.scaleX = 1.0;
            evt.currentTarget.scaleY = 1.0;
        }
    }
    //开始游戏
	private playgameBtnCallback(evt:egret.TouchEvent):void{
        console.log("playgameBtnCallback...............");
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
	
}
import Bitmap = egret.Bitmap;

class Usertop  extends eui.Component implements eui.UIComponent {
    private power:number;
    private nickname:string;
    private money:string;
    
    public nickText:eui.Label;
    public moneyText:eui.Label;
    public powerText:eui.Label;
    public powerTimer:egret.Timer;
    public avater:eui.Image;
    private power1:eui.Image;
    private power2:eui.Image;
    private power3:eui.Image;
    private power4:eui.Image;
    private power5:eui.Image;
    private addmoney:eui.Image;
    private avamask:eui.Rect;
	public constructor() {
		super();
        this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.initEui, this);
		//this.init();
        
	}
    private initEui():void{
        this.addmoney.touchEnabled = true;
        this.addmoney.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoShop, this);
        //console.log(this.nickText.text);
        this.loadUserInfo();
		this.getActionPoint();
        this.avater.mask = this.avamask;
    }
    private gotoShop():void{
        var event:GameEvent = new GameEvent(GameEvent.GAME_SHOPSKILL);
        this.dispatchEvent(event);  
    }
	private loadUserInfo():void
    {
        var self00 = this;
        var request = new egret.HttpRequest();
        var respHandler = function (evt) {
            switch (evt.type) {
                case egret.Event.COMPLETE:
                    var request = evt.currentTarget;
                    var result = JSON.parse(request.response);

                    if (result.status == 0)
                    {
                        self00.money = result.data.money;
                        console.log("#####"+self00.moneyText.text);
                        
                        self00.moneyText.text = String(Number(self00.money));
                        var thumb = result.data.thumb;
                        if (thumb != null && thumb != "")
                        {
                            self00.loadAvater(thumb);
                        }
                        self00.nickname = result.data.truename;
                        self00.nickText.text = self00.nickname;
                    } else {
                        //window.alert(result.reason+","+result.status);
                        console.log("getuserinfo err =>" + result.reason+","+result.status);
                    }
                    break;
                case egret.IOErrorEvent.IO_ERROR:
                    break;
            }
        };
        request.once(egret.Event.COMPLETE, respHandler, self00);
        request.once(egret.IOErrorEvent.IO_ERROR, respHandler, self00);
        var url = Constant.getUserinfoUrl();
        url = url +"&"+WxgUtils.getTokenParam();
        console.log("#"+url);
        request.open(url, egret.HttpMethod.GET);
        request.send();
    }
    private loadAvater(url:string):void
    {
        var self11 = this;
        let imgLoader = new egret.ImageLoader();
        imgLoader.crossOrigin = "anonymous";// 跨域请求
        imgLoader.load(url);// 去除链接中的转义字符‘\’
        imgLoader.once(egret.Event.COMPLETE, function (evt: egret.Event) {
            if (evt.currentTarget.data) {
                //egret.log("加载头像成功: " + evt.currentTarget.data);
                let texture = new egret.Texture();
                texture.bitmapData = evt.currentTarget.data;
                self11.avater.texture = texture;
            }
        }, this);
    }
    private countDown():void
    {
        if (this.power > 0)
        {
            this.power--;
            this.powerText.text = WxgUtils.getTimeStr(this.power);
        } else {
            this.powerTimer.stop();
            this.getActionPoint();
        }
    }
    private getActionPoint():void
    {
        var self22 = this;
        var request = new egret.HttpRequest();
        var respHandler = function (evt) {
            switch (evt.type) {
                case egret.Event.COMPLETE:
                    var request = evt.currentTarget;
                    var result = JSON.parse(request.response);
                    if (result.status == 0)
                    {
                        var actionpoint = Number(result.data);
                        for (var i=0;i<actionpoint;i++)
                        {
                            // var tmpQuqi:egret.Bitmap =  <egret.Bitmap>self22.getChildByName("quqi_"+i);
                            // tmpQuqi.texture = RES.getRes("quqi_png");
                            switch (i) {
                                case 0:
                                    self22.power1.texture = RES.getRes("quqi_png");
                                    break;
                                case 1:
                                    self22.power2.texture = RES.getRes("quqi_png");
                                    break;
                                case 2:
                                    self22.power3.texture = RES.getRes("quqi_png");
                                    break;
                                case 3:
                                    self22.power4.texture = RES.getRes("quqi_png");
                                    break;
                                case 4:
                                    self22.power5.texture = RES.getRes("quqi_png");
                                    break;
                            }
                        }
                        var oversec = result.oversec;
                        self22.powerText.text = oversec;
                        self22.power = Number(oversec);
                        if (Number(oversec) > 0)
                        {
                            self22.powerTimer = new egret.Timer(1000, 0);
                            self22.powerTimer.addEventListener(egret.TimerEvent.TIMER,self22.countDown,self22);
                            self22.powerTimer.start();
                        }
                        console.log(actionpoint + " | " + oversec);
                    } else {
                        //window.alert(result.reason+","+result.status);
                        console.log("getActionPoint err =>" + result.reason+","+result.status);
                    }
                    break;
                case egret.IOErrorEvent.IO_ERROR:
                    break;
            }
        };
        request.once(egret.Event.COMPLETE, respHandler, self22);
        request.once(egret.IOErrorEvent.IO_ERROR, respHandler, self22);
        var url = Constant.getActionpointUrl();
        url = url +"&"+WxgUtils.getTokenParam();
        console.log("#"+url);
        request.open(url, egret.HttpMethod.GET);
        request.send();
    }
	private init() {
        // //console.log("init123123 ........");
        // var stageW = Utils.getStageWidth();
        // var stageH = Utils.getStageHeight();
        // console.log("w = "  + stageW);
        // var bgHei = stageH*0.12;
        // //背景
        // var bg = new egret.Bitmap();
        // bg.texture = RES.getRes("indextop_png");
        // bg.height = bgHei;
        // bg.width = stageW;
        // bg.x = 0;
        // bg.y = 0;
        // this.addChild(bg);
        // //头像
        // this.avater = new egret.Bitmap();
        // this.avater.texture = RES.getRes("indexadd_png");
        // this.avater.height = bgHei*0.81;
        // // avater.width = stageW*0.153;
        // this.avater.width = bgHei*0.81;
        // this.avater.x =  stageW*0.07;
        // this.avater.y = bgHei*0.14;
        // this.addChild(this.avater);
        // //昵称
        // var nickBg = new egret.Bitmap();
        // nickBg.texture = RES.getRes("namelabel_png");
        // nickBg.height = bgHei*0.31;
        // nickBg.width = stageW*0.243;
        // nickBg.x = stageW*0.25;
        // nickBg.y = bgHei*0.236;
        // this.addChild(nickBg);
        // this.nickText = new egret.TextField();
        // this.nickText.height = bgHei*0.31;
        // this.nickText.width = stageW*0.243;
        // this.nickText.x = nickBg.x + nickBg.width/8;
        // this.nickText.y = bgHei*0.3;
        // this.nickText.size = 20;
        // this.nickText.text = "";
        // this.addChild(this.nickText);
        // //添加体力
        // var quqiCount = 5;
        // for (var i = 0; i < quqiCount; i++)
        // {
        //     var quqiImg = new Bitmap();
        //     quqiImg.texture = RES.getRes("quqi_b_png");
        //     quqiImg.width = bgHei*0.27;
        //     quqiImg.height = bgHei*0.27;
        //     quqiImg.x = stageW*0.25 + i*quqiImg.width*1.25;
        //     quqiImg.y = bgHei*0.66;
        //     quqiImg.name = "quqi_"+i;
        //     this.addChild(quqiImg);
        // }
        // //金钱
        // var moneyBg = new egret.Bitmap();
        // moneyBg.texture = RES.getRes("namelabel_png");
        // moneyBg.height = bgHei*0.31;
        // moneyBg.width = stageW*0.26;
        // moneyBg.x = stageW * 0.62;
        // moneyBg.y = bgHei*0.236;
        // this.addChild(moneyBg);
        // this.moneyText = new egret.TextField();
        // this.moneyText.height = bgHei*0.31;
        // this.moneyText.width = stageW*0.26;
        // this.moneyText.x = moneyBg.x + moneyBg.width/8;
        // this.moneyText.y = bgHei*0.3;
        // this.moneyText.size = 20;
        // this.moneyText.text = "";
        // this.addChild(this.moneyText);
        // var moneyImg = new egret.Bitmap();
        // moneyImg.texture = RES.getRes("money_png");
        // moneyImg.width = bgHei*0.5;
        // moneyImg.height = bgHei*0.5;
        // moneyImg.x = stageW * 0.57;
        // moneyImg.y = bgHei*0.2;
        // this.addChild(moneyImg);
        // var moneyAdd = new egret.Bitmap();
        // moneyAdd.texture = RES.getRes("indexadd_png");
        // moneyAdd.width = bgHei*0.34;
        // moneyAdd.height = bgHei*0.34;
        // moneyAdd.x = stageW*0.82;
        // moneyAdd.y = moneyBg.y ;
        // moneyAdd.touchEnabled = true;
        // moneyAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
        //     console.log("点击了添加金币按钮.........");
        // }, this);
        // this.addChild(moneyAdd);
        // //时间戳
        // var timebg = new egret.Bitmap();
        // timebg.texture = RES.getRes("namelabel_png");
        // timebg.width = stageW*0.2;
        // timebg.height = bgHei*0.31;
        // timebg.x = stageW * 0.64;
        // timebg.y = bgHei*0.66;
        // this.addChild(timebg);
        // var powerAdd = new egret.Bitmap();
        // powerAdd.texture = RES.getRes("indexadd_png");
        // powerAdd.width = bgHei*0.34;
        // powerAdd.height = bgHei*0.34;
        // powerAdd.x = stageW*0.82;
        // powerAdd.y = bgHei*0.66 ;
        // powerAdd.touchEnabled = true;
        // powerAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
        //     console.log("点击了添加曲奇按钮.........");
        // }, this);
        // this.addChild(powerAdd);
        // this.powerText = new egret.TextField();
        // this.powerText.height = bgHei*0.34;
        // this.powerText.width = stageW*0.26;
        // this.powerText.x = timebg.x + timebg.width/8;
        // this.powerText.y = bgHei*0.75;
        // this.powerText.size = 20;
        // this.powerText.text = "01:01";
        // this.addChild(this.powerText);
    }
}
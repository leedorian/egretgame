class Friend extends eui.Component implements eui.UIComponent {
    private datascroll:eui.Scroller;
    private datalist:eui.List;
    private back:eui.Image;
    private searchkey:eui.EditableText;
    private friendSearch:eui.Image;
    private friendAdd:eui.Image;
    private reqlabel:eui.Label;
	public constructor() {
		super();
        this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.initEui, this);
	}
    private initEui():void{
        this.back.touchEnabled = true;
        this.back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backToIndex, this);
   
        this.friendSearch.touchEnabled = true;
        this.friendSearch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.searchUser, this);

        this.loadFriendList();
        this.loadApplyList();
    }
    private searchUser():void{
        console.log("searchUser.......................");
        var s = this.searchkey.text;
        if (s != null && s != "")
        {
            egret.localStorage.setItem(Constant.G_SEARCHUSER_KEY, this.searchkey.text);
            var event:GameEvent = new GameEvent(GameEvent.GAME_SEARCHFRIEND);
            this.dispatchEvent(event);
        } else {
            Toast.launch( "请输入用户检索关键字.." ); 
        }
    }

    private backToIndex():void {
        var event:GameEvent = new GameEvent(GameEvent.GAME_INDEX);
        this.dispatchEvent(event);
    }
    //加载审核列表
    private loadApplyList():void { 
        var self22 = this;
        var request = new egret.HttpRequest();
        var respHandler = function (evt) {
            switch (evt.type) {
                case egret.Event.COMPLETE:
                    var request = evt.currentTarget;
                    console.log(request.response);
                    var result = JSON.parse(request.response);
                    if (result.status == 0)
                    {
                        var dataCount:number = Number(result.count);
                        self22.reqlabel.text = dataCount+"个好友请求";
                        if(dataCount > 0 )
                        {
                            var rankBgRes = "";
                            if(dataCount > 5) {
                                dataCount = 5;
                            }
                            for(var i=0;i<dataCount;i++) {
                                var avaterUrl = result.rows[i].avater;
                                // var avaterUrl = "https://game.weiplus5.com/index.php?m=member&f=index&v=public_echoImg";
                                
                                var avaterImg = new eui.Image();
                                let imgLoader = new egret.ImageLoader();
                                imgLoader.crossOrigin = "anonymous";
                                imgLoader.load(avaterUrl);
                                imgLoader.once(egret.Event.COMPLETE, (evt: egret.Event)=> {
                                    if (evt.currentTarget.data) {
                                        let texture = new egret.Texture();
                                        texture.bitmapData = evt.currentTarget.data;
                                        avaterImg.source = texture;
                                    }
                                }, this);
                                avaterImg.x = 58 + i*100;
                                avaterImg.y = 428;
                                avaterImg.width = 90;
                                avaterImg.height = 90;
                                self22.addChild(avaterImg);
                            }
                        }
                    } else {
                        //window.alert(result.reason+","+result.status);
                        console.log("loadApplyList err =>" + result.reason+","+result.status);
                    }
                    break;
                case egret.IOErrorEvent.IO_ERROR:
                    break;
            }
        };
        request.once(egret.Event.COMPLETE, respHandler, self22);
        request.once(egret.IOErrorEvent.IO_ERROR, respHandler, self22);
        var url = Constant.getFriendApplyList();
        url = url +"&"+WxgUtils.getTokenParam();
        console.log("#"+url);
        request.open(url, egret.HttpMethod.GET);
        request.send();
    }

    //获取
    private loadFriendList():void
    {
        var self22 = this;
        var request = new egret.HttpRequest();
        var respHandler = function (evt) {
            switch (evt.type) {
                case egret.Event.COMPLETE:
                    var request = evt.currentTarget;
                    console.log(request.response);
                    var result = JSON.parse(request.response);
                    if (result.status == 0)
                    {
                        // self22.datalist.dataProvider = result.rows;
                        var dataCount:number = Number(result.count);
                        if(dataCount > 0 )
                        {
                            var rankBgRes = "";
                            self22.datalist.dataProvider = new eui.ArrayCollection(result.rows);
                            self22.datalist.itemRenderer = FriendListIRSkin;
                        }
                    } else {
                        //window.alert(result.reason+","+result.status);
                        console.log("loadList err =>" + result.reason+","+result.status);
                    }
                    break;
                case egret.IOErrorEvent.IO_ERROR:
                    break;
            }
        };
        request.once(egret.Event.COMPLETE, respHandler, self22);
        request.once(egret.IOErrorEvent.IO_ERROR, respHandler, self22);
        var url = Constant.getFriendlistUrl();
        url = url +"&"+WxgUtils.getTokenParam();
        console.log("#"+url);
        request.open(url, egret.HttpMethod.GET);
        request.send();
    }
}

class FriendListIRSkin extends eui.ItemRenderer {
    private avater:eui.Image;
    private rank:eui.Label;
    private nickname:eui.Label;
    private score:eui.Label;
    private sendactionpointBtn:eui.Image;
    constructor() {
        super();
        this.skinName = "resource/skins/Frienditem.exml";
    }

    protected dataChanged():void{
        var self = this;
        let imgLoader = new egret.ImageLoader();
        imgLoader.crossOrigin = "anonymous";
        imgLoader.load(this.data.avater);
        imgLoader.once(egret.Event.COMPLETE, (evt: egret.Event)=> {
            if (evt.currentTarget.data) {
                let texture = new egret.Texture();
                texture.bitmapData = evt.currentTarget.data;
                self.avater.source = texture;
            }
        }, this);
        this.rank.text = this.data.n;
        this.score.text = this.data.totalscore;
        this.nickname.text = this.data.truename;
        if(this.data.giftuid == null || this.data.giftuid == "null" || this.data.giftuid == "") {
            this.sendactionpointBtn.texture = RES.getRes("actionpoint_send_on_png");
            this.sendactionpointBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendActionPorint, this);
        } else {
            this.sendactionpointBtn.texture = RES.getRes("actionpoint_send_off_png");
        }
        console.log("ffffuck="+this.data.giftuid);
    }

    private sendActionPorint():void{
        var touid = this.data.touid;
        var self22 = this;
        var request = new egret.HttpRequest();
        var respHandler = function (evt) {
            switch (evt.type) {
                case egret.Event.COMPLETE:
                    var request = evt.currentTarget;
                    console.log(request.response);
                    var result = JSON.parse(request.response);
                    if (result.status == 0)
                    {
                        self22.sendactionpointBtn.texture = RES.getRes("actionpoint_send_off_png");
                        self22.sendactionpointBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, null, this);
                        Toast.launch("赠送成功");
                    } else {
                        //window.alert(result.reason+","+result.status);
                        console.log("loadList err =>" + result.reason+","+result.status);
                    }
                    break;
                case egret.IOErrorEvent.IO_ERROR:
                    break;
            }
        };
        request.once(egret.Event.COMPLETE, respHandler, self22);
        request.once(egret.IOErrorEvent.IO_ERROR, respHandler, self22);
        var url = Constant.giveActionPointUrl();
        url = url + "&touid="+touid +"&"+WxgUtils.getTokenParam();
        console.log("#"+url);
        request.open(url, egret.HttpMethod.GET);
        request.send();
    }
}
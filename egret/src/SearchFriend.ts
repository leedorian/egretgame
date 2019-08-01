class SearchFriend extends eui.Component implements eui.UIComponent {
    private searchKeyStr:string;
    private back:eui.Image;
    private searchUserkey:eui.EditableText;
    private datalist:eui.List;
    private friendSearch:eui.Image;
    private datascroll:eui.Scroller;
	public constructor(searchKeyTmp:string) {
		super();
        this.searchKeyStr = searchKeyTmp;
        this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.initEui, this);
	}
    private initEui():void{
        if (this.searchKeyStr != null && this.searchKeyStr != ""){
            this.loadSearchList();
        }
        this.back.touchEnabled = true;
        this.back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backToBef, this);
        this.friendSearch.touchEnabled = true;
        this.friendSearch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.searchUser, this);
    }

    private searchUser():void{
        var text = this.searchUserkey.text;
        if(text != null && text != "")
        {
            this.searchKeyStr = text;
            this.loadSearchList();
        }
    }


    private backToBef():void{
        console.log("backToBef.........");
        var event:GameEvent = new GameEvent(GameEvent.GAME_FRIEND);
        this.dispatchEvent(event);
    }

    //获取
    private loadSearchList():void
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
                        var dataCount:number = Number(result.count);
                        if(dataCount > 0 )
                        {
                            self22.datascroll.removeChildren();
                            self22.datalist = new eui.List();
                            self22.datalist.width = 1080;
                            self22.datalist.height = 1613;
                            self22.datascroll.addChild(self22.datalist);
                            self22.datalist.dataProvider = new eui.ArrayCollection(result.rows);
                            self22.datalist.itemRenderer = SearchFriendListIRSkin;
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
        var url = Constant.searchUserUrl();
        url = url +"&"+WxgUtils.getTokenParam()+"&nick="+self22.searchKeyStr;
        console.log("#"+url);
        request.open(url, egret.HttpMethod.GET);
        request.send();
    }
}

class SearchFriendListIRSkin extends eui.ItemRenderer {
    private avater:eui.Image;
    private nicktext:eui.Label;
    private addfriend:eui.Image;
    constructor() {
        super();
        this.skinName = "resource/skins/SearchFrienditem.exml";
    }

    protected dataChanged():void{
        let imgLoader = new egret.ImageLoader();
        imgLoader.crossOrigin = "anonymous";
        imgLoader.load(this.data.avater);
        imgLoader.once(egret.Event.COMPLETE, (evt: egret.Event)=> {
            if (evt.currentTarget.data) {
                let texture = new egret.Texture();
                texture.bitmapData = evt.currentTarget.data;
                this.avater.source = texture;
            }
        }, this);

        this.addfriend.touchEnabled = true;
        this.addfriend.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addFriend, this);
    }

    private addFriend():void{
        var touid = this.data.uid;
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
                        self22.addfriend.visible = false;
                        Toast.launch("添加好友成功");
                    } else {
                        //window.alert(result.reason+","+result.status);
                        Toast.launch("添加好友失败| err =>" + result.reason+","+result.status);
                        console.log("addFriendUrl err =>" + result.reason+","+result.status);
                    }
                    break;
                case egret.IOErrorEvent.IO_ERROR:
                    break;
            }
        };
        request.once(egret.Event.COMPLETE, respHandler, self22);
        request.once(egret.IOErrorEvent.IO_ERROR, respHandler, self22);
        var url = Constant.addFriendUrl();
        url = url +"&"+WxgUtils.getTokenParam()+"&touid="+touid;
        console.log("#"+url);
        request.open(url, egret.HttpMethod.GET);
        request.send();

    }
}
class Message extends eui.Component implements eui.UIComponent {
    private msgBtn:eui.Label;
    private rightLabel:eui.Label;
    private back:eui.Image;
    private dataScroll:eui.Scroller;
    private datalist:eui.List;
    private type:number = 1;      //1、信息（系统，公告等） 2、朋友互发的信息 (私信)

    private msg_Const:string = "信息";
    private friend_Const:string = "朋友"; 
	public constructor() {
		super();
        this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.initEui, this);
	}
    private initEui():void{
        this.rightLabel.touchEnabled = true;
        this.rightLabel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeLabelForRight, this);

        this.back.touchEnabled = true;
        this.back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoIndex, this);
        
        this.datalist.scrollEnabled = true;

        this.loadList("1,2,3,4");
    }

    private gotoIndex():void{
        var event:GameEvent = new GameEvent(GameEvent.GAME_INDEX);
        this.dispatchEvent(event);
    }

    private loadData():void
    {
        
    }

    private changeLabelForRight():void{
        var val = this.rightLabel.text;
        var types:string = "";
        if(val == this.msg_Const)
        {
            this.type = 1;
            this.rightLabel.text = this.friend_Const;
            this.msgBtn.text = this.msg_Const;
            types = "1,2,3,4";
        } else {
            this.type = 2;
            this.msgBtn.text = this.friend_Const;
            this.rightLabel.text = this.msg_Const;
            types = "0";
        }
        this.loadList(types);
    }
    private backToIndex():void{
        console.log("backToIndex........");
        var event:GameEvent = new GameEvent(GameEvent.GAME_INDEX);
        this.dispatchEvent(event);
    }
    private switchText(text:string):void{
        
    }
    private getMsgTypeImgPath(type:string):string{
        var resPath = "";
        if(type == "1")
        {
            resPath = "msgtype_sys_png";
        } else if(type == "2"){
            resPath = "msgtype_sys_png";
        } else if(type == "3"){
            resPath = "msgtype_act_png";
        } else if(type == "4"){
            resPath = "msg_service_png";
        } else if(type == "0"){
            resPath = "msgtype_sys_png";
        }
        return resPath;
    }
    private getMsgTypeText(type:string)
    {
        var text = "";
        if(type == "1")
        {
            text = "系统消息";
        } else if(type == "2"){
            text = "公告";
        } else if(type == "3"){
            text = "奖品公告";
        } else if(type == "4"){
            text = "服务公告";
        } else if(type == "0"){
            text = "私信";
        }
        return text;
    }
    //获取
    private loadList(types:string):void
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
                        self22.dataScroll.removeChildren();
                        self22.datalist = new eui.List();
                        self22.datalist.width = 1080;
                        self22.datalist.height = 1506;
                        
                        self22.dataScroll.addChild(self22.datalist);
                        var dataCount:number = Number(result.count);
                        if(dataCount > 0 )
                        {
                            var rankBgRes = "";
                            for(var i=0;i<dataCount;i++)
                            {
                                var msgtype = result.rows[i].msgtype;
                                var content = result.rows[i].content;
                                var addtime = result.rows[i].addtime;
                                // var msgitem = new Msgitem(self22.getMsgTypeImgPath(msgtype), self22.getMsgTypeText(msgtype), addtime, content);
                                // msgitem.y = (i) * 450;
                                // self22.dataScroll.addChild(msgitem);
                                result.rows[i].title = self22.getMsgTypeText(msgtype);
                                result.rows[i].typeimg = self22.getMsgTypeImgPath(msgtype);
                            }
                            self22.datalist.dataProvider = new eui.ArrayCollection(result.rows);
                            self22.datalist.itemRenderer = MsgListIRSkin;
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
        var url = Constant.getMsglistUrl();
        url = url +"&"+WxgUtils.getTokenParam()+"&types="+types;
        console.log("#"+url);
        request.open(url, egret.HttpMethod.GET);
        request.send();
    }
}

class MsgListIRSkin extends eui.ItemRenderer {
    constructor() {
        super();
        this.skinName = "resource/skins/Msgitem.exml";
    }
}
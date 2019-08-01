

class Rank  extends eui.Component implements eui.UIComponent {
    private label_bottom:eui.Label;
    private label_right:eui.Label;
    private label_left:eui.Label;
    private back:eui.Image;
    private contentScroller:eui.Scroller;
    private Const_todayRank:string = "日榜";
    private Const_weekRank:string = "周榜";
    private Const_singleRank:string = "单局榜";
    private showType:number = 1;//1、日榜  2、周榜  3、单局榜
	public constructor() {
		super();
        this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.initEui, this);
        
	}
    private initEui():void{
        this.label_bottom.touchEnabled = true;
        this.label_bottom.text = this.Const_todayRank;
        //this.label_bottom.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeLabelForBottom, this);
        this.label_left.touchEnabled = true;
        this.label_left.text = this.Const_weekRank;
        this.label_left.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeLabelForLeft, this);
        this.label_right.touchEnabled = true;
        this.label_right.text = this.Const_singleRank;
        this.label_right.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeLabelForRight, this);
        this.back.touchEnabled = true;
        this.back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backToIndex, this);
        this.loadRank();

    }
    private backToIndex():void{
        console.log("backToIndex........");
        var event:GameEvent = new GameEvent(GameEvent.GAME_INDEX);
        this.dispatchEvent(event);
    }
    private switchText(text:string):void{
        if(text == this.Const_todayRank)
        {
            this.showType = 1;
            this.label_bottom.text = this.Const_todayRank;
            this.label_left.text = this.Const_weekRank;
            this.label_right.text = this.Const_singleRank;
        } else if(text == this.Const_singleRank){
            this.showType = 3;
            this.label_bottom.text = this.Const_singleRank;
            this.label_left.text = this.Const_weekRank;
            this.label_right.text = this.Const_todayRank;
        } else if(text == this.Const_weekRank){
            this.showType = 2;
            this.label_bottom.text = this.Const_weekRank;
            this.label_left.text = this.Const_singleRank;
            this.label_right.text = this.Const_todayRank;
        }
        this.loadRank();
    }
    private changeLabelForBottom():void{
        
    }
    private changeLabelForLeft():void{
        
        var ttt = this.label_left.text;
        console.log("changeLabelForLeft....." + ttt);
        this.switchText(ttt);
    }
    private changeLabelForRight():void{
        
        var ttt = this.label_right.text;
        console.log("changeLabelForRight....." + ttt);
        this.switchText(ttt);
    }
    private loadRank():void
    {
        this.contentScroller.removeChildren();
        if(this.showType == 1){
            this.loadScoreList();
        } else if(this.showType == 2)
        {
            
        } else {
            this.loadSingleScoreList();
        }
    }
    private getRankPicRes(num:Number):string{
        var s:string = "";
        if(num == 1)
        {
            s = "rank_no1_png";
        } else if(num == 2)
        {
            s = "rank_no2_png";
        } else if(num == 3)
        {
            s = "rank_no3_png";
        } else {
            s = "rank_pic_png";
        }
        return s;
    }
    //获取日榜排行
    private loadScoreList():void
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
                        var myscore = result.myscore;
                        var myrank = result.myrank;
                        var myBgRes = "rank_blue_png";
                        var ranklistitem:Ranklistitem  = new Ranklistitem(result.avater,egret.localStorage.getItem(Constant.G_NICKNAME_KEY), myscore, self22.getRankPicRes(Number(myrank)), myrank, myBgRes);
                        self22.contentScroller.addChild(ranklistitem);
                        var dataCount:number = Number(result.count);
                        if(dataCount > 0 )
                        {
                            var rankBgRes = "";
                            for(var i=0;i<dataCount;i++)
                            {
                                var rscore = result.rows[i].rscore;
                                var uid = result.rows[i].uid;
                                var nick = result.rows[i].nick;
                                var photo = result.rows[i].photo;
                                if (i == 0 )
                                {
                                    rankBgRes = "rank_yellow_png";
                                } else if(i==1)
                                {
                                    rankBgRes = "rank_orange_png";
                                } else if(i==2)
                                {
                                    rankBgRes = "rank_red_png";
                                } else
                                {
                                    rankBgRes = "rank_green_png";
                                }
                                var ranklistitem:Ranklistitem  = new Ranklistitem(photo,nick, rscore, self22.getRankPicRes(i+1), String(i+1), rankBgRes);
                                ranklistitem.y = (i+1) * 130;
                                self22.contentScroller.addChild(ranklistitem);
                            }
                        }
                    } else {
                        //window.alert(result.reason+","+result.status);
                        console.log("loadScoreList err =>" + result.reason+","+result.status);
                    }
                    break;
                case egret.IOErrorEvent.IO_ERROR:
                    break;
            }
        };
        request.once(egret.Event.COMPLETE, respHandler, self22);
        request.once(egret.IOErrorEvent.IO_ERROR, respHandler, self22);
        var url = Constant.getRanklistUrl();
        url = url +"&"+WxgUtils.getTokenParam();
        console.log("#"+url);
        request.open(url, egret.HttpMethod.GET);
        request.send();
    }
    //获取周榜排行
    private loadWeekScoreList():void{
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
                        var myscore = result.myscore;
                        var myrank = result.myrank;
                        var myBgRes = "rank_blue_png";
                        var ranklistitem:Ranklistitem  = new Ranklistitem(result.avater,egret.localStorage.getItem(Constant.G_NICKNAME_KEY), myscore, self22.getRankPicRes(Number(myrank)), myrank, myBgRes);
                        self22.contentScroller.addChild(ranklistitem);
                        var dataCount:number = Number(result.count);
                        if(dataCount > 0 )
                        {
                            var rankBgRes = "";
                            for(var i=0;i<dataCount;i++)
                            {
                                var rscore = result.rows[i].rscore;
                                var uid = result.rows[i].uid;
                                var nick = result.rows[i].nick;
                                var photo = result.rows[i].photo;
                                if (i == 0 )
                                {
                                    rankBgRes = "rank_yellow_png";
                                } else if(i==1)
                                {
                                    rankBgRes = "rank_orange_png";
                                } else if(i==2)
                                {
                                    rankBgRes = "rank_red_png";
                                } else
                                {
                                    rankBgRes = "rank_green_png";
                                }
                                var ranklistitem:Ranklistitem  = new Ranklistitem(photo,nick, rscore, self22.getRankPicRes(i+1), String(i+1), rankBgRes);
                                ranklistitem.y = (i+1) * 130;
                                self22.contentScroller.addChild(ranklistitem);
                            }
                        }
                    } else {
                        //window.alert(result.reason+","+result.status);
                        console.log("loadScoreList err =>" + result.reason+","+result.status);
                    }
                    break;
                case egret.IOErrorEvent.IO_ERROR:
                    break;
            }
        };
        request.once(egret.Event.COMPLETE, respHandler, self22);
        request.once(egret.IOErrorEvent.IO_ERROR, respHandler, self22);
        var url = Constant.getWeekRanklistUrl();
        url = url +"&"+WxgUtils.getTokenParam();
        console.log("single#"+url);
        request.open(url, egret.HttpMethod.GET);
        request.send();
    }
    //获取单局排行
    private loadSingleScoreList():void{
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
                        var myscore = result.myscore;
                        var myrank = result.myrank;
                        var myBgRes = "rank_blue_png";
                        var ranklistitem:Ranklistitem  = new Ranklistitem(result.avater,egret.localStorage.getItem(Constant.G_NICKNAME_KEY), myscore, self22.getRankPicRes(Number(myrank)), myrank, myBgRes);
                        self22.contentScroller.addChild(ranklistitem);
                        var dataCount:number = Number(result.count);
                        if(dataCount > 0 )
                        {
                            var rankBgRes = "";
                            for(var i=0;i<dataCount;i++)
                            {
                                var rscore = result.rows[i].rscore;
                                var uid = result.rows[i].uid;
                                var nick = result.rows[i].nick;
                                var photo = result.rows[i].photo;
                                if (i == 0 )
                                {
                                    rankBgRes = "rank_yellow_png";
                                } else if(i==1)
                                {
                                    rankBgRes = "rank_orange_png";
                                } else if(i==2)
                                {
                                    rankBgRes = "rank_red_png";
                                } else
                                {
                                    rankBgRes = "rank_green_png";
                                }
                                var ranklistitem:Ranklistitem  = new Ranklistitem(photo,nick, rscore, self22.getRankPicRes(i+1), String(i+1), rankBgRes);
                                ranklistitem.y = (i+1) * 130;
                                self22.contentScroller.addChild(ranklistitem);
                            }
                        }
                    } else {
                        //window.alert(result.reason+","+result.status);
                        console.log("loadScoreList err =>" + result.reason+","+result.status);
                    }
                    break;
                case egret.IOErrorEvent.IO_ERROR:
                    break;
            }
        };
        request.once(egret.Event.COMPLETE, respHandler, self22);
        request.once(egret.IOErrorEvent.IO_ERROR, respHandler, self22);
        var url = Constant.getSingleRanklistUrl();
        url = url +"&"+WxgUtils.getTokenParam();
        console.log("single#"+url);
        request.open(url, egret.HttpMethod.GET);
        request.send();
    }
	private playgameBtnCallback(evt:egret.TouchEvent):void{
		
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
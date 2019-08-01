class Shopskill  extends eui.Component implements eui.UIComponent {
    private skillprice:eui.Label;//技能价格
    private mymoney:eui.Label;//我的金币(块)
    private buynum:eui.Label;
    private buybtn:eui.Button;
    private freezenum:eui.Label;
    private nukenum:eui.Label;
    private purifynum:eui.Label;
    private skullnum:eui.Label;
    private revivenum:eui.Label;
    private skilldescimg:eui.Image;
    private skillname:eui.Label;
    private skilldesc:eui.Label;
    private minusBtn:eui.Image;
    private plusBtn:eui.Image;
    private freezeselect:eui.Image;//冰冻
    private reviveselect:eui.Image;//复活
    private purifyselect:eui.Image;//清除
    private skullselect:eui.Image; //锁定
    private nukeselect:eui.Image;//持续消除
    private freezebtn:eui.Image;
    private nukebtn:eui.Image;
    private purifybtn:eui.Image;
    private skullbtn:eui.Image;
    private back:eui.Image;

    //初始化数据
    private data_buynum:number = 1;
    private skillJsonData:any;
    private defaultType:string = "speed";
    private data_nowtype:string;
    private data_mymoney:number;
    private data_buyproid:number;
    private data_propprice:number = 0 ;

    private freeMc:eui.Image;//冰冻效果展示
    private jingshiMc;       //净世效果展示
    private yanmieMc;        //湮灭效果展示
    private zhenyaMc;        //镇压效果展示

	public constructor() {
		super();
        this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.initEui, this);
	}
    private initEui():void{
        this.buybtn.touchEnabled = true;
        this.buybtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyskill, this);
        this.minusBtn.touchEnabled = true;
        this.minusBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.minusNum, this);
        this.plusBtn.touchEnabled = true;
        this.plusBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.plusNum, this);
        this.freezeselect.visible = false;
        this.reviveselect.visible = false;
        this.purifyselect.visible = false;
        this.skullselect.visible = false;
        this.nukeselect.visible = false;
        this.back.touchEnabled = true;
        this.back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backToIndex, this);
        //点击技能的效果
        this.skullbtn.touchEnabled = true;
        this.skullbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setSkullType, this);
        this.freezebtn.touchEnabled = true;
        this.freezebtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setFreezeType, this);
        this.purifybtn.touchEnabled = true;
        this.purifybtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setPurifyType, this);
        this.nukebtn.touchEnabled = true;
        this.nukebtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setNukeType, this);
        //初始化数据
        this.initData();
    }
    private backToIndex():void{
        var event:GameEvent = new GameEvent(GameEvent.GAME_INDEX);
        this.dispatchEvent(event);
    }
    private loadDefaultType():void{
        // console.log("loadDefaultType................");
        var result = this.skillJsonData;
        if(result.status == 0){
            var count:number = result.count;
            var speedArr = result.rows["speed0"];
            if(speedArr.length > 0) {
                this.setPageData(speedArr[0]);
            }
        }
    }
    private setSkullType():void{
        var result = this.skillJsonData;
        if(result.status == 0){
            var count:number = result.count;
            var dataArr = result.rows["lock0"];
            if(dataArr.length > 0) {
                this.setPageData(dataArr[0]);
            }
        }
    }
    private setFreezeType():void{
        var result = this.skillJsonData;
        if(result.status == 0){
            var count:number = result.count;
            var dataArr = result.rows["speed0"];
            if(dataArr.length > 0) {
                this.setPageData(dataArr[0]);
            }
        }
    }
    private setPurifyType():void{
        var result = this.skillJsonData;
        if(result.status == 0){
            var count:number = result.count;
            var dataArr = result.rows["clear0"];
            if(dataArr.length > 0) {
                this.setPageData(dataArr[0]);
            }
        }
    }
    private setNukeType():void{
        var result = this.skillJsonData;
        if(result.status == 0){
            var count:number = result.count;
            var dataArr = result.rows["stillclear0"];
            if(dataArr.length > 0) {
                this.setPageData(dataArr[0]);
            }
        }
    }
    private playDescEffect(opertype:string){
        if(opertype == "speed"){
            if(this.freeMc == null){
                this.freeMc = new eui.Image();
                this.freeMc.texture = RES.getRes("freeze_desc_png");
                this.freeMc.x = 220;
                this.freeMc.y = 250;
                //this.freeMc.anchorOffsetX = 0 - this.skilldescimg.width/2;
                //this.freeMc.anchorOffsetY = 0 - this.skilldescimg.height/2;
                this.addChild(this.freeMc);
            }
            
        } else if(opertype == "clear") {
            if(this.jingshiMc == null){
                var data = RES.getRes("jingshi_json");
                var txtr = RES.getRes("jingshi_png");
                var mcFactory = new egret.MovieClipDataFactory(data, txtr);
                var mc = new egret.MovieClip(mcFactory.generateMovieClipData("start"));
                this.addChild(mc);
                mc.gotoAndPlay(0);
            }
            if(this.freeMc != null){
                this.removeChild(this.freeMc);
                this.freeMc = null;
            }
        } else if(opertype == "lock"){
            if(this.freeMc != null){
                this.removeChild(this.freeMc);
                this.freeMc = null;
            }
        } else if(opertype == "stillclear"){
            if(this.freeMc != null){
                this.removeChild(this.freeMc);
                this.freeMc = null;
            }
        }
    }
    private setPageData(dataArr):void{

        this.freezeselect.visible = false;
        this.purifyselect.visible = false;
        this.skullselect.visible = false;
        this.nukeselect.visible = false;
        // this.buynum.text = String(this.data_buynum);
        this.skillprice.text = String(Number(dataArr.discount_price));
        this.mymoney.text = String(this.data_mymoney);
        this.data_propprice = Number(dataArr.discount_price);
        this.skillname.text = dataArr["name"]+":";
        this.skilldesc.text = dataArr["descrip"];
        var opertype = dataArr["opertype"];
        this.data_nowtype = opertype;
        this.data_buyproid = dataArr["id"];
        if(opertype == "speed"){
            this.freezeselect.visible = true;
        } else if(opertype == "clear") {
            this.purifyselect.visible = true;
        } else if(opertype == "lock"){
            this.skullselect.visible = true;
        } else if(opertype == "stillclear"){
            this.nukeselect.visible = true;
        }
        this.playDescEffect(opertype);
    }
    //减少购买数量
    private minusNum():void{
        var numTmp:number = Number(this.buynum.text);
        if(numTmp > 0) {
            numTmp--;
        }
        this.buynum.text = String(numTmp);
    }
    //增加购买数量
    private plusNum():void{
        var numTmp:number = Number(this.buynum.text);
        numTmp++;
        this.buynum.text = String(numTmp);
    }
    //购买技能
    private buyskill():void{
        var errMsg = "";

        if(this.data_buyproid > 0) {
            this.data_buynum = Number(this.buynum.text);
            if(this.data_buynum > 0){
                if(this.data_propprice > 0)
                {
                    if(this.data_mymoney < this.data_propprice * this.data_buynum){
                        Toast.launch("金豆不足");
                        return ;
                    }
                }


                var self22 = this;
                var request = new egret.HttpRequest();
                var respHandler = function (evt) {
                    switch (evt.type) {
                        case egret.Event.COMPLETE:
                            var request = evt.currentTarget;
                            var result = JSON.parse(request.response);
                            // console.log(request.response);
                            var resultMsg = "";
                            if (result.status == 0)
                            {
                                resultMsg = "购买成功";
                                self22.initData();
                            } else {
                                //window.alert(result.reason+","+result.status);
                                resultMsg = "购买失败," + result.status+ "," +  result.reason;
                                console.log("err =>" + result.reason+","+result.status);
                            }
                            Toast.launch(resultMsg);
                            break;
                        case egret.IOErrorEvent.IO_ERROR:
                            break;
                    }
                };
                request.once(egret.Event.COMPLETE, respHandler, self22);
                request.once(egret.IOErrorEvent.IO_ERROR, respHandler, self22);
                var url = Constant.getBuyPropUrl();
                url = url + "&num="+this.data_buynum+"&propid="+this.data_buyproid +"&"+WxgUtils.getTokenParam();
                console.log("#"+url);
                request.open(url, egret.HttpMethod.GET);
                request.send();
            } else {
                errMsg = "购买个数必须大于0";
            }
        } else {
            errMsg = "请选择要购买的技能";
        }
        if(errMsg != "") {
            Toast.launch(errMsg);
        }
    }

    private initData():void{
        this.buynum.text = "1";
        this.getProList();
        this.getMyProlist();

    }
    //获取道具列表
    private getProList():void{
        var self22 = this;
        var request = new egret.HttpRequest();
        var respHandler = function (evt) {
            switch (evt.type) {
                case egret.Event.COMPLETE:
                    var request = evt.currentTarget;
                    var result = JSON.parse(request.response);
                    // console.log(request.response);
                    if (result.status == 0)
                    {
                        var nummoney = Number(String(result.money));
                        self22.data_mymoney = nummoney;
                        self22.skillJsonData = result;
                        self22.loadDefaultType();
                    } else {
                        //window.alert(result.reason+","+result.status);
                        console.log("err =>" + result.reason+","+result.status);
                    }
                    break;
                case egret.IOErrorEvent.IO_ERROR:
                    break;
            }
        };
        request.once(egret.Event.COMPLETE, respHandler, self22);
        request.once(egret.IOErrorEvent.IO_ERROR, respHandler, self22);
        var url = Constant.getPropListUrl();
        url = url + "&isskill=yes" +"&"+WxgUtils.getTokenParam();
        console.log("#"+url);
        request.open(url, egret.HttpMethod.GET);
        request.send();
    }
    //获取我的道具列表
    private getMyProlist():void{
        var self22 = this;
        var request = new egret.HttpRequest();
        var respHandler = function (evt) {
            switch (evt.type) {
                case egret.Event.COMPLETE:
                    var request = evt.currentTarget;
                    var result = JSON.parse(request.response);
                    console.log(request.response);
                    if (result.status == 0)
                    {
                        for(var i=0;i<result.rows.length;i++){
                            var numTmp = result.rows[i]["num"];
                            var opertypeTmp = result.rows[i]["opertype"];
                            if(opertypeTmp == "speed"){
                                self22.freezenum.text = numTmp;
                            } else if(opertypeTmp == "clear") {
                                self22.purifynum.text = numTmp;
                                // this.purifyselect.visible = true;
                            } else if(opertypeTmp == "lock"){
                                self22.skullnum.text = numTmp;
                                // this.skullselect.visible = true;
                            } else if(opertypeTmp == "stillclear"){
                                self22.nukenum.text = numTmp;
                                // this.nukeselect.visible = true;
                            }
                        }
                    } else {
                        //window.alert(result.reason+","+result.status);
                        console.log("err =>" + result.reason+","+result.status);
                    }
                    break;
                case egret.IOErrorEvent.IO_ERROR:
                    break;
            }
        };
        request.once(egret.Event.COMPLETE, respHandler, self22);
        request.once(egret.IOErrorEvent.IO_ERROR, respHandler, self22);
        var url = Constant.getMyProlist();
        url = url +"&"+WxgUtils.getTokenParam();
        console.log("#"+url);
        request.open(url, egret.HttpMethod.GET);
        request.send();
    }
}
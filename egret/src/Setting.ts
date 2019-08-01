class Setting extends eui.Component implements eui.UIComponent {
    private avater:eui.Image;
    private mobileinput:eui.EditableText;
    private nationinput:eui.EditableText;
    private receiveinput:eui.EditableText;
    private musicState:eui.ToggleSwitch;
    private musicSlider:eui.HSlider;
    private saveBtn:eui.Button;
    private back:eui.Image;
    private avamask:eui.Rect;
	public constructor() {
		super();
        this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.initEui, this);
	}
    private initEui():void{
        this.musicState.addEventListener(eui.UIEvent.CHANGE, this.musicSwitchChangeCallback, this);
        this.musicSlider.addEventListener(egret.Event.CHANGE, this.musicSliderChangeCallback, this);
        this.saveBtn.touchEnabled = true;
        this.saveBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.saveSetting, this);
        this.back.touchEnabled = true;
        this.back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backToIndex, this);
        //初始化数据        
        this.initData();
        this.avater.mask = this.avamask;
    }
    private backToIndex():void{
        var event:GameEvent = new GameEvent(GameEvent.GAME_INDEX);
        this.dispatchEvent(event);
    }
    private initData():void{
        //获取本地信息
        this.loadLocalInfo();
        //加载用户信息
        this.loadUserInfo();
    }
    private saveSetting():void{
        var country = this.nationinput.text;
        var mobile = this.mobileinput.text;
        var receive = this.receiveinput.text;
        var self00 = this;
        var request = new egret.HttpRequest();
        var respHandler = function (evt) {
            switch (evt.type) {
                case egret.Event.COMPLETE:
                    var request = evt.currentTarget;
                    var result = JSON.parse(request.response);

                    if (result.status == 0)
                    {
                        Toast.launch("保存成功");
                    } else {
                        Toast.launch("保存失败 | " + Constant.getErrorDesc(result.status) );
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
        var url = Constant.getUpinfoUrl();
        url = url +"&country="+country+"&receive_addr="+receive+"&mobile="+mobile +"&"+WxgUtils.getTokenParam();
        console.log("#"+url);
        request.open(url, egret.HttpMethod.GET);
        request.send();
    }
    private musicSwitchChangeCallback(e:eui.UIEvent){
        let btn:eui.ToggleSwitch = e.target;
        var v = "";
        if(btn.selected) {
            v = "1";
        } else {
            v = "0";
        }
        egret.localStorage.setItem(Constant.G_MUSIC_STATE_KEY, v);
    }
    private musicSliderChangeCallback()
    {
        var v:number = this.musicSlider.value;
        egret.localStorage.setItem(Constant.G_MUSIC_VAL_KEY, String(v));
    }

    private loadLocalInfo():void{
        var musicVal = egret.localStorage.getItem(Constant.G_MUSIC_VAL_KEY);
        if(musicVal == null || musicVal == "")
        {
            musicVal = String(Constant.G_MUSIC_DEFAULTVAL);
        }
        this.musicSlider.value = Number(musicVal);

        var musicState = egret.localStorage.getItem(Constant.G_MUSIC_STATE_KEY);
        if(musicState == null || musicState == ""){
            musicState = "1";
        }
        if(musicState == "1"){
            this.musicState.selected = true;
        } else {
            this.musicState.selected = false;
        }
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
                        var thumb = result.data.thumb;
                        if (thumb != null && thumb != "")
                        {
                            self00.loadAvater(thumb);
                        }
                        var country = result.data.country;
                        self00.nationinput.text = country;
                        var receive_addr = result.data.receive_addr;
                        self00.receiveinput.text = receive_addr;
                        var mobile = result.data.mobile;
                        self00.mobileinput.text = mobile;


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
                // var mask:egret.Shape = new egret.Shape();
                // mask.width = self11.avater.width;
                // mask.height = self11.avater.height;
                // mask.x = self11.avater.x;
                // mask.y = self11.avater.y;
                // //此处会出问题 建议在画个圆加载在上面

                // mask.graphics.beginFill( 0xffffff, 15);
                // //半径52
                // mask.graphics.drawCircle( 0, 0,self11.avater.width/2 );
                // mask.graphics.endFill();
                // mask.anchorOffsetX = 0-self11.avater.width/2;
                // mask.anchorOffsetY = 0-self11.avater.width/2;
                // self11.addChild(mask);
                // self11.avater.mask = mask;
            }
        }, this);
    }
    
}
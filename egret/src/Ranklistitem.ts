

class Ranklistitem  extends eui.Component implements eui.UIComponent {
    private avater:eui.Image;
    private nicktext:eui.Label;
    private scoretext:eui.Label;
    private rank_pic:eui.Image;
    private rank_num:eui.Label;
    private bg:eui.Image;
    //
    private avaterUrl:string;
    private nickStr:string;
    private scoreStr:string;
    private picRes:string;
    private numStr:string;
    private bgRes:string;
	public constructor(avaterUrlTmp:string, nickStrTmp:string, scoreStrTmp:string, picResTmp:string, numStrTmp:string, bgResTmp:string) {
		super();
        this.avaterUrl = avaterUrlTmp;
        this.nickStr = nickStrTmp;
        this.scoreStr = scoreStrTmp;
        this.picRes = picResTmp;
        this.numStr = numStrTmp;
        this.bgRes = bgResTmp;
        this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.initEui, this);
	}
    private initEui():void{
        // this.loadAvater(this.avaterUrl);
        this.nicktext.text = this.nickStr;
        this.scoretext.text = this.scoreStr;
        // this.rank_pic.texture = RES.getRes(this.picRes);
        this.rank_num.text = this.numStr;
        this.bg.texture = RES.getRes(this.bgRes);
        this.loadAvater(this.avaterUrl);
    }
    private loadAvater(url:string):void
    {
        // if(url.indexOf("?") > 0){
        //     url += "&"+Math.random()
        // } else {
        //     url += "?"+Math.random()
        // }
        // console.log(url);
        var self11 = this;
        let imgLoader = new egret.ImageLoader();
        imgLoader.crossOrigin = "anonymous";// 跨域请求
        imgLoader.load(url);// 去除链接中的转义字符‘\’
        imgLoader.once(egret.Event.COMPLETE, function (evt: egret.Event) {
            if (evt.currentTarget.data) {
                let texture = new egret.Texture();
                texture.bitmapData = evt.currentTarget.data;
                self11.avater.texture = texture;
            }
        }, this);
    }
	
}
class Msgitem  extends eui.Component implements eui.UIComponent {
    private typeImg:eui.Image;
    private typeText:eui.Label;
    private datetime:eui.Label;
    private text:eui.Label;

    private typeImgRes:string;
    private typeTextVal:string;
    private datetimeVal:string;
    private textVal:string;
	public constructor(typeImgResTmp:string, typeTextValTmp:string, datetimeValTmp:string, textValTmp:string) {
		super();
        this.typeImgRes = typeImgResTmp;
        this.typeTextVal = typeTextValTmp;
        this.datetimeVal = datetimeValTmp;
        this.textVal = textValTmp;
        this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.initEui, this);
	}
    private initEui():void{
        this.typeImg.texture = RES.getRes(this.typeImgRes);
        this.typeText.text = this.typeTextVal;
        this.datetime.text = this.datetimeVal;
        this.text.text = this.textVal;
    }
}
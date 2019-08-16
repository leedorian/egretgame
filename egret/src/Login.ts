class Login extends eui.Component implements  eui.UIComponent {
	private WechatLoginBtn:eui.Button;
	public constructor() {
		super();
        this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.initEui, this);
	}
    private initEui():void{
        this.WechatLoginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            console.log("点击了微信登录按钮.........");
            egret.ExternalInterface.call("sendToNative", "wxlogin");
        }, this);
    }
}
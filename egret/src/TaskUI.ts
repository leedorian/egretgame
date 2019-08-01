class TaskUI extends eui.Component implements eui.UIComponent{
    private btnClose:eui.Button;
    constructor() {
        super();
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        //this.skinName = "resource/eui_skins/ta skUISkin.exml";
    }
    private uiCompHandler():void {
        console.log( "\t\tAboutUI uiCompHandler" );
        var self00 = this;
        this.btnClose.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            //this.dispatchEventWith( GameEvents.BlockEvent.EVT_CLOSE_TASK );
            console.log("点击了关闭按钮.........");
            self00.parent.removeChild(self00);
        }, this );
    }
}
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
    private getTaskList(){
        var self = this;
        var request = new egret.HttpRequest();
        var respHandler = function (evt) {
            switch (evt.type) {
                case egret.Event.COMPLETE:
                    var request = evt.currentTarget;
                    var result = JSON.parse(request.response);
                    if (result.status == 0)
                    {
                        var dataArr = result.rows;
                        if(dataArr.length > 0) {
                            //目前只取一个任务显示
                        }
                    } else {
                        //window.alert(result.reason+","+result.status);
                        console.log("getTaskList err =>" + result.reason+","+result.status);
                    }
                    break;
                case egret.IOErrorEvent.IO_ERROR:
                    break;
            }
        };
        request.once(egret.Event.COMPLETE, respHandler, self);
        request.once(egret.IOErrorEvent.IO_ERROR, respHandler, self);
        var url = Constant.getTaskUrl();
        url = url +"&"+WxgUtils.getTokenParam();
        console.log("#"+url);
        request.open(url, egret.HttpMethod.GET);
        request.send();
    }
}
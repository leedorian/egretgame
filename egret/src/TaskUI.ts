class TaskUI extends eui.Component implements eui.UIComponent{
    private btnClose:eui.Button;
    private task_date:eui.Label;
    private task_desc:eui.Label;
    private taskDataProcess:eui.ProgressBar;
    private task_finish:eui.Image;
    private task_reward:eui.Label;
    private receive_btn:eui.Button;
    private percent_label:eui.Label;
    //数据
    private currNum:number;
    private targetNum:number;
    private mytaskid:number;
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
        this.receive_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.receiveReward, this);
        this.task_date.visible = false;
        this.taskDataProcess.minimum = 0;
        this.task_finish.visible = false;
        this.getTaskList();
    }
    private receiveReward(evt:egret.TouchEvent){
        // Toast.launch("我了个大草");
        var msg:string = "";
        if(this.targetNum <= this.currNum) {
            this.doHttpReceive();
            return;
        } else {
            msg = "未达成任务";
        }
        Toast.launch(msg);
    }
    private doHttpReceive(){
        var self = this;
        var request = new egret.HttpRequest();
        var respHandler = function (evt) {
            switch (evt.type) {
                case egret.Event.COMPLETE:
                    var request = evt.currentTarget;
                    var result = JSON.parse(request.response);
                    if (result.status == 0)
                    {
                        Toast.launch("领取成功");
                        self.receive_btn.enabled = false;
                    } else {
                        Toast.launch(Constant.getErrorDesc(result.status));
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
        var url = Constant.receiveTaskReward();
        url = url +"&"+WxgUtils.getTokenParam();
        // console.log("#"+url);
        request.open(url, egret.HttpMethod.GET);
        request.send();
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
                            
                            var reward_type = Number(dataArr[0]["reward_type"]);
                            var reward_num = Number(dataArr[0]["reward_num"]);
                            var curr_num = Number(dataArr[0]["curr_num"]);
                            var target_num = Number(dataArr[0]["target_num"]);
                            var taskid = Number(dataArr[0]["id"]);
                            var iscomplete = Number(dataArr[0]["iscomplete"]);
                            if(iscomplete == 1) {
                                self.receive_btn.enabled = false;
                            }
                            self.mytaskid = taskid;
                            self.currNum = curr_num;
                            self.targetNum = target_num;
                            self.taskDataProcess.maximum = target_num;
                            WxgUtils.log(curr_num + " _ " + target_num);
                            if(target_num <= curr_num) {//表示完成了任务
                                WxgUtils.log("任务完成了");
                                self.taskDataProcess.value = target_num;
                                self.task_finish.visible = true;
                            } else {
                                self.taskDataProcess.value = curr_num;
                                self.task_finish.visible = false;
                            }
                            self.percent_label.text = curr_num + " / " + target_num;
                            WxgUtils.log("self.taskDataProcess.value = " + self.taskDataProcess.value);
                            self.task_desc.text = dataArr[0].descript;
                            if(reward_type == 1) {
                                self.task_reward.text = String(reward_num);
                            }
                        }
                    } else {
                        //window.alert(result.reason+","+result.status);
                        WxgUtils.log("getTaskList err =>" + result.reason+","+result.status);
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
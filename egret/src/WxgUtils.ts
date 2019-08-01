class WxgUtils{
    //获取当前时间戳
    public static getNowTimestamp():number
    {
        return Date.parse(new Date().toString())/1000;
    }
    //获取token
    public static getTokenStr():string
    {
        var token = egret.localStorage.getItem(Constant.G_TOKEN_KEY);
        return token;
    }
    //获取调用接口的token参数
    public static getTokenParam():string
    {
        return "token="+egret.localStorage.getItem(Constant.G_TOKEN_KEY)+"&uname="+egret.localStorage.getItem(Constant.G_UNAME_KEY);
    }
    //检测token
    public static checkToken():void
    {
        var token = egret.localStorage.getItem(Constant.G_TOKEN_KEY);
        var expire = egret.localStorage.getItem(Constant.G_TOKEN_EXPIRE_KEY);
        if (token == "" || expire == "" || Number(expire) < WxgUtils.getNowTimestamp()+300)
        {
            var request = new egret.HttpRequest();
            var respHandler = function (evt) {
                switch (evt.type) {
                    case egret.Event.COMPLETE:
                        var request = evt.currentTarget;
                        var result = JSON.parse(request.response);

                        if (result.status == 0)
                        {
                            egret.localStorage.setItem(Constant.G_TOKEN_KEY, result.token);
                            egret.localStorage.setItem(Constant.G_TOKEN_EXPIRE_KEY, result.expire);
                        } else {
                            //window.alert(result.reason+","+result.status);
                            console.log("gettoken err =>" + result.reason+","+result.status);
                        }
                        break;
                    case egret.IOErrorEvent.IO_ERROR:
                        break;
                }
            };
            request.once(egret.Event.COMPLETE, respHandler, self);
            request.once(egret.IOErrorEvent.IO_ERROR, respHandler, self);
            var url = Constant.getGettokenUrl();
            var openid = egret.localStorage.getItem(Constant.G_OPENID_KEY);
            var uname = egret.localStorage.getItem(Constant.G_UNAME_KEY);
            if (Constant.isdebug)
            {
                if (openid == "" || openid == null || uname == null || uname == "")
                {
                    console.log("调用调试openid");
                    openid = "o7Vp401Z9LZaQoBfO1Zq_wfN7QSk";
                    egret.localStorage.setItem(Constant.G_UNAME_KEY, "g1561620209406139");
                }
            }
            url = url +"&openid="+openid;
            // console.log(url);
            request.open(url, egret.HttpMethod.GET);
            request.send();
        }

    }

    public static getTimeStr(time:number):string
    {
        var oneDay = 24*60*60;
        var oneHour = 60*60;
        var oneMinute = 60;
        var str = String(time);
        if (time > 0)
        {
            //减掉整数的分钟就是剩下的秒数
            var Minutes:number = parseInt(String(time / oneMinute));
            var remainSeconds:number = parseInt(String(time - (Minutes * oneMinute)));
            str = Minutes+":"+remainSeconds;
        }
        return str;
    }

    public static getYmd(time:any) {
        var date = new Date(time);
        var year:number = date.getFullYear();
        var month:any = ( date.getMonth() + 1 ) < 10 ? '0' + ( date.getMonth() + 1 ) : ( date.getMonth() + 1 );
        var day:any = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        return year + '-' + month + '-' + day;
    }
}

class Constant {
    private static  _baseURL:string = "https://game.weiplus5.com/";
    public static G_UID_KEY:string = "G_UID_KEY";
    public static G_NICKNAME_KEY:string = "G_NICKNAME_KEY";
    public static G_UNAME_KEY:string = "G_UNAME_KEY";
    public static G_USEREXPIRETIME_KEY:string = "G_USEREXPIRETIME_KEY";
    public static G_OPENID_KEY:string = "G_OPENID_KEY";
    public static G_TOKEN_KEY:string = "G_TOKEN_KEY";
    public static G_TOKEN_EXPIRE_KEY:string = "G_TOKEN_EXPIRE_KEY";
    public static G_SEARCHUSER_KEY:string = "G_SEARCHUSER_KEY";
    public static G_FIRST_LOOKDATE:string = "G_FIRST_LOOKDATE";
    public static G_MUSIC_DEFAULTVAL:number = 100;
    public static G_MUSIC_VAL_KEY:string = "G_MUSIC_VAL_KEY";//音量大小
    public static G_MUSIC_STATE_KEY:string = "G_MUSIC_STATE_KEY";//音量是否开始
    public static G_GAME_SCORE_KEY:string = "G_GAME_SCORE_KEY"; //游戏记录
    
    //接口错误码
    public static ERR_LOGINED:number = -214;             //已经登录
    public static ERR_CLOSEREG:number = -215;            //关闭注册
    public static ERR_MOBILEERR:number = -216;           //手机号错误
    public static ERR_MOBILECHECKERR:number = -217;      //手机号校验错误
    public static ERR_SMSERR:number = -218;              //短信验证码错误
    public static ERR_INVITEEMPTY:number = -220;         // 邀请码为空
    public static ERR_MOBILEEMPTY:number = -221;         //手机号为空    
    public static ERR_REGERROR:number = -222;            //注册错误
    public static ERR_REGSENDEMAILERROR:number = -224;   //注册邮箱email发送失败
    public static ERR_FINDPWDERROR:number = -225;        //找回密码错误
    public static ERR_OPERATION:number = -226;           //操作错误 
    public static ERR_ACTIONPOINT_NOTENOUGH:number = -227;//行动力不足 
    public static ERR_STARTGAME_EXCEPTION:number = -228;//开始游戏异常
    public static ERR_COOKIE_TIMEOUT:number = -230;//登录过期
    public static ERR_USERLOCK:number = -231;//被锁定的用户
    public static ERR_USERDENIED:number = -232;//用户禁止登陆
    public static ERR_NEED_EMAIL_AUTH:number = -233;//需要被邮件认证
    public static ERR_USERCHECKING:number = -234;//用户校验中
    public static ERR_LOGINERROR:number = -235;//登陆错误
    public static ERR_NEEDSETMODEL:number = -236;//请先设置模型
    public static ERR_NEEDSETPWD:number = -237;//请先设置密码
    public static ERR_NOLOGIN:number = -238;//未登陆
    public static ERR_MOBILE_EXISTS:number = -239;//手机号已经存在

    public static ERR_BINDFAIL:number = -1000;//账号绑定失败
    public static ERR_GAME_TOKEN:number = -1001;//token验证错误

    //游戏设计尺寸
    public static DESIGN_WID = 1920;
    public static DESIGN_HEI = 1080;
    public static isdebug:boolean = true;

    public static getErrorDesc(status:number):string{
        var desc:string = "";
        switch(status){
            case Constant.ERR_LOGINED:
                desc = "已经登录";
                break;
            case Constant.ERR_CLOSEREG:
                desc = "关闭注册";
                break;
            case Constant.ERR_MOBILEERR:
                desc = "手机号错误";
                break;
            case Constant.ERR_MOBILECHECKERR:
                desc = "手机号校验错误";
                break;
            case Constant.ERR_SMSERR:
                desc = "短信验证码错误";
                break;
            case Constant.ERR_INVITEEMPTY:
                desc = "邀请码为空";
                break;
            case Constant.ERR_MOBILEEMPTY:
                desc = "手机号为空";
                break;
            case Constant.ERR_REGERROR:
                desc = "注册错误";
                break;
            case Constant.ERR_REGSENDEMAILERROR:
                desc = "注册邮箱email发送失败";
                break;
            case Constant.ERR_FINDPWDERROR:
                desc = "找回密码错误";
                break;
            case Constant.ERR_OPERATION:
                desc = "操作错误";
                break;
            case Constant.ERR_ACTIONPOINT_NOTENOUGH:
                desc = "行动力不足";
                break;
            case Constant.ERR_STARTGAME_EXCEPTION:
                desc = "开始游戏异常";
                break;
            case Constant.ERR_COOKIE_TIMEOUT:
                desc = "登录过期";
                break;
            case Constant.ERR_USERLOCK:
                desc = "被锁定的用户";
                break;
            case Constant.ERR_USERDENIED:
                desc = "用户禁止登陆";
                break;
            case Constant.ERR_NEED_EMAIL_AUTH:
                desc = "需要被邮件认证";
                break;
            case Constant.ERR_USERCHECKING:
                desc = "用户校验中";
                break;
            case Constant.ERR_LOGINERROR:
                desc = "登陆错误";
                break;
            case Constant.ERR_NEEDSETMODEL:
                desc = "请先设置模型";
                break;
            case Constant.ERR_NEEDSETPWD:
                desc = "请先设置密码";
                break;
            case Constant.ERR_NOLOGIN:
                desc = "未登陆";
                break;
            case Constant.ERR_MOBILE_EXISTS:
                desc = "手机号已经存在";
                break;
            case Constant.ERR_BINDFAIL:
                desc = "账号绑定失败";
                break;
            case Constant.ERR_GAME_TOKEN:
                desc = "token验证错误";
                break;
            
        }
        return desc;
    }

    //获取登录接口地址接口url
    public static getLoginUrl():string
    {
        return Constant._baseURL+"index.php?m=member&f=index&v=public_thrlogin";
    }
    //获取获取token地址接口url
    public static getGettokenUrl():string
    {
        return Constant._baseURL+"index.php?m=game&f=index&v=public_gettoken";
    }
    //获取用户信息接口url
    public static getUserinfoUrl():string
    {
        return Constant._baseURL+"index.php?m=game&f=index&v=getUserInfo";
    }
    //获取体力接口url
    public static getActionpointUrl():string
    {
        return Constant._baseURL+"index.php?m=game&f=index&v=getActionPoint";
    }
    //获取日榜排行接口url
    public static getRanklistUrl():string
    {
        return Constant._baseURL+"index.php?m=game&f=index&v=scoreRankList";
    }
    //获取周榜排行接口url
    public static getWeekRanklistUrl():string
    {
        return Constant._baseURL+"index.php?m=game&f=index&v=weekScoreRankList";
    }
    //获取单局排行接口url
    public static getSingleRanklistUrl():string
    {
        return Constant._baseURL+"index.php?m=game&f=index&v=singleScoreRankList";
    }
    //获取消息列表接口url
    public static getMsglistUrl():string{
        return Constant._baseURL+"index.php?m=message&f=message&v=getMsglist";
    }
    //获取好友列表接口url
    public static getFriendlistUrl():string{
        return Constant._baseURL+"index.php?m=game&f=friend&v=friendlist";
    }
    //添加好友接口url
    public static addFriendUrl():string {
        return Constant._baseURL+"index.php?m=game&f=friend&v=addFriend";
    }
    //审核好友接口url
    public static applyFriendUrl():string {
        return Constant._baseURL+"index.php?m=game&f=friend&v=applyFriend";
    }
    //搜索用户接口url
    public static searchUserUrl():string {
        return Constant._baseURL+"index.php?m=member&f=index&v=searchUser";
    }
    //获取审核列表接口url
    public static getFriendApplyList():string{
        return Constant._baseURL+"index.php?m=game&f=friend&v=getFriendApplyList";
    }
    //更新用户信息接口url
    public static getUpinfoUrl():string{
        return Constant._baseURL+"index.php?m=member&f=index&v=upinfo";

    }
    //获取道具列表接口
    public static getPropListUrl():string{
        return Constant._baseURL+"index.php?m=game&f=index&v=getPropList";
    }
    //获取我的道具
    public static getMyProlist():string{
        return Constant._baseURL+"index.php?m=game&f=index&v=getMyProlist";
    }
    //获取购买道具接口url
    public static getBuyPropUrl():string{
        return Constant._baseURL+"index.php?m=game&f=index&v=onlybuyGameProp";
    }
    //获取赠送体力接口url
    public static giveActionPointUrl():string{
        return Constant._baseURL+"index.php?m=game&f=friend&v=giveActionPoint";
    }
}
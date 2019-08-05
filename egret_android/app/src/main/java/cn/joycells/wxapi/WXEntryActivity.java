package cn.joycells.wxapi;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.util.Log;
import android.widget.Toast;

import com.tencent.mm.opensdk.constants.ConstantsAPI;
import com.tencent.mm.opensdk.modelbase.BaseReq;
import com.tencent.mm.opensdk.modelbase.BaseResp;
import com.tencent.mm.opensdk.modelbiz.SubscribeMessage;
import com.tencent.mm.opensdk.modelbiz.WXLaunchMiniProgram;
import com.tencent.mm.opensdk.modelbiz.WXOpenBusinessView;
import com.tencent.mm.opensdk.modelbiz.WXOpenBusinessWebview;
import com.tencent.mm.opensdk.modelmsg.SendAuth;
import com.tencent.mm.opensdk.modelmsg.ShowMessageFromWX;
import com.tencent.mm.opensdk.modelmsg.WXAppExtendObject;
import com.tencent.mm.opensdk.modelmsg.WXMediaMessage;
import com.tencent.mm.opensdk.openapi.IWXAPI;
import com.tencent.mm.opensdk.openapi.IWXAPIEventHandler;
import com.tencent.mm.opensdk.openapi.WXAPIFactory;


import org.egret.egretnativeandroid.EgretNativeAndroid;
import org.json.JSONException;
import org.json.JSONObject;

import java.lang.ref.WeakReference;
import java.util.HashMap;

import cn.joycells.MainActivity;
import cn.joycells.service.impl.service.SimpleDoProcessService;
import cn.joycells.thread.SimpleNoticeThread;
import cn.joycells.util.LogUtil;
import cn.joycells.wxapi.util.NetworkUtil;

public class WXEntryActivity extends Activity implements IWXAPIEventHandler{
	private static String TAG = "MicroMsg.WXEntryActivity";

    private IWXAPI api;
    private MyHandler handler;
//	private EgretNativeAndroid nativeAndroid;
	private static class MyHandler extends Handler {
		private final WeakReference<WXEntryActivity> wxEntryActivityWeakReference;

		public MyHandler(WXEntryActivity wxEntryActivity){
			wxEntryActivityWeakReference = new WeakReference<WXEntryActivity>(wxEntryActivity);
		}

		@Override
		public void handleMessage(Message msg) {
			int tag = msg.what;
			LogUtil.out("MyHandler handleMessage -> "+tag + " | " + msg.obj);
//			switch (tag) {
//				case NetworkUtil.GET_TOKEN: {
//					Bundle data = msg.getData();
//					JSONObject json = null;
//					try {
//						json = new JSONObject(data.getString("result"));
//						String openId, accessToken, refreshToken, scope;
//						openId = json.getString("openid");
//						accessToken = json.getString("access_token");
//						refreshToken = json.getString("refresh_token");
//						scope = json.getString("scope");
//						Intent intent = new Intent(wxEntryActivityWeakReference.get(), SendToWXActivity.class);
//						intent.putExtra("openId", openId);
//						intent.putExtra("accessToken", accessToken);
//						intent.putExtra("refreshToken", refreshToken);
//						intent.putExtra("scope", scope);
//						wxEntryActivityWeakReference.get().startActivity(intent);
//					} catch (JSONException e) {
//						Log.e(TAG, e.getMessage());
//					}
//				}
//			}
		}
	}
//	private void initNativeAndroid()
//	{
//		nativeAndroid = new EgretNativeAndroid(this);
//		if (!nativeAndroid.checkGlEsVersion()) {
//			Toast.makeText(this, "This device does not support OpenGL ES 2.0.",
//					Toast.LENGTH_LONG).show();
//			return;
//		}
//
//		nativeAndroid.config.showFPS = false;
//		nativeAndroid.config.fpsLogTime = 30;
//		nativeAndroid.config.disableNativeRender = false;
//		nativeAndroid.config.clearCache = false;
//		nativeAndroid.config.loadingTimeout = 0;
//
//		if (!nativeAndroid.initialize("http://tool.egret-labs.org/Weiduan/game/index.html")) {
//			Toast.makeText(this, "Initialize native failed.",
//					Toast.LENGTH_LONG).show();
//			return;
//		}
//	}
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

    	api = WXAPIFactory.createWXAPI(this, Constants.APP_ID, false);
		handler = new MyHandler(this);

        try {
            Intent intent = getIntent();
			api.handleIntent(intent, this);
        } catch (Exception e) {
        	e.printStackTrace();
        }
		LogUtil.out("WXEntryActivity onCreate");
//		initNativeAndroid();
	}

	@Override
	protected void onNewIntent(Intent intent) {
		super.onNewIntent(intent);
		
		setIntent(intent);
        api.handleIntent(intent, this);
	}

	@Override
	public void onReq(BaseReq req) {
		switch (req.getType()) {
		case ConstantsAPI.COMMAND_GETMESSAGE_FROM_WX:
//			goToGetMsg();
			break;
		case ConstantsAPI.COMMAND_SHOWMESSAGE_FROM_WX:
//			goToShowMsg((ShowMessageFromWX.Req) req);
			break;
		default:
			break;
		}
        finish();
	}

	@Override
	public void onResp(BaseResp resp) {
		String result = "";
		LogUtil.out("WXEntryActivity onResp => " + resp.errCode);
		switch (resp.errCode)
		{
			case BaseResp.ErrCode.ERR_OK:
				result = "用户同意";
				if(resp instanceof SendAuth.Resp){
					SendAuth.Resp newResp = (SendAuth.Resp)resp;
					String code = newResp.code;
					LogUtil.out("WXEntryActivity 获取code: " + code);
//					// 2. 获取access_token
					getAccessToken(code);
//					MainActivity.sendContentToJs(code, "getcode");
				}
				break;
			case BaseResp.ErrCode.ERR_USER_CANCEL:
				result = "用户取消";
				break;
			case BaseResp.ErrCode.ERR_AUTH_DENIED:
				result = "用户拒绝授权";
				break;
			case BaseResp.ErrCode.ERR_UNSUPPORT:
				result = "暂不支持";
				break;
			default:
				result = "未知错误";
				break;
		}
		Toast.makeText(this, result, Toast.LENGTH_LONG).show();
//		finish();
	}
	private void getAccessToken(String code) {
		StringBuffer loginUrl = new StringBuffer();
		loginUrl.append("https://api.weixin.qq.com/sns/oauth2/access_token")
			.append("?appid=")
			.append(Constants.APP_ID)
				.append("&secret=")
				.append(Constants.APP_SECRET)
				.append("&code=")
				.append(code)
				.append("&grant_type=authorization_code");
		HashMap<String, Object> paramMap = new HashMap<>();
		paramMap.put("handler", getTokenHandler);
		paramMap.put("url", loginUrl);
		SimpleNoticeThread snt = new SimpleNoticeThread();
		snt.setISimpleNoticeService(new SimpleDoProcessService());
		snt.setMap(paramMap);
		snt.start();
	}
	private void getWxUserInfo(String access_token, String openid) {
		StringBuffer url  = new StringBuffer();
		url .append("https://api.weixin.qq.com/sns/userinfo")
				.append("?access_token=")
				.append(access_token)
				.append("&openid=")
				.append(openid);
		HashMap<String, Object> paramMap = new HashMap<>();
		paramMap.put("handler", getWxUserInfoHandler);
		paramMap.put("url", url);
		paramMap.put("httpType", "get");
		SimpleNoticeThread snt = new SimpleNoticeThread();
		snt.setISimpleNoticeService(new SimpleDoProcessService());
		snt.setMap(paramMap);
		snt.start();
	}

	private Handler getTokenHandler = new Handler(){
		@Override
		public void handleMessage(Message msg) {
			String r = msg.obj == null ? "" : msg.obj.toString();
			LogUtil.out(r);
			JSONObject accessTokenObj = null;
			try {
				accessTokenObj = new JSONObject(r);
				if (accessTokenObj.getString("access_token") != null) {
					getWxUserInfo(accessTokenObj.getString("access_token"), accessTokenObj.getString("openid"));
				}
			} catch (Exception e)
			{
				e.printStackTrace();
			}
		}
	};
	private Handler getWxUserInfoHandler = new Handler(){
		@Override
		public void handleMessage(Message msg) {
			// todo，我这里是白鹭有游戏, 这里response里就是微信玩家信息, 可以打印一下
			String r = msg.obj == null ? "" : msg.obj.toString();
			LogUtil.out(r);
			// 发送给白鹭
//			nativeAndroid.callExternalInterface("wxloginR", r);
			MainActivity.sendContentToJs(r, "wxloginR");
			LogUtil.out("执行了唤醒方法");
			WXEntryActivity.this.finish();
		}
	};

}
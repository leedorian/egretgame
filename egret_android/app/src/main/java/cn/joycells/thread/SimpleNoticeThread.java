/**
* 创建时间：2013-11-12
* athor:wuxiaoguang
*/
package cn.joycells.thread;
import java.util.HashMap;
import cn.joycells.service.iface.ISimpleNoticeService;
public class SimpleNoticeThread extends Thread {
	private ISimpleNoticeService _ISimpleNoticeService;
	private HashMap<String, Object> map;
	@Override
	public void run() {
		if (_ISimpleNoticeService == null) {
			return ;
		}
		_ISimpleNoticeService.run(map);
		if (map != null && map.get("test") != null) {
//			MyUtils.logD("", map.get("test").toString());
		}
	}

	public ISimpleNoticeService getISimpleNoticeService() {
		return _ISimpleNoticeService;
	}

	public void setISimpleNoticeService(ISimpleNoticeService _ISimpleNoticeService) {
		this._ISimpleNoticeService = _ISimpleNoticeService;
	}

	public HashMap<String, Object> getMap() {
		return map;
	}

	public void setMap(HashMap<String, Object> map) {
		this.map = map;
	}
	
	
}

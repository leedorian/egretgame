/**
* 创建时间：2013-11-12
* athor:wuxiaoguang
*/
package cn.joycells.service.iface;

import java.util.HashMap;

public interface ISimpleNoticeService {
	
	/**
	 * 执行基本通知方法
	 * @param paramMap 传入的参数MAP
	 */
	public void run(HashMap<String, Object> paramMap);
}

/**
* 创建时间：2013-5-10
* athor:wuxiaoguang
*/
package cn.joycells.service.iface;

import java.util.HashMap;

public interface IDataProcess {
	/**
	 * 获得服务器返回的str
	 * @param paramMap 参数map
	 * @return String
	 */
	public String getDataString(HashMap<String, Object> paramMap);
	/**
	 * 将数据str转换为实体类
	 * @param dataStr
	 * @return
	 */
	public Object getObjByStr(String dataStr);
}

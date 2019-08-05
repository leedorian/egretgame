package cn.joycells.service.impl.dataProcess;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import cn.joycells.service.iface.IDataProcess;
import cn.joycells.util.HttpUtil;

/**
 * Created by PC on 2016/12/19.
 */
public class SimpleDoProcessDataProcess implements IDataProcess {
    @Override
    public String getDataString(HashMap<String, Object> paramMap) {
        HashMap<String, String> map = new HashMap<String, String>();

        Set keySet = paramMap.keySet();
        Iterator iterator = keySet.iterator();
        while(iterator.hasNext()) {
            String key = iterator.next().toString();
            if (!key.equals("handler") && !key.equalsIgnoreCase("url") && !key.equals("httpType")) {
                String val = String.valueOf(paramMap.get(key));
                map.put(key, val);
            }
        }
        String httpType = paramMap.get("httpType") == null ? "post" :  paramMap.get("httpType").toString();
        String result = "";
        if (httpType.equals("post"))
        {
            result = HttpUtil.post(paramMap.get("url").toString(), map, false, null);
        } else {
            List l = new ArrayList<>();
            l.add(map);
            result = HttpUtil.get(paramMap.get("url").toString(), l);
        }

        return result;
    }

    @Override
    public Object getObjByStr(String dataStr) {
        return dataStr;
    }
}

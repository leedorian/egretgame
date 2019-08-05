package cn.joycells.service.impl.service;

import android.os.Handler;
import android.os.Message;



import java.util.HashMap;

import cn.joycells.service.iface.IDataProcess;
import cn.joycells.service.iface.ISimpleNoticeService;
import cn.joycells.service.impl.dataProcess.SimpleDoProcessDataProcess;

/**
 * Created by PC on 2016/12/19.
 */
public class SimpleDoProcessService implements ISimpleNoticeService {
    @Override
    public void run(HashMap<String, Object> paramMap) {
        Handler handler = (Handler) paramMap.get("handler");
        IDataProcess _IDataProcess = new SimpleDoProcessDataProcess();
        String response = _IDataProcess.getDataString(paramMap);
        Message msg = handler.obtainMessage();
        msg.obj = _IDataProcess.getObjByStr(response);
        handler.sendMessage(msg);
    }
}

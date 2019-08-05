/*
 * 文 件 名:  LogUtil.java
 * 版    权:  Huawei Technologies Co., Ltd. Copyright YYYY-YYYY,  All rights reserved
 * 描    述:  <描述>
 * 修 改 人:  alasi
 * 修改时间:  2011-4-26
 * 跟踪单号:  <跟踪单号>
 * 修改单号:  <修改单号>
 * 修改内容:  <修改内容>
 */

package cn.joycells.util;

import android.util.Log;

/**
 * 为了统一启用或者屏蔽打印调试功能而设计的公共日志类。
 * 屏蔽：把下面的打印输出语句注释或者删除就可以统一屏蔽。
 * 开启：把下面的打印输出语句写入就可以统一开启。
 * <功能详细描述>
 *
 * @author alasi
 * @version [版本号, 2011-4-26]
 * @see [相关类/方法]
 * @since [产品/模块版本]
 */
public class LogUtil {
    public static final int V = 1;

    public static final int D = 2;

    public static final int I = 3;

    public static final int W = 4;

    public static final int E = 5;

    private static boolean writeLog = true;

    /**
     * 以默认的方式，只打印用户信息。
     * <功能详细描述>
     *
     * @param info 要打印的语句
     * @see [类、类#方法、类#成员]
     */
    public static void out(String info) {
        if (info != null && writeLog)
            Log.e("----TAG----> ", info);
    }

    /**
     * 带有tag的调试语句
     * <功能详细描述>
     *
     * @param tag
     * @param info
     * @see [类、类#方法、类#成员]
     */
    public static void out(String tag, String info) {
        if (info != null && tag != null && writeLog)
            Log.e("----" + tag + "----> ", info);
    }

    /**
     * 带有日志级别的打印输出。
     * 级别有五个,分别是LogUtil.V、LogUtil.D、LogUtil.I、LogUtil.W、LogUtil.E
     * <功能详细描述>
     *
     * @param infoLevel 级别
     * @param tag       tag
     * @param info      信息
     * @see [类、类#方法、类#成员]
     */
    public static void out(int infoLevel, String tag, String info) {
        if (info != null && tag != null && writeLog) {
            switch (infoLevel) {
                case V: {
                    Log.v("----" + tag + "----> ", info);
                    break;
                }
                case D: {
                    Log.d("----" + tag + "----> ", info);
                    break;
                }
                case I: {
                    Log.i("----" + tag + "----> ", info);
                    break;
                }
                case W: {
                    Log.w("----" + tag + "----> ", info);
                    break;
                }
                case E: {
                    Log.e("----" + tag + "----> ", info);
                    break;
                }
                default:
                    Log.e("----" + tag + "----> ", info);
            }
        }

    }
}

package cn.joycells.util;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.mime.MultipartEntity;
import org.apache.http.entity.mime.content.FileBody;
import org.apache.http.entity.mime.content.StringBody;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.params.CoreConnectionPNames;
import org.apache.http.util.EntityUtils;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by ALS on 15/9/6.
 */
public class HttpUtil {
    private static final int TIME_OUT = 20000;

    public static String post(String urlString, Map<String, String> params, boolean hasAttachment, Map<String, File> attachments) {
        String result = "";
        if (params == null) {
            params = new HashMap<String, String>();
        }
//        if (params != null) {
//            params.put("requestType", "Mobile");
//        }
        LogUtil.out(urlString + " | params : " + params);
        HttpPost httpRequest = new HttpPost(urlString);
        try {
            if (hasAttachment && attachments != null && params != null) {
                MultipartEntity entity = new MultipartEntity();
                for (Map.Entry<String, String> entry : params.entrySet()) {
                    entity.addPart(entry.getKey(), new StringBody(entry.getValue(), Charset.forName("UTF-8")));
                }
                for (String key : attachments.keySet()) {
                    entity.addPart(key, new FileBody(attachments.get(key)));
                }
                httpRequest.setEntity(entity);
            } else if (hasAttachment && attachments != null){
                MultipartEntity entity = new MultipartEntity();
                for (String key : attachments.keySet()) {
                    entity.addPart(key, new FileBody(attachments.get(key)));
                }
                httpRequest.setEntity(entity);
            } else if (params != null) {
                List<NameValuePair> formParams = new ArrayList<NameValuePair>();
                for (Map.Entry<String, String> entry : params.entrySet()) {
                    formParams.add(new BasicNameValuePair(entry.getKey(), entry.getValue()));
                }
                HttpEntity entity = new UrlEncodedFormEntity(formParams, "UTF-8");
                httpRequest.setEntity(entity);
            }

            HttpClient client = new DefaultHttpClient();
            // 请求超时
            client.getParams().setParameter(CoreConnectionPNames.CONNECTION_TIMEOUT, TIME_OUT);
            // 读取超时
            client.getParams().setParameter(CoreConnectionPNames.SO_TIMEOUT, TIME_OUT);
            HttpResponse response = client.execute(httpRequest);
            if (response.getStatusLine().getStatusCode() == 200) {
                result = EntityUtils.toString(response.getEntity());
            } else {
                LogUtil.out(EntityUtils.toString(response.getEntity()));
                result = urlString + "服务端返回非正常状态码->"+String.valueOf(response.getStatusLine().getStatusCode());
            }
            LogUtil.out(result);
        } catch (Exception e) {
            e.printStackTrace();
            LogUtil.out(e.getMessage());
        }
        return result;
    }

    public static String get(String urlString, List<Map<String, String>> params) {
        return get(urlString, params, TIME_OUT);
    }

    public static String get(String urlString, List<Map<String, String>> params, int timeOut) {
        HttpURLConnection conn = null;
        InputStream inputStream = null;
        String result = null;
        try {
            URL url = new URL(urlString);
            conn = (HttpURLConnection) url.openConnection();
            conn.setConnectTimeout(timeOut);
            conn.setReadTimeout(timeOut);
            conn.setDoInput(true);
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Content-Type", "text/html");
            conn.setRequestProperty("Accept-Charset", "utf-8");
            conn.setRequestProperty("contentType", "utf-8");
            inputStream = conn.getInputStream();
            byte[] buffer = null;
            if (conn.getResponseCode() == 200) {
                buffer = new byte[512];
                ByteArrayOutputStream out = new ByteArrayOutputStream();
                int len;
                while ((len = inputStream.read(buffer)) != -1) {
                    out.write(buffer, 0, len);
                }
                buffer = out.toByteArray();
            }
            result = new String(buffer, "UTF-8");
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (inputStream != null) {
                    inputStream.close();
                }
                if (conn != null) {
                    conn.disconnect();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return result;
    }
}

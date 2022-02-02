package com.resihop;
import android.content.Intent;
import android.net.Uri;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class ReactModule extends ReactContextBaseJavaModule{
    ReactModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }
    @Override
    public void initialize() {
        super.initialize();
    }
    /**
     * @return the name of this module. This will be the name used to {@code require()} this module
     * from JavaScript.
     */
    @Override
    public String getName() {
        return "BankIDApp";
    }
    @ReactMethod
    void BankIDApplication(String url) {

        ReactApplicationContext context = getReactApplicationContext();
        Intent intent = new Intent();
        intent.setAction(Intent.ACTION_VIEW);
        intent.setData(Uri.parse(url)) ;
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(intent);
    }
}

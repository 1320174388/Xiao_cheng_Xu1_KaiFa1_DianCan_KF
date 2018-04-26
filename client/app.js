//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
  onLaunch: function () {
      qcloud.setLoginUrl(config.service.loginUrl);
  },
  // 弹框提示
  point:function (title_info, icon_info) {
    // 弹框
    wx.showToast({
      title: title_info,
      icon: icon_info,
      duration: 2000
    });
  }
 
});


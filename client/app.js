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
  },
  // wx.request() 封装函数
  post:function(urls,datas,func){
    wx.request({
      url: urls,
      data: datas,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success: func
    });
  },
  timeBack:function(time){
    setTimeout(function () {
      var pages = getCurrentPages(); // 当前页面  
      var beforePage = pages[pages.length - 2]; // 前一个页面 
      wx.navigateBack({
        success: function () {
          beforePage.onLoad(); // 执行前一个页面的onLoad方法  
        }
      })
    }, time);
  }
});


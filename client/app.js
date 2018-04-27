//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index');
var config = require('./config');

App({
  onLaunch: function () {
      qcloud.setLoginUrl(config.service.loginUrl);
  },
  // 弹框提示
  point:function (title_info, icon_info,time=2000) {
    // 弹框
    wx.showToast({
      title: title_info,
      icon: icon_info,
      duration: time
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
  // 添加修改后提示跳转
  timeBack:function(time){
    setTimeout(function () {
      var pages = getCurrentPages(); // 当前页面  
      var beforePage = pages[pages.length - 2]; // 前一个页面 
      wx.navigateBack({
        success: function () {
          beforePage.onLoad(); // 执行前一个页面的onLoad方法  
        }
      });
    }, time);
  },
  // 页面跳转
  baseUrl:function(urls){
    wx.navigateTo({
      url: urls,
    });
  },
  // 图片上传代码
  imageAdd:function(image){
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: image
    });
  },
  // uploadFile 方法封装函数
  file: function (urls, image_url, names,formDatas,res){
    wx.uploadFile({
      url: urls,
      filePath: image_url,
      name: names,
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      formData: formDatas,
      method: 'POST',
      success: res
    });
  }
});


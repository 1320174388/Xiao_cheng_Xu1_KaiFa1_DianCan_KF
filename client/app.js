//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index');
var config = require('./config');
var app = getApp();

App({
  onLaunch: function () {
      qcloud.setLoginUrl(config.service.loginUrl);
  },
  /**
   * 掉起微信支付功能
   */
  Payment: function (order_number, price, success, fail, complete) {
    var myDate = new Date();
    var timestamp = Date.parse(myDate);
    var This = this;
    This.post(
      config.wx_payment.openid, {
        'token': wx.getStorageSync('token'),
        'body': '地老天荒-点餐模板',
        'total_fee': price,
        'order_number': order_number
      }, function (res) {
        if (res.data.retData) {
          This.post(
            config.wx_payment.pay, {
              'prepay_id': res.data.retData.prepay_id
            }, function (res) {
              if (res.data.retData) {
                wx.requestPayment(
                  {
                    'timeStamp': "" + res.data.retData.timeStamp + "",
                    'nonceStr': res.data.retData.nonceStr,
                    'package': res.data.retData.package,
                    'signType': res.data.retData.signType,
                    'paySign': res.data.retData.paySign,
                    'success': success,
                    'fail': fail,
                    'complete': complete
                  })
              }
            }
          );
        }
      }
    );
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
  },
  // 判断数组是否为空
  isArrayNull:function(arr){
    for(var i in arr){
      if (i){
        return true;
      }
    }
  },
  // 计算购物车总价格及数量
  orderCrat:function (arr,typeString) {
    if (typeString == 'price'){
      var price = 0;
      for (var i in arr){
        if (arr[i]) {
          price += (parseFloat(arr[i].food_price) * parseFloat(arr[i].food_number));
        }
      }
      return price;
    }
    if (typeString == 'number') {
      var food_number = 0;
      for (var i in arr) {
        if (arr[i]) {
          food_number += parseFloat(arr[i].food_number);
        }
      }
      return food_number;
    }
  }
});
login_add();
// 用户登录信息
function login_add() {
  setInterval(function () {
    if (wx.getStorageSync('token')) {
      return false;
    }
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.request({
            url: config.service.cheshiUrl,
            data: {
              code: res.code
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'post',
            success: function (res) {
              console.log(res.data);
              wx.setStorageSync('token', res.data.retData.token);
            }
          });
        } else {
          console.log('登录失败' + res.errMsg);
        };
      }
    });
  }, 500);
};
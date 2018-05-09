var config = require("../../../../config.js");
var app = getApp();
var myDate = new Date();
// pages/Home/submit/intoroom/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host:config.service.host,
    table_number:'请扫描座号',
    shop_addr:null,
    food_info_arr: null,
    open: false,
    close: false,
    dates: '选择日期',
    times: '选择时间',
    index: 0,
  },
  //  点击时间组件确定事件  
  bindTimeChange: function (e) {
    console.log("谁哦按")
    this.setData({
      times: e.detail.value
    })
  },
  //  点击日期组件确定事件  
  bindDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      dates: e.detail.value
    })
  },
  // 单选按钮
  showitem: function () {
    this.setData({
      open: true,
      close: false
    })
  },
  showitems: function () {
    this.setData({
      close: true,
      open: false
    })
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var This = this;

    var Y = myDate.getFullYear();
    var m = myDate.getMonth() + 1;
    var d = myDate.getDate();

    if ( m < 10 ){ m = "0" + m; }
    if ( d < 10 ){ d = "0" + d; }

    var H = myDate.getHours()+1;
    var i = myDate.getMinutes()
    
    This.setData({
      food_info_arr: wx.getStorageSync('food_info_arr'),
      dates: Y + "-" + m + "-" + d,
      times: H + ":" + i
    });
    
    setInterval(function (res) {
      This.setData({
        food_info_arr: wx.getStorageSync('food_info_arr'),
      });
    }, 500);
    app.post(
      config.shop.getShopAddr,{

      },function(res){
        This.setData({
          shop_addr: res.data.retData.shop_addr,
        });
      }
    );
  },

  /**
   * 扫描二维码
   */
  ScanCode:function(e){
    var This = this;
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log(res.result)
        This.setData({
          table_number: res.result+'号座'
        });
      }
    })
  },
  /**
   * 掉起微信支付功能
   */
  Payment:function(e){
    var timestamp = Date.parse(myDate);
    var price = e.currentTarget.dataset.total_fee * 100;
    app.post(
      config.wx_payment.openid,{
        'token':wx.getStorageSync('token'),
        'body':'商家名称-销售商品类目',
        'total_fee': price
      },function(res){
        console.log(res.data)
      }
    );
  },
  pay: function () {
    wx.navigateTo({
      url: '/pages/Home/success/index',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
})
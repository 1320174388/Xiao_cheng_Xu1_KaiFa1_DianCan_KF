// pages/power/list/index.js
var config = require('../../../../config');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectPerson: true,
    selectArea: false,
    array:'',
    arrayList: null,
    update_value:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var THIS = this
    app.post(
      config.service.position, {
        'token': wx.getStorageSync('token')
      }, function (res) {
        if (res.data.retData) {
          THIS.setData({
            array: res.data.retData.list
          });
        };
      }
    );
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

// form提交
  formSubmit:function(e){
    // 添加职位
    var add = this;
    var roleName=e.detail.value.roleName;
    var value = e.detail.value;
    delete value["roleName"];
    var i = 0;
    for (var key in value) {
      if (value[key] == true) {
        value['right'+i] = key;
      }
      delete value[key];
      i++;
    };
    var arr = []
    for (var i in value) {
      arr.push(value[i]); //属性
    }
    app.post(
      config.service.addPosition, {
        'token': wx.getStorageSync('token'),
        'roleName': roleName,
        'right': arr,
      },function(res){
        if (res.data.errNum == 0) {
          add.setData({
            arrayList: res.data.retData
          });
          app.point(res.data.retMsg, "success");
          app.timeBack(1000);
        } else {
          app.point(res.data.retMsg, "none");
        };
      }
    );
  }
})
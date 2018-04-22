// pages/Admin/Authority/update/index.js
var config = require('../../../../config');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    update_value: '',
    array: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var value = wx.getStorageSync('value');
    if (value) {
      this.setData({ update_value: value });
    }
    var THIS = this
    wx.request({
      url: config.service.position,
      data: {
        'token': wx.getStorageSync('token')
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function (res) {

        if (res.data.retData) {
          THIS.setData({
            array: res.data.retData.list
          });
        };
        console.log(res.data);
      }
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
  // form提交
  formSubmitupdate: function (e) {
    // 修改职位
    var id = wx.getStorageSync('value').id;

    wx.removeStorageSync('value');
    var update = this;
    var roleName = e.detail.value.roleName;
    var value = e.detail.value;
    delete value["roleName"];
    var right = [];
    var i = 0;
    for (var key in value) {
      if (value[key] == true) {
        right[i] = key;
      }
      i++;
    };
    console.log(this.update_value);
    console.log(right);
    console.log(roleName)
    wx.request({
      url: config.service.updatePosition,
      data: {
        'token': wx.getStorageSync('token'),
        'roleName': roleName,
        'right': right,
        'id':id,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function (res) {
        if (res.data.retData) {
          update.setData({
            arrayList: res.data.retData
          });
        };

      }
    }),
      wx.navigateTo({
        url: "/pages/Admin/Authority/updatePower/index",
      })
  }
})
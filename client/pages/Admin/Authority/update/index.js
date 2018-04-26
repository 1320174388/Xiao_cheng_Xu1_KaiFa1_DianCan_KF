// pages/Admin/Authority/update/index.js
var config = require('../../../../config');
var app = getApp();
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
    var role_arr = wx.getStorageSync('value');
    var id = role_arr.id; // 获取id
    var update = this;
    var roleName = e.detail.value.roleName;
    var right = e.detail.value;
    delete right['roleName'];
    var assync_c = 0;
    for (var key in right) {
      if (right[key] == true) {
        right['right'+assync_c] = key;
      }
      delete right[key];
      assync_c++;
    };
    var arr = []
    for (var i in right) {
      arr.push(right[i]); //属性
    }
    console.log(arr);
    wx.request({
      url: config.service.updatePosition,
      data: {
        'token': wx.getStorageSync('token'),
        'roleName': roleName,
        'right':arr,
        'id':id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function (res) {
        if (res.data.errNum == 0) {
          wx.removeStorageSync('value');
          app.point("成功", "success");
          setTimeout(function () {
            var pages = getCurrentPages(); // 当前页面  
            var beforePage = pages[pages.length - 2]; // 前一个页面 
            wx.navigateBack({
              success: function () {
                beforePage.onLoad(); // 执行前一个页面的onLoad方法  
              }
            })
          }, 1000);
         
        } else if (res.data.errNum == 1) {
          app.point("你没有权限进行此操作", "none");
        } else if (res.data.errNum == 2) {
          app.point("要修改角色不存在", "none");
        } else if (res.data.errNum == 3) {
          app.point("职位已存在", "none");
        }else{
          app.point("修改失败", "none");
        }
      }
    })
   
  }
})
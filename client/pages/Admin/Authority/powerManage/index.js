// pages/power/list/index.js
var config = require('../../../../config');
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
    var value = wx.getStorageSync('value');
    console.log(value);
    if (value){
        this.setData({update_value:value});
    }
    wx.removeStorageSync('value');
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
  formSubmit:function(e){
    // 添加职位
    var add = this;
    var roleName=e.detail.value.roleName;
    var value = e.detail.value;
    console.log(value);
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
    console.log(value);
    wx.request({
      url: config.service.addPosition,
      data: {
        'token': wx.getStorageSync('token'),
        'roleName':roleName,
        'right': arr,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function (res) {
        if (res.data.errNum == 0) {
          add.setData({
            arrayList: res.data.retData
          });
          console.log('添加成功');
          var pages = getCurrentPages(); // 当前页面  
          var beforePage = pages[pages.length - 2]; // 前一个页面 
          wx.navigateBack({
            success: function () {
              beforePage.onLoad(); // 执行前一个页面的onLoad方法  
            }
          })
        }else{
          console.log('添加失败');
        };
      }
    })
  }

})
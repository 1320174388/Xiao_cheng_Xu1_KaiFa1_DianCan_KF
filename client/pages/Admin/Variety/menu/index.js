// pages/Admin/menu/index/index.js
var config = require('../../../../config.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select: false,
    selected: true,
    showModalStatus: "hide",
    datas: null,
    host:null,
    foodclass:null,
    foodInfo:null,
    edits:null
  },
  // 删除菜品
  delfoods:function(e){
    var THIS = this;
    wx.request({
      url: config.foods.delete, //仅为示例，并非真实的接口地址
      data: {
        "token": wx.getStorageSync('token'),
        'id':e.currentTarget.dataset.id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: 'POST',
      success: function (res) {
        if (res.data.errNum == 0) {
          THIS.setData({
            foodclass: res.data.retData
          });
          app.point("成功", "success");
          setTimeout(function () {
            THIS.onLoad()
          }, 1000);
         
        } else if (res.data.errNum == 1){
          app.point("对不起,您不是管理员身份", "none");
        }else{
          app.point("删除失败", "none");m
        }
      }
    });
  },
  // 修改菜品信息
  editfoods:function(e){
    var i = e.currentTarget.dataset.index;
    wx.setStorageSync('editfoods', this.data.datas[i]);
    wx.navigateTo({
      url: '/pages/Admin/Variety/editlist/editlist',
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var THIS = this;
    wx.request({
      url: config.service.foods, //仅为示例，并非真实的接口地址
      data: {
        "token": wx.getStorageSync('token')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: 'POST',
      success: function (res) {
        if (res.data.errNum == 0) {
          THIS.setData({
            foodclass: res.data.retData
          })
        }
      }
    });
    wx.request({
      url: config.service.foodsList, //仅为示例，并非真实的接口地址
      data: {
        "token": wx.getStorageSync('token')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: 'POST',
      success: function (res) {
        if (res.data.errNum == 0) {
          THIS.setData({
            host:config.service.host,
            datas: res.data.retData
          })
        }
      }
    });
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
  select: function (e) {
    if ('w' == e.currentTarget.dataset.w) {
      this.setData({
        select: false,
        selected: true
      })
    } else if ('y' == e.currentTarget.dataset.y) {
      this.setData({
        select: true,
        selected: false
      })
    }
  },
  infomation:function(e){
    var i = e.detail.value.attr
    this.setData({
      host: config.service.host,
      foodInfo:this.data.datas[i]
    })
    var THIS = this
    setTimeout(function () { 
      THIS.setData({
        showModalStatus:"show"
      })
    },1000)
  },

  close:function(){
    this.setData({
      showModalStatus:"hide"
    })
  },
  // 添加菜品分类
  adds:function(){
    wx.navigateTo({
      url: '/pages/Admin/Variety/cate/cate'
    })
  },
  // 添加菜品列表
  cates:function(){
    wx.navigateTo({
      url: "/pages/Admin/Variety/addlist/addlist"
    })
  },
  // 删除菜品列表
  removes:function(e){
    var i = e.currentTarget.dataset.remid;
    var THIS=this;
    wx.request({
      url: config.service.menuRemove, //仅为示例，并非真实的接口地址
      data: {
        "token": wx.getStorageSync('token'),
        "class_id":i
      },
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        if (res.data.errNum == 0) {
          THIS.setData({
            host: config.service.host,
            datas: res.data.retData
          })
          app.point("成功", "success");
          setTimeout(function () {
            THIS.onLoad()
          }, 1000);
        } else if (res.data.errNum == 1){
          app.point("对不起,您不是管理员身份", "none");
        } else if (res.data.errNum == 2) {
          app.point("没有接收到修改分类的ID", "none");
        } else if (res.data.errNum == 3) {
          app.point("分类下有食品不可删除", "none");
        } else{
          app.point("删除失败", "none");
        }
      }
    })
  },

  formSubmit:function(e){
    wx.setStorageSync('key', e.detail.value);
    wx.navigateTo({
      url: '/pages/Admin/Variety/edit/edit'
    })
  }
})
var config = require('../../../../config.js');
// pages/Admin/addlist/addlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productInfo: {},
    image_url: '/icon/uppic.png',
    classlist:null
  },
  // 表单提交事件
  formSubmit:function(e){
    var This = this;
    wx.uploadFile({
      url: config.foods.create, //仅为示例，并非真实的接口地址
      filePath: This.data.image_url,
      name: "food_img",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      formData: {
        "token": wx.getStorageSync('token'),
        "food_name": e.detail.value.food_name,
        "class_id": e.detail.value.class_id,
        "food_price": e.detail.value.food_price,
        "food_sort": e.detail.value.food_sort,
        "food_info": e.detail.value.food_info,
      },
      method: 'POST',
      success: function (res) {
        var data = JSON.parse(res.data);
        if (data.errNum == 0) {
          wx.navigateTo({
            url: '/pages/Admin/Variety/menu/index',
          })
        }
      },
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var This = this;
    wx.request({
      url: config.service.foods,
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        "token": wx.getStorageSync('token'),
      },
      method: 'POST',
      success: function (res) {
        This.setData({
            classlist:res.data.retData
        });
      }
    })
  },
  // 上传代码
  image: function () {
    var This = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        This.setData({
          image_url: res.tempFilePaths[0]
        });
        console.log(res.tempFilePaths[0])
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
  //添加Banner  
  bindChooiceProduct: function () {
    var that = this;

    wx.chooseImage({
      count: 3,  //最多可以选择的图片总数  
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        var tempFilePaths = res.tempFilePaths;
        //启动上传等待中...  
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 10000
        })
        var uploadImgCount = 0;
        for (var i = 0, h = tempFilePaths.length; i < h; i++) {
          wx.uploadFile({
            url: util.getClientSetting().domainName + '/home/uploadfilenew',
            filePath: tempFilePaths[i],
            name: 'uploadfile_ant',
            formData: {
              'imgIndex': i
            },
            header: {
              "Content-Type": "multipart/form-data"
            },
            success: function (res) {
              uploadImgCount++;
              var data = JSON.parse(res.data);
              //服务器返回格式: { "Catalog": "testFolder", "FileName": "1.jpg", "Url": "https://test.com/1.jpg" }  
              var productInfo = that.data.productInfo;
              if (productInfo.bannerInfo == null) {
                productInfo.bannerInfo = [];
              }
              productInfo.bannerInfo.push({
                "catalog": data.Catalog,
                "fileName": data.FileName,
                "url": data.Url
              });
              that.setData({
                productInfo: productInfo
              });

              //如果是最后一张,则隐藏等待中  
              if (uploadImgCount == tempFilePaths.length) {
                wx.hideToast();
              }
            },
            fail: function (res) {
              wx.hideToast();
              wx.showModal({
                title: '错误提示',
                content: '上传图片失败',
                showCancel: false,
                success: function (res) { }
              })
            }
          });
        }
      }
    });
  } 
})
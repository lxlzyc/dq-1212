// pages/user/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    showModal: false,
    phone: '',
    code: '',
    favorite_channel_badge: 0,
    feed_badge: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
      })
    }
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
    //this.getUserInfo()
    console.info("test --->")
    this.jdbctest()
  },

  jdbctest(){
    var that = this;
    wx.request({
      url: app.globalData.url + 'test/jdbc',
      header:{},
      success(res){
        console.info("test ---> result = "+res)
      }
    })
  },
  getUserInfo() {
    var that = this;
    wx.request({
      url: app.globalData.url + 'user/status',
      header: { 'X-Auth-Token': app.globalData.token },
      success(res) {
        if (res.data.code == 200) {
          var count = res.data.data.favorite_channel + res.data.data.feed;


          that.setData({
            favorite_channel_badge: res.data.data.favorite_channel,
            feed_badge: res.data.data.feed
          })

          wx.setTabBarBadge({
            index: 2,
            text: count + ''
          })
        }

      },
      fail(dt) {
        wx.showToast({
          title: 'error',
        })
      }
    })
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

  // messageTap: function () {
  //   app.tdsdk.event({
  //     id: 'event_017',
  //     label: '我的消息点击量',
  //     params: {}
  //   })
  //   wx.navigateTo({
  //     url: '/pages/user/message',
  //   })
  // },
  // followTap: function () {
  //   app.tdsdk.event({
  //     id: 'event_018',
  //     label: '我的订阅点击量',
  //     params: {}
  //   })
  //   wx.navigateTo({
  //     url: '/pages/user/subscribe',
  //   })
  // },
  // historyTap: function () {
  //   app.tdsdk.event({
  //     id: 'event_019',
  //     label: '收听历史点击量',
  //     params: {}
  //   })
  //   wx.navigateTo({
  //     url: '/pages/user/history',
  //   })
  // },
  // likedTap: function () {
  //   app.tdsdk.event({
  //     id: 'event_020',
  //     label: '我的收藏点击量',
  //     params: {}
  //   })
  //   wx.navigateTo({
  //     url: '/pages/user/collection',
  //   })
  // },
  // feedbackTap: function () {
  //   app.tdsdk.event({
  //     id: 'event_021',
  //     label: '意见反馈点击量',
  //     params: {}
  //   })
  //   wx.navigateTo({
  //     url: '/pages/user/feedback',
  //   })
  // },
  touchAvatar: function () {
    this.setData({
      showModal: true
    })
  },
  hideModal: function () {
    this.setData({
      showModal: false
    })
  },
  onCancel: function () {
    this.hideModal();
  },
  onConfirm: function () {
    if (this.data.phone.length != 11) {
      wx.showToast({
        title: '请输入正确的手机号码',
        icon: 'none',
      })
      return;
    }

    if (this.data.code.length == 0) {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none',
      })
      return;
    }

    var that = this;
    wx.request({
      url: app.globalData.url + 'passport/bind_phone',
      method: "POST",
      header: { "X-Auth-Token": app.globalData.token },
      data: {
        phone: that.data.phone,
        code: that.data.code,
      },
      success(res) {
        console.log(res)
        wx.showToast({
          title: '绑定成功'
        })
        that.hideModal();
      },
      fail(dt) {
        console.log(dt);
      }
    })
  },
  preventTouchMove: function () {

  },
  touchCode: function (e) {
    if (this.data.phone.length != 11) {
      wx.showToast({
        title: '请输入正确的手机号码',
        icon: 'none',
      })
      return;
    }

    var that = this;
    wx.request({
      url: app.globalData.url + 'passport/sms',
      method: "POST",
      header: { "X-Auth-Token": app.globalData.token },
      data: {
        phone: that.data.phone,
      },
      success(res) {
        console.log(res)
        wx.showToast({
          title: '发送成功'
        })

      },
      fail(dt) {
        console.log(dt);
      }
    })
  },
  phoneInput: function (e) {
    var value = e.detail.value;
    this.setData({
      phone: value
    })
  },
  codeInput: function (e) {
    var value = e.detail.value;
    this.setData({
      code: value
    })
  }
})
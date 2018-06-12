//index.js
//获取应用实例
const app = getApp()
const util = require('../../../utils/util')

Page({
  data: {
    date:'2018-01-01',
    begindate:'2018-01-01',
    time:'12:30',
    users:null,
    userIds: null,
    mapAddress:'',
    map:null,
  },
  onLoad: function (options) {
    var now = util.formatTimeNoS(new Date());
    console.info('now=='+now.substring(0,10));
    this.setData({
      date: now.substring(0, 10),
      begindate: now.substring(0, 10)
    });
  },
  bindDateChange:function (e){
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  
    var value = e.detail.value;

    var that = this;
    if (value.type <= 0){
      that.formError('请选择活动类型');
      return false;
    }
    if (value.title <= 0) {
      that.formError('请输入活动主题');
      return false;
    }
    if (value.address <= 0) {
      that.formError('请输入活动地址');
      return false;
    }
    var time = value.activityDate + ' ' + value.activityTime + ':00';
    console.info('time  == ' + time);
    if (util.hourToNow(new Date(time))<=0){
      that.formError('活动时间错误，请选择一小时之后的时间');
      return false;
    }
    value.time = time;
    value.userIds = that.data.userIds;
    value.map = JSON.stringify(that.data.map);
    console.info(value.time);
    console.info(value.map);

    wx.request({
      url: app.globalData.url + 'activities',
      data: value,
      method: "POST",
      header: {
        // 'Content-Type': 'application/json'
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res.data);
        wx.showToast({
          title: '创建成功',
          icon: 'success',
          duration: 1000,
          success: function () {
            console.info('showToast succe');
            setTimeout(function(){
              wx.switchTab({
                url: '/pages/index/index'
              });
            },1500);
          }
        });
      },
      fail(dt) {
      }
    });

    
  },
  formReset: function () {
    console.log('form发生了reset事件')
    var that = this;
    this.setData({
      date: that.data.begindate
    });
  },
  formError:function(msg){
    wx.showModal({
      title: '提示',
      content: msg
    });
  },
  formSuccess: function () {
    console.info('success');
  },
  addUser: function () {
    wx.navigateTo({
      url: '../userlist/index?userIds=' + JSON.stringify(this.data.userIds)
    })
  },
  removeUser:function(e){
    console.info(e.currentTarget.dataset.id);
    var that = this;
    var users = that.data.users;
    var userIds = that.data.userIds;

    var index = userIds.indexOf(''+e.currentTarget.dataset.id);
    console.info(JSON.stringify(userIds) + "|" + index);
    if(index>=0){
      users.splice(index,1);
      userIds.splice(index, 1);
      console.info(JSON.stringify(userIds) + "|" + index);

      that.setData({
        users:users,
        userIds:userIds
      });
    }
  },
  getMapInfo:function(){
    var that =this;
    wx.chooseLocation({
      success: function (data) {
        console.info('map-->'+JSON.stringify(data));
        console.info('latitude' + data.latitude);
        console.info('longitude' + data.longitude);
        // data.address
        // this.setData
        if (!data.address){
          return;
        }
        var map = {};
        map.latitude = data.latitude;
        map.longitude = data.longitude;
        map.name = data.name;

        that.setData({
          mapAddress: data.address,
          map: map
        });
      }
    });
  }
  
})

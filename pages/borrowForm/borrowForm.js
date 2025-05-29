// pages/borrowForm/index.js
// 导入封装好的接口
const http = require('../../api/http');
const request = require('../../request/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    borrowRemark: '',
    returnTime: '',
    show: false,
    deviceId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取设备id
    const { deviceId } = options
    if (!deviceId) {
      wx.showToast({
        title: '设备ID不存在',
        icon: 'none',
        duration: 1000
      })
      // 跳转到设备列表页
      wx.navigateTo({
        url: '/pages/equipList/index',
      });
      return;
    } else {
      this.setData({
        deviceId
      })
    }
  },
  onDisplay() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  // 格式化日期
  formatDate(returnTime) {
    returnTime = new Date(returnTime);
    const year = returnTime.getFullYear();
    const month = String(returnTime.getMonth() + 1).padStart(2, '0');
    const day = String(returnTime.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },
  onConfirm(event) {
    console.log(this.formatDate(event.detail),'1111');
    this.setData({
      show: false,
      returnTime: this.formatDate(event.detail),
    });
  },
  onSubmit() {
    // 获取id
    let userId = wx.getStorageSync('userInfo').regId
    http.borrowEquip({
      deviceId: this.data.deviceId,
      userId:userId,
      borrowRemark: this.data.borrowRemark,
      returnTime: this.data.returnTime,
    }).then(res => {
      console.log(res);
      if (res.code === 200) {
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 1000
        })
        // 返回到上一个页面
        wx.navigateBack({
          delta: 1
        });
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 1000
        })
        // 返回到上一个页面
        wx.navigateBack({
          delta: 1
        });
      }
    })
  }
})
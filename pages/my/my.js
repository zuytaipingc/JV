Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{},
  },
  /**
    * 生命周期函数--监听页面加载
  */
  onLoad(options) {
    // 获取用户信息
  },
  // 跳转到登录页面 如果登录成功就不跳转
  goLogin(){
    // 判断是否登录
    let user = wx.getStorageSync('userInfo')
    console.log(user,'888');
    if(user.userName) {
      wx.showToast({
        title: '您已经登录',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    // 跳转到登录页面
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  myBorrowingList(){
    // 跳转到我的借阅列表
    wx.navigateTo({
      url: '/pages/myOrderList/myOrderList',
    })
  },
  //跳转到关于页面
  goAbout(){
    // 跳转到关于页面
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  // 退出登录
  exit(){
    // 清除本地缓存
    wx.clearStorageSync()
    // 提示退出成功
    wx.showToast({
      title: '退出成功',
      icon: 'none',
      duration: 1000
    })
    // 重新加载页面
    wx.reLaunch({
      url: '/pages/my/my',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    let user = wx.getStorageSync('userInfo')
    if(user) {
      this.setData({
        user
      })
    }
  }
})
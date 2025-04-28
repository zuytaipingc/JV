Page({
  //初始数据
  data:{


  },
  //跳转关于页面
  about(){
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  //跳转借用记录
  myOrderList(){
    wx.navigateTo({
      url: '/pages/myOrderList/myOrderList',
    })
  }
})
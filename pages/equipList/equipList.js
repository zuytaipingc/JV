Page({
  data: {
    // 搜索框
    value: '',
    //tab选项
    active: 0,
    //列表
    equipList: [
      {
        deviceId:0,
        deviceImg:'https://picb7.photophoto.cn/11/537/11537487_1.jpg',
        deviceName: '联想扬天台式机',
        deviceStatus: 1,
        updateTime: '2025-03-31'
      },
      {
        deviceId:1,
        deviceImg: 'https://picb7.photophoto.cn/11/537/11537487_1.jpg',
        deviceName: '神舟优雅X5笔记本电脑',
        deviceStatus: 0,
        updateTime: '2025-04-01'
      },
      
    ],
  },
  //跳转到设备详情界面
  equipDetail(){
    wx.navigateTo({
      url: '/pages/equipDetail/equipDetail',
    })
  }


})
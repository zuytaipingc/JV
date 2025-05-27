// 导入接口
const http = require('../../api/http');
const request = require('../../request/index')
Page({
   // 初始化数据
   data: {
    equipDetail:{},
    // 获取url地址
    url: request.base_url
  },
  // 图片预览
  previewImage(event) {
    console.log(event, 123);
    // 解构出pic
    const { pic } = event.currentTarget.dataset
    wx.previewImage({
      urls: [pic]
    })
  },
  // 页面加载
  onLoad(options){
    console.log(options,66666);
    // 解构id
    const {deviceId} = options
    if(!deviceId){
      wx.showToast({
        title: '设备ID不存在',
        icon:'none'
      })
      wx.navigateTo({
        url: '/pages/equipList/equipList',
      })
      return
    }else{
      this.getDeviceDetail(deviceId);
    }
  },
  // 获取设备详情
  getDeviceDetail(deviceId){
    http.equipDetail({deviceId}).then(res =>{
      console.log(res,999);
      // 解构出data
      const {data} = res
      //  把data赋值给equipDetail
      this.setData({
        equipDetail:data
      })
    })
  },
  borrowEquip(event){    
    // 如果设备状态为1，表示设备已经借出 提示不可借用
    console.log(event,"event");
    if(event.currentTarget.dataset.devicestatus === 1){
      wx.showToast({
        title: '设备已借出',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    //跳转到借用表单页
    wx.navigateTo({
      url: '/pages/borrowForm/borrowForm?deviceId='+this.data.equipDetail.deviceId,
    })
  }
})
// 导入接口
const http = require('../../api/http')
const request = require('../../request/index')
Page({
  data: {
    // 搜索框
    deviceName: '',
    //tab选项
    active: 0,
    //列表
    equipList: [],
    //获取url地址
    url:request.base_url
  },
  //跳转到设备详情界面
  equipDetail(event) {
    console.log(event,666);
    //解构出id
    const {deviceId} = event.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/equipDetail/equipDetail?deviceId=${deviceId}`,
    })
  },
  // 页面加载监听
  onLoad(options) {
    //获取列表
    this.getAllBorrowingList()
  },
  //获取列表(所有借用记录信息)
  getAllBorrowingList(query) {
    http.equipList(query).then(res => {
      console.log(res, 9999);
      if (res.code == 200) {
        const { data } = res
        this.setData({
          equipList: data
        })
      }
    })
  },
  //图片预览
  previewImage(event){
    console.log(event,123);
    //结构出pic
    const {pic} = event.currentTarget.dataset
    wx.previewImage({
      urls: [pic],
    })
  },
  //搜索
  onSearch(event) {
    // 获取搜索框的值
   const { detail } = event;
    // 去除字符串的所有空格
   const deviceName = detail.replace(/\s/g, '');
    // 判断是否为空
   if (deviceName === '') {
    wx.showToast({
    title: '请输入搜索内容',
    icon: 'none',
    });
    // 清空搜索框
   this.setData({
    deviceName: ''
    })
    return;
    }
    // 获取搜索结果 和 设备状态
   const query = {
    deviceName: deviceName,
    deviceStatus: this.data.deviceStatus
    }
    this.getAllBorrowingList(query)
    },
   
  //Tab项切换
  changeTab(event) {
    console.log(event,"event.detail")
    const query = {
      deviceName: this.data.deviceName,
      deviceStatus: event.detail.index === 0 ? 0 : event.detail.index - 1
    }
    // 设置设备状态
    this.setData({
      deviceStatus: query.deviceStatus
    })
    // 根据detail中index的值传递不同的参数 index  0:全部 1:可借用 2:已借出
    if(event.detail.index === 0){
      // 获取所有借用记录信息 不用传参数
      this.getAllBorrowingList()
    } else if(event.detail.index === 1){
      // 获取可借用设备信息 deviceStatus传递0
      this.getAllBorrowingList(query)
    } else if(event.detail.index === 2){
      // 获取已借出设备信息 deviceStatus传递1
      this.getAllBorrowingList(query)
    }
  },
})
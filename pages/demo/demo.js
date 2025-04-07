Page({
  data: {
    // 列表
    list: []
  },
  // 获取数据的方法
  getData() {
    // 显示 loading 加载
    wx.showLoading({
      title: '数据加载中...',
      // mask 阻止触摸穿透
      mask: false
    });

    // 网络请求
    wx.request({
      // 接口地址
      url: 'https://gmall-prod.atguigu.cn/mall-api/index/findBanner',
      // 请求方式
      method: 'GET',
      // 回调函数_API 执行成功后，执行的回调，res 是指服务器相应的数据
      success: (res) => {
        if (res.data.code === 200) {
          this.setData({
            list: res.data.data
          });
        }
      },
      // 回调函数：API 调用失败执行的回调
      fail: (err) => {
        console.log('请求失败:', err);
      },
      // 不管成功和失败都会执行的回调函数
      complete: (res) => {
        // 
        wx.hideLoading();
      }
    });
  },
  // 删除商品
  async delHandle() {
    // 显示模态框
    const { confirm } = await wx.showModal({
      // 标题
      title: '提示',
      // 内容
      content: '是否删除该商品？',
    });

    if (confirm) {
      wx.showToast({
        title: '删除成功',
        icon: 'success',
        duration: 2000
      });
    } else {
      wx.showToast({
        title: '取消删除',
        icon: 'error',
        duration: 2000
      });
    }
  }
});
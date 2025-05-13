// pages/dailyEnglish/dailyEnglish.js
Page({
  data: {
    dailyEnglish: null,  // 每日英语数据
    loading: false,      // 加载状态
    errorMsg: '',        // 错误信息
    showChinese: true    // 是否显示中文
  },

  // 生命周期函数--监听页面加载
  onLoad: function(options) {
    // 页面加载时自动获取每日英语
    this.getDailyEnglish();
  },

  // 获取每日英语
  getDailyEnglish: function() {
    this.setData({
      loading: true,
      errorMsg: ''
    });

    wx.request({
      url: 'https://api.vvhan.com/api/dailyEnglish',
      method: 'GET',
      success: (res) => {
        if (res.statusCode === 200 && res.data.success) {
          this.setData({
            dailyEnglish: res.data.data,
            loading: false
          });
        } else {
          this.handleError(res.data.message || '获取每日英语失败');
        }
      },
      fail: (err) => {
        this.handleError('请求失败，请检查网络');
      }
    });
  },

  // 获取随机每日英语
  getRandomDailyEnglish: function() {
    this.setData({
      loading: true,
      errorMsg: ''
    });

    wx.request({
      url: 'https://api.vvhan.com/api/dailyEnglish?types=jj',
      method: 'GET',
      success: (res) => {
        if (res.statusCode === 200 && res.data.success) {
          this.setData({
            dailyEnglish: res.data.data,
            loading: false
          });
        } else {
          this.handleError(res.data.message || '获取随机每日英语失败');
        }
      },
      fail: (err) => {
        this.handleError('请求失败，请检查网络');
      }
    });
  },

  // 切换中英文显示
  toggleLanguage: function() {
    this.setData({
      showChinese: !this.data.showChinese
    });
  },

  // 预览图片
  previewImage: function() {
    if (!this.data.dailyEnglish || !this.data.dailyEnglish.pic) return;
    
    wx.previewImage({
      urls: [this.data.dailyEnglish.pic],
      current: this.data.dailyEnglish.pic
    });
  },

  // 错误处理
  handleError: function(msg) {
    this.setData({
      loading: false,
      errorMsg: msg
    });
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 2000
    });
  },

  // 下拉刷新
  onPullDownRefresh: function() {
    this.getDailyEnglish(() => {
      wx.stopPullDownRefresh();
    });
  }
});

// pages/dailyEnglish/dailyEnglish.js
// Page({
//   data: {
//     dailyEnglish: null,
//     loading: false,
//     errorMsg: '',
//     showChinese: false, // 默认隐藏中文
//     localLibrary: [
//       {
//         en: "The best way to predict the future is to create it.",
//         zh: "预测未来的最好方式就是去创造它。",
//         pic: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
//       },
//       {
//         en: "Life is like riding a bicycle. To keep your balance, you must keep moving.",
//         zh: "人生就像骑自行车，想保持平衡就得往前走。",
//         pic: "https://images.unsplash.com/photo-1483721310020-03333e577078?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
//       },
//       {
//         en: "The only way to do great work is to love what you do.",
//         zh: "成就的唯一途径是热爱自己的事业。",
//         pic: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
//       },
//       // 更多唯美英语句子...
//       {
//         en: "Every moment is a fresh beginning.",
//         zh: "每一刻都是新的开始。",
//         pic: "https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
//       },
//       {
//         en: "The flower that blooms in adversity is the rarest and most beautiful of all.",
//         zh: "逆境中绽放的花最珍贵也最美丽。",
//         pic: "https://images.unsplash.com/photo-1516834474-48c0abc2a902?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
//       }
//     ],
//     lastFetchDate: null
//   },

//   onLoad: function() {
//     this.checkAndLoadDailyEnglish();
//   },

//   // 检查并加载每日英语
//   checkAndLoadDailyEnglish: function() {
//     const today = new Date().toDateString();
//     const lastDate = this.data.lastFetchDate;
    
//     // 如果今天已经获取过，从本地存储读取
//     if (lastDate === today) {
//       const cached = wx.getStorageSync('dailyEnglish');
//       if (cached) {
//         this.setData({ dailyEnglish: cached });
//         return;
//       }
//     }
    
//     // 否则获取新的每日英语
//     this.getDailyEnglish();
//   },

//   // 获取每日英语 (带日期标记)
//   getDailyEnglish: function() {
//     this.setData({ loading: true, errorMsg: '' });
    
//     const today = new Date().toDateString();
//     const localLib = this.data.localLibrary;
//     const randomIndex = Math.floor(Math.random() * localLib.length);
    
//     // 模拟网络请求延迟
//     setTimeout(() => {
//       const selected = localLib[randomIndex];
//       this.setData({
//         dailyEnglish: selected,
//         loading: false,
//         lastFetchDate: today
//       });
//       wx.setStorageSync('dailyEnglish', selected);
//     }, 500);
//   },

//   // 随机获取英语
//   getRandomDailyEnglish: function() {
//     this.setData({ loading: true, errorMsg: '' });
    
//     const localLib = this.data.localLibrary;
//     const randomIndex = Math.floor(Math.random() * localLib.length);
    
//     setTimeout(() => {
//       this.setData({
//         dailyEnglish: localLib[randomIndex],
//         loading: false
//       });
//     }, 300);
//   },

//   // 切换中英文显示
//   toggleLanguage: function() {
//     this.setData({ showChinese: !this.data.showChinese });
//   },

//   // 预览图片
//   previewImage: function() {
//     if (!this.data.dailyEnglish?.pic) return;
    
//     wx.previewImage({
//       urls: [this.data.dailyEnglish.pic],
//       current: this.data.dailyEnglish.pic
//     });
//   },

//   // 错误处理
//   handleError: function(msg) {
//     this.setData({
//       loading: false,
//       errorMsg: msg
//     });
//     wx.showToast({
//       title: msg,
//       icon: 'none',
//       duration: 2000
//     });
//   },

//   onPullDownRefresh: function() {
//     this.getDailyEnglish(() => {
//       wx.stopPullDownRefresh();
//     });
//   }
// });
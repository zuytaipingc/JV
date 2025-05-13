Page({
  data: {
  city: "",
  date: "",
  week: "",
  weatherType: "",
  lowTemp: "",
  highTemp: "",
  nightWeatherType: "",
  aqi: "",
  aqiLevel: "",
  aqiName: ""
  },
  onLoad: function () {
  const that = this;
 // 调用API获取天气数据
 wx.request({
  url: 'https://api.vvhan.com/api/weather', // 接口地址
  method: 'GET',
  success(res) {
    if (res.data.success) {
      const data = res.data.data;
      const air = res.data.air;
      // 更新页面数据
      that.setData({
        city: res.data.city || "未知城市",
        date: data.date || "未知日期",
        week: data.week || "未知星期",
        weatherType: data.type || "未知天气",
        lowTemp: data.low || "未知",
        highTemp: data.high || "未知",
        nightWeatherType: data.night.type || "未知",
        aqi: air.aqi || "未知",
        aqiLevel: air.aqi_level || "未知",
        aqiName: air.aqi_name || "未知"
      });
    } else {
      console.error("获取天气数据失败！");
    }
  },
  fail(err) {
    console.error("接口调用失败：", err);
  }
});
}
});


//value
function get(key){
  var value = wx.getStorageSync(key)
  //没有取到status
  if (!value) {
    //根据用户的状态跳转到对应的页面
     value = getApp().globalData[key];
  }

  return value;
}




//使用微信小程序的工具类的封装

module.exports = {
    get
}
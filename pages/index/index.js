// pages/index.js

import request from '../../utils/request';
Page({

  /**
   * 页面的初始数据
   */
  data: {
     bannerList:[], //轮播图数据
     recommedList:[],//推荐歌单
     toListSwiper:[],//排行榜
     
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
  // 轮播图
  let bannerListData = await request('/banner',{type:2});
  this.setData({
    bannerList:bannerListData.banners
      })   
  // 推荐歌单
  let recommedListData = await request('/personalized',{limit:30});
  this.setData({
    recommedList:recommedListData.result,    
      })   
  /**
   *  排行榜
   * 需求分析：
   * 1.需要根据idx的值获取对应的数据
   * 2.idx的取值范围是0~20，我们需要0-4
   * 3.需要发送5次请求
   */
  let index=0;
  let resultArr = [];
  while(index < 5){
    let toListSwiperData = await request('/top/list',{idx:index++})
      // splice(会修改原数组，可以对指定数组进行增删改查)，slice(不会修改原数组)
  let toListItem={name:toListSwiperData.playlist.name,tracks:toListSwiperData.playlist.tracks.slice(0,3)};
  resultArr.push(toListItem)  ;
  // 更新topListSwiper 的状态值;不需要等待五次请求全部结束才更新，用户体验好，但是渲染次数多
  this.setData({
    toListSwiper:resultArr
  })  
  }
  
  },

  // 跳转至toRecommendSong页面
  toRecommendSong(){
    wx.navigateTo({
      url: '/songPackage/pages/recommendSong/recommendSong',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
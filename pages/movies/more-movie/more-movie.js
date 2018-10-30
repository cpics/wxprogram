// pages/movies/more-movie/more-movie.js
let app = getApp();
var util = require('../../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navigateTtile: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var category = options.category;
        var dataUrl = app.globalData.doubanBase;
        this.setData({
            "navigateTtile": category
        });

        switch (category) {
            case '正在热映':
                dataUrl += '/v2/movie/in_theaters';
                break;
            case '即将上映':
                dataUrl += '/v2/movie/coming_soon';
                break;
            case '豆瓣TOP250':
                dataUrl += '/v2/movie/top250';
                break;
        }


        util.http(dataUrl, 'GET', this.processDoubanData);

    },

    lower(event) {
        console.log("加载更多");
    },
    scrollFunc() {
        console.log("正在滑动");
    },

    processDoubanData: function(moviesDouban) {
        let movies = [];
        for (var idx in moviesDouban.subjects) {
            var subject = moviesDouban.subjects[idx];
            var title = subject.title;

            if (title.length >= 6) {
                title = title.substring(0, 6) + "...";
            }

            var tmp = {
                stars: util.convertToStarsArray(subject.rating.stars),
                title: title,
                average: subject.rating.average,
                coverageUrl: subject.images.large,
                movieId: subject.id
            }
            movies.push(tmp);
        }
        this.setData({
            movies: movies
        });

        // console.log(this.data);
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function(event) {
        wx.setNavigationBarTitle({
            title: this.data.navigateTtile,
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})
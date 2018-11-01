// pages/movies/movies.js
var util = require('../../utils/util.js');
let app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        intheaters: {},
        comingSoon: {},
        top250: {},
        searchResult:{},
        containerShow: true,
        searchPannelShow: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let inTheatersUrl = app.globalData.doubanBase + "/v2/movie/in_theaters" + "?start=0&count=3";
        let comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon" + "?start=0&count=3";
        let top250Url = app.globalData.doubanBase + "/v2/movie/top250" + "?start=0&count=3";
        let _this = this;


        util.http(inTheatersUrl, 'GET', function(data) {
            _this.processDoubanData(data, "正在热映", "intheaters");
        });
        util.http(comingSoonUrl, 'GET', function(data) {
            _this.processDoubanData(data, "即将上映", "comingSoon");
        });
        util.http(top250Url, 'GET', function(data) {
            _this.processDoubanData(data, "豆瓣TOP250", "top250");
        });


    },
    onBindFocus(event) {
        this.setData({
            containerShow: false,
            searchPannelShow: true
        })
    },
    onBindChange(event) {
        var text = event.detail.value;
        var searchUrl = app.globalData.doubanBase + "/v2/movie/search?q=" + text;
        this.getMovieListData(searchUrl, "", "searchResult");
    },
    onCancelImgTap(event) {
        this.setData({
            containerShow: true,
            searchPannelShow: false,
            searchResult:{}
        });
    },
    getMovieListData: function(url, categoryTitle, settedkey) {
        let _this = this;
        wx.request({
            url: url,
            method: "GET",
            header: {
                "Content-type": "appliaction/json"
            },
            success: function(res) {
                // console.log(res.data);
                _this.processDoubanData(res.data, categoryTitle, settedkey);
                // console.log(this.data);
            },
            fail: function() {

            }
        })
    },
    processDoubanData: function(moviesDouban, categoryTitle, settedkey) {
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
        var readyData = {};
        readyData[settedkey] = {
            "movies": movies,
            "categoryTitle": categoryTitle
        };
        this.setData(readyData);
    },
    onMoreTap(event) {
        var category = event.currentTarget.dataset.category;
        wx.navigateTo({
            url: "more-movie/more-movie?category=" + category
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

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
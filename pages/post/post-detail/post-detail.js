// pages/post/post-detail/post-detail.js
const POSTDATA = require('../../../data/posts-data.js');
let app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isPlayingMusic: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let _this = this;
        let postId = options.id;
        
        this.setData(POSTDATA.postList[postId]);

        let postsCollected = wx.getStorageSync("posts_Collected");
        if (postsCollected) {
            let postCollected = postsCollected[postId];

            this.setData({
                "collected": postCollected ? true : false
            })
        } else {
            postsCollected = {};
            postsCollected[postId] = false;
            wx.setStorageSync("posts_Collected", postsCollected);
        }
        
        if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId == this.data.postId){
            this.setData({
                "isPlayingMusic":true
            })
        }
        this.setMusicMonitor();
        

    },
    setMusicMonitor(){
        let _this = this;
        wx.onBackgroundAudioPlay(function () {
            _this.setData({
                "isPlayingMusic": true
            });
            app.globalData.g_isPlayingMusic = true;
            app.globalData.g_currentMusicPostId = _this.data.postId;
        });
        wx.onBackgroundAudioPause(function () {
            _this.setData({
                "isPlayingMusic": false
            });
            app.globalData.g_isPlayingMusic = false;
            app.globalData.g_currentMusicPostId = null;
            

        });
    },
    onCollectionTap() {
        let postsCollected = wx.getStorageSync("posts_Collected");
        let postCollected = postsCollected[this.data.postId] ? true : false;

        postsCollected[this.data.postId] = !postCollected;

        

        this.showModal(postsCollected, postsCollected[this.data.postId]);


    },
    showModal(postsCollected, postCollected) {
        let _this = this;
        wx.showModal({
            title: '收藏',
            content: !postCollected ? '是否取消收藏该文章' : "是否收藏该文章",
            showCancel: "true",
            cancelTexT: "取消",
            cancelColor: "#333",
            confirmText: "确定",
            confirmColor: '#405f80',
            success: function(res) {
                if (res.confirm) {


                    wx.setStorageSync('posts_Collected', postsCollected);

                    _this.setData({
                        "collected": postCollected
                    });

                    _this.showToast(postsCollected, postCollected);

                } else if (res.cancel) {

                }
            }
        })
    },
    showToast(postsCollected, postCollected) {


        wx.showToast({
            title: postCollected ? "收藏成功" : "取消成功",
            icon: 'success'
        })
    },
    onshareTap(event) {
        let itemList = [
            "分享到朋友圈",
            "分享到QQ",
            "分享到微博"
        ]
        wx.showActionSheet({
            itemList: itemList,
            itemColor: '#405f80',
            success: function(res) {
                wx.showModal({
                    title: '用户' + itemList[res.tapIndex],
                    content: '现在还无法显示分享功能',
                })
            }

        })
    },
    onMusicTap(event) {
        let isPlayingMusic = this.data.isPlayingMusic;
        if (isPlayingMusic) {
            wx.pauseBackgroundAudio();
            this.setData({
                "isPlayingMusic": false
            });
        } else {
            wx.playBackgroundAudio({
                dataUrl: this.data.music.url,
                title: this.data.music.title,
                coverImgUrl: this.data.music.coverImg
            });
            this.setData({
                "isPlayingMusic": true
            });
        }
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
        // this.setDat
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
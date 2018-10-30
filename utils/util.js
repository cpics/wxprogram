function convertToStarsArray(stars) {
    var num = stars.toString().substring(0, 1);
    var array = [];
    for (var i = 1; i <= 5; i++) {
        if (i <= num) {
            array.push(1);
        } else {
            array.push(0);
        }
    }
    return array;
}

function http(url, method, callback) {
    let _this = this;
    wx.request({
        url: url,
        method: method,
        header: {
            "Content-type": "appliaction/json"
        },
        success: function(res) {
            callback(res.data);
        },
        fail: function() {

        }
    })
}

module.exports = {
    convertToStarsArray: convertToStarsArray,
    http: http
}
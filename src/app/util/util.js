/**
 * Created by harry on 16/6/8.
 */
app.provider('util', function() {
    var baseApiUrl = 'http://139.224.68.92:3000/';
    this.setBaseApiUrl = function(url) {
        baseApiUrl = url;

    };
    this.$get = function($window) {
        return {
            baseApiUrl: baseApiUrl,
            baseImageServer: 'http://139.224.68.92:81/',

            surveyTypes: [
                { id: 1, name: "初诊问卷" },
                { id: 2, name: "复诊问卷" },
                { id: 3, name: "随访问卷" },
                { id: 4, name: "药物知识自测" },
                { id: 5, name: "门诊结论" },
                { id: 6, name: "药师评估" },
                { id: 7, name: "化验结果" }

            ],

            error: {
                internal: "API接口内部错误"

            },

            getResponse: function(response) {
                if (response.return && response.return == 'null'){
                    return [];
                }
                else {
                    return response;
                }
            },

            getErrorMessage: function(response) {
                if (response.return) {
                    return "错误: " + response.return;
                }
                return null;
            },

            getLoginUserId: function() {
                var user = JSON.parse($window.sessionStorage.user);
                return user._id;
            }
        };
    };
});
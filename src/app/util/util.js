/**
 * Created by harry on 16/6/8.
 */
app.provider('util', function() {
    this.$get = function() {
        return {
            baseApiUrl: 'http://127.0.0.1:3000/',
            // baseApiUrl: 'http://139.224.68.92:3000/',

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
            }
        };
    };
});
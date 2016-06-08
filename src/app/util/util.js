/**
 * Created by harry on 16/6/8.
 */
app.provider('util', function() {
    this.$get = function() {
        return {
            baseApiUrl: 'http://localhost:3000/',

            getResponse: function(response) {
                if (response.return && response.return == 'null'){
                    return [];
                }
                else {
                    return response;
                }
            }
        };
    };
});
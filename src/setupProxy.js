const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            //https://spring-news.herokuapp.com
            target: 'http://localhost:8080',
            changeOrigin: true,
        })
    );
};
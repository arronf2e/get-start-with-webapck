module.exports = {
    entry: __dirname + '/main.js',
    output: {
        path: __dirname + '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './',   // 本地服务器所加载的页面所在的目录
        host: '127.0.0.1',
        inline: true,  //实时刷新
        port: '3333'  // port
    }
}
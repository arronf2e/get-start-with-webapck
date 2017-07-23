const path = require('path');

module.exports = {
	entry: './src/index.js', // 入口文件
	output: { // 打包出的文件配置
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: ['style-loader', 'css-loader']
		}, {
			test: /\.(png|svg|jpg|gif)$/,
			use: ['file-loader?limit=8192&name=dist/images/[name].[ext]'] // 这边配置一下图片的输出文件夹以及名字等等
		}]
	}
};


/*
	
	@ 备注

	@ __dirname: 当前目录: https://nodejs.org/docs/latest/api/modules.html#modules_dirname, 

	@ path.resolve: 路径导航，相当于不断的调用系统的cd命令  https://nodejs.org/docs/latest/api/path.html#path_path_relative_from_to

		path.resolve('foo/bar', './baz')

		=> cd foo/bar

		=> cd baz

		=> pwd

	@ file-loader 中的 limit 值: 大于8192字节的图片正常打包，小于8192字节的图片以 base64 的方式引用

*/
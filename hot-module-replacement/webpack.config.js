const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 自定义index.html文件
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 每次build之前清理旧的 dist 文件夹

module.exports = {
	entry: {
		app: './src/index.js',
		print: './src/print.js'
	}, // 入口文件
	devtool: 'inline-source-map',
	devServer: {
		hot: true, // 告诉 dev-server 我们在使用 HMR
		contentBase: path.resolve(__dirname, 'dist'),
		publicPath: '/'
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Development'
		})
	],
	output: { // 打包出的文件配置
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
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

*/
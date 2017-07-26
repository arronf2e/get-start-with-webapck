### 管理输出

#### 使用 HtmlWebpackPlugin 插件动态生成index.html

	npm i --save-dev html-webpack-plugin

	// webpack.config.js

	const HtmlWebpackPlugin = require('html-webpack-plugin');

	module.exports = {
		entry: {

		}
		...
		plugins: [
			new HtmlWebpackPlugin({
				title: 'Output managemeng'
			})
		],
		...
	}

#### 清理 /dist文件夹    clean-webpack-plugin

	npm i clean-webpack-plugin --save-dev

	
	//webpack.config.js

	const CleanWebpackPlugin = require('clean-webpack-plugin');
	
	module.exports = {
		entry: {

		}
		...
		plugins: [
			new CleanWebpackPlugin(['dist']),
			new HtmlWebpackPlugin({
				title: 'Output managemeng'
			})
		],
		...
	}

#### Manifest  生成json文件, webapck能够对  模块 => bundle 的过程保持追踪 [webpack-manifest-plugin](https://github.com/danethurber/webpack-manifest-plugin)
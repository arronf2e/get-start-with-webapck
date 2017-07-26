### 开发

#### source map   容易地追踪错误和警告，JavaScript 提供了 source map 功能，将编译后的代码映射回原始源代码

	// webpack.config.js

	const HtmlWebpackPlugin = require('html-webpack-plugin');

	module.exports = {
		entry: {

		},
		devtool: 'inline-source-map',
		plugins: [
			new HtmlWebpackPlugin({
				title: 'Output managemeng'
			})
		],
		...
	}

#### 选择一个开发工具  

> 每次要编译代码的时候，当然不希望每次手动 npm run build ，会很麻烦。
> webpack 有以下几个选项

1. webpack's Watch Mode   观察模式 , 会自动重新编译, 但无法自动刷新浏览器

在package.json里添加一个用于启动 webpack 的观察模式的npm script:

	// package.json
	{
		...
		"script": {
			...
			"watch": "webpack --watch"
		}
	}



2. webpack-dev-server

webpack-dev-server 为你提供了一个简单的 web 服务器，并且能够实时重新加载(live reloading)  

	npm i --save-dev webpack-dev-server

	// 修改 webpack.config.js ，告诉 dev server 在哪里查找文件 

	module.exports = {
		...
		devServer: {
			contentBase: './dist'
		}
	}

	以上配置告知 webpack-dev-server，在 localhost:8080 下建立服务，将 dist 目录下的文件，作为可访问文件。然后在pack.json添加一个script脚本 

	//package.json

	{
		"script": {
			"start": "webpack-dev-server --open"
		}
	}


3. webpack-dev-middleware  是一个处理静态资源的middlewares，上面的dev server也是用这个中间件来处理webpack编译后的输出 [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware)

#### 调整文本编辑器

> 使用自动编译代码时，可能会在保存文件时遇到一些问题。某些编辑器具有“安全写入”功能，可能会影响重新编译。

要在一些常见的编辑器中禁用此功能，请查看以下列表：  

- Sublime Text 3 - 在用户首选项(user preferences)中添加 atomic_save: "false"。  
- IntelliJ - 在首选项(preferences)中使用搜索，查找到 "safe write" 并且禁用它。
- Vim - 在设置(settings)中增加 :set backupcopy=yes。
- WebStorm - 在 Preferences > Appearance & Behavior > System Settings 中取消选中 Use "safe write"。


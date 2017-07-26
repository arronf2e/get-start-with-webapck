### 生产环境构建

#### 自动方式 

	webpack -p

	webpack --optimize-minimize --define process.env.NODE_ENV="'production'"

上面的命令会执行以下的行为：

- 使用 UglifyJsPlugin 压缩 js 文件

- 运行 [LoaderOptionsPlugin](https://doc.webpack-china.org/plugins/loader-options-plugin/)

- 设置 NodeJS 环境变量，触发某些 package 包，以不同的方式进行编译

##### JS文件的压缩

> webpack 自带了 UglifyJsPlugin ，它运行 UglifyJS 来压缩输出的JS文件，在命令行中指定  --optimize-minimize ，或者在 plugins 配置中添加：

	// webpack.config.js

	const webpack = require('webpack');

	module.exports = {
		...
		plugins: [
			new webpack.optimize.UglifyJsPlugin({
				sourceMap: options.devtool && (options.devtool.indexOf("sourcemap") >= 0 || options.devtool.indexOf("source-map") >= 0)
			})
		]
	}

##### Source Maps

> 推荐在生产环境中使用 source map 

在配置中，使用 devtool 对象来设置 Source Maps 的类型， 支持七种类型的 source map ，详情可以看：[https://doc.webpack-china.org/configuration/devtool/](https://doc.webpack-china.org/configuration/devtool/)

	module.exports = {
		...
		devtool: 'inline-source-map',
		plugins: [
			new webpack.optimize.UglifyJsPlugin({
				sourceMap: options.devtool && (options.devtool.indexOf("sourcemap") >= 0 || options.devtool.indexOf("source-map") >= 0)
			})
		]
	}

##### Node 环境变量

> 运行 webpack -p 会通过如下的方式调用 DefinePlugin :

	// webpack.config.js
	module.exports = {
		...
		plugins: [
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify('production')
			})
		]
	}

DefinePlugin 在原始的源码中执行查找和替换操作，在导入的代码中，任何出现 process.env.NODE_ENV的地方都会被替换为"production"。因此，形如if (process.env.NODE_ENV !== 'production') console.log('...') 的代码就会等价于 if (false) console.log('...') 并且最终通过UglifyJS等价替换掉。

> 从技术角度而言，NODE_ENV是一个Node.js暴露给运行脚本的系统环境变量。服务端的工具/构建脚本以及客户端库都可以方便的使用该环境变量确定自己的开发-生产行为。然而与期望的相反，构建脚本 webpack.config.js 中的 process.env.NODE_ENV 并不会被设置为 "production" ，详情见[#2537](https://github.com/webpack/webpack/issues/2537)。 因此，条件判定，形如 process.env.NODE_ENV === 'production' ? '[name].[hash].bundle.js' : '[name].bundle.js' 并不会按预想的起作用。[查看如何使用环境变量](https://doc.webpack-china.org/guides/environment-variables/)。

#### 手动方式 

为不同的环境编写独立的 webpack 配置文件 

##### 简单途径 

最简单的方式，定义两个完全独立的配置文件  

	// webpack.dev.js

	module.exports = {
		entry: {},
		output: {},
		...
		devServer: {}
	}


	// webpack.prod.js

	module.exports = {
		output: {},
		plugins: []
		...
	}

	// webpack.config.js
	
	// 将基本配置转为一个函数，然后接受 env 参数，并在两个配置之间切换（通过 --env 设置）：

	module.exports = function(env){   
		return require(`./webpack.${env}.js`)
	}

	// package.json

	{
		"script": {
			"dev": "webpack --env=dev --progress --profile --colors",
			"build": "webpack --env=prod --progress --profile --colors",
		}
	}

有关如何使用 env 标志(flag)的更多详细信息，[请查看 CLI 的常见选项章节](https://doc.webpack-china.org/api/cli/#common-options)。

#### 高级途径 

> 编写一个包含两个环境通用配置的基本配置文件 ，然后使用工具 webpack-merge 将它与特定于环境的配置进行合并 ，这将为每个环境产生完整配置，并防止重复公共部分代码。

	// webpack.config.base.js

	module.exports = {
		entry: {},
		output: {},
		module: {},
		plugins: []
	}

	// webpack.config.prod.js

	const Merge = require('webpack-merge');
	const BaseConfig = require('./webpack.config.base');

	module.exports = Merge(BaseConfig, {
		plugins: [
			new webpack.DefinePlugin({
	      'process.env': {
	        'NODE_ENV': JSON.stringify('production')
	      }
	    }),
		]
		....
	})

以上示例仅演示了每个（或两个）环境中使用的一些典型配置选项。现在大家应该已经知道如何拆分配置了，选择把选项放置到哪里，都是由我们自己来决定的。

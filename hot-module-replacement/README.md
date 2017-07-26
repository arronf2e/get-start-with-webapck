### 模块热替换

> 模块热替换(Hot Module Replacement 或 HMR)是webpack提供的最有用的功能之一。它允许在运行时更新各种模块，而无需进行完全刷新。HMR不适用于生产环境，只能在开发环境中使用。

#### 启用 HMR

	module.exports = {
		...
		devServer: {
			hot: true,
			contentBase: './dist'
		}
	}
	

	启动 webpack-dev-server 

	npm start

	这时候会发现页面console.log中报错了 ： dev-server.js:52 Uncaught Error: [HMR] Hot Module Replacement is disabled.

	// 我们需要修改start的启动命令，再重新 npm start 就可以啦

	{
	  ...
	  "scripts": {
	    ...
	    "start": "webpack-dev-server --open --hot --inline"
	  },
	  ...
	}
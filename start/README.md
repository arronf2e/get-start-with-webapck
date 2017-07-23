### 起步

#### 最简单的打包方式，webpack命令

	webpack src/index.js dist/bundle.js

#### 使用配置文件 webpack.config.js

	// 直接webpack，命令将默认选择当前的webpack.config.js文件
	webpack  
	
	// 使用config选择指定配置文件
	webpack --config webpack.config.js
	
#### 配置文件配合 npm scripts

	// package.json
	
	{
		...,
		"scripts": {
			"build": "webpack"
		},
		...
	}
	
	npm run build
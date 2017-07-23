### 管理资源 (use loaders)

#### 加载CSS （支持各预处理器 less sass postcss 等，需各自添加loader)

	npm i --save-dev style-loader css-loader
	
	// 在webpack.config.js中的module配置中添加这两个loader
	
	module.exports = {
		...
		module: {
			rules: [{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}]
		},
		...
	}
	
	webpack 根据正则表达式，来确定应该查找哪些文件，并将其提供给指定的 loader。  
	在这种情况下，以 .css 结尾的全部文件，都将被提供给 style-loader 和 css-loader
	
	我新建了一个css文件夹，并在里面新建style.css，并写入内容，然后在index.js中import 该文件，具体看项目目录。  
	接下来打包 npm run build ，发现样式是正确的，并且查看head中，找到了写入的css
	
> css 文件当然也可以分离出来，请查看: [https://doc.webpack-china.org/plugins/extract-text-webpack-plugin/](https://doc.webpack-china.org/plugins/extract-text-webpack-plugin/)，样式将不再内嵌到JS bundle中，而是会放到一个单独的CSS文件中。


	
#### 加载图片（file-loader)

	npm i --save-dev file-loader
	
	module.exports = {
		...
		module: {
			rules: [{
			test: /\.css$/,
			use: ['style-loader', 'css-loader']
			}, {
				test: /\.(png|svg|jpg|gif)$/,
				use: ['file-loader?limit=8192&name=dist/images/[name].[ext]'] // 这边配置一下图片的输出文件夹以及名字等等
			}]
		}
		...
	}
	
> 压缩和优化您的图像。查看 [image-webpack-loader](https://github.com/tcoopman/image-webpack-loader) 和 [url-loader](https://doc.webpack-china.org/loaders/url-loader/)，以了解更多关于如果增强加载处理图片功能。

	
	
#### 加载字体 

	wait for ...

	
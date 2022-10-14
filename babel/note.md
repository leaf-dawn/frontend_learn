- 一方面，有些浏览器不支持es6，不兼容
- 另一方面，不支持导入npm的依赖的问题

所以使用babel

~~~shell
#先对项目初始化npm
npm init -y
#安装babel,是一个开发依赖来的
npm i babel-cli babel-preset-env browserify -D
#转换方法
npx babel inDir -d outDir --presets=babel-preset-env
#打包
npx browserify inFile -o outFile
#导入npm包,在js文件里面导入即可
import * as $ from "jquery"
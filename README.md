# gulp插件

`gulp默认不解析es6，必须结合babel`

- gulp-concat (合并)
- gulp-uglify　(压缩js)
- gulp-rename (重命名)
- gulp-less (解析less)
- gulp-clean-css (压缩css)
- gulp-htmlmin (压缩html)
- gulp-livereload  (自动编译)
- gulp-connect (热加载)
- gulp-load-plugins （打包,包含前面的插件,用这个其他就不用了)

```javascript
var $ = require('gulp-load-plugins')();
以格式为　$.concat/$.htmlmin/$cleanCss ... 调用
```

- open (打开本地服务器地址)

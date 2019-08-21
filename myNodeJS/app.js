/*
  app.js文件是整个项目的入口文件，用于所有的目录和文件

  在文件的顶部，使用require方法引入NodeJS中的模块

  模块的种类：内置模块，第三方模块，自定义模块
*/

// 内置模块，就是NodeJS自带的模块
var path = require('path'); // 处理服务器上的各种资源路径问题

// 第三方模块，就是需要手动下载并安装的模块
var createError = require('http-errors'); // 处理http报错
var express = require('express'); // 它是一个NodeJS的开发框架
var cookieParser = require('cookie-parser'); // 解析cookie
var logger = require('morgan'); // 用于打印日志
var cors = require('cors') // 用于解决跨域

// 连接数据库
require('./db/connect.js')

// 自定义模块，就是新建一个js文件，然后引入它
// 下面几个自定义模块，都是路由文件
var indexRouter = require('./routes/index');
var datebaogoodsRouter = require('./routes/datebaogoods');
var userinfosRouter = require('./routes/userinfos');

// 实例化express，后面所有的操作全是针对这个app
var app = express();

// 设置模板引擎为ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 使用NodeJS的中间件，摆放到实例化和使用路由之间
app.use(logger('dev')); // 在开发环境下打印日志
app.use(express.json()); // 当post请求参数是json数据
app.use(express.urlencoded({ extended: false })); // 当post请求参数是表单数据
app.use(cookieParser()); // 处理cookie
app.use(express.static(path.join(__dirname, 'public'))); // 配置整个服务器的静态资源目录
app.use(cors()) // 处理跨域

// 使用路由
app.use('/', indexRouter);
app.use('/datebaogoods', datebaogoodsRouter);
app.use('/userinfos', userinfosRouter);

// 捕捉404，并且把它传给错误处理器
app.use(function(req, res, next) {
  next(createError(404));
});

// 错误处理器
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// 导出整个app
module.exports = app;

const proxy = require('http-proxy-middleware')
      module.exports = function(app){
          app.use(
              	proxy(
					'/huan/api', {
						target: 'http://localhost:8888',
						changeOrigin: true,
						pathRewrite: {
							'^/huan/api': ''
						}
					}  
              	)
          )
      }
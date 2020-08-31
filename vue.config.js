// 只要改了配置文件，必须重新开启服务
module.exports = {
    devServer: {
      proxy: {
        //请求类型：如ajax数据请求：'/ajax'
        '/ajax': {
          target: 'https://m.maoyan.com', //目标url
          changeOrigin: true
        },
        '/dianying': {
          target: 'https://m.maoyan.com', //目标url
          changeOrigin: true
        }
      }
    }
}
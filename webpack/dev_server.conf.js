// eslint-disable-next-line no-undef
module.exports = function () {
  return {
    devServer: {
      contentBase: 'dist',
      compress: true,
      port: 3000,
      index: 'index.html',
      overlay: true,
      open: true,
      proxy: [
        {
          context: ['/internal', '/favicon.ico', '/backuplogs', '/revision', '/get', '/deployment_info', '/iredirector', '/api'],
          // target: 'https://ygs.36.w1.connectivegames.com', // - сервер, в котором есть урлы до клиентов
          //target: 'https://spartan.37.w1.connectivegames.com', //- пример сервера в offline
          //target: 'https://pkrmtch-log.com/', //- реальный сервер из ветки 36
          //target: 'https://ygs.37.w1.connectivegames.com',
          changeOrigin: true,
        },
        {
          context: ['/feature-editor'],
          target: 'https://issues.connectivegames.com',
          changeOrigin: true,
        },
      ],
    },
  };
};

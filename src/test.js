class vueRouter {
    constructor(options) {
      this.mode = options.mode || 'hash';
      this.routes = options.routes || [];
      this.history = new HistoryRoute();
  
      // 将数组结构的routes转化成一个更好查找的对象
      this.routesMap = this.mapRoutes(this.routes);
      this.init();
    }
  
    // 加载事件监听
    init() {
      if(this.mode === 'hash'){
        // 如果url没有hash，给一个默认的根目录hash
        location.hash ? '' : location.hash = '/';
        window.addEventListener('load', () => {
          // 页面加载的时候初始化，存储hash值到history的current上，并且去掉开头的#
          this.history.current = location.hash.slice('1');
        });
        window.addEventListener('hashchange', () => {
          // hash改变的时候更新history的current
          this.history.current = location.hash.slice('1');
        })
      } else {
        // else处理history模式
        // 如果url没有pathname，给一个默认的根目录pathname
        location.pathname ? '' : location.pathname = '/';
        window.addEventListener('load', () => {
          // 页面加载的时候初始化，存储pathname值到history的current上
          this.history.current = location.pathname;
        });
        window.addEventListener('popstate', () => {
          // pathname改变的时候更新history的current
          this.history.current = location.pathname;
        })
      }
    }
  
    /*
    将 [{path: '/', component: Hello}]
    转化为 {'/': Hello}
    */
    mapRoutes(routes) {
      return routes.reduce((res, current) => {
        res[current.path] = current.component;
        return res;
      }, {})
    }
  }
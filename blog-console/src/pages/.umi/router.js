import React from 'react';
import {
  Router as DefaultRouter,
  Route,
  Switch,
  StaticRouter,
} from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@@/history';
import { routerRedux, dynamic as _dvaDynamic } from 'dva';

const Router = routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/login',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "p__login__login" */ '../login/login'),
          LoadingComponent: require('/Users/gkshi/myself/blog-console/src/components/Loading.jsx')
            .default,
        })
      : require('../login/login').default,
    title: '登录',
    exact: true,
    Routes: [require('./TitleWrapper.jsx').default],
    _title: '登录',
    _title_default: '博客控制台',
  },
  {
    path: '/404',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () => import(/* webpackChunkName: "p__404" */ '../404'),
          LoadingComponent: require('/Users/gkshi/myself/blog-console/src/components/Loading.jsx')
            .default,
        })
      : require('../404').default,
    title: '登录',
    exact: true,
    Routes: [require('./TitleWrapper.jsx').default],
    _title: '登录',
    _title_default: '博客控制台',
  },
  {
    path: '/',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__index" */ '../../layouts/index'),
          LoadingComponent: require('/Users/gkshi/myself/blog-console/src/components/Loading.jsx')
            .default,
        })
      : require('../../layouts/index').default,
    Routes: [require('../../../routes/beforeRouteEnter').default],
    routes: [
      {
        path: '/create/:id',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__create__create" */ '../create/create'),
              LoadingComponent: require('/Users/gkshi/myself/blog-console/src/components/Loading.jsx')
                .default,
            })
          : require('../create/create').default,
        title: '创建博文',
        exact: true,
        Routes: [require('./TitleWrapper.jsx').default],
        _title: '创建博文',
        _title_default: '博客控制台',
      },
      {
        path: '/create',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__create__create" */ '../create/create'),
              LoadingComponent: require('/Users/gkshi/myself/blog-console/src/components/Loading.jsx')
                .default,
            })
          : require('../create/create').default,
        title: '创建博文',
        exact: true,
        Routes: [require('./TitleWrapper.jsx').default],
        _title: '创建博文',
        _title_default: '博客控制台',
      },
      {
        path: '/bless',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__bless__models__bless.js' */ '/Users/gkshi/myself/blog-console/src/pages/bless/models/bless.js').then(
                  m => {
                    return { namespace: 'bless', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__bless__bless" */ '../bless/bless'),
              LoadingComponent: require('/Users/gkshi/myself/blog-console/src/components/Loading.jsx')
                .default,
            })
          : require('../bless/bless').default,
        title: '留言回复',
        exact: true,
        Routes: [require('./TitleWrapper.jsx').default],
        _title: '留言回复',
        _title_default: '博客控制台',
      },
      {
        path: '/travel',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__travel__models__travel.js' */ '/Users/gkshi/myself/blog-console/src/pages/travel/models/travel.js').then(
                  m => {
                    return { namespace: 'travel', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__travel__travel" */ '../travel/travel'),
              LoadingComponent: require('/Users/gkshi/myself/blog-console/src/components/Loading.jsx')
                .default,
            })
          : require('../travel/travel').default,
        title: '旅行地图',
        exact: true,
        Routes: [require('./TitleWrapper.jsx').default],
        _title: '旅行地图',
        _title_default: '博客控制台',
      },
      {
        path: '/links/:id',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__links___links" */ '../links/$links'),
              LoadingComponent: require('/Users/gkshi/myself/blog-console/src/components/Loading.jsx')
                .default,
            })
          : require('../links/$links').default,
        exact: true,
        _title: '博客控制台',
        _title_default: '博客控制台',
      },
      {
        path: '/setting',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__setting__setting" */ '../setting/setting'),
              LoadingComponent: require('/Users/gkshi/myself/blog-console/src/components/Loading.jsx')
                .default,
            })
          : require('../setting/setting').default,
        title: '个人设置',
        exact: true,
        Routes: [require('./TitleWrapper.jsx').default],
        _title: '个人设置',
        _title_default: '博客控制台',
      },
      {
        path: '/list',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__list__models__list.js' */ '/Users/gkshi/myself/blog-console/src/pages/list/models/list.js').then(
                  m => {
                    return { namespace: 'list', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__list__list" */ '../list/list'),
              LoadingComponent: require('/Users/gkshi/myself/blog-console/src/components/Loading.jsx')
                .default,
            })
          : require('../list/list').default,
        title: '博文列表',
        exact: true,
        Routes: [require('./TitleWrapper.jsx').default],
        _title: '博文列表',
        _title_default: '博客控制台',
      },
      {
        path: '/blog/:id',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__blog___blog" */ '../blog/$blog'),
              LoadingComponent: require('/Users/gkshi/myself/blog-console/src/components/Loading.jsx')
                .default,
            })
          : require('../blog/$blog').default,
        title: '博文内容',
        exact: true,
        Routes: [require('./TitleWrapper.jsx').default],
        _title: '博文内容',
        _title_default: '博客控制台',
      },
      {
        path: '/',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__index" */ '../index'),
              LoadingComponent: require('/Users/gkshi/myself/blog-console/src/components/Loading.jsx')
                .default,
            })
          : require('../index').default,
        exact: true,
        _title: '博客控制台',
        _title_default: '博客控制台',
      },
      {
        component: () =>
          React.createElement(
            require('/Users/gkshi/myself/blog-console/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
        _title: '博客控制台',
        _title_default: '博客控制台',
      },
    ],
    _title: '博客控制台',
    _title_default: '博客控制台',
  },
  {
    component: () =>
      React.createElement(
        require('/Users/gkshi/myself/blog-console/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: true },
      ),
    _title: '博客控制台',
    _title_default: '博客控制台',
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen() {}

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    // dva 中 history.listen 会初始执行一次
    // 这里排除掉 dva 的场景，可以避免 onRouteChange 在启用 dva 后的初始加载时被多执行一次
    const isDva =
      history.listen
        .toString()
        .indexOf('callback(history.location, history.action)') > -1;
    if (!isDva) {
      routeChangeHandler(history.location);
    }
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return <Router history={history}>{renderRoutes(routes, props)}</Router>;
  }
}

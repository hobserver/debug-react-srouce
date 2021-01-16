#搭建流程
## 下载react源代码
执行git submodule init
## 将.yarnrc 复制到react目录下
## 在react目录中执行 yarn, 安装react的依赖
## 在项目根目录执行yarn
## npm start 即可运行

# 原理
- 通过webpack-dev-server的方式即时编译webpack源码
- 通过source-map运行时查看webpack代码
# 效果
![demo](https://github.com/lirongfei123/static/blob/master/demo.gif?raw=true)

# webpack配置中的替换逻辑的提取过程
## 查看react/scripts/rollup/bundles.js
将里面`bundles`变量注释，取个别名，换成只打包两个版本的
```
const bundles = [
  {
    bundleTypes: [
      UMD_DEV,
    ],
    moduleType: ISOMORPHIC,
    entry: 'react',
    global: 'React',
    externals: [],
  },
  {
    bundleTypes: [
      UMD_DEV,
    ],
    moduleType: RENDERER,
    entry: 'react-dom',
    global: 'ReactDOM',
    externals: ['react'],
  },
];
```
## 在 react/scripts/rollup/build.js 的 getPlugins函数里面，在return 语句之前，打印出相应要替换的变量
```
console.log({
    __DEV__: isProduction ? 'false' : 'true',
    __PROFILE__: isProfiling || !isProduction ? 'true' : 'false',
    __UMD__: isUMDBundle ? 'true' : 'false',
    'process.env.NODE_ENV': isProduction ? "'production'" : "'development'",
    __EXPERIMENTAL__,
    // Enable forked reconciler.
    // NOTE: I did not put much thought into how to configure this.
    __VARIANT__: bundle.enableNewReconciler === true,
}, forks)
```
打印出来的，react，以及react-dom的内容，就是webpack当中需要替换的内容
参考webpack/replace.js 当中的替换内容
## 去除 `scheduler: 'shared/forks/Scheduler.umd.js',` 这一行
## 去除 `'scheduler/tracing': 'shared/forks/SchedulerTracing.umd.js',` 这一行
## 去除 `'react-shallow-renderer': 'react-shallow-renderer/esm/index.js',` 这一行

# webpack配置改造
## 增加NODE_PATH, react/packages, 从而使react等各种包直接引用packages当中的包
## 增加webpack配置中resolve.modules的配置，增加 react/packages